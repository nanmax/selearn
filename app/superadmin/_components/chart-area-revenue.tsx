"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getPlatformRevenueChart } from "../actions/get-data-revenue-chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartAreaRevenueSkeleton } from "./chart-area-revenue-skeleton";
import { motion } from "framer-motion";

export const description = "A simple area chart";

type ChartItem = {
  month: string;
  revenue: number;
};

export type RevenueRange = "3M" | "6M" | "9M" | "1Y";

const chartConfig = {
  revenue: {
    label: "Platform Revenue",
    color: "#007bff",
  },
} satisfies ChartConfig;

export function ChartAreaRevenuePlatform() {
  const [range, setRange] = useState<RevenueRange>("6M");
  const [data, setData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getPlatformRevenueChart(range).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [range]);

  if (loading) {
    return <ChartAreaRevenueSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between space-y-0">
            <div>
              <CardTitle>Platform Revenu</CardTitle>
              <CardDescription>
                Platform fee collected over the last{" "}
                {range === "3M" && "3 months"}
                {range === "6M" && "6 months"}
                {range === "9M" && "9 months"}
                {range === "1Y" && "1 year"}
              </CardDescription>
            </div>
            <div>
              <Select
                value={range}
                onValueChange={(v) => setRange(v as RevenueRange)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Time Range</SelectLabel>
                    <SelectItem value="3M">Last 3 Months</SelectItem>
                    <SelectItem value="6M">Last 6 Months</SelectItem>
                    <SelectItem value="9M">Last 9 Months</SelectItem>
                    <SelectItem value="1Y">Last 1 Year</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="month"
                    formatter={(value) =>
                      new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(Number(value))
                    }
                  />
                }
              />

              <Area
                dataKey="revenue"
                type="natural"
                fill="var(--color-revenue)"
                fillOpacity={0.4}
                stroke="var(--color-revenue)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Platform income trend <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
