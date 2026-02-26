import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaApple, FaLock, FaEyeSlash, FaEye, FaChevronLeft } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
import toast, { Toaster } from 'react-hot-toast';
import api from '../api';
import PageWrapper from '../components/PageWrapper';
import PrimaryButton from '../components/PrimaryButton';

const SignupScreen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send the Google token to your backend
        const res = await api.post('/auth/google', {
          access_token: tokenResponse.access_token
        });

        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userAccount', JSON.stringify(res.data.user));
          toast.success('Successfully logged in with Google!');
          setTimeout(() => navigate('/BusinessJourney'), 1000);
        }
      } catch (error) {
        toast.error('Google login failed. Please try again.');
      }
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

  const handleCreateAccount = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields to continue');
      return;
    }

    try {
      await api.post('/auth/register', formData);

      // Auto-login
      const loginRes = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (loginRes.data.success) {
        localStorage.setItem('token', loginRes.data.token);
        localStorage.setItem('userAccount', JSON.stringify(loginRes.data.user)); // use data from login
        toast.success('Account created successfully!');
        setTimeout(() => navigate('/BusinessJourney'), 1000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create account. Please try again.';
      toast.error(errorMsg);
    }
  };

  return (
    <PageWrapper>
      <Toaster
        position="top-right"
        reverseOrder={false}
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

      <div className="flex-1 flex flex-col ">
        {/* Header Section */}
        <div className="relative flex items-center justify-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer"
          >
            <FaChevronLeft size={16} />
          </button>

          <h1 className="text-slate-900 font-sans font-light text-[22px] tracking-tight">
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
              className="w-full p-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-primary transition-colors text-base placeholder:text-sm" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-900 font-sans">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email address"
              className="w-full p-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-primary transition-colors text-base placeholder:text-sm"
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
                className="w-full p-3.5 pl-10 rounded-xl border border-gray-200 bg-white outline-none focus:border-primary transition-colors text-base placeholder:text-sm"
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
        <PrimaryButton onClick={handleCreateAccount} className="mt-6">
          Create Account
        </PrimaryButton>

        {/* Existing User Login Link */}
        <p className="text-center text-sm text-slate-600 mt-4 font-sans">
          Already have an account? <button onClick={() => navigate('/login')} className="text-primary font-semibold hover:underline cursor-pointer">Login</button>
        </p>

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
      </div>
    </PageWrapper>
  );
};

export default SignupScreen;