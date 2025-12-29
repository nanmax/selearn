/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, easeOut } from "framer-motion";
import React, { useRef } from "react";
import { Users, BarChart, Megaphone } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const skills = [
  {
    label: "Integrasi Kurikulum",
    icon: Users,
    desc: "Mendukung pembelajaran formal dengan materi praktis yang relevan.",
  },
  {
    label: "Program Ekstrakurikuler",
    icon: BarChart,
    desc: "Memperkaya kegiatan mahasiswa dengan skill siap kerja.",
  },
  {
    label: "Lisensi Kampus",
    icon: Megaphone,
    desc: "Akses penuh untuk institusi dengan skema fleksibel.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const trainingImages = [
  "https://placehold.co/600x400/e2e8f0/334155?text=Sesi+Pelatihan+1",
  "https://placehold.co/600x400/cbd5e1/0f172a?text=Sesi+Pelatihan+2",
  "https://placehold.co/600x400/94a3b8/f8fafc?text=Sesi+Pelatihan+3",
];

const ModelAcademicPartners = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Carousel
              className="w-full max-w-lg mx-auto"
              plugins={[plugin.current]}
              opts={{ loop: true }}
            >
              <CarouselContent>
                {trainingImages.map((src, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={src}
                      alt={`Sesi Pelatihan ${i + 1}`}
                      className="rounded-2xl shadow-xl w-full h-auto object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Model Kolaborasi yang Fleksibel
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Kami memahami bahwa setiap institusi memiliki kebutuhan unik.
              Pilih model kemitraan yang paling sesuai untuk Anda:
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-rows-3 gap-4"
            >
              {skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-white p-5 rounded-lg shadow-sm cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-gray-800">
                        {skill.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {skill.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModelAcademicPartners;
