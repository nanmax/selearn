import Section from "./Section";

export default function VideoAudio() {
  return (
    <Section id="video-audio" title="Video & Audio">
      <p className="dark:text-white">
        Masalah dengan pemutaran video adalah salah satu kendala paling umum.
        Berikut beberapa langkah yang bisa Anda coba.
      </p>
      <h4 className="font-semibold mt-4 dark:text-white">
        Video tidak bisa diputar, apa yang harus saya lakukan?
      </h4>
      <p className="dark:text-white">
        Jika pemutar video menampilkan layar hitam atau terus berputar
        (loading), coba langkah-langkah berikut secara berurutan:
      </p>

      <ol className="list-decimal list-inside mt-2 space-y-1 dark:text-white">
        <li>
          <strong>Segarkan (Refresh) Halaman</strong>: Coba segarkan halaman
          browser Anda (tekan F5 atau Ctrl+R/Cmd+R).
        </li>
        <li>
          <strong>Periksa Koneksi Internet</strong>: Pastikan Anda memiliki
          koneksi internet yang stabil. Video streaming membutuhkan koneksi yang
          baik.
        </li>
        <li>
          <strong>Hapus Cache & Cookie</strong>: Terkadang data lama di browser
          dapat menyebabkan masalah. Coba hapus cache dan cookie browser Anda,
          lalu login kembali
        </li>
        <li>
          <strong>Gunakan Browser Lain</strong>: Coba akses kursus menggunakan
          browser yang berbeda (misalnya, jika Anda menggunakan Chrome, coba
          Firefox) untuk melihat apakah masalahnya spesifik pada browser.
        </li>
      </ol>
      <h4 className="font-semibold mt-4 dark:text-white">
        Tidak ada suara di video.
      </h4>
      <p className="dark:text-white">
        Jika video dapat diputar tetapi tidak ada suaranya, pastikan:
      </p>
      <ol className="list-decimal list-inside mt-2 space-y-1 dark:text-white">
        <li>Volume pada pemutar video tidak dalam keadaan bisu (mute).</li>
        <li>Volume di komputer atau perangkat Anda sudah dinaikkan.</li>
        <li>
          Tab browser Anda tidak dalam keadaan bisu (biasanya ditandai dengan
          ikon speaker yang dicoret di tab).
        </li>
      </ol>
      <h4 className="font-semibold mt-4 dark:text-white">
        Kualitas video buram atau pecah-pecah.
      </h4>
      <p className="dark:text-whhite">
        Pemutar video kami secara otomatis menyesuaikan kualitas video
        berdasarkan kecepatan internet Anda. Jika video terlihat buram,
        kemungkinan koneksi Anda sedang lambat. Anda dapat mencoba mengubah
        kualitas secara manual dengan mengklik ikon gerigi (pengaturan) pada
        pemutar video dan memilih resolusi yang lebih tinggi seperti 720p atau
        1080p.
      </p>
    </Section>
  );
}
