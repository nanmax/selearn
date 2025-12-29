"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartAreaUserGrowthSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-[260px] w-full rounded-lg" />
      </CardContent>

      <CardFooter>
        <Skeleton className="h-4 w-48" />
      </CardFooter>
    </Card>
  );
}
