"use server";

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { requireAdmin } from "./require-admin";

export async function updateProfileAction(formData: {
  fullName: string;
  bio?: string;
  roleInstructor?: string;
  website?: string;
  phone?: string;
  birthDate?: Date | null;
  image?: string;
}) {
  const { user } = await requireAdmin();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: formData.fullName,
      bio: formData.bio,
      roleInstructor: formData.roleInstructor,
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
  const { user } = await requireAdmin();

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      name: true,
      email: true,
      bio: true,
      roleInstructor: true,
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
    roleInstructor: profile.roleInstructor || "",
    bio: profile.bio || "",
    website: profile.website || "",
    phone: profile.phone || "",
    birthDate: profile.birthDate
      ? profile.birthDate.toISOString().split("T")[0]
      : "",
    image: profile.image || "",
  };
}

export async function deleteUserAction() {
  const { user } = await requireAdmin();

  await prisma.user.delete({
    where: { id: user.id },
  });

  const cookieStore = await cookies();
  cookieStore.delete("session-token");
  return { success: true };
}
