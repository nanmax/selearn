import "server-only";
import { prisma } from "@/lib/db";
import { requireUser } from "@/app/data/user/require-user";

export async function getCertificateData(certificateId: string) {
  const user = await requireUser();

  const certificate = await prisma.certificate.findUnique({
    where: { id: certificateId },
    include: {
      course: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });

  if (!certificate || certificate.user.id !== user.id) {
    throw new Error("Certificate not found or access denied");
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: user.id,
      courseId: certificate.course.id,
      completed: true,
    },
  });

  if (!enrollment) {
    throw new Error("Course not completed");
  }

  const courseCreator = certificate.course.user
    ? certificate.course.user.name ||
      certificate.course.user.roleInstructor ||
      "Instruktur Tidak Diketahui"
    : "Instruktur Tidak Diketahui";

  console.log("Certificate:", certificate);
  console.log("Course user:", certificate.course.user);

  return {
    certificateId: certificate.id,
    issuedAt: certificate.issuedAt,
    userName: certificate.user.name,
    courseTitle: certificate.course.title,
    courseCreator,
  };
}
