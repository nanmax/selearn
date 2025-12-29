import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET: Mendapatkan streak info user
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let streak = await prisma.learningStreak.findUnique({
      where: { userId: session.user.id },
    });

    // Initialize if not exists
    if (!streak) {
      streak = await prisma.learningStreak.create({
        data: {
          userId: session.user.id,
          currentStreak: 0,
          longestStreak: 0,
        },
      });
    }

    // Check if streak is still active (learned today or yesterday)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActivity = streak.lastActivityDate
      ? new Date(streak.lastActivityDate)
      : null;

    let isActive = false;
    let learnedToday = false;

    if (lastActivity) {
      lastActivity.setHours(0, 0, 0, 0);
      const diffDays = Math.floor(
        (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      );

      learnedToday = diffDays === 0;
      isActive = diffDays <= 1;

      // If more than 1 day has passed, reset streak
      if (diffDays > 1 && streak.currentStreak > 0) {
        streak = await prisma.learningStreak.update({
          where: { userId: session.user.id },
          data: { currentStreak: 0 },
        });
      }
    }

    return NextResponse.json({
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastActivityDate: streak.lastActivityDate,
      isActive,
      learnedToday,
    });
  } catch (error) {
    console.error("Streak API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
