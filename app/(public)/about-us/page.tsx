import CallToActionAboutUs from "./_components/call-to-action-section";
import FeatureAboutUs from "./_components/feature-section";
import HeroSectionAboutUs from "./_components/hero-section";
import { HistoryAboutUs } from "./_components/history-section";

export default function AboutUs() {
  return (
    <div className="">
      <HeroSectionAboutUs />
      <HistoryAboutUs />
      <FeatureAboutUs />
      <CallToActionAboutUs />
    </div>
  );
}
