/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LayoutDashboard, Pencil, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import ContinueCardCourse from "../../_components/continue-card-course";
import { useConstructUrl } from "@/hooks/use-construct";
import { useRouter } from "next/navigation";

export default function MyCourseClient({
  courses,
  continueCourse,
}: {
  courses: any[];
  continueCourse: any;
}) {
  const [tab, setTab] = useState("semua");
  const triggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [highlight, setHighlight] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = triggerRefs.current[tab];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement!.getBoundingClientRect();

      setHighlight({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
    }
  }, [tab]);

  const filteredCourses = React.useMemo(() => {
    if (tab === "sedang") return courses.filter((c) => c.progress < 100);
    if (tab === "selesai") return courses.filter((c) => c.progress === 100);
    return courses;
  }, [tab, courses]);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-primary mb-2">Kursus Saya</h2>
        <p className="text-gray-600 mb-8">
          Semua kursus yang terdaftar di akun Anda. Lanjutkan belajar dan raih
          sertifikat Anda!
        </p>
      </motion.div>

      {continueCourse?.Course && <ContinueCardCourse data={continueCourse} />}

      {/* Tabs Filter */}
      <section className="mb-6">
        <Tabs defaultValue="semua" onValueChange={(v) => setTab(v)}>
          <ScrollArea>
            <div className="relative inline-block">
              <TabsList className="gap-1 bg-transparent relative">
                <motion.div
                  animate={{
                    left: highlight.left,
                    width: highlight.width,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                  }}
                  className="absolute top-0 bottom-0 bg-primary rounded-full"
                />
                <TabsTrigger
                  ref={(el) => {
                    triggerRefs.current["semua"] = el;
                  }}
                  value="semua"
                  className="relative z-10 rounded-full flex items-center gap-1 px-4 py-2 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-bold"
                >
                  <LayoutDashboard
                    size={16}
                    className="-ms-0.5 me-1.5 opacity-60"
                  />
                  Semua ({courses.length})
                </TabsTrigger>

                <TabsTrigger
                  ref={(el) => {
                    triggerRefs.current["sedang"] = el;
                  }}
                  value="sedang"
                  className="relative z-10 rounded-full flex items-center gap-1 px-4 py-2 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-bold"
                >
                  <Pencil size={16} className="-ms-0.5 me-1.5 opacity-60" />
                  Sedang Dipelajari (
                  {courses.filter((c) => c.progress < 100).length})
                </TabsTrigger>

                <TabsTrigger
                  ref={(el) => {
                    triggerRefs.current["selesai"] = el;
                  }}
                  value="selesai"
                  className="relative z-10 rounded-full flex items-center gap-1 px-4 py-2 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-bold"
                >
                  <Award size={16} className="-ms-0.5 me-1.5 opacity-60" />
                  Selesai ({courses.filter((c) => c.progress === 100).length})
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value={tab}>
            <motion.div
              key={tab}
              className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard key={course.id} courses={course} />
                ))
              ) : (
                <div className="text-center text-muted-foreground col-span-full py-10">
                  Tidak ada kursus pada kategori ini.
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

function CourseCard({ courses }: { courses: any }) {
  const thumbnailUrl = useConstructUrl(courses.thumbnail);
  const progress = courses.progress ?? 0;
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className="group"
    >
      <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all p-0">
        <div className="flex flex-col">
          <div className="relative w-full aspect-video overflow-hidden">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={courses.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>

          <CardContent className="p-5 flex flex-col grow">
            <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
              {courses.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Oleh {courses.instructor}
            </p>

            <div className="mb-3">
              <Progress value={progress} className="h-2.5 rounded-full" />
              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                <span>{progress}% Selesai</span>
                <span className="text-xs text-muted-foreground">
                  {progress === 100 ? "Selesai" : "Berlangsung"}
                </span>
              </div>
            </div>

            <CardFooter className="p-0 mt-auto">
              <Button
                onClick={() => {
                  if (courses.ctaLabel === "Lihat Sertifikat") {
                    router.push(
                      `/dashboard/my-certificate/${courses.slug}/certificate/${courses.certificateId}`
                    );
                  } else {
                    router.push(`/dashboard/${courses.slug}`);
                  }
                }}
                variant={
                  courses.ctaVariant === "outline" ? "outline" : "default"
                }
                className={cn(
                  "w-full",
                  courses.ctaVariant !== "outline" &&
                    "bg-blue-600 hover:bg-blue-700 text-white"
                )}
              >
                {courses.ctaLabel}
              </Button>
            </CardFooter>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
