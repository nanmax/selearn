"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import FormProfile from "./_components/FormProfile";
import FormSecurity from "./_components/FormSecurity";
import FormNotification from "./_components/FormNotification";
import { ProfileFormValues } from "./_schemas/profile-schema";
import { tryCatch } from "@/hooks/try-catch";
import { getProfile } from "./actions";

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProfileFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await tryCatch(getProfile());
      if (!error && data) setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Memuat data profil...</p>;
  }

  if (!profile) {
    return <p className="p-6 text-red-500">Gagal memuat profil pengguna</p>;
  }
  
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <motion.h2
        className="text-3xl font-bold text-primary mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>
        Pengaturan Akun
      </motion.h2>

      <Card className="rounded-2xl shadow-lg">
        <CardContent>
          <Tabs defaultValue="profil" className="w-full">
            <TabsList className="flex w-full justify-start gap-4 border-b border-slate-200 rounded-none bg-transparent p-0">
              <TabsTrigger value="profil" className="px-1 py-4 text-sm">
                Profil
              </TabsTrigger>
              <TabsTrigger value="keamanan" className="px-1 py-4 text-sm">
                Akun & Keamanan
              </TabsTrigger>
              <TabsTrigger value="notifikasi" className="px-1 py-4 text-sm">
                Notifikasi
              </TabsTrigger>
            </TabsList>

            {/* Profil */}
            <TabsContent value="profil" className="p-6">
              <FormProfile defaultValues={profile} />
            </TabsContent>

            {/* Keamanan */}
            <TabsContent value="keamanan" className="p-6">
              <FormSecurity userEmail={profile.email} />
            </TabsContent>

            {/* Notifikasi */}
            <TabsContent value="notifikasi" className="p-6">
              <FormNotification />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
