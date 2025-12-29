/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct";
import { BookIcon, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { markLessonComplete } from "../actions";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/use-confetti";
import { finishCourse } from "../../actions";
import { useRouter } from "next/navigation";
import PopUpRating from "./popup-rating";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface iAppProps {
  data: LessonContentType;
  isLastLesson?: boolean;
  slug: string;
  course: {
    chapter: {
      id: string;
      position: number;
      lessons: { id: string; title: string }[];
    }[];
  };
  courseInfo: {
    title: string;
    description?: string;
    fileKey?: string;
  };
}

export function CourseContent({
  data,
  isLastLesson,
  slug,
  course,
  courseInfo,
}: iAppProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();
  const router = useRouter();
  const [autoNextTriggered, setAutoNextTriggered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showRating, setShowRating] = useState(false);

  const courseId: string = (data as any)?.Chapter?.Course?.id;
  const courseSlug: string = (data as any)?.Chapter?.Course?.slug ?? slug;

  useEffect(() => {
    if (isLastLesson) {
      setShowRating(true);
    }
  }, [isLastLesson]);

  function VideoPlayer({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) {
    const videoUrl = useConstructUrl(videoKey) ?? undefined;
    const thumbnailUrl = useConstructUrl(thumbnailKey) ?? undefined;

    if (!videoKey) {
      return (
        <>
          <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
            <BookIcon className="size-16 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              Pelajaran ini belum memiliki video
            </p>
          </div>
        </>
      );
    }

    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          controlsList="nodownload"
          poster={thumbnailUrl}
          onEnded={handleVideoEnded}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag
        </video>
      </div>
    );
  }

  // function onSubmit() {
  //   startTransition(async () => {
  //     const { data: result, error } = await tryCatch(
  //       markLessonComplete(data.id, data.Chapter.Course.slug)
  //     );

  //     if (error) {
  //       toast.error("An unexpected error occurred. Please try again.");
  //       return;
  //     }

  //     if (result.status === "success") {
  //       toast.success(result.message);
  //       triggerConfetti();

  //       data.lessonProgress = [{ id: "temp" } as any];
  //       router.refresh();

  //       const nextLesson = getNextLesson();

  //       if (nextLesson) {
  //         router.push(`/dashboard/${slug}/${nextLesson.id}`);
  //       } else if (isLastLesson) {
  //         toast.info("Kamu sudah di pelajaran terakhir.");
  //       }
  //     } else if (result.status === "error") {
  //       toast.error(result.message);
  //     }
  //   });
  // }

  function getNextLesson() {
    const allLessons = course.chapter.flatMap(
      (ch: { lessons: { id: string; title: string }[] }) => ch.lessons
    );

    const currentIndex = allLessons.findIndex(
      (l: { id: string }) => l.id === data.id
    );

    if (currentIndex !== -1 && currentIndex + 1 < allLessons.length) {
      return allLessons[currentIndex + 1];
    }

    return null;
  }

  async function handleVideoEnded() {
    if (autoNextTriggered) return;
    setAutoNextTriggered(true);

    const { data: result, error } = await tryCatch(
      markLessonComplete(data.id, data.Chapter.Course.slug)
    );

    if (error) {
      toast.error("Terjadi kesalahan tak terduga. Silakan coba lagi.");
      setAutoNextTriggered(false);
      return;
    }

    if (isLastLesson) {
      toast.info("Kamu sudah menyelesaikan semua lesson!");
      return;
    }

    if (result.status === "success") {
      toast.success("Pelajaran selesai!");
      triggerConfetti();

      const nextLesson = getNextLesson();

      if (nextLesson) {
        setTimeout(
          () => router.push(`/dashboard/${slug}/${nextLesson.id}`),
          1500
        );
      }

      router.refresh();
    } else {
      toast.error(result.message);
      setAutoNextTriggered(false);
    }
  }

  function onFinishCourse() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        finishCourse(data.Chapter.Course.slug)
      );

      if (error) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();

        if (result.certificatePath) {
          setTimeout(() => {
            router.push(result.certificatePath);
          }, 1500);
        }
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <>
      <div className="flex flex-col h-full bg-background pl-6">
        <VideoPlayer
          thumbnailKey={data.thumbnailKey ?? ""}
          videoKey={data.videoKey ?? ""}
        />
        <div className="py-4 border-b flex items-center justify-between">
          {data.lessonProgress.length > 0 ? (
            <Button
              variant="outline"
              disabled
              className="bg-green-500/10 text-green-500 hover:text-green-600"
            >
              <CheckCircle className="size-4 mr-2 text-green-500" />
              Selesai
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Tonton sampai akhir untuk menyelesaikan pelajaran ini secara
              otomatis
            </p>
          )}

          {isLastLesson && (
            <Button
              onClick={onFinishCourse}
              className="ml-4 bg-primary text-white hover:bg-primary/90"
            >
              Selesaikan Kursus & Dapatkan Sertifikat
            </Button>
          )}
        </div>

        <div className="space-y-3 pt-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {data.title}
          </h1>
          {data.description && (
            <RenderDescription json={JSON.parse(data.description)} />
          )}
        </div>

        <Dialog open={showRating} onOpenChange={setShowRating}>
          <DialogContent className="max-w-sm z-99999">
            <div className="justify-center items-center p-6">
              <PopUpRating
                courseSlug={courseSlug}
                courseInfo={courseInfo}
                onClose={() => setShowRating(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
