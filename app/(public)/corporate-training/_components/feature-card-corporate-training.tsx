"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, easeOut } from "framer-motion";
import { BicepsFlexed, ChartArea, HandHelping, Layers, MapPinCheck, UserCheck } from "lucide-react";

const features = [
  {
    title: "Katalog Kursus Lengkap",
    description:
      "Akses ribuan kursus di bidang teknologi, bisnis, kepemimpinan, dan kreativitas yang diajar oleh para ahli industri.",
    icon: (
      <Layers />
    ),
  },
  {
    title: "Pembelajaran Fleksibel",
    description:
      "Tim Anda dapat belajar kapan saja, di mana saja, dan dari perangkat apa saja, sesuai dengan jadwal kerja mereka.",
    icon: (
      <BicepsFlexed />
    ),
  },
  {
    title: "Analitik & Laporan",
    description:
      "Pantau kemajuan belajar tim, tingkat penyelesaian kursus, dan ROI pelatihan Anda melalui dasbor intuitif.",
    icon: (
      <ChartArea />
    ),
  },
  {
    title: "Jalur Belajar Kustom",
    description:
      "Rancang kurikulum yang disesuaikan dengan kebutuhan spesifik departemen atau tujuan bisnis Anda.",
    icon: (
      <MapPinCheck />
    ),
  },
  {
    title: "Sertifikasi Kredibel",
    description:
      "Validasi keterampilan baru tim Anda dengan sertifikat kelulusan yang diakui dan dapat dibagikan.",
    icon: (
      <UserCheck />
    ),
  },
  {
    title: "Dukungan Manajer Akun",
    description:
      "Dapatkan bantuan dari manajer akun khusus yang siap membantu implementasi dan memaksimalkan program Anda.",
    icon: (
      <HandHelping />
    ),
  },
];

export default function FeatureCardCorporateTraining() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Solusi Pelatihan yang Dirancang untuk Sukses
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Tingkatkan kapabilitas tim Anda dengan platform pembelajaran yang
            komprehensif.
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
                delay: index * 0.5,
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
                boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
              }}
            >
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
