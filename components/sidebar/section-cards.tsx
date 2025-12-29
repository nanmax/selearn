import {
  IconBook,
  IconPlaylistX,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminGetDashboardStats } from "@/app/data/admin/admin-get-dashboard-stats";

export async function SectionCards() {
  const { totalCourses, totalCustomers, totalLessons, totalSignups } =
    await adminGetDashboardStats();

  const cards = [
    {
      title: "Jumlah Pendaftaran",
      value: totalSignups,
      description: "Users terdaftar di platform.",
      icon: <IconUser className="size-6 text-primary" />,
    },
    {
      title: "Jumlah Pelanggan",
      value: totalCustomers,
      description: "Users yang telah mendaftar dalam kursus.",
      icon: <IconShoppingCart className="size-6 text-green-500" />,
    },
    {
      title: "Total Kursus",
      value: totalCourses,
      description: "Kursus yang tersedia di platform.",
      icon: <IconBook className="size-6 text-primary" />,
    },
    {
      title: "Jumlah Pelajaran",
      value: totalLessons,
      description: "Total konten pembelajaran tersedia.",
      icon: <IconPlaylistX className="size-6 text-primary" />,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.value}
              </CardTitle>
            </div>
            {card.icon}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <p className="text-muted-foreground">{card.description}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
