import { prisma } from "@/lib/db";
import { requireUser } from "../user/require-user";

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestionType = {
  id: string;
  question: string;
  options: QuizOption[];
  position: number;
};

export type QuizType = {
  id: string;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimit: number | null;
  questions: QuizQuestionType[];
  chapter: {
    id: string;
    title: string;
  };
  lastAttempt?: {
    score: number;
    passed: boolean;
  } | null;
};

export async function getQuizByChapter(
  chapterId: string
): Promise<QuizType | null> {
  const user = await requireUser();

  const quiz = await prisma.quiz.findUnique({
    where: { chapterId },
    include: {
      questions: {
        orderBy: { position: "asc" },
        select: {
          id: true,
          question: true,
          options: true,
          position: true,
        },
      },
      chapter: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!quiz) return null;

  // Get last attempt
  const lastAttempt = await prisma.quizAttempt.findFirst({
    where: {
      quizId: quiz.id,
      userId: user.id,
    },
    orderBy: { startedAt: "desc" },
    select: {
      score: true,
      passed: true,
    },
  });

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    passingScore: quiz.passingScore,
    timeLimit: quiz.timeLimit,
    questions: quiz.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options as QuizOption[],
      position: q.position,
    })),
    chapter: quiz.chapter,
    lastAttempt,
  };
}

export async function getQuizById(quizId: string): Promise<QuizType | null> {
  const user = await requireUser();

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        orderBy: { position: "asc" },
        select: {
          id: true,
          question: true,
          options: true,
          position: true,
        },
      },
      chapter: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!quiz) return null;

  const lastAttempt = await prisma.quizAttempt.findFirst({
    where: {
      quizId: quiz.id,
      userId: user.id,
    },
    orderBy: { startedAt: "desc" },
    select: {
      score: true,
      passed: true,
    },
  });

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    passingScore: quiz.passingScore,
    timeLimit: quiz.timeLimit,
    questions: quiz.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options as QuizOption[],
      position: q.position,
    })),
    chapter: quiz.chapter,
    lastAttempt,
  };
}

export async function getUserQuizAttempts(userId: string) {
  return prisma.quizAttempt.findMany({
    where: { userId },
    include: {
      quiz: {
        include: {
          chapter: {
            include: {
              Course: {
                select: {
                  title: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: { startedAt: "desc" },
  });
}
