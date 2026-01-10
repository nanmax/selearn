"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useConstructUrl } from "@/hooks/use-construct";

interface CourseReviewCardProps {
  course: {
    id: string;
    title: string;
    smallDescription: string;
    fileKey: string;
    price: number;
    duration: number;
    level: string;
    category: string;
    approvalStatus: string;
    createdAt: Date;
    user: {
      name: string | null;
      email: string;
      image: string | null;
    };
    chapter: Array<{
      id: string;
      lessons: Array<{ id: string }>;
    }>;
  };
}

export function CourseReviewCard({ course }: CourseReviewCardProps) {
  const thumbnailUrl = useConstructUrl(course.fileKey || null);
  const totalLessons = course.chapter.reduce(
    (acc, ch) => acc + ch.lessons.length,
    0
  );

  const statusColors = {
    Waiting: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Approved: "bg-green-100 text-green-800 border-green-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={thumbnailUrl || "/placeholder.png"}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge
            className={
              statusColors[course.approvalStatus as keyof typeof statusColors]
            }>
            {course.approvalStatus}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.smallDescription}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{totalLessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}h</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 font-semibold">
            <DollarSign className="w-4 h-4" />
            <span>Rp {course.price.toLocaleString("id-ID")}</span>
          </div>
          <Badge variant="outline">{course.level}</Badge>
        </div>

        <div className="pt-2 border-t">
          <div className="text-sm">
            <div className="font-medium">{course.user.name}</div>
            <div className="text-muted-foreground">{course.user.email}</div>
          </div>
        </div>

        <Link href={`/hr/courses/${course.id}`}>
          <Button className="w-full" variant="outline">
            Review Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
