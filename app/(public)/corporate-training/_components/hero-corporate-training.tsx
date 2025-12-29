"use client";

import { motion } from "framer-motion";
import React from "react";

const HeroCorporateTraining = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 md:py-32 overflow-hidden">
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
          className="text-4xl md:text-6xl font-extrabold text-primary dark:text-white mb-4 tracking-tight">
          Investasi Terbaik untuk Aset Terpenting Anda: Tim Anda.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
          Berdayakan tim Anda dengan keterampilan yang relevan. Selearn for Business menyediakan solusi pelatihan yang fleksibel, terukur, dan berdampak nyata pada pertumbuhan perusahaan.
        </motion.p>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCorporateTraining;
