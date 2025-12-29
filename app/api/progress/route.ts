/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET: Mendapatkan progress kursus user
export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    // Ambil semua lesson di course ini
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        chapter: {
          include: {
            lessons: {
              select: { id: true },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const allLessonIds = course.chapter.flatMap((ch) =>
      ch.lessons.map((l) => l.id)
    );
    const totalLessons = allLessonIds.length;

    // Ambil progress user
    const completedLessons = await prisma.lessonProgress.count({
      where: {
        userId: session.user.id,
        lessonId: { in: allLessonIds },
        completed: true,
      },
    });

    const percentage = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

    return NextResponse.json({
      totalLessons,
      completedLessons,
      percentage,
      isCompleted: percentage === 100,
    });
  } catch (error) {
    console.error("Progress API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST: Update progress lesson (mark as completed)
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lessonId, completed = true } = await req.json();

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
    }

    // Verifikasi lesson exists dan user enrolled
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        Chapter: {
          include: {
            Course: {
              include: {
                enrollment: {
                  where: { userId: session.user.id, status: "Active" },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    if (lesson.Chapter.Course.enrollment.length === 0) {
      return NextResponse.json({ error: "Not enrolled in this course" }, { status: 403 });
    }

    // Update/create progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId,
        },
      },
      update: { completed },
      create: {
        userId: session.user.id,
        lessonId,
        completed,
      },
    });

    // Update learning streak
    await updateLearningStreak(session.user.id);

    // Check and award badges
    await checkAndAwardBadges(session.user.id, lesson.Chapter.Course.id);

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Progress API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper: Update learning streak
async function updateLearningStreak(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const streak = await prisma.learningStreak.findUnique({
    where: { userId },
  });

  if (!streak) {
    // Create new streak
    await prisma.learningStreak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: today,
      },
    });
    return;
  }

  const lastActivity = streak.lastActivityDate
    ? new Date(streak.lastActivityDate)
    : null;

  if (lastActivity) {
    lastActivity.setHours(0, 0, 0, 0);
    const diffDays = Math.floor(
      (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      // Already recorded today
      return;
    } else if (diffDays === 1) {
      // Consecutive day - increment streak
      const newStreak = streak.currentStreak + 1;
      await prisma.learningStreak.update({
        where: { userId },
        data: {
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, streak.longestStreak),
          lastActivityDate: today,
        },
      });
    } else {
      // Streak broken - reset to 1
      await prisma.learningStreak.update({
        where: { userId },
        data: {
          currentStreak: 1,
          lastActivityDate: today,
        },
      });
    }
  }
}

// Helper: Check and award badges based on progress
async function checkAndAwardBadges(userId: string, courseId: string) {
  // Get user's overall stats
  const [completedLessons, completedCourses, streak] = await Promise.all([
    prisma.lessonProgress.count({
      where: { userId, completed: true },
    }),
    prisma.enrollment.count({
      where: { userId, completed: true },
    }),
    prisma.learningStreak.findUnique({
      where: { userId },
    }),
  ]);

  // Get badges that user doesn't have yet
  const existingBadges = await prisma.userBadge.findMany({
    where: { userId },
    select: { badgeId: true },
  });
  const existingBadgeIds = existingBadges.map((b) => b.badgeId);

  const availableBadges = await prisma.badge.findMany({
    where: {
      isActive: true,
      id: { notIn: existingBadgeIds },
    },
  });

  const badgesToAward: string[] = [];

  for (const badge of availableBadges) {
    const req = badge.requirement as { type: string; value: number };
    let earned = false;

    switch (req.type) {
      case "LESSONS_COMPLETED":
        earned = completedLessons >= req.value;
        break;
      case "COURSES_COMPLETED":
        earned = completedCourses >= req.value;
        break;
      case "STREAK_DAYS":
        earned = (streak?.currentStreak ?? 0) >= req.value;
        break;
      case "FIRST_LESSON":
        earned = completedLessons >= 1;
        break;
      case "FIRST_COURSE":
        earned = completedCourses >= 1;
        break;
    }

    if (earned) {
      badgesToAward.push(badge.id);
    }
  }

  // Award badges
  if (badgesToAward.length > 0) {
    await prisma.$transaction(async (tx) => {
      for (const badgeId of badgesToAward) {
        const badge = availableBadges.find((b) => b.id === badgeId);

        await tx.userBadge.create({
          data: { userId, badgeId },
        });

        // Award bonus points if any
        if (badge && badge.points > 0) {
          await tx.user.update({
            where: { id: userId },
            data: { points: { increment: badge.points } },
          });

          await tx.pointTransaction.create({
            data: {
              userId,
              amount: badge.points,
              type: "WELCOME_BONUS", // Use existing type for badge points
              description: `Badge earned: ${badge.name}`,
              referenceId: badgeId,
            },
          });
        }
      }
    });
  }
}
