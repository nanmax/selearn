import Link from "next/link";
import Section from "./Section";

export default function LoginAccess() {
  return (
    <Section id="login-access" title="Login Akses">
      <h4 className="font-semibold mt-4 dark:text-white">
        Saya tidak bisa login ke akun saya.
      </h4>
      <p className="dark:text-white">
        Pastikan Anda memasukkan alamat email dan kata sandi yang benar.
        Perhatikan huruf besar dan kecil. Jika Anda masih tidak bisa masuk,
        gunakan fitur &quot;Lupa Kata Sandi&quot; di halaman login untuk
        mengatur ulang kata sandi Anda.
      </p>

      <h4 className="dark:text-white">
        Saya sudah membeli kursus, tapi tidak muncul di &quot;Kursus Saya&quot;.
      </h4>
      <p className="dark:text-white">
        Ini jarang terjadi, tetapi jika Anda mengalaminya, coba langkah berikut:
      </p>

      <ol className="list-decimal list-inside mt-2 space-y-1 dark:text-white">
        <li>
          Pastikan transaksi pembayaran Anda berhasil dengan memeriksa email
          konfirmasi dari Selearn atau riwayat transaksi di bank/dompet digital
          Anda.
        </li>
        <li>
          Coba keluar (logout) dari akun Anda, lalu masuk (login) kembali.
        </li>
        <li>
          Jika kursus masih belum muncul setelah 1 jam, silakan{" "}
          <Link href="" className="underline text-primary">
            hubungi tim dukungan kami
          </Link>{" "}
          dengan menyertakan bukti pembayaran Anda.
        </li>
      </ol>
    </Section>
  );
}
