import { prisma } from "@/lib/db";

export type BadgeData = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  isEarned: boolean;
  earnedAt: Date | null;
  progress: {
    current: number;
    max: number;
    percentage: number;
  };
};

export type BadgesDataType = {
  badges: BadgeData[];
  byCategory: Record<string, BadgeData[]>;
  stats: {
    totalBadges: number;
    earnedBadges: number;
    totalPoints: number;
  };
  streak: {
    currentStreak: number;
    longestStreak: number;
    learnedToday: boolean;
  };
};

export async function getUserBadgesData(userId: string): Promise<BadgesDataType> {
  // Get all active badges
  const allBadges = await prisma.badge.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { createdAt: "asc" }],
  });

  // Get user's earned badges
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    include: {
      badge: true,
    },
  });

  const earnedBadgeIds = userBadges.map((ub) => ub.badgeId);

  // Get user stats for progress calculation
  const [completedLessons, completedCourses, streak, quizStats, perfectScores] =
    await Promise.all([
      prisma.lessonProgress.count({
        where: { userId, completed: true },
      }),
      prisma.enrollment.count({
        where: { userId, completed: true },
      }),
      prisma.learningStreak.findUnique({
        where: { userId },
      }),
      prisma.quizAttempt.count({
        where: { userId, passed: true },
      }),
      prisma.quizAttempt.count({
        where: { userId, score: 100 },
      }),
    ]);

  // Check if learned today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let learnedToday = false;
  if (streak?.lastActivityDate) {
    const lastActivity = new Date(streak.lastActivityDate);
    lastActivity.setHours(0, 0, 0, 0);
    learnedToday = lastActivity.getTime() === today.getTime();
  }

  // Calculate progress for each badge
  const badgesWithProgress: BadgeData[] = allBadges.map((badge) => {
    const isEarned = earnedBadgeIds.includes(badge.id);
    const userBadge = userBadges.find((ub) => ub.badgeId === badge.id);
    const req = badge.requirement as { type: string; value: number };

    let currentProgress = 0;
    const maxProgress = req.value;

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
  const byCategory = badgesWithProgress.reduce((acc, badge) => {
    const category = badge.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(badge);
    return acc;
  }, {} as Record<string, BadgeData[]>);

  return {
    badges: badgesWithProgress,
    byCategory,
    stats: {
      totalBadges: allBadges.length,
      earnedBadges: userBadges.length,
      totalPoints: userBadges.reduce((sum, ub) => sum + ub.badge.points, 0),
    },
    streak: {
      currentStreak: streak?.currentStreak ?? 0,
      longestStreak: streak?.longestStreak ?? 0,
      learnedToday,
    },
  };
}
