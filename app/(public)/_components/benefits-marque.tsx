/* eslint-disable @next/next/no-img-element */
"use client";

import { animate, motion, useMotionValue } from "motion/react";
import React, { CSSProperties, useEffect, useState } from "react";
import useMeasure from "react-use-measure";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === "horizontal" ? width : height;
    if (size === 0) return;

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const distanceToTravel = Math.abs(to - from);
    const duration = distanceToTravel / currentSpeed;

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return () => controls?.stop();
  }, [
    key,
    translation,
    currentSpeed,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export type BlurredInfiniteSliderProps = InfiniteSliderProps & {
  fadeWidth?: number;
  containerClassName?: string;
};

export function BlurredInfiniteSlider({
  children,
  fadeWidth = 80,
  containerClassName,
  ...sliderProps
}: BlurredInfiniteSliderProps) {
  const maskStyle: CSSProperties = {
    maskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
    WebkitMaskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
  };

  return (
    <div
      className={cn("relative w-full", containerClassName)}
      style={maskStyle}
    >
      <InfiniteSlider {...sliderProps}>{children}</InfiniteSlider>
    </div>
  );
}

const LOGOS = [
  {
    src: "../images/learn.png",
    alt: "Pelajari Keterampilan Penting",
    height: 90,
  },
  {
    src: "../images/certificate-course.png",
    alt: "Dapatkan Sertifikat dan Gelar",
    height: 90,
  },
  {
    src: "../images/skills.png",
    alt: "Siapkan Diri untuk Karier Berikutnya",
    height: 90,
  },
  {
    src: "../images/target.png",
    alt: "Kuasai Berbagai Bidang Keahlian",
    height: 90,
  },
  {
    src: "../images/thumb-like.png",
    alt: "Belajar Dimanapun & Kapanpun",
    height: 90,
  },
];

export default function BenefitsMarque() {
  return (
    <main className="py-5 w-full flex items-center justify-center bg-[#007bff] dark:bg-black text-black dark:text-white">
      <section className="bg-[#007bff] overflow-hidden w-full">
        <div className="m-auto max-w-7xl px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="shrink-0 text-center md:text-right md:max-w-44 md:border-r md:border-gray-200 dark:md:border-gray-800 md:pr-6">
              <p className="text-[16px] font-bold text-white dark:text-gray-400">
                Kuasi Skill Penting untuk Karier Masa Depan
              </p>
            </div>
            <div className="w-full py-1 md:w-auto md:flex-1">
              <BlurredInfiniteSlider
                speedOnHover={20}
                speed={40}
                gap={112}
                fadeWidth={80}
              >
                {LOGOS.map((logo) => (
                  <div key={logo.src} className="flex items-center gap-4 justify-center w-[320px]">
                    <img
                      className="mx-auto w-fit dark:invert"
                      src={logo.src}
                      alt={logo.alt}
                      style={{ height: `${logo.height}px` }}
                      width="auto"
                    />
                    <span className="text-white font-bold text-xl leading-tight whitespace-normal text-left max-w-[200px]">{logo.alt}</span>
                  </div>
                ))}
              </BlurredInfiniteSlider>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
