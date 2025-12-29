"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { InstructorFormData } from "../page";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RegisterInstructorSchema } from "../_schemas/register-instructor";

interface StepPersonalInfoProps {
  formData: InstructorFormData;
  updateFormData: (field: keyof InstructorFormData, value: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function StepPersonalInfo({
  formData,
  updateFormData,
}: StepPersonalInfoProps) {
  const PersonalInfoSchema = RegisterInstructorSchema.pick({
    name: true,
    email: true,
    bio: true,
    referralCode: true,
  });

  const form = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      referralCode: formData.referralCode,
    },
  });

  return (
    <>
      <CardHeader>
        <CardTitle>Ceritakan kepada kami tentang diri Anda</CardTitle>
        <CardDescription>
          Mari kita mulai dengan beberapa informasi dasar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <motion.div variants={fadeInUp} className="space-y-2">
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateFormData("name", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <motion.div variants={fadeInUp} className="space-y-2">
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateFormData("email", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <motion.div variants={fadeInUp} className="space-y-2">
                  <FormItem>
                    <FormLabel>Bio Profesional</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsikan latar belakang profesional dan minat Anda."
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateFormData("bio", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />

            <FormField
              control={form.control}
              name="referralCode"
              render={({ field }) => (
                <motion.div variants={fadeInUp} className="space-y-2">
                  <FormItem>
                    <FormLabel>Kode Referral (Opsional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan kode referral jika ada"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateFormData("referralCode", e.target.value.toUpperCase());
                        }}
                        value={field.value?.toUpperCase() || ""}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Punya kode referral dari teman? Masukkan di sini untuk memberikan bonus poin kepada mereka.
                    </p>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </>
  );
}
