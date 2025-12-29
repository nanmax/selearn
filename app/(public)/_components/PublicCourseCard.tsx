import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct";
import { School, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: PublicCourseType;
}

export function PublicCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.level}</Badge>
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt={data.title}
          width={600}
          height={400}
          className="w-full rounded-t-xl aspect-video h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          No Image
        </div>
      )}
      <CardContent className="my-2">
        <Link
          href={`/courses/${data.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.title}
        </Link>
        <div className="flex flex-row items-center justify-start gap-2">
          <Image
            src={data.user?.image || "/default-profile.png"}
            alt={data.user?.name || "Instructor"}
            width={100}
            height={100}
            className="w-8 h-8 rounded-full mt-2"
          />
          <p className="text-sm font-medium text-slate-800">{data.user?.name}</p>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-[12px] text-muted-foreground truncate max-w-[120px]">
              {data.duration} Hours
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-[12px] text-muted-foreground truncate max-w-[120px]">
              {data.category} Course
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <span className="text-lg font-bold text-primary items-center justify-start">
            Rp {data.price}
          </span>
        </div>
        <Link
          href={`/courses/${data.slug}`}
          className={buttonVariants({ className: "w-full mt-4" })}
        >
          Learn
        </Link>
      </CardContent>
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="w-full relative h-fit">
        <Skeleton className="w-full rounded-t-xl aspect-video" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        <Skeleton className="mt-4 w-full h-10 rounded-md" />
      </CardContent>
    </Card>
  );
}
