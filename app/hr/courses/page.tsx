import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { CourseReviewCard } from "../_components/course-review-card";

const HR_EMAIL = "nuzulrangkuti07@gmail.com";

async function getCoursesForReview() {
  const courses = await prisma.course.findMany({
    where: {
      approvalStatus: {
        in: ["Waiting", "Approved", "Rejected"],
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      chapter: {
        include: {
          lessons: true,
        },
      },
    },
    orderBy: [
      { approvalStatus: "asc" }, // Waiting first
      { createdAt: "desc" },
    ],
  });

  return courses;
}

export default async function HRCoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.email !== HR_EMAIL) {
    redirect("/");
  }

  const courses = await getCoursesForReview();

  const waitingCourses = courses.filter((c) => c.approvalStatus === "Waiting");
  const approvedCourses = courses.filter((c) => c.approvalStatus === "Approved");
  const rejectedCourses = courses.filter((c) => c.approvalStatus === "Rejected");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Review Courses</h1>
        <p className="text-muted-foreground">
          Approve or reject course submissions from instructors
        </p>
      </div>

      {/* Waiting Courses */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
          Waiting Review ({waitingCourses.length})
        </h2>
        {waitingCourses.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
            No courses waiting for review
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {waitingCourses.map((course) => (
              <CourseReviewCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* Approved Courses */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
          Approved ({approvedCourses.length})
        </h2>
        {approvedCourses.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
            No approved courses yet
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {approvedCourses.map((course) => (
              <CourseReviewCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* Rejected Courses */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
          Rejected ({rejectedCourses.length})
        </h2>
        {rejectedCourses.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
            No rejected courses
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rejectedCourses.map((course) => (
              <CourseReviewCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
