"use server";

import { requireUser } from "@/app/data/user/require-user";
import { env } from "@/lib/env";
import { prisma } from "@/lib/db";

export async function enrollInCourseAction(courseId: string) {
  const user = await requireUser();

  try {
    if (!courseId) {
      return {
        status: "error" as const,
        message: "Missing courseId",
      };
    }

    const [course, dbUser] = await Promise.all([
      prisma.course.findUnique({ where: { id: courseId } }),
      prisma.user.findUnique({ where: { id: user.id } }),
    ]);

    if (!course || !dbUser) {
      return {
        status: "error" as const,
        message: "Course or user not found",
      };
    }

    // Check if user is already enrolled and active
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId } },
    });

    if (existingEnrollment?.status === "Active") {
      return {
        status: "error" as const,
        message: "Anda sudah terdaftar di kursus ini",
      };
    }

    const finalAmount = course.price;

    // Create pending enrollment
    const enrollment = await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: user.id, courseId } },
      update: { amount: finalAmount, status: "Pending", updateAt: new Date() },
      create: { userId: user.id, courseId, amount: finalAmount, status: "Pending" },
    });

    // Call Xendit API to create invoice
    const xenditRes = await fetch("https://api.xendit.co/v2/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${env.XENDIT_API_KEY}:`).toString("base64"),
      },
      body: JSON.stringify({
        external_id: enrollment.id,
        amount: finalAmount,
        payer_email: dbUser.email,
        description: `Pembelian kursus ${course.title}`,
        success_redirect_url: `${env.BETTER_AUTH_URL}/payment/success`,
        failure_redirect_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
        currency: "IDR",
      }),
    });

    const data = await xenditRes.json();

    if (!xenditRes.ok) {
      return {
        status: "error" as const,
        message: "Gagal membuat invoice pembayaran",
      };
    }

    // Create payment record and update enrollment
    await prisma.$transaction(async (tx) => {
      await tx.payment.create({
        data: {
          userId: user.id,
          courseId,
          amount: finalAmount,
          provider: "XENDIT",
          status: "PENDING",
          externalId: data.external_id,
          invoiceUrl: data.invoice_url,
        },
      });

      await tx.enrollment.update({
        where: { id: enrollment.id },
        data: { paymentLink: data.invoice_url },
      });
    });

    return {
      status: "success" as const,
      message: "Redirecting to Xendit payment page...",
      invoiceUrl: data.invoice_url,
    };
  } catch (error) {
    return {
      status: "error" as const,
      message: "An error occurred. Please try again later.",
    };
  }
}
