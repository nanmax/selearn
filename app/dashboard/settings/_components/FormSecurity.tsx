/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import {
  updatePasswordSchema,
  UpdatePasswordValues,
} from "../_schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { tryCatch } from "@/hooks/try-catch";
import { deleteUserAction, updatePasswordAction } from "../actions";
import { toast } from "sonner";

interface FormSecurityProps {
  userEmail: string;
}

const FormSecurity = ({ userEmail }: FormSecurityProps) => {
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: UpdatePasswordValues) => {
    const { data, error } = await tryCatch(
      updatePasswordAction(values) as Promise<{
        success?: boolean;
        error?: any;
      }>
    );

    if (error || data?.error) {
      const msg =
        typeof data?.error === "string"
          ? data.error
          : "Gagal memperbarui kata sandi";
      toast.error(msg);
      return;
    }

    toast.success("Kata sandi berhasil diperbarui");
    form.reset();
  };

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus akun ini secara permanen?"))
      return;

    const { error } = await tryCatch(deleteUserAction());

    if (error) {
      toast.error("Gagal menghapus akun");
      return;
    }

    toast.success("Akun berhasil dihapus");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="max-w-md space-y-6">
          <h3 className="text-lg font-semibold border-b pb-3">Alamat Email</h3>
          <FormItem>
            <FormLabel>Email Saat Ini</FormLabel>
            <FormControl>
              <Input
                type="email"
                defaultValue={userEmail}
                disabled
              />
            </FormControl>
            <FormDescription>Email tidak dapat diubah.</FormDescription>
          </FormItem>
        </div>

        <div className="max-w-md space-y-6">
          <h3 className="text-lg font-semibold border-b pb-3">
            Ubah Kata Sandi
          </h3>

          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata Sandi Saat Ini</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata Sandi Baru</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2 flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Menyimpan..." : "Ubah Kata Sandi"}
            </Button>
          </div>
        </div>

        <div className="max-w-md">
          <h3 className="text-lg font-semibold text-red-600 border-b border-red-200 pb-3">
            Zona Berbahaya
          </h3>
          <p className="text-sm text-gray-600 my-4">
            Menghapus akun Anda bersifat permanen dan semua data akan hilang,
            termasuk progres belajar dan sertifikat. Tindakan ini tidak dapat
            diurungkan.
          </p>
          <Button variant="destructive" onClick={handleDelete}>
            Hapus Akun Saya
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSecurity;
