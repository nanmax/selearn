import React from "react";
import HeroCorporateTraining from "./_components/hero-corporate-training";
import { TrustedCompany } from "./_components/trusted-company";
import FeatureCardCorporateTraining from "./_components/feature-card-corporate-training";
import SkillsCorporate from "./_components/skills-card-corporate";
import ContactCorporateTraining from "./_components/contact-corporate-training";

export default function CorporateTrainingPage() {
  return (
    <>
      <HeroCorporateTraining />
      <TrustedCompany />
      <FeatureCardCorporateTraining />
      <SkillsCorporate />
      <ContactCorporateTraining />
    </>
  );
}
