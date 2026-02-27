import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#6E62B1";

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 w-full md:hidden border-t bg-white flex justify-around py-3 text-xs z-20">
    <div className="flex flex-col items-center text-gray-400">🏠 Home</div>
    <div className="flex flex-col items-center text-[#6E62B1] font-medium">🧰 Tools</div>
    <div className="flex flex-col items-center text-gray-400">🤖 AI Mentor</div>
    <div className="flex flex-col items-center text-gray-400">👤 Profile</div>
  </div>
);

export default function Financials() {
  const navigate = useNavigate();

  const steps = ["Business Info", "Market", "Strategy", "Financials"];

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white flex flex-col h-screen">

        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-center relative">
          <button onClick={() => navigate(-1)} className="absolute left-6 p-2 bg-gray-100 rounded-xl">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-semibold">Financials</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">

          {/* Steps */}
          <div className="flex justify-between mb-6">
            {steps.map((label, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white`}
                  style={{ backgroundColor: i < 3 ? "#22C55E" : PRIMARY }}
                >
                  {i < 3 ? <Check size={16} /> : 4}
                </div>
                <p className="text-xs mt-2 text-gray-600">{label}</p>
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-gray-100 rounded-2xl p-5 text-center mb-8">
            <p className="font-medium text-gray-700">Step 4 of 4: Financial projections</p>
            <p className="text-sm text-gray-500 mt-2">
              Provide your best estimates. We’ll help generate detailed projections!
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-6">

            <div>
              <label className="font-medium">Startup Costs</label>
              <input className="w-full mt-2 p-4 border rounded-xl" />
              <p className="text-sm text-gray-400 mt-1">
                Initial investment needed (legal, marketing, etc.)
              </p>
            </div>

            <div>
              <label className="font-medium">Monthly Operating Expenses</label>
              <input className="w-full mt-2 p-4 border rounded-xl" />
            </div>

            <div>
              <label className="font-medium">Revenue Model</label>
              <input className="w-full mt-2 p-4 border rounded-xl" />
            </div>

          </div>

          <button
            onClick={() => navigate("/generating")}
            className="w-full mt-8 py-4 rounded-xl text-white font-semibold"
            style={{ backgroundColor: PRIMARY }}
          >
            Generate Plan
          </button>

        </div>

        <BottomNav />
      </div>
    </div>
  );
}