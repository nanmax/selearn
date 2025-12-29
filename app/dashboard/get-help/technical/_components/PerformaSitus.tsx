import Section from "./Section";

export default function PerformaSelearn() {
  return (
    <Section id="performa-selearn" title="Peforma Situs">
      <h4 className="font-semibold mt-4 dark:text-white">
        Mengapa situs Selearn terasa lambat?
      </h4>
      <p className="dark:text-white">
        Kami terus berupaya mengoptimalkan kecepatan platform. Namun, jika Anda
        merasa situs berjalan lambat, biasanya disebabkan oleh:
      </p>

      <ol className="list-dics list-inside mt-2 space-y-1 dark:text-white">
        <li>
          <strong>Koneksi Internet</strong>: Penyebab paling umum adalah koneksi
          internet yang tidak stabil di sisi Anda.
        </li>
        <li>
          <strong>Cache Browser</strong>: Cache yang menumpuk dapat memperlambat
          browser. Coba bersihkan secara berkala.
        </li>
        <li>
          <strong>Ekstensi Browser</strong>: Beberapa ekstensi (seperti
          ad-blocker) terkadang dapat mengganggu kinerja situs. Coba nonaktifkan
          sementara untuk melihat apakah ada perbedaan.
        </li>
      </ol>
    </Section>
  );
}
