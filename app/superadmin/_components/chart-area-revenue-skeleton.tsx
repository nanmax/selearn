"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartAreaRevenueSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-9 w-40" />
        </div>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-[260px] w-full rounded-md" />
      </CardContent>

      <CardFooter>
        <Skeleton className="h-4 w-48" />
      </CardFooter>
    </Card>
  );
}
