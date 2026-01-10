import "server-only";

import { prisma } from "@/lib/db";

export async function getAllCourse() {
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
      approvalStatus: "Approved", // Hanya tampilkan course yang sudah approved HR
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      price: true,
      smallDescription: true,
      slug: true,
      fileKey: true,
      id: true,
      level: true,
      duration: true,
      category: true,

      user: {
        select: {
          name: true,
          image: true,
        }
      }
    },
  });

  return data;
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourse>>[0];