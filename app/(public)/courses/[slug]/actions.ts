"use server";

import { requireUser } from "@/app/data/user/require-user";
import { env } from "@/lib/env";

export async function enrollInCourseAction(courseId: string) {
  const user = await requireUser();

  const response = await fetch(`${env.BETTER_AUTH_URL}/api/xendit/create-invoice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId, userId: user.id }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Xendit error:", data.error);
    return {
      status: "error" as const,
      message: "Failed to create invoice. Please try again later.",
    };
  }

  return {
    status: "success" as const,
    message: "Redirecting to Xendit payment page...",
    invoiceUrl: data.invoice_url,
  };
}
