import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Import navigation tool
import { ChevronLeft } from "lucide-react";
import Stepper from "../components/Stepper";
import InfoCard from "../components/InfoCard";
import InputField from "../components/InputField";

const MarketInfo = () => {
  const navigate = useNavigate(); // 2. Initialize the tool

  const handleContinue = () => {
    // This will change the URL to /strategy
    navigate("/strategy");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-32">
      <div className="relative flex items-center justify-center w-full pt-12 pb-6 px-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-2 bg-white border border-gray-200 shadow-sm p-2 rounded-xl text-gray-800 hover:bg-gray-50 transition-all active:scale-95"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900">Market Info</h2>
      </div>

      <Stepper activeStep={2} />

      <InfoCard
        currentStep={2}
        totalSteps={4}
        title="Define your target market"
      />

      <div className="mt-4 space-y-2">
        <InputField
          label="Target Customer Description"
          placeholder="Type here..."
          hint="Include demographics, behaviors, and preferences"
        />
        <InputField
          label="Market Size Estimate"
          placeholder="Type here..."
          hint="How many potential customers exist for your product?"
        />
        <InputField
          label="Geographic Focus"
          placeholder="Type here..."
          hint="Which cities, regions, or countries will you serve?"
        />
      </div>

      {/* 3. The Continue Button */}
      <div className="px-6 mt-8">
        <button
          onClick={handleContinue}
          className="w-full bg-[#6E62B1] hover:bg-[#6E62B1] text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MarketInfo;
