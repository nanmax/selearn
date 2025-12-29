/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import Link from "next/link";
import HeadbarSearch from "../[slug]/_components/headbar-search";
import { useConstructUrl } from "@/hooks/use-construct";

interface MyCertificateClientProps {
  certificates: {
    id: string;
    issuedAt: string;
    course: {
      id: string;
      title: string;
      slug: string;
      fileKey: string | null;
    };
  }[];
}

export default function MyCertificateClient({
  certificates,
}: MyCertificateClientProps) {
  const getThumbnail = useConstructUrl;
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-primary mb-2">
          Sertifikat Saya
        </h2>
        <p className="text-gray-600 mb-8">
          Semua pencapaian Anda ada di sini. Bagikan dan tunjukkan keahlian baru
          Anda kepada dunia!
        </p>
      </motion.div>

      {/* Filter/Search */}
      <HeadbarSearch />

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {certificates.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            Belum ada sertifikat yang diperoleh.
          </p>
        ) : (
          certificates.map((cert, i) => {
            // ✅ Use the function here
            const imageUrl = cert.course.fileKey
              ? getThumbnail(cert.course.fileKey)
              : `https://placehold.co/600x400?text=${encodeURIComponent(
                  cert.course.title
                )}`;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}>
                <Card className="overflow-hidden flex flex-col">
                  <div className="flex items-center justify-center">
                    <img
                      src={imageUrl ?? ""}
                      alt={cert.course.title}
                      className="w-full h-auto rounded-md shadow-md"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col grow">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {cert.course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Diberikan pada:{" "}
                      {new Date(cert.issuedAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <Button asChild className="flex-1">
                        <Link
                          href={`/dashboard/my-certificate/${cert.course.slug}/certificate/${cert.id}`}>
                          Download
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" title="Bagikan">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-400 mt-4 text-center">
                      ID: <span className="font-mono">{cert.id}</span> |{" "}
                      <Link
                        href={`/verify/${cert.id}`}
                        className="hover:text-blue-600 underline">
                        Verifikasi
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </main>
  );
}
