import {
  AdminCourseType,
  adminGetCourses,
} from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  AdminCourseCard,
  AdminCourseCardSkeleton,
} from "./_components/AdminCourseCard";
import { EmptyState } from "@/components/general/EmptyState";
import { Suspense } from "react";

export default function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kursus kamu</h1>
        <Link className={buttonVariants()} href="/admin/courses/create">
          Buat Kursus
        </Link>
      </div>

      <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
        <RenderCourse />
      </Suspense>
    </>
  );
}

async function RenderCourse() {
  const data = await adminGetCourses();

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="Tidak ada kursus"
          description="Buat kursus baru untuk memulai."
          buttonText="Buat Kursus"
          href="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
          {data.map((course: AdminCourseType) => (
            <AdminCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  );
}

function AdminCourseCardSkeletonLayout() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {Array.from({ length: 6 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
