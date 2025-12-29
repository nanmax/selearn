/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { RegisterInstructorSchema } from "./_schemas/register-instructor";
import StepPersonalInfo from "./_components/StepPersonalInfo";
import StepProfessionalInfo from "./_components/StepProfessionalInfo";
import StepValidationData from "./_components/StepValidationData";
import StepNavigation from "./_components/StepNavigation";
import { ProgressSteps } from "./_components/StepProgress";
import { z } from "zod";
import { registerInstructorAction } from "./_actions/actions";
import { useRouter } from "next/navigation";

const steps = [
  { id: "personal", title: "Informasi Pribadi" },
  { id: "professional", title: "Keahlian & Pengalaman" },
  { id: "validationData", title: "Validation Data" },
];

export interface InstructorFormData {
  name: string;
  email: string;
  company: string;
  profession: string;
  linkedinAccount: string;
  numberKTP: string;
  experience: string;
  industry: string;
  primaryGoal: string;
  bio: string;
  contentTypes: string[];
  colorPreference: string;
  stylePreference: string;
  inspirations: string;
  budget: string;
  timeline: string;
  features: string[];
  additionalInfo: string;
  ktpImageUrl: string;
  referralCode: string;
}

const OnboardingForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InstructorFormData>({
    name: "",
    email: "",
    company: "",
    profession: "",
    linkedinAccount: "",
    numberKTP: "",
    experience: "",
    industry: "",
    primaryGoal: "",
    bio: "",
    contentTypes: [],
    colorPreference: "",
    stylePreference: "",
    inspirations: "",
    budget: "",
    timeline: "",
    features: [],
    additionalInfo: "",
    ktpImageUrl: "",
    referralCode: "",
  });

  const updateFormData = (field: keyof InstructorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    try {
      if (currentStep === 0) {
        RegisterInstructorSchema.pick({
          name: true,
          email: true,
          bio: true,
        }).parse(formData);
      } else if (currentStep === 1) {
        RegisterInstructorSchema.pick({
          profession: true,
          industry: true,
          linkedinAccount: true,
        }).parse(formData);
      } else if (currentStep === 2) {
        RegisterInstructorSchema.pick({
          numberKTP: true,
        }).parse(formData);
      }
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((e: z.ZodIssue) =>
          toast.error(e.message, {
            description: "Periksa kembali input Anda",
          })
        );
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);

    try {
      const response = await registerInstructorAction(formData);

      if (response.success) {
        toast.success(response.message);
        setTimeout(() => router.push("/"), 1500);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="w-full max-w-lg mx-auto py-8">
      <ProgressSteps
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>
        <Card className="border shadow-md rounded-3xl overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <StepPersonalInfo
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 1 && (
              <StepProfessionalInfo
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 2 && (
              <StepValidationData
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </AnimatePresence>

          <StepNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingForm;
