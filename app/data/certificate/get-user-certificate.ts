"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/app/data/user/require-user";

export async function getUserCertificates() {
  const user = await requireUser();

  const certificates = await prisma.certificate.findMany({
    where: { userId: user.id },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          fileKey: true,
        },
      },
    },
    orderBy: { issuedAt: "desc" },
  });

  return certificates.map((cert) => ({
    id: cert.id,
    issuedAt: cert.issuedAt.toISOString(),
    course: cert.course,
  }));
}
