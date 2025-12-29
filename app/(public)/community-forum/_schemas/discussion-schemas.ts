import { z } from "zod";

export const DiscussionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Judul harus minimal 5 karakter." })
    .max(150, { message: "Judul maksimal 150 karakter." }),
  category: z.string().min(1, { message: "Kategori wajib dipilih." }),
  content: z
    .string()
    .min(10, { message: "Detail pertanyaan harus minimal 10 karakter." })
    .max(10000, { message: "Konten maksimal 10.000 karakter." }),
});

export type DiscussionSchemaType = z.infer<typeof DiscussionSchema>;
