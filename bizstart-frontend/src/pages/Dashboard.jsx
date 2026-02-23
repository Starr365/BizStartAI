import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import Logo from "../assets/bizstart-ai.png";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { Home, Briefcase, MessageSquare, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(true);
  const PRIMARY = "#6E62B1"; // ADD THIS LINE HERE

useEffect(() => {
  const savedData = localStorage.getItem('userAccount');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    setUserName(parsedData.name || "Business Owner");
    
    // Check if we already have data
    const cache = localStorage.getItem('ai_lessons_cache');
    if (cache) {
      setRecommendedCourses(JSON.parse(cache));
      setIsAiLoading(false);
    } else {
      // ONLY call if cache is empty
      generateAIRecommendations(parsedData);
    }
  }
}, []);

  const generateAIRecommendations = async (userData) => {
    try {
           const genAI = new GoogleGenerativeAI("AIzaSyCvDPGH154PJk1pakpHV_PVgq9erhld2Is");
           const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        Business: ${userData.businessName}
        Industry: ${userData.suggestedIndustry}
        Stage: ${userData.stage}

        Recommend 2 unique business lessons. 
        CRITICAL: Each description must be exactly 5 to 7 words long. 
        
        For each lesson, also provide:
        1. A realistic number of lessons (between 3 and 8).
        2. A total duration in minutes (between 15 and 45).

        Return ONLY a JSON array in this format:
        [
          {
            "title": "Lesson Name", 
            "description": "Exactly six words long description",
            "lessons": 5,
            "duration": 30
          }
        ]
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const cleanJson = text.replace(/```json|```/g, "").trim();
      const aiData = JSON.parse(cleanJson);

      const formattedData = aiData.map(item => ({
        ...item,
        level: userData.stage === 'growth' ? 'Advanced' : 'Beginner'
      }));

      // 2. SAVE TO CACHE: Store the result so refreshing doesn't use quota
      localStorage.setItem('ai_lessons_cache', JSON.stringify(formattedData));
      setRecommendedCourses(formattedData);
    } catch (error) {
  console.error("AI Fetch Error:", error);
  
  const fallback = [
    { title: "Market Entry", description: "Learn how to find customers.", lessons: 5, duration: 25, level: "Beginner" },
    { title: "Business Strategy", description: "Build a plan for growth.", lessons: 4, duration: 20, level: "Beginner" }
  ];

  // ADD THIS: Save the fallback so the app stops re-triggering the 429 error
  localStorage.setItem('ai_lessons_cache', JSON.stringify(fallback));
  setRecommendedCourses(fallback);
}
  };

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

        <div style={{ backgroundColor: "#6E62B1" }} className="text-white rounded-2xl p-4">
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
                <div className="w-6 h-6 border-2 border-[#6E62B1] border-t-transparent rounded-full animate-spin mb-2" />
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
                    style={{ backgroundColor: "#6E62B1" }} 
                    className="text-white px-4 py-2 rounded-lg text-sm mt-4 md:mt-auto self-start cursor-pointer transition-all active:scale-95"
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
          <div className="fixed bottom-0 left-0 w-full md:hidden border-t bg-white flex justify-around items-center text-[10px] py-2 shadow-lg z-50">
            {/* Home - Active State */}
            <div 
              className="flex flex-col items-center gap-1 cursor-pointer" 
              style={{ color: PRIMARY }}
              onClick={() => navigate('/dashboard')}
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </div>

            {/* Tools */}
            <div 
              className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-[#6E62B1] transition-colors"
              onClick={() => navigate('/tools')}
            >
              <Briefcase size={20} />
              <span>Tools</span>
            </div>

            {/* AI Mentor */}
            <div 
              className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-[#6E62B1] transition-colors"
              onClick={() => navigate('/chat')} // Matches your AIMentor route
            >
              <MessageSquare size={20} />
              <span>AI Mentor</span>
            </div>

            {/* Profile */}
            <div 
              className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-[#6E62B1] transition-colors"
              onClick={() => navigate('/profile')}
            >
              <User size={20} />
              <span>Profile</span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;