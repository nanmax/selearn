/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type TimeUnit = "Day" | "Hour" | "Minute" | "Second";

interface CountdownItemProps {
  unit: TimeUnit;
  label: string;
}

export default function ShiftingCountdown() {
  return (
    <section className="dark:text-[#007bff] text-[#007bff] flex items-center justify-center transition-colors duration-500">
      <div className="flex w-full max-w-5xl items-center bg-transparent">
        <CountdownItem unit="Day" label="Days" />
        <CountdownItem unit="Hour" label="Hours" />
        <CountdownItem unit="Minute" label="Minutes" />
        <CountdownItem unit="Second" label="Seconds" />
      </div>
    </section>
  );
}

function CountdownItem({ unit, label }: CountdownItemProps) {
  const { ref, time } = useTimer(unit);
  const display = unit === "Second" ? String(time).padStart(2, '0') : time;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 py-6 md:gap-2 md:py-8">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-3xl font-mono font-semibold dark:text-[#007bff] text-[#007bff] md:text-5xl lg:text-7xl transition-colors duration-500 bg-[#F7F7F7] rounded-xl"
        >
          {display}
        </span>
      </div>
      <span className="text-sm font-light dark:text-gray-400 text-gray-500 md:text-base lg:text-lg transition-colors duration-500">
        {label}
      </span>
      <div className="h-px w-full dark:bg-gray-700 bg-gray-300 mt-4 transition-colors duration-500"></div>
    </div>
  );
}

function useTimer(unit: TimeUnit) {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleCountdown();
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleCountdown = async () => {
    const end = new Date("2026-01-25T00:00:00");
    const now = new Date();
    const distance = end.getTime() - now.getTime();

    let newTime = 0;

    switch (unit) {
      case "Day":
        newTime = Math.max(0, Math.floor(distance / DAY));
        break;
      case "Hour":
        newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
        break;
      case "Minute":
        newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
        break;
      case "Second":
        newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));
        break;
    }

    if (newTime !== timeRef.current) {
      if (!ref.current) return;

      await animate(ref.current, { y: ["0%", "-50%"], opacity: [1, 0] }, { duration: 0.40 });

      timeRef.current = newTime;
      setTime(newTime);

      if (!ref.current) return;

      await animate(ref.current, { y: ["50%", "0%"], opacity: [0, 1] }, { duration: 0.40 });
    }
  };

  return { ref, time };
}

