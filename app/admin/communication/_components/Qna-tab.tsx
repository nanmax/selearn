/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconMessage, IconMessageReport } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Reply } from "lucide-react";

const questions = {
  belumDijawab: [
    {
      id: 1,
      name: "Rian Irawan",
      course: "UI/UX Design Essentials",
      time: "2 jam lalu",
      text: "Pak, untuk tugas akhir apakah boleh menggunakan studi kasus pribadi?",
      avatar: "https://placehold.co/40x40/60a5fa/ffffff?text=RI",
    },
  ],
  semua: [
    {
      id: 1,
      name: "Rian Irawan",
      course: "UI/UX Design Essentials",
      time: "2 jam lalu",
      text: "Pak, untuk tugas akhir apakah boleh menggunakan studi kasus pribadi?",
      avatar: "https://placehold.co/40x40/60a5fa/ffffff?text=RI",
    },
    {
      id: 2,
      name: "Fitriani Sari",
      course: "Dasar Desain Grafis",
      time: "1 hari lalu",
      text: "Apakah ada rekomendasi software gratis selain Canva untuk pemula?",
      avatar: "https://placehold.co/40x40/f472b6/ffffff?text=FS",
    },
  ],
};

const QnaTabCommunication = () => {
  const [filter, setFilter] = React.useState("semua-kursus");

  // Filter logic
  const filterData = (data: (typeof questions)["belumDijawab"]) => {
    if (filter === "semua-kursus") return data;
    return data.filter((q) => q.course === filter);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Tabs defaultValue="belum-dijawab" className="w-full">
          <TabsList className="w-full flex justify-between items-center">
            <div className="flex space-x-2">
              <TabsTrigger
                value="belum-dijawab"
                className="flex items-center gap-2">
                <IconMessageReport className="size-5" /> Belum Dijawab
              </TabsTrigger>
              <TabsTrigger
                value="semua-pertanyaan"
                className="flex items-center gap-2">
                <IconMessage className="size-5" /> Semua Pertanyaan
              </TabsTrigger>
            </div>

            <Select
              onValueChange={(val) => setFilter(val)}
              defaultValue={filter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter: Semua Kursus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua-kursus">Semua Kursus</SelectItem>
                <SelectItem value="UI/UX Design Essentials">
                  Development
                </SelectItem>
                <SelectItem value="Dasar Desain Grafis">Accounting</SelectItem>
              </SelectContent>
            </Select>
          </TabsList>

          {/* Belum Dijawab */}
          <TabsContent value="belum-dijawab">
            {filterData(questions.belumDijawab).map((q) => (
              <motion.div
                key={q.id}
                className="py-5 flex items-start space-x-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}>
                <img
                  src={q.avatar}
                  alt={q.name}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-grow">
                  <p className="font-bold text-gray-900">
                    &quot;{q.text}&quot;
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Dari{" "}
                    <span className="font-semibold text-gray-700">
                      {q.name}
                    </span>{" "}
                    di kursus{" "}
                    <span className="font-semibold text-gray-700">
                      {q.course}
                    </span>{" "}
                    • {q.time}
                  </p>
                  <div className="mt-3">
                    <Button className="bg-blue-600 text-white font-semibold hover:bg-blue-700 text-sm transition flex flex-row items-center justify-center rounded-lg">
                      <Reply className="size-5 mr-1" />
                      Balas
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filterData(questions.belumDijawab).length === 0 && (
              <p className="text-gray-500 text-center py-6">
                Tidak ada pertanyaan ditemukan.
              </p>
            )}
          </TabsContent>

          {/* Semua Pertanyaan */}
          <TabsContent value="semua-pertanyaan">
            {filterData(questions.semua).map((q) => (
              <motion.div
                key={q.id}
                className="py-5 flex items-start space-x-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}>
                <img
                  src={q.avatar}
                  alt={q.name}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-grow">
                  <p className="font-bold text-gray-900">
                    &quot;{q.text}&quot;
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Dari{" "}
                    <span className="font-semibold text-gray-700">
                      {q.name}
                    </span>{" "}
                    di kursus{" "}
                    <span className="font-semibold text-gray-700">
                      {q.course}
                    </span>{" "}
                    • {q.time}
                  </p>
                  <div className="mt-3">
                    <Button className="bg-blue-600 text-white font-semibold hover:bg-blue-700 text-sm transition flex flex-row items-center justify-center rounded-lg">
                      <Reply className="size-5 mr-1" />
                      Balas
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filterData(questions.semua).length === 0 && (
              <p className="text-gray-500 text-center py-6">
                Tidak ada pertanyaan ditemukan.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default QnaTabCommunication;
