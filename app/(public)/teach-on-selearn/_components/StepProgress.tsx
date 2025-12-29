import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const ProgressSteps = ({
  steps,
  currentStep,
  setCurrentStep,
}: ProgressStepsProps) => {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}>
            <motion.div
              className={cn(
                "w-4 h-4 rounded-full cursor-pointer transition-colors duration-300",
                index < currentStep
                  ? "bg-primary"
                  : index === currentStep
                  ? "bg-primary ring-4 ring-primary/20"
                  : "bg-muted"
              )}
              onClick={() => {
                if (index <= currentStep) setCurrentStep(index);
              }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.span
              className={cn(
                "text-xs mt-1.5 hidden sm:block",
                index === currentStep
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}>
              {step.title}
            </motion.span>
          </motion.div>
        ))}
      </div>
      <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-2">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};
