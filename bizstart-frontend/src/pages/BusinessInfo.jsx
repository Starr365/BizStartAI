import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#6E62B1";

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 w-full md:hidden border-t bg-white flex justify-around py-3 text-xs z-20">
    <div className="flex flex-col items-center text-gray-400">
      <span>🏠</span>
      Home
    </div>

    <div className="flex flex-col items-center text-[#6E62B1] font-medium">
      <span>🧰</span>
      Tools
    </div>

    <div className="flex flex-col items-center text-gray-400">
      <span>🤖</span>
      AI Mentor
    </div>

    <div className="flex flex-col items-center text-gray-400">
      <span>👤</span>
      Profile
    </div>
  </div>
);

export default function BusinessInfo() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      {/* App Container */}
      <div className="w-full max-w-md md:max-w-5xl bg-white md:shadow-xl md:rounded-2xl flex flex-col h-screen">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white px-6 py-4 border-b flex items-center justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 p-2 rounded-xl shadow-sm bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-lg font-semibold">Business Info</h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">

          {/* Step Progress */}
          <div className="flex items-center justify-between mb-6">

            {["Business Info", "Market", "Strategy", "Financials"].map(
              (label, index) => {
                const step = index + 1;
                const active = step === 1;

                return (
                  <div key={index} className="flex flex-col items-center flex-1">

                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium ${
                        active ? "text-white" : "text-gray-500 bg-gray-200"
                      }`}
                      style={{
                        backgroundColor: active ? PRIMARY : "#E5E5E5",
                      }}
                    >
                      {step}
                    </div>

                    <p className="text-xs mt-2 text-gray-600 text-center">
                      {label}
                    </p>
                  </div>
                );
              }
            )}
          </div>

          {/* Instruction Card */}
          <div className="bg-gray-100 rounded-2xl p-5 text-center mb-8">
            <p className="font-medium text-gray-700">
              Step 1 of 4: Tell us about your business
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Don't stress about perfection <br />
              you can refine everything later!
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">

            {/* Business Name */}
            <div>
              <label className="font-medium text-gray-800">
                Business Name
              </label>

              <input
                className="w-full mt-2 p-4 border rounded-xl outline-none focus:ring-2"
                style={{ borderColor: "#E5E5E5" }}
                placeholder=""
              />

              <p className="text-sm text-gray-400 mt-2">
                What will you call your business?
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="font-medium text-gray-800">
                One-Line Description
              </label>

              <input
                className="w-full mt-2 p-4 border rounded-xl outline-none"
                style={{ borderColor: "#E5E5E5" }}
              />

              <p className="text-sm text-gray-400 mt-2">
                Think of this as your elevator pitch
              </p>
            </div>

            {/* Problem */}
            <div>
              <label className="font-medium text-gray-800">
                What Problem Are You Solving?
              </label>

              <textarea
                rows={4}
                className="w-full mt-2 p-4 border rounded-xl outline-none resize-none"
                style={{ borderColor: "#E5E5E5" }}
              />

              <p className="text-sm text-gray-400 mt-2">
                Be specific about the challenge your customers face
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </div>
  );
}