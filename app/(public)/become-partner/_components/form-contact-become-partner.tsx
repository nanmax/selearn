"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FormContactBecomePartner = () => {
  return (
    <section id="contact-form" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900">
            Mari Mulai Diskusi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Isi formulir di bawah ini dan tim kemitraan kami akan segera
            menghubungi Anda untuk menjadwalkan sesi konsultasi.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}>
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                Formulir Kemitraan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action="#" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input
                      type="text"
                      id="nama"
                      name="nama"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Perusahaan</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="contoh@perusahaan.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organisasi">
                    Nama Perusahaan / Organisasi
                  </Label>
                  <Input
                    type="text"
                    id="organisasi"
                    name="organisasi"
                    placeholder="Masukkan nama perusahaan"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipe_mitra">Tipe Kemitraan</Label>
                  <Select name="tipe_mitra">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Tipe Kemitraan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="korporat">Korporat</SelectItem>
                      <SelectItem value="pendidikan">Pendidikan</SelectItem>
                      <SelectItem value="komunitas">Komunitas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pesan">Pesan Singkat</Label>
                  <Textarea
                    id="pesan"
                    name="pesan"
                    rows={4}
                    placeholder="Ceritakan sedikit tentang tujuan Anda..."
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full font-semibold shadow-md hover:scale-[1.02] transition-transform">
                    Kirim Permintaan
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FormContactBecomePartner;
