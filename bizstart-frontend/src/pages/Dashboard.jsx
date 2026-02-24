import React, { useEffect, useState } from "react";
import { Bell, Home, Briefcase, MessageSquare, User } from "lucide-react";
import Logo from "../assets/bizstart-ai.png";
import { useNavigate } from "react-router-dom"; // Added for navigation
import api from "../api";
import BottomNav from "../components/BottomNav";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState(() => {
    try {
      const saved = localStorage.getItem('userAccount');
      return saved ? (JSON.parse(saved).name || "Business Owner") : "Guest";
    } catch {
      return "Guest";
    }
  });
  const [recommendedCourses, setRecommendedCourses] = useState(() => {
    try {
      const cache = localStorage.getItem('ai_lessons_cache');
      return cache ? JSON.parse(cache) : [];
    } catch {
      return [];
    }
  });
  const [isAiLoading, setIsAiLoading] = useState(() => {
    try {
      const cache = localStorage.getItem('ai_lessons_cache');
      return !cache; // If there's no cache, we are loading
    } catch {
      return true;
    }
  });
  const PRIMARY = "#6E62B1"; // ADD THIS LINE HERE

  useEffect(() => {
    let mounted = true;

    async function fetchRecommendations(userData) {
      try {
        const res = await api.post('/recommendations', {
          businessName: userData.businessName,
          industry: userData.suggestedIndustry,
          stage: userData.stage
        });

        if (!mounted) return;

        const aiData = res.data?.data || res.data || [];
        const formattedData = aiData.map(item => ({
          ...item,
          level: userData.stage === 'growth' ? 'Advanced' : 'Beginner'
        }));

        localStorage.setItem('ai_lessons_cache', JSON.stringify(formattedData));
        setRecommendedCourses(formattedData);
        setIsAiLoading(false);
      } catch (error) {
        console.error("AI Fetch Error:", error);
        if (!mounted) return;

        const fallback = [
          { title: "Market Entry", description: "Learn how to find customers.", lessons: 5, duration: 25, level: "Beginner" },
          { title: "Business Strategy", description: "Build a plan for growth.", lessons: 4, duration: 20, level: "Beginner" }
        ];

        localStorage.setItem('ai_lessons_cache', JSON.stringify(fallback));
        setRecommendedCourses(fallback);
        setIsAiLoading(false);
      }
    }

    const savedData = localStorage.getItem('userAccount');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const cache = localStorage.getItem('ai_lessons_cache');
      if (!cache) {
        fetchRecommendations(parsedData);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  const exploreOptions = [
    { icon: "🤖", title: "Refine Your Idea", description: "Chat with AI to strengthen your business concept" },
    { icon: "📋", title: "Create Your Plan", description: "Generate your first business plan with AI assistance" }
  ];

  return (
    <div className="w-full min-h-screen bg-white flex justify-center overflow-auto p-4">
      <div className="w-full max-w-300 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <img src={Logo} alt="BizStart AI" className="h-10 object-contain" />
          <Bell stroke="black" size={22} className="cursor-pointer" />
        </div>

        <div className="bg-primary text-white rounded-2xl p-4">
          <p className="font-semibold">Welcome {userName}, I am your business paddy!</p>
          <p className="text-sm opacity-90 mt-1">
            You're at the beginning of an exciting journey. Let’s turn your idea into reality together!
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isAiLoading ? (
              <div className="col-span-full py-10 flex flex-col items-center justify-center text-gray-400">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-xs">Paddy is personalizing your lessons...</p>
              </div>
            ) : (
              recommendedCourses.map((course, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <h3 className="font-semibold text-gray-800">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {course.description}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-3 flex-wrap">
                      <span>📖 {course.lessons} Lessons</span>
                      <span>⏱ {course.duration} Minutes</span>
                      <span>⭐ {course.level}</span>
                    </div>
                  </div>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm mt-4 md:mt-auto self-start cursor-pointer transition-all active:scale-95"
                  >
                    Start
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Explore More</h2>
          <div className="grid grid-cols-2 gap-4">
            {exploreOptions.map((option, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (option.title === "Refine Your Idea") navigate('/chat');
                  if (option.title === "Create Your Plan") navigate('/BusinessPlan');
                }}
                className="bg-gray-100 rounded-2xl p-4 text-center cursor-pointer hover:bg-gray-200 transition-colors active:scale-95"
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <p className="font-medium text-sm">{option.title}</p>
                <p className="text-[10px] text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Fixed Bottom Navigation */}
        <BottomNav />
      </div>
    </div >
  );
};

export default Dashboard;