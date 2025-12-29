import { z } from "zod";

export const profileSchemaInstructor = z.object({
  fullName: z.string().min(3, "Nama minimal 3 karakter"),
  roleInstructor: z.string().min(3, "Role profesional minimal 3 karakter"),
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

export type ProfileInstructorFormValues = z.infer<
  typeof profileSchemaInstructor
>;
