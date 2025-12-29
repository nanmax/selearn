import {
  getAllCourse,
  PublicCourseType,
} from "@/app/data/course/get-all-courses";
import {
  PublicCourseCard,
  PublicCourseCardSkeleton,
} from "../_components/PublicCourseCard";
import { Suspense } from "react";
import { searchCourses } from "../actions/searchCourse";

export default async function PublicCourseRoute({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="m-5 p-5">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#007bff]">
          Jelajahi Kursus di Selearn
        </h1>
        <p className="text-muted-foreground">
          Temukan berbagai kursus kami yang dirancang untuk membantu Anda
          mencapai tujuan pembelajaran Anda.
        </p>
      </div>
      <Suspense fallback={<LoadingSkeletonLayout />}>
        <RenderCourse query={params.query} />
      </Suspense>
    </div>
  );
}

async function RenderCourse({ query }: { query?: string }) {
  const courses: PublicCourseType[] = query
    ? await searchCourses(query)
    : await getAllCourse();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {courses.map((course: PublicCourseType) => (
        <PublicCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
