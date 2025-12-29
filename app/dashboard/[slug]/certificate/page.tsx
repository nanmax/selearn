import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Logo from "@/public/logo-selearn.svg";
import Background from "@/public/bg-certificate.png";
import PrintButton from "./_components/PrintButton";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await requireUser();

  const course = await prisma.course.findUnique({
    where: { slug },
    select: { title: true },
  });

  // Generate certificate info
  const certificateId = `S-${Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase()}`;
  const date = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 font-serif bg-slate-50 relative overflow-hidden">
      {/* Sertifikat */}
      <div
        id="certificate"
        className="w-full max-w-6xl aspect-[1120/792] bg-white rounded-2xl shadow-2xl border border-slate-200 flex overflow-hidden relative">
        {/* Bagian kiri dengan background image */}
        <div className="w-2/3 relative p-14 flex flex-col justify-between text-slate-800">
          <Image
            src={Background}
            alt="Certificate Background"
            fill
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/95 via-white/90 to-transparent" />

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="Selearn Logo" width={55} height={55} />
              <h1 className="text-3xl font-semibold text-primary tracking-wide">
                Selearn
              </h1>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
              Sertifikat Penyelesaian
            </h2>
          </div>

          {/* Konten utama */}
          <div className="relative z-10 mt-6">
            <p className="text-base text-slate-600 italic">
              Dengan ini menyatakan bahwa
            </p>
            <p className="text-5xl font-extrabold text-primary my-5 uppercase tracking-wider leading-tight">
              {user.name}
            </p>
            <p className="text-base text-slate-600">
              telah berhasil menyelesaikan kursus
            </p>
            <p className="text-2xl font-semibold text-slate-800 mt-3 leading-snug">
              {course?.title ?? "Kursus"}
            </p>

            {/* Detail kecil */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="bg-white/70 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                ID Sertifikat: {certificateId}
              </div>
              <div className="bg-white/70 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                Tanggal: {date}
              </div>
            </div>
          </div>

          {/* Tanda tangan */}
          <div className="relative z-10 flex justify-between items-center mt-10">
            <div className="text-center">
              <p className="font-[GreatVibes] text-3xl text-slate-800">
                Budi Santoso
              </p>
              <div className="w-40 h-px bg-slate-400 mx-auto mt-1"></div>
              <p className="text-sm font-semibold text-slate-700 mt-2">
                Budi Santoso
              </p>
              <p className="text-sm text-slate-500">Instruktur</p>
            </div>

            <div className="text-center">
              <p className="font-[GreatVibes] text-3xl text-slate-800">
                Yopi Septian Gumelar
              </p>
              <div className="w-40 h-px bg-slate-400 mx-auto mt-1"></div>
              <p className="text-sm font-semibold text-slate-700 mt-2">
                Yopi Septian Gumelar
              </p>
              <p className="text-sm text-slate-500">CEO, Selearn</p>
            </div>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="w-1/3 bg-gradient-to-b from-primary to-primary p-8 flex flex-col justify-between items-center text-white relative">
          {/* Badge verifikasi */}
          <div className="text-center mt-6">
            <div className="mx-auto w-32 h-32 rounded-full border-4 border-yellow-400 bg-white flex flex-col items-center justify-center p-3 shadow-lg">
              <svg
                className="w-10 h-10 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-xs font-bold text-yellow-600 uppercase mt-2">
                Terverifikasi Resmi
              </p>
              <p className="text-[10px] font-semibold text-yellow-700">2025</p>
            </div>
          </div>

          {/* QR Code / Icon */}
          <div className="text-center flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-white p-3 rounded-lg flex items-center justify-center shadow-lg">
              <svg
                className="w-full h-full text-slate-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <path d="M128,88v80m-40-80v80m-24-64h16m-16-16h16m-16,32h16m56-32h16m-16-16h16m-16,32h16m-72,32h48M64,64V48a8,8,0,0,1,8-8H88m80-8h16a8,8,0,0,1,8,8V88m8,80h-16a8,8,0,0,1-8-8V176m-80,8H72a8,8,0,0,1-8-8V160M176,176h16v16m-32,0h16m-16-32h16m-16,16h16m-32-16h16m-16-16h16m-32,0h16M48,48H32V32m32,0H48m0,32H48m16,16H48m16-32H48" />
              </svg>
            </div>
            <p className="text-xs mt-3 text-blue-200">
              Verifikasi keaslian sertifikat dengan memindai kode ini.
            </p>
          </div>

          <p className="text-xs text-blue-300 text-center">
            Sertifikat ini dapat digunakan untuk memvalidasi penyelesaian
            kursus.
          </p>
        </div>
      </div>

      {/* Tombol cetak */}
      <PrintButton />
    </div>
  );
}
