"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiscussionSchema, DiscussionSchemaType } from "../_schemas/discussion-schemas";
import { createDiscussion } from "../actions/actions";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { IconPlus } from "@tabler/icons-react";
import { XIcon } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

export function FormInputDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<DiscussionSchemaType>({
    resolver: zodResolver(DiscussionSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  const onSubmit = (values: DiscussionSchemaType) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("category", values.category);
        formData.append("content", values.content);

        await createDiscussion(formData);
        toast.success("Diskusi berhasil diposting!");
        setOpen(false);
        form.reset();
      } catch (err) {
        console.error(err);
        toast.error("Gagal membuat diskusi. Coba lagi.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105 shadow-md w-full md:w-auto text-center">
          <IconPlus className="size-4" /> Mulai Diskusi Baru
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Mulai Diskusi Baru</DialogTitle>
        </DialogHeader>
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Pertanyaan</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Bagaimana cara deploy aplikasi Node.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pilih Kategori Diskusi</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Umum">Umum</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Design Grafis">Design Grafis</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Akademik">Akademik</SelectItem>
                      <SelectItem value="Personal Development">Personal Development</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detail Pertanyaan</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ketik detail diskusi anda..." rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  <XIcon className="size-4" /> Batal
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Memposting..." : "Posting Diskusi"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
