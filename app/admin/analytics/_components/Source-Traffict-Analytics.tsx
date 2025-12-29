"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { animate } from "framer-motion";

const ProgressItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      onUpdate(v) {
        setDisplayValue(Math.round(v));
        setProgressValue(v);
      },
    });
    return () => controls.stop();
  }, [value]);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{label}</p>
        <p className="font-bold">{displayValue}%</p>
      </div>
      <Progress
        value={progressValue}
        className={`h-2 rounded-full overflow-hidden ${color}`}
      />
    </div>
  );
};

const SourceTrafficAnalytics = () => {
  const sources = [
    { label: "Internal Selearn", value: 65, color: "bg-blue-600" },
    { label: "Promosi Anda", value: 25, color: "bg-green-500" },
    { label: "Pencarian Google", value: 10, color: "bg-amber-500" },
  ];

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Sumber Trafik</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sources.map((source, i) => (
          <ProgressItem
            key={i}
            label={source.label}
            value={source.value}
            color={source.color}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default SourceTrafficAnalytics;
