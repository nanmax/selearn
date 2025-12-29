"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
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
import { TrendingUp } from "lucide-react";

type ChartItem = {
  month: string;
  instructors: number;
  students: number;
};

const chartConfig = {
  instructors: {
    label: "Instructors",
    color: "var(--chart-1)",
  },
  students: {
    label: "Students",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaUserGrowthClient({
  data,
}: {
  data: ChartItem[];
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>
          New instructors and students (last 6 months)
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />

            <Area
              dataKey="students"
              type="natural"
              fill="var(--color-students)"
              fillOpacity={0.4}
              stroke="var(--color-students)"
              stackId="a"
            />
            <Area
              dataKey="instructors"
              type="natural"
              fill="var(--color-instructors)"
              fillOpacity={0.4}
              stroke="var(--color-instructors)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-2 text-sm font-medium">
          Growth trend is healthy <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
