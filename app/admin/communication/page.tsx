import React from "react";
import MainCommunication from "./_components/main-communication";

export default function CommunicationPage() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <h2 className="text-3xl font-bold text-primary mb-2">
        Pusat Komunikasi
      </h2>
      <p className="text-gray-600 mb-8">
        Berinteraksi dengan siswa Anda melalui Q&A, pesan, dan pengumuman.
      </p>
      <div className="rounded-2xl shadow-lg">
        <MainCommunication />
      </div>
    </main>
  );
}
