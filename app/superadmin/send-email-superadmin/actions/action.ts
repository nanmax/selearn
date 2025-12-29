"use server";

import { prisma } from "@/lib/db";
import { resend } from "@/lib/resend";
import { sendEmailAllInstructorsSchema } from "@/schemas/send-email-to-all-instructors";

const TARGET_EMAILS = [
  "fahadarbilah04@gmail.com",
  "nrkholis99@gmail.com",
  "triajitunggals@gmail.com",
  "ypnotes@gmail.com",
  "qonitamarthaitzz@gmail.com",
  "shafwaimalaeca@gmail.com",
  "abylasnan@gmail.com",
  "hendratna55@gmail.com",
  "ediwitoko08@gmail.com",
  "steven.vladd@gmail.com",
  "eminur655@gmail.com",
  "anggi.rafif@gmail.com",
  "robbysaputra1059@gmail.com",
  "ln7126056@gmail.com",
];

function formatMessageToHtml(message: string) {
  return message
    .trim()
    .split("\n\n")
    .map(
      (p) =>
        `<p style="margin:0 0 12px 0; line-height:1.6;">
          ${p.replace(/\n/g, "<br />")}
        </p>`
    )
    .join("");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendEmailToAdminsAction(input: unknown) {
  const parsed = sendEmailAllInstructorsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const { subject, message } = parsed.data;

  const candidates = await prisma.registerInstructor.findMany({
    where: {
      email: { in: TARGET_EMAILS },
    },
    select: {
      email: true,
      name: true,
    },
  });

  if (candidates.length === 0) {
    throw new Error("No matching emails found");
  }

  const formattedMessage = formatMessageToHtml(message);

  let successCount = 0;
  const failedEmails: string[] = [];

  for (const candidate of candidates) {
    try {
      await resend.emails.send({
        from: "Selearn <info@selearn.com>",
        to: candidate.email,
        subject,
        html: `
          <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;max-width:600px">
            <p>Halo ${candidate.name},</p>

            ${formattedMessage}
          </div>
        `,
      });

      successCount++;

      await sleep(400);
    } catch (error) {
      console.error("FAILED SEND:", candidate.email, error);
      failedEmails.push(candidate.email);
    }
  }

  return {
    success: true,
    sent: successCount,
    failed: failedEmails,
  };
}
