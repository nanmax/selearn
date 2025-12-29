"use client";

import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

const notificationOptions = [
  {
    id: "new-student",
    title: "Pendaftaran Siswa Baru",
    description:
      "Dapatkan email setiap kali ada siswa baru mendaftar di salah satu kursus Anda.",
    defaultChecked: true,
  },
  {
    id: "new-question",
    title: "Pertanyaan Baru di Q&A",
    description:
      "Dapatkan notifikasi saat siswa mengajukan pertanyaan di kursus Anda.",
    defaultChecked: true,
  },
  {
    id: "new-review",
    title: "Ulasan Kursus Baru",
    description:
      "Dapatkan pemberitahuan saat siswa memberikan ulasan pada kursus Anda.",
    defaultChecked: true,
  },
  {
    id: "tips",
    title: "Tips & Pengumuman Instruktur",
    description:
      "Terima email dari Selearn tentang tips mengajar dan pembaruan platform.",
    defaultChecked: false,
  },
];

const SettingsNotification = () => {
  return (
    <motion.div
      id="notifikasi-content"
      className="p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-lg space-y-8">
        <div>
          <h3 className="text-lg font-semibold border-b pb-3">
            Notifikasi Email
          </h3>
          <p className="text-sm text-muted-foreground mt-4">
            Pilih notifikasi mana yang ingin Anda terima.
          </p>

          <div className="mt-6 space-y-5">
            {notificationOptions.map((option, index) => (
              <motion.div
                key={option.id}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Checkbox
                  id={option.id}
                  defaultChecked={option.defaultChecked}
                  className="mt-0.5"
                />
                <Label
                  htmlFor={option.id}
                  className="space-y-1 cursor-pointer flex items-start justify-between gap-10"
                >
                  <span className="block font-medium">{option.title}</span>
                  <span className="block text-sm text-muted-foreground">
                    {option.description}
                  </span>
                </Label>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="gap-2">
              <Mail className="w-4 h-4" />
              Simpan Preferensi
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsNotification;
