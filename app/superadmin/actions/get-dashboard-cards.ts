"use server";

import { prisma } from "@/lib/db";

export type DashboardCardKey =
  | "signups"
  | "customers"
  | "courses"
  | "lessons"
  | "instructors"
  | "categories"
  | "platformRevenue"
  | "instructorRevenueThisMonth"
  | "averageCourseRating";

export async function getDashboardCards(keys: DashboardCardKey[]) {
  const results: Record<DashboardCardKey, number> = {
    signups: 0,
    customers: 0,
    courses: 0,
    lessons: 0,
    instructors: 0,
    categories: 0,
    platformRevenue: 0,
    instructorRevenueThisMonth: 0,
    averageCourseRating: 0,
  };

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  if (keys.includes("signups")) {
    results.signups = await prisma.user.count({
      where: {
        role: "user",
      },
    });
  }

  if (keys.includes("customers")) {
    results.customers = await prisma.enrollment.count({
      where: { status: "Active" },
    });
  }

  if (keys.includes("courses")) {
    results.courses = await prisma.course.count();
  }

  if (keys.includes("lessons")) {
    results.lessons = await prisma.lesson.count();
  }

  if (keys.includes("instructors")) {
    results.instructors = await prisma.user.count({
      where: {
        role: "admin",
      },
    });
  }

  if (keys.includes("platformRevenue")) {
    const revenue = await prisma.revenue.aggregate({
      _sum: { platformFee: true },
    });
    results.platformRevenue = revenue._sum.platformFee ?? 0;
  }

  if (keys.includes("instructorRevenueThisMonth")) {
    const revenue = await prisma.revenue.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        instructor: {
          role: "admin",
        },
      },
    });

    results.instructorRevenueThisMonth = revenue._sum.amount ?? 0;
  }

  if (keys.includes("averageCourseRating")) {
    const rating = await prisma.courseReview.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        course: {
          user: {
            role: "admin",
          },
        },
      },
    });

    results.averageCourseRating = rating._avg.rating
      ? Number(rating._avg.rating.toFixed(1))
      : 0;
  }

  return results;
}
