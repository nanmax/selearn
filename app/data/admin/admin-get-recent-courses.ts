import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetRecentCourses() {
  const session = await requireAdmin();

  const data = await prisma.course.findMany({
    where: {
      userId: session.user.id, // Only show courses owned by this instructor
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 2,
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      status: true,
      approvalStatus: true,
      price: true,
      fileKey: true,
      slug: true,
    },
  });

  return data;
}

export type AdminRecentCourseType = Awaited<ReturnType<typeof adminGetRecentCourses>>[0];