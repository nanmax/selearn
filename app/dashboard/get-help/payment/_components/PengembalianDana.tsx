import Section from "./Section";

export default function PengembalianDana() {
  return (
    <Section id="pengembalian-dana" title="Pengembalian Dana (Refunds)">
      <h4 className="font-semibold mt-4 dark:text-white">
        Apa kebijakan pengembalian dana di Selearn?
      </h4>
      <p className="dark:text-white">
        Kami menawarkan <strong>jaminan uang kembali dalam 14 hari</strong>.
        Jika Anda tidak puas dengan kursus yang Anda beli, Anda dapat meminta
        pengembalian dana penuh dalam waktu 14 hari sejak tanggal pembelian,
        dengan syarat Anda belum menyelesaikan sebagian besar dari kursus
        tersebut.
      </p>

      <ol className="list-disc list-inside mt-2 space-y-1 dark:text-white">
        <li>
          <strong>Transfer Bank</strong>: Termasuk Virtual Account untuk
          bank-bank besar di Indonesia (BCA, Mandiri, BNI, dll.).
        </li>
        <li>
          <strong>Kartu Kredit/Debit</strong>: Kami menerima kartu berlogo Visa
          dan Mastercard.
        </li>
        <li>
          <strong>Dompet Digital (E-wallet)</strong>: Anda bisa membayar
          menggunakan GoPay, OVO, dan Dana.
        </li>
      </ol>
      <h4 className="font-semibold mt-4 dark:text-white">
        Apakah informasi pembayaran saya aman?
      </h4>
      <p className="dark:text-white">
        <strong>Sangat aman</strong>. Kami tidak menyimpan informasi sensitif
        seperti nomor kartu kredit Anda di server kami. Semua transaksi diproses
        melalui mitra gerbang pembayaran (payment gateway) terkemuka yang telah
        bersertifikasi <strong>PCI DSS Level 1</strong>, standar keamanan
        tertinggi di industri pembayaran.
      </p>
    </Section>
  );
}
