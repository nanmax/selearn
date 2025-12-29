/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  easeOut,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Wallet, ShoppingBag, PiggyBank, CalendarDays } from "lucide-react";
import { getPaymentStats } from "../actions";

type StatItem = {
  title: string;
  value: number | string;
  prefix?: string;
  description: string;
  color: string;
  icon: React.ElementType;
  isStatic?: boolean;
};

function AnimatedNumber({
  value,
  prefix = "",
}: {
  value: number;
  prefix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(
    count,
    (latest) =>
      prefix + new Intl.NumberFormat("id-ID").format(Math.floor(latest))
  );

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return animation.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}

function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          {/* Title Skeleton */}
          <div className="h-4 w-28 bg-gray-200 rounded"></div>

          {/* Icon Skeleton */}
          <div className="p-2 bg-gray-200 rounded-full w-8 h-8"></div>
        </CardHeader>

        <CardContent>
          {/* Value Skeleton */}
          <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>

          {/* Description Skeleton */}
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CardStatsPayment() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const stats = await getPaymentStats();
      setData(stats);
    })();
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const stats: StatItem[] = [
    {
      title: "Pendapatan Bulan Ini",
      value: data.pendapatanBulanIni,
      prefix: "Rp ",
      description: "Pendapatan instruktur bulan ini",
      color: "text-green-500",
      icon: Wallet,
    },
    {
      title: "Penjualan Bulan Ini",
      value: data.penjualanBulanIni,
      description: "Total course terjual bulan ini",
      color: "text-green-500",
      icon: ShoppingBag,
    },
    {
      title: "Saldo Saat Ini",
      value: data.saldoSaatIni,
      prefix: "Rp ",
      description: "Saldo siap ditarik",
      color: "text-gray-500",
      icon: PiggyBank,
    },
    {
      title: "History Penarikan",
      value: data.historyPenarikan
        ? new Date(data.historyPenarikan).toLocaleDateString("id-ID")
        : "Belum Pernah",
      description: "Penarikan terakhir disetujui",
      color: "text-gray-500",
      icon: CalendarDays,
      isStatic: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((item, i) => {
        const Icon = item.icon;
        const isNumeric = typeof item.value === "number";

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{
              delay: i * 0.1,
              duration: 0.4,
              ease: easeOut,
              type: "spring",
              stiffness: 150,
            }}
          >
            <Card className="rounded-2xl shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm lg:text-[14px] font-medium text-gray-500 text-balance">
                  {item.title}
                </CardTitle>
                <motion.div
                  className="p-2 bg-blue-50 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                </motion.div>
              </CardHeader>

              <CardContent>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {isNumeric ? (
                    <AnimatedNumber
                      value={item.value as number}
                      prefix={item.prefix}
                    />
                  ) : (
                    item.value
                  )}
                </p>
                <p className={`text-xs mt-1 ${item.color}`}>
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
