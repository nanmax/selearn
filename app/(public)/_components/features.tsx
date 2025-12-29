import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ClipboardCheck, Users, UserStar } from "lucide-react";

const cardFeatures = [
  {
    icon: <Book className="size-6 md:size-7 text-white" />,
    title: "Pondasi Kuat untuk Setiap Rencana Masa Depanmu",
    description:
      "Materi disesuaikan untuk setiap jenjang, dari sekolah hingga dunia profesional.",
  },
  {
    icon: <UserStar className="size-6 md:size-7 text-white" />,
    title: "Pengajar Ahli & Berpengalaman",
    description:
      "Belajar dari guru terbaik, master tutor, dan praktisi industri berpengalaman.",
  },
  {
    icon: <ClipboardCheck className="size-6 md:size-7 text-white" />,
    title: "Pembelajaran Berbasis Praktik",
    description:
      "Perbanyak latihan soal, tryout, dan studi kasus untuk pemahaman mendalam.",
  },
  {
    icon: <Users className="size-6 md:size-7 text-white" />,
    title: "Komunitas Eksklusif",
    description:
      "Bangun koneksi dengan sesama siswa dan alumni untuk berbagai peluang karir.",
  },
];

export default function Features() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Heading Section */}
        <div className="flex flex-col items-start text-center sm:text-left mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary uppercase leading-snug">
            Pondasi Kuat untuk Setiap Rencana Masa Depanmu
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 dark:text-primary-foreground max-w-2xl">
            Kami menyediakan semua yang kamu butuhkan untuk meraih setiap tujuan
            jangka panjangmu, selangkah demi selangkah.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {cardFeatures.map((feature, index) => (
            <Card
              key={index}
              className="h-full shadow-primary shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-primary/70 rounded-xl shadow-md">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-slate-600 dark:text-primary-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
