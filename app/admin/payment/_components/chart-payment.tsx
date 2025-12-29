/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { motion, easeOut } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPaymentChartData } from "../actions";

type ChartItem = {
  month: string;
  [key: string]: any;
};

const COLOR_PALETTE = [
  { stroke: "#2563eb", gradient: "gradient-1" },
  { stroke: "#60a5fa", gradient: "gradient-2" },
  { stroke: "#10b981", gradient: "gradient-3" },
  { stroke: "#f59e0b", gradient: "gradient-4" },
  { stroke: "#ef4444", gradient: "gradient-5" },
  { stroke: "#8b5cf6", gradient: "gradient-6" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white dark:bg-gray-900 p-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <p className="text-sm font-semibold mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-xs">
            <span className="font-semibold">{item.name}:</span> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-4 mt-3 px-2">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <p className="text-xs font-medium">{entry.value}</p>
        </div>
      ))}
    </div>
  );
};

export default function ChartPayment() {
  const [timeRange, setTimeRange] = useState("6m");
  const [courseFilter, setCourseFilter] = useState("all");

  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [courseKeys, setCourseKeys] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const res = await getPaymentChartData();

      // Pastikan warna stabil → SORT!
      const sortedCourses = res.courseKeys.sort((a: string, b: string) =>
        a.localeCompare(b)
      );

      setChartData(res.data);
      setCourseKeys(sortedCourses);
    }
    load();
  }, []);

  // FILTER TIME RANGE
  const filteredByTime = useMemo(() => {
    switch (timeRange) {
      case "1m":
        return chartData.slice(-1);
      case "2m":
        return chartData.slice(-2);
      case "3m":
        return chartData.slice(-3);
      case "4m":
        return chartData.slice(-4);
      case "5m":
        return chartData.slice(-5);
      default:
        return chartData;
    }
  }, [timeRange, chartData]);

  // FILTER COURSE
  const finalFilteredData = useMemo(() => {
    if (courseFilter === "all") return filteredByTime;

    return filteredByTime.map((month) => ({
      month: month.month,
      [courseFilter]: month[courseFilter] ?? 0,
    }));
  }, [courseFilter, filteredByTime]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              Grafik Pendapatan Kursus
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Pendapatan berdasarkan kursus per bulan
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* TIME RANGE */}
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Pilih Rentang Bulan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6m">6 Bulan Terakhir</SelectItem>
                <SelectItem value="5m">5 Bulan Terakhir</SelectItem>
                <SelectItem value="4m">4 Bulan Terakhir</SelectItem>
                <SelectItem value="3m">3 Bulan Terakhir</SelectItem>
                <SelectItem value="2m">2 Bulan Terakhir</SelectItem>
                <SelectItem value="1m">1 Bulan Terakhir</SelectItem>
              </SelectContent>
            </Select>

            {/* COURSE FILTER */}
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Course</SelectItem>
                {courseKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <Separator className="mt-2" />

        <CardContent className="pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-[280px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={finalFilteredData}>
                <defs>
                  {COLOR_PALETTE.map((c, i) => (
                    <linearGradient
                      key={i}
                      id={c.gradient}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={c.stroke}
                        stopOpacity={0.8}
                      />
                      <stop offset="95%" stopColor={c.stroke} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>

                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />

                {/* Render Area berdasarkan filter */}
                {(courseFilter === "all" ? courseKeys : [courseFilter]).map(
                  (key, index) => {
                    const color = COLOR_PALETTE[index % COLOR_PALETTE.length];
                    return (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        name={key}
                        stroke={color.stroke}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#${color.gradient})`}
                        isAnimationActive={true}
                        animationDuration={1200}
                        animationEasing="ease-out"
                        animationBegin={200 * index}
                      />
                    );
                  }
                )}
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
