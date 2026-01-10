import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetCourse(id: string) {
  const session = await requireAdmin();

  const data = await prisma.course.findUnique({
    where: {
      id: id,
      userId: session.user.id, // Only allow owner to access
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      approvalStatus: true,
      slug: true,
      smallDescription: true,
      category: true,
      chapter: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
              description: true,
              thumbnailKey: true,
              position: true,
              videoKey: true,
            },
          },
          quiz: {
            select: {
              id: true,
              title: true,
              passingScore: true,
              isActive: true,
              _count: {
                select: {
                  questions: true,
                  attempts: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminCourseSingularType = Awaited<
  ReturnType<typeof adminGetCourse>
>;
