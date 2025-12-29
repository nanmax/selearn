"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns, HistoryPayment } from "./columns";

export default function TableHistoryPaymentData() {
  const [data, setData] = useState<HistoryPayment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res: HistoryPayment[] = await getData();
      setData(res);
    }
    fetchData();
  }, []);

  return <DataTable columns={columns} data={data} />;
}

async function getData(): Promise<HistoryPayment[]> {
  return [
    {
      id: "1",
      date: "5 Okt 2025",
      id_transaction: "PAY-XYZ123",
      amount: 8200000,
      status: "Pending",
    },
    {
      id: "2",
      date: "5 Sep 2025",
      id_transaction: "PAY-ABC456",
      amount: 6800000,
      status: "Selesai",
    },
    {
      id: "3",
      date: "5 Ags 2025",
      id_transaction: "PAY-DEF789",
      amount: 7100000,
      status: "Failed",
    },
  ];
}
