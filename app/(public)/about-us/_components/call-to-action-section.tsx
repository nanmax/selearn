"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToActionAboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-5xl py-16 md:w-full mx-2 md:mx-auto flex flex-col items-center justify-center text-center bg-linear-to-b from-primary to-slate rounded-2xl p-10 text-white">
      {/* Top badge */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2, duration: 0.6 },
          },
        }}
        className="flex flex-wrap items-center justify-center p-1 rounded-full bg-purple-600/10 backdrop-blur border border-purple-500/40 text-sm">
        <div className="flex items-center">
          {[
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50",
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop",
          ].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`userImage${i + 1}`}
              className={`size-6 md:size-7 rounded-full border-3 border-white ${
                i > 0 ? `-translate-x-${i * 2}` : ""
              }`}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
        <motion.p
          className="-translate-x-2 font-medium"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}>
          Bergabunglah dengan kami yang beranggotakan 50+ Instruktur{" "}
        </motion.p>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl md:leading-[60px] font-semibold max-w-xl mt-5 bg-linear-to-r from-white to-black text-transparent bg-clip-text">
        Buka kunci masa depan Anda
      </motion.h1>

      {/* Button */}
      <Link href="/teach-on-selearn">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 text-white bg-primary hover:bg-[#007bff] transition-all rounded-full uppercase text-sm mt-8">
          Bergabunglah Menjadi Instruktur
        </motion.button>
      </Link>
    </motion.div>
  );
}
