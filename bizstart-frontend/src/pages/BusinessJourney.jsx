import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import RocketImg from '../assets/Rocket.png';
import LightImg from '../assets/Light.png';
import TargetImg from '../assets/Target.png';
import PageWrapper from '../components/PageWrapper';
import PrimaryButton from '../components/PrimaryButton';

const BusinessJourneyScreen = () => {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);

  const stages = [
    { id: 'idea', title: 'Idea Stage', desc: "Exploring my business potential", img: LightImg },
    { id: 'early', title: 'Early Stage', desc: "Building my first customers", img: TargetImg },
    { id: 'growth', title: 'Growth Stage', desc: 'Operational and ready to grow', img: RocketImg },
  ];

  return (
    <PageWrapper className="mt-2 px-6 py-6">
      <div className="flex-1 flex flex-col justify-start gap-8">

        {/* Top Section Group */}
        <div className="w-full">
          {/* Header Section */}
          <div className="relative w-full flex items-center justify-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 w-11 h-11 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer"
            >
              <FaChevronLeft size={14} />
            </button>

            <h1 className="text-slate-900 font-sans font-light text-[22px] tracking-[-0.02em]">
              Your Business Journey
            </h1>
          </div>

          {/* Subtext - Now stays close to header */}
          <p className="font-sans font-light text-[14px] leading-[150%] text-center text-[#64748b] mb-0">
            Tell me where you are so i can <br />
            personalize your experience!
          </p>
        </div>

        {/* Cards & Button Group - Pushed down slightly by the gap-8 above */}
        <div className="w-full pb-4">
          <div className="w-full flex flex-col gap-3">
            {stages.map((stage) => (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${selectedStage === stage.id
                    ? 'border-primary bg-indigo-50/20 shadow-sm'
                    : 'border-gray-100 bg-white shadow-sm'
                  }`}
              >
                <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                  <img src={stage.img} alt={stage.title} className="max-w-full max-h-full object-contain" />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-slate-900 font-display font-light text-[15.5px] leading-[22px]">
                    {stage.title}
                  </h3>
                  <p className="text-slate-400 font-sans font-normal text-[12.5px] leading-[18px]">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {selectedStage && (
            <PrimaryButton
              onClick={() => {
                const existingData = JSON.parse(localStorage.getItem('userAccount') || '{}');
                const updatedData = { ...existingData, stage: selectedStage };
                localStorage.setItem('userAccount', JSON.stringify(updatedData));
                if (selectedStage === 'idea') navigate('/IdeaStage');
                else if (selectedStage === 'early') navigate('/EarlyStage');
                else if (selectedStage === 'growth') navigate('/GrowthStage');
              }}
              className="mt-6"
            >
              Continue
            </PrimaryButton>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default BusinessJourneyScreen;