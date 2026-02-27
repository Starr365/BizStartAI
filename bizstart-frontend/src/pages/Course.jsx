import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // Cleaned up imports
import { ChevronLeft, BookOpen, Clock, CheckCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Course = () => {
  const { state } = useLocation();
  const { id } = useParams(); // 'id' will be the course title from the URL
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fallback in case state is lost on page refresh
  const course = state?.course || { title: decodeURIComponent(id) };

  useEffect(() => {
    const fetchModuleContent = async () => {
      try {
        // Warning: Move this key to a .env file later for security
        const genAI = new GoogleGenerativeAI("AIzaSyBg4lDgTf6HbClDxqmhWCWe5lTugaHnpws");
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Inside fetchModuleContent in Course.jsx
        const prompt = `
        For the business course "${course.title}", provide:
        1. A syllabus of 6 lessons with titles and durations.
        2. A specific YouTube Video ID for each lesson.
        3. A list of 3 relevant downloadable resources (e.g., templates, guides).
        
        Return ONLY as JSON:
        {
            "whatYoullLearn": ["point 1", "point 2"],
            "lessons": [
            { "id": 1, "title": "Lesson Name", "duration": "5 min", "youtubeId": "ID" }
            ],
            "resources": [
            { "title": "Resource Name", "type": "PDF", "detail": "2 pages • 250 KB" },
            { "title": "Checklist Name", "type": "XLSX", "detail": "1 sheet • 100 KB" }
            ]
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const cleanJson = text.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanJson);
        
        setDetails(data);
      } catch (err) {
        console.error("Course AI Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (course.title) fetchModuleContent();
  }, [course.title]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
      <div className="w-8 h-8 border-4 border-[#6E62B1] border-t-transparent rounded-full animate-spin mb-4" />
      <p>Paddy is generating your syllabus...</p>
    </div>
  );

  return (
    <div className="p-4 max-w-md mx-auto pb-24 bg-white min-h-screen">
      {/* Header & Progress Card */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 p-2 bg-white rounded-full shadow-md active:scale-95 transition-transform"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
        <h1 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{course.description || "Personalized module for your business."}</p>
        <div className="flex gap-4 text-[10px] text-gray-500 mb-4 font-medium">
          <span className="flex items-center gap-1"><BookOpen size={14} className="text-[#6E62B1]"/> {course.lessons || 6} Lessons</span>
          <span className="flex items-center gap-1"><Clock size={14} className="text-[#6E62B1]"/> {course.duration || 30} Min</span>
          <span className="flex items-center gap-1"><CheckCircle size={14} className="text-[#6E62B1]"/> 0/6 Completed</span>
        </div>
        <div className="flex justify-between items-center text-[10px] mb-1 font-semibold text-gray-400">
          <span>Module Progress</span>
          <span className="text-[#6E62B1]">0%</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="bg-[#6E62B1] h-full w-[2%]" />
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-800 mb-3">What You'll Learn</h2>
        <div className="border border-gray-100 rounded-2xl p-4 space-y-3 shadow-sm">
          {details?.whatYoullLearn.map((point, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <CheckCircle size={16} className="mt-0.5 text-gray-300" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lessons List */}
      <div>
        <h2 className="font-bold text-gray-800 mb-3">Lessons</h2>
        {details?.lessons.map((lesson) => (
          <div 
            key={lesson.id}
            className="border border-gray-100 rounded-2xl p-4 mb-3 flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="text-sm font-bold text-gray-800">{lesson.id}. {lesson.title}</p>
              <p className="text-xs text-gray-500 font-medium">{lesson.duration}</p>
            </div>
                <button 
                  onClick={() => navigate(`/course/${course.title}/lesson/${lesson.id}`, { 
                    state: { 
                      lesson, 
                      youtubeId: lesson.youtubeId, 
                      courseTitle: course.title,
                      totalLessons: details.lessons.length,
                      resources: details.resources 
                    } 
                  })}
                  className="bg-[#5EB16E] text-white px-5 py-2 cursor-pointer rounded-xl text-sm font-bold shadow-sm active:scale-95 active:bg-[#4e9a5b] transition-all"
                >
                  Start
                </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;