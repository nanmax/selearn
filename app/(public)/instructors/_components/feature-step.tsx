"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Rencanakan Kurikulum",
    description:
      "Tentukan topik yang Anda kuasai dan susun materi pelajaran yang terstruktur untuk membimbing siswa Anda.",
  },
  {
    number: "2",
    title: "Rekam Video Anda",
    description:
      "Produksi video pembelajaran berkualitas tinggi. Tim kami siap membantu dengan panduan dan praktik terbaik.",
  },
  {
    number: "3",
    title: "Luncurkan & Kembangkan",
    description:
      "Publikasikan kursus Anda, berinteraksi dengan siswa, dan saksikan komunitas belajar Anda tumbuh bersama kami.",
  },
];

export default function FeatureStep() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Hanya 3 Langkah Mudah untuk Memulai
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative px-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true }}>
              <div className="text-8xl font-extrabold text-slate-200">
                {step.number}
              </div>
              <div className="relative -mt-10">
                <h3 className="text-xl font-bold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
