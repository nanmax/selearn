"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  handleSubmit,
  isSubmitting,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between pt-6 pb-4 px-6">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-1 rounded-2xl">
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="button"
          onClick={currentStep === totalSteps - 1 ? handleSubmit : nextStep}
          disabled={isSubmitting}
          className="flex items-center gap-1 rounded-2xl">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              {currentStep === totalSteps - 1 ? "Submit" : "Next"}
              {currentStep === totalSteps - 1 ? (
                <Check className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
