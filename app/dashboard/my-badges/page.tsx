import { Suspense } from "react";
import { requireUser } from "@/app/data/user/require-user";
import { getUserBadgesData } from "@/app/data/badges/get-badges";
import BadgesContent from "./_components/BadgesContent";

export const metadata = {
  title: "Achievement Badges | Selearn",
  description: "Lihat pencapaian dan badges yang telah Anda dapatkan",
};

export default async function BadgesPage() {
  return (
    <Suspense fallback={<BadgesSkeleton />}>
      <BadgesLoader />
    </Suspense>
  );
}

async function BadgesLoader() {
  const user = await requireUser();
  const badgesData = await getUserBadgesData(user.id);

  return <BadgesContent data={badgesData} />;
}

function BadgesSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
