"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/logo-selearn.svg";
import { easeOut, motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="relative flex h-screen w-screen overflow-hidden flex-col items-center justify-center px-4">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4 z-20",
        })}>
        <ArrowLeft className="size-4" /> Back
      </Link>

      <Link
        href="/"
        className="absolute top-10 flex items-center gap-2 text-2xl font-bold text-primary z-10">
        <Image src={Logo} alt="Logo" width={60} height={60} />
        Selearn.
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex w-full max-w-sm md:max-w-lg flex-col gap-6 sm:px-4">
        {children}

        <div className="text-balance text-center text-xs text-muted-foreground">
          Dengan mengklik lanjutkan, Anda menyetujui{" "}
          <span className="hover:text-primary hover:underline">
            Persyaratan layanan
          </span>{" "}
          dan{" "}
          <span className="hover:text-primary hover:underline">
            Kebijakan Privasi
          </span>
          .
        </div>
      </motion.div>
    </motion.div>
  );
}
