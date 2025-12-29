"use client";

import { motion, easeOut } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};

export function CardBecomePartner() {
  return (
    <motion.section
      className="py-16 md:py-24 bg-slate-50"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900"
            variants={cardVariants}
          >
            Model Kemitraan yang Fleksibel
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
            variants={cardVariants}
          >
            Kami menyediakan beberapa program kemitraan yang dapat disesuaikan
            dengan kebutuhan Anda.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {[
            {
              title: "Mitra Korporat",
              desc: "Program untuk perusahaan yang ingin berinvestasi dalam pengembangan keterampilan (upskilling & reskilling) karyawan.",
              border: "border-blue-500",
              items: [
                "Akses kursus massal untuk tim",
                "Jalur belajar yang disesuaikan",
                "Laporan perkembangan belajar",
              ],
            },
            {
              title: "Mitra Pendidikan",
              desc: "Kolaborasi dengan sekolah, universitas, atau lembaga kursus untuk memperkaya kurikulum dan memberikan nilai tambah bagi siswa.",
              border: "border-green-500",
              items: [
                "Kursus co-branding",
                "Program magang bagi lulusan terbaik",
                "Diskon khusus untuk institusi",
              ],
            },
            {
              title: "Mitra Komunitas",
              desc: "Kerja sama dengan komunitas lokal, inkubator, atau organisasi non-profit untuk memberdayakan anggotanya.",
              border: "border-purple-500",
              items: [
                "Akses gratis/diskon untuk anggota",
                "Workshop atau webinar eksklusif",
                "Dukungan untuk acara komunitas",
              ],
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`bg-white rounded-2xl shadow-lg p-8 border-t-4 ${card.border}`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-6">{card.desc}</p>
              <ul className="space-y-3 text-gray-700">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 
                        16zm3.707-9.293a1 1 0 00-1.414-1.414L9 
                        10.586 7.707 9.293a1 1 0 00-1.414 
                        1.414l2 2a1 1 0 001.414 0l4-4z"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
