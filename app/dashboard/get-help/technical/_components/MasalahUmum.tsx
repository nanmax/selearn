import Section from "./Section";

export default function MasalahUmum() {
  return (
    <Section id="masalah-umum" title="Masalah Umum Lainnya">
      <h4 className="font-semibold mt-4 dark:text-white">
        Tombol atau elemen di halaman tidak bisa diklik.
      </h4>
      <p className="dark:text-white">
        Jika Anda menemukan tombol atau tautan yang tidak merespons saat diklik,
        langkah pertama yang paling efektif adalah menyegarkan halaman browser
        Anda. Jika masih tidak berhasil, coba bersihkan cache browser atau
        gunakan browser yang berbeda.
      </p>
    </Section>
  );
}
