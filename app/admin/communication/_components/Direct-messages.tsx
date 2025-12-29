/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Send } from "lucide-react";

const DirectMessager = () => {
  const [activeChat, setActiveChat] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");

  const chats = [
    {
      id: 1,
      name: "Andi Darmawan",
      avatar: "https://placehold.co/48x48/60a5fa/ffffff?text=AD",
      online: true,
      messages: [
        {
          id: 1,
          from: "other",
          text: "Selamat pagi, Pak...",
          time: "10:25 AM",
          avatar: "https://placehold.co/40x40/60a5fa/ffffff?text=AD",
        },
        {
          id: 2,
          from: "me",
          text: "Tentu, Andi...",
          time: "10:28 AM",
          avatar: "https://placehold.co/40x40/f59e0b/ffffff?text=BS",
        },
        {
          id: 3,
          from: "other",
          text: "Baik, Pak. Terima kasih banyak!",
          time: "10:30 AM",
          avatar: "https://placehold.co/40x40/60a5fa/ffffff?text=AD",
        },
      ],
    },
    {
      id: 2,
      name: "Citra Sari",
      avatar: "https://placehold.co/48x48/f472b6/ffffff?text=CS",
      online: false,
      messages: [
        {
          id: 1,
          from: "other",
          text: "Permisi Pak, saya ingin bertanya soal tugas desain.",
          time: "09:15 AM",
          avatar: "https://placehold.co/40x40/f472b6/ffffff?text=CS",
        },
        {
          id: 2,
          from: "me",
          text: "Silakan, Citra. Ada yang bisa saya bantu?",
          time: "09:18 AM",
          avatar: "https://placehold.co/40x40/f59e0b/ffffff?text=BS",
        },
        {
          id: 3,
          from: "other",
          text: "Apakah boleh pakai software selain Canva?",
          time: "09:20 AM",
          avatar: "https://placehold.co/40x40/f472b6/ffffff?text=CS",
        },
      ],
    },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const active = chats.find((c) => c.id === activeChat);

  return (
    <motion.div
      className="h-[600px] flex bg-white rounded-xl shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      {/* Sidebar */}
      <motion.div
        className="w-full md:w-2/5 border-r border-slate-200 flex flex-col"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}>
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Cari siswa..."
              className="w-full pl-8 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-grow overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat, i) => (
              <motion.div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-4 flex items-center space-x-3 cursor-pointer transition ${
                  activeChat === chat.id
                    ? "bg-blue-50 border-r-4 border-blue-600"
                    : "hover:bg-slate-50"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}>
                <img
                  src={chat.avatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div className="flex-grow overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span
                      className={`text-xs flex-shrink-0 ${
                        chat.online ? "text-green-500" : "text-red-500"
                      }`}>
                      {chat.online ? "Online" : "Offline"}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate ${
                      activeChat === chat.id
                        ? "text-gray-600"
                        : "text-gray-500"
                    }`}>
                    {chat.messages[chat.messages.length - 1].text}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-400 text-sm">
              Tidak ada siswa ditemukan
            </p>
          )}
        </div>
      </motion.div>

      {/* Chat Content */}
      {active && (
        <motion.div
          key={active.id}
          className="w-full md:w-3/5 flex flex-col"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}>
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex-shrink-0 flex items-center space-x-3 bg-white">
            <motion.img
              src={active.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div>
              <h3 className="font-bold text-gray-900">{active.name}</h3>
              <p
                className={`text-xs ${
                  active.online ? "text-green-500" : "text-red-500"
                }`}>
                {active.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-grow p-6 overflow-y-auto bg-slate-50 space-y-4">
            {active.messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.from === "me" ? "justify-end" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}>
                {msg.from === "other" && (
                  <img
                    src={msg.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.from === "me"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-700 rounded-tl-none"
                  }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 text-right ${
                      msg.from === "me"
                        ? "text-blue-200"
                        : "text-gray-400"
                    }`}>
                    {msg.time}
                  </p>
                </div>
                {msg.from === "me" && (
                  <img
                    src={msg.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-slate-200 flex-shrink-0 bg-white">
            <div className="relative">
              <motion.input
                type="text"
                placeholder="Ketik balasan Anda..."
                className="w-full p-3 pr-24 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
              <motion.button
                className="absolute inset-y-0 right-2 flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 my-1.5 rounded-lg hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Send className="size-4" />
                Kirim
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DirectMessager;
