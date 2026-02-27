import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import BottomNav from "../components/BottomNav";

const PRIMARY = "#6E62B1";

export default function BusinessInfo() {
  const navigate = useNavigate();

  return (
    <PageWrapper>

      {/* Header */}
      <div className="flex items-center mb-6 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 p-2 rounded-lg bg-gray-100"
        >
          <ArrowLeft size={18} />
        </button>

        <h1 className="w-full text-center text-xl md:text-2xl font-semibold">
          Business Info
        </h1>
      </div>

      {/* Progress */}
      <div className="flex justify-between mb-6">
        {["Business", "Market", "Strategy", "Financials"].map((label, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
              style={{ background: i === 0 ? PRIMARY : "#E5E5E5" }}
            >
              {i + 1}
            </div>
            <p className="text-xs mt-2 text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Instruction */}
      <div className="bg-gray-100 rounded-xl p-4 text-center mb-6">
        <p className="font-medium">
          Step 1 of 4: Tell us about your business
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input label="Business Name" />
        <Input label="One-Line Description" />

        <textarea
          placeholder="What problem are you solving?"
          className="md:col-span-2 w-full p-4 border rounded-xl outline-none"
        />

      </div>

      {/* Next Button */}
      <button
        onClick={() => navigate("/market")}
        className="w-full mt-8 py-4 rounded-xl text-white font-semibold shadow-md"
        style={{ background: PRIMARY }}
      >
        Next
      </button>

      <BottomNav />

    </PageWrapper>
  );
}

function Input({ label }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input className="w-full mt-2 p-3 border rounded-xl outline-none" />
    </div>
  );
}