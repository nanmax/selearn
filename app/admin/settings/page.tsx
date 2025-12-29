import React from "react";
import CardSettingsAccount from "./_components/Card-Settings-Account";

export default function SettingsPageAdmin() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <h2 className="text-3xl font-bold text-primary mb-2">Pengaturan Akun</h2>
      <CardSettingsAccount />
    </main>
  );
}
