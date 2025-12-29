import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import PointsContent from "./_components/points-content";

export default async function MyPointsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      referralCode: true,
      points: true,
      pointTransactions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      _count: {
        select: { referrals: true },
      },
    },
  });

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <PointsContent
        referralCode={user?.referralCode || null}
        points={user?.points || 0}
        transactions={user?.pointTransactions || []}
        totalReferrals={user?._count.referrals || 0}
      />
    </main>
  );
}
