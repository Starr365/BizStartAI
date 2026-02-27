import React from "react";
import { Link, useLocation } from "react-router-dom";

const PRIMARY = "#6E62B1";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: "🏠", path: "/dashboard" },
    { label: "Tools", icon: "🧰", path: "/tools" },
    { label: "AI Mentor", icon: "🤖", path: "/chat" },
    { label: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div className="
      fixed bottom-0 left-0 right-0
      md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:w-max
      bg-white/90 backdrop-blur-md border-t md:border md:shadow-sm
      flex justify-around md:gap-10
      px-4 py-2
      rounded-none md:rounded-2xl
      z-50
    ">
      {navItems.map((item) => (
        <NavItem 
          key={item.path}
          label={item.label} 
          icon={item.icon} 
          path={item.path}
          active={location.pathname === item.path} 
        />
      ))}
    </div>
  );
}

function NavItem({ label, icon, active, path }) {
  return (
    <Link
      to={path}
      className={`flex flex-col items-center gap-0.5 transition-all active:scale-95 ${
        active ? "text-[#6c60b0]" : "text-gray-400"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className={`text-[9px] ${active ? "font-bold" : "font-medium"}`}>
        {label}
      </span>
    </Link>
  );
}