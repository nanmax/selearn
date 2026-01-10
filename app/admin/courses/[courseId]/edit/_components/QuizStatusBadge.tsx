"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClipboardList, Trash2, Users, HelpCircle } from "lucide-react";
import { QuizManageModal } from "./QuizManageModal";

interface QuizStatusBadgeProps {
  chapterId: string;
  chapterTitle: string;
  quiz: {
    id: string;
    title: string;
    questionCount: number;
    attemptCount: number;
    passingScore: number;
    isActive: boolean;
  } | null;
}

export function QuizStatusBadge({
  chapterId,
  chapterTitle,
  quiz,
}: QuizStatusBadgeProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [quizData, setQuizData] = useState<{
    id: string;
    title: string;
    description: string | null;
    passingScore: number;
    timeLimit: number | null;
    questions: {
      id: string;
      question: string;
      options: { id: string; text: string }[];
      correctAnswer: string;
      explanation: string | null;
    }[];
  } | null>(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  async function fetchQuizData() {
    if (!quiz) return;
    setIsLoadingQuiz(true);
    try {
      const response = await fetch(`/api/quiz/manage?chapterId=${chapterId}`);
      if (response.ok) {
        const data = await response.json();
        setQuizData(data.quiz);
      }
    } catch {
      toast.error("Gagal memuat data quiz");
    } finally {
      setIsLoadingQuiz(false);
    }
  }

  async function handleDeleteQuiz() {
    if (!quiz) return;

    startTransition(async () => {
      try {
        const response = await fetch(`/api/quiz/manage?quizId=${quiz.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const data = await response.json();
          toast.error(data.error || "Gagal menghapus quiz");
          return;
        }

        toast.success("Quiz berhasil dihapus");
        router.refresh();
      } catch {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    });
  }

  if (!quiz) {
    return (
      <QuizManageModal
        chapterId={chapterId}
        chapterTitle={chapterTitle}
        hasExistingQuiz={false}
      />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="secondary"
              className="gap-1 cursor-default"
            >
              <ClipboardList className="size-3" />
              Quiz
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1 text-xs">
              <p className="font-medium">{quiz.title}</p>
              <p className="flex items-center gap-1">
                <HelpCircle className="size-3" />
                {quiz.questionCount} pertanyaan
              </p>
              <p className="flex items-center gap-1">
                <Users className="size-3" />
                {quiz.attemptCount} percobaan
              </p>
              <p>Skor lulus: {quiz.passingScore}%</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <QuizManageModal
        chapterId={chapterId}
        chapterTitle={chapterTitle}
        hasExistingQuiz={true}
        onSuccess={() => setQuizData(null)}
      />

      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={fetchQuizData}
        disabled={isLoadingQuiz}
      >
        {isLoadingQuiz ? (
          <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="size-3" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Quiz &quot;{quiz.title}&quot; dan
              semua data percobaan ({quiz.attemptCount} percobaan) akan dihapus
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteQuiz}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isPending}
            >
              {isPending ? "Menghapus..." : "Hapus Quiz"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
