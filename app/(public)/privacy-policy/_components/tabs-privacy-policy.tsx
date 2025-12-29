"use client";

import { motion, easeOut } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function TabsPrivacyPolicy() {
  const [open, setOpen] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpen(open === id ? null : id);
  };

  const daftarIsi = [
    "1. Data Apa yang Kami Kumpulkan",
    "2. Untuk Apa Kami Menggunakan Data",
    "3. Dengan Siapa Kami Membagikan Data",
    "4. Keamanan",
    "5. Hak Anda",
    "6. Privasi Anak-Anak",
    "7. Pembaruan & Informasi Kontak",
  ];

  const pasalList = [
    {
      id: "pasal1",
      title: "1. Data Apa yang Kami Kumpulkan",
      content: (
        <div className="p-5 flex flex-col gap-2 border-t border-slate-200">
          <div>
            <div className="text-lg font-semibold">Data yang Anda Berikan kepada Kami</div>
            <p className="text-sm font-normal text-balance">
              Kami mengumpulkan data yang Anda berikan secara langsung,
              seperti saat Anda membuat akun, memperbarui profil, atau membeli kursus. Ini termasuk:
            </p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>Data Akun:</strong> Nama, alamat email, kata sandi, dan informasi pendaftaran lainnya.</li>
              <li><strong>Data Profil:</strong> Foto profil, biografi, tautan media sosial, dan informasi lain.</li>
              <li><strong>Data Kursus:</strong> Jawaban kuis, tugas, progres penyelesaian kursus, sertifikat.</li>
              <li><strong>Data Pembayaran Siswa:</strong> Kami tidak menyimpan kartu, hanya konfirmasi pembayaran.</li>
              <li><strong>Data Pembayaran Instruktur:</strong> Info rekening bank/akun pembayaran untuk mencairkan fee.</li>
              <li><strong>Komunikasi:</strong> Pertanyaan, ulasan, atau komunikasi lain yang Anda kirimkan.</li>
            </ul>
          </div>
          <div>
            <div className="text-lg font-semibold">Data yang Dikumpulkan Secara Otomatis</div>
            <p className="text-sm font-normal text-balance">
              Kami juga mengumpulkan beberapa data secara otomatis saat Anda menggunakan platform:
            </p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>Data Sistem:</strong> Alamat IP, jenis perangkat, sistem operasi, browser.</li>
              <li><strong>Data Penggunaan:</strong> Halaman yang dikunjungi, kursus yang dilihat, waktu, klik.</li>
            </ul>
          </div>
          <div>
            <div className="text-lg font-semibold">Cookie dan Alat Pengumpul Data Otomatis</div>
            <p className="text-sm font-normal text-balance">
              Kami menggunakan cookie dan teknologi serupa untuk mengumpulkan data otomatis. Cookie membantu kami:
            </p>
            <ul className="list-disc pl-5 text-sm">
              <li>Mengingat preferensi Anda.</li>
              <li>Mengamankan akses akun.</li>
              <li>Menganalisis traffic & tren.</li>
            </ul>
            <p className="text-sm font-normal text-balance">
              Anda bisa menolak cookie, tetapi beberapa fitur mungkin tidak berjalan baik.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "pasal2",
      title: "2. Untuk Apa Kami Menggunakan Data",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Kami menggunakan data Anda untuk berbagai tujuan yang sah, termasuk:
          </p>
          <ul className="list-disc pl-5 text-sm">
            <li><strong>Menyediakan & Mengelola Layanan:</strong> login, progres kursus, sertifikat.</li>
            <li><strong>Memproses Pembayaran:</strong> dari siswa & kepada instruktur.</li>
            <li><strong>Berkomunikasi dengan Anda:</strong> email transaksi, notifikasi layanan, dukungan.</li>
            <li><strong>Memasarkan Produk:</strong> promo kursus, penawaran khusus.</li>
            <li><strong>Memersonalisasi Pengalaman:</strong> rekomendasi kursus.</li>
            <li><strong>Meningkatkan Platform:</strong> analisis data agregat & anonim.</li>
            <li><strong>Menjaga Keamanan:</strong> deteksi & cegah penipuan.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "pasal3",
      title: "3. Dengan Siapa Kami Membagikan Data",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Kami hanya membagikan data Anda dalam situasi tertentu kepada pihak berikut:
          </p>
          <ul className="list-disc pl-5 text-sm">
            <li><strong>Dengan Instruktur:</strong> nama, progres belajar, pertanyaan forum.</li>
            <li><strong>Dengan Siswa Lain:</strong> profil & aktivitas forum Anda bisa dilihat.</li>
            <li><strong>Dengan Penyedia Layanan:</strong> hosting, pembayaran, analitik.</li>
            <li><strong>Dengan Mitra Bisnis:</strong> data pendaftaran bila kursus disponsori (dengan izin Anda).</li>
            <li><strong>Untuk Alasan Hukum:</strong> jika diwajibkan UU/pengadilan.</li>
            <li><strong>Dalam Transaksi Bisnis:</strong> merger, akuisisi, atau penjualan aset.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "pasal4",
      title: "4. Keamanan",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Kami menerapkan langkah teknis & organisasional: enkripsi SSL, hashing password, pembatasan akses internal.
            Tapi tidak ada sistem yang 100% aman.
          </p>
        </div>
      ),
    },
    {
      id: "pasal5",
      title: "5. Hak Anda",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Anda memiliki hak terkait data pribadi:
          </p>
          <ul className="list-disc pl-5 text-sm">
            <li><strong>Mengakses & Memperbarui:</strong> bisa ubah data akun di dasbor.</li>
            <li><strong>Menolak Komunikasi Pemasaran:</strong> klik &quot;unsubscribe&quot; di email promo.</li>
            <li><strong>Menutup Akun:</strong> minta ke tim support. Beberapa data mungkin tetap disimpan untuk legal.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "pasal6",
      title: "6. Privasi Anak-Anak",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Layanan tidak ditujukan untuk anak kurang dari 13 tahun. Jika kami tahu ada data anak tanpa izin orang tua, akan dihapus.
          </p>
        </div>
      ),
    },
    {
      id: "pasal7",
      title: "7. Pembaruan & Informasi Kontak",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Kami dapat memperbarui Kebijakan Privasi ini. Jika ada perubahan besar, akan diberitahu via email/notifikasi.
          </p>
          <p className="text-sm font-normal text-balance">
            Jika ada pertanyaan, hubungi kami di{" "}
            <a href="mailto:dev.wheelbox@gmail.com" className="underline">privacy@selearn.id</a>.
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
        variants={containerVariants}
      >
        {/* Sidebar */}
        <motion.aside className="w-full lg:w-1/4" variants={itemVariants}>
          <div className="sticky top-28">
            <h2 className="font-bold text-lg mb-4">Daftar Isi</h2>
            <ul className="space-y-2">
              {daftarIsi.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#pasal${idx + 1}`}
                    className="text-gray-600 hover:text-blue-600 hover:font-semibold transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>

        {/* Content */}
        <motion.div className="w-full lg:w-3/4 privacy-content" variants={containerVariants}>
          <motion.p className="text-lg text-gray-600 mb-8" variants={itemVariants}>
            Terima kasih telah bergabung dengan Selearn. Kami menghargai privasi Anda
            dan berkomitmen untuk melindunginya.
          </motion.p>

          {pasalList.map((pasal) => (
            <motion.div
              key={pasal.id}
              id={pasal.id}
              className="border border-slate-200 rounded-xl mb-4 bg-white overflow-hidden"
              variants={itemVariants}
            >
              <button
                className="flex justify-between items-center w-full p-6 cursor-pointer select-none"
                onClick={() => toggleOpen(pasal.id)}
              >
                <h2 className="text-xl md:text-2xl font-bold">{pasal.title}</h2>
                <motion.svg
                  className="w-6 h-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: open === pasal.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>

              {open === pasal.id && (
                <motion.div
                  className="px-6 pb-6 border-t border-slate-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  {pasal.content}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
