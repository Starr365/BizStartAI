import React from "react";
import PageWrapper from "../components/PageWrapper";

export default function GeneratingPlan() {
  return (
    <PageWrapper>

      <div className="flex flex-col items-center justify-center text-center py-12">

        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#6E62B1] rounded-full animate-spin mb-6" />

        <h2 className="text-xl font-semibold mb-2">
          Creating your Business Plan
        </h2>

        <p className="text-gray-500 max-w-sm">
          BizStart AI is analyzing your information and generating
          professional content for each section.
        </p>

      </div>

    </PageWrapper>
  );
}