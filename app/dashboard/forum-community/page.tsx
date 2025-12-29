"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const discussions = {
  terbaru: [
    {
      avatar: "https://placehold.co/48x48/60a5fa/ffffff?text=AD",
      name: "Andi Darmawan",
      category: "Web Development",
      question: "Rekomendasi library JavaScript untuk pemula selain React?",
      replies: 12,
      views: 210,
      time: "5 jam lalu",
    },
    {
      avatar: "https://placehold.co/48x48/f472b6/ffffff?text=CS",
      name: "Citra Sari",
      category: "Desain",
      question: "Bagaimana cara terbaik membuat portofolio desain UI/UX?",
      replies: 8,
      views: 154,
      time: "1 hari lalu",
    },
  ],
  populer: [
    {
      avatar: "https://placehold.co/48x48/34d399/ffffff?text=RN",
      name: "Rian Nugraha",
      category: "Mobile Dev",
      question: "React Native vs Flutter, mana yang lebih baik di 2025?",
      replies: 30,
      views: 1200,
      time: "2 hari lalu",
    },
  ],
  belum: [
    {
      avatar: "https://placehold.co/48x48/facc15/000000?text=AL",
      name: "Alif Latif",
      category: "Data Science",
      question: "Cara belajar Machine Learning dari nol?",
      replies: 0,
      views: 45,
      time: "3 jam lalu",
    },
  ],
};

export default function ForumCommunity() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-primary mb-2">
        Forum Komunitas
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-8">
        Tempat untuk bertanya, berbagi, dan belajar bersama.
      </motion.p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Content */}
        <div className="w-full lg:w-3/4">
          <Tabs defaultValue="terbaru" className="w-full">
            {/* Search + Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:max-w-sm">
                <Input type="search" placeholder="Cari topik diskusi..." />
              </div>

              <TabsList>
                <TabsTrigger value="terbaru">Terbaru</TabsTrigger>
                <TabsTrigger value="populer">Populer</TabsTrigger>
                <TabsTrigger value="belum">Belum Terjawab</TabsTrigger>
              </TabsList>
            </div>

            {/* Tabs Content -> Discussion List */}
            {Object.entries(discussions).map(([key, list]) => (
              <TabsContent key={key} value={key}>
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="divide-y divide-slate-200 p-0">
                    {list.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 flex items-start space-x-4 hover:bg-slate-50 transition-colors">
                        <Avatar>
                          <AvatarImage src={item.avatar} alt={item.name} />
                          <AvatarFallback>
                            {item.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <a
                            href="#"
                            className="font-bold text-lg text-gray-900 hover:text-blue-600">
                            {item.question}
                          </a>
                          <p className="text-sm text-gray-500 mt-1">
                            Oleh{" "}
                            <span className="font-semibold text-gray-700">
                              {item.name}
                            </span>{" "}
                            •
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold ml-2 px-2 py-0.5 rounded-full">
                              {item.category}
                            </span>
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0 w-28 hidden sm:flex flex-col items-end">
                          <div className="flex gap-4">
                            <div className="text-center">
                              <p className="font-bold text-gray-800">
                                {item.replies}
                              </p>
                              <p className="text-xs text-gray-500">Balasan</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-gray-800">
                                {item.views}
                              </p>
                              <p className="text-xs text-gray-500">Dilihat</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">
                            Aktivitas: {item.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 space-y-8">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-md">
            + Mulai Diskusi Baru
          </Button>

          {/* Kategori */}
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    name: "Umum",
                    count: 12,
                    color: "bg-gray-100 text-gray-800",
                  },
                  {
                    name: "Web Development",
                    count: 45,
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    name: "Desain",
                    count: 23,
                    color: "bg-purple-100 text-purple-800",
                  },
                ].map((cat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}>
                    <Badge
                      variant="secondary"
                      className={`${cat.color} hover:opacity-80 cursor-pointer`}>
                      {cat.name} ({cat.count})
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Kontributor */}
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Top Kontributor</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  {
                    avatar: "https://placehold.co/40x40/60a5fa/ffffff?text=AD",
                    name: "Andi Darmawan",
                    contrib: "212 Kontribusi",
                  },
                  {
                    avatar: "https://placehold.co/40x40/f472b6/ffffff?text=CS",
                    name: "Citra Sari",
                    contrib: "189 Kontribusi",
                  },
                ].map((user, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * i }}
                    className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.contrib}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
