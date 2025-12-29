"use server";

import { prisma } from "@/lib/db";

export async function searchCourses(query: string) {
  const q = query.toLowerCase();

  const results = await prisma.course.findMany({
    where: {
      OR: [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: q,
            mode: "insensitive",
          },
        }
      ],
    },
    include: {
      user: true,
    },
  });

  return results;
}
