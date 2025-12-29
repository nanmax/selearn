import Section from "./Section";

export default function KeamananAkun() {
  return (
    <Section id="keamanan-akun" title="Keamanan Akun">
      <p className="dark:text-white">
        Menjaga keamanan akun Anda adalah prioritas kami. Berikut adalah beberapa
        panduan untuk membantu Anda.
      </p>

      <h4 className="font-semibold mt-4 dark:text-white">
        Bagaimana cara mengatur ulang kata sandi?
      </h4>
      <p className="dark:text-white">Ada dua cara untuk mengatur ulang kata sandi Anda:</p>
      <ul className="list-disc list-inside space-y-1 mt-2 dark:text-white">
        <li>
          <strong>Jika Anda lupa kata sandi:</strong> Di halaman login, klik
          tautan “Lupa Kata Sandi”. Masukkan email Anda, kami akan mengirim
          instruksi untuk reset.
        </li>
        <li>
          <strong>Jika Anda masih bisa login:</strong> Buka halaman “Pengaturan
          Akun”, klik tab “Akun & Keamanan”.
        </li>
      </ul>
    </Section>
  );
}
