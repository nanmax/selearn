"use client";

import React, { useState } from "react";
import CardStatsPayment from "./_components/card-stats-payment";
import ChartPayment from "./_components/chart-payment";
import SettingsCardPayment from "./_components/settings-card-payment";
import TableHistoryPayment from "./_components/table-history-payment";
import { Button } from "@/components/ui/button";
import WithdrawDialog from "./_components/withdraw-dialog";
import { CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentPage() {
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <h2 className="text-3xl font-bold text-primary mb-2">
        Laporan Pendapatan
      </h2>
      <p className="text-gray-600 mb-8">
        Kelola pembayaran dan lihat riwayat pendapatan Anda.
      </p>

      <CardStatsPayment />
      <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-4">
        <div className="lg:col-span-2">
          <ChartPayment />
        </div>
        <div className="lg:col-start-3 space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={async () => {
              setIsLoading(true);
              // simulasi delay sebelum buka dialog
              setTimeout(() => {
                setOpenWithdraw(true);
                setIsLoading(false);
              }, 500);
            }}
          >
            {isLoading ? (
              <Skeleton className="w-5 h-5" />
            ) : (
              <CreditCard className="w-5 h-5" />
            )}
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              "Tarik Pendapatan Kursus"
            )}
          </Button>

          <SettingsCardPayment />
        </div>
      </div>

      <TableHistoryPayment />
      <WithdrawDialog open={openWithdraw} setOpen={setOpenWithdraw} />
    </main>
  );
}
