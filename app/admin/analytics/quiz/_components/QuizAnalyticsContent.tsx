"use client";

import { AdminAllQuizAnalytics } from "@/app/data/admin/admin-get-quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ClipboardList,
  Users,
  CheckCircle,
  XCircle,
  TrendingUp,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface QuizAnalyticsContentProps {
  data: AdminAllQuizAnalytics;
}

export function QuizAnalyticsContent({ data }: QuizAnalyticsContentProps) {
  const { summary, quizzes } = data;

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Analitik Quiz
          </h2>
          <p className="text-muted-foreground">
            Pantau performa quiz dan hasil siswa di semua kursus Anda.
          </p>
        </div>
        <Link href="/admin/analytics">
          <Badge variant="outline" className="mt-4 md:mt-0 cursor-pointer hover:bg-accent">
            Kembali ke Analitik Utama
          </Badge>
        </Link>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <ClipboardList className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summary.totalQuizzes}</p>
                <p className="text-xs text-muted-foreground">Total Quiz</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Users className="size-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summary.totalAttempts}</p>
                <p className="text-xs text-muted-foreground">Total Percobaan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="size-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summary.totalPassed}</p>
                <p className="text-xs text-muted-foreground">Lulus</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-red-500/10">
                <XCircle className="size-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summary.totalFailed}</p>
                <p className="text-xs text-muted-foreground">Tidak Lulus</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <TrendingUp className="size-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summary.overallPassRate}%</p>
                <p className="text-xs text-muted-foreground">Tingkat Lulus</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <HelpCircle className="size-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summary.averageScore}%</p>
                <p className="text-xs text-muted-foreground">Rata-rata Skor</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quiz List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {quizzes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ClipboardList className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada quiz</h3>
              <p className="text-muted-foreground">
                Buat quiz di halaman edit kursus untuk melihat analitik di sini.
              </p>
            </CardContent>
          </Card>
        ) : (
          quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ClipboardList className="size-5 text-primary" />
                        {quiz.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <BookOpen className="size-4" />
                        <span>{quiz.course.title}</span>
                        <span>-</span>
                        <span>Chapter {quiz.chapter.position}: {quiz.chapter.title}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {quiz.questionCount} Pertanyaan
                      </Badge>
                      <Badge variant="outline">
                        Skor Lulus: {quiz.passingScore}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Percobaan</p>
                      <p className="text-xl font-bold">{quiz.stats.attemptCount}</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="text-sm text-muted-foreground">Lulus</p>
                      <p className="text-xl font-bold text-green-600">{quiz.stats.passedCount}</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="text-sm text-muted-foreground">Tidak Lulus</p>
                      <p className="text-xl font-bold text-red-600">{quiz.stats.failedCount}</p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="text-sm text-muted-foreground">Rata-rata</p>
                      <p className="text-xl font-bold text-purple-600">{quiz.stats.averageScore}%</p>
                    </div>
                  </div>

                  {/* Pass Rate Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Tingkat Kelulusan</span>
                      <span className="font-medium">{quiz.stats.passRate}%</span>
                    </div>
                    <Progress value={quiz.stats.passRate} className="h-2" />
                  </div>

                  {/* Recent Attempts */}
                  {quiz.recentAttempts.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Percobaan Terbaru</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Siswa</TableHead>
                            <TableHead>Skor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Waktu</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {quiz.recentAttempts.map((attempt) => (
                            <TableRow key={attempt.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="size-8">
                                    <AvatarImage src={attempt.user.image || undefined} />
                                    <AvatarFallback>
                                      {attempt.user.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">
                                      {attempt.user.name || "Unknown"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {attempt.user.email}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="font-medium">{attempt.score}%</span>
                              </TableCell>
                              <TableCell>
                                {attempt.passed ? (
                                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                    <CheckCircle className="size-3 mr-1" />
                                    Lulus
                                  </Badge>
                                ) : (
                                  <Badge variant="destructive">
                                    <XCircle className="size-3 mr-1" />
                                    Tidak Lulus
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {attempt.completedAt
                                  ? new Date(attempt.completedAt).toLocaleDateString("id-ID", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>
    </main>
  );
}
