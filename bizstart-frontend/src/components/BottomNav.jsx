import React from "react";

const PRIMARY = "#6E62B1";

export default function BottomNav() {
  return (
    <div className="
      fixed bottom-0 left-0 right-0
      md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-auto
      bg-white border md:shadow-lg
      flex justify-around gap-8
      px-6 py-3
      text-xs
      rounded-none md:rounded-xl
      z-50
    ">
      <NavItem label="Home" icon="🏠" />
      <NavItem label="Tools" icon="🧰" active />
      <NavItem label="AI Mentor" icon="🤖" />
      <NavItem label="Profile" icon="👤" />
    </div>
  );
}

function NavItem({ label, icon, active }) {
  return (
    <div
      className={`flex flex-col items-center ${
        active ? "font-medium" : "text-gray-400"
      }`}
      style={{ color: active ? "#6E62B1" : "" }}
    >
      <span>{icon}</span>
      {label}
    </div>
  );
}