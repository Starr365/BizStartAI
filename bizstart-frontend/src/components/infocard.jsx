import React from "react";

const InfoCard = ({ currentStep, totalSteps, title }) => {
  return (
    <div className="bg-gray-200 rounded-2xl p-6 mx-4 mb-8 text-center shadow-sm">
      <p className="text-gray-600 text-sm font-medium mb-2">
        Step {currentStep} of {totalSteps}: {title}
      </p>
      <h2 className="text-gray-800 text-lg font-semibold leading-tight">
        Who are your customers?
        <br />
        <span className="text-gray-500 font-normal text-sm">
          The more specific, the better!
        </span>
      </h2>
    </div>
  );
};

export default InfoCard;
