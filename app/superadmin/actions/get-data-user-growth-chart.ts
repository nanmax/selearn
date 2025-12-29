"use server";

import { prisma } from "@/lib/db";

type UserGrowthBucket = {
  month: string;
  instructors: number;
  students: number;
};

export async function getUserGrowthChart(
  months: number = 6
): Promise<UserGrowthBucket[]> {
  const now = new Date();

  const buckets: UserGrowthBucket[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    buckets.push({
      month: d.toLocaleString("en-US", { month: "long" }),
      instructors: 0,
      students: 0,
    });
  }

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth() - (months - 1),
    1
  );

  const users = await prisma.user.findMany({
    where: { createdAt: { gte: startDate } },
    select: {
      role: true,
      createdAt: true,
    },
  });

  users.forEach((user) => {
    const index =
      user.createdAt.getMonth() -
      startDate.getMonth() +
      12 * (user.createdAt.getFullYear() - startDate.getFullYear());

    if (index < 0 || index >= buckets.length) return;

    if (user.role === "admin") buckets[index].instructors++;
    if (user.role === "user") buckets[index].students++;
  });

  return buckets;
}
