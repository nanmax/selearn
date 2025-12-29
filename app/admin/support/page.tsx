"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Users, User, CreditCard } from "lucide-react";

export default function SupportAdminPage() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Pusat Bantuan Instruktur
        </h2>
        <p className="text-gray-600">
          Temukan jawaban, panduan, dan sumber daya untuk membantu Anda sukses
          mengajar di Selearn.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative max-w-2xl mx-auto mb-12">
        <Input
          type="search"
          placeholder="Ketik pertanyaan Anda (misal: cara reset password)..."
          className="w-full pl-12 pr-4 py-6 rounded-full shadow-sm"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Jelajahi Berdasarkan Kategori
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Akun */}
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardContent className="flex items-start space-x-4 p-6">
              <div className="bg-blue-100 text-blue-600 rounded-lg h-12 w-12 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  Membangun Kursus
                </h4>
                <p className="text-sm text-gray-600">
                  Panduan membuat kurikulum, merekam video, dan publikasi.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pembayaran */}
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardContent className="flex items-start space-x-4 p-6">
              <div className="bg-green-100 text-green-600 rounded-lg h-12 w-12 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                  Pembayaran & Promosi
                </h4>
                <p className="text-sm text-gray-600">
                  Info pendapatan, penarikan dana, dan cara promosi kursus.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Masalah Teknis */}
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardContent className="flex items-start space-x-4 p-6">
              <div className="bg-indigo-100 text-indigo-600 rounded-lg h-12 w-12 flex items-center justify-center">
                <Users className="size-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  Interaksi Siswa
                </h4>
                <p className="text-sm text-gray-600">
                  Tips mengelola Q&A, ulasan, dan membangun komunikasi.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Pertanyaan Umum (FAQ)
        </h3>
        <Accordion
          type="single"
          collapsible
          className="max-w-3xl mx-auto space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Bagaimana cara kerja pembagian pendapatan?
            </AccordionTrigger>
            <AccordionContent>
              Model pembagian standar kami adalah 70% untuk Anda sebagai
              instruktur dan 30% untuk Selearn. Angka ini dihitung dari
              pendapatan bersih setelah dikurangi biaya transaksi dan pajak yang
              berlaku.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              Kapan saya akan menerima pembayaran?
            </AccordionTrigger>
            <AccordionContent>
              Pembayaran diproses secara otomatis setiap tanggal 5 setiap
              bulannya untuk saldo pendapatan dari bulan sebelumnya, asalkan
              saldo Anda telah mencapai minimal penarikan sebesar Rp 100.000.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Apa saja persyaratan minimum untuk video kursus?
            </AccordionTrigger>
            <AccordionContent>
              Kami mewajibkan semua video memiliki resolusi minimal HD (720p)
              dengan audio yang jernih dan bebas dari suara bising latar
              belakang yang mengganggu. Pastikan juga pencahayaan Anda cukup
              agar materi terlihat jelas.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Support Call-to-Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Tidak Menemukan Jawaban?
        </h3>
        <p className="max-w-xl mx-auto mb-6 text-gray-600">
          Tim dukungan instruktur kami siap membantu Anda. Kirimkan tiket
          bantuan dan kami akan merespons dalam 1x24 jam kerja.
        </p>
        <Button className="px-8 py-3 text-lg shadow-md hover:scale-105 transition-transform">
          Hubungi Tim Dukungan
        </Button>
      </motion.div>
    </main>
  );
}
