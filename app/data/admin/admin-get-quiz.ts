import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";

export type AdminQuizQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string | null;
  position: number;
};

export type AdminQuizType = {
  id: string;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimit: number | null;
  isActive: boolean;
  questions: AdminQuizQuestion[];
  chapter: {
    id: string;
    title: string;
  };
  _count: {
    attempts: number;
  };
};

export async function adminGetQuizByChapter(
  chapterId: string
): Promise<AdminQuizType | null> {
  const session = await requireAdmin();

  const quiz = await prisma.quiz.findFirst({
    where: {
      chapterId,
      chapter: {
        Course: {
          userId: session.user.id, // Only allow owner to access
        },
      },
    },
    include: {
      questions: {
        orderBy: { position: "asc" },
      },
      chapter: {
        select: {
          id: true,
          title: true,
        },
      },
      _count: {
        select: {
          attempts: true,
        },
      },
    },
  });

  if (!quiz) return null;

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    passingScore: quiz.passingScore,
    timeLimit: quiz.timeLimit,
    isActive: quiz.isActive,
    questions: quiz.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options as { id: string; text: string }[],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      position: q.position,
    })),
    chapter: quiz.chapter,
    _count: quiz._count,
  };
}

export async function adminGetCourseQuizzes(courseId: string) {
  const session = await requireAdmin();

  const chapters = await prisma.chapter.findMany({
    where: {
      courseId,
      Course: {
        userId: session.user.id, // Only allow owner to access
      },
    },
    orderBy: { position: "asc" },
    include: {
      quiz: {
        include: {
          _count: {
            select: {
              attempts: true,
            },
          },
          questions: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return chapters.map((chapter) => ({
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterPosition: chapter.position,
    quiz: chapter.quiz
      ? {
          id: chapter.quiz.id,
          title: chapter.quiz.title,
          questionCount: chapter.quiz.questions.length,
          attemptCount: chapter.quiz._count.attempts,
          passingScore: chapter.quiz.passingScore,
          isActive: chapter.quiz.isActive,
        }
      : null,
  }));
}

export async function adminGetQuizAnalytics(quizId: string) {
  const session = await requireAdmin();

  const quiz = await prisma.quiz.findFirst({
    where: {
      id: quizId,
      chapter: {
        Course: {
          userId: session.user.id, // Only allow owner to access
        },
      },
    },
    include: {
      attempts: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: { startedAt: "desc" },
      },
      chapter: {
        include: {
          Course: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  if (!quiz) return null;

  const totalAttempts = quiz.attempts.length;
  const passedAttempts = quiz.attempts.filter((a) => a.passed).length;
  const averageScore =
    totalAttempts > 0
      ? Math.round(
          quiz.attempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts
        )
      : 0;

  return {
    quiz: {
      id: quiz.id,
      title: quiz.title,
      passingScore: quiz.passingScore,
      chapter: quiz.chapter,
    },
    stats: {
      totalAttempts,
      passedAttempts,
      failedAttempts: totalAttempts - passedAttempts,
      passRate: totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0,
      averageScore,
    },
    attempts: quiz.attempts.map((attempt) => ({
      id: attempt.id,
      user: attempt.user,
      score: attempt.score,
      passed: attempt.passed,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
    })),
  };
}

export async function adminGetAllQuizAnalytics() {
  const admin = await requireAdmin();

  // Get all quizzes for courses owned by this admin
  const quizzes = await prisma.quiz.findMany({
    where: {
      chapter: {
        Course: {
          userId: admin.user.id,
        },
      },
    },
    include: {
      questions: {
        select: { id: true },
      },
      attempts: {
        select: {
          id: true,
          score: true,
          passed: true,
          startedAt: true,
          completedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: { startedAt: "desc" },
      },
      chapter: {
        select: {
          id: true,
          title: true,
          position: true,
          Course: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate stats
  const totalQuizzes = quizzes.length;
  const totalAttempts = quizzes.reduce((acc, q) => acc + q.attempts.length, 0);
  const totalPassed = quizzes.reduce(
    (acc, q) => acc + q.attempts.filter((a) => a.passed).length,
    0
  );
  const overallPassRate = totalAttempts > 0 ? Math.round((totalPassed / totalAttempts) * 100) : 0;
  const averageScore =
    totalAttempts > 0
      ? Math.round(
          quizzes.reduce(
            (acc, q) => acc + q.attempts.reduce((sum, a) => sum + a.score, 0),
            0
          ) / totalAttempts
        )
      : 0;

  // Transform data for display
  const quizList = quizzes.map((quiz) => {
    const attemptCount = quiz.attempts.length;
    const passedCount = quiz.attempts.filter((a) => a.passed).length;
    const avgScore =
      attemptCount > 0
        ? Math.round(quiz.attempts.reduce((acc, a) => acc + a.score, 0) / attemptCount)
        : 0;

    return {
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz.questions.length,
      passingScore: quiz.passingScore,
      chapter: {
        id: quiz.chapter.id,
        title: quiz.chapter.title,
        position: quiz.chapter.position,
      },
      course: quiz.chapter.Course,
      stats: {
        attemptCount,
        passedCount,
        failedCount: attemptCount - passedCount,
        passRate: attemptCount > 0 ? Math.round((passedCount / attemptCount) * 100) : 0,
        averageScore: avgScore,
      },
      recentAttempts: quiz.attempts.slice(0, 5).map((a) => ({
        id: a.id,
        user: a.user,
        score: a.score,
        passed: a.passed,
        completedAt: a.completedAt,
      })),
    };
  });

  return {
    summary: {
      totalQuizzes,
      totalAttempts,
      totalPassed,
      totalFailed: totalAttempts - totalPassed,
      overallPassRate,
      averageScore,
    },
    quizzes: quizList,
  };
}

export type AdminAllQuizAnalytics = Awaited<ReturnType<typeof adminGetAllQuizAnalytics>>;
