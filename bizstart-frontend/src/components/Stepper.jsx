import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ activeStep }) => {
  const steps = [
    { id: 1, label: "Business Info" },
    { id: 2, label: "Market" },
    { id: 3, label: "Strategy" },
    { id: 4, label: "Financials" },
  ];

  return (
    <div className="relative flex items-center justify-between w-full px-8 py-8">
      <div className="absolute top-[52px] left-12 right-12 h-[1px] bg-gray-300 -z-0"></div>

      {steps.map((step) => {
        const isComplete = step.id < activeStep;
        const isActive = step.id === activeStep;

        return (
          <div key={step.id} className="flex flex-col items-center z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2
              ${
                isComplete
                  ? "bg-green-600 border-green-600 text-white"
                  : isActive
                    ? "bg-white border-blue-600 text-blue-600"
                    : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {isComplete ? <Check size={18} /> : step.id}
            </div>

            <span
              className={`mt-2 text-[10px] font-semibold uppercase tracking-wider
              ${isActive ? "text-gray-900" : "text-gray-400"}`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
