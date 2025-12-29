/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart config for revenue
const chartConfig = {
  totalRevenue: {
    label: "Total Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: {
    date: string;
    totalRevenue: number;
    instructorRevenue: number;
    selearnRevenue: number;
  }[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  // 📌 Total revenue (30 days)
  const totalRevenueSum = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.instructorRevenue, 0),
    [data]
  );

  // 📈 Add running total for tooltip
  const dataWithRunningTotal = React.useMemo(() => {
    let runningTotal = 0;

    return data.map((item) => {
      runningTotal += item.instructorRevenue;
      return { ...item, runningTotal };
    });
  }, [data]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Revenue (30 days): Rp{" "}
            {totalRevenueSum.toLocaleString("id-ID")}
          </span>
          <span className="@[540px]/card:hidden">
            Rp {totalRevenueSum.toLocaleString("id-ID")}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={dataWithRunningTotal}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={80}
              tickFormatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            {/* Tooltip showing daily + running total + formatted currency */}
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[220px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  formatter={(value, _name, props) => {
                    const todayRevenue =
                      typeof value === "number" ? value : Number(value);
                    const totalSoFar =
                      (props.payload as any)?.runningTotal ?? todayRevenue;

                    return [
                      `Hari ini: Rp ${todayRevenue.toLocaleString("id-ID")}
Total: Rp ${totalSoFar.toLocaleString("id-ID")}`,
                      "",
                    ];
                  }}
                />
              }
            />

            {/* Daily revenue bar */}
            <Bar dataKey="totalRevenue" fill="var(--chart-1)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
