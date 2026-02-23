import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import RocketImg from '../assets/Rocket.png';
import LightImg from '../assets/Light.png';
import TargetImg from '../assets/Target.png';

const BusinessJourneyScreen = () => {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);

  const stages = [
    { id: 'idea', title: 'Idea Stage', desc: "Exploring my business potential", img: LightImg },
    { id: 'early', title: 'Early Stage', desc: "Building my first customers", img: TargetImg },
    { id: 'growth', title: 'Growth Stage', desc: 'Operational and ready to grow', img: RocketImg },
  ];

  return (
    <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden mt-2">
      <div 
        style={{ width: '100%', maxWidth: '380px', height: '100%' }} 
        className="flex flex-col px-6 py-6"
      >
        {/* UPDATED: Changed justify-between to justify-start and added a gap */}
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
              
              <h1 
                style={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '300',
                  fontSize: '22px',
                  letterSpacing: '-0.02em',
                
                }}
                className="text-slate-900"
              >
                Your Business Journey
              </h1>
            </div>

            {/* Subtext - Now stays close to header */}
            <p 
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontWeight: '300',
                fontSize: '14px',
                lineHeight: '150%',
                textAlign: 'center',
                color: '#64748b',
              }}
              className="mb-0"
            >
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
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${
                    selectedStage === stage.id 
                    ? 'border-[#6E62B1] bg-indigo-50/20 shadow-sm' 
                    : 'border-gray-100 bg-white shadow-sm'
                  }`}
                >
                  <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                    <img src={stage.img} alt={stage.title} className="max-w-full max-h-full object-contain" />
                  </div>

                  <div className="flex flex-col">
                    <h3 style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif", fontWeight: '300', fontSize: '15.5px', lineHeight: '22px' }} className="text-slate-900">
                      {stage.title}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '400', fontSize: '12.5px', lineHeight: '18px' }} className="text-slate-400">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {selectedStage && (
              <button 
  onClick={() => {
    // 1. Retrieve the existing user account data
    const existingData = JSON.parse(localStorage.getItem('userAccount') || '{}');

    // 2. Add the selected stage to that specific user object
    const updatedData = { ...existingData, stage: selectedStage };

    // 3. Save the merged data back to storage
    localStorage.setItem('userAccount', JSON.stringify(updatedData));

    // 4. Navigate to the specific stage screen
    if (selectedStage === 'idea') navigate('/IdeaStage'); 
    else if (selectedStage === 'early') navigate('/EarlyStage'); 
    else if (selectedStage === 'growth') navigate('/GrowthStage');
  }}
  style={{ 
    backgroundColor: '#6E62B1',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '500',
    fontSize: '16px',
    textShadow: '0px 1px 4px rgba(0, 0, 0, 0.40)', 
    boxShadow: '0px 2px 8px rgba(110, 98, 177, 0.25)',
  }}
  className="w-full text-white py-4 rounded-2xl transition-all active:scale-[0.98] mt-6 cursor-pointer border-none outline-none"
>
  Continue
</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessJourneyScreen;