"use server";

import { Discussion, Reply, User } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
// import { Discussion, Reply, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";

export type ReplyWithChildren = Reply & {
  user: Pick<User, "name" | "image">;
  children: (Reply & {
    user: Pick<User, "name" | "image">;
  })[];
};

export type DiscussionWithReplies = Discussion & {
  user: Pick<User, "name" | "image">;
  replies: ReplyWithChildren[];
};

export async function getDiscussions() {
  const discussions = await prisma.discussion.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, image: true } },
      _count: { select: { replies: true } },
    },
  });

  return discussions.map((d) => ({
    id: d.id,
    title: d.title,
    author: d.user.name,
    image:
      d.user.image ||
      `https://placehold.co/48x48/60a5fa/ffffff?text=${d.user.name[0]}`,
    category: d.category,
    categoryColor: getCategoryColor(d.category),
    replies: d._count.replies || 0,
    views: d.views,
    createdAt: formatDistanceToNow(new Date(d.createdAt), {
      addSuffix: true,
      locale: localeId,
    }),
  }));
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Web Development":
      return "bg-green-100 text-green-800";
    case "Desain":
    case "Design Grafis":
      return "bg-purple-100 text-purple-800";
    case "Bisnis":
      return "bg-amber-100 text-amber-800";
    case "Pemasaran":
    case "Marketing":
      return "bg-red-100 text-red-800";
    default:
      return "bg-slate-200 text-slate-800";
  }
}

export async function getDiscussionById(
  id: string
): Promise<DiscussionWithReplies | null> {
  const discussion = await prisma.discussion.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, image: true } },
      replies: {
        where: { parentId: null },
        include: {
          user: { select: { name: true, image: true } },
          children: {
            include: {
              user: { select: { name: true, image: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!discussion) return null;

  return discussion as DiscussionWithReplies;
}
