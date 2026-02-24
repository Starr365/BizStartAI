import React from 'react';

const PageWrapper = ({ children, className = '' }) => {
    return (
        <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden">
            <div className={`w-full max-w-[380px] h-full flex flex-col px-6 py-6 overflow-y-auto hide-scrollbar ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
