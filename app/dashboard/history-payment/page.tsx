import React from "react";
import TableClient from "./_components/tableClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getHistoryPayment } from "@/app/data/payment/get-history-payment";

export default async function HistoryPayment() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const tableData = await getHistoryPayment(session.user.id)
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <TableClient data={tableData}  />
    </main>
  );
}
