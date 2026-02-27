import React from "react";

const ProgressCard = ({ completedModules, totalModules, progressPercent }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <p className="font-semibold text-gray-800 mb-2">Learning Progress</p>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          style={{ width: `${progressPercent}%`, backgroundColor: "#6E62B1" }}
          className="h-3 rounded-full"
        ></div>
      </div>
      {/* Subtitle */}
      <p className="text-xs text-gray-500 mt-2">
        {completedModules} of {totalModules} modules finished
      </p>
    </div>
  );
};

export default ProgressCard;