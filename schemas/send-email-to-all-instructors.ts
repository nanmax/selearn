import { z } from "zod";

export const sendEmailAllInstructorsSchema = z.object({
    subject: z.string().min(3, "Subject is required"),
    message: z.string().min(10, "Message is required"),
});

export type SendEmailAllInstructorsInput = z.infer<typeof sendEmailAllInstructorsSchema>;