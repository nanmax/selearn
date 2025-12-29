/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, UserPlus, Star, Activity } from "lucide-react";
import { getAnalyticsStatsInstructors } from "../action";

function CardAnalyticsSkeleton() {
  const skeletons = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 animate-pulse">
      {skeletons.map((i) => (
        <div
          key={i}
          className="w-full h-full p-6 border rounded-xl bg-white flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div className="w-24 h-4 bg-gray-200 rounded" />
          </div>

          <div>
            <div className="w-20 h-7 bg-gray-200 rounded mb-2" />
            <div className="w-16 h-3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CardAnalyticsStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getAnalyticsStatsInstructors();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) return <CardAnalyticsSkeleton />;

  const cards = [
    {
      title: "Total Pendapatan",
      value: `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`,
      change: "",
      changeColor: "text-green-500",
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Total Pendaftaran",
      value: stats.totalEnrollments,
      changeColor: "text-primary",
      change: "",
      icon: <UserPlus className="w-6 h-6 text-primary" />,
    },
    {
      title: "Rating Rata-rata",
      value: stats.averageRating.toFixed(2),
      changeColor: "text-yellow-500",
      change: "",
      icon: <Star className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Tingkat Penyelesaian User",
      value: `${stats.completionRate}%`,
      changeColor: "text-indigo-500",
      change: "",
      icon: <Activity className="w-6 h-6 text-indigo-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          custom={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          <Card className="w-full h-full p-6 flex flex-col justify-between">
            <CardHeader className={`p-0 mb-2 flex items-center gap-2`}>
              {card.icon}
              <CardTitle className={`text-sm ${card.changeColor}`}>
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p
                className={`text-xs mt-1 flex items-center ${card.changeColor}`}
              >
                {card.change}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
