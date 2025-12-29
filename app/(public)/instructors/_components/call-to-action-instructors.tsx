"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTAInstructors() {
  return (
    <section className="mx-auto p-5 lg:py-10 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 
        bg-size-[200%_200%] opacity-30 dark:opacity-40"
      />

      {/* Card dengan Glow */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative flex flex-col mx-auto items-center 
        bg-white/90 dark:bg-slate-900/80 
        py-16 px-6 max-w-5xl w-full text-center 
        rounded-2xl shadow-2xl backdrop-blur-md border border-slate-200 dark:border-slate-700
        overflow-hidden"
      >
        {/* Glow border layer */}
        <div
          className="absolute inset-0 rounded-2xl 
          before:absolute before:inset-0 before:rounded-2xl 
          before:p-0.5 before:bg-linear-to-r 
          before:from-indigo-400 before:via-purple-500 before:to-pink-500
          before:animate-pulse
          before:opacity-40
          before:blur-md
          pointer-events-none"
        ></div>

        {/* Content */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative text-3xl sm:text-4xl font-semibold sm:font-bold 
          text-gray-900 dark:text-white"
        >
          Anda Siap untuk Menginspirasi?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative max-w-2xl text-slate-600 dark:text-slate-300 mt-4 max-sm:text-sm"
        >
          Dunia menanti keahlian Anda. Ambil langkah pertama untuk menjadi
          seorang kreator pendidikan dan bangun masa depan yang lebih cerah
          bersama kami.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-sm:w-full"
        >
          {/* Button 1 */}
          <Link href="/teach-on-selearn">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(238,242,255,0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="group flex items-center justify-center gap-2 px-6 py-2 
            border border-indigo-500 rounded-full text-indigo-500 
            transition-all bg-white/70 dark:bg-slate-800/70 
            dark:text-indigo-400 dark:hover:bg-slate-700/70"
            >
              Daftar Menjadi Instruktur
              <motion.svg
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-0.5"
                width="15"
                height="11"
                viewBox="0 0 15 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          </Link>

          {/* Button 2 */}
          <Link href="/teach-on-selearn">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 6px 25px rgba(99, 102, 241, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="bg-indigo-500 hover:bg-indigo-600 
            transition-all px-4 py-2 text-white font-medium 
            rounded-full shadow-lg dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              Mulai Sekarang
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
