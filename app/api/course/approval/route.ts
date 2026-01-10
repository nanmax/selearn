import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resend } from "@/lib/resend";
import { approvalActionSchema } from "@/lib/zodSchema";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const HR_EMAIL = "nuzulrangkuti07@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Cek apakah user adalah HR
    if (session.user.email !== HR_EMAIL) {
      return NextResponse.json(
        { error: "Only HR can approve/reject courses" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = approvalActionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.issues },
        { status: 400 }
      );
    }

    const { courseId, action, note, reviewedBy } = result.data;

    // Get course with instructor info
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Update course approval status
    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        approvalStatus: action === "approve" ? "Approved" : "Rejected",
        approvalNote: note,
        approvedAt: new Date(),
        reviewedBy: reviewedBy,
        // Jika approved, set status ke Published
        status: action === "approve" ? "Published" : course.status,
      },
    });

    // Send email notification to instructor
    const actionText = action === "approve" ? "disetujui" : "ditolak";
    const statusText = action === "approve" ? "Approved ✅" : "Rejected ❌";

    await resend.emails.send({
      from: "Selearn HR <info@selearn.com>",
      to: course.user.email,
      subject: `Course "${course.title}" ${actionText} oleh HR`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;max-width:600px">
          <h2 style="color:#2563eb;">Status Approval Course</h2>

          <p>Halo ${course.user.name},</p>

          <p>Course Anda dengan detail berikut:</p>

          <div style="background:#f3f4f6;padding:16px;border-radius:8px;margin:16px 0">
            <strong>Judul:</strong> ${course.title}<br/>
            <strong>Status:</strong> ${statusText}<br/>
            ${note ? `<strong>Catatan HR:</strong> ${note}` : ""}
          </div>

          ${
            action === "approve"
              ? `
            <p style="color:#059669;font-weight:600">
              Selamat! Course Anda telah disetujui dan sekarang sudah dipublish ke halaman publik.
            </p>
          `
              : `
            <p style="color:#dc2626;font-weight:600">
              Mohon maaf, course Anda ditolak. Silakan perbaiki sesuai catatan HR dan submit ulang.
            </p>
          `
          }

          <p>
            Terima kasih,<br/>
            <strong>Tim Selearn</strong>
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Course ${actionText} successfully`,
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Approval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
