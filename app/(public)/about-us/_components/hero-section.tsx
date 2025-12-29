import React from "react";
import { HeroSection } from "./hero-sections-2";
import logo from "@/public/logo-selearn.svg";
import imageAboutUs from "@/public/images/image-about-us.png";

export default function HeroSectionAboutUs() {
  return (
    <div className="w-full">
      <HeroSection
        logo={{
          url: logo.src,
          alt: "Selearn",
          text: "Selearn",
        }}
        slogan="Platform Belajar Online-mu!"
        heading={
          <>
            Perjalanan Anda <br />
            <span className="text-primary">Mulai Dari Selearn</span>
          </>
        }
        subtitle="Selearn hadir untuk membawamu lebih dekat dengan ilmu dan keterampilan yang relevan di era digital. Belajar dari mentor ahli, akses materi kapan saja, dan kembangkan dirimu lewat pengalaman belajar yang praktis dan menyenangkan"
        callToAction={{
          text: "Bergabung Sekarang Menjadi Teacher Di Selearn",
          href: "/teach-on-selearn",
        }}
        backgroundImage={imageAboutUs.src}
        contactInfo={{
          website: "www.selearn.com",
          phone: "+62 851-8972-2630",
          address: "Cianjur, Jawa Barat",
        }}
      />
    </div>
  );
}
