import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetRevenueStats() {
  await requireAdmin();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const payments = await prisma.payment.findMany({
    where: {
      status: "PAID",
      createdAt: { gte: thirtyDaysAgo },
    },
    include: {
      revenue: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const last30Days: {
    date: string;
    instructorRevenue: number;
    selearnRevenue: number;
    totalRevenue: number;
  }[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    last30Days.push({
      date: d.toISOString().split("T")[0],
      instructorRevenue: 0,
      selearnRevenue: 0,
      totalRevenue: 0,
    });
  }

  payments.forEach((payment) => {
    const dateKey = payment.createdAt.toISOString().split("T")[0];
    const idx = last30Days.findIndex((d) => d.date === dateKey);

    if (idx >= 0) {
      const price = payment.amount;

      const instructorShare = Math.round(price * 0.7);
      const selearnShare = Math.round(price * 0.3);

      last30Days[idx].instructorRevenue += instructorShare;
      last30Days[idx].selearnRevenue += selearnShare;
      last30Days[idx].totalRevenue += price;
    }
  });

  return last30Days;
}

export async function getAdminPopularCourses() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        Payment: {
          select: {
            revenue: {
              select: {
                amount: true,
              },
            },
          },
        },
        enrollment: true,
      },
    });

    const result = courses.map((c) => {
      const totalRevenue = c.Payment.reduce((acc, p) => {
        return acc + (p.revenue?.amount ?? 0);
      }, 0);

      const totalRegistration = c.enrollment.length;

      return {
        name: c.title,
        registration: totalRegistration,
        revenue: totalRevenue,
      };
    });

    return result.sort((a, b) => b.revenue - a.revenue);
  } catch (error) {
    console.error("Error getAdminPopularCourses:", error);
    return [];
  }
}
