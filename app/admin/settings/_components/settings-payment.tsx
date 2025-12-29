/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Pencil, Save, Banknote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createCreditCard,
  updateCreditCard,
  getCreditCard,
  setActiveCreditCard,
} from "@/app/data/admin/admin-payment";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SettingsPayment() {
  const [isPending, startTransition] = useTransition();
  const [creditCard, setCreditCard] = useState<any[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMethod, setNewMethod] = useState({ nameCard: "", numberCard: "" });
  const [editMode, setEditMode] = useState(false);
  const [editMethod, setEditMethod] = useState({
    id: "",
    nameCard: "",
    numberCard: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function fetchCards() {
      const data = await getCreditCard();
      setCreditCard(data);
      const activeCard = data.find((c: any) => c.isActive);
      setSelectedMethod(activeCard?.id || null);
    }
    fetchCards();
  }, []);

  const handleSelect = (id: string) => {
    startTransition(async () => {
      try {
        await setActiveCreditCard(id);
        toast.success("Metode aktif diperbarui!");
        const data = await getCreditCard();
        setCreditCard(data);
        setSelectedMethod(id);
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };

  const handleAddNewMethod = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nameCard", newMethod.nameCard);
    formData.append("numberCard", newMethod.numberCard);

    startTransition(async () => {
      try {
        await createCreditCard(formData);
        toast.success("Metode pembayaran berhasil ditambahkan!");
        const data = await getCreditCard();
        setCreditCard(data);
        setShowAddForm(false);
        setNewMethod({ nameCard: "", numberCard: "" });
        router.refresh();
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };

  const handleUpdateMethod = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nameCard", editMethod.nameCard);
    formData.append("numberCard", editMethod.numberCard);

    startTransition(async () => {
      try {
        await updateCreditCard(formData, editMethod.id);
        toast.success("Metode pembayaran berhasil diperbarui!");
        const data = await getCreditCard();
        setCreditCard(data);
        setEditMode(false);
        router.refresh();
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };

  return (
    <div id="pembayaran-content" className="p-6">
      <div className="max-w-xl space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Metode Penarikan Dana
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Pilih metode pembayaran utama Anda. Pembayaran akan diproses setiap
            tanggal 5 setiap bulannya. Minimal penarikan adalah Rp 100.000.
          </p>
        </div>

        <Separator />

        {/* 🧾 List Cards */}
        {creditCard.length > 0 ? (
          <RadioGroup value={selectedMethod || ""} onValueChange={handleSelect}>
            {creditCard.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => handleSelect(card.id)}
                className={`cursor-pointer rounded-xl p-4 flex items-center justify-between border-2 transition-all ${
                  selectedMethod === card.id
                    ? "border-blue-600 bg-blue-50 shadow-sm"
                    : "border-slate-300 bg-white"
                }`}>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value={card.id} id={card.id} />
                  <img
                    src={`https://placehold.co/40x40/3b82f6/ffffff?text=${
                      card.nameCard?.[0]?.substring(0, 3) || "CC"
                    }`}
                    alt={card.nameCard?.[0] || "CreditCard"}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <div>
                    <Label
                      htmlFor={card.id}
                      className="font-semibold text-gray-800 cursor-pointer flex items-center gap-1">
                      <Banknote className="w-4 h-4 text-blue-600" />
                      {card.nameCard?.[0] || "Unknown Bank"}
                      {card.isActive && (
                        <span className="text-xs text-green-600 font-medium">
                          (Aktif)
                        </span>
                      )}
                    </Label>
                    <p className="text-sm text-gray-500">
                      **** **** **** {card.numberCard.slice(-4)}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditMode(true);
                    setEditMethod({
                      id: card.id,
                      nameCard: card.nameCard?.[0] || "",
                      numberCard: card.numberCard || "",
                    });
                  }}>
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
              </motion.div>
            ))}
          </RadioGroup>
        ) : (
          <p className="text-sm text-gray-500 italic">
            Belum ada metode pembayaran tersimpan.
          </p>
        )}

        {/* ➕ Tambah Metode Baru */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full border-dashed text-gray-600 font-semibold py-6 hover:bg-slate-50 hover:scale-[1.02] transition-transform"
            onClick={() => setShowAddForm(!showAddForm)}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Tambah Metode Baru
          </Button>

          <AnimatePresence>
            {showAddForm && (
              <motion.form
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleAddNewMethod}
                className="space-y-4 border rounded-xl p-4 bg-slate-50">
                <div>
                  <Label className="text-sm font-medium">
                    Nama Bank / Platform
                  </Label>
                  <Select
                    value={newMethod.nameCard}
                    onValueChange={(v) =>
                      setNewMethod((prev) => ({ ...prev, nameCard: v }))
                    }>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih Bank / Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="BRI">BRI</SelectItem>
                      <SelectItem value="MANDIRI">Mandiri</SelectItem>
                      <SelectItem value="GOPAY">GoPay</SelectItem>
                      <SelectItem value="OVO">OVO</SelectItem>
                      <SelectItem value="DANA">Dana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Nomor Rekening</Label>
                  <Input
                    placeholder="Masukkan nomor rekening atau akun"
                    value={newMethod.numberCard}
                    onChange={(e) =>
                      setNewMethod((prev) => ({
                        ...prev,
                        numberCard: e.target.value,
                      }))
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center gap-2"
                  disabled={isPending}>
                  <Save className="w-4 h-4" />
                  {isPending ? "Menyimpan..." : "Simpan Metode"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* ✏️ Edit Form */}
        {editMode && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleUpdateMethod}
            className="space-y-4 border rounded-xl p-4 bg-blue-50">
            <div>
              <Label className="text-sm font-medium">
                Nama Bank / Platform
              </Label>
              <Select
                value={editMethod.nameCard}
                onValueChange={(v) =>
                  setEditMethod((prev) => ({ ...prev, nameCard: v }))
                }>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih Bank / Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="BRI">BRI</SelectItem>
                  <SelectItem value="MANDIRI">Mandiri</SelectItem>
                  <SelectItem value="GOPAY">GoPay</SelectItem>
                  <SelectItem value="OVO">OVO</SelectItem>
                  <SelectItem value="DANA">Dana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Nomor Rekening</Label>
              <Input
                placeholder="Masukkan nomor rekening"
                value={editMethod.numberCard}
                onChange={(e) =>
                  setEditMethod((prev) => ({
                    ...prev,
                    numberCard: e.target.value,
                  }))
                }
                required
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                <Save className="w-4 h-4 mr-1" />
                {isPending ? "Menyimpan..." : "Perbarui"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditMode(false)}>
                Batal
              </Button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
