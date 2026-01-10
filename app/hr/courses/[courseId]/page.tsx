import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ApprovalActions } from "../../_components/approval-actions";
import { BookOpen, Clock, DollarSign, Calendar } from "lucide-react";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { env } from "@/lib/env";

const HR_EMAIL = "nuzulrangkuti07@gmail.com";

function constructImageUrl(key: string | null | undefined) {
  if (!key) return null;
  return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${key}`;
}

async function getCourseDetails(courseId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
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
          lessons: {
            orderBy: { position: "asc" },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  return course;
}

export default async function CourseReviewDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.email !== HR_EMAIL) {
    redirect("/");
  }

  const { courseId } = await params;
  const course = await getCourseDetails(courseId);

  if (!course) {
    redirect("/hr/courses");
  }

  const totalLessons = course.chapter.reduce(
    (acc, ch) => acc + ch.lessons.length,
    0
  );

  const statusColors = {
    Waiting: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Approved: "bg-green-100 text-green-800 border-green-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Review</h1>
          <p className="text-muted-foreground">
            Review and approve/reject this course
          </p>
        </div>
        <Badge
          className={
            statusColors[course.approvalStatus as keyof typeof statusColors]
          }>
          {course.approvalStatus}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden border">
            <Image
              src={constructImageUrl(course.fileKey) || "/placeholder.png"}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Course Info */}
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{course.title}</h2>
              <p className="text-muted-foreground">{course.smallDescription}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <span>{totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>{course.duration} hours</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-muted-foreground" />
                <span>Rp {course.price.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span>
                  {new Date(course.createdAt).toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge>{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-xl font-semibold mb-4">Course Description</h3>
            <RenderDescription json={JSON.parse(course.description)} />
          </div>

          {/* Course Structure */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-xl font-semibold mb-4">Course Structure</h3>
            <div className="space-y-4">
              {course.chapter.map((chapter, idx) => (
                <div key={chapter.id} className="border rounded-lg p-4">
                  <div className="font-medium mb-2">
                    Chapter {idx + 1}: {chapter.title}
                  </div>
                  <div className="space-y-2 pl-4">
                    {chapter.lessons.map((lesson, lessonIdx) => (
                      <div
                        key={lesson.id}
                        className="text-sm text-muted-foreground">
                        {lessonIdx + 1}. {lesson.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Note (if exists) */}
          {course.approvalNote && (
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">HR Note</h3>
              <p className="text-muted-foreground">{course.approvalNote}</p>
              {course.reviewedBy && (
                <p className="text-sm text-muted-foreground mt-2">
                  Reviewed by: {course.reviewedBy}
                </p>
              )}
              {course.approvedAt && (
                <p className="text-sm text-muted-foreground">
                  Date:{" "}
                  {new Date(course.approvedAt).toLocaleDateString("id-ID")}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Instructor Info */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Instructor</h3>
            <div className="flex items-center gap-3 mb-4">
              {course.user.image && (
                <Image
                  src={course.user.image}
                  alt={course.user.name || "Instructor"}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="font-medium">{course.user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {course.user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Approval Actions */}
          {course.approvalStatus === "Waiting" && (
            <ApprovalActions courseId={course.id} hrEmail={HR_EMAIL} />
          )}
        </div>
      </div>
    </div>
  );
}
