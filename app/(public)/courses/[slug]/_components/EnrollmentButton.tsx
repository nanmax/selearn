"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { enrollInCourseAction } from "../actions";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId)
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push(result.invoiceUrl);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Button onClick={onSubmit} disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader className="size-4 animate-spin" />
          Redirect to payment...
        </>
      ) : (
        "Enroll Now"
      )}
    </Button>
  );
}
