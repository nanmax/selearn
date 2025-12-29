/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET: Mendapatkan semua badges dan status user
export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all active badges
    const allBadges = await prisma.badge.findMany({
      where: { isActive: true },
      orderBy: [{ category: "asc" }, { createdAt: "asc" }],
    });

    // Get user's earned badges
    const userBadges = await prisma.userBadge.findMany({
      where: { userId: session.user.id },
      include: {
        badge: true,
      },
    });

    const earnedBadgeIds = userBadges.map((ub) => ub.badgeId);

    // Get user stats for progress calculation
    const [completedLessons, completedCourses, streak, quizStats, perfectScores] =
      await Promise.all([
        prisma.lessonProgress.count({
          where: { userId: session.user.id, completed: true },
        }),
        prisma.enrollment.count({
          where: { userId: session.user.id, completed: true },
        }),
        prisma.learningStreak.findUnique({
          where: { userId: session.user.id },
        }),
        prisma.quizAttempt.count({
          where: { userId: session.user.id, passed: true },
        }),
        prisma.quizAttempt.count({
          where: { userId: session.user.id, score: 100 },
        }),
      ]);

    // Calculate progress for each badge
    const badgesWithProgress = allBadges.map((badge) => {
      const isEarned = earnedBadgeIds.includes(badge.id);
      const userBadge = userBadges.find((ub) => ub.badgeId === badge.id);
      const req = badge.requirement as { type: string; value: number };

      let currentProgress = 0;
      let maxProgress = req.value;

      switch (req.type) {
        case "LESSONS_COMPLETED":
        case "FIRST_LESSON":
          currentProgress = completedLessons;
          break;
        case "COURSES_COMPLETED":
        case "FIRST_COURSE":
          currentProgress = completedCourses;
          break;
        case "STREAK_DAYS":
          currentProgress = streak?.currentStreak ?? 0;
          break;
        case "QUIZ_PASSED":
        case "FIRST_QUIZ":
          currentProgress = quizStats;
          break;
        case "PERFECT_SCORES_COUNT":
          currentProgress = perfectScores;
          break;
      }

      const progressPercentage = Math.min(
        100,
        Math.round((currentProgress / maxProgress) * 100)
      );

      return {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        category: badge.category,
        points: badge.points,
        isEarned,
        earnedAt: userBadge?.earnedAt ?? null,
        progress: {
          current: Math.min(currentProgress, maxProgress),
          max: maxProgress,
          percentage: progressPercentage,
        },
      };
    });

    // Group by category
    const badgesByCategory = badgesWithProgress.reduce((acc, badge) => {
      const category = badge.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(badge);
      return acc;
    }, {} as Record<string, typeof badgesWithProgress>);

    return NextResponse.json({
      badges: badgesWithProgress,
      byCategory: badgesByCategory,
      stats: {
        totalBadges: allBadges.length,
        earnedBadges: userBadges.length,
        totalPoints: userBadges.reduce((sum, ub) => sum + ub.badge.points, 0),
      },
    });
  } catch (error) {
    console.error("Badges API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
