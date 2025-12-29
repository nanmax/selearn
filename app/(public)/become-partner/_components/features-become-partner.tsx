"use client";

import { Eye, Users, Map } from "lucide-react";
import { motion, easeOut } from "framer-motion";

const features = [
  {
    title: "Tingkatkan Keterampilan Tim",
    description:
      "Berikan tim Anda akses ke ratusan kursus relevan untuk meningkatkan produktivitas dan inovasi perusahaan.",
    icon: Users,
  },
  {
    title: "Perkuat Citra Merek",
    description:
      "Tunjukkan komitmen Anda pada pengembangan talenta dan pendidikan dengan berasosiasi dengan platform pembelajaran terdepan.",
    icon: Eye,
  },
  {
    title: "Ciptakan Dampak Sosial",
    description:
      "Berkontribusi langsung dalam mencetak talenta digital Indonesia dan mendukung pertumbuhan ekonomi lokal.",
    icon: Map,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: easeOut,
    },
  }),
};

export default function FeatureBecomePartner() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Mengapa Bermitra dengan Selearn?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-gray-600 mb-12">
          Kami menawarkan lebih dari sekadar platform kami menawarkan kemitraan
          strategis untuk mencapai tujuan bersama.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
