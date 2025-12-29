import Section from "./Section";

export default function MengelolaProfil() {
  return (
    <Section id="mengelola-profil" title="Mengelola Profil">
      <p className="dark:text-white">
        Profil Anda adalah cara komunitas Selearn mengenal Anda. Pastikan
        informasi Anda selalu terbaru.
      </p>

      <h4 className="font-semibold mt-4 dark:text-white">
        Bagaimana cara mengubah nama dan foto profil?
      </h4>
      <p className="dark:text-white">
        Anda dapat dengan mudah mengubah nama dan foto profil Anda melalui
        halaman <strong>Pengaturan Akun</strong>.
      </p>

      <ol className="list-decimal list-inside mt-2 space-y-1 dark:text-white">
        <li>Klik avatar Anda di pojok kanan atas, lalu pilih “Pengaturan Akun”.</li>
        <li>
          Di tab “Profil”, Anda dapat mengunggah foto baru dan mengubah nama
          lengkap serta bio Anda.
        </li>
        <li>Setelah selesai, klik tombol “Simpan Perubahan”.</li>
      </ol>
    </Section>
  );
}
