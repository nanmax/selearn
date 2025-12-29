/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: easeOut,
    },
  }),
};

const BelajarEfektif = () => {
  return (
    <main className="bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6 max-w-4xl py-12 md:py-16">
        {/* Header Section */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center"
        >
          <motion.span
            custom={0}
            variants={fadeUp}
            className="text-sm font-semibold text-blue-600 uppercase tracking-wide"
          >
            Panduan Belajar
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 mb-6 tracking-tight"
          >
            5 Cara Belajar Efektif Secara Online
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUp}
            className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://placehold.co/32x32/f59e0b/ffffff?text=BS"
                alt="Author"
                className="w-8 h-8 rounded-full"
              />
              <span>Oleh Budi Santoso</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>20 Oktober 2025</span>
          </motion.div>
        </motion.header>

        {/* Cover Image */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="my-10"
        >
          <img
            src="https://placehold.co/1200x600/3b82f6/ffffff?text=Belajar+Efektif"
            alt="Seorang siswa belajar online dengan fokus"
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </motion.figure>

        {/* Article */}
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="prose prose-blue dark:prose-invert lg:prose-lg max-w-none"
        >
          <motion.p custom={0} variants={fadeUp}>
            Belajar online memberikan fleksibilitas yang luar biasa, namun juga
            menuntut disiplin yang tinggi. Tanpa strategi yang tepat, mudah
            sekali kehilangan fokus dan motivasi. Berikut adalah lima cara
            teruji untuk membuat pengalaman belajar online Anda menjadi lebih
            efektif dan menyenangkan.
          </motion.p>

          {[
            {
              title: "1. Ciptakan Ruang Belajar yang Nyaman & Bebas Gangguan",
              content: (
                <>
                  <p>
                    Otak kita mengasosiasikan tempat dengan aktivitas. Jika Anda
                    belajar di tempat tidur, otak akan berpikir ini waktunya
                    untuk istirahat. Ciptakan satu area khusus—bisa di sudut
                    kamar atau meja kerja—yang didedikasikan hanya untuk belajar.
                  </p>
                  <ul>
                    <li>
                      <strong>Jauhkan Ponsel:</strong> Letakkan ponsel di
                      ruangan lain atau aktifkan mode “Jangan Ganggu”.
                    </li>
                    <li>
                      <strong>Pastikan Pencahayaan Cukup:</strong> Ruangan yang
                      terang membantu Anda tetap fokus.
                    </li>
                    <li>
                      <strong>Siapkan Semua Kebutuhan:</strong> Pastikan semua
                      kebutuhan tersedia agar tidak sering beranjak.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "2. Buat Jadwal Belajar yang Realistis & Konsisten",
              content: (
                <>
                  <p>
                    Fleksibilitas bukan berarti tanpa rencana. Buat jadwal yang
                    jelas untuk menjaga momentum belajar Anda.
                  </p>
                  <blockquote>
                    “Konsistensi akan mengalahkan intensitas dalam jangka
                    panjang.”
                  </blockquote>
                </>
              ),
            },
            {
              title: "3. Gunakan Teknik Belajar Aktif, Bukan Pasif",
              content: (
                <>
                  <p>
                    Hanya menonton video adalah bentuk belajar pasif. Informasi
                    lebih mudah diserap dengan metode aktif seperti:
                  </p>
                  <ul>
                    <li>
                      <strong>Membuat Catatan:</strong> Gunakan bahasa Anda
                      sendiri untuk menulis ulang konsep.
                    </li>
                    <li>
                      <strong>Praktik Langsung:</strong> Terapkan apa yang Anda
                      pelajari seketika.
                    </li>
                    <li>
                      <strong>Ajarkan Kembali:</strong> Jelaskan ulang ke orang
                      lain untuk menguji pemahaman.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "4. Manfaatkan Komunitas & Jangan Ragu Bertanya",
              content: (
                <>
                  <p>
                    Anda tidak belajar sendirian. Gunakan forum komunitas Selearn
                    untuk berdiskusi dan bertanya.
                  </p>
                  <ul>
                    <li>
                      <strong>Tanyakan di forum:</strong> Ada banyak siswa yang
                      mungkin pernah mengalami hal yang sama.
                    </li>
                    <li>
                      <strong>Diskusi dengan Instruktur:</strong> Manfaatkan
                      sesi Q&A untuk mendapatkan insight langsung.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "5. Jaga Keseimbangan & Istirahat yang Cukup",
              content: (
                <>
                  <p>
                    Belajar tanpa istirahat justru kontraproduktif. Terapkan
                    teknik Pomodoro: belajar 25 menit, istirahat 5 menit.
                  </p>
                  <p>
                    Tidur cukup penting agar otak memproses informasi yang baru
                    Anda pelajari.
                  </p>
                </>
              ),
            },
          ].map((section, i) => (
            <motion.section key={i} custom={i} variants={fadeUp}>
              <h2>{section.title}</h2>
              {section.content}
            </motion.section>
          ))}

          {/* Call to Action */}
          <motion.div
            custom={6}
            variants={fadeUp}
            className="mt-12 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 p-6 rounded-r-lg"
          >
            <h3 className="text-xl font-bold mt-0 text-blue-900 dark:text-blue-100">
              Siap Menerapkan Tips Ini?
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Teori tanpa praktik tidak akan menghasilkan apa-apa. Ambil langkah
              pertama Anda sekarang dengan menjelajahi ratusan kursus
              berkualitas di Selearn dan mulailah membangun masa depan Anda hari
              ini!
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="inline-block mt-4 bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              Jelajahi Kursus →
            </motion.a>
          </motion.div>
        </motion.article>
      </div>
    </main>
  );
};

export default BelajarEfektif;
