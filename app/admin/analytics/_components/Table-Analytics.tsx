"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableAnalytics = () => {
  const courses = [
    {
      name: "UI/UX Design Essentials",
      revenue: "Rp 3.500.000",
      enroll: 75,
      rating: 4.9,
      completion: "82%",
    },
    {
      name: "Dasar Desain Grafis",
      revenue: "Rp 2.100.000",
      enroll: 42,
      rating: 4.8,
      completion: "75%",
    },
    {
      name: "Fotografi Smartphone",
      revenue: "Rp 1.900.000",
      enroll: 35,
      rating: 4.8,
      completion: "68%",
    },
  ];

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Kursus</TableHead>
          <TableHead>Pendapatan</TableHead>
          <TableHead>Pendaftaran</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Tingkat Penyelesaian</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course, i) => (
          <TableRow key={i}>
            <TableCell className="font-semibold">{course.name}</TableCell>
            <TableCell>{course.revenue}</TableCell>
            <TableCell>{course.enroll}</TableCell>
            <TableCell>{course.rating}</TableCell>
            <TableCell>{course.completion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAnalytics;
