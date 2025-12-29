import React from "react";
import MinimalHero from "./_components/hero-minimalis";
import TeamSection from "./_components/team-components";
import CallToActionAboutUs from "../about-us/_components/call-to-action-section";

export default function OurTeamPage() {
  return (
    <div className="py-10">
      <MinimalHero />
      <TeamSection />
      <CallToActionAboutUs />
    </div>
  );
}
