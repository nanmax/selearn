"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import React from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: easeOut,
    },
  }),
};

const guideCategories = ["Semua", "Untuk Pembelajar", "Untuk Instruktur", "Pengembangan Diri"];

const guides = [
  {
    id: "belajar-efektif",
    img: "https://placehold.co/600x400/3b82f6/ffffff?text=Belajar+Efektif",
    tag: "Untuk Pembelajar",
    title: "5 Cara Belajar Efektif Secara Online",
    desc: "Maksimalkan waktu belajar Anda dengan teknik teruji yang akan meningkatkan pemahaman dan retensi materi.",
  },
  {
    id: "panduan-video",
    img: "https://placehold.co/600x400/10b981/ffffff?text=Tips+Video",
    tag: "Untuk Instruktur",
    title: "Panduan Merekam Video Kursus Berkualitas",
    desc: "Dari pencahayaan hingga audio, pelajari cara membuat video profesional bahkan dengan peralatan sederhana.",
  },
  {
    id: "manajemen-waktu",
    img: "https://placehold.co/600x400/f59e0b/ffffff?text=Manajemen+Waktu",
    tag: "Pengembangan Diri",
    title: "Teknik Manajemen Waktu untuk Pembelajar Sibuk",
    desc: "Seimbangkan pekerjaan, kehidupan pribadi, dan belajar dengan strategi manajemen waktu yang efektif.",
  },
];

export default function GuidesComponent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 md:py-28 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold text-primary dark:text-white mb-4 tracking-tight"
          >
            Pusat Panduan Selearn
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-8"
          >
            Temukan artikel, tips, dan tutorial langkah demi langkah untuk
            memaksimalkan perjalanan belajar dan mengajar Anda di platform kami.
          </motion.p>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative max-w-xl mx-auto"
          >
            <Input
              placeholder="Cari panduan (misal: tips video)..."
              className="w-full p-4 pl-12 rounded-full border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-6">
          {/* Filter Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
            }}
            className="flex justify-center flex-wrap gap-2 mb-12"
          >
            {guideCategories.map((label, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  i === 0
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700"
                } px-4 py-2 rounded-full font-semibold transition`}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>

          {/* Guide Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mb-3 px-2.5 py-0.5 rounded-full w-fit">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {item.desc}
                  </p>
                  <Link
                    href={`/guides/${item.id}`}
                    className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 self-start"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
