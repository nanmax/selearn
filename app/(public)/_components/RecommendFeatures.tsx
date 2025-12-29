"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconWorld } from "@tabler/icons-react";
import { LayoutDashboardIcon, School, University } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Gallery4Props, SliderCourse } from "./slider-course";

const demoData: Gallery4Props = {
  items: [
    {
      id: "utbk",
      badge: "Wajib Coba",
      title: "Persiapan UTBK dengan Mentor Terbaik",
      description:
        "Raih nilai maksimal UTBK dengan pembelajaran terstruktur, latihan soal, dan bimbingan langsung dari pengajar berpengalaman.",
      href: "https://ui.shadcn.com",
      image:
        "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "career",
      badge: "Karir",
      title: "Skill Digital untuk Dunia Kerja",
      description:
        "Kuasai keterampilan praktis seperti desain, coding, dan komunikasi agar siap bersaing di dunia kerja modern.",
      href: "https://tailwindcss.com",
      image:
        "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "smasmk",
      badge: "SMA/SMK",
      title: "Belajar Pintar untuk Siswa SMA/SMK",
      description:
        "Materi lengkap untuk mendukung pelajaran sekolahmu. Dari Matematika, Fisika, hingga Bahasa Inggris, semua ada di sini.",
      href: "https://astro.build",
      image:
        "https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "university",
      badge: "University",
      title: "Persiapan Perkuliahan Lebih Matang",
      description:
        "Bangun fondasi ilmu sejak awal agar lebih siap menghadapi dunia perkuliahan dan riset akademik.",
      href: "https://react.dev",
      image:
        "https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "software",
      badge: "Software Engineer",
      title: "Belajar Coding dari Dasar hingga Mahir",
      description:
        "Ikuti kursus interaktif untuk menguasai pemrograman web, mobile, hingga AI, dipandu oleh praktisi industri.",
      href: "https://nextjs.org",
      image:
        "https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ],
};

const TooltipCategory = [
  {
    link: "/",
    icon: <LayoutDashboardIcon className="size-5" />,
    content: "Semua",
    hoverContent: "Semua Category",
  },
  {
    link: "/",
    icon: <School className="size-5" />,
    content: "SMA/SMK",
    hoverContent: "Pelajaran SMA/SMK",
  },
  {
    link: "/",
    icon: <University className="size-5" />,
    content: "Perkuliahan",
    hoverContent: "Persiapan Kuliah",
  },
  {
    link: "/",
    icon: <IconWorld className="size-5" />,
    content: "Dunia Kerja",
    hoverContent: "Pengembangan Keahlian Dunia Kerja",
  },
];

export default function RecommendFeatures() {
  return (
    <>
      <div className="container py-20 mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-3 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary uppercase leading-snug">
              Temukan Langkah Pertamamu
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl">
              Pilih jalur belajar yang paling sesuai untuk membangun masa depan
              yang kamu impikan.
            </p>
          </div>
          <div className="flex max-w-2xl flex-wrap items-center justify-center gap-4 sm:gap-2 mx-auto">
            {TooltipCategory.map((category, index) => (
              <Tooltip key={index}>
                <TooltipTrigger
                  asChild
                  className="shadow-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-100">
                  <Link
                    href={category.link}
                    className="flex items-center justify-center gap-1 rounded-xl text-white bg-primary border border-white py-2 px-4">
                    {category.icon}
                    {category.content}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{category.hoverContent}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <SliderCourse {...demoData} />
        </div>
      </div>
    </>
  );
}
