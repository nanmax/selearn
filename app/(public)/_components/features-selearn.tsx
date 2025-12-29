import { FeatureShowcase, TabMedia } from "./feature-showcase";

export default function FeatureSelearn() {
  const tabs: TabMedia[] = [
    {
      value: "apparel",
      label: "Apparel",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/t-shirt-mockup.png",
      alt: "Apparel mockup",
    },
    {
      value: "screen",
      label: "Screen",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/screen-website-template.png",
      alt: "Website template on screen",
    },
    {
      value: "abstract",
      label: "Abstract",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/abstract-bg_11zon.jpg",
      alt: "Abstract background",
    },
  ];

  return (
    <FeatureShowcase
      title="Mulai dari Sini, Masuk ke Dunia Skill Masa Depan"
      description="Pelajari berbagai bidang IT, analitik data, desain, bisnis, dan banyak lagi melalui ribuan kursus yang bisa kamu akses kapan pun. Satu langkah kecil, dampaknya besar untuk perjalanan kariermu."
      stats={["Anytime", "Anywhere", "Pintu Masa Depan"]}
      steps={[
        {
          id: "step-1",
          title: "Pelajari Skill Paling Dibutuhkan",
          text: "Mulai dari desain grafis, analitik bisnis, coding, sampai skill-skill baru yang relevan untuk masa depanmu.",
        },
        {
          id: "step-2",
          title: "Raih Sertifikat Resmi & Kredibel",
          text: "Belajar langsung dari lembaga dan universitas ternama—sertifikatnya bisa kamu pakai untuk tingkatkan peluang kariermu.",
        },
        {
          id: "step-3",
          title: "Siapkan Diri untuk Karier Impian",
          text: "Bangun skill baru yang paling dicari perusahaan—mulai dari IT, analitik data, hingga teknologi masa depan.",
        },
        {
          id: "step-4",
          title: "Eksplorasi & Kuasai Banyak Bidang",
          text: "Akses ribuan kursus dari para ahli—belajar kapan saja, tingkatkan kemampuanmu tanpa batas.",
        },
      ]}
      tabs={tabs}
      defaultTab="screen"
      panelMinHeight={720}
    />
  );
}
