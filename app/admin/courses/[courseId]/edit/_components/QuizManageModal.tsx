"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  LoaderPinwheel,
  PlusIcon,
  Trash2,
  ClipboardList,
  GripVertical,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const optionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Opsi tidak boleh kosong"),
});

const questionSchema = z.object({
  question: z.string().min(1, "Pertanyaan tidak boleh kosong"),
  options: z.array(optionSchema).min(2, "Minimal 2 opsi jawaban"),
  correctAnswer: z.string().min(1, "Pilih jawaban yang benar"),
  explanation: z.string().optional(),
});

const quizFormSchema = z.object({
  title: z.string().min(1, "Judul quiz tidak boleh kosong"),
  description: z.string().optional(),
  passingScore: z.number().min(0).max(100),
  timeLimit: z.number().min(0).optional(),
  questions: z.array(questionSchema).min(1, "Minimal 1 pertanyaan"),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

interface QuizManageModalProps {
  chapterId: string;
  chapterTitle: string;
  hasExistingQuiz?: boolean;
  onSuccess?: () => void;
}

export function QuizManageModal({
  chapterId,
  chapterTitle,
  hasExistingQuiz = false,
  onSuccess,
}: QuizManageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedQuiz, setLoadedQuiz] = useState<{
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
  const router = useRouter();

  const defaultQuestion = {
    question: "",
    options: [
      { id: crypto.randomUUID(), text: "" },
      { id: crypto.randomUUID(), text: "" },
      { id: crypto.randomUUID(), text: "" },
      { id: crypto.randomUUID(), text: "" },
    ],
    correctAnswer: "",
    explanation: "",
  };

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: `Quiz - ${chapterTitle}`,
      description: "",
      passingScore: 70,
      timeLimit: undefined,
      questions: [defaultQuestion],
    },
  });

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  // Fetch quiz data when dialog opens and quiz exists
  useEffect(() => {
    async function fetchQuizData() {
      if (isOpen && hasExistingQuiz && !loadedQuiz) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/quiz/manage?chapterId=${chapterId}`);
          if (response.ok) {
            const data = await response.json();
            setLoadedQuiz(data.quiz);
            // Reset form with loaded data
            form.reset({
              title: data.quiz.title,
              description: data.quiz.description || "",
              passingScore: data.quiz.passingScore,
              timeLimit: data.quiz.timeLimit || undefined,
              questions: data.quiz.questions.map((q: { question: string; options: { id: string; text: string }[]; correctAnswer: string; explanation: string | null }) => ({
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation || "",
              })),
            });
          }
        } catch {
          toast.error("Gagal memuat data quiz");
        } finally {
          setIsLoading(false);
        }
      } else if (isOpen && !hasExistingQuiz) {
        // Reset to default for new quiz
        form.reset({
          title: `Quiz - ${chapterTitle}`,
          description: "",
          passingScore: 70,
          timeLimit: undefined,
          questions: [defaultQuestion],
        });
        setLoadedQuiz(null);
      }
    }
    fetchQuizData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, hasExistingQuiz, chapterId]);

  async function onSubmit(values: QuizFormValues) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/quiz/manage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chapterId,
            ...values,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || "Gagal menyimpan quiz");
          return;
        }

        toast.success(hasExistingQuiz ? "Quiz berhasil diperbarui" : "Quiz berhasil dibuat");
        setLoadedQuiz(null);
        setIsOpen(false);
        router.refresh();
        onSuccess?.();
      } catch {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    });
  }

  function addOption(questionIndex: number) {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`);
    if (currentOptions.length >= 6) {
      toast.error("Maksimal 6 opsi jawaban");
      return;
    }
    form.setValue(`questions.${questionIndex}.options`, [
      ...currentOptions,
      { id: crypto.randomUUID(), text: "" },
    ]);
  }

  function removeOption(questionIndex: number, optionIndex: number) {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`);
    if (currentOptions.length <= 2) {
      toast.error("Minimal 2 opsi jawaban");
      return;
    }
    const removedOptionId = currentOptions[optionIndex].id;
    const correctAnswer = form.getValues(`questions.${questionIndex}.correctAnswer`);

    if (correctAnswer === removedOptionId) {
      form.setValue(`questions.${questionIndex}.correctAnswer`, "");
    }

    form.setValue(
      `questions.${questionIndex}.options`,
      currentOptions.filter((_, i) => i !== optionIndex)
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={hasExistingQuiz ? "outline" : "default"}
          size="sm"
          className="gap-2"
        >
          {hasExistingQuiz ? (
            <>
              <Pencil className="size-3" /> Edit Quiz
            </>
          ) : (
            <>
              <ClipboardList className="size-3" /> Buat Quiz
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {hasExistingQuiz ? "Edit Quiz" : "Buat Quiz Baru"}
          </DialogTitle>
          <DialogDescription>
            Quiz untuk chapter: <strong>{chapterTitle}</strong>
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoaderPinwheel className="size-8 animate-spin text-primary" />
            <span className="ml-2">Memuat data quiz...</span>
          </div>
        ) : (

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Quiz</FormLabel>
                    <FormControl>
                      <Input placeholder="Judul Quiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="passingScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skor Lulus (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu (menit)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Tanpa batas"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi (opsional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi quiz..."
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Questions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Pertanyaan</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendQuestion(defaultQuestion)}
                >
                  <PlusIcon className="size-4 mr-1" /> Tambah Pertanyaan
                </Button>
              </div>

              {questions.map((question, qIndex) => (
                <Card key={question.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <GripVertical className="size-4 text-muted-foreground" />
                        Pertanyaan {qIndex + 1}
                      </CardTitle>
                      {questions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeQuestion(qIndex)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`questions.${qIndex}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pertanyaan</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tulis pertanyaan..."
                              className="resize-none"
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Options */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <FormLabel>Opsi Jawaban</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addOption(qIndex)}
                        >
                          <PlusIcon className="size-3 mr-1" /> Tambah Opsi
                        </Button>
                      </div>

                      <FormField
                        control={form.control}
                        name={`questions.${qIndex}.correctAnswer`}
                        render={({ field }) => (
                          <FormItem>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="space-y-2"
                            >
                              {form
                                .watch(`questions.${qIndex}.options`)
                                ?.map((option, oIndex) => (
                                  <div
                                    key={option.id}
                                    className={cn(
                                      "flex items-center gap-2 p-2 rounded-lg border",
                                      field.value === option.id &&
                                        "border-green-500 bg-green-50 dark:bg-green-950"
                                    )}
                                  >
                                    <RadioGroupItem
                                      value={option.id}
                                      id={`q${qIndex}-o${oIndex}`}
                                    />
                                    <Input
                                      placeholder={`Opsi ${oIndex + 1}`}
                                      className="flex-1"
                                      {...form.register(
                                        `questions.${qIndex}.options.${oIndex}.text`
                                      )}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive shrink-0"
                                      onClick={() => removeOption(qIndex, oIndex)}
                                    >
                                      <Trash2 className="size-3" />
                                    </Button>
                                  </div>
                                ))}
                            </RadioGroup>
                            <FormDescription className="text-xs">
                              Klik radio button untuk memilih jawaban yang benar
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`questions.${qIndex}.explanation`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Penjelasan (opsional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Penjelasan mengapa jawaban ini benar..."
                              className="resize-none"
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Ditampilkan setelah siswa menjawab
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <LoaderPinwheel className="size-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : hasExistingQuiz ? (
                  "Perbarui Quiz"
                ) : (
                  "Buat Quiz"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
