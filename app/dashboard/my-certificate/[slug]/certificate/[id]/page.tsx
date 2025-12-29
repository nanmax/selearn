import Image from "next/image";
import Logo from "@/public/logo-selearn.svg";
import Background from "@/public/bg-certificate.png";
import { getCertificateData } from "@/app/data/user/get-my-course-certificate";
import DownloadCertificate from "../../_components/DownloadCertificate";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { id } = await params;
  const data = await getCertificateData(id);

  const { userName, courseTitle, courseCreator, certificateId, issuedAt } =
    data;

  const date = new Date(issuedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const certificateUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/my-certificate/${courseTitle}/certificate/${certificateId}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    certificateUrl
  )}&size=150x150`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 font-serif relative overflow-hidden">
      {/* Sertifikat */}
      <div
        id="certificate"
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Bagian kiri */}
        <div className="relative w-full lg:w-2/3 p-6 sm:p-10 lg:p-14 flex flex-col justify-between text-slate-800">
          <Image
            src={Background}
            alt="Certificate Background"
            fill
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-white/95 via-white/90 to-transparent" />

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="Selearn Logo" width={45} height={45} />
              <h1 className="text-2xl sm:text-3xl font-semibold text-primary tracking-wide">
                Selearn
              </h1>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
              Sertifikat Penyelesaian
            </h2>
          </div>

          {/* Konten utama */}
          <div className="relative z-10 mt-6">
            <p className="text-sm sm:text-base text-slate-600 italic">
              Dengan ini menyatakan bahwa
            </p>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary my-5 uppercase tracking-wider leading-tight wrap-break-word">
              {userName}
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              telah berhasil menyelesaikan kursus
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800 mt-3 leading-snug">
              {courseTitle}
            </p>

            {/* Detail kecil */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="bg-white/70 border border-slate-200 text-slate-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-full shadow-sm">
                ID Sertifikat: {certificateId}
              </div>
              <div className="bg-white/70 border border-slate-200 text-slate-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-full shadow-sm">
                Tanggal: {date}
              </div>
            </div>
          </div>

          {/* Tanda tangan */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center mt-10 gap-6">
            <div className="text-center">
              <p className="font-[GreatVibes] text-2xl sm:text-3xl text-slate-800">
                {courseCreator}
              </p>
              <div className="w-32 sm:w-40 h-px bg-slate-400 mx-auto mt-1"></div>
              <p className="text-xs sm:text-sm text-slate-500">Instruktur</p>
            </div>

            <div className="text-center">
              <p className="font-[GreatVibes] text-2xl sm:text-3xl text-slate-800">
                Yopi Septian Gumelar
              </p>
              <div className="w-32 sm:w-40 h-px bg-slate-400 mx-auto mt-1"></div>
              <p className="text-xs sm:text-sm text-slate-500">CEO, Selearn</p>
            </div>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="w-full lg:w-1/3 bg-linear-to-b from-[#007BFF] to-[#0056B3] p-6 sm:p-8 flex flex-col justify-between items-center text-white relative">
          <div className="text-center mt-4 sm:mt-6">
            <div className="mx-auto w-28 sm:w-32 h-28 sm:h-32 rounded-full border-4 border-yellow-400 bg-white flex flex-col items-center justify-center p-3 shadow-lg">
              <svg
                className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-[10px] sm:text-xs font-bold text-yellow-600 uppercase mt-2">
                Terverifikasi Resmi
              </p>
              <p className="text-[9px] sm:text-[10px] font-semibold text-yellow-700">
                2025
              </p>
            </div>
          </div>

          <div className="text-center flex flex-col items-center justify-center">
            <div className="w-28 sm:w-32 h-28 sm:h-32 bg-white p-3 rounded-lg flex items-center justify-center shadow-lg">
              <Image
                src={qrCodeUrl}
                alt="QR Code Sertifikat"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <p className="text-[10px] sm:text-xs mt-3 text-blue-200">
              Verifikasi keaslian sertifikat dengan memindai kode ini.
            </p>
          </div>

          <p className="text-[10px] sm:text-xs text-blue-300 text-center mt-4">
            Sertifikat ini dapat digunakan untuk memvalidasi penyelesaian
            kursus.
          </p>
        </div>
      </div>
      <DownloadCertificate />
    </div>
  );
}
