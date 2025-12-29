"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroTutorials = () => {
  return (
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
          className="text-4xl md:text-6xl font-extrabold text-primary dark:text-white mb-4 tracking-tight">
          Pusat Tutorial Selearn
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
          Pelajari keterampilan baru dengan cepat melalui koleksi video tutorial
          singkat dan praktis dari para ahli industri.
        </motion.p>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative max-w-xl mx-auto">
          <Input
            type="search"
            placeholder="Cari tutorial (misal: setup database)..."
            className="w-full p-4 pl-12 rounded-full border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Search />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroTutorials;
