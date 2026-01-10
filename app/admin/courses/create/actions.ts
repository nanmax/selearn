"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { request } from "@arcjet/next";
import { XENDIT_BASE_URL, XENDIT_HEADERS } from "@/lib/xendit";
import { env } from "@/lib/env";
import { sendCourseSubmissionNotificationToHR } from "@/lib/email-helpers";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

export async function CreateCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been blocked due to rate limit",
        };
      } else {
        return {
          status: "error",
          message: "You are bot! if this a mistake contact to our support",
        };
      }
    }

    const validation = courseSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    const data = validation.data;

    const amount = Math.round(data.price);

    if (amount < 15000) {
      return {
        status: "error",
        message: "Minimum price is 15000 IDR",
      };
    }

    const invoiceResponse = await fetch(XENDIT_BASE_URL, {
      method: "POST",
      headers: XENDIT_HEADERS,
      body: JSON.stringify({
        external_id: `course-${Date.now()}`,
        description: `Course: ${data.title}`,
        amount: amount,
        currency: "IDR",
        payer_email: session.user.email,
        success_redirect_url: `${env.DATABASE_URL}/success`,
        failure_redirect_url: `${env.DATABASE_URL}/failed`,
      }),
    });

    if (!invoiceResponse.ok) {
      const errorText = await invoiceResponse.text();
      console.error("Xendit Error:", errorText);
      return {
        status: "error",
        message: "Failed to connect with Xendit API",
      };
    }

    const invoiceData = await invoiceResponse.json();

    const newCourse = await prisma.course.create({
      data: {
        ...data,
        price: amount,
        userId: session.user.id,
        stripePriceId: invoiceData.id,
      },
    });

    // Send notification to HR for course approval
    await sendCourseSubmissionNotificationToHR({
      title: data.title,
      description: data.description,
      instructorName: session.user.name || "Unknown",
      instructorEmail: session.user.email || "",
      category: data.category,
      level: data.level,
      price: amount,
      courseId: newCourse.id,
      slug: data.slug,
    });

    return {
      status: "success",
      message: "Course created successfully and linked with Xendit! HR akan mereview course Anda.",
    };
  } catch (err) {
    console.error("Error creating course:", err);
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
