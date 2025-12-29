"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

function generateReferralCode(name: string): string {
  const prefix = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${randomPart}`;
}

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { referralCode: true, name: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Jika sudah punya referral code, kembalikan yang ada
    if (user.referralCode) {
      return NextResponse.json({ referralCode: user.referralCode });
    }

    // Generate referral code baru yang unik
    let referralCode = generateReferralCode(user.name);
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const existing = await prisma.user.findUnique({
        where: { referralCode },
      });

      if (!existing) break;

      referralCode = generateReferralCode(user.name);
      attempts++;
    }

    if (attempts >= maxAttempts) {
      return NextResponse.json(
        { error: "Failed to generate unique referral code" },
        { status: 500 }
      );
    }

    // Simpan referral code
    await prisma.user.update({
      where: { id: session.user.id },
      data: { referralCode },
    });

    return NextResponse.json({ referralCode });
  } catch (error) {
    console.error("Generate referral code error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { referralCode: true, points: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      referralCode: user.referralCode,
      points: user.points,
    });
  } catch (error) {
    console.error("Get referral info error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
