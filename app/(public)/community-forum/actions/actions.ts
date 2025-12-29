"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { DiscussionSchema } from "../_schemas/discussion-schemas";

export async function createDiscussion(formData: FormData) {
  const cookieStore = await cookies();

  const session = await auth.api.getSession({
    headers: { cookie: cookieStore.toString() },
  });

  if (!session?.user) {
    throw new Error("Anda harus login untuk membuat diskusi.");
  }

  const rawData = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    content: formData.get("content") as string,
  };

  const parsed = DiscussionSchema.safeParse(rawData);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Validasi gagal. Mohon periksa kembali input Anda.");
  }

  const { title, category, content } = parsed.data;

  await prisma.discussion.create({
    data: {
      title,
      category,
      content,
      userId: session.user.id,
    },
  });

  revalidatePath("/community-forum");
}

export async function getDiscussionById(id: string) {
  if (!id) return null;

  const discussion = await prisma.discussion.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, image: true } },
      replies: {
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return discussion;
}
