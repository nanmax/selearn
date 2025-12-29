"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowUp, Search } from "lucide-react";
import MengelolaProfil from "./_components/MengelolaProfil";
import KeamananAkun from "./_components/KeamananAkun";
import MenutupAkun from "./_components/MenutupAkun";

export default function SupportPageAccountUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const [query, setQuery] = useState("");

  const navItems = [
    { href: "#mengelola-profil", label: "Mengelola Profil" },
    { href: "#keamanan-akun", label: "Keamanan Akun" },
    { href: "#menutup-akun", label: "Menutup Akun" },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTopButton(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommand((prev) => !prev);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false);
  };

  const filteredNav = navItems.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative min-h-screen lg:flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-transparent w-72 fixed lg:sticky lg:top-0 h-screen z-30 border-r border-slate-200 transform transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:inset-0"
        )}>
        <div className="flex flex-col h-full">
          <div className="top-0 bg-transparent border-b border-slate-200 p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-600">
              Pusat Bantuan
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}>
              ✕
            </Button>
          </div>

          <ScrollArea className="flex-grow p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="px-2 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Akun & Profil
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCommand(true)}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-start transition-all text-sm",
                      activeSection === item.href
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-slate-100"
                    )}>
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </nav>
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-transparent">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
          <h1 className="text-base font-semibold">Panduan Akun</h1>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6 md:p-10">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Panduan Akun & Profil
          </h1>
          <p className="text-lg text-gray-600 dark:text-white mb-8">
            Temukan semua yang perlu Anda ketahui tentang pengelolaan akun,
            profil, dan keamanan Anda di Selearn.
          </p>

          <div className="max-w-4xl space-y-12">
            <MengelolaProfil />
            <Separator />
            <KeamananAkun />
            <Separator />
            <MenutupAkun />
          </div>

          <Card className="mt-16 max-w-4xl mx-auto text-center bg-slate-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tidak Menemukan Jawaban?
              </h3>
              <p className="max-w-xl mx-auto mb-6 text-gray-600">
                Tim dukungan kami siap membantu Anda. Kirimkan tiket bantuan dan
                kami akan segera merespons.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Hubungi Tim Dukungan
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Tombol Kembali ke Atas (animated) */}
      <AnimatePresence>
        {showTopButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50">
            <Button
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowUp className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette (with fade animation) */}
      <AnimatePresence>
        {showCommand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setShowCommand(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-md rounded-xl shadow-xl p-4"
              onClick={(e) => e.stopPropagation()}>
              <Input
                placeholder="Cari panduan akun..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mb-3"
              />
              <div className="max-h-64 overflow-y-auto space-y-1">
                {filteredNav.length > 0 ? (
                  filteredNav.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        scrollToSection(item.href);
                        setShowCommand(false);
                      }}>
                      {item.label}
                    </Button>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm px-2">
                    Tidak ada hasil ditemukan
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
