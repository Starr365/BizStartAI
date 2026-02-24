import React from "react";
import { ArrowLeft, HelpCircle, Bot, Pencil, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BusinessPlan() {
  const navigate = useNavigate();
  const userName = "Sarah";

  const steps = [
    {
      icon: <HelpCircle size={22} />,
      title: "Answer Questions",
      desc: "Tell us about your business idea, goals, and plans in your own words",
    },
    {
      icon: <Bot size={22} />,
      title: "AI Generates Your Plan",
      desc: "Our AI creates professional content for each section based on your answers",
    },
    {
      icon: <Pencil size={22} />,
      title: "Review & Customize",
      desc: "Edit any section to add your personal touch or make it more specific",
    },
    {
      icon: <Download size={22} />,
      title: "Download & Share",
      desc: "Export as a professional PDF ready for investors or lenders",
    },
  ];

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      {/* App Container */}
      <div className="w-full max-w-md md:max-w-5xl bg-white md:shadow-xl md:rounded-2xl flex flex-col h-screen">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white px-6 py-4 border-b flex items-center justify-center relative">
          <button className="absolute left-6 p-2 rounded-xl shadow-sm bg-gray-100">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Business Plan</h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          <p className="text-center text-gray-500 max-w-md mx-auto mb-6">
            BizStart AI will guide you through each section with helpful prompts.
            There are no wrong answers! Edit and refine anytime.
          </p>

          {/* How it works */}
          <h2 className="font-semibold text-gray-700 mb-4">
            Here's How It Works
          </h2>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 border rounded-xl bg-white shadow-sm"
              >
                <div className="text-[#6E62B1]">{step.icon}</div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/business-info")}
            className="w-full mt-8 py-4 rounded-xl text-white font-semibold shadow-md"
            style={{ backgroundColor: "#6E62B1" }}
          >
            Start Creating your Plan
          </button>

        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <div className="md:hidden sticky bottom-0 border-t bg-white flex justify-around py-3 text-xs">

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
      </div>
    </div>
  );
}