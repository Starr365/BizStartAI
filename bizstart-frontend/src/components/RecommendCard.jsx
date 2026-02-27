import React from "react";

const RecommendedCard = ({ title, description, lessons, duration, level }) => (
  <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-start shadow-sm mb-4">
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>

      <div className="flex gap-4 text-xs text-gray-500 mt-3">
        <span>📖 {lessons} Lessons</span>
        <span>⏱ {duration} Minutes</span>
        <span>⭐ {level}</span>
      </div>
    </div>

    <button
      style={{ backgroundColor: "#6E62B1" }}
      className="text-white px-4 py-2 rounded-lg text-sm"
    >
      Start
    </button>
  </div>
);

export default RecommendedCard;