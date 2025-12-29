
import { motion } from "motion/react";
import { TestimonialsColumn } from "./testimonials-columns";

export const testimonials = [
  {
    text: "Belajar di Selearn bikin persiapan UTBK jauh lebih terarah. Latihan soal dan penjelasan mentornya benar-benar membantu saya paham konsep sulit.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Nadya Putri",
    role: "Siswa Kelas 12 SMA",
  },
  {
    text: "Materinya ringkas, jelas, dan gampang diikuti. Ditambah ada studi kasus nyata yang bikin saya lebih percaya diri menghadapi dunia kerja.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Rizky Pratama",
    role: "Fresh Graduate",
  },
  {
    text: "Selearn bantu saya meningkatkan skill coding dari nol. Kursusnya interaktif, ada mentor yang responsif, jadi nggak bingung saat stuck.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Aulia Rahma",
    role: "Mahasiswa Teknik Informatika",
  },
  {
    text: "Belajar di Selearn fleksibel banget, bisa diatur sesuai waktu kuliah. Materinya mendalam dan langsung bisa dipraktikkan.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Dimas Wibowo",
    role: "Mahasiswa Hukum",
  },
  {
    text: "Kursus persiapan karir di Selearn bener-bener membuka wawasan. Saya jadi tahu cara bikin CV yang menarik dan siap menghadapi interview.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Sarah Lestari",
    role: "Job Seeker",
  },
  {
    text: "Mentor di Selearn ramah dan berpengalaman. Mereka bukan cuma ngajarin teori, tapi juga kasih tips praktis yang berguna banget.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Indah Sari",
    role: "Mahasiswi Ekonomi",
  },
  {
    text: "Belajar public speaking di Selearn bikin saya lebih percaya diri. Sekarang saya bisa presentasi di depan umum tanpa grogi.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Andi Kurniawan",
    role: "Siswa SMK",
  },
  {
    text: "Dari Selearn saya belajar desain grafis dengan cara yang menyenangkan. Proyek praktiknya bikin saya punya portofolio nyata.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Maya Anggraini",
    role: "Mahasiswi Desain",
  },
  {
    text: "Platform ini bener-bener beda. Belajarnya fleksibel, praktis, tapi tetap serius. Sangat membantu buat upgrade skill di sela kerja.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Fajar Ramadhan",
    role: "Karyawan",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export const TestimonialsStudents = () => {
  return (
    <section className="bg-background relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-xl text-primary sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            Apa Kata Mereka?
          </h2>
          <p className="text-center mt-5 opacity-75 text-balance">
            Cerita nyata dari para siswa dan mahasiswa yang telah belajar bersama Selearn.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};