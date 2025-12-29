import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "./require-user";

export async function getMyCourses() {
  const user = await requireUser();

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    include: {
      Course: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
          chapter: {
            include: {
              lessons: {
                include: {
                  lessonProgress: {
                    where: { userId: user.id },
                  },
                },
              },
            },
          },
          Certificate: { select: { id: true } },
        },
      },
    },
    orderBy: { createAt: "desc" },
  });

  return enrollments.map((e) => {
    const lessons = e.Course.chapter.flatMap((ch) => ch.lessons);
    const totalLessons = lessons.length;
    const completedLessons = lessons.filter(
      (lesson) =>
        lesson.lessonProgress.length > 0 && lesson.lessonProgress[0].completed
    ).length;

    const progress =
      totalLessons === 0
        ? 0
        : Math.round((completedLessons / totalLessons) * 100);

    return {
      id: e.Course.id,
      certificateId: e.Course.Certificate?.[0]?.id ?? null,
      title: e.Course.title,
      slug: e.Course.slug,
      instructor: e.Course.user.name,
      thumbnail: e.Course.fileKey,
      progress,
      ctaLabel: progress === 100 ? "Lihat Sertifikat" : "Lanjutkan Belajar",
      ctaVariant: progress === 100 ? "outline" : "primary",
    };
  });
}

export type MyCoursesType = Awaited<ReturnType<typeof getMyCourses>>[0];
