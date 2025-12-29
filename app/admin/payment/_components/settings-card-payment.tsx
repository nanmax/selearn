/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import {
  getActiveCreditCard,
  inputCreditCardInstructor,
  getAllCreditCards,
  reorderCreditCards,
} from "../actions";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}
    />
  );
}

function SortableCard({ item }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 border bg-white rounded-lg shadow-sm flex items-center justify-between cursor-grab"
    >
      <div>
        <p className="font-semibold">{item.nameCard[0]}</p>
        <p className="text-sm text-gray-500">
          •••• •••• •••• {item.numberCard.slice(-4)}
        </p>
      </div>

      {item.isActive ? (
        <span className="text-xs text-green-600 font-medium">Active</span>
      ) : (
        <span className="text-xs text-gray-400">Inactive</span>
      )}
    </div>
  );
}

export default function SettingsCardPayment() {
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(false);

  const [selectedBank, setSelectedBank] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const [activeCard, setActiveCard] = useState<any>(null);
  const [allCards, setAllCards] = useState<any[]>([]);

  const [showFullNumber, setShowFullNumber] = useState(false);
  const [loading, setLoading] = useState(false);

  const banks = [
    "BCA",
    "BRI",
    "MANDIRI",
    "BSI",
    "DANA",
    "OVO",
    "GOPAY",
    "SHOPEEPAY",
  ];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const active = await getActiveCreditCard();
      const all = await getAllCreditCards();
      setActiveCard(active);
      setAllCards(all);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (openList) {
      const refresh = async () => {
        setAllCards(await getAllCreditCards());
      };
      refresh();
    }
  }, [openList]);

  const handleSave = async () => {
    if (!selectedBank || !cardNumber) {
      toast.error("Bank & nomor rekening wajib diisi.");
      return;
    }

    setLoading(true);
    const res = await inputCreditCardInstructor(selectedBank, cardNumber);
    setLoading(false);

    if (res.success) {
      toast.success("Rekening baru berhasil ditambahkan!");

      setActiveCard(await getActiveCreditCard());
      setAllCards(await getAllCreditCards());

      setOpen(false);
      setSelectedBank("");
      setCardNumber("");
    }
  };

  const maskNumber = (num: string) =>
    showFullNumber ? num : "**** **** **** " + num.slice(-4);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }: any) => {
    if (!over || active.id === over.id) return;

    const oldIndex = allCards.findIndex((i) => i.id === active.id);
    const newIndex = allCards.findIndex((i) => i.id === over.id);

    const reordered = arrayMove(allCards, oldIndex, newIndex);

    const fixed = reordered.map((card, i) => ({
      ...card,
      isActive: i === 0,
    }));

    setAllCards(fixed);
  };

  const handleSaveReorder = async () => {
    const ids = allCards.map((c) => c.id);
    await reorderCreditCards(ids);

    toast.success("Rekening berhasil diupdate!");

    setActiveCard(await getActiveCreditCard());
    setAllCards(await getAllCreditCards());

    setOpenList(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lg:col-span-1 space-y-8"
    >
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Pengaturan Pembayaran
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Pembayaran akan dikirimkan ke rekening aktif di bawah ini.
          </p>

          <Separator />

          {loading ? (
            <Skeleton className="w-full h-20" />
          ) : activeCard ? (
            <div className="bg-slate-50 border rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{activeCard.nameCard[0]}</p>
                <p className="text-sm text-gray-500">
                  {maskNumber(activeCard.numberCard)}
                </p>

                <button
                  className="text-xs text-blue-600 mt-1"
                  onClick={() => setShowFullNumber(!showFullNumber)}
                >
                  {showFullNumber ? "Sembunyikan nomor" : "Tampilkan nomor"}
                </button>
              </div>

              <Button variant="outline" onClick={() => setOpenList(true)}>
                Ganti
              </Button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Belum ada rekening aktif.
            </p>
          )}
        </CardContent>

        <CardFooter>
          <Button
            className="w-full flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="size-4" />
            Tambah Rekening
          </Button>
        </CardFooter>
      </Card>

      {/* ADD NEW ACCOUNT */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tambah Rekening Baru</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <p className="text-sm font-medium">Pilih Bank</p>
              <Select onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-sm font-medium">Nomor Rekening</p>
              <Input
                placeholder="Masukkan nomor"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave} disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* REORDER ACCOUNTS */}
      <AlertDialog open={openList} onOpenChange={setOpenList}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Atur Urutan Rekening</AlertDialogTitle>
          </AlertDialogHeader>

          <p className="text-sm text-gray-600 mb-3">
            Rekening paling atas akan menjadi <strong>aktif</strong>.
          </p>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={allCards.map((card) => card.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {allCards.map((item) => (
                  <SortableCard key={item.id} item={item} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveReorder}>
              Simpan Urutan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
