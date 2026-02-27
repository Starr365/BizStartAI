import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#6E62B1";

// Updated BottomNav to stay slim and centered on desktop
const BottomNav = () => (
  <div className="fixed bottom-0 left-0 w-full md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-max md:rounded-2xl md:shadow-lg border-t md:border bg-white flex justify-around gap-10 px-8 py-3 text-xs z-50">
    <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-600">🏠 Home</div>
    <div className="flex flex-col items-center text-[#6E62B1] font-medium cursor-pointer">🧰 Tools</div>
    <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-600">🤖 AI Mentor</div>
    <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-600">👤 Profile</div>
  </div>
);

export default function Financials() {
  const navigate = useNavigate();

  const steps = ["Business Info", "Market", "Strategy", "Financials"];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header - Stretches full width */}
      <div className="sticky top-0 bg-white px-6 py-5 border-b flex items-center justify-center relative z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-6 md:left-10 p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-xl text-gray-800">Financials</h1>
      </div>

      {/* Main Content Area - Full screen width with max-width container for readability */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 pb-32">
        
        {/* Steps Stepper - Wider for desktop */}
        <div className="flex justify-between mb-12 max-w-3xl mx-auto relative">
          {/* Background Line for stepper */}
          <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-10 hidden md:block" />
          
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-110"
                style={{ backgroundColor: i < 3 ? "#22C55E" : PRIMARY }}
              >
                {i < 3 ? <Check size={18} /> : 4}
              </div>
              <p className={`text-xs mt-3 font-semibold ${i === 3 ? "text-gray-900" : "text-gray-400"}`}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Instruction Card */}
        <div className="bg-[#F8F7FF] border border-[#E8E6F5] rounded-2xl p-8 text-center mb-10">
          <p className="text-lg font-bold text-gray-800">Step 4 of 4: Financial projections</p>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            Provide your best estimates for <strong>BizStart AI</strong>. We’ll help generate detailed projections to make your plan investor-ready!
          </p>
        </div>

        {/* Form Inputs - 2 Column Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Startup Costs</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₦</span>
              <input 
                type="number"
                className="w-full pl-10 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#6E62B1] outline-none transition-all" 
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">Include legal fees, initial marketing, and equipment.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Operating Expenses</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₦</span>
              <input 
                type="number"
                className="w-full pl-10 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#6E62B1] outline-none transition-all" 
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Revenue Model</label>
            <input 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#6E62B1] outline-none transition-all" 
              placeholder="e.g., Monthly Subscriptions, Unit Sales"
            />
          </div>

        </div>

        {/* Action Button - Centered and constrained for desktop */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/generating")}
            className="w-full md:w-80 py-4 rounded-2xl text-white font-bold text-lg shadow-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            style={{ backgroundColor: PRIMARY }}
          >
            Generate Plan
          </button>
        </div>
      </div>
    </div>
  );
}