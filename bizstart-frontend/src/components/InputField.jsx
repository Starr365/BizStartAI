import React from 'react';

// Props: label (top text), placeholder (inside box), hint (bottom text)
const InputField = ({ label, placeholder, hint }) => {
  return (
    <div className="px-6 mb-6">
      <label className="block text-gray-800 font-bold mb-2">
        {label}
      </label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      {hint && (
        <p className="mt-2 text-sm text-gray-500 italic">
          {hint}
        </p>
      )}
    </div>
  );
};

export default InputField;