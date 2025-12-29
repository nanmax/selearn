"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";

const questions = [
  {
    content:
      "Pak, untuk tugas akhir apakah boleh menggunakan studi kasus pribadi?",
    author: "Rian I.",
    course: "UI/UX Design Essentials",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface PopolarCourseProps {
  data: PopularCourseItem[];
  reviews: {
    content: string;
    author: string;
    course: string;
    rating: number;
  }[];
}

type PopularCourseItem = {
  name: string;
  registration: number;
  revenue: number;
};

const PopolarCourse: React.FC<PopolarCourseProps> = ({ data, reviews }) => {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Popular Courses Table */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">
              Kursus Terpopuler Anda
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-primary">Nama Kursus</TableHead>
                  <TableHead className="text-primary">Pendaftaran</TableHead>
                  <TableHead className="text-primary">Pendapatan</TableHead>
                  {/* <TableHead className="text-primary">Rating</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && data.length > 0 ? (
                  data.map((course, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-semibold">
                        {course.name}
                      </TableCell>
                      <TableCell>{course.registration}</TableCell>
                      <TableCell>
                        Rp {course.revenue.toLocaleString("id-ID")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-gray-500"
                    >
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reviews & Questions */}
      <motion.div className="lg:col-span-1 space-y-8" variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Ulasan Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-48 overflow-y-auto pr-2">
              {reviews.map((review, idx) => (
                <div key={idx} className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-gray-600">{review.content}</p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Oleh <span className="font-semibold">{review.author}</span>{" "}
                    di <span className="font-semibold">{review.course}</span>
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Questions */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">
                Pertanyaan Baru dari Siswa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((q, idx) => (
                <div key={idx} className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-gray-800 font-semibold">
                    {q.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Oleh <span className="font-semibold">{q.author}</span> di{" "}
                    <span className="font-semibold">{q.course}</span>
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-600 font-semibold mt-3 inline-block"
                  >
                    Balas Pertanyaan &rarr;
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PopolarCourse;
