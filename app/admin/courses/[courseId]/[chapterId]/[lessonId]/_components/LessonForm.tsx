/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import { Uploader } from "@/components/file-uploader/Uploader";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Loader } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateLesson } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface iAppProps {
  data: AdminLessonType;
  chapterId: string;
  courseId: string;
}

export function LessonForm({ chapterId, data, courseId }: iAppProps) {
  const [pending, starTransition] = useTransition();
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema) as any,
    defaultValues: {
      name: data.title,
      chapterId: chapterId,
      courseId: courseId,
      description: data.description ?? undefined,
      videoKey: data.videoKey ?? undefined,
      thumbnailKey: data.thumbnailKey ?? undefined,
    },
  });
  const router = useRouter();

  function onSubmit(values: LessonSchemaType) {
    starTransition(async () => {
      const { data: result, error } = await tryCatch(
        updateLesson(values, data.id)
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push(`/admin/courses/${courseId}/edit`);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <div>
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-6" })}
        href={`/admin/courses/${courseId}/edit`}>
        <ArrowLeftIcon className="size-4" />
        <span>Kembali</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Konfigurasi Pelajaran</CardTitle>
          <CardDescription>
            Konfigurasikan video dan deskripsi untuk pelajaran ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Pelajaran</FormLabel>
                    <FormControl>
                      <Input placeholder="Chapter..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Pembelajaran</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnailKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <Uploader
                        fileTypeAccepted="image"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video File</FormLabel>
                    <FormControl>
                      <Uploader
                        fileTypeAccepted="video"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={pending} type="submit">
                {pending ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span>Menyimpan</span>
                  </>
                ) : (
                  "Simpan Pelajaran"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
