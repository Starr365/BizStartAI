import React from "react";
import { useNavigate } from "react-router-dom";
import Onboarding from "../assets/OnBoarding.jpg";

const OnboardingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-white flex justify-center overflow-hidden">

      {/* ================= MOBILE ================= */}
      <div className="w-full max-w-[400px] flex flex-col p-6 md:hidden">
        
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-semibold text-slate-900">
            Learn at Your Pace
          </h1>

          <p className="mt-3 text-gray-500">
            Quick lessons on everything from market research 
            to financial planning.
          </p>

          <div className="flex justify-center mt-8">
            <img
              src={Onboarding}
              alt="Learning"
              className="h-[280px] object-contain"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#6E62B1] text-white py-3.5 rounded-xl"
            >
              Create Account
            </button>

            <button
              onClick={() => navigate("/login")}
              className="bg-gray-100 py-3.5 rounded-xl border"
            >
              Log In
            </button>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex w-full max-w-6xl items-center justify-between px-20">
        
        {/* Left */}
        <div className="max-w-lg">
          <h1 className="text-5xl font-semibold text-slate-900">
            Learn at Your Pace
          </h1>

          <p className="mt-6 text-lg text-gray-500">
            Quick lessons on market research, validation, 
            strategy, and financial planning designed for busy founders.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#6E62B1] text-white px-8 py-4 rounded-xl shadow-md"
            >
              Create Account
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border px-8 py-4 rounded-xl"
            >
              Log In
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-[500px]">
          <img
            src={Onboarding}
            alt="Learning"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;