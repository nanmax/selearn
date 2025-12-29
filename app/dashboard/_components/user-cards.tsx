"use client";

import {
  IconBook,
  IconBooks,
  IconCertificate2,
  IconClockHour3,
} from "@tabler/icons-react";
import {
  motion,
  easeOut,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface UserStats {
  enrolledCount: number;
  completedCount: number;
  certificateCount: number;
  totalDuration: number;
}

interface UserCardsStudentProps {
  stats: UserStats;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: easeOut },
  }),
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

function CountUp({ to }: { to: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.floor(latest).toString()
  );

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.5, ease: easeOut });
    return controls.stop;
  }, [to, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function UserCardsStudent({ stats }: UserCardsStudentProps) {
  const data = [
    {
      id: 1,
      title: "Kursus Terdaftar",
      value: stats.enrolledCount,
      icon: <IconBook className="size-6" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Sertifikat Diraih",
      value: stats.certificateCount,
      icon: <IconCertificate2 className="size-6" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      id: 3,
      title: "Kursus Selesai",
      value: stats.completedCount,
      icon: <IconBooks className="size-6" />,
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-600",
    },
    {
      id: 4,
      title: "Total Jam Belajar",
      value: stats.totalDuration,
      icon: <IconClockHour3 className="size-6" />,
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      {data.map((stat, i) => (
        <motion.div
          key={stat.id}
          custom={i}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={cardVariants}>
          <Card className="rounded-2xl shadow-md cursor-pointer transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <div
                className={`${stat.bgColor} ${stat.textColor} rounded-lg p-3`}>
                {stat.icon}
              </div>
              <div>
                <CardTitle className="text-gray-500 text-[12px] lg:text-sm font-normal">
                  {stat.title}
                </CardTitle>
                <p className="text-2xl font-bold text-gray-900">
                  <CountUp to={stat.value} />
                </p>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
