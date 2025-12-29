"use client";

export default function PrintButton() {
  return (
    <div className="mt-10 text-center">
      <button
        onClick={() => window.print()}
        className="bg-primary text-white font-semibold py-3 px-10 rounded-lg transition-all shadow-md hover:bg-primary/90"
      >
        Cetak Sertifikat
      </button>
    </div>
  );
}
