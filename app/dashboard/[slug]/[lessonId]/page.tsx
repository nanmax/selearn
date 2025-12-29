import { getLessonContent } from "@/app/data/course/get-lesson-content";
import { CourseContent } from "./_components/CourseContent";
import { Suspense } from "react";
import { LessonSkeleton } from "./_components/LessonSkeleton";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

type Params = Promise<{ slug: string; lessonId: string }>;

export default async function LessonContentPage({
  params,
}: {
  params: Params;
}) {
  const { slug, lessonId } = await params;
  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContentLoader slug={slug} lessonId={lessonId} />
    </Suspense>
  );
}

async function LessonContentLoader({
  slug,
  lessonId,
}: {
  slug: string;
  lessonId: string;
}) {
  const data = await getLessonContent(lessonId);
  const course = await getCourseSidebarData(slug);

  const allLessons = course.course.chapter.flatMap((ch) => ch.lessons);
  // const lastLessonId = allLessons[allLessons.length - 1]?.id;
  // const isLastLesson = lastLessonId === lessonId;
  const lastLessonId = String(allLessons[allLessons.length - 1]?.id);
  const isLastLesson = String(lessonId) === lastLessonId;

  return (
    <CourseContent
      data={data}
      isLastLesson={isLastLesson}
      slug={slug}
      course={course.course}
      courseInfo={course.course}
    />
  );
}
