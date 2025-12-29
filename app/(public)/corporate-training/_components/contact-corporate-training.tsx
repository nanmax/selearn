/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ContactCorporateTraining = () => {
  const form = useForm({
    defaultValues: {
      nama: "",
      email: "",
      perusahaan: "",
      jumlah_karyawan: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <section id="request-demo" className="py-16 md:pt-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Siap Meningkatkan Keterampilan Tim Anda?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Jadwalkan sesi demo gratis untuk melihat bagaimana Selearn dapat
            membantu mencapai tujuan bisnis Anda.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="max-w-2xl mx-auto bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Bisnis</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="nama@perusahaan.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="perusahaan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Perusahaan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama perusahaan"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jumlah_karyawan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Karyawan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jumlah" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-10">1-10</SelectItem>
                          <SelectItem value="11-50">11-50</SelectItem>
                          <SelectItem value="51-200">51-200</SelectItem>
                          <SelectItem value="201+">201+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                >
                  Kirim Permintaan Demo
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCorporateTraining;
