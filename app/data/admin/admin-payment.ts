/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCreditCard(formData: FormData) {
  const { user } = await requireAdmin();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");

  const nameCard = formData.get("nameCard") as string;
  const numberCard = formData.get("numberCard") as string;

  if (!nameCard || !numberCard) throw new Error("Both fields are required.");

  await prisma.creditCard.create({
    data: {
      nameCard: [nameCard.toUpperCase() as any],
      numberCard,
      userId: user.id,
    },
  });

  revalidatePath("/admin/settings");
}

export async function updateCreditCard(formData: FormData, id: string) {
  const { user } = await requireAdmin();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");

  const nameCard = formData.get("nameCard") as string;
  const numberCard = formData.get("numberCard") as string;

  if (!nameCard || !numberCard) throw new Error("Both fields are required.");

  await prisma.creditCard.update({
    where: { id },
    data: {
      nameCard: [nameCard.toUpperCase() as any],
      numberCard,
    },
  });

  revalidatePath("/admin/settings");
}

export async function setActiveCreditCard(cardId: string) {
  const { user } = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  await prisma.creditCard.updateMany({
    where: { userId: user.id },
    data: { isActive: false },
  });

  await prisma.creditCard.update({
    where: { id: cardId },
    data: { isActive: true },
  });

  revalidatePath("/admin/settings");
}

export async function getCreditCard() {
  const { user } = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  return await prisma.creditCard.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}
