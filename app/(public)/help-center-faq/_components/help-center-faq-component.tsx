"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Notebook, Shield, TriangleAlert, User } from "lucide-react";
import { CallToAction } from "../../_components/cta";
import FAQsComponent from "./faq-component";

const HelpCenterFAQComponents = () => {
  const categories = [
    {
      title: "Akun & Profil",
      desc: "Pengaturan akun, ganti kata sandi, dan kelola profil Anda.",
      color: "bg-blue-100 text-blue-600",
      icon: <User />,
    },
    {
      title: "Pembayaran & Langganan",
      desc: "Info tagihan, metode pembayaran, dan manajemen langganan.",
      color: "bg-green-100 text-green-600",
      icon: (
        <>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </>
      ),
    },
    {
      title: "Menggunakan Platform",
      desc: "Navigasi kursus, fitur-fitur, dan cara belajar terbaik.",
      color: "bg-purple-100 text-purple-600",
      icon: (
        <>
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </>
      ),
    },
    {
      title: "Masalah Teknis",
      desc: "Solusi untuk masalah video, login, dan error lainnya.",
      color: "bg-yellow-100 text-yellow-600",
      icon: (
        <>
          <TriangleAlert />
        </>
      ),
    },
    {
      title: "Keamanan Akun",
      desc: "Tips dan panduan untuk menjaga keamanan akun Selearn Anda.",
      color: "bg-red-100 text-red-600",
      icon: (
        <>
          <Shield />
        </>
      ),
    },
    {
      title: "Untuk Instruktur",
      desc: "Panduan pembayaran, pembuatan kursus, dan interaksi siswa",
      color: "bg-indigo-100 text-indigo-600",
      icon: (
        <>
          <Notebook />
        </>
      ),
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Flowing Gradient Background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
      bg-[length:200%_200%] animate-gradient"
        />

        {/* Overlay untuk readability */}
        <div className="absolute inset-0 bg-black/30" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
            Pusat Bantuan Selearn
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-100 mb-8">
            Ada pertanyaan? Kami siap membantu. Temukan jawaban yang Anda
            butuhkan di sini.
          </p>

          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative max-w-xl mx-auto">
            <Input
              type="search"
              placeholder="Ketik pertanyaan Anda..."
              className="w-full p-4 pl-12 rounded-full border border-white/40 bg-white/20 
        backdrop-blur-sm text-white placeholder:text-white
        focus:ring-2 focus:ring-white focus:outline-none transition"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="w-5 h-5 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Jelajahi Berdasarkan Kategori
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Temukan solusi lebih cepat dengan memilih kategori yang sesuai.
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}>
            {categories.map((cat, i) => {
              const rowIndex = Math.floor(i / 2);

              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: rowIndex * 0.2,
                  }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative">
                  <Link
                    href="#"
                    className="bg-white p-8 rounded-2xl shadow-lg flex items-start space-x-4 transition">
                    <div
                      className={`${cat.color} rounded-lg h-12 w-12 flex-shrink-0 flex items-center justify-center`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        {cat.icon}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-gray-600">{cat.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <FAQsComponent />

      {/* CTA */}
      <CallToAction />
    </>
  );
};

export default HelpCenterFAQComponents;
