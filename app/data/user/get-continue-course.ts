import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "./require-user";

export async function getContinueCourse() {
  const user = await requireUser();

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: user.id,
      completed: false,
    },
    include: {
      Course: {
        include: {
          user: true,
          chapter: {
            include: {
              lessons: {
                include: {
                  lessonProgress: {
                    where: {
                      userId: user.id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!enrollment || !enrollment.Course) return null;

  const lessons = enrollment.Course.chapter.flatMap((ch) => ch.lessons);
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(
    (lesson) => lesson.lessonProgress.length > 0 && lesson.lessonProgress[0].completed
  ).length;

  const progress =
    totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  const nextLesson =
    enrollment.Course.chapter
      .flatMap((ch) => ch.lessons)
      .find(
        (lesson) =>
          lesson.lessonProgress.length === 0 ||
          !lesson.lessonProgress[0].completed
      ) || enrollment.Course.chapter[0]?.lessons[0];

  return {
    ...enrollment,
    nextLessonId: nextLesson?.id ?? null,
    slug: enrollment.Course.slug,
    progress,
  };
}
