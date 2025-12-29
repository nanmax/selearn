"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function SidebarSupport({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <aside
      className={cn(
        "bg-white w-72 fixed inset-y-0 left-0 z-30 border-r border-slate-200 transform transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:inset-0"
      )}
    >
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-grow p-4">
          <div>
            <p className="px-2 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Akun & Profil
            </p>
            <nav className="space-y-1">
              {[
                { href: "#mengelola-profil", label: "Mengelola Profil" },
                { href: "#keamanan-akun", label: "Keamanan Akun" },
                { href: "#menutup-akun", label: "Menutup Akun" },
              ].map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                  className="w-full justify-start text-gray-700 hover:bg-slate-100"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
