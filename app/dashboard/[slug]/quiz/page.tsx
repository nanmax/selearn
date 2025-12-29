import { Suspense } from "react";
import { getQuizByChapter } from "@/app/data/quiz/get-quiz";
import QuizContent from "./_components/QuizContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ chapterId?: string }>;

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const { chapterId } = await searchParams;

  if (!chapterId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <CardTitle>Chapter ID Diperlukan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Silakan akses quiz melalui halaman kursus.
            </p>
            <Link href={`/dashboard/${slug}`}>
              <Button>Kembali ke Kursus</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Suspense fallback={<QuizSkeleton />}>
      <QuizLoader slug={slug} chapterId={chapterId} />
    </Suspense>
  );
}

async function QuizLoader({
  slug,
  chapterId,
}: {
  slug: string;
  chapterId: string;
}) {
  const quiz = await getQuizByChapter(chapterId);

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-gray-600" />
            </div>
            <CardTitle>Quiz Belum Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Chapter ini belum memiliki quiz.
            </p>
            <Link href={`/dashboard/${slug}`}>
              <Button>Kembali ke Kursus</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <QuizContent quiz={quiz} slug={slug} />;
}

function QuizSkeleton() {
  return (
    <div className="p-6 max-w-3xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
