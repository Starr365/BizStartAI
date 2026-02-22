import React from 'react';
import ReactDOM from 'react-dom/client'; // Missing this!
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // Added BrowserRouter
import Home from './components/Home'
import Onboarding from './components/Onboarding';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BusinessJourney from './pages/BusinessJourney';
import IdeaStage from './pages/IdeaStage';
import Industry from './pages/Industry';
import EarlyStage from './pages/EarlyStage';
import GrowthStage from './pages/GrowthStage';
import FinishSetup from './pages/FinishSetup';
import Dashboard from './pages/Dashboard';
import ProgressDashboard from "./pages/ProgressDashboard";
import AIMentor from "./pages/AIMentor";
import { GoogleOAuthProvider } from '@react-oauth/google';

// 1. Define the App component first
function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/IdeaStage" element={<IdeaStage />} />
          <Route path="/Onboarding" element={<Onboarding />} />
          <Route path="/BusinessJourney" element={<BusinessJourney />} />
          <Route path="/Industry" element={<Industry />} />
          <Route path="/login" element={<Login />} />
          <Route path="/EarlyStage" element={<EarlyStage />} />
          <Route path="/GrowthStage" element={<GrowthStage />} />
          <Route path="/FinishSetup" element={<FinishSetup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="/chat" element={<AIMentor />} />
        </Routes>
      </main>
    </div>
  );
}

// 2. Render it to the DOM


export default App;