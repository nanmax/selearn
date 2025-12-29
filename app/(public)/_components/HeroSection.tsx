"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
  ChartColumnIncreasing,
  CodeXml,
  BookOpen,
  GraduationCap,
  Laptop,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const placeholders = [
    "Hari ini mau belajar apa?",
    "Skill baru apa yang ingin kamu kuasai?",
    "Cari kursus sesuai passion & tujuanmu",
    "Skill baru menanti, apa pilihanmu hari ini?",
    "Skill apa yang ingin kamu kuasai di Selearn?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.target as HTMLFormElement).querySelector("input")?.value;

    if (!value) return;
    router.push(`/courses?query=${encodeURIComponent(value)}`);
  };

  return (
    <>
      <section className="font-inter relative overflow-hidden bg-white dark:bg-transparent">
        <AnimatedGridPattern />
        <div
          className="absolute inset-0 bg-radial-gradient-t-white-to-transparent dark:hidden"
          aria-hidden="true"
        ></div>

        <CodeXml className="absolute top-2/5 left-12 w-16 h-16 text-gray-500 dark:text-white opacity-40 transform -translate-x-1/2 -translate-y-1/2 rotate-12" />
        <ChartColumnIncreasing className="absolute bottom-1/4 right-1/4 w-20 h-20 text-gray-500 dark:text-white opacity-50 transform translate-x-1/2 translate-y-1/2 -rotate-12" />
        <BookOpen className="absolute top-1/4 right-1/6 w-14 h-14 text-gray-500 dark:text-white opacity-30 rotate-6" />
        <GraduationCap className="absolute bottom-1/5 left-1/3 w-16 h-16 text-gray-500 dark:text-white opacity-30 -rotate-6" />
        <Laptop className="absolute top-10 left-20 w-12 h-12 text-gray-500 dark:text-white opacity-30 rotate-12" />

        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 relative z-10">
          <div className="text-center py-25 md:py-32">
            <h1 className="font-poppins text-2xl md:text-6xl font-extrabold text-[#242A3D] dark:text-white tracking-tight leading-tight">
              Buka Potensi Anda,
              <br />
              <span className="text-[#007BFF]">Satu Keahlian Sekaligus.</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-slate-300">
              Platform kursus online terpercaya di Indonesia untuk membantu Anda
              mencapai tujuan karir dan goals Anda.
            </p>

            <div className="mt-10 max-w-xl mx-auto">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
