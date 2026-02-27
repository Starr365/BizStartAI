import React from "react";
import { Bell } from "lucide-react";
import Logo from "../assets/bizstart-ai.png";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <img src={Logo} alt="BizStart AI" className="h-10 object-contain" />
      <Bell stroke="black" size={22} />
    </div>
  );
};

export default Header;