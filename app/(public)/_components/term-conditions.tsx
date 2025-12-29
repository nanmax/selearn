"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";

function TermsConditions() {
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const content = contentRef.current;
    if (!content) return;

    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight);
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Terms & Conditions</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            Terms & Conditions of Selearn
          </DialogTitle>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p>
                        <strong>Pasal 1: Definisi</strong>
                      </p>
                      <ol className="list-decimal px-7">
                        <li>
                          Platform: Merujuk pada situs web, aplikasi, dan
                          layanan Selearn.
                        </li>
                        <li>
                          Instruktur: Individu atau entitas yang mendaftar dan
                          disetujui untuk membuat dan mempublikasikan Kursus di
                          Platform.
                        </li>
                        <li>
                          Kursus: Konten edukasi yang dibuat oleh Instruktur,
                          termasuk video, teks, kuis, tugas, dan materi
                          pendukung lainnya
                        </li>
                        <li>
                          Konten: Semua materi yang diunggah oleh Instruktur ke
                          Platform sebagai bagian dari Kursus.
                        </li>
                        <li>
                          Siswa: Pengguna yang terdaftar dan membeli atau
                          mendaftar pada sebuah Kursus.
                        </li>
                      </ol>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Pasal 2: Kewajiban Instruktur</strong>
                      </p>
                      <p>Sebagai Instruktur di Selearn, Anda setuju untuk:</p>
                      <ol className="list-decimal px-7">
                        <li>
                          Memberikan Informasi Akurat: Anda bertanggung jawab
                          untuk memberikan informasi pribadi dan profesional
                          yang akurat dan terkini saat pendaftaran dan selama
                          menjadi Instruktur.
                        </li>
                        <li>
                          Kualitas Konten: Anda berkomitmen untuk membuat dan
                          mengelola Kursus dengan standar kualitas yang tinggi,
                          baik dari segi materi, produksi video, maupun audio.
                        </li>
                        <li>
                          Kepemilikan Hak: Anda menyatakan dan menjamin bahwa
                          Anda memiliki atau memegang semua lisensi, hak, dan
                          izin yang diperlukan untuk semua Konten yang Anda
                          unggah. Anda tidak akan mengunggah Konten yang
                          melanggar hak cipta, merek dagang, atau hak kekayaan
                          intelektual pihak lain.
                        </li>
                        <li>
                          Interaksi Profesional: Anda akan berinteraksi dengan
                          Siswa secara profesional, sopan, dan
                          non-diskriminatif.
                        </li>
                        <li>
                          Keamanan Akun: Anda bertanggung jawab penuh untuk
                          menjaga kerahasiaan informasi login akun Anda dan atas
                          semua aktivitas yang terjadi di bawah akun Anda.
                        </li>
                      </ol>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>
                          Pasal 3: Lisensi dan Hak Kekayaan Intelektual
                        </strong>
                      </p>
                      <ol className="list-decimal px-7">
                        <li>
                          Kepemilikan Konten: Anda tetap menjadi pemilik tunggal
                          dari semua Konten yang Anda buat dan unggah ke
                          Platform. Selearn tidak mengklaim hak kepemilikan apa
                          pun atas Konten Anda.
                        </li>
                        <li>
                          Lisensi untuk Selearn: Dengan mempublikasikan Kursus
                          di Platform, Anda memberikan Selearn lisensi
                          non-eksklusif, bebas royalti, dan dapat
                          disublisensikan untuk menggunakan, mereproduksi,
                          mendistribusikan, menampilkan, mempromosikan, dan
                          memasarkan Kursus Anda di dalam dan melalui Platform.
                          Lisensi ini diperlukan agar kami dapat:{" "}
                          <ul className="list-disc list-inside pl-5">
                            <li>Menyediakan Kursus Anda kepada Siswa.</li>
                            <li>
                              Melakukan promosi dan pemasaran untuk meningkatkan
                              pendaftaran.
                            </li>
                            <li>
                              Meng-hosting dan melakukan streaming konten video
                              Anda.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Lisensi untuk Siswa: Anda memberikan Siswa yang
                          mendaftar di Kursus Anda lisensi terbatas,
                          non-eksklusif, dan tidak dapat dipindahtangankan untuk
                          mengakses dan melihat Konten Kursus Anda untuk tujuan
                          edukasi pribadi dan non-komersial.
                        </li>
                      </ol>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>
                          Pasal 4: Pembagian Pendapatan dan Pembayaran
                        </strong>
                      </p>
                      <ol className="list-decimal px-7">
                        <li>
                          Model Pembagian Pendapatan: Selearn beroperasi dengan
                          model pembagian pendapatan yang transparan. Untuk
                          setiap penjualan Kursus, pendapatan bersih akan dibagi
                          antara Instruktur dan Selearn. Model pembagian standar
                          adalah 70% untuk Instruktur dan 30% untuk Selearn.
                        </li>
                        <li>
                          Pendapatan Bersih: Didefinisikan sebagai jumlah yang
                          diterima Selearn dari Siswa, dikurangi:{" "}
                          <ul className="list-disc list-inside px-5">
                            <li>
                              Biaya transaksi pihak ketiga (misalnya, biaya
                              pemrosesan kartu kredit).
                            </li>
                            <li>Biaya administrasi atau pajak yang berlaku.</li>
                            <li>
                              Jumlah pengembalian dana (refund) yang diberikan
                              kepada Siswa.
                            </li>
                            <li>
                              Komisi afiliasi atau biaya promosi jika berlaku.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Jadwal Pembayaran: Pembayaran kepada Instruktur akan
                          dilakukan secara bulanan, dalam waktu 30 hari setelah
                          akhir bulan kalender (Net 30).
                        </li>
                        <li>
                          Metode Pembayaran: Pembayaran akan dikirim melalui
                          transfer bank ke rekening yang Anda daftarkan. Anda
                          bertanggung jawab untuk memastikan informasi rekening
                          bank Anda akurat.
                        </li>
                        <li>
                          Pajak: Anda bertanggung jawab penuh untuk melaporkan
                          dan membayar semua pajak penghasilan yang berlaku atas
                          pendapatan yang Anda terima dari Selearn sesuai dengan
                          peraturan perpajakan di yurisdiksi Anda.
                        </li>
                      </ol>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Pasal 5: Peninjauan dan Aturan Konten</strong>
                      </p>
                      <ol className="list-decimal px-7">
                        <li>
                          Standar Kualitas: Semua Kursus yang diajukan akan
                          ditinjau oleh tim Selearn untuk memastikan memenuhi
                          standar kualitas kami sebelum dipublikasikan.
                        </li>
                        <li>
                          Konten yang Dilarang: Anda dilarang keras mengunggah
                          Konten yang:
                          <ul className="list-disc pl-5">
                            <li>
                              Bersifat ilegal, cabul, memfitnah, atau mengancam.
                            </li>
                            <li>Menganjurkan kekerasan atau diskriminasi.</li>
                            <li>Berisi informasi palsu atau menyesatkan.</li>
                            <li>
                              Mengarahkan Siswa untuk melakukan transaksi di
                              luar Platform Selearn.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Hak untuk Menghapus: Selearn berhak, atas kebijakannya
                          sendiri, untuk menghapus atau menangguhkan Kursus atau
                          akun Instruktur yang melanggar ketentuan ini tanpa
                          pemberitahuan sebelumnya.
                        </li>
                      </ol>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Pasal 6: Hubungan Para Pihak</strong>
                      </p>
                      <p>
                        Anda dan Selearn adalah pihak yang independen.
                        Perjanjian ini tidak menciptakan hubungan kemitraan,
                        agensi, joint venture, atau kepegawaian antara Anda dan
                        Selearn. Anda adalah kontraktor independen dan tidak
                        memiliki wewenang untuk mengikat Selearn dalam kontrak
                        apa pun.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Pasal 7: Pengakhiran Perjanjian</strong>
                      </p>
                      <ol className="list-decimal px-7">
                        <li>
                          Oleh Instruktur: Anda dapat mengakhiri Perjanjian ini
                          kapan saja dengan memberikan pemberitahuan tertulis 30
                          hari sebelumnya. Atas permintaan Anda, kami akan
                          berhenti menjual Kursus Anda.
                        </li>
                        <li>
                          Oleh Selearn: Kami dapat mengakhiri Perjanjian ini
                          jika Anda melakukan pelanggaran material terhadap
                          syarat dan ketentuan ini.
                        </li>
                        <li>
                          Akses Siswa: Bahkan setelah pengakhiran, Siswa yang
                          telah mendaftar di Kursus Anda akan tetap memiliki
                          akses seumur hidup ke materi Kursus tersebut.
                        </li>
                      </ol>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>
                          Pasal 8: Batasan Tanggung Jawab dan Ganti Rugi
                        </strong>
                      </p>
                      <ol className="list-decimal px-7">
                        <li>
                          Batasan Tanggung Jawab: Selearn tidak bertanggung
                          jawab atas kerugian tidak langsung, insidental, atau
                          konsekuensial yang timbul dari partisipasi Anda
                          sebagai Instruktur.
                        </li>
                        <li>
                          Ganti Rugi (Indemnifikasi): Anda setuju untuk membela,
                          mengganti rugi, dan membebaskan Selearn dari segala
                          klaim, kerugian, atau tuntutan (termasuk biaya
                          pengacara yang wajar) yang timbul dari atau terkait
                          dengan Konten Anda atau pelanggaran Anda terhadap
                          Perjanjian ini.
                        </li>
                      </ol>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Pasal 9: Ketentuan Umum</strong>
                      </p>
                      <ol className="list-decimal px-7">
                        <li>
                          Perubahan Ketentuan: Selearn berhak untuk mengubah
                          Perjanjian ini dari waktu ke waktu. Kami akan
                          memberitahukan Anda tentang perubahan signifikan
                          melalui email atau notifikasi di Platform.
                        </li>
                        <li>
                          Hukum yang Mengatur: Perjanjian ini diatur oleh dan
                          ditafsirkan sesuai dengan hukum yang berlaku di
                          Republik Indonesia.
                        </li>
                        <li>
                          Penyelesaian Sengketa: Segala sengketa yang timbul
                          akan diselesaikan terlebih dahulu melalui musyawarah.
                          Jika tidak tercapai kesepakatan, sengketa akan
                          diselesaikan di Pengadilan Negeri Daerah bersangkutan.
                        </li>
                      </ol>
                    </div>

                    <div className="space-y-1">
                      <p>
                        Dengan melanjutkan proses pendaftaran sebagai
                        Instruktur, Anda mengonfirmasi bahwa Anda telah membaca,
                        memahami, dan menyetujui seluruh Syarat dan Ketentuan
                        Instruktur Selearn.
                      </p>
                      <p>
                        Terima kasih telah memilih untuk berbagi ilmu di
                        Selearn!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="border-t border-border px-6 py-4 sm:items-center">
          {!hasReadToBottom && (
            <span className="grow text-xs text-muted-foreground max-sm:text-center">
              Read all terms before accepting.
            </span>
          )}
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" disabled={!hasReadToBottom}>
              I agree
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { TermsConditions };
