import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "Pengajar Ahli & Berpengalaman",
  "Materi Praktis & Interaktif",
  "Fleksibel & Terjangkau",
  "Dukungan Komunitas",
  "Sertifikat Resmi",
];

export const CallToAction = ({
  title = "Mulai Belajar, Wujudkan Masa Depanmu",
  description = "Selearn hadir untuk mendukung perjalanan belajarmu. Dari persiapan sekolah, kuliah, hingga karier, semua bisa kamu kuasai dengan mentor berpengalaman dan materi yang relevan.",
  buttonText = "Mulai Belajar",
  buttonUrl = "https://shadcnblocks.com",
  items = defaultItems,
}: Cta4Props) => {
  return (
    <section className="py-20 lg:px-8">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="max-w-7xl">
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-primary/25 px-6 py-10 md:flex-row lg:px-20 lg:py-16 lg:mx-10">
              <div className="md:w-1/2">
                <h4 className="mb-1 text-2xl font-bold md:text-3xl">{title}</h4>
                <p className="text-muted-foreground">{description}</p>
                <Button className="mt-6" asChild>
                  <a href={buttonUrl} target="_blank">
                    {buttonText} <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-2 text-sm font-semibold">
                  {items.map((item, idx) => (
                    <li className="flex items-center text-primary text-lg" key={idx}>
                      <Check className="mr-4 size-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
