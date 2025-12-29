/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, TimerIcon } from "lucide-react";
import { env } from "@/lib/env";

interface CourseCardProps {
  course: {
    id: string;
    slug: string;
    title: string;
    fileKey: string;
    smallDescription: string;
    level: string;
    duration: number;
    price: number;
    user?: {
      name?: string | null;
      image?: string | null;
    } | null;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-lg bg-white dark:bg-gray-900">
      {/* Image */}
      <Link href={`/courses/${course.slug}`} className="block">
        <Image
          src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`}
          alt={course.title}
          width={400}
          height={225}
          className="w-full h-40 md:h-48 object-cover"
          priority
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 md:p-4">
        {/* Title */}
        <h3 className="text-sm md:text-base lg:text-lg font-semibold line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-2">
          {course.user?.image ? (
            <img
              src={course.user.image ?? undefined}
              alt={course.user?.name ?? "Unknown user"}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-200" />
          )}
          <span className="text-xs md:text-sm lg:text-base text-black dark:text-white">
            {course.user?.name ?? "Anonymous"}
          </span>
        </div>

        {/* Small description */}
        <p className="text-xs md:text-sm text-gray-600 mt-3 line-clamp-2 dark:text-white">
          {course.smallDescription}
        </p>

        {/* Divider */}
        <div className="border-t my-3" />

        {/* Badges */}
        <div className="flex items-center gap-3">
          <Badge className="flex items-center gap-1 text-xs md:text-sm">
            <School className="w-3 h-3" />
            {course.level}
          </Badge>
          <Badge className="flex items-center gap-1 text-xs md:text-sm">
            <TimerIcon className="w-3 h-3" />
            {course.duration}h
          </Badge>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <h2 className="text-sm md:text-base lg:text-lg font-semibold">
            Price
          </h2>
          <span className="text-base md:text-lg lg:text-xl font-bold">
            Rp.{course.price.toLocaleString("id-ID")}
          </span>
        </div>

        {/* Enroll Button */}
        <div className="mt-auto">
          <Link
            href={`/courses/${course.slug}`}
            className={buttonVariants({
              variant: "default",
              className: "w-full mt-3 md:mt-4",
            })}>
            Enroll Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
