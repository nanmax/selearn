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

export default function TabsTermsOfService() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const pasalList = [
    {
      id: "pasal1",
      title: "1. Pendahuluan",
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Perjanjian ini adalah kontrak yang mengikat secara hukum antara Anda
            dan Selearn. Jika Anda tidak setuju, jangan mendaftar atau
            menggunakan Layanan kami.
          </p>
          <h4 className="font-semibold">Definisi</h4>
          <ul className="list-disc pl-5">
            <li>
              <strong>&quot;Platform&quot;</strong> atau <strong>&quot;Layanan&quot;</strong>:
              Merujuk pada situs web, aplikasi, dan layanan yang dioperasikan
              oleh Selearn.
            </li>
            <li>
              <strong>&quot;Pengguna&quot;</strong>: Siapapun yang mengakses atau
              menggunakan Layanan, baik sebagai Siswa maupun Instruktur.
            </li>
            <li>
              <strong>&quot;Siswa&quot;</strong>: Pengguna yang mendaftar atau membeli
              Kursus.
            </li>
            <li>
              <strong>&quot;Instruktur&quot;</strong>: Pengguna yang membuat dan
              mempublikasikan Kursus di Platform.
            </li>
            <li>
              <strong>&quot;Konten&quot;</strong>: Semua materi yang diunggah ke Platform,
              termasuk video, teks, kuis, dan materi lainnya.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "pasal2",
      title: "2. Akun Pengguna",
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Anda memerlukan akun untuk sebagian besar aktivitas di platform
            kami. Jaga keamanan kata sandi Anda.
          </p>
          <ul className="list-disc pl-5">
            <li>Informasi yang Anda berikan harus akurat dan lengkap.</li>
            <li>Anda bertanggung jawab atas semua aktivitas akun Anda.</li>
            <li>Anda tidak boleh membagikan login ke orang lain.</li>
            <li>
              Segera hubungi kami jika ada penggunaan akun tanpa izin.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "pasal3",
      title: "3. Pendaftaran Kursus & Pembayaran",
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Saat Anda mendaftar di sebuah kursus, Anda mendapatkan lisensi dari
            kami untuk melihatnya melalui Platform Selearn, dan tidak ada
            penggunaan lain. Jangan mencoba mentransfer atau menjual kembali
            kursus dengan cara apa pun.
          </p>
          <h4 className="font-semibold">Pembayaran</h4>
          <ul className="list-disc pl-5">
            <li>Anda setuju untuk membayar biaya kursus yang Anda beli.</li>
            <li>
              Kami bekerja sama dengan mitra pemrosesan pembayaran untuk
              keamanan transaksi.
            </li>
            <li>
              Anda tidak boleh menggunakan metode pembayaran yang tidak sah.
            </li>
          </ul>
          <h4 className="font-semibold">Pengembalian Dana</h4>
          <p>
            Anda dapat meminta pengembalian dana dalam 14 hari jika kursus tidak
            sesuai. Kami berhak menolak jika ada penyalahgunaan kebijakan.
          </p>
        </div>
      ),
    },
    {
      id: "pasal4",
      title: "4. Aturan Konten & Perilaku",
      content: (
        <div className="flex flex-col gap-2">
          <p>Anda hanya dapat menggunakan Selearn untuk tujuan yang sah.</p>
          <p>Anda setuju untuk tidak memposting konten yang:</p>
          <ul className="list-disc pl-5">
            <li>Melanggar hak kekayaan intelektual pihak lain.</li>
            <li>Bersifat ilegal, cabul, atau mengancam.</li>
            <li>Mengandung virus, spam, atau kode berbahaya.</li>
            <li>Mempromosikan produk di luar yang diizinkan.</li>
          </ul>
          <p>
            Kami berhak menghapus konten atau menangguhkan akun jika Anda
            melanggar aturan ini.
          </p>
        </div>
      ),
    },
    {
      id: "pasal5",
      title: "5. Hak & Lisensi Selearn",
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Semua hak dalam Platform Selearn tetap menjadi milik eksklusif
            Selearn.
          </p>
          <p>
            Dengan memposting konten, Anda memberi Selearn lisensi terbatas
            untuk menggunakan konten tersebut, namun Anda tetap pemilik konten.
          </p>
        </div>
      ),
    },
    {
      id: "pasal6",
      title: "6. Pembatasan Tanggung Jawab",
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Platform disediakan &quot;sebagaimana adanya&quot; tanpa jaminan apa pun.
          </p>
          <p>
            Selearn tidak bertanggung jawab atas kerugian tidak langsung,
            insidental, atau konsekuensial akibat penggunaan layanan.
          </p>
        </div>
      ),
    },
    {
      id: "pasal7",
      title: "7. Ganti Rugi",
      content: (
        <p>
          Anda setuju untuk membebaskan Selearn dari segala klaim yang timbul
          akibat pelanggaran Anda terhadap ketentuan ini.
        </p>
      ),
    },
    {
      id: "pasal8",
      title: "8. Pengakhiran",
      content: (
        <p>
          Kami dapat menghentikan akun Anda jika melanggar ketentuan. Anda bisa
          berhenti kapan saja. Akses kursus tetap berlaku kecuali dihentikan
          karena pelanggaran hukum.
        </p>
      ),
    },
    {
      id: "pasal9",
      title: "9. Ketentuan Umum",
      content: (
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Hukum yang Mengatur</h4>
          <p>
            Ketentuan ini diatur oleh hukum Republik Indonesia tanpa
            pertentangan prinsip hukum.
          </p>
          <h4 className="font-semibold">Penyelesaian Sengketa</h4>
          <p>
            Sengketa diselesaikan melalui musyawarah. Jika gagal, maka
            Pengadilan Negeri Cianjur berwenang.
          </p>
          <h4 className="font-semibold">Pembaruan Ketentuan</h4>
          <p>
            Kami dapat memperbarui Ketentuan ini. Penggunaan lanjutan berarti
            Anda menerima perubahan tersebut.
          </p>
          <h4 className="font-semibold">Hubungi Kami</h4>
          <p>
            Cara terbaik menghubungi kami adalah melalui tim Dukungan Selearn.
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
        <motion.aside
          className="w-full lg:w-1/4 lg:order-1"
          variants={itemVariants}
        >
          <div className="sticky top-28">
            <h2 className="font-bold text-lg mb-4">Daftar Isi</h2>
            <ul className="space-y-2">
              {pasalList.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.id}`}
                    className="text-gray-600 hover:text-blue-600 hover:font-semibold transition-colors"
                  >
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
          variants={containerVariants}
        >
          {pasalList.map((pasal) => (
            <motion.div
              key={pasal.id}
              id={pasal.id}
              variants={itemVariants}
              className="border border-slate-200 rounded-xl mb-4 bg-white overflow-hidden"
            >
              {/* Trigger */}
              <button
                onClick={() => toggleOpen(pasal.id)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold cursor-pointer"
              >
                <span>{pasal.title}</span>
                <motion.span
                  animate={{ rotate: openId === pasal.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
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
                    className="px-6 pb-6 text-sm text-gray-600"
                  >
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
