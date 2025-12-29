"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function SectionCardsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row justify-between pb-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 animate-pulse" />
              <Skeleton className="h-7 w-20 animate-pulse" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
          </CardHeader>
          <CardFooter>
            <Skeleton className="h-4 w-40 animate-pulse" />
          </CardFooter>
        </Card>
      ))}
    </motion.div>
  );
}
