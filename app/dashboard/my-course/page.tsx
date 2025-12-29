import { getMyCourses } from "@/app/data/user/get-my-courses";
import { getContinueCourse } from "@/app/data/user/get-continue-course";
import { EmptyState } from "@/components/general/EmptyState";
import MyCourseClient from "./_components/MyCourseClient";

export default async function MyCoursePage() {
  const [courses, continueCourse] = await Promise.all([
    getMyCourses(),
    getContinueCourse(),
  ]);

  if (!courses.length) {
    return (
      <EmptyState
        title="Belum ada kursus terdaftar"
        description="Mulai perjalanan belajarmu sekarang!"
        buttonText="Lihat Kursus"
        href="/courses"
      />
    );
  }

  return <MyCourseClient courses={courses} continueCourse={continueCourse} />;
}
