/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function markLessonComplete(
  lessonId: string,
  slug: string
): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    // Get lesson to find course info
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        Chapter: {
          include: {
            Course: true,
          },
        },
      },
    });

    if (!lesson) {
      return { status: "error", message: "Lesson not found" };
    }

    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.id,
          lessonId: lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        lessonId: lessonId,
        userId: session.id,
        completed: true,
      },
    });

    // Update learning streak
    await updateLearningStreak(session.id);

    // Check and award badges
    await checkAndAwardBadges(session.id, lesson.Chapter.Course.id);

    revalidatePath(`/dashboard/${slug}/${lessonId}`);
    revalidatePath(`/dashboard/${slug}`);
    revalidatePath(`/dashboard/my-badges`);

    return {
      status: "success",
      message: "Progress updated",
    };
  } catch (error) {
    console.error("markLessonComplete error:", error);
    return {
      status: "error",
      message: "Failed to mark lesson as complete.",
    };
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
      return; // Already recorded today
    } else if (diffDays === 1) {
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

// Helper: Check and award badges
async function checkAndAwardBadges(userId: string, courseId: string) {
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

  if (badgesToAward.length > 0) {
    await prisma.$transaction(async (tx) => {
      for (const badgeId of badgesToAward) {
        const badge = availableBadges.find((b) => b.id === badgeId);

        await tx.userBadge.create({
          data: { userId, badgeId },
        });

        if (badge && badge.points > 0) {
          await tx.user.update({
            where: { id: userId },
            data: { points: { increment: badge.points } },
          });

          await tx.pointTransaction.create({
            data: {
              userId,
              amount: badge.points,
              type: "WELCOME_BONUS",
              description: `Badge earned: ${badge.name}`,
              referenceId: badgeId,
            },
          });
        }
      }
    });
  }
}

export async function submitCourseReview(form: {
  courseSlug: string;
  rating: number;
  comment: string;
}) {
  const user = await requireUser();

  const course = await prisma.course.findUnique({
    where: { slug: form.courseSlug },
    select: { id: true },
  });

  if (!course) {
    return { success: false, message: "Course not found" };
  }

  await prisma.courseReview.create({
    data: {
      userId: user.id,
      courseId: course.id,
      rating: form.rating,
      comment: form.comment,
    },
  });

  return { success: true };
}
