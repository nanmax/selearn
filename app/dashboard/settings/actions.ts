"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/app/data/user/require-user";
import { updatePasswordSchema } from "./_schemas/profile-schema";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function updateProfileAction(formData: {
  fullName: string;
  bio?: string;
  website?: string;
  phone?: string;
  birthDate?: Date | null;
  image?: string;
}) {
  const user = await requireUser();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: formData.fullName,
      bio: formData.bio,
      website: formData.website,
      phone: formData.phone,
      birthDate: formData.birthDate ?? null,
      image: formData.image ?? undefined,
      updatedAt: new Date(),
    },
  });

  return { success: true };
}

export async function getProfile() {
  const user = await requireUser();

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      name: true,
      email: true,
      bio: true,
      website: true,
      phone: true,
      birthDate: true,
      image: true,
    },
  });

  if (!profile) return null;

  return {
    fullName: profile.name || "",
    email: profile.email,
    bio: profile.bio || "",
    website: profile.website || "",
    phone: profile.phone || "",
    birthDate: profile.birthDate
      ? profile.birthDate.toISOString().split("T")[0]
      : "",
    image: profile.image || "",
  };
}

export async function updatePasswordAction(formData: unknown) {
  const user = await requireUser();

  const parsed = updatePasswordSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { currentPassword, newPassword } = parsed.data;

  const account = await prisma.account.findFirst({
    where: { userId: user.id },
  });

  if (!account || !account.password) {
    return {
      error: { currentPassword: ["Akun ini tidak memiliki kata sandi."] },
    };
  }

  const valid = await bcrypt.compare(currentPassword, account.password);
  if (!valid) {
    return { error: { currentPassword: ["Kata sandi saat ini salah."] } };
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.account.updateMany({
    where: { userId: user.id },
    data: { password: hashed, updatedAt: new Date() },
  });

  return { success: true };
}

export async function deleteUserAction() {
  const user = await requireUser();

  await prisma.user.delete({
    where: { id: user.id },
  });

  const cookieStore = await cookies();
  cookieStore.delete("session-token");
  return { success: true };
}
