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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactAcademicPartners = () => {
  const form = useForm({
    defaultValues: {
      institusi: "",
      kontak: "",
      jabatan: "",
      email: "",
      pesan: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <section
      id="request-demo"
      className="py-16 md:py-24 bg-white dark:bg-slate-900"
    >
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
            Siap Berkolaborasi dengan Kami?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Isi formulir berikut untuk mendiskusikan model kemitraan akademik
            yang paling sesuai dengan institusi Anda.
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
              {/* Nama Institusi + Nama Kontak */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="institusi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Institusi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama institusi"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kontak"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Kontak</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama kontak"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Jabatan + Email Institusi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="jabatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jabatan</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan jabatan" {...field} />
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
                      <FormLabel>Email Institusi</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="nama@institusi.ac.id"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Pesan (Opsional) */}
              <FormField
                control={form.control}
                name="pesan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pesan (Opsional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tuliskan pesan tambahan atau kebutuhan khusus Anda..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Button */}
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
                  Kirim Permintaan
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactAcademicPartners;
