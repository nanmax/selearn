import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";

// Revenue split configuration - configurable
const INSTRUCTOR_SHARE_PERCENTAGE = 0.7; // 70% untuk instruktur

export async function POST(req: Request) {
  try {
    const callbackToken = req.headers.get("x-callback-token");

    if (callbackToken !== env.XENDIT_CALLBACK_TOKEN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const rawBody = await req.json();
    const body = rawBody.data ?? rawBody;
    const { external_id, status, paid_amount, amount } = body;

    // Log webhook untuk debugging
    await prisma.webhookLog.create({
      data: {
        event: status || "UNKNOWN",
        payload: body,
      },
    });

    if (!external_id || !status) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Hanya proses status PAID atau SETTLED
    if (!["PAID", "SETTLED"].includes(status)) {
      return NextResponse.json({ received: true, message: `Ignored status: ${status}` });
    }

    // Gunakan interactive transaction dengan isolation untuk mencegah race condition
    const result = await prisma.$transaction(async (tx) => {
      // Lock payment row dengan findFirst + where untuk atomic check
      const payment = await tx.payment.findUnique({
        where: { externalId: external_id },
        include: {
          course: { include: { user: true } },
          revenue: true,
        },
      });

      if (!payment) {
        return { status: "not_found" };
      }

      // Sudah diproses sebelumnya - idempotent response
      if (payment.status === "PAID" || payment.revenue) {
        return { status: "already_processed" };
      }

      const amountPaid = paid_amount ?? amount ?? payment.amount;
      const instructorShare = Math.floor(amountPaid * INSTRUCTOR_SHARE_PERCENTAGE);
      const platformFee = amountPaid - instructorShare;

      // 1. Update payment status
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: "PAID",
          paidAt: new Date(),
        },
      });

      // 2. Aktivasi enrollment
      await tx.enrollment.updateMany({
        where: {
          userId: payment.userId,
          courseId: payment.courseId,
        },
        data: { status: "Active" },
      });

      // 3. Buat revenue record
      await tx.revenue.create({
        data: {
          paymentId: payment.id,
          instructorId: payment.course.userId,
          amount: instructorShare,
          platformFee,
          totalAmount: amountPaid,
        },
      });

      // 4. Update wallet instruktur
      await tx.wallet.upsert({
        where: { userId: payment.course.userId },
        update: { balance: { increment: instructorShare } },
        create: { userId: payment.course.userId, balance: instructorShare },
      });

      return {
        status: "success",
        data: { amountPaid, instructorShare, platformFee },
      };
    });

    // Handle transaction result
    if (result.status === "not_found") {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (result.status === "already_processed") {
      return NextResponse.json({ received: true, message: "Already processed" });
    }

    return NextResponse.json({ received: true, processed: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
