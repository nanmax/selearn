"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterInstructorSchema } from "../_schemas/register-instructor";
import { ImageUploadKTP } from "../../_components/upload-ktp";
import { TermsConditions } from "../../_components/term-conditions";
import type { InstructorFormData } from "../page";

interface StepValidationDataProps {
  formData: InstructorFormData;
  updateFormData: (field: keyof InstructorFormData, value: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ValidationSchema = RegisterInstructorSchema.pick({
  numberKTP: true,
}).extend({
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui syarat dan ketentuan",
  }),
  ktpImageUrl: z.string().optional(),
});

export default function StepValidationData({
  formData,
  updateFormData,
}: StepValidationDataProps) {
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      numberKTP: formData.numberKTP,
      ktpImageUrl: formData.ktpImageUrl || "",
      agreeToTerms: false,
    },
  });

  return (
    <>
      <CardHeader>
        <CardTitle>Validasi Data</CardTitle>
        <CardDescription>Verifikasi data calon teacher Selearn</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="numberKTP"
              render={({ field }) => (
                <motion.div variants={fadeInUp} className="space-y-2">
                  <FormItem>
                    <FormLabel>Nomor KTP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nomor KTP"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateFormData("numberKTP", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />

            <motion.div variants={fadeInUp} className="space-y-2">
              <FormItem>
                <FormLabel>Unggah Foto KTP</FormLabel>
                <ImageUploadKTP
                  onUpload={(url) => updateFormData("ktpImageUrl", url)}
                />
              </FormItem>
            </motion.div>

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-2">
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={!!field.value}
                        onCheckedChange={(checked: boolean | "indeterminate") =>
                          field.onChange(checked === true)
                        }
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Saya setuju dengan <TermsConditions />
                    </FormLabel>
                  </FormItem>
                  <FormMessage />
                </motion.div>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </>
  );
}
