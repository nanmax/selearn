"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

export default function FAQsComponent() {
  const faqItems = [
    {
      id: "item-1",
      question: "Berapa lama pengiriman biasanya?",
      answer:
        "Pengiriman reguler memakan waktu 3–5 hari kerja, tergantung lokasi Anda. Untuk kebutuhan lebih cepat, tersedia opsi ekspres 1–2 hari kerja saat checkout.",
    },
    {
      id: "item-2",
      question: "Metode pembayaran apa yang bisa digunakan?",
      answer:
        "Kami menerima kartu kredit/debit utama (Visa, Mastercard, Amex), transfer bank, e-wallet (OVO, GoPay, Dana), serta pembayaran melalui PayPal. Untuk perusahaan tersedia opsi pembayaran dengan invoice.",
    },
    {
      id: "item-3",
      question: "Bisakah saya mengubah atau membatalkan pesanan?",
      answer:
        "Anda bisa melakukan perubahan atau pembatalan maksimal 1 jam setelah pesanan dibuat. Jika lewat dari itu, silakan hubungi tim support kami untuk bantuan.",
    },
    {
      id: "item-4",
      question: "Apakah tersedia pengiriman internasional?",
      answer:
        "Ya, kami melayani pengiriman ke lebih dari 50 negara. Estimasi tiba 7–14 hari kerja, tergantung negara tujuan. Harap perhatikan kemungkinan biaya tambahan dari bea cukai setempat.",
    },
    {
      id: "item-5",
      question: "Bagaimana kebijakan retur produk?",
      answer:
        "Kami menyediakan kebijakan retur 30 hari untuk sebagian besar produk. Barang harus dalam kondisi asli dan belum digunakan. Beberapa produk khusus mungkin memiliki ketentuan berbeda, yang akan tertera di halaman produk.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <section className="py-16 md:py-24">
      <motion.div
        className="mx-auto max-w-5xl px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="mx-auto max-w-xl text-center"
          variants={itemVariants}
        >
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Cari jawaban cepat mengenai layanan, fitur, dan ketentuan platform
            kami.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 max-w-xl"
          variants={containerVariants}
        >
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <AccordionItem value={item.id} className="border-dashed">
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.p
            className="text-muted-foreground mt-6 px-8"
            variants={itemVariants}
          >
            Belum menemukan jawaban? Hubungi{" "}
            <Link
              href="#"
              className="text-primary font-medium hover:underline"
            >
              tim customer support kami
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
