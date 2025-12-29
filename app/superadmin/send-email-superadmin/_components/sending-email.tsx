"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, SendHorizontal } from "lucide-react";
import { SendEmailAllInstructorsInput, sendEmailAllInstructorsSchema } from "@/schemas/send-email-to-all-instructors";
import { sendEmailToAdminsAction } from "../actions/action";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SendingEmail({ open, onOpenChange }: Props) {
  const form = useForm<SendEmailAllInstructorsInput>({
    resolver: zodResolver(sendEmailAllInstructorsSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = form;

  async function onSubmit(values: SendEmailAllInstructorsInput) {
    await sendEmailToAdminsAction(values);
    reset();
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Send Email to Admins</SheetTitle>
          <SheetDescription>
            This email will be sent to all instructors.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4 m-5 overflow-y-auto">
          <div className="grid gap-2">
            <Label>Subject</Label>
            <Input {...register("subject")} />
            {errors.subject && (
              <p className="text-sm text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Message</Label>
            <Textarea rows={6} {...register("message")} />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <SheetFooter>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                <>
                  Sending <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Send <SendHorizontal className="h-4 w-4" />
                </>
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
