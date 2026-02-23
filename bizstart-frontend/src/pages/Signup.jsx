import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaApple, FaGoogle, FaLock, FaEyeSlash, FaEye, FaChevronLeft } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
// 1. Import toast and Toaster
import toast, { Toaster } from 'react-hot-toast';

const SignupScreen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Success! Token:", response.access_token);
      toast.success('Successfully logged in with Google!');
      // ADDED: Delay navigation so user can see the success toast
      setTimeout(() => navigate('/BusinessJourney'), 1000); 
    },
    onError: () => toast.error('Google Login Failed. Please try again.'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleCreateAccount = () => {
    if (!formData.name || !formData.phoneNumber || !formData.password) {
      toast.error('Please fill in all fields to continue');
      return;
    }

    // 1. Get the current list of users (or an empty array if none exist)
    const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');

    // 2. Check if the user already exists (optional but recommended)
    const userExists = existingUsers.find(u => u.phoneNumber === formData.phoneNumber);
    if (userExists) {
      toast.error('An account with this phone number already exists!');
      return;
    }

    // 3. Add the new user to the array
    const updatedUsers = [...existingUsers, formData];

    // 4. Save the updated list and also set the "current session" user
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('userAccount', JSON.stringify(formData)); 

    toast.success('Account created successfully!');
    setTimeout(() => navigate('/BusinessJourney'), 1000);
  };

  return (
    <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden">
      {/* UPDATED: Position set to top-right and added custom animation class */}
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          className: 'custom-toast',
          duration: 3000,
        }}
      />

      {/* ADDED: CSS for the slide-in animation from the right */}
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
        <div className="flex-1 flex flex-col ">
          
          {/* Header Section */}
          <div className="relative flex items-center justify-center mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer"
            >
              <FaChevronLeft size={16} />
            </button>
            
            <h1 
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontWeight: '300',
                fontSize: '22px', 
                letterSpacing: '-0.02em'
              }}
              className="text-slate-900"
            >
              Create your Account
            </h1>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-900 font-sans">Name</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="What should I call you?" 
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#6E62B1] transition-colors text-base placeholder:text-sm"                   />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-900 font-sans">Phone Number</label>
              <input 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type="tel" 
                placeholder="Enter phone number" 
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#6E62B1] transition-colors text-base placeholder:text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-900 font-sans">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock size={14} />
                </span>
                <input 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a safe password" 
                  className="w-full p-3.5 pl-10 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#6E62B1] transition-colors text-base placeholder:text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button 
            onClick={handleCreateAccount}
            style={{ 
              backgroundColor: '#6E62B1',
              boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.40)',
              textShadow: '0px 1px 4px rgba(0, 0, 0, 0.40)'
            }}
            className="w-full text-white py-3.5 rounded-xl font-medium text-base transition-all active:scale-[0.98] mt-6 cursor-pointer border-none"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-400 text-xs">Or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white font-medium text-sm text-slate-800 cursor-pointer">
              <FaApple size={18} />
              Sign in with Apple
            </button>
            
            <button 
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white font-medium text-sm text-slate-800 cursor-pointer"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" className="w-4 h-4" />
              Sign in with Google
            </button>
          </div>

          <p className="text-center text-xs text-slate-600 mt-6 font-sans">
            Already have an account? <button onClick={() => navigate('/login')} className="text-[#6E62B1] font-semibold hover:underline cursor-pointer">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;