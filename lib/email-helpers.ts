import { resend } from "./resend";

const HR_EMAIL = "nuzulrangkuti07@gmail.com";

export async function sendCourseSubmissionNotificationToHR(courseData: {
  title: string;
  description: string;
  instructorName: string;
  instructorEmail: string;
  category: string;
  level: string;
  price: number;
  courseId: string;
  slug: string;
}) {
  try {
    await resend.emails.send({
      from: "Selearn System <info@selearn.com>",
      to: HR_EMAIL,
      subject: `🔔 Course Baru Menunggu Review: "${courseData.title}"`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;max-width:600px">
          <h2 style="color:#2563eb;">Course Baru Menunggu Approval</h2>

          <p>Halo HR,</p>

          <p>Ada course baru yang telah disubmit oleh instruktur dan menunggu untuk direview:</p>

          <div style="background:#f3f4f6;padding:16px;border-radius:8px;margin:16px 0">
            <h3 style="margin-top:0;color:#1f2937">${courseData.title}</h3>

            <p style="margin:8px 0">
              <strong>Instruktur:</strong> ${courseData.instructorName} (${courseData.instructorEmail})
            </p>

            <p style="margin:8px 0">
              <strong>Kategori:</strong> ${courseData.category}<br/>
              <strong>Level:</strong> ${courseData.level}<br/>
              <strong>Harga:</strong> Rp ${courseData.price.toLocaleString("id-ID")}
            </p>

            <p style="margin:8px 0">
              <strong>Deskripsi Singkat:</strong><br/>
              ${courseData.description.substring(0, 200)}${courseData.description.length > 200 ? "..." : ""}
            </p>
          </div>

          <div style="margin:24px 0">
            <a
              href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/hr/courses/${courseData.courseId}"
              style="background:#2563eb;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:600"
            >
              Review Course Sekarang
            </a>
          </div>

          <p style="color:#6b7280;font-size:13px">
            Silakan review course ini dan berikan approval atau rejection dengan catatan yang sesuai.
          </p>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>

          <p style="color:#6b7280;font-size:12px">
            Email ini dikirim otomatis oleh sistem Selearn.<br/>
            Course ID: ${courseData.courseId}
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send HR notification:", error);
    return { success: false, error };
  }
}
