"use server";

import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export const getCourseCategories = async () => {
  try {
    const categories = await prisma.course.findMany({
      where: {
        status: "Published",
      },
      select: {
        fileKey: true,
        category: true,
      },
      distinct: ["category"],
    });

    return categories.map((item) => item.category);
  } catch (error) {
    console.error("Failed to fetch course categories:", error);
    return [];
  }
};

export const getCoursesByCategorySlug = async (slug: string) => {
  const allCategories = await prisma.course.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  const currentCategory = allCategories.find(
    (c) => slugify(c.category) === slug
  );

  if (!currentCategory) {
    return { categoryName: null, courses: [] };
  }

  const courses = await prisma.course.findMany({
    where: {
      category: currentCategory.category,
      status: "Published",
    },
    include: {
      user: true,
    }
  });

  return { categoryName: currentCategory.category, courses: courses };
};
