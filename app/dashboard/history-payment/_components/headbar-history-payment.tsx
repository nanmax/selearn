"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import React from "react";

interface HeadbarHistoryPaymentProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  monthFilter: string;
  onMonthFilterChange: (value: string) => void;
}

const HeadbarHistoryPayment = ({
  searchQuery,
  onSearchChange,
  monthFilter,
  onMonthFilterChange,
}: HeadbarHistoryPaymentProps) => {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-primary mb-2">
        Riwayat Pembelian
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-8">
        Kelola dan lihat semua riwayat transaksi pembelian kursus Anda.
      </motion.p>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Input
          type="search"
          placeholder="Cari berdasarkan ID atau nama kursus..."
          className="w-full md:max-w-xs"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Select value={monthFilter} onValueChange={onMonthFilterChange}>
          <SelectTrigger className="w-full md:w-56">
            <SelectValue placeholder="Filter Tanggal: Semua" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="month">Bulan Ini</SelectItem>
            <SelectItem value="3months">3 Bulan Terakhir</SelectItem>
            <SelectItem value="year">Tahun Ini</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
    </>
  );
};

export default HeadbarHistoryPayment;
