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

export default function TabsCookiePolicy() {
  const [open, setOpen] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpen(open === id ? null : id);
  };

  const daftarIsi = [
    "1. Apa itu Cookie?",
    "2. Jenis Cookie yang Kami Gunakan",
    "3. Mengapa Kami Menggunakan Cookie",
    "4. Pilihan Anda & Cara Mengelola",
    "5. Pembaruan & Kontak",
  ];

  const pasalList = [
    {
      id: "pasal1",
      title: "1. Apa itu Cookie?",
      content: (
        <div className="p-5 flex flex-col gap-2 border-t border-slate-200">
          <div>
            <p className="text-sm font-normal text-balance">
              Cookie adalah file teks kecil yang ditempatkan di perangkat Anda
              (komputer, tablet, atau ponsel) oleh situs web yang Anda kunjungi.
              Cookie banyak digunakan untuk membuat situs web bekerja, atau
              bekerja lebih efisien, serta untuk memberikan informasi kepada
              pemilik situs.
            </p>
            <p className="text-sm font-normal text-balance">
              Cookie memungkinkan kami untuk, antara lain, menyimpan preferensi
              Anda, menjaga Anda tetap masuk, dan menganalisis kinerja situs
              kami. Ada dua jenis utama cookie: cookie sesi (session cookies)
              yang dihapus setelah Anda menutup browser, dan cookie tetap
              (persistent cookies) yang tetap ada di perangkat Anda untuk
              periode waktu tertentu.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "pasal2",
      title: "2. Jenis Cookie yang Kami Gunakan",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Kami mengkategorikan cookie yang kami gunakan sebagai berikut:
          </p>
          <h4 className="font-semibold">Cookie Esensial (Wajib)</h4>
          <p className="text-sm font-normal text-balance">
            Cookie ini mutlak diperlukan agar platform kami dapat berfungsi
            dengan baik. Tanpa cookie ini, layanan seperti login ke akun Anda
            atau memproses pembayaran tidak dapat disediakan. Cookie ini tidak
            dapat dinonaktifkan di sistem kami.
          </p>
          <h4 className="font-semibold">Cookie Kinerja & Analitik</h4>
          <p className="text-sm font-normal text-balance">
            Cookie ini memungkinkan kami untuk menghitung kunjungan dan sumber
            lalu lintas sehingga kami dapat mengukur dan meningkatkan kinerja
            situs kami. Cookie ini membantu kami mengetahui halaman mana yang
            paling populer dan bagaimana pengunjung bergerak di sekitar situs.
            Semua informasi yang dikumpulkan cookie ini bersifat agregat dan
            oleh karena itu anonim.
          </p>
          <h4 className="font-semibold">Cookie Fungsional</h4>
          <p className="text-sm font-normal text-balance">
            Cookie ini digunakan untuk mengingat pilihan yang Anda buat (seperti
            nama pengguna, bahasa, atau wilayah Anda) dan menyediakan fitur yang
            lebih personal dan disempurnakan. Misalnya, cookie ini dapat
            digunakan untuk mengingat preferensi volume video Anda.
          </p>
          <h4 className="font-semibold">Cookie Pemasaran & Penargetan</h4>
          <p className="text-sm font-normal text-balance">
            Cookie ini dapat ditempatkan melalui situs kami oleh mitra
            periklanan kami. Cookie ini dapat digunakan oleh
            perusahaan-perusahaan tersebut untuk membangun profil minat Anda dan
            menampilkan iklan yang relevan di situs lain. Cookie ini tidak
            menyimpan informasi pribadi secara langsung, tetapi didasarkan pada
            identifikasi unik browser dan perangkat internet Anda.
          </p>
        </div>
      ),
    },
    {
      id: "pasal3",
      title: "3. Mengapa Kami Menggunakan Cookie",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Secara ringkas, kami menggunakan cookie pihak pertama dan pihak
            ketiga karena beberapa alasan:
          </p>
          <ul className="list-disc pl-5 text-sm">
            <li>
              Untuk memastikan platform kami beroperasi dengan aman dan efisien.
            </li>
            <li>
              Untuk memahami bagaimana platform kami digunakan dan bagaimana
              kami dapat meningkatkannya.
            </li>
            <li>Untuk mempersonalisasi konten dan pengalaman Anda.</li>
            <li>Untuk membuat upaya pemasaran kami lebih relevan bagi Anda.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "pasal4",
      title: "4. Pilihan Anda & Cara Mengelola Cookie",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Anda memiliki hak untuk memutuskan apakah akan menerima atau menolak
            cookie (selain cookie esensial).
          </p>
          <h4 className="font-semibold">Kontrol Browser</h4>
          <p className="text-sm font-normal text-balance">
            Sebagian besar browser web memungkinkan Anda untuk mengontrol cookie
            melalui pengaturan mereka. Anda dapat mengatur browser Anda untuk
            memberi tahu Anda saat cookie ditempatkan, atau untuk memblokir
            cookie sama sekali. Harap dicatat bahwa jika Anda memilih untuk
            memblokir semua cookie, beberapa bagian dari platform kami mungkin
            tidak dapat diakses atau tidak berfungsi dengan baik.
          </p>
          <p className="text-sm font-normal text-balance">
            Untuk mengetahui lebih lanjut tentang cara mengelola cookie di
            browser populer, kunjungi tautan di bawah ini:
          </p>
          <ul className="list-disc pl-5">
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Apple Safari</li>
            <li>Microsoft Edge</li>
          </ul>
        </div>
      ),
    },
    {
      id: "pasal5",
      title: "5. Pembaruan & Kontak",
      content: (
        <div className="p-5 flex flex-col border-t border-slate-200">
          <p className="text-sm font-normal text-balance">
            Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu
            untuk mencerminkan, misalnya, perubahan pada cookie yang kami
            gunakan atau karena alasan operasional, hukum, atau peraturan
            lainnya. Silakan kunjungi kembali Kebijakan Cookie ini secara
            berkala untuk tetap mendapat informasi tentang penggunaan cookie
            kami.
          </p>
          <p className="text-sm font-normal text-balance">
            Jika Anda memiliki pertanyaan tentang penggunaan cookie kami,
            silakan hubungi kami di{" "}
            <span className="text-primary underline">privacy@selearn.com</span>
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
        <motion.aside className="w-full lg:w-1/4" variants={itemVariants}>
          <div className="sticky top-28">
            <h2 className="font-bold text-lg mb-4">Daftar Isi</h2>
            <ul className="space-y-2">
              {daftarIsi.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#pasal${idx + 1}`}
                    className="text-gray-600 hover:text-blue-600 hover:font-semibold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>

        {/* Content */}
        <motion.div
          className="w-full lg:w-3/4 privacy-content"
          variants={containerVariants}>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            variants={itemVariants}>
            Terima kasih telah bergabung dengan Selearn. Kami menghargai privasi
            Anda dan berkomitmen untuk melindunginya.
          </motion.p>

          {pasalList.map((pasal) => (
            <motion.div
              key={pasal.id}
              id={pasal.id}
              className="border border-slate-200 rounded-xl mb-4 bg-white overflow-hidden"
              variants={itemVariants}>
              <button
                className="flex justify-between items-center w-full p-6 cursor-pointer select-none"
                onClick={() => toggleOpen(pasal.id)}>
                <h2 className="text-xl md:text-2xl font-bold">{pasal.title}</h2>
                <motion.svg
                  className="w-6 h-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: open === pasal.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}>
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>

              {open === pasal.id && (
                <motion.div
                  className="px-6 pb-6 border-t border-slate-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}>
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
