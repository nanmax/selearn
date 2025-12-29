"use client";

import UniqueLoading from "@/components/general/morph-loading";
import Image from "next/image";
import logo from "@/public/logo-selearn.svg";

export default function LoadingPage() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-screen h-screen">
      <div className="flex gap-2 items-center justify-center">
        <Image src={logo} alt="Selearn" width={50} height={50} />
        <div className="flex flex-col gap-0">
          <span className="text-2xl font-semibold text-primary">Selearn</span>
          <p className="text-sm font-normal text-muted-foreground italic">Platform Belajar Online-mu!</p>
        </div>
      </div>
      <UniqueLoading variant="morph" size="lg" />
    </div>
  );
}
