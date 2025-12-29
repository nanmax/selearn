"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeadbarSearch = () => {
  return (
    <>
      <motion.div
        className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}>
        <div className="relative w-full md:max-w-xs">
          <Input
            type="search"
            placeholder="Cari sertifikat..."
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter Kategori: Semua" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="web">Web Development</SelectItem>
            <SelectItem value="design">Desain</SelectItem>
            <SelectItem value="business">Bisnis</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
    </>
  );
};

export default HeadbarSearch;
