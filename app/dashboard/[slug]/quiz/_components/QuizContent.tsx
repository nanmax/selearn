/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/use-confetti";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Trophy,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type QuizOption = {
  id: string;
  text: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  position: number;
};

type Quiz = {
  id: string;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimit: number | null;
  questions: QuizQuestion[];
  chapter: {
    id: string;
    title: string;
  };
  lastAttempt?: {
    score: number;
    passed: boolean;
  } | null;
};

type QuizResult = {
  questionId: string;
  correct: boolean;
  correctAnswer: string;
  explanation?: string;
};

interface QuizContentProps {
  quiz: Quiz;
  slug: string;
}

export default function QuizContent({ quiz, slug }: QuizContentProps) {
  const router = useRouter();
  const { triggerConfetti } = useConfetti();
  const [isPending, startTransition] = useTransition();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    passed: boolean;
    correctCount: number;
    results: QuizResult[];
  } | null>(null);

  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const question = quiz.questions[currentQuestion];

  const handleSelectAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quizId: quiz.id,
            answers,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || "Gagal submit quiz");
          return;
        }

        setResults({
          score: data.attempt.score,
          passed: data.attempt.passed,
          correctCount: data.attempt.correctCount,
          results: data.results,
        });
        setShowResults(true);

        if (data.attempt.passed) {
          triggerConfetti();
          toast.success("Selamat! Anda lulus quiz!");
        } else {
          toast.info("Quiz selesai. Coba lagi untuk hasil yang lebih baik.");
        }
      } catch {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    });
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setResults(null);
  };

  if (showResults && results) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader className="text-center pb-2">
            <div
              className={cn(
                "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4",
                results.passed ? "bg-green-100" : "bg-red-100"
              )}
            >
              {results.passed ? (
                <Trophy className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {results.passed ? "Selamat! Anda Lulus!" : "Coba Lagi!"}
            </CardTitle>
            <p className="text-muted-foreground">
              Skor Anda: {results.score}% ({results.correctCount}/
              {totalQuestions} benar)
            </p>
            <p className="text-sm text-muted-foreground">
              Skor minimum untuk lulus: {quiz.passingScore}%
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Results breakdown */}
            <div className="space-y-4">
              <h3 className="font-semibold">Hasil per Pertanyaan:</h3>
              {quiz.questions.map((q, idx) => {
                const result = results.results.find(
                  (r) => r.questionId === q.id
                );
                const userAnswer = answers[q.id];
                const userOption = q.options.find((o) => o.id === userAnswer);
                const correctOption = q.options.find(
                  (o) => o.id === result?.correctAnswer
                );

                return (
                  <Card
                    key={q.id}
                    className={cn(
                      "border-l-4",
                      result?.correct ? "border-l-green-500" : "border-l-red-500"
                    )}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-2">
                        {result?.correct ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            {idx + 1}. {q.question}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              Jawaban Anda:{" "}
                            </span>
                            <span
                              className={
                                result?.correct
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {userOption?.text || "Tidak dijawab"}
                            </span>
                          </p>
                          {!result?.correct && (
                            <p className="text-sm">
                              <span className="text-muted-foreground">
                                Jawaban benar:{" "}
                              </span>
                              <span className="text-green-600">
                                {correctOption?.text}
                              </span>
                            </p>
                          )}
                          {result?.explanation && (
                            <p className="text-sm text-muted-foreground mt-2 italic">
                              {result.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleRetry}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
              <Link href={`/dashboard/${slug}`} className="flex-1">
                <Button className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Kursus
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/dashboard/${slug}`}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Kursus
        </Link>
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        {quiz.description && (
          <p className="text-muted-foreground mt-1">{quiz.description}</p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          Chapter: {quiz.chapter.title} | Skor minimum: {quiz.passingScore}%
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>
            Pertanyaan {currentQuestion + 1} dari {totalQuestions}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">
            {currentQuestion + 1}. {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleSelectAnswer(question.id, value)}
          >
            <div className="space-y-3">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors",
                    answers[question.id] === option.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => handleSelectAnswer(question.id, option.id)}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Sebelumnya
        </Button>

        {currentQuestion === totalQuestions - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={
              isPending || Object.keys(answers).length < totalQuestions
            }
          >
            {isPending ? "Mengirim..." : "Selesai & Lihat Hasil"}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Question indicators */}
      <div className="mt-8">
        <p className="text-sm text-muted-foreground mb-3">Navigasi Cepat:</p>
        <div className="flex flex-wrap gap-2">
          {quiz.questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(idx)}
              className={cn(
                "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
                currentQuestion === idx
                  ? "bg-primary text-primary-foreground"
                  : answers[q.id]
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
