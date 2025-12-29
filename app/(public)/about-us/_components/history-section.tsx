/* eslint-disable @next/next/no-img-element */
"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import React from "react";


export const content = [
  {
    title: "2022 - Awal Mula Ide",
    description:
      "Sebuah percikan ide lahir di Cianjur. Kami melihat potensi besar yang belum terjamah karena keterbatasan akses pendidikan dan memutuskan untuk membangun sebuah jembatan digital.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "2023 - Riset dan Pengembangan",
    description:
      "Tahun ini kami dedikasikan untuk merancang platform yang intuitif, membangun fondasi teknologi, dan mengumpulkan para ahli industri pertama sebagai calon instruktur perintis kami.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "2024-2025 - Persiapan dan Peluncuran Resmi",
    description:
      "Tahun 2024 menjadi fase krusial kami. Kami menjalankan versi beta tertutup untuk menyempurnakan platform dan memproduksi puluhan kursus perdana. Puncaknya, di tahun 2025, momen yang ditunggu tiba! Selearn resmi diluncurkan untuk publik, membuka gerbang pendidikan berkualitas bagi seluruh Indonesia. Perjalanan baru saja dimulai!",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        Version control
      </div>
    ),
  },
];
export function HistoryAboutUs() {
  return (
    <div className="w-full py-4 pt-32">
      <StickyScroll content={content} />
    </div>
  );
}
