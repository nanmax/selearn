import { SectionCardsSuperAdmin } from "./_components/section-cards";
import { ChartAreaRevenuePlatform } from "./_components/chart-area-revenue";
import { Suspense } from "react";
import { SectionCardsSkeleton } from "./_components/section-cards-skeleton";
import { ChartAreaUserGrowthServer } from "./_components/chart-area-user-growth-server";
import { ChartAreaUserGrowthSkeleton } from "./_components/chart-area-user-growth-skeleton";

export default async function AdminIndexPage() {
  return (
    <>
      <Suspense fallback={<SectionCardsSkeleton />}>
        <SectionCardsSuperAdmin />
      </Suspense>
      <div className="space-y-4 flex gap-2">
        <div className="w-full flex">
          <ChartAreaRevenuePlatform />
        </div>
        <div className="w-full flex">
          <Suspense fallback={<ChartAreaUserGrowthSkeleton />}>
            <ChartAreaUserGrowthServer />
          </Suspense>
        </div>
      </div>
    </>
  );
}
