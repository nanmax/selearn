import React from "react";
import HeroBecomePartner from "./_components/hero-become-partner";
import FeatureBecomePartner from "./_components/features-become-partner";
import { CardBecomePartner } from "./_components/card-become-partner";
import FormContactBecomePartner from "./_components/form-contact-become-partner";

export default function BecomeAPartnerPage() {
  return (
    <>
      <HeroBecomePartner />
      <FeatureBecomePartner />
      <CardBecomePartner />
      <FormContactBecomePartner />
    </>
  );
}
