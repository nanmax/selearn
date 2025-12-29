"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Clock, MoreHorizontal, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export type HistoryPayment = {
  id: string;
  date: string;
  id_transaction: string;
  amount: number;
  status: "Selesai" | "Pending" | "Failed";
};

export const columns: ColumnDef<HistoryPayment>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
  },
  {
    accessorKey: "id_transaction",
    header: "ID Transaksi",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Pendapatan</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as HistoryPayment["status"];

      const statusConfig = {
        Selesai: {
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle,
        },
        Pending: {
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: Clock,
        },
        Failed: {
          color: "bg-red-100 text-red-700 border-red-200",
          icon: XCircle,
        },
      }[status];

      const Icon = statusConfig.icon;

      return (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}>
          <Badge
            variant="outline"
            className={`${statusConfig.color} flex items-center gap-1 font-medium px-3 py-1 rounded-full`}>
            <Icon className="w-4 h-4" />
            {status}
          </Badge>
        </motion.div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Transaction</DropdownMenuItem>
            <DropdownMenuItem>Download Transaction</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
