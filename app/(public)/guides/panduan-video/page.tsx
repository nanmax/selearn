/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: easeOut },
  }),
};

const PanduanVideo = () => {
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
          <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
            Panduan Instruktur
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
            Panduan Merekam Video Kursus Berkualitas
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
            <span>20 Oktober 2025</span>
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
            src="https://placehold.co/1200x600/10b981/ffffff?text=Tips+Merekam+Video"
            alt="Peralatan untuk merekam video kursus"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </motion.figure>

        {/* ARTICLE */}
        <article className="prose lg:prose-lg max-w-none">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl leading-8"
          >
            Kualitas video dan audio adalah salah satu faktor terpenting yang
            menentukan keberhasilan kursus online Anda. Produksi yang baik tidak
            hanya membuat materi Anda terlihat profesional, tetapi juga menjaga
            siswa tetap fokus dan terlibat. Anda tidak perlu peralatan mahal
            untuk memulai. Berikut adalah panduan praktis untuk merekam video
            kursus berkualitas.
          </motion.p>

          {[
            {
              title: "1. Audio Adalah Raja: Prioritaskan Suara yang Jernih",
              content: (
                <>
                  <p>
                    Siswa akan lebih mudah mentolerir kualitas video yang kurang
                    sempurna daripada audio yang buruk. Suara yang pecah, bergema,
                    atau penuh suara bising akan membuat siswa sulit berkonsentrasi.
                  </p>
                  <ul>
                    <li>
                      <strong>Gunakan Mikrofon Eksternal:</strong> Jangan mengandalkan
                      mikrofon bawaan laptop atau kamera.
                    </li>
                    <li>
                      <strong>Pilih Ruangan yang Tenang:</strong> Rekam di ruangan yang
                      minim gema dan jauh dari kebisingan.
                    </li>
                    <li>
                      <strong>Lakukan Tes Suara:</strong> Rekam beberapa kalimat dan
                      dengarkan kembali.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "2. Visual yang Menarik: Pencahayaan dan Latar Belakang",
              content: (
                <>
                  <p>
                    Tampilan visual yang baik akan membuat Anda terlihat lebih
                    profesional dan dapat dipercaya sebagai seorang ahli.
                  </p>
                  <blockquote>
                    &quot;Pencahayaan yang baik adalah 80% dari kualitas video yang hebat.&quot;
                  </blockquote>
                  <ul>
                    <li>
                      <strong>Manfaatkan Cahaya Alami:</strong> Posisikan diri Anda
                      menghadap jendela.
                    </li>
                    <li>
                      <strong>Latar Belakang yang Rapi:</strong> Pastikan latar belakang
                      Anda bersih dan minimalis.
                    </li>
                    <li>
                      <strong>Posisikan Kamera Sejajar Mata:</strong> Gunakan tripod
                      atau tumpukan buku.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "3. Rekaman Layar yang Jelas (Screen Recording)",
              content: (
                <>
                  <p>
                    Bagi banyak kursus teknis, rekaman layar adalah komponen utama.
                  </p>
                  <ul>
                    <li>
                      <strong>Gunakan Resolusi Tinggi:</strong> Minimal 1080p untuk
                      hasil yang tajam.
                    </li>
                    <li>
                      <strong>Perbesar Tampilan:</strong> Agar teks mudah dibaca.
                    </li>
                    <li>
                      <strong>Bersihkan Desktop Anda:</strong> Tutup aplikasi yang tidak
                      relevan.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: "4. Penyampaian Materi yang Penuh Energi",
              content: (
                <>
                  <p>
                    Cara Anda menyampaikan materi sama pentingnya dengan materi itu
                    sendiri.
                  </p>
                  <ul>
                    <li>
                      <strong>Buat Naskah atau Poin-Poin:</strong> Gunakan sebagai
                      panduan agar tetap terstruktur.
                    </li>
                    <li>
                      <strong>Bicara dengan Jelas dan Antusias:</strong> Tunjukkan
                      semangat Anda terhadap topik yang diajarkan.
                    </li>
                    <li>
                      <strong>Jaga Kontak Mata dengan Lensa:</strong> Bayangkan Anda
                      sedang berbicara langsung dengan siswa.
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

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
            className="mt-12 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg"
          >
            <h3 className="text-xl font-bold mt-0">Anda Siap Berbagi Ilmu?</h3>
            <p>
              Membuat kursus online adalah perjalanan yang memuaskan. Dengan
              mengikuti tips di atas, Anda sudah selangkah lebih maju dalam
              menciptakan konten berkualitas yang akan disukai siswa.
            </p>
            <a
              href="#"
              className="inline-block mt-4 bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 transition"
            >
              Mulai Mengajar di Selearn
            </a>
          </motion.div>
        </article>
      </div>
    </main>
  );
};

export default PanduanVideo;
