import { EmptyState } from "@/components/general/EmptyState";
import { getAllCourse } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import { CourseProgressCard } from "./_components/CourseProgressCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UserCardsStudent from "./_components/user-cards";
import ContinueCardCourse from "./_components/continue-card-course";
import React from "react";
import { getUserStats } from "../data/user/get-user-card-stats";
import { getContinueCourse } from "../data/user/get-continue-course";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const [courses, enrolledCourses, stats, continueCourse] = await Promise.all([
    getAllCourse(),
    getEnrolledCourses(),
    getUserStats(),
    getContinueCourse(),
  ]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          Selamat datang kembali,{" "}
          <span className="text-primary">{session.user.name ?? "user"}</span>🖐!
        </h1>
        <p className="text-muted-foreground">
          Mari lanjutkan perjalanan belajarmu hari ini.
        </p>
        <UserCardsStudent stats={stats} />
        {continueCourse?.Course ? (
          <ContinueCardCourse data={continueCourse} />
        ) : (
          <EmptyState
            title="Belum ada kursus yang sedang kamu ikuti"
            description="Mulai belajar sekarang dan lanjutkan progresmu di sini!"
            buttonText="Lihat Kursus"
            href="/courses"
          />
        )}
      </div>
      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No courses purchased"
          description="You haven't purchased any courses yet."
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold">Semua Kursus Saya</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {enrolledCourses.map((course) => (
              <React.Fragment key={course.Course.id}>
                <CourseProgressCard data={course} />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
      <section className="mt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you can purchase
          </p>
        </div>

        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ Course: enrolled }) => enrolled.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="No courses available"
            description="You have already purchases all available courses"
            buttonText="Browse courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ Course: enrolled }) => enrolled.id === course.id
                  )
              )
              .map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
