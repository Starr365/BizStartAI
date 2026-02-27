import React, { useEffect, useState } from "react";
import { ChevronLeft, BookOpen, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const LearnPage = () => {
  const navigate = useNavigate();
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pull the same recommendations generated on the Dashboard
    const cache = localStorage.getItem('ai_lessons_cache');
    if (cache) {
      setRecommendedCourses(JSON.parse(cache));
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex justify-center overflow-auto pb-24 p-4">
      <div className="w-full max-w-md flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full bg-gray-50 text-gray-600 active:scale-90 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Learn</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <div className="text-center px-4">
          <p className="text-sm text-gray-500 italic max-w-62.5 mx-auto text-center leading-relaxed">
            Based on your profile, <br />
            we've curated the perfect starting point.
            </p>
        </div>

        {/* Recommended Section */}
        <section>
          <h2 className="font-semibold text-gray-700 mb-4">Recommended for You</h2>
          
          {isLoading ? (
            <div className="animate-pulse flex flex-col gap-4">
              <div className="h-32 bg-gray-100 rounded-2xl w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
                {recommendedCourses.map((course, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl p-5 shadow-sm bg-white flex justify-between items-start gap-3">
                    <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4 leading-relaxed">
                        {course.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                        <BookOpen size={14} className="text-[#6E62B1]" /> {course.lessons} Lessons
                        </span>
                        <span className="flex items-center gap-1">
                        <Clock size={14} className="text-[#6E62B1]" /> {course.duration} Minutes
                        </span>
                        <span className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500" /> {course.level}
                        </span>
                    </div>
                    </div>

                    {/* FIX IS HERE: Changed lesson.id to idx or course.title and passed course in state */}
                    <button 
                    onClick={() => navigate(`/course/${encodeURIComponent(course.title)}`, { state: { course } })}
                    className="bg-[#5EB16E] text-white px-4 py-1.5 rounded-lg text-sm font-semibold active:scale-95 transition-all"
                    >
                    Start
                    </button>
                </div>
                ))}
            </div>
          )}
        </section>

        {/* Static Modules Section (as per your screenshot) */}
        <section>
          <h2 className="font-semibold text-gray-700 mb-4">Available Modules</h2>
          <div className="border border-gray-100 rounded-2xl p-5 bg-white opacity-60">
             <div className="flex justify-between items-start">
               <div>
                  <h3 className="font-bold text-gray-800">Financial Planning</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">Master budgeting and forecasting.</p>
               </div>
               <button className="bg-gray-300 text-white px-5 py-2 rounded-xl text-sm">Start</button>
             </div>
          </div>
        </section>

        <BottomNav />
      </div>
    </div>
  );
};

export default LearnPage;