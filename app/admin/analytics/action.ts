/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export async function getAnalyticsStatsInstructors() {
  const admin = await requireAdmin();

  const totalRevenue = await prisma.revenue.aggregate({
    _sum: { amount: true },
  });

  const totalEnrollments = await prisma.enrollment.count({
    where: { status: "Active" },
  });

  const averageRating = await prisma.courseReview.aggregate({
    _avg: { rating: true },
  });

  const totalProgress = await prisma.lessonProgress.count();
  const completedProgress = await prisma.lessonProgress.count({
    where: { completed: true },
  });

  const completionRate =
    totalProgress === 0
      ? 0
      : Math.round((completedProgress / totalProgress) * 100);

  return {
    totalRevenue: totalRevenue._sum.amount ?? 0,
    totalEnrollments,
    averageRating: averageRating._avg.rating ?? 0,
    completionRate,
  };
}

export async function getMonthlyRevenuePerCourse() {
  const admin = await requireAdmin();

  const courses = await prisma.course.findMany({
    where: { userId: admin.user.id },
    select: { id: true, title: true },
  });

  const courseIds = courses.map((c) => c.id);

  const results = [];

  for (let i = 5; i >= 0; i--) {
    const start = startOfMonth(subMonths(new Date(), i));
    const end = endOfMonth(subMonths(new Date(), i));

    const revenueByCourse = await Promise.all(
      courses.map(async (course) => {
        const revenue = await prisma.revenue.aggregate({
          _sum: { amount: true },
          where: {
            createdAt: { gte: start, lte: end },
            payment: { courseId: course.id },
          },
        });

        return {
          courseId: course.id,
          title: course.title,
          amount: revenue._sum.amount ?? 0,
        };
      })
    );

    results.push({
      month: start.toLocaleString("id-ID", { month: "long" }),
      courses: revenueByCourse,
    });
  }

  return results;
}

export async function getAnalyticsTableData() {
  const admin = await requireAdmin();

  const courses = await prisma.course.findMany({
    where: { userId: admin.user.id },
    include: {
      Payment: true,
      enrollment: true,
      courseReviews: true,
      chapter: {
        include: {
          lessons: {
            include: {
              lessonProgress: true,
            },
          },
        },
      },
    },
  });

  return courses.map((course) => {
    const revenue = course.Payment.reduce((acc, p) => acc + (p.amount || 0), 0);

    const registered = course.enrollment.filter(
      (e) => e.status === "Active"
    ).length;

    const rates =
      course.courseReviews.length > 0
        ? Math.round(
            course.courseReviews.reduce((acc, r) => acc + r.rating, 0) /
              course.courseReviews.length
          )
        : 0;

    const allProgress = course.chapter.flatMap((chap) =>
      chap.lessons.flatMap((l) => l.lessonProgress)
    );

    const completed = allProgress.filter((p) => p.completed).length;

    const completion_rate =
      allProgress.length > 0
        ? Math.round((completed / allProgress.length) * 100)
        : 0;

    return {
      id: course.id,
      course: course.title,
      revenue,
      registered,
      rates,
      completion_rate,
    };
  });
}
