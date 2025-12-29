import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET: Mendapatkan quiz berdasarkan chapterId
export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get("chapterId");
    const quizId = searchParams.get("quizId");

    if (!chapterId && !quizId) {
      return NextResponse.json(
        { error: "chapterId or quizId is required" },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.findFirst({
      where: quizId ? { id: quizId } : { chapterId: chapterId! },
      include: {
        questions: {
          orderBy: { position: "asc" },
          select: {
            id: true,
            question: true,
            options: true,
            position: true,
            // Tidak include correctAnswer untuk keamanan
          },
        },
        chapter: {
          include: {
            Course: {
              select: { id: true, title: true },
            },
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Check if user has previous attempts
    const lastAttempt = await prisma.quizAttempt.findFirst({
      where: {
        quizId: quiz.id,
        userId: session.user.id,
      },
      orderBy: { startedAt: "desc" },
    });

    return NextResponse.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        passingScore: quiz.passingScore,
        timeLimit: quiz.timeLimit,
        questionCount: quiz.questions.length,
        questions: quiz.questions,
        chapter: {
          id: quiz.chapter.id,
          title: quiz.chapter.title,
        },
        course: quiz.chapter.Course,
      },
      lastAttempt: lastAttempt
        ? {
            score: lastAttempt.score,
            passed: lastAttempt.passed,
            completedAt: lastAttempt.completedAt,
          }
        : null,
    });
  } catch (error) {
    console.error("Quiz GET Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST: Submit quiz answers
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizId, answers } = await req.json();

    if (!quizId || !answers) {
      return NextResponse.json(
        { error: "quizId and answers are required" },
        { status: 400 }
      );
    }

    // Get quiz with correct answers
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: true,
        chapter: {
          include: {
            Course: {
              include: {
                enrollment: {
                  where: { userId: session.user.id, status: "Active" },
                },
              },
            },
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Verify user is enrolled
    if (quiz.chapter.Course.enrollment.length === 0) {
      return NextResponse.json(
        { error: "Not enrolled in this course" },
        { status: 403 }
      );
    }

    // Calculate score
    let correctCount = 0;
    const results: {
      questionId: string;
      correct: boolean;
      correctAnswer: string;
      explanation?: string;
    }[] = [];

    for (const question of quiz.questions) {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) correctCount++;

      results.push({
        questionId: question.id,
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation ?? undefined,
      });
    }

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    // Save attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId,
        userId: session.user.id,
        score,
        answers,
        passed,
        completedAt: new Date(),
      },
    });

    // Award badges for quiz performance
    await checkQuizBadges(session.user.id, score, passed);

    return NextResponse.json({
      success: true,
      attempt: {
        id: attempt.id,
        score,
        passed,
        correctCount,
        totalQuestions: quiz.questions.length,
        passingScore: quiz.passingScore,
      },
      results,
    });
  } catch (error) {
    console.error("Quiz POST Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper: Check and award quiz-related badges
async function checkQuizBadges(userId: string, score: number, passed: boolean) {
  const existingBadges = await prisma.userBadge.findMany({
    where: { userId },
    select: { badgeId: true },
  });
  const existingBadgeIds = existingBadges.map((b) => b.badgeId);

  const quizBadges = await prisma.badge.findMany({
    where: {
      isActive: true,
      category: "QUIZ",
      id: { notIn: existingBadgeIds },
    },
  });

  // Get total quiz stats
  const quizStats = await prisma.quizAttempt.aggregate({
    where: { userId },
    _count: true,
    _avg: { score: true },
  });

  const perfectScores = await prisma.quizAttempt.count({
    where: { userId, score: 100 },
  });

  const badgesToAward: string[] = [];

  for (const badge of quizBadges) {
    const req = badge.requirement as { type: string; value: number };
    let earned = false;

    switch (req.type) {
      case "QUIZ_PASSED":
        earned = passed && quizStats._count >= req.value;
        break;
      case "PERFECT_SCORE":
        earned = score === 100;
        break;
      case "PERFECT_SCORES_COUNT":
        earned = perfectScores >= req.value;
        break;
      case "FIRST_QUIZ":
        earned = quizStats._count >= 1;
        break;
    }

    if (earned) {
      badgesToAward.push(badge.id);
    }
  }

  // Award badges
  if (badgesToAward.length > 0) {
    await prisma.$transaction(async (tx) => {
      for (const badgeId of badgesToAward) {
        const badge = quizBadges.find((b) => b.id === badgeId);

        await tx.userBadge.create({
          data: { userId, badgeId },
        });

        if (badge && badge.points > 0) {
          await tx.user.update({
            where: { id: userId },
            data: { points: { increment: badge.points } },
          });

          await tx.pointTransaction.create({
            data: {
              userId,
              amount: badge.points,
              type: "WELCOME_BONUS",
              description: `Badge earned: ${badge.name}`,
              referenceId: badgeId,
            },
          });
        }
      }
    });
  }
}
