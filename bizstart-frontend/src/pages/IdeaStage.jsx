import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
// ADDED: Import toast and Toaster
import toast, { Toaster } from 'react-hot-toast';



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
    <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden mt-2">
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

      <div style={{ width: '100%', maxWidth: '380px', height: '100%' }} className="flex flex-col px-6 py-6">
        <div className="flex-1 flex flex-col justify-start gap-6">
          <div className="w-full">
            <div className="relative w-full flex items-center justify-center mb-6">
              <button 
                onClick={() => navigate(-1)}
                className="absolute left-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer outline-none focus:outline-none focus:ring-0"
              >
                <FaChevronLeft size={16} />
              </button>
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '24px', lineHeight: '140%', letterSpacing: '-0.02em' }} className="text-slate-900">
                Your Idea
              </h1>
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '14px', lineHeight: '140%', letterSpacing: '0%', textAlign: 'center', color: '#666666' }} className="mb-0 mx-auto">
              Share your business idea with me! <br />
              Don't worry about making it perfect <br />
              I will help you refine it.
            </p>
          </div>

          <div className="w-full pb-4">
            <div className="w-full flex flex-col gap-6"> 
              <div className="flex flex-col gap-3">
                <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500', fontSize: '16px', lineHeight: '140%' }} className="text-slate-900">
                  What's your business idea?
                </label>
                <textarea 
                  name="businessIdea"
                  value={ideaData.businessIdea}
                  onChange={handleChange}
                  placeholder="Example: Selling natural black soap and glow oils for babies..." 
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '400', lineHeight: '140%' }}
                  className="w-full p-4 h-24 rounded-2xl border border-gray-400 bg-white outline-none focus:border-[#6E62B1] transition-colors text-base placeholder:text-sm resize-none overflow-hidden"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500', fontSize: '16px', lineHeight: '140%' }} className="text-slate-900">
                  What problem does it solve?
                </label>
                <textarea 
                  name="problemSolved"
                  value={ideaData.problemSolved}
                  onChange={handleChange}
                  placeholder="Example: Mothers want organic cream that works without harsh chemicals..." 
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '400', lineHeight: '140%' }}
                  className="w-full p-4 h-24 rounded-2xl border border-gray-400 bg-white outline-none focus:border-[#6E62B1] transition-colors text-base placeholder:text-sm resize-none overflow-hidden"
                />
              </div>
            </div>

            <div className="w-full mt-10">
              <button 
                onClick={handleContinue}
                disabled={isLoading}
                style={{ backgroundColor: '#6E62B1', fontFamily: "'Inter', sans-serif", fontWeight: '500', fontSize: '16px', textShadow: '0px 1px 4px rgba(0, 0, 0, 0.40)', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.40)', opacity: isLoading ? 0.7 : 1 }}
                className="w-full text-white py-4 rounded-xl transition-all active:scale-[0.98] cursor-pointer outline-none focus:outline-none focus:ring-0 border-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Thinking...</span></>
                ) : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourIdeaScreen;