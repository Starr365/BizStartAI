import React from "react";

const PRIMARY = "#6E62B1";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-[#F6F7FB] flex">

      {/* Left Branding Panel — Desktop Only */}
      <div className="hidden lg:flex flex-1 bg-[#6E62B1] text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">
          BizStart AI
        </h1>

        <p className="text-lg opacity-90 max-w-md leading-relaxed">
          Turn your business idea into a professional business plan
          with AI guidance, step-by-step support, and smart tools.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="
          w-full
          max-w-md
          md:max-w-lg
          lg:max-w-xl
          xl:max-w-2xl
          bg-white
          rounded-2xl
          shadow-lg
          p-6 md:p-8
        ">
          {children}
        </div>
      </div>
    </div>
  );
}