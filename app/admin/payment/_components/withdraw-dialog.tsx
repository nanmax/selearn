/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestWithdraw } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Send, X } from "lucide-react";

export default function WithdrawDialog({ open, setOpen }: any) {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formatRupiah = (value: string) => {
    const numberString = value.replace(/\D/g, "");
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setAmount(rawValue);
  };

  async function handleWithdraw() {
    const numericAmount = parseInt(amount || "0", 10);

    if (!numericAmount || numericAmount <= 0) {
      toast.error("Nominal tidak valid");
      return;
    }

    setLoading(true);
    try {
      const res = await requestWithdraw(numericAmount);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Request Penarikan Terkirim!");
      setOpen(false);
      setAmount("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tarik Pendapatan</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Nominal Penarikan Rupiah
            </label>
            <span className="text-gray-400 italic text-[10px]">
              Note: Tidak memakai titik atau flat
            </span>
          </div>
          <Input
            type="text"
            placeholder="Masukkan nominal"
            value={formatRupiah(amount)}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
            Batal
          </Button>
          <Button onClick={handleWithdraw}>
            {loading && (
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
            )}
            <Send className="w-5 h-5" />
            {loading ? "Menyimpan..." : "Ajukan"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
