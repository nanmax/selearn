"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const contentVariants = {
  hidden: { opacity: 0, height: 0 },
  show: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

export default function TabsSecurity() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const pasalList = [
    {
      id: "pasal1",
      title: "Komitmen Kami",
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Kepercayaan Anda adalah segalanya bagi kami. Tim keamanan kami
            bekerja tanpa henti untuk memastikan platform Selearn tetap aman dan
            terlindungi dari ancaman. Kami secara proaktif mengidentifikasi dan
            mengatasi potensi risiko, serta menerapkan praktik terbaik industri
            untuk melindungi data Anda.
          </p>
        </div>
      ),
    },
    {
      id: "pasal2",
      title: "Keamanan Akun",
      content: (
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Perlindungan Kata Sandi</h4>
          <p>
            Kami tidak pernah menyimpan kata sandi Anda dalam bentuk teks biasa.
            Semua kata sandi di-hash menggunakan algoritma kriptografi yang kuat
            dan modern (seperti Argon2 atau bcrypt). Ini berarti bahkan jika
            terjadi pembobolan data, kata sandi Anda tetap aman.
          </p>
          <h4 className="font-semibold">Tips Keamanan Akun untuk Anda</h4>
          <ul className="list-disc pl-5">
            <li>
              Gunakan kata sandi yang kuat dan unik, kombinasi huruf besar,
              huruf kecil, angka, dan simbol.
            </li>
            <li>
              Jangan pernah membagikan kata sandi Anda kepada siapa pun. Staf
              Selearn tidak akan pernah menanyakan kata sandi Anda.
            </li>
            <li>
              Waspadalah terhadap email phishing yang mencoba menipu Anda untuk
              memberikan informasi login.
            </li>
            <li>
              Selalu logout dari akun Anda jika menggunakan komputer publik atau
              bersama.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "pasal3",
      title: "Keamanan Pembayaran",
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Selearn sangat serius dalam menangani keamanan pembayaran. Kami
            tidak menyimpan, memproses, atau mentransmisikan data kartu kredit
            atau debit Anda di server kami. Kami bermitra dengan penyedia
            gerbang pembayaran (payment gateway) terkemuka yang telah
            bersertifikasi <strong>PCI DSS Level 1</strong>. Ini adalah standar
            keamanan tertinggi dan paling ketat di industri pembayaran. Semua
            informasi pembayaran Anda dikirimkan secara terenkripsi langsung
            dari browser Anda ke server mereka, memastikan data finansial Anda
            terlindungi secara maksimal.
          </p>
        </div>
      ),
    },
    {
      id: "pasal4",
      title: "Perlindungan Data",
      content: (
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">
            Enkripsi Saat Transit dan Saat Disimpan
          </h4>
          <p>
            Semua komunikasi antara browser Anda dan server Selearn dienkripsi
            menggunakan <strong>HTTPS (TLS)</strong>. Ini mencegah pihak ketiga
            mengintip data Anda saat sedang dikirimkan. Selain itu, data
            sensitif yang kami simpan di database kami juga dienkripsi saat
            tidak digunakan (encryption at rest) untuk lapisan perlindungan
            tambahan.
          </p>
          <h4 className="font-semibold">Kontrol Akses</h4>
          <p>
            Kami menerapkan prinsip hak akses minimum (principle of least
            privilege). Karyawan Selearn hanya memiliki akses ke data yang
            benar-benar mereka butuhkan untuk menjalankan tugas mereka, dan
            semua akses dicatat dan diaudit.
          </p>
        </div>
      ),
    },
    {
      id: "pasal5",
      title: "Keamanan Platform",
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Kami secara rutin melakukan pemindaian keamanan dan pengujian
            penetrasi untuk mengidentifikasi dan memperbaiki kerentanan.
            Platform kami dilindungi dari ancaman umum seperti:
          </p>
          <ul className="list-disc pl-5">
            <li>Cross-Site Scripting (XSS)</li>
            <li>Cross-Site Request Forgery (CSRF)</li>
            <li>SQL Injection</li>
            <li>Dan serangan web umum lainnya.</li>
          </ul>
          <p>
            Kami selalu memperbarui perangkat lunak dan pustaka kami untuk
            memastikan kami terlindungi dari kerentanan yang baru ditemukan.
          </p>
        </div>
      ),
    },
    {
      id: "pasal6",
      title: "Melaporkan Kerentanan",
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Kami menghargai kontribusi dari komunitas peneliti keamanan. Jika
            Anda menemukan potensi kerentanan keamanan di platform Selearn, kami
            mohon Anda untuk melaporkannya secara bertanggung jawab.
          </p>
          <p>
            Silakan kirimkan temuan Anda ke{" "}
            <span className="text-primary underline">security@selearn.id</span>.
            Kami akan meninjau laporan Anda sesegera mungkin dan bekerja sama
            dengan Anda untuk memastikan masalah tersebut diperbaiki. Kami
            meminta Anda untuk tidak mengungkapkan informasi kerentanan secara
            publik sampai kami memiliki kesempatan untuk mengatasinya.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <motion.div
        className="container mx-auto px-6 flex flex-col lg:flex-row gap-8 lg:gap-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}>
        {/* Sidebar */}
        <motion.aside
          className="w-full lg:w-1/4 lg:order-1"
          variants={itemVariants}>
          <div className="sticky top-28">
            <h2 className="font-bold text-lg mb-4">Daftar Isi</h2>
            <ul className="space-y-2">
              {pasalList.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.id}`}
                    className="text-gray-600 hover:text-blue-600 hover:font-semibold transition-colors">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>

        {/* Content */}
        <motion.div
          className="w-full lg:w-3/4 lg:order-2"
          variants={containerVariants}>
          {pasalList.map((pasal) => (
            <motion.div
              key={pasal.id}
              id={pasal.id}
              variants={itemVariants}
              className="border border-slate-200 rounded-xl mb-4 bg-white overflow-hidden">
              {/* Trigger */}
              <button
                onClick={() => toggleOpen(pasal.id)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold cursor-pointer">
                <span>{pasal.title}</span>
                <motion.span
                  animate={{ rotate: openId === pasal.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.span>
              </button>

              {/* Content */}
              <AnimatePresence initial={false}>
                {openId === pasal.id && (
                  <motion.div
                    key="content"
                    variants={contentVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="px-6 pb-6 text-sm text-gray-600">
                    {pasal.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
