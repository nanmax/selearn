"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ProfileInstructorFormValues,
  profileSchemaInstructor,
} from "../_schemas/profile-schemas-instructor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { updateProfileAction } from "@/app/data/admin/update-user-admin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AvatarUpload from "@/app/dashboard/settings/_components/avatar-upload";

export default function SettingsAccount({
  defaultValues,
  onProfileUpdated,
}: {
  defaultValues: ProfileInstructorFormValues;
  onProfileUpdated: () => void;
}) {
  const [profileData, setProfileData] = useState(defaultValues);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    defaultValues?.image ?? null
  );

  const form = useForm<ProfileInstructorFormValues>({
    resolver: zodResolver(profileSchemaInstructor),
    defaultValues: profileData,
  });

  const handleAvatarChange = async (file: File | null) => {
    if (!file || uploading) return;
    setUploading(true);

    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const { data, error } = await tryCatch(
      fetch("/api/upload", {
        method: "POST",
        body: uploadForm,
      }).then((res) => res.json())
    );

    setUploading(false);

    if (error || !data?.url) {
      toast.error("Gagal mengupload foto profil");
      return;
    }

    form.setValue("image", data.url);
    setPreview(data.url);

    setProfileData((prev) => ({ ...prev, image: data.url }));

    toast.success("Foto profil berhasil diupload");
  };

  const onSubmit = async (values: ProfileInstructorFormValues) => {
    const formattedValues = {
      ...values,
      birthDate: values.birthDate ? new Date(values.birthDate) : null,
    };

    const { error } = await tryCatch(updateProfileAction(formattedValues));

    if (error) {
      toast.error("Gagal memperbarui profil");
      return;
    }

    setProfileData({ ...formattedValues, birthDate: values.birthDate || "" });
    toast.success("Profil berhasil diperbarui");

    onProfileUpdated?.();
  };
  return (
    <div id="profil-content" className="p-6 space-y-10">
      {/* Foto Profil */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Foto Profil
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Perbarui foto Anda agar sesuai dengan profil profesional Anda.
              </p>
            </div>

            <div className="md:col-span-2 flex items-center gap-6">
              <AvatarUpload
                defaultAvatar={preview ?? undefined}
                onFileChange={(file) => {
                  if (file && "file" in file && file.file instanceof File) {
                    handleAvatarChange(file.file);
                  }
                }}
              />
              {uploading && (
                <p className="text-sm text-gray-500 mt-2">Mengunggah...</p>
              )}
            </div>
          </section>

          <Separator />

          {/* Informasi Dasar */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Informasi Dasar
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Perbarui nama, jabatan, dan bio Anda di bawah ini.
              </p>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input {...field} className="mt-2" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roleInstructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Profesional</FormLabel>
                      <FormControl>
                        <Input {...field} className="mt-2" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ceritakan tentang keahlian dan pengalaman mengajar Anda..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://contoh.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input placeholder="+6281234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || uploading}
                  className="w-full mt-3">
                  {form.formState.isSubmitting || uploading
                    ? "Menyimpan..."
                    : "Simpan Perubahan"}
                </Button>
              </div>
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
}
