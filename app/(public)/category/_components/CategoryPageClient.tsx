/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { CourseCard } from "../../_components/CourseCard";

interface CategoryPageClientProps {
  courses: any[];
  categoryName: string;
  description: string;
}

const ITEMS_PER_PAGE = 8;

export const CategoryPageClient = ({
  courses,
  categoryName,
  description,
}: CategoryPageClientProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const levels = useMemo(() => {
    const uniqueLevels = Array.from(
      new Set(courses.map((c) => c.level?.toLowerCase()))
    ).filter(Boolean) as string[];
    return ["all", ...uniqueLevels];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (filter === "all") return courses;
    return courses.filter((c) => c.level?.toLowerCase() === filter);
  }, [filter, courses]);

  const currentCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredCourses]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">{categoryName}</h1>
      <p className="text-muted-foreground mb-6">{description}</p>

      <div className="flex gap-4 mb-6 flex-wrap">
        {levels.map((level) => (
          <button
            key={level}
            className={`px-4 py-2 rounded-md ${
              filter === level ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setFilter(level);
              setCurrentPage(1);
            }}>
            {level === "all"
              ? "All"
              : level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="col-span-full text-center">No courses found</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
