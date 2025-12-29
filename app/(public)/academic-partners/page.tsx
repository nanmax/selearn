import React from "react";
import HeroAcademicPartners from "./_components/hero-academic-partners";
import { TrustedUniv } from "./_components/trusted-univ";
import FeatureCardAcademicPartners from "./_components/feature-academic-partners";
import ModelAcademicPartners from "./_components/model-academics-partners";
import ContactAcademicPartners from "./_components/contact-academic-partners";

export default function AcademicPartnerPage() {
  return (
    <>
      <HeroAcademicPartners />
      <TrustedUniv />
      <FeatureCardAcademicPartners />
      <ModelAcademicPartners />
      <ContactAcademicPartners />
    </>
  );
}
