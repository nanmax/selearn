"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";

const FormNotification = () => {
  const notifForm = useForm({
    defaultValues: {
      promo: true,
      komunitas: false,
      reminder: true,
      announcement: true,
    },
  });
  return (
    <Form {...notifForm}>
      <form
        onSubmit={notifForm.handleSubmit((data) =>
          console.log("Notifikasi:", data)
        )}
        className="max-w-lg space-y-8">
        <div>
          <h3 className="text-lg font-semibold border-b pb-3">
            Notifikasi Email
          </h3>
          <p className="text-sm text-gray-600 mt-4">
            Pilih notifikasi mana yang ingin Anda terima melalui email.
          </p>

          <div className="mt-6 space-y-5">
            <FormField
              control={notifForm.control}
              name="promo"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer items-start justify-center">
                    <span className="block font-medium text-gray-800">
                      Promosi & Penawaran
                    </span>
                    <span className="block text-sm text-gray-500">
                      Dapatkan info tentang diskon, kursus baru, dan penawaran
                      spesial.
                    </span>
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={notifForm.control}
              name="komunitas"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer items-start justify-center">
                    <span className="block font-medium text-gray-800">
                      Aktivitas Komunitas
                    </span>
                    <span className="block text-sm text-gray-500">
                      Dapatkan pemberitahuan saat ada balasan di forum.
                    </span>
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={notifForm.control}
              name="reminder"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer items-start justify-center">
                    <span className="block font-medium text-gray-800">
                      Pengingat Belajar
                    </span>
                    <span className="block text-sm text-gray-500">
                      Pengingat mingguan untuk progres belajar Anda.
                    </span>
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={notifForm.control}
              name="announcement"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer items-start justify-center">
                    <span className="block font-medium text-gray-800">
                      Pengumuman Penting
                    </span>
                    <span className="block text-sm text-gray-500">
                      Email tentang pembaruan layanan & keamanan. (Wajib)
                    </span>
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button type="submit">Simpan Preferensi</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormNotification;
