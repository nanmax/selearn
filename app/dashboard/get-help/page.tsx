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
import { Search } from "lucide-react";
import { User, CreditCard, AlertTriangle } from "lucide-react";
import Link from "next/link";

const helpCategories = [
  {
    title: "Akun & Profil",
    description: "Pengaturan akun, ganti kata sandi, dan kelola profile anda.",
    icon: User,
    color: "blue",
    href: "/dashboard/get-help/account",
  },
  {
    title: "Pembayaran",
    description: "Info tagihan, metode pembayaran, dan pengembalian dana.",
    icon: CreditCard,
    color: "green",
    href: "/dashboard/get-help/payment",
  },
  {
    title: "Masalah Teknis",
    description: "Solusi untuk masalah video, login, dan error lainnya.",
    icon: AlertTriangle,
    color: "yellow",
    href: "/dashboard/get-help/technical",
  },
];

export default function GetHelpPage() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Pusat Bantuan</h2>
        <p className="text-gray-600">
          Ada pertanyaan? Kami siap membantu. Temukan jawaban yang Anda butuhkan
          di sini.
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
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link key={index} href={category.href} className="group">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div
                      className={`bg-${category.color}-100 text-${category.color}-600 rounded-lg h-12 w-12 flex items-center justify-center`}>
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold text-gray-900 mb-1 group-hover:text-${category.color}-600 transition-colors`}>
                        {category.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
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
              Bagaimana cara mengatur ulang kata sandi saya?
            </AccordionTrigger>
            <AccordionContent>
              Anda dapat mengatur ulang kata sandi dengan mengklik &quot;Lupa
              Kata Sandi&quot; di halaman login. Kami akan mengirimkan tautan
              untuk mengatur ulang kata sandi ke email Anda yang terdaftar.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              Apakah saya bisa mengunduh video kursus?
            </AccordionTrigger>
            <AccordionContent>
              Untuk melindungi hak cipta instruktur, video kursus tidak dapat
              diunduh. Namun, Anda memiliki akses seumur hidup untuk menontonnya
              secara online melalui platform kami kapan saja.
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
          Masih Butuh Bantuan?
        </h3>
        <p className="max-w-xl mx-auto mb-6 text-gray-600">
          Tim dukungan kami yang ramah siap membantu Anda. Kirimkan tiket
          bantuan dan kami akan segera merespons.
        </p>
        <Button className="px-8 py-3 text-lg shadow-md hover:scale-105 transition-transform">
          Hubungi Tim Dukungan
        </Button>
      </motion.div>
    </main>
  );
}
