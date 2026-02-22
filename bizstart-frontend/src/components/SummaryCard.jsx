import React from "react";

const SummaryCard = ({ value, icon, label }) => {
  return (
    <div className="bg-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
      <div className="text-2xl mb-2" style={{ color: "#6E62B1" }}>{icon}</div>
      <p className="font-semibold text-gray-800 text-lg">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
};

export default SummaryCard;