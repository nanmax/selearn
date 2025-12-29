"use client";

// import HeroSection from "./coming-soon/page";

import BenefitsMarque from "./_components/benefits-marque";
import CategoriesCourse from "./_components/categories-course";
import { HeroScrollDemo } from "./_components/container-scroll";
import CarouselCourse from "./_components/course-carousel";
import { CallToAction } from "./_components/cta";
import FeatureSelearn from "./_components/features-selearn";
// import Features from "./_components/features";
import HeroSection from "./_components/HeroSection";
// import { LogoCarouselCompany } from "./_components/LogoCarouselCompany";
// import RecommendFeatures from "./_components/RecommendFeatures";
import { TestimonialsStudents } from "./_components/testimonials";

export default function Home() {
  return (
    <>
      <section className="relative">
        {/* <HeroSection /> */}
        <HeroSection />
        <BenefitsMarque />
        <HeroScrollDemo />
        <CategoriesCourse />
        <FeatureSelearn />
        <CarouselCourse />
        {/* <LogoCarouselCompany />
        <Features />
        <RecommendFeatures /> */}
        <TestimonialsStudents />
        <CallToAction
          title="Mulai Belajar, Wujudkan Masa Depanmu"
          description="Selearn hadir untuk mendukung perjalanan belajarmu. Dari persiapan sekolah, kuliah, hingga karier, semua bisa kamu kuasai dengan mentor berpengalaman dan materi yang relevan."
          buttonText="Mulai Belajar"
          buttonUrl="https://shadcnblocks.com"
          items={[
            "Pengajar Ahli & Berpengalaman",
            "Materi Praktis & Interaktif",
            "Fleksibel & Terjangkau",
            "Dukungan Komunitas",
            "Sertifikat Resmi",
          ]}
        />
      </section>
    </>
  );
}
