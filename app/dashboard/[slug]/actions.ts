"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function finishCourse(slug: string) {
  const user = await requireUser();

  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      chapter: { select: { lessons: true } },
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const allLessonIds = course.chapter.flatMap((c) => c.lessons.map((l) => l.id));

  const completedLessons = await prisma.lessonProgress.findMany({
    where: {
      userId: user.id,
      lessonId: { in: allLessonIds },
      completed: true,
    },
  });

  if (completedLessons.length !== allLessonIds.length) {
    return { status: "error", message: "You must complete all lessons first." };
  }

  await prisma.enrollment.updateMany({
    where: {
      userId: user.id,
      courseId: course.id,
      status: "Active",
    },
    data: { completed: true },
  });

  let certificate = await prisma.certificate.findFirst({
    where: { userId: user.id, courseId: course.id },
  });

  if (!certificate) {
    certificate = await prisma.certificate.create({
      data: {
        userId: user.id,
        courseId: course.id,
        issuedAt: new Date(),
      },
    });
  }

  revalidatePath(`/dashboard/${slug}`);

  return {
    status: "success",
    message: "Course completed! Redirecting to certificate...",
    certificatePath: `/dashboard/my-certificate/${slug}/certificate/${certificate.id}`,
  };
}