import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET: Get quiz data for editing (for instructors)
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
        },
        chapter: {
          include: {
            Course: {
              select: { userId: true },
            },
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Verify ownership
    if (quiz.chapter.Course.userId !== session.user.id) {
      return NextResponse.json(
        { error: "You don't have permission to view this quiz" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        passingScore: quiz.passingScore,
        timeLimit: quiz.timeLimit,
        questions: quiz.questions.map((q) => ({
          id: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          position: q.position,
        })),
      },
    });
  } catch (error) {
    console.error("Quiz GET Manage Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST: Create/Update quiz (for instructors)
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chapterId, title, description, passingScore, timeLimit, questions } =
      await req.json();

    if (!chapterId || !title || !questions || questions.length === 0) {
      return NextResponse.json(
        { error: "chapterId, title, and questions are required" },
        { status: 400 }
      );
    }

    // Verify user owns this chapter's course
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        Course: {
          select: { userId: true },
        },
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    if (chapter.Course.userId !== session.user.id) {
      return NextResponse.json(
        { error: "You don't have permission to create quiz for this chapter" },
        { status: 403 }
      );
    }

    // Create or update quiz
    const quiz = await prisma.quiz.upsert({
      where: { chapterId },
      update: {
        title,
        description,
        passingScore: passingScore ?? 70,
        timeLimit,
      },
      create: {
        chapterId,
        title,
        description,
        passingScore: passingScore ?? 70,
        timeLimit,
      },
    });

    // Delete existing questions and create new ones
    await prisma.quizQuestion.deleteMany({
      where: { quizId: quiz.id },
    });

    // Create questions
    const createdQuestions = await Promise.all(
      questions.map(
        (
          q: {
            question: string;
            options: { id: string; text: string }[];
            correctAnswer: string;
            explanation?: string;
          },
          index: number
        ) =>
          prisma.quizQuestion.create({
            data: {
              quizId: quiz.id,
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              position: index,
            },
          })
      )
    );

    return NextResponse.json({
      success: true,
      quiz: {
        ...quiz,
        questions: createdQuestions,
      },
    });
  } catch (error) {
    console.error("Quiz Manage Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE: Delete quiz
export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get("quizId");

    if (!quizId) {
      return NextResponse.json({ error: "quizId is required" }, { status: 400 });
    }

    // Verify ownership
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        chapter: {
          include: {
            Course: {
              select: { userId: true },
            },
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    if (quiz.chapter.Course.userId !== session.user.id) {
      return NextResponse.json(
        { error: "You don't have permission to delete this quiz" },
        { status: 403 }
      );
    }

    await prisma.quiz.delete({
      where: { id: quizId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quiz Delete Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
