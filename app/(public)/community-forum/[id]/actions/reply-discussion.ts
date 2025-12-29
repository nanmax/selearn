"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/app/data/user/require-user";

export async function replyDiscussion(formData: FormData) {
  const session = await requireUser();

  if (!session) throw new Error("Anda harus login untuk membalas diskusi.");

  const discussionId = formData.get("discussionId") as string;
  const content = formData.get("content") as string;
  const parentId = formData.get("parentId") as string | null;

  if (!content || content.trim().length < 3) {
    throw new Error("Isi balasan minimal 3 karakter.");
  }

  await prisma.reply.create({
    data: {
      content,
      discussionId,
      userId: session.id,
      parentId: parentId || null,
    },
  });

  revalidatePath(`/community-forum/${discussionId}`);
}
