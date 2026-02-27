import React from "react";

const WelcomeCard = ({ name }) => (
  <div
    style={{ backgroundColor: "#6E62B1" }}
    className="text-white rounded-2xl p-4 mb-6"
  >
    <p className="font-semibold">Welcome {name}, I am your business paddy!</p>
    <p className="text-sm opacity-90 mt-1">
      You're at the beginning of an exciting journey. Let’s turn your idea into reality together!
    </p>
  </div>
);

export default WelcomeCard;