import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
// ADDED: Import toast and Toaster
import toast, { Toaster } from 'react-hot-toast';
import PageWrapper from '../components/PageWrapper';
import PrimaryButton from '../components/PrimaryButton';

const YourIdeaScreen = () => {
  const navigate = useNavigate();
  const [ideaData, setIdeaData] = useState({ businessIdea: '', problemSolved: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdeaData(prev => ({ ...prev, [name]: value }));
  };


  const getAISuggestedIndustry = async (idea, problem) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCvDPGH154PJk1pakpHV_PVgq9erhld2Is");
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `A user has a business idea: "${idea}". The problem it solves is: "${problem}". Based on this, choose the best industry ID from this list: - beauty, - retail, - small-scale, - service, - fashion. Return ONLY the word of the ID. No sentences. No punctuation.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim().toLowerCase();
    } catch (error) {
      console.error("Gemini Error:", error);
      return "retail";
    }
  };

  const handleContinue = async () => {
    if (!ideaData.businessIdea || !ideaData.problemSolved) {
      // REPLACED: alert with error toast
      toast.error("Please fill in both fields so I can help you!");
      return;
    }

    setIsLoading(true);
    const suggestedIndustry = await getAISuggestedIndustry(ideaData.businessIdea, ideaData.problemSolved);
    const existingData = JSON.parse(localStorage.getItem('userAccount') || '{}');
    const updatedData = { ...existingData, ...ideaData, suggestedIndustry };
    localStorage.setItem('userAccount', JSON.stringify(updatedData));
    setIsLoading(false);

    // ADDED: Success message and navigation delay
    toast.success("Idea saved successfully!");
    setTimeout(() => {
      navigate('/Industry');
    }, 1000);
  };

  return (
    <PageWrapper className="mt-2">
      {/* ADDED: Toaster container with right-slide animation */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'custom-toast',
          duration: 3000,
        }}
      />

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .custom-toast {
          animation: slideInRight 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>

      <div className="flex-1 flex flex-col justify-start gap-6">
        <div className="w-full">
          <div className="relative w-full flex items-center justify-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer outline-none focus:outline-none focus:ring-0"
            >
              <FaChevronLeft size={16} />
            </button>
            <h1 className="text-slate-900 font-sans font-light text-[24px] leading-[140%] tracking-[-0.02em]">
              Your Idea
            </h1>
          </div>

          <p className="text-[#666666] font-sans font-light text-[14px] leading-[140%] text-center mb-0 mx-auto">
            Share your business idea with me! <br />
            Don't worry about making it perfect <br />
            I will help you refine it.
          </p>
        </div>

        <div className="w-full pb-4">
          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-slate-900 font-sans font-medium text-[16px] leading-[140%]">
                What's your business idea?
              </label>
              <textarea
                name="businessIdea"
                value={ideaData.businessIdea}
                onChange={handleChange}
                placeholder="Example: Selling natural black soap and glow oils for babies..."
                className="w-full p-4 h-24 rounded-2xl border border-gray-400 bg-white outline-none focus:border-primary transition-colors text-base placeholder:text-sm resize-none overflow-hidden font-sans font-normal leading-[140%]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-slate-900 font-sans font-medium text-[16px] leading-[140%]">
                What problem does it solve?
              </label>
              <textarea
                name="problemSolved"
                value={ideaData.problemSolved}
                onChange={handleChange}
                placeholder="Example: Mothers want organic cream that works without harsh chemicals..."
                className="w-full p-4 h-24 rounded-2xl border border-gray-400 bg-white outline-none focus:border-primary transition-colors text-base placeholder:text-sm resize-none overflow-hidden font-sans font-normal leading-[140%]"
              />
            </div>
          </div>

          <div className="w-full mt-10">
            <PrimaryButton
              onClick={handleContinue}
              disabled={isLoading}
              className="flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Thinking...</span></>
              ) : "Continue"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default YourIdeaScreen;