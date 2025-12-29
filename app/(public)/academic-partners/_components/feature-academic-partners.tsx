"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, easeOut } from "framer-motion";
import {
  GraduationCap,
  ChartPie,
  Book,
  Users,
  ChartColumn,
  LifeBuoy,
} from "lucide-react";

const features = [
  {
    title: "Perkaya Kurikulum",
    description:
      "Integrasikan kursus berbasis industri kami ke dalam kurikulum Anda sebagai mata kuliah pilihan atau pelengkap.",
    icon: <Book />,
  },
  {
    title: "Tingkatkan Kesiapan Kerja",
    description:
      "Bekali mahasiswa dengan keterampilan praktis yang dibutuhkan industri, meningkatkan daya saing mereka di pasar kerja.",
    icon: <GraduationCap />,
  },
  {
    title: "Program Co-Branding",
    description:
      "Tingkatkan citra inovatif institusi Anda dengan menawarkan program sertifikasi bersama Selearn.",
    icon: <ChartPie />,
  },
  {
    title: "Akses untuk Pengajar",
    description:
      "Berikan dosen dan staf pengajar akses ke kursus kami untuk pengembangan profesional berkelanjutan (CPD).",
    icon: <Users />,
  },
  {
    title: "Analitik Pembelajaran",
    description:
      "Dapatkan wawasan tentang partisipasi dan kemajuan belajar mahasiswa melalui dasbor analitik khusus.",
    icon: <ChartColumn />,
  },
  {
    title: "Dukungan Implementasi",
    description:
      "Tim kami siap membantu proses integrasi, mulai dari orientasi hingga dukungan teknis berkelanjutan.",
    icon: <LifeBuoy />,
  },
];

export default function FeatureCardAcademicPartners() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Mempersiapkan Lulusan Siap Kerja
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Kolaborasi dengan kami memberikan nilai tambah yang signifikan bagi
            institusi dan mahasiswa Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.3,
                ease: easeOut,
                delay: index * 0.3,
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
                boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
              }}>
              <Card className="border border-slate-100 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <div className="bg-blue-100 text-blue-600 rounded-lg h-12 w-12 flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
