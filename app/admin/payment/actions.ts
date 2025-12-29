/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/app/data/user/require-user";
import dayjs from "dayjs";
import { NameCard } from "@/generated/prisma/client";

export async function getPaymentStats() {
  const user = await requireUser();
  const instructorId = user.id;

  const now = dayjs();
  const startOfMonth = now.startOf("month").toDate();
  const endOfMonth = now.endOf("month").toDate();

  const revenueThisMonth = await prisma.revenue.aggregate({
    where: {
      instructorId,
      createdAt: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { totalAmount: true },
  });

  const salesThisMonth = await prisma.revenue.count({
    where: {
      instructorId,
      createdAt: { gte: startOfMonth, lte: endOfMonth },
    },
  });

  const wallet = await prisma.wallet.findUnique({
    where: { userId: instructorId },
  });

  const lastWithdraw = await prisma.pointTransaction.findFirst({
    where: {
      userId: instructorId,
      type: "ADMIN_ADJUSTMENT",
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    pendapatanBulanIni: revenueThisMonth._sum.totalAmount || 0,
    penjualanBulanIni: salesThisMonth,
    saldoSaatIni: wallet?.balance || 0,
    historyPenarikan: lastWithdraw?.createdAt || null,
  };
}

export async function getPaymentChartData() {
  const user = await requireUser();
  const instructorId = user.id;

  const startDate = dayjs().subtract(6, "month").startOf("month").toDate();
  const endDate = dayjs().endOf("month").toDate();

  const revenues = await prisma.revenue.findMany({
    where: {
      instructorId,
      createdAt: { gte: startDate, lte: endDate },
    },
    include: {
      payment: {
        include: {
          course: true,
        },
      },
    },
  });

  const monthly: Record<string, Record<string, number>> = {};
  const allCourses = new Set<string>();

  revenues.forEach((rev) => {
    const monthName = dayjs(rev.createdAt).format("MMMM");
    const courseName = rev.payment.course.title;

    allCourses.add(courseName);

    if (!monthly[monthName]) monthly[monthName] = {};
    if (!monthly[monthName][courseName]) monthly[monthName][courseName] = 0;

    monthly[monthName][courseName] += rev.totalAmount;
  });

  const sortedMonths = Object.keys(monthly).sort(
    (a, b) => dayjs(a, "MMMM").month() - dayjs(b, "MMMM").month()
  );

  const formatted = sortedMonths.map((month) => ({
    month,
    ...monthly[month],
  }));

  return {
    data: formatted,
    courseKeys: Array.from(allCourses),
  };
}

export async function inputCreditCardInstructor(bank: string, numberCard: string) {
  const user = await requireUser();

  if (!bank || !numberCard) {
    return { success: false, message: "Bank dan nomor rekening harus diisi." };
  }

  const bankEnum = bank as NameCard;

  if (!Object.values(NameCard).includes(bankEnum)) {
    return { success: false, message: "Bank tidak valid." };
  }

  await prisma.$transaction([
    prisma.creditCard.updateMany({
      where: { userId: user.id },
      data: { isActive: false },
    }),

    prisma.creditCard.create({
      data: {
        nameCard: [bankEnum],
        numberCard,
        userId: user.id,
        isActive: true,
      },
    }),
  ]);

  return { success: true };
}

export async function getActiveCreditCard() {
  const user = await requireUser();

  return prisma.creditCard.findFirst({
    where: { userId: user.id, isActive: true },
  });
}

export async function getAllCreditCards() {
  const user = await requireUser();

  return prisma.creditCard.findMany({
    where: { userId: user.id },
    orderBy: { order: "asc" },
  });
}

export async function reorderCreditCards(orderIds: string[]) {
  const user = await requireUser();

  const ops = orderIds.map((id, index) =>
    prisma.creditCard.update({
      where: { id },
      data: { order: index, isActive: index === 0 },
    })
  );

  await prisma.$transaction(ops);

  return { success: true };
}

export async function requestWithdraw(amount: number) {
  const user = await requireUser();

  if (!amount || amount <= 0) {
    return { error: "Nominal tidak valid" };
  }

  const wallet = await prisma.wallet.findUnique({
    where: { userId: user.id }
  });

  if (!wallet) {
    return { error: "Wallet tidak ditemukan" };
  }

  if (wallet.balance < amount) {
    return { error: "Saldo tidak mencukupi" };
  }

  const withdraw = await prisma.withdraw.create({
    data: {
      userId: user.id,
      amount,
      status: "PENDING",
    }
  });

  return { success: true, withdraw };
}