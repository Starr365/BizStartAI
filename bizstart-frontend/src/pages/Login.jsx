import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaApple, FaLock, FaEnvelope, FaEyeSlash, FaEye, FaChevronLeft } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
import toast, { Toaster } from 'react-hot-toast';
import api from '../api';
import PageWrapper from '../components/PageWrapper';
import PrimaryButton from '../components/PrimaryButton';

const LoginScreen = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const googleLogin = useGoogleLogin({
    scope: 'openid profile email',          // <-- ADD THIS
    onSuccess: async (tokenResponse) => {
      try {
        // Send the ID token (not access_token) to your backend
        const res = await api.post('/auth/google', {
          credential: tokenResponse.id_token   // <-- CHANGE THIS
        });

        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userAccount', JSON.stringify(res.data.data)); // note: backend returns data
          toast.success('Successfully logged in with Google!');
          setTimeout(() => navigate('/BusinessJourney'), 1000);
        }
      } catch (error) {
        toast.error('Google login failed. Please try again.');
      }
    },
    onError: () => toast.error('Google Login Failed. Please try again.'),
  });

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in both email and password.');
      return;
    }

    try {
      const loginRes = await api.post('/auth/login', { email, password });

      if (loginRes.data.success) {
        localStorage.setItem('token', loginRes.data.token);
        localStorage.setItem('userAccount', JSON.stringify(loginRes.data.user));

        toast.success('Login successful!');
        setTimeout(() => navigate('/BusinessJourney'), 1000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
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
      <div className="flex-1 flex flex-col justify-between">
        {/* Header Section */}
        <div className="relative flex items-center justify-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer"
          >
            <FaChevronLeft size={14} />
          </button>

          <h1 className="text-slate-900 font-sans font-normal text-[22px] tracking-tight">
            Welcome Back!
          </h1>
        </div>

        <p className="font-sans font-light text-[13px] text-center text-[#666666] mb-8">
          Your business paddy is ready to help
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-slate-900 font-sans font-medium text-[15px]">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaEnvelope size={14} />
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className="w-full p-3.5 pl-10 pr-10 rounded-xl border border-gray-200 bg-white outline-none focus:border-primary transition-colors placeholder:text-gray-400 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-900 font-sans font-medium text-[15px]">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaLock size={14} />
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full p-3.5 pl-10 pr-10 rounded-xl border border-gray-200 bg-white outline-none focus:border-primary transition-colors placeholder:text-gray-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer hover:text-gray-500"
              >
                {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
              </button>
            </div>

            <button className="text-right text-primary text-xs font-medium mt-1 hover:underline cursor-pointer">
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Login Button */}
        <PrimaryButton onClick={handleLogin} className="mt-4">
          Login
        </PrimaryButton>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-600 my-4 font-sans">
          Don&apos;t have an account? <button onClick={() => navigate('/signup')} className="text-primary font-semibold hover:underline cursor-pointer">Create Account</button>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-gray-400 text-xs">Or</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3">
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white font-medium text-sm text-slate-800 transition-all hover:bg-gray-50 cursor-pointer">
            <FaApple size={18} />
            Login with Apple
          </button>

          <button
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white font-medium text-sm text-slate-800 transition-all hover:bg-gray-50 cursor-pointer active:scale-[0.98]"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" className="w-4 h-4" />
            Login with Google
          </button>
        </div>

      </div>
    </PageWrapper >
  );
};

export default LoginScreen;