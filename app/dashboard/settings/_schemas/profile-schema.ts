import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email(),
  bio: z.string().optional(),
  website: z.string().url("URL tidak valid").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^(\+62|62|0)[0-9]{9,15}$/, "Nomor telepon tidak valid")
    .optional()
    .or(z.literal("")),
  birthDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Tanggal tidak valid",
    }),
  image: z.string().url().optional().or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Kata sandi saat ini wajib di-isi"),
    newPassword: z.string().min(6, "Kata sandi minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Konfirmasi kata sandi wajib di-isi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Kata sandi baru dan konfirmasi tidak cocok",
    path: ["confirmPassword"],
  });

export type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;
