"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterInstructorSchema } from "../_schemas/register-instructor";

interface StepProfessionalInfoProps {
  formData: InstructorFormData;
  updateFormData: (field: keyof InstructorFormData, value: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function StepProfessionalInfo({
  formData,
  updateFormData,
}: StepProfessionalInfoProps) {
  const ProfessionalInfoSchema = RegisterInstructorSchema.pick({
    profession: true,
    industry: true,
    linkedinAccount: true,
  });

  const form = useForm<z.infer<typeof ProfessionalInfoSchema>>({
    resolver: zodResolver(ProfessionalInfoSchema),
    defaultValues: {
      profession: formData.profession,
      industry: formData.industry,
      linkedinAccount: formData.linkedinAccount,
    },
  });

  return (
    <>
      <CardHeader>
        <CardTitle>Keahlian & Pengalaman</CardTitle>
        <CardDescription>
          Ceritakan kepada kami pengalaman dan keahlian kamu.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <motion.div variants={fadeInUp} className="space-y-2">
                  <FormItem>
                    <FormLabel>Bidang Keahlian Utama</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Designer, Developer, Marketer"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateFormData("profession", e.target.value);
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
              name="industry"
              render={({ field }) => (
                <motion.div variants={fadeInUp} className="space-y-2">
                  <FormItem>
                    <FormLabel>Industri</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          updateFormData("industry", value);
                        }}
                        value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih industri" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />

            <FormField
              control={form.control}
              name="linkedinAccount"
              render={({ field }) => (
                <motion.div variants={fadeInUp} className="space-y-2">
                  <FormItem>
                    <FormLabel>Link LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/yourname"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateFormData("linkedinAccount", e.target.value);
                        }}
                      />
                    </FormControl>
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
