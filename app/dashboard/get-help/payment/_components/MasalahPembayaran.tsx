import Section from "./Section";

export default function MasalahPembayaran() {
  return (
    <Section id="masalah-pembayaran" title="Masalah Pembayaran">
      <h4 className="font-semibold mt-4 dark:text-white">
        Mengapa pembayaran saya gagal?
      </h4>
      <p className="dark:text-white">
        Ada beberapa alasan umum mengapa pembayaran bisa gagal:
      </p>

      <h4 className="font-semibold mt-4 dark:text-white">
        Bagaimana cara meminta pengembalian dana?
      </h4>
      <p className="dark:text-white">
        Anda dapat mengajukan permintaan pengembalian dana melalui halaman
        &quot;Riwayat Pembelian&quot; di dasbor Anda. Temukan transaksi kursus
        yang ingin Anda kembalikan dan klik opsi &quot;Minta Pengembalian
        Dana&quot;.
      </p>

      <h4 className="font-semibold mt-4 dark:text-white">
        Berapa lama proses pengembalian dana?
      </h4>
      <p className="dark:text-white">
        Setelah permintaan Anda disetujui, dana akan dikembalikan ke metode
        pembayaran asli Anda. Proses ini biasanya memakan waktu 5 hingga 10 hari
        kerja, tergantung pada bank atau penyedia layanan pembayaran Anda.
      </p>
    </Section>
  );
}
