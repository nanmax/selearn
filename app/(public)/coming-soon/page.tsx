/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import {
  ChartColumnIncreasing,
  CodeXml,
  BookOpen,
  GraduationCap,
  Laptop,
} from "lucide-react";
import ShiftingCountdown from "./_components/countdown-timer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuBarDemo } from "./_components/navigation-menu-coming-soon";

export default function HeroSection() {
  return (
    <section className="font-inter relative overflow-hidden bg-white dark:bg-transparent min-h-screen flex items-center">
      {/* Background pattern */}
      <AnimatedGridPattern />
      <div
        className="absolute inset-0 bg-radial-gradient-t-white-to-transparent dark:hidden"
        aria-hidden="true"
      ></div>

      {/* Decorative icons */}
      <CodeXml className="absolute top-1/2 left-12 w-16 h-16 text-gray-500 dark:text-white opacity-40 transform -translate-x-1/2 -translate-y-1/2 rotate-12" />
      <ChartColumnIncreasing className="absolute bottom-1/4 right-1/4 w-20 h-20 text-gray-500 dark:text-white opacity-50 transform translate-x-1/2 translate-y-1/2 -rotate-12" />
      <BookOpen className="absolute top-1/4 right-1/6 w-14 h-14 text-gray-500 dark:text-white opacity-30 rotate-6" />
      <GraduationCap className="absolute bottom-1/5 left-1/3 w-16 h-16 text-gray-500 dark:text-white opacity-30 -rotate-6" />
      <Laptop className="absolute top-10 left-20 w-12 h-12 text-gray-500 dark:text-white opacity-30 rotate-12" />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-row py-3 items-center justify-center">
          <img
            src="/logo-selearn.svg"
            alt="Selearn.com"
            width={50}
            height={50}
            className="m-3"
          />
          <span className="text-2xl font-bold text-[#007bff]">Selearn</span>
        </div>

        {/* Heading */}
        <h1 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#242A3D] dark:text-white tracking-tight leading-tight">
          Buka Potensi Anda,
          <br />
          <span className="text-[#007BFF]">Satu Keahlian Sekaligus.</span>
        </h1>

        {/* Description */}
        <p className="mt-1 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600 dark:text-slate-300 max-w-2xl">
          Platform kursus online terpercaya di Indonesia untuk membantu Anda
          mencapai tujuan karir dan goals Anda.
        </p>

        {/* Buttons */}
        <div className="mt-2 sm:mt-3 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/teach-on-selearn">Teach On Selearn</Link>
          </Button>
        </div>

        {/* Countdown */}
        <div className="mt-3 sm:mt-3 w-full max-w-md">
          <ShiftingCountdown />
          <MenuBarDemo />
        </div>
      </div>
    </section>
  );
}
