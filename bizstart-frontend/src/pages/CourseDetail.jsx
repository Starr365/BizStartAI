import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Download } from "lucide-react"; // Added Download icon

/**
 * CourseDetail Component
 * Displays specific lesson content, video player, and progress.
 * Expects state from navigation: { lesson, youtubeId, courseTitle, totalLessons, resources }
 */
const CourseDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);  
  
  // NEW: State for toggling between Content, Resources, and Notes
  const [activeTab, setActiveTab] = useState("content");
  
  // Destructure data, including the AI-generated 'resources' array
  const { lesson, youtubeId, courseTitle, totalLessons, resources } = location.state || {};

  // Guard clause: If someone navigates here directly without state, send them back
  if (!lesson) {
    return (
      <div className="p-10 text-center flex flex-col items-center gap-4">
        <p className="text-gray-500">Lesson data not found.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="text-[#6E62B1] font-bold underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (youtubeId) {
      setVideoUrl(
        `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`
      );
    } else if (lesson?.title) {
      setVideoUrl(
        `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
          lesson.title + " tutorial"
        )}`
      );
    }
  }, [lesson.title, youtubeId]);

  // Calculate progress percentage based on current lesson ID
  const progressPercent = Math.round((lesson.id / (totalLessons || 6)) * 100);

  return (
    <div className="w-full min-h-screen bg-white flex justify-center p-4 pb-10">
      <div className="w-full max-w-md flex flex-col gap-6">
        
        {/* Header with Lesson Count */}
        <div className="flex items-center justify-between pt-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 rounded-2xl bg-gray-50 text-gray-600 active:scale-90 transition-transform shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-medium text-gray-800">
            Lesson {lesson.id} of {totalLessons || 6}
          </h1>
          <div className="w-12" />
        </div>

        {/* Dynamic Progress Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-400">Lesson Progress</span>
            <span className="text-sm font-bold text-[#6E62B1]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-[#6E62B1] h-full transition-all duration-700 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[12px] text-gray-400 mt-3 text-center">
            All sections generated and ready to review
          </p>
        </div>

        {/* Video Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">{lesson.title}</h2>
         <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-lg">
            {loadingVideo ? (
                <div className="flex items-center justify-center h-full text-white text-sm">
                Loading video...
                </div>
            ) : videoUrl ? (
                <iframe
                className="w-full h-full"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
            ) : (
                <div className="flex items-center justify-center h-full text-white text-sm">
                Video not available for this lesson.
                </div>
            )}
            </div>
        </div>

        {/* Action Tabs - CORRECTION: Added onClick and Active Styling */}
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveTab("content")}
            className={`flex-1 py-3 rounded-xl font-semibold active:scale-95 transition-all ${activeTab === "content" ? "bg-[#6E62B1] text-white shadow-md" : "bg-white border border-gray-200 text-gray-500"}`}
          >
            Content
          </button>
          <button 
            onClick={() => setActiveTab("resources")}
            className={`flex-1 py-3 rounded-xl font-semibold active:scale-95 transition-all text-sm ${activeTab === "resources" ? "bg-[#6E62B1] text-white shadow-md" : "bg-white border border-gray-200 text-gray-500"}`}
          >
            Resources
          </button>
          <button 
            onClick={() => setActiveTab("notes")}
            className={`flex-1 py-3 rounded-xl font-semibold active:scale-95 transition-all text-sm ${activeTab === "notes" ? "bg-[#6E62B1] text-white shadow-md" : "bg-white border border-gray-200 text-gray-500"}`}
          >
            Notes
          </button>
        </div>

        {/* Dynamic Content Switching - CORRECTION: Conditional Rendering */}
        {activeTab === "content" && (
          <div className="flex flex-col gap-4">
              <h3 className="font-bold text-gray-800">Understanding {lesson.title}</h3>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 text-gray-500 leading-relaxed text-sm shadow-sm">
                  This lesson explores <strong>{lesson.title}</strong> as part of your <strong>{courseTitle}</strong> curriculum. 
                  Watch the video to understand how these concepts apply to scaling <strong>BizStart AI</strong>.
              </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <h3 className="font-bold text-gray-800">Downloadable Resources</h3>
            <div className="flex flex-col gap-3">
              {/* Maps through AI-generated resources passed in state */}
              {(resources || []).map((res, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white shadow-sm active:bg-gray-50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800">{res.title}</span>
                    <span className="text-[11px] text-gray-400 uppercase font-medium mt-0.5">
                      {res.type} • {res.detail}
                    </span>
                  </div>
                  <Download size={20} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="p-8 text-center text-gray-400 italic text-sm">
            No notes have been added for this lesson yet.
          </div>
        )}

        {/* Key Point Card */}
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100 mb-10">
           <div className="bg-white p-2 rounded-lg shadow-sm text-yellow-500">✨</div>
           <div>
             <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Key Point</p>
             <p className="text-xs text-gray-600">Apply these insights directly to your current business model.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetail;