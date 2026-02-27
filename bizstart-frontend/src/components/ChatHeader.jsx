import React from "react";
import { ArrowLeft } from "lucide-react";

const ChatHeader = ({ title = "AI Mentor", onBack }) => (
  <div className="flex items-center justify-between sticky top-0 bg-white z-10 py-3 px-4 shadow-md">
    <button onClick={onBack}>
      <ArrowLeft size={20} />
    </button>
    <h2 className="font-semibold text-gray-800">{title}</h2>
    <div></div> {/* placeholder for right icon if needed */}
  </div>
);

export default ChatHeader;