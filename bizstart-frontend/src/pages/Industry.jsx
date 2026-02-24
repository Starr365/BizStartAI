import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Beauty from '../assets/Beauty.png';
import Retail from '../assets/Retail.png';
import Gown from '../assets/Gown.png';
import Small from '../assets/Small.png';
import Service from '../assets/Service.png';
import SuccessThumb from '../assets/SuccessThumb.png';
import PageWrapper from '../components/PageWrapper';
import PrimaryButton from '../components/PrimaryButton';

const SelectIndustryScreen = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(() => {
    const data = JSON.parse(localStorage.getItem('userAccount') || '{}');
    return data.suggestedIndustry || 'beauty';
  });




  const allIndustries = [
    { id: 'beauty', title: 'Beauty & Personal Care', desc: 'Includes skincare, soap making, and hair products', img: Beauty },
    { id: 'retail', title: 'Retail & General Trade', desc: 'If you just buy and sell finished products', img: Retail },
    { id: 'small-scale', title: 'Small-Scale Production', desc: 'If you manufacture the soaps yourself', img: Small },
    { id: 'service', title: 'Service Provider', desc: 'If you offer skincare consultations or spa services', img: Service },
    { id: 'fashion', title: 'Fashion & Lifestyle', desc: 'If you sell beauty alongside clothes and accessories', img: Gown }
  ];

  const currentSelection = allIndustries.find(item => item.id === selectedId);
  const otherIndustries = allIndustries.filter(item => item.id !== selectedId);

  // 1. Add this state at the top of your component
  const [isNavigating, setIsNavigating] = useState(false);

  // 2. Update your handleContinue function
  const handleContinue = () => {
    setIsNavigating(true); // 1. Trigger the loading state immediately

    // 2. Start both the image loading and a minimum timer at the same time
    const imagePromise = new Promise((resolve) => {
      const img = new Image();
      img.src = SuccessThumb;
      img.onload = resolve;
      img.onerror = resolve; // Proceed even if image fails
    });

    const timerPromise = new Promise((resolve) => setTimeout(resolve, 800));

    // 3. Wait for BOTH the image and the timer to finish before navigating
    Promise.all([imagePromise, timerPromise]).then(() => {
      const existingData = JSON.parse(localStorage.getItem('userAccount') || '{}');
      localStorage.setItem('userAccount', JSON.stringify({ ...existingData, industry: selectedId }));
      navigate('/FinishSetup');
    });
  };

  return (
    <PageWrapper className="px-6 py-4">
      {/* THE CHANGE: Changed justify-between to justify-center and added gap-8 */}
      <div className="flex-1 flex flex-col gap-8 mt-2">

        {/* GROUP 1: Header and Instructions */}
        <div>
          <div className="relative w-full flex items-center justify-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer outline-none ring-0"
            >
              <FaChevronLeft size={14} />
            </button>
            <h1 className="text-slate-900 font-sans font-light text-[22px]">
              Select your Industry
            </h1>
          </div>

          <p className="text-[#666666] font-sans font-light text-[13px] text-center mb-0">
            Based on your idea, I’ve picked the best category for you
          </p>
        </div>

        {/* GROUP 2: Everything else */}
        <div className="w-full">
          {/* DYNAMIC TOP CARD */}
          <div className="w-full flex items-start gap-4 p-4 rounded-2xl border border-primary bg-primary text-white shadow-lg mb-6 transition-all duration-300 outline-none ring-0">
            <div className="mt-1 w-7 h-7 shrink-0">
              <img
                src={currentSelection.img}
                alt="Icon"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-sans font-light text-[16px]">
                {currentSelection.title}
              </h3>
              <p className="font-sans font-light text-[12px]">
                {currentSelection.desc}
              </p>
            </div>
          </div>

          <p className="text-slate-500 font-sans font-light text-[12px] text-center mb-4">
            Not the right fit? Pick another one below:
          </p>

          <div
            className="w-full flex flex-col gap-2.5 overflow-y-auto max-h-56 pr-1 mb-6 hide-scrollbar"
          >
            {otherIndustries.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 bg-white shadow-sm transition-all cursor-pointer active:scale-[0.98] outline-none ring-0 hover:border-primary"
              >
                <div className="mt-1 w-6 h-6 shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-slate-900 font-sans font-light text-[14px]">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-sans font-light text-[12px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <PrimaryButton
            onClick={handleContinue}
            disabled={isNavigating}
            className="flex items-center justify-center gap-2"
          >
            {isNavigating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Finalizing...</span>
              </>
            ) : (
              "Continue"
            )}
          </PrimaryButton>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SelectIndustryScreen;