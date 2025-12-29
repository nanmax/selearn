import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { adminGetRevenueStats, getAdminPopularCourses } from "../data/admin/admin-get-enrollment-stats";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  adminGetRecentCourses,
  AdminRecentCourseType,
} from "../data/admin/admin-get-recent-courses";
import { EmptyState } from "@/components/general/EmptyState";
import {
  AdminCourseCard,
  AdminCourseCardSkeleton,
} from "./courses/_components/AdminCourseCard";
import { Suspense } from "react";
import PopolarCourse from "./courses/_components/PopolarCourse";
import { adminGetLatestReviews } from "./courses/data/admin-get-reviews";

export default async function AdminIndexPage() {
  const enrollmentData = await adminGetRevenueStats();
  const popularCourses = await getAdminPopularCourses();
  const latestReviews = await adminGetLatestReviews();

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={enrollmentData} />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Kursus Terbaru</h2>
          <Link
            href="/admin/courses"
            className={buttonVariants({ variant: "outline" })}>
            Lihat Semua Kursus
          </Link>
        </div>
        <Suspense fallback={<RenderRecentCoursesSkeletonLayout />}>
          <RenderRecentCourses />
        </Suspense>
        <PopolarCourse data={popularCourses} reviews={latestReviews} />
      </div>
    </>
  );
}

async function RenderRecentCourses() {
  const data = await adminGetRecentCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        buttonText="Buat Kursus Baru"
        description="Anda belum punya kursus. Buat beberapa untuk melihatnya di sini."
        title="Anda belum memiliki kursus apa pun!"
        href="/admin/courses/create"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {data.map((course: AdminRecentCourseType) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

function RenderRecentCoursesSkeletonLayout() {
  return (
    <div className="grid gird-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
