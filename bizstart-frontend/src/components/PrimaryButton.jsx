import React from 'react';

const PrimaryButton = ({ onClick, children, className = '', disabled = false, style = {} }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={style}
            className={`w-full bg-primary text-white py-3.5 rounded-xl font-medium font-sans text-base transition-all active:scale-[0.98] cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed btn-shadow ${className}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
