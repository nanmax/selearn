/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl text-muted-foreground font-semibold dark:text-white">
              Dari Pemula Hingga Mahir <br />
              <span className="text-4xl text-primary md:text-[5rem] font-bold leading-none">
                Semua Bisa di Selearn
              </span>
            </h1>
          </>
        }>
        <img
          src={`../images/selearn-course.png`}
          alt="hero"
          height={633}
          width={1349}
          className="mx-auto w-[1349px] rounded-2xl object-fill h-full object-top-left"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}