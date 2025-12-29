import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "./require-user";

export async function getUserStats() {
  const user = await requireUser();

  const [enrolledCount, completedCount, certificateCount, totalDurationAgg] =
    await Promise.all([
      prisma.enrollment.count({
        where: { userId: user.id },
      }),
      prisma.enrollment.count({
        where: { userId: user.id, completed: true },
      }),
      prisma.certificate.count({
        where: { userId: user.id },
      }),
      prisma.course.aggregate({
        _sum: {
          duration: true,
        },
        where: {
          enrollment: {
            some: {
              userId: user.id,
            },
          },
        },
      }),
    ]);

  const totalDuration = totalDurationAgg._sum.duration ?? 0;

  return {
    enrolledCount,
    completedCount,
    certificateCount,
    totalDuration,
  };
}
