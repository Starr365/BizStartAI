import React from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessThumb from '../assets/SuccessThumb.png';
import PageWrapper from '../components/PageWrapper';
import PrimaryButton from '../components/PrimaryButton';

const SuccessScreen = () => {
  const navigate = useNavigate();

  // Retrieve user data for potential personalization
  // const userData = JSON.parse(localStorage.getItem('userAccount') || '{}');

  return (
    <PageWrapper className="px-6 py-6 h-dvh">
      <div className="flex-1 flex flex-col justify-center items-center text-center">

        {/* Success Illustration */}
        <div className="mb-10">
          <img
            src={SuccessThumb}
            alt="Success"
            className="w-24 h-auto"
          />
        </div>

        {/* Success Header */}
        <h1 className="text-slate-900 font-sans font-extralight text-[28px] leading-[120%] tracking-[-0.02em] mb-4">
          You're All Set!
        </h1>

        {/* Success Subtext */}
        <p className="text-[#666666] font-sans font-extralight text-[13px] leading-[140%] text-center max-w-[300px] mt-2 mb-[60px]">
          Welcome to BizStart AI, your business paddy! <br />
          Your personalized dashboard is ready <br />
          and we've created a custom learning path just for you.
        </p>

        {/* Final Action Button */}
        <PrimaryButton onClick={() => navigate('/Dashboard')}>
          Go to Dashboard
        </PrimaryButton>
      </div>
    </PageWrapper>
  );
};

export default SuccessScreen;