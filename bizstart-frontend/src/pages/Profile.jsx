import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  User,
  Edit3,
  Lightbulb,
  Bell,
  PlusSquare,
  UserCircle,
  Database,
  Archive,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Lightbulb size={20} />, label: "Idea Stage" },
    { icon: <Bell size={20} />, label: "Notifications" },
    { icon: <PlusSquare size={20} />, label: "Subscription" },
    { icon: <UserCircle size={20} />, label: "Personalization" },
    { icon: <Database size={20} />, label: "Data Control" },
    { icon: <Archive size={20} />, label: "Archived Chats" },
    { icon: <ShieldCheck size={20} />, label: "Security" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-24 font-sans">
      {/* Header Area */}
      <div className="px-6 pt-12 text-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 top-12 p-2 bg-white/50 rounded-xl shadow-sm text-gray-600"
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </button>

        <h2 className="text-xl font-bold text-gray-800">Profile</h2>

        {/* Avatar Section */}
        <div className="mt-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-[#7C3AED] flex items-center justify-center mb-4">
            <User size={50} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Sandra Eze</h3>
          <p className="text-gray-500 text-sm mb-4">08167890976</p>

          <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 transition-all font-medium text-gray-700">
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Account Section */}
      <div className="px-6 mt-10">
        <h4 className="text-gray-900 font-bold mb-4">Account</h4>

        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-xl border border-gray-100 hover:bg-white transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4 text-gray-700">
                <span className="text-gray-600 group-hover:text-[#7C3AED] transition-colors">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
