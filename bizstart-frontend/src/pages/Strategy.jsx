import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Stepper from "../components/Stepper";
import InfoCard from "../components/InfoCard";
import InputField from "../components/InputField";

const Strategy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-32">
      {/* Header */}
      <div className="relative flex items-center justify-center w-full pt-12 pb-6 px-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-2 bg-white border border-gray-200 shadow-sm p-2 rounded-xl text-gray-800"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Strategy</h2>
      </div>

      <Stepper activeStep={3} />

      <InfoCard currentStep={3} totalSteps={4} title="How will you grow?" />

      <div className="px-6 space-y-6">
        {/* Section 1 */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Marketing Strategy
          </h3>
          <InputField
            label="How Will You Reach Customers?"
            placeholder="Type here..."
            hint="List your primary customer acquisition channels"
          />
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Pricing Strategy
          </h3>
          <InputField
            label="Pricing Strategy"
            placeholder="Type here..."
            hint="Explain your pricing model and how you set prices"
          />
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Operations</h3>
          <InputField
            label="Daily Operations Overview"
            placeholder="Type here..."
            hint="Describe the day-to-day running of the business"
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-6 mt-10">
        <button
          onClick={() => navigate("/financials")} // This will be the next page
          className="w-full bg-[#6E62B1] hover:bg-[#6E62B1] text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200"
        >
          Continue
        </button>
      </div>

      {/* Bottom Nav stays the same */}
    </div>
  );
};

export default Strategy;
