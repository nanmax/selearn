/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";

const categories = ["Semua", "Web Development", "Desain", "Bisnis"];

const tutorials = [
  {
    category: "Web Development",
    duration: "12 Menit",
    level: "Pemula",
    title: "Menguasai CSS Flexbox dalam 12 Menit",
    color: "blue",
    img: "https://placehold.co/600x400/3b82f6/ffffff?text=Tutorial+Flexbox",
  },
  {
    category: "Desain",
    duration: "15 Menit",
    level: "Pemula",
    title: "Prinsip Dasar Desain Logo yang Menarik",
    color: "purple",
    img: "https://placehold.co/600x400/8b5cf6/ffffff?text=Desain+Logo",
  },
  {
    category: "Bisnis",
    duration: "20 Menit",
    level: "Menengah",
    title: "Cara Membuat Rencana Bisnis Satu Halaman",
    color: "amber",
    img: "https://placehold.co/600x400/f59e0b/ffffff?text=Bisnis+Plan",
  },
  {
    category: "Web Development",
    duration: "18 Menit",
    level: "Menengah",
    title: "Setup Database PostgreSQL dengan Docker",
    color: "emerald",
    img: "https://placehold.co/600x400/10b981/ffffff?text=Setup+Database",
  },
];

// Component Card
const TutorialCard = ({
  tutorial,
  index,
}: {
  tutorial: (typeof tutorials)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 flex flex-col group">
      <div className="relative">
        <img
          src={tutorial.img}
          alt="Thumbnail tutorial"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white bg-opacity-80 rounded-full h-16 w-16 flex items-center justify-center">
            <svg
              className={`w-8 h-8 text-${tutorial.color}-600 ml-1`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M7 4v16l13-8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span
            className={`inline-block bg-${tutorial.color}-100 text-${tutorial.color}-800 text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
            {tutorial.category}
          </span>
          <span className="text-sm text-gray-500">{tutorial.duration}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex-grow">
          {tutorial.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-slate-100">
          <span>Tingkat: {tutorial.level}</span>
          <a
            href="#"
            className="font-semibold text-blue-600 hover:text-blue-800">
            Tonton Sekarang &rarr;
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const MainContentTutorials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`${
                i === 0
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-slate-100"
              } px-4 py-2 rounded-full font-semibold transition`}>
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Tutorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <TutorialCard key={index} tutorial={tutorial} index={index} />
          ))}
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16">
          <nav className="flex items-center space-x-2">
            <a
              href="#"
              className="px-4 py-2 text-gray-500 bg-white rounded-lg hover:bg-slate-100 border border-slate-200">
              &larr; Sebelumnya
            </a>
            <a href="#" className="px-4 py-2 text-white bg-blue-600 rounded-lg">
              1
            </a>
            <a
              href="#"
              className="px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-slate-100 border border-slate-200">
              2
            </a>
            <a
              href="#"
              className="px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-slate-100 border border-slate-200">
              3
            </a>
            <a
              href="#"
              className="px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-slate-100 border border-slate-200">
              Berikutnya &rarr;
            </a>
          </nav>
        </motion.div>
      </div>
    </section>
  );
};

export default MainContentTutorials;
