import React from "react";

const ExploreCard = ({ icon, title, description }) => (
  <div className="bg-gray-100 rounded-2xl p-4 text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <p className="font-medium">{title}</p>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

export default ExploreCard;