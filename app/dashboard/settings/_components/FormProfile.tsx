"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import { profileSchema, ProfileFormValues } from "../_schemas/profile-schema";
import { updateProfileAction } from "../actions";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AvatarUpload from "./avatar-upload";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function FormProfile({
  defaultValues,
}: {
  defaultValues: ProfileFormValues;
}) {
  const [profileData, setProfileData] = useState(defaultValues);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    defaultValues.image || null
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
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

  const onSubmit = async (values: ProfileFormValues) => {
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
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT SIDE — Profile Photo */}
        <div className="flex flex-col items-center justify-start space-y-4">
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

        {/* RIGHT SIDE — Form Fields */}
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Lengkap" {...field} />
                </FormControl>
                <FormMessage />
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
                    placeholder="Ceritakan sedikit tentang dirimu"
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

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Lahir</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date ? date.toISOString() : "")
                      }
                      disabled={(date) => date > new Date()}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting || uploading}
            className="w-full mt-3">
            {form.formState.isSubmitting || uploading
              ? "Menyimpan..."
              : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
