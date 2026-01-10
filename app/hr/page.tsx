import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";

const HR_EMAIL = "nuzulrangkuti07@gmail.com";

async function getHRStats() {
  const [waiting, approved, rejected, totalCourses] = await Promise.all([
    prisma.course.count({
      where: { approvalStatus: "Waiting" },
    }),
    prisma.course.count({
      where: { approvalStatus: "Approved" },
    }),
    prisma.course.count({
      where: { approvalStatus: "Rejected" },
    }),
    prisma.course.count(),
  ]);

  return { waiting, approved, rejected, totalCourses };
}

export default async function HRDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.email !== HR_EMAIL) {
    redirect("/");
  }

  const stats = await getHRStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HR Dashboard</h1>
        <p className="text-muted-foreground">
          Manage course approvals and review submissions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Waiting Review
            </span>
            <span className="text-3xl font-bold text-yellow-600">
              {stats.waiting}
            </span>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Approved
            </span>
            <span className="text-3xl font-bold text-green-600">
              {stats.approved}
            </span>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Rejected
            </span>
            <span className="text-3xl font-bold text-red-600">
              {stats.rejected}
            </span>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Total Courses
            </span>
            <span className="text-3xl font-bold">{stats.totalCourses}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-2">
          <Link
            href="/hr/courses"
            className="block p-4 rounded-lg border hover:bg-accent transition-colors">
            <div className="font-medium">Review Pending Courses</div>
            <div className="text-sm text-muted-foreground">
              {stats.waiting} courses waiting for your review
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
