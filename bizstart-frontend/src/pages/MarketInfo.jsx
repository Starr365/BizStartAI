import React from "react";
import Stepper from "../components/stepper";
import InfoCard from "../components/infocard";

const MarketInfo = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-[#1A1A1A] py-4 px-6 flex items-center justify-center relative">
        <button className="absolute left-6 text-white text-2xl">☰</button>
        <h1 className="text-gray-300 text-sm font-medium">
          BizSmart AI Capstone Project
        </h1>
      </header>

      {/* Content Container */}
      <main className="w-full max-w-md flex flex-col mt-4">
        {/* Back Button and Title */}
        <div className="flex items-center px-6 mb-4">
          <button className="bg-white p-2 rounded-lg shadow-sm mr-12 text-gray-600">
            &lt;
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Market Info</h2>
        </div>

        <Stepper />

        <InfoCard
          currentStep={2}
          totalSteps={4}
          title="Define your target market"
        />

        {/* Form Inputs will go here next */}
      </main>
    </div>
  );
};

export default MarketInfo;
