"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { ChartRevenue } from "./ChartRevenue";
import CardAnalyticsStats from "./Card-Analytics-Stats";
import SourceTraffictAnalytics from "./Source-Traffict-Analytics";
import DemoPage from "./Analytics-Table";

const MainContentAnalytics = () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Analitik Kinerja
          </h2>
          <p className="text-gray-600">
            Pahami performa kursus Anda untuk terus bertumbuh.
          </p>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <Select defaultValue="30">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Rentang Tanggal" />
              <ChevronDown className="ml-2 h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 Hari Terakhir</SelectItem>
              <SelectItem value="7">7 Hari Terakhir</SelectItem>
              <SelectItem value="90">90 Hari Terakhir</SelectItem>
              <SelectItem value="365">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <CardAnalyticsStats />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Tren Pendapatan</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartRevenue />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-1 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <SourceTraffictAnalytics />
        </motion.div>
      </div>

      {/* Course Performance Table */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <Card className="overflow-x-auto">
          <CardHeader>
            <CardTitle>Rincian Performa per Kursus</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DemoPage />
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
};

export default MainContentAnalytics;
