import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import toast, { Toaster } from 'react-hot-toast';

const EarlyStageScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [earlyData, setEarlyData] = useState({
    businessName: '',
    targetAudience: '',
    monthlyRevenue: '',
    teamSize: '',
    primaryGoals: []
  });

  const goalOptions = [
    "Acquire first customers",
    "Grow business base",
    "Increase revenue",
    "Build the team",
    "Raise funding"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEarlyData(prev => ({ ...prev, [name]: value }));
  };

  const toggleGoal = (goal) => {
    setEarlyData(prev => {
      const isSelected = prev.primaryGoals.includes(goal);
      return {
        ...prev,
        primaryGoals: isSelected 
          ? prev.primaryGoals.filter(g => g !== goal) 
          : [...prev.primaryGoals, goal]
      };
    });
  };

  const getAISuggestedIndustry = async (name, audience) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDPDeIWbR2CqoF9Mcw9itZolPwJFiqVfmQ");
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        Business Name: "${name}"
        Target Audience: "${audience}"
        Based on these details, choose the best industry ID from this list:
        - beauty, - retail, - small-scale, - service, - fashion
        Return ONLY the word of the ID. No sentences. No punctuation.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim().toLowerCase();
    } catch (error) {
      console.error("Gemini Error:", error);
      return "retail"; 
    }
  };

  const handleContinue = async () => {
    if (!earlyData.businessName || !earlyData.targetAudience) {
      toast.error("Please fill in your business name and audience!");
      return;
    }

    setIsLoading(true);

    const suggestedIndustry = await getAISuggestedIndustry(
      earlyData.businessName, 
      earlyData.targetAudience
    );

    const existingData = JSON.parse(localStorage.getItem('userAccount') || '{}');
    
    localStorage.setItem('userAccount', JSON.stringify({ 
      ...existingData, 
      ...earlyData,
      suggestedIndustry: suggestedIndustry 
    }));
    
    setIsLoading(false);

    // UPDATED: Show success toast and wait before navigating
    toast.success("Details saved successfully!");
    setTimeout(() => {
      navigate('/Industry'); 
    }, 1000); 
  };

  return (
    <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden mt-2">
      {/* UPDATED: Custom animation for slide-in effect */}
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

      <div style={{ width: '100%', maxWidth: '380px', height: '100%' }} className="flex flex-col px-6 py-4">
        <div className="flex-1 flex flex-col ">
          <div>
            <div className="relative w-full flex items-center justify-center mb-4">
              <button 
                onClick={() => navigate(-1)}
                className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer"
              >
                <FaChevronLeft size={14} />
              </button>
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '22px', letterSpacing: '-0.02em' }} className="text-slate-900">
                Early Stage
              </h1>
            </div>

            <div className="text-center mb-6">
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Great! You're in the early phase.<br />
                Let's make sure you have everything in place.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-1 mb-6 scrollbar-hide">
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900 font-sans">Business Name</label>
              <input 
                name="businessName"
                onChange={handleInputChange}
                placeholder="Example: Mama T's Glow Shop" 
                className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#6E62B1] transition-colors placeholder:text-sm placeholder:text-gray-300 text-base font-sans"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900 font-sans">Target Audience</label>
              <textarea 
                name="targetAudience"
                onChange={handleInputChange}
                placeholder="Who are you selling to?" 
                className="w-full p-3.5 h-20 rounded-xl border border-gray-200 outline-none focus:border-[#6E62B1] transition-colors placeholder:text-sm placeholder:text-gray-300 resize-none text-base font-sans"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900 font-sans">Monthly Revenue (Naira)</label>
              <input 
                name="monthlyRevenue"
                onChange={handleInputChange}
                placeholder="Example: 200,000" 
                className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#6E62B1] transition-colors placeholder:text-sm placeholder:text-gray-300 text-base font-sans"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900 font-sans">Team Size</label>
              <input 
                name="teamSize"
                onChange={handleInputChange}
                placeholder="Example: 3 people" 
                className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#6E62B1] transition-colors placeholder:text-sm placeholder:text-gray-300 text-base font-sans"
              />
            </div>

            <div className="flex flex-col gap-3 mt-1">
              <label className="text-sm font-semibold text-slate-900 font-sans">Primary Goal</label>
              <div className="flex flex-col gap-2.5">
                {goalOptions.map((goal, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      onClick={() => toggleGoal(goal)}
                      className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                        earlyData.primaryGoals.includes(goal) 
                        ? 'bg-[#6E62B1] border-[#6E62B1]' 
                        : 'border-gray-300'
                      }`}
                    >
                      {earlyData.primaryGoals.includes(goal) && (
                        <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                      )}
                    </div>
                    <span className="text-slate-600 text-xs font-sans">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full">
            <button 
              onClick={handleContinue}
              disabled={isLoading}
              style={{ 
                backgroundColor: '#6E62B1',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontSize: '15px',
                textShadow: '0px 1px 4px rgba(0, 0, 0, 0.40)',
                boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.40)'
              }}
              className="w-full text-white py-3.5 rounded-xl font-bold shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 border-none"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Identifying Industry...</span>
                </>
              ) : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyStageScreen;