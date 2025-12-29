"use server";

import { prisma } from "@/lib/db";

export async function adminGetLatestReviews() {
  const reviews = await prisma.courseReview.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      course: true,
    },
  });

  return reviews.map((r) => ({
    content: r.comment ?? "",
    author: r.user.name,
    course: r.course.title,
    rating: r.rating,
  }));
}
