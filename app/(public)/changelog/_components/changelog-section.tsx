/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect } from "react"
import { motion, useAnimation, easeOut } from "framer-motion"
import { useInView } from "react-intersection-observer"

const timelineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

const ChangeLogItem = ({ date, title, children, icon, color }: any) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      variants={timelineVariants}
      initial="hidden"
      animate={controls}
      className="relative pl-12 mb-12"
    >
      {/* Icon Circle */}
      <div
        className={`absolute left-0 top-1.5 flex items-center justify-center w-8 h-8 rounded-full text-white shadow-lg ${color}`}
      >
        <div className="absolute w-8 h-8 rounded-full animate-ping opacity-30 bg-current"></div>
        <div className="relative z-10">{icon}</div>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-blue-400 transition-all duration-300">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{date}</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <div className="space-y-3">{children}</div>
      </div>
    </motion.div>
  )
}

const ChangeLogSection = () => {
  return (
    <>
      {/* Header */}
      <section className="bg-white dark:bg-slate-950 py-20 md:py-28 text-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-800 animate-gradient-x opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Perkembangan Terbaru di Selearn
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            Kami terus berinovasi untuk memberikan pengalaman belajar terbaik.
            Lihat riwayat pembaruan, fitur baru, dan perbaikan yang telah kami
            lakukan.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="relative">
            {/* Timeline Line with gradient animation */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 animate-gradient-y"></div>

            {/* Items */}
            <ChangeLogItem
              date="1 Oktober 2025"
              title="Versi 1.1.0 - Fitur Komunitas"
              color="bg-blue-600"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              }
            >
              <div className="flex items-center">
                <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  Baru
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Memperkenalkan Forum Diskusi di setiap halaman kursus.
                </p>
              </div>
              <div className="flex items-center">
                <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  Peningkatan
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Desain ulang halaman profil instruktur untuk menampilkan lebih banyak informasi.
                </p>
              </div>
              <div className="flex items-center">
                <span className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  Perbaikan Bug
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Mengatasi masalah video yang terkadang berhenti di perangkat mobile.
                </p>
              </div>
            </ChangeLogItem>

            <ChangeLogItem
              date="15 Agustus 2025"
              title="Versi 1.0.5 - Perbaikan Awal"
              color="bg-slate-400"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              }
            >
              <div className="flex items-center">
                <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  Peningkatan
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Optimalisasi kecepatan muat halaman kursus hingga 20% lebih cepat.
                </p>
              </div>
              <div className="flex items-center">
                <span className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  Perbaikan Bug
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Memperbaiki masalah pada proses checkout untuk beberapa metode pembayaran.
                </p>
              </div>
            </ChangeLogItem>

            <ChangeLogItem
              date="1 Juli 2025"
              title="Versi 1.0.0 - Peluncuran Resmi Selearn!"
              color="bg-blue-600"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.1S6 15.24 4.5 16.5z"></path>
                  <path d="M19 10c-1.5-1.5-3-2-5-2-3.5 0-5 2.5-5 5 0 1.5 1 2.5 2 3s2 1.5 3 2c2 1 3 1.5 5 1.5s3-.5 5-1.5c1.5-1.5 2.5-3 2.5-5 0-2-1-3.5-2.5-5z"></path>
                </svg>
              }
            >
              <div className="flex items-center">
                <span className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  Platform
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Selearn resmi diluncurkan untuk publik dengan 50+ kursus perdana di 5 kategori utama.
                </p>
              </div>
            </ChangeLogItem>
          </div>
        </div>
      </section>
    </>
  )
}

export default ChangeLogSection
