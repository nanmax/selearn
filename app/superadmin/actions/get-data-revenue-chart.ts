"use server";

import { prisma } from "@/lib/db";
import { RevenueRange } from "../_components/chart-area-revenue";

export type RevenueChartItem = {
  month: string;
  revenue: number;
};

export async function getPlatformRevenueChart(
  range: RevenueRange
): Promise<RevenueChartItem[]> {
  const now = new Date();
  const startDate = new Date();

  switch (range) {
    case "3M":
      startDate.setMonth(now.getMonth() - 2);
      break;
    case "6M":
      startDate.setMonth(now.getMonth() - 5);
      break;
    case "9M":
      startDate.setMonth(now.getMonth() - 8);
      break;
    case "1Y":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  startDate.setDate(1);

  const rows = await prisma.revenue.findMany({
    where: {
      createdAt: { gte: startDate },
    },
    select: {
      platformFee: true,
      createdAt: true,
    },
  });

  const grouped = new Map<string, number>();

  rows.forEach((row) => {
    const key = row.createdAt.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    grouped.set(key, (grouped.get(key) ?? 0) + row.platformFee);
  });

  return Array.from(grouped.entries())
    .map(([month, revenue]) => ({ month, revenue }))
    .sort(
      (a, b) =>
        new Date(a.month).getTime() - new Date(b.month).getTime()
    );
}
