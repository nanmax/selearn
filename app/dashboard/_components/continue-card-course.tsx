/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useConstructUrl } from "@/hooks/use-construct";
import Link from "next/link";

interface ContinueCardCourseProps {
  data: {
    Course: {
      id: string;
      title: string;
      slug: string;
      duration: number;
      fileKey: string;
      user: { name: string };
    };
    slug: string;
    nextLessonId: string | null;
    progress: number;
  };
}

const ContinueCardCourse = ({ data }: ContinueCardCourseProps) => {
  const targetProgress = data.progress ?? 0;
  const [progress, setProgress] = useState(0);
  const thumbnailUrl = useConstructUrl(data.Course.fileKey ?? "");

  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 1;
      if (start <= targetProgress) {
        setProgress(start);
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [targetProgress]);
  if (!data?.Course) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-start md:items-center gap-6 dark:bg-transparent dark:border">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: easeOut }}>
        <img
          src={thumbnailUrl ?? ""}
          alt={data.Course.title}
          className="w-full md:w-48 h-auto rounded-lg object-cover"
        />
        {/* <Image
          src="https://placehold.co/200x120/8b5cf6/ffffff?text=UI/UX"
          alt="Course thumbnail"
          width={200}
          height={120}
          className="w-full md:w-48 h-auto rounded-lg object-cover"
        /> */}
      </motion.div>

      <div className="flex-grow">
        <span className="text-xs font-semibold text-purple-600 uppercase">
          Lanjutkan Belajar
        </span>
        <h3 className="text-2xl font-bold text-primary mt-1 mb-2">
          {data.Course.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Oleh {data.Course.user.name}
        </p>

        <Progress value={progress} className="h-2.5 mb-2" />
        <motion.p
          key={progress}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-500">
          {progress}% Selesai
        </motion.p>
      </div>

      <Link
        href={
          data.nextLessonId
            ? `/dashboard/${data.slug}/${data.nextLessonId}`
            : `/dashboard/${data.slug}`
        }>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full md:w-auto">
            Lanjutkan
          </Button>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ContinueCardCourse;
