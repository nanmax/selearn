"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import HeadbarHistoryPayment from "./headbar-history-payment";

interface TableClientProps {
  data: {
    id: string;
    issuedAt: string;
    courseTitle: string;
    courseSlug: string;
    paymentMethod: string;
    total: number;
    invoiceUrl: string | null;
    status: "Berhasil" | "Gagal" | "Pending";
  }[];
}

const TableClient = ({ data }: TableClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  const filteredData = useMemo(() => {
    const now = new Date();
    return data.filter((item) => {
      const matchesSearch =
        item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());

      const issuedDate = new Date(item.issuedAt);
      let matchesMonth = true;

      if (monthFilter === "month") {
        matchesMonth =
          issuedDate.getMonth() === now.getMonth() &&
          issuedDate.getFullYear() === now.getFullYear();
      } else if (monthFilter === "3months") {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        matchesMonth = issuedDate >= threeMonthsAgo;
      } else if (monthFilter === "year") {
        matchesMonth = issuedDate.getFullYear() === now.getFullYear();
      }

      return matchesSearch && matchesMonth;
    });
  }, [data, searchQuery, monthFilter]);

  return (
    <>
      <HeadbarHistoryPayment
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        monthFilter={monthFilter}
        onMonthFilterChange={setMonthFilter}
      />
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto lg:overflow-x-visible">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Nama Kursus</TableHead>
                  <TableHead>Metode Pembayaran</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="hover:bg-slate-50">
                      <TableCell className="font-medium text-gray-900">
                        {new Date(item.issuedAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="font-mono text-gray-600">
                        {item.id}
                      </TableCell>
                      <TableCell className="font-semibold text-gray-800">
                        {item.courseTitle}
                      </TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell className="font-bold text-gray-900">
                        Rp {item.total.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`px-3 py-1 rounded-full ${
                            item.status === "Berhasil"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Gagal"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.status === "Berhasil" && item.invoiceUrl ? (
                          <a
                            href={item.invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer">
                            <Button
                              variant="link"
                              className="text-blue-600 p-0 h-auto">
                              Lihat Invoice
                            </Button>
                          </a>
                        ) : item.status === "Pending" && item.invoiceUrl ? (
                          <a
                            href={item.invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer">
                            <Button
                              variant="link"
                              className="text-yellow-600 p-0 h-auto">
                              Bayar Sekarang
                            </Button>
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500">
                      Tidak ada data yang cocok.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </motion.div>
    </>
  );
};

export default TableClient;
