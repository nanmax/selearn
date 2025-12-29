import React from "react";

const AttentionTabs = () => {
  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        <a
          href="#"
          className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition">
          + Buat Pengumuman Baru
        </a>
      </div>
      <div className="divide-y divide-slate-200">
        <div className="py-4">
          <h3 className="font-bold text-gray-900">
            Update Materi & Jadwal Live Session Tambahan
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Dikirim ke{" "}
            <span className="font-semibold">UI/UX Design Essentials</span> • 3
            hari lalu
          </p>
          <p className="text-sm text-gray-700 mt-2 leading-relaxed">
            Halo semua, saya baru saja menambahkan modul baru tentang
            Prototyping di Framer. Selain itu, akan ada sesi live Q&A tambahan
            pada hari Jumat ini jam 7 malam. Sampai jumpa!
          </p>
        </div>
        <div className="py-4">
          <h3 className="font-bold text-gray-900">
            Selamat Datang Siswa Baru!
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Dikirim ke{" "}
            <span className="font-semibold">Dasar Desain Grafis</span> • 1
            minggu lalu
          </p>
          <p className="text-sm text-gray-700 mt-2 leading-relaxed">
            Selamat datang di kursus Dasar Desain Grafis! Jangan ragu untuk
            bertanya di kolom Q&A jika ada materi yang kurang jelas. Selamat
            belajar!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttentionTabs;
