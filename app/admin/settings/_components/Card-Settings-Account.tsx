"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import SettingsAccount from "./settings-account";
import SettingsPayment from "./settings-payment";
import SettingsChangePassword from "./settings-change-password";
import SettingsNotification from "./settings-notification";
import { ProfileInstructorFormValues } from "../_schemas/profile-schemas-instructor";
import { tryCatch } from "@/hooks/try-catch";
import { getProfile } from "@/app/data/admin/update-user-admin";

const CardSettingsAccount = () => {
  const [profile, setProfile] = useState<ProfileInstructorFormValues | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const { data, error } = await tryCatch(getProfile());
    if (!error && data) setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Memuat data profil...</p>;
  }

  if (!profile) {
    return <p className="p-6 text-red-500">Gagal memuat profil pengguna</p>;
  }
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="profile">
          <TabsList className="lg:w-full w-fit grid-cols-2 lg:grid-cols-4 grid mb-3">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="settings-payment">
              Pengaturan Pembayaran
            </TabsTrigger>
            <TabsTrigger value="account-security">
              Akun & Pengamanan
            </TabsTrigger>
            <TabsTrigger value="notification">Notifikasi</TabsTrigger>
          </TabsList>
          <Separator className="mt-2" />
          <TabsContent value="profile">
            <SettingsAccount
              defaultValues={profile}
              onProfileUpdated={fetchProfile}
            />
          </TabsContent>
          <TabsContent value="settings-payment">
            <SettingsPayment />
          </TabsContent>
          <TabsContent value="account-security">
            <SettingsChangePassword />
          </TabsContent>
          <TabsContent value="notification">
            <SettingsNotification />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CardSettingsAccount;
