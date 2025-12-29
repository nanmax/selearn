"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  KeyRound,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Shield,
  AlertCircle,
} from "lucide-react";

export default function SettingsChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        return {
          label: "Lemah",
          color: "bg-red-500",
          icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
        };
      case 2:
        return {
          label: "Sedang",
          color: "bg-yellow-500",
          icon: <Shield className="w-4 h-4 text-yellow-500" />,
        };
      case 3:
      case 4:
        return {
          label: "Kuat",
          color: "bg-green-500",
          icon: <ShieldCheck className="w-4 h-4 text-green-500" />,
        };
      default:
        return { label: "", color: "bg-gray-300", icon: null };
    }
  };

  const strength = getPasswordStrength(newPassword);
  const isMismatch =
    confirmPassword.length > 0 && confirmPassword !== newPassword;
  const isButtonDisabled =
    !newPassword || !confirmPassword || isMismatch || strength.label === "Lemah";

  return (
    <div id="keamanan-content" className="p-6">
      <div className="max-w-md space-y-8 mb-12">
        {/* Ubah Kata Sandi */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-3 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-blue-600" />
            Ubah Kata Sandi
          </h3>

          <div className="mt-6 space-y-5">
            {/* Password Lama */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Kata Sandi Saat Ini</Label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  id="currentPassword"
                  placeholder="Masukkan kata sandi lama Anda"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password Baru */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">Kata Sandi Baru</Label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Masukkan kata sandi baru"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Strength */}
              <AnimatePresence mode="wait">
                {newPassword && (
                  <motion.div
                    key={strength.label}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 mt-2 text-sm"
                  >
                    {strength.icon}
                    <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        className={`h-full ${strength.color}`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            strength.label === "Lemah"
                              ? 33
                              : strength.label === "Sedang"
                              ? 66
                              : 100
                          }%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-gray-700">{strength.label}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Konfirmasi Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Konfirmasi Kata Sandi Baru
              </Label>
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className={isMismatch ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Error jika tidak cocok */}
              <AnimatePresence>
                {isMismatch && (
                  <motion.p
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1 text-red-600 text-sm mt-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Kata sandi tidak cocok.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tombol Ubah Kata Sandi */}
          <div className="pt-4 flex justify-end">
            <motion.div whileHover={{ scale: isButtonDisabled ? 1 : 1.05 }}>
              <Button
                disabled={isButtonDisabled}
                className={`flex items-center gap-2 ${
                  isButtonDisabled
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-105 transition-transform"
                }`}
              >
                <KeyRound className="w-4 h-4" />
                Ubah Kata Sandi
              </Button>
            </motion.div>
          </div>
        </div>

        <Separator />

        {/* Zona Berbahaya */}
        <div>
          <h3 className="text-lg font-semibold text-red-600 border-b border-red-200 pb-3 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            Zona Berbahaya
          </h3>

          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-600">
              Menghapus akun instruktur bersifat permanen dan semua data kursus
              serta pendapatan Anda akan hilang. Tindakan ini tidak dapat
              diurungkan.
            </p>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="destructive"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Akun Saya
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
