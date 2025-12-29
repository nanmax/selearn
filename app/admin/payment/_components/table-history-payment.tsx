"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TableHistoryPaymentData from "./history-payment-table";

export default function TableHistoryPayment() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Riwayat Penarikan Dana
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4">
          <TableHistoryPaymentData />
        </CardContent>
      </Card>
    </motion.div>
  );
}
