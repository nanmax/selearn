import "server-only";

import { prisma } from "@/lib/db";

export async function getHistoryPayment(userId: string) {
  const payments = await prisma.payment.findMany({
    where: { userId },
    include: {
      course: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return payments.map((payment) => ({
    id: payment.id,
    issuedAt: payment.createdAt.toISOString(),
    courseTitle: payment.course.title,
    courseSlug: payment.course.slug,
    paymentMethod: payment.provider || "Xendit",
    total: payment.amount,
    invoiceUrl: payment.invoiceUrl,
    status: getPaymentStatusLabel(payment.status),
  }));
}

function getPaymentStatusLabel(status: string): "Berhasil" | "Gagal" | "Pending" {
  switch (status) {
    case "PAID":
      return "Berhasil";
    case "FAILED":
    case "CANCELLED":
      return "Gagal";
    default:
      return "Pending";
  }
}
