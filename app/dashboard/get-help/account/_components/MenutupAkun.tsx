import Section from "./Section";

export default function MenutupAkun() {
  return (
    <Section id="menutup-akun" title="Menutup Akun">
      <p className="dark:text-white">
        Kami sedih melihat Anda pergi, namun Anda tetap bisa mengelola akun
        sesuai keinginan.
      </p>

      <h4 className="font-semibold mt-4 dark:text-white">Bagaimana cara menghapus akun saya?</h4>
      <p className="text-red-600 font-semibold">
        Peringatan: Menghapus akun adalah tindakan permanen dan tidak dapat
        diurungkan.
      </p>
      <p className="dark:text-white">
        Jika Anda yakin, buka “Pengaturan Akun” lalu klik tab “Akun & Keamanan”.
        Di bagian bawah ada “Zona Berbahaya” untuk menghapus akun Anda secara
        permanen.
      </p>
    </Section>
  );
}
