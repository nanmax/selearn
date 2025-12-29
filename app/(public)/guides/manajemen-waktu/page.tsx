/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: easeOut },
  }),
};

const ManajemenWaktuPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl py-12 md:py-16">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <span className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
            Pengembangan Diri
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
            Teknik Manajemen Waktu untuk Pembelajar Sibuk
          </h1>

          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <img
                src="https://placehold.co/32x32/10b981/ffffff?text=TS"
                alt="Author"
                className="w-8 h-8 rounded-full"
              />
              <span>Oleh Tim Selearn</span>
            </div>
            <span>•</span>
            <span>21 Oktober 2025</span>
          </div>
        </motion.header>

        {/* HERO IMAGE */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="my-10"
        >
          <img
            src="https://placehold.co/1200x600/f59e0b/ffffff?text=Manajemen+Waktu"
            alt="Seseorang mengatur jadwal di kalender"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </motion.figure>

        {/* ARTICLE */}
        <article className="prose lg:prose-lg max-w-none article-content">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl leading-8"
          >
            Menyeimbangkan antara pekerjaan, kehidupan pribadi, dan keinginan
            untuk belajar adalah tantangan besar. Kunci keberhasilannya terletak
            pada satu hal: manajemen waktu yang efektif. Berikut adalah beberapa
            teknik yang dapat Anda terapkan untuk tetap produktif tanpa merasa
            kewalahan.
          </motion.p>

          {[
            {
              title: "1. Prioritaskan dengan Matriks Eisenhower",
              content: (
                <>
                  <p>
                    Tidak semua tugas memiliki tingkat kepentingan yang sama.
                    Matriks Eisenhower membantu Anda memilah tugas berdasarkan
                    dua faktor: <strong>penting</strong> dan{" "}
                    <strong>mendesak</strong>.
                  </p>
                  <ul>
                    <li>
                      <strong>Penting & Mendesak:</strong> Kerjakan segera
                      (deadline pekerjaan).
                    </li>
                    <li>
                      <strong>Penting & Tidak Mendesak:</strong> Jadwalkan untuk
                      dikerjakan (waktu belajar Anda seharusnya di sini!).
                    </li>
                    <li>
                      <strong>Tidak Penting & Mendesak:</strong> Delegasikan jika
                      memungkinkan.
                    </li>
                    <li>
                      <strong>Tidak Penting & Tidak Mendesak:</strong> Hindari
                      atau eliminasi.
                    </li>
                  </ul>
                  <p>
                    Fokuslah pada kuadran{" "}
                    <strong>&quot;Penting & Tidak Mendesak&quot;</strong> untuk
                    pertumbuhan jangka panjang.
                  </p>
                </>
              ),
            },
            {
              title: "2. Terapkan Time Blocking di Kalender Anda",
              content: (
                <>
                  <p>
                    Daripada hanya berniat &quot;nanti mau belajar&quot;, lebih
                    baik <strong>jadwalkan secara spesifik</strong> di kalender
                    Anda. Blok waktu 1-2 jam setiap hari dan anggap itu janji
                    penting.
                  </p>
                  <blockquote>
                    &quot;Apa yang tidak dijadwalkan, tidak akan dikerjakan.&quot;
                  </blockquote>
                </>
              ),
            },
            {
              title: "3. Gunakan Teknik Pomodoro untuk Fokus Maksimal",
              content: (
                <>
                  <p>
                    Otak butuh istirahat untuk memproses informasi. Teknik
                    Pomodoro membantu menjaga fokus dengan ritme berikut:
                  </p>
                  <ol>
                    <li>
                      Fokus belajar <strong>25 menit</strong> penuh.
                    </li>
                    <li>
                      Istirahat <strong>5 menit</strong>.
                    </li>
                    <li>
                      Setelah 4 sesi, istirahat panjang 15–30 menit.
                    </li>
                  </ol>
                  <p>
                    Metode ini mencegah kelelahan mental dan menjaga
                    konsentrasi.
                  </p>
                </>
              ),
            },
            {
              title: "4. Manfaatkan “Waktu Mati” (Dead Time)",
              content: (
                <>
                  <p>
                    Gunakan waktu singkat di sela aktivitas untuk belajar ringan:
                  </p>
                  <ul>
                    <li>
                      <strong>Saat di perjalanan:</strong> Dengarkan audio kursus.
                    </li>
                    <li>
                      <strong>Saat mengantre:</strong> Baca catatan di ponsel.
                    </li>
                    <li>
                      <strong>Saat istirahat makan siang:</strong> Tonton satu
                      video pendek modul Anda.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "5. Tetapkan Tujuan yang Jelas dan Terukur (SMART Goals)",
              content: (
                <>
                  <p>
                    Tujuan samar seperti &quot;ingin belajar coding&quot; mudah
                    membuat Anda menyerah. Gunakan metode{" "}
                    <strong>SMART Goals</strong>:
                  </p>
                  <ul>
                    <li>
                      <strong>Spesifik:</strong> Selesaikan modul
                      &quot;Dasar-Dasar JavaScript&quot;.
                    </li>
                    <li>
                      <strong>Terukur:</strong> Tonton 3 video setiap hari.
                    </li>
                    <li>
                      <strong>Dapat Dicapai:</strong> Luangkan 1 jam setiap malam.
                    </li>
                    <li>
                      <strong>Relevan:</strong> Untuk proyek website Anda.
                    </li>
                    <li>
                      <strong>Batas Waktu:</strong> Selesai dalam 2 minggu.
                    </li>
                  </ul>
                </>
              ),
            },
          ].map((section, index) => (
            <motion.section
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index + 2}
              className="mt-10"
            >
              <h2>{section.title}</h2>
              {section.content}
            </motion.section>
          ))}

          {/* CTA BOX */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
            className="mt-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg"
          >
            <h3 className="text-xl font-bold mt-0">
              Waktu Terbaik untuk Memulai Adalah Sekarang
            </h3>
            <p>
              Manajemen waktu adalah keterampilan yang bisa dipelajari. Mulailah
              dengan satu teknik, dan lihat perubahan nyata dalam perjalanan
              belajar Anda di Selearn.
            </p>
            <a
              href="#"
              className="inline-block mt-4 bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-amber-700 transition"
            >
              Jelajahi Kursus Pengembangan Diri
            </a>
          </motion.div>
        </article>
      </div>
    </main>
  );
};

export default ManajemenWaktuPage;
