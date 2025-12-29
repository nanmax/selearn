import Section from "./Section";

export default function MetodePembayaran() {
  return (
    <Section id="metode-pembayaran" title="Metode Pembayaran">
      <h4 className="font-semibold mt-4 dark:text-white">
        Metode pembayaran apa saja yang diterima?
      </h4>
      <p className="dark:text-white">
        Kami menyediakan berbagai metode pembayaran untuk kemudahan Anda. Saat
        ini, kami menerima:
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
