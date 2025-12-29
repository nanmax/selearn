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
import { getDashboardCards } from "../actions/get-dashboard-cards";

export async function SectionCardsSuperAdmin() {
  const data = await getDashboardCards([
    "signups",
    "customers",
    "courses",
    "lessons",
    "instructors",
    "platformRevenue",
    "instructorRevenueThisMonth",
    "averageCourseRating",
  ]);

  const cards = [
    {
      title: "Jumlah Pendaftaran",
      value: data.signups,
      description: "Users terdaftar di platform",
      icon: <IconUser className="size-6 text-primary" />,
    },
    {
      title: "Jumlah Pelanggan",
      value: data.customers,
      description: "Users aktif di kursus",
      icon: <IconShoppingCart className="size-6 text-green-500" />,
    },
    {
      title: "Total Kursus",
      value: data.courses,
      description: "Kursus tersedia",
      icon: <IconBook className="size-6 text-primary" />,
    },
    {
      title: "Jumlah Pelajaran",
      value: data.lessons,
      description: "Total lesson",
      icon: <IconPlaylistX className="size-6 text-primary" />,
    },
    {
      title: "Jumlah Instruktur",
      value: data.instructors,
      description: "Instruktur terdaftar",
      icon: <IconUser className="size-6 text-primary" />,
    },
    {
      title: "Revenue Platform",
      value: `Rp ${data.platformRevenue.toLocaleString("id-ID")}`,
      description: "Total fee platform",
      icon: <IconShoppingCart className="size-6 text-green-500" />,
    },
    {
      title: "Revenue Instruktur (Bulan Ini)",
      value: `Rp ${data.instructorRevenueThisMonth.toLocaleString("id-ID")}`,
      description: "Total pendapatan semua instruktur",
      icon: <IconShoppingCart className="size-6 text-green-500" />,
    },
    {
      title: "Rating Rata-Rata Kursus",
      value: data.averageCourseRating,
      description: "Rata-rata rating semua kursus",
      icon: <IconBook className="size-6 text-yellow-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row justify-between pb-2">
            <div>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-bold">{card.value}</CardTitle>
            </div>
            {card.icon}
          </CardHeader>
          <CardFooter>
            <p className="text-muted-foreground text-sm">{card.description}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
