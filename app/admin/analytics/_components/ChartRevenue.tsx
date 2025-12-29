/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getMonthlyRevenuePerCourse } from "../action";

function ChartRevenueSkeleton() {
  return (
    <div className="w-full min-h-[200px] rounded-lg border p-4 animate-pulse">
      <div className="h-4 w-32 bg-gray-500 rounded mb-4" />

      <div className="flex-1 h-[150px] flex items-end gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-gray-500 rounded w-full"
            style={{
              height: `${20 + i * 10}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-6 h-3 bg-gray-500 rounded"></div>
        ))}
      </div>
    </div>
  );
}

export function ChartRevenue() {
  const [data, setData] = useState<any[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    async function load() {
      const results = await getMonthlyRevenuePerCourse();

      const dataset = results.map((item: any) => {
        const row: any = { month: item.month };
        item.courses.forEach((c: any) => {
          row[c.title] = c.amount;
        });
        return row;
      });

      const colorPool = [
        "#2563eb",
        "#60a5fa",
        "#0ea5e9",
        "#14b8a6",
        "#10b981",
        "#84cc16",
        "#eab308",
        "#f97316",
        "#ef4444",
      ];

      const dynamicConfig: ChartConfig = {};
      let colorIndex = 0;

      results[0]?.courses.forEach((course: any) => {
        dynamicConfig[course.title] = {
          label: course.title,
          color: colorPool[colorIndex % colorPool.length],
        };
        colorIndex++;
      });

      setData(dataset);
      setChartConfig(dynamicConfig);
    }

    load();
  }, []);

  if (data.length === 0 || Object.keys(chartConfig).length === 0) {
    return <ChartRevenueSkeleton />;
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.keys(chartConfig).map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={4}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
