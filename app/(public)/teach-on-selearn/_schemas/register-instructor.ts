import { z } from "zod";

export const RegisterInstructorSchema = z.object({
  // Step 1: Personal Info
  name: z.string().min(1, { message: "Nama wajib diisi" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  bio: z.string().min(10, { message: "Bio profesional minimal 10 karakter" }),

  // Step 2: Professional Info
  profession: z.string().min(1, { message: "Bidang keahlian wajib diisi" }),
  industry: z.string().min(1, { message: "Industri wajib dipilih" }),
  linkedinAccount: z
    .string()
    .url({ message: "Link LinkedIn tidak valid" })
    .min(1, { message: "Link LinkedIn wajib diisi" }),

  // Step 3: Validation Data
  numberKTP: z
    .string()
    .min(10, { message: "Nomor KTP tidak valid" })
    .max(20, { message: "Nomor KTP terlalu panjang" }),
  ktpImageUrl: z.string().url().optional(),

  // Referral Code (optional)
  referralCode: z.string().optional(),
});

export type RegisterInstructorType = z.infer<typeof RegisterInstructorSchema>;
