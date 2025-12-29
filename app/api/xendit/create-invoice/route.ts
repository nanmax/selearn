/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Revenue split configuration
const INSTRUCTOR_SHARE_PERCENTAGE = 0.7; // 70% untuk instruktur
const PLATFORM_FEE_PERCENTAGE = 0.3; // 30% untuk platform

export async function POST(req: Request) {
  try {
    // Validasi session - CRITICAL: Pastikan user terautentikasi
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const { courseId, usePoints = 0 } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Missing courseId" },
        { status: 400 }
      );
    }

    // Validasi usePoints harus non-negative integer
    const validatedPoints = Math.max(0, Math.floor(Number(usePoints) || 0));

    // Gunakan userId dari session, bukan dari request body (SECURITY FIX)
    const userId = session.user.id;

    const [course, user] = await Promise.all([
      prisma.course.findUnique({ where: { id: courseId } }),
      prisma.user.findUnique({ where: { id: userId } }),
    ]);

    if (!course || !user) {
      return NextResponse.json(
        { error: "Course or user not found" },
        { status: 404 }
      );
    }

    // Cek apakah user sudah enrolled dan aktif
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    if (existingEnrollment?.status === "Active") {
      return NextResponse.json(
        { error: "Anda sudah terdaftar di kursus ini" },
        { status: 400 }
      );
    }

    // Validasi penggunaan poin dengan nilai yang sudah divalidasi
    const pointsToUse = Math.min(validatedPoints, user.points, course.price);
    const finalAmount = course.price - pointsToUse;

    // Jika pembayaran full dengan poin (gratis)
    if (finalAmount === 0) {
      // Gunakan interactive transaction untuk memastikan atomicity
      await prisma.$transaction(async (tx) => {
        // 1. Aktivasi enrollment
        await tx.enrollment.upsert({
          where: { userId_courseId: { userId, courseId } },
          update: { amount: 0, status: "Active", updateAt: new Date() },
          create: { userId, courseId, amount: 0, status: "Active" },
        });

        // 2. Kurangi poin user
        await tx.user.update({
          where: { id: userId },
          data: { points: { decrement: pointsToUse } },
        });

        // 3. Catat transaksi poin
        await tx.pointTransaction.create({
          data: {
            userId,
            amount: -pointsToUse,
            type: "COURSE_REDEMPTION",
            description: `Pembelian kursus: ${course.title}`,
            referenceId: courseId,
          },
        });

        // 4. Buat payment record
        const payment = await tx.payment.create({
          data: {
            userId,
            courseId,
            amount: 0,
            provider: "POINTS",
            status: "PAID",
            paidAt: new Date(),
          },
        });

        // 5. Buat revenue record (0 karena pakai poin)
        await tx.revenue.create({
          data: {
            paymentId: payment.id,
            instructorId: course.userId,
            amount: 0,
            platformFee: 0,
            totalAmount: 0,
          },
        });
      });

      return NextResponse.json({
        success: true,
        message: "Pembayaran berhasil dengan poin!",
        paidWithPoints: true
      });
    }

    const enrollment = await prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { amount: finalAmount, status: "Pending", updateAt: new Date() },
      create: { userId, courseId, amount: finalAmount, status: "Pending" },
    });

    const xenditRes = await fetch("https://api.xendit.co/v2/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${env.XENDIT_API_KEY}:`).toString("base64"),
      },
      body: JSON.stringify({
        external_id: enrollment.id,
        amount: finalAmount,
        payer_email: user.email,
        description: `Pembelian kursus ${course.title}${pointsToUse > 0 ? ` (Diskon poin: Rp ${pointsToUse.toLocaleString()})` : ""}`,
        success_redirect_url: `${env.BETTER_AUTH_URL}/payment/success`,
        failure_redirect_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
        currency: "IDR",
      }),
    });

    const data = await xenditRes.json();
    if (!xenditRes.ok) {
      return NextResponse.json({ error: "Gagal membuat invoice pembayaran" }, { status: 500 });
    }

    // Gunakan transaction untuk konsistensi data
    await prisma.$transaction(async (tx) => {
      // Jika menggunakan poin partial, kurangi poin
      if (pointsToUse > 0) {
        await tx.user.update({
          where: { id: userId },
          data: { points: { decrement: pointsToUse } },
        });

        await tx.pointTransaction.create({
          data: {
            userId,
            amount: -pointsToUse,
            type: "COURSE_REDEMPTION",
            description: `Diskon poin untuk kursus: ${course.title}`,
            referenceId: enrollment.id,
          },
        });
      }

      // Buat payment record
      await tx.payment.create({
        data: {
          userId,
          courseId,
          amount: finalAmount,
          provider: "XENDIT",
          status: "PENDING",
          externalId: data.external_id,
          invoiceUrl: data.invoice_url,
        },
      });

      // Update enrollment dengan payment link
      await tx.enrollment.update({
        where: { id: enrollment.id },
        data: { paymentLink: data.invoice_url },
      });
    });

    return NextResponse.json({
      invoice_url: data.invoice_url,
      pointsUsed: pointsToUse,
      finalAmount
    });
  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
