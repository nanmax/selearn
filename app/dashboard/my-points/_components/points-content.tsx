"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Copy, Gift, Users, Coins, TrendingUp } from "lucide-react";

interface PointTransaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  createdAt: Date;
}

interface PointsContentProps {
  referralCode: string | null;
  points: number;
  transactions: PointTransaction[];
  totalReferrals: number;
}

export default function PointsContent({
  referralCode: initialReferralCode,
  points,
  transactions,
  totalReferrals,
}: PointsContentProps) {
  const [referralCode, setReferralCode] = useState(initialReferralCode);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReferralCode = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/referral/generate", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setReferralCode(data.referralCode);
        toast.success("Kode referral berhasil dibuat!");
      } else {
        toast.error(data.error || "Gagal membuat kode referral");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      toast.success("Kode referral berhasil disalin!");
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "REFERRAL_BONUS":
        return { label: "Bonus Referral", color: "bg-green-100 text-green-800" };
      case "COURSE_REDEMPTION":
        return { label: "Pembelian Kursus", color: "bg-red-100 text-red-800" };
      case "ADMIN_ADJUSTMENT":
        return { label: "Penyesuaian Admin", color: "bg-blue-100 text-blue-800" };
      case "WELCOME_BONUS":
        return { label: "Bonus Selamat Datang", color: "bg-purple-100 text-purple-800" };
      default:
        return { label: type, color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-primary mb-2">Poin & Referral</h2>
        <p className="text-gray-600">
          Kelola poin Anda dan bagikan kode referral untuk mendapatkan bonus.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl shadow-lg border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Poin</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {points.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Setara Rp {points.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Coins className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <Card className="rounded-2xl shadow-lg border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Referral</p>
                  <p className="text-3xl font-bold text-gray-900">{totalReferrals}</p>
                  <p className="text-xs text-gray-400 mt-1">Orang yang Anda referensikan</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          <Card className="rounded-2xl shadow-lg border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Bonus per Referral</p>
                  <p className="text-3xl font-bold text-gray-900">50.000</p>
                  <p className="text-xs text-gray-400 mt-1">Poin untuk setiap referral</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Referral Code Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}>
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Kode Referral Anda
            </CardTitle>
          </CardHeader>
          <CardContent>
            {referralCode ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-100 p-4 rounded-xl">
                    <p className="text-2xl font-mono font-bold text-center tracking-widest">
                      {referralCode}
                    </p>
                  </div>
                  <Button onClick={copyToClipboard} variant="outline" size="icon">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Bagikan kode ini kepada calon instruktur. Anda akan mendapatkan{" "}
                  <span className="font-semibold text-green-600">50.000 poin</span> setiap
                  kali ada instruktur baru yang mendaftar menggunakan kode Anda.
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">
                  Anda belum memiliki kode referral. Buat sekarang untuk mulai mendapatkan
                  bonus!
                </p>
                <Button onClick={generateReferralCode} disabled={isGenerating}>
                  {isGenerating ? "Membuat..." : "Buat Kode Referral"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}>
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>Riwayat Transaksi Poin</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead className="text-right">Poin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => {
                    const typeInfo = getTransactionTypeLabel(tx.type);
                    return (
                      <TableRow key={tx.id}>
                        <TableCell>
                          {new Date(tx.createdAt).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {tx.description}
                        </TableCell>
                        <TableCell
                          className={`text-right font-semibold ${
                            tx.amount > 0 ? "text-green-600" : "text-red-600"
                          }`}>
                          {tx.amount > 0 ? "+" : ""}
                          {tx.amount.toLocaleString("id-ID")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Belum ada transaksi poin.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}>
        <Card className="rounded-2xl shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle>Cara Kerja Sistem Referral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-semibold mb-2">Buat Kode Referral</h4>
                <p className="text-sm text-gray-600">
                  Generate kode referral unik Anda dengan satu klik.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h4 className="font-semibold mb-2">Bagikan Kode</h4>
                <p className="text-sm text-gray-600">
                  Bagikan kode kepada teman yang ingin menjadi instruktur.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <h4 className="font-semibold mb-2">Dapatkan Bonus</h4>
                <p className="text-sm text-gray-600">
                  Terima 50.000 poin setiap ada instruktur yang mendaftar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
