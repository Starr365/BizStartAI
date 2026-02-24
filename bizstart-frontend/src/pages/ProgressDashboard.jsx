import React from "react";
import { Bell } from "lucide-react";
import Logo from "../assets/bizstart-ai.png";
import BottomNav from "../components/BottomNav";

// Mock data
const userProgress = {
  name: "Sandra",
  completedModules: 3,
  totalModules: 8,
  progressPercent: 37,
  summary: [
    { value: "45%", icon: "📄", label: "Business Plan" },
    { value: 12, icon: "📚", label: "Lessons Done" },
    { value: 5, icon: "🤖", label: "AI Sessions" },
  ],
  courses: [
    {
      title: "Understanding Your Market",
      description: "Learn to analyze your audience and competitors",
      completedLessons: 3,
      totalLessons: 6,
      duration: 35,
    },
    {
      title: "Business Strategy Basics",
      description: "Plan and execute your strategy effectively",
      completedLessons: 1,
      totalLessons: 4,
      duration: 25,
    },
    {
      title: "Marketing Essentials",
      description: "Learn the fundamentals of marketing",
      completedLessons: 2,
      totalLessons: 5,
      duration: 40,
    },
  ],
};

// Components
const Header = () => (
  <div className="flex items-center justify-between sticky top-0 bg-white z-10 py-3 px-4 shadow-md">
    <img src={Logo} alt="BizStart AI" className="h-10 object-contain" />
    <Bell stroke="black" size={22} />
  </div>
);

const ProgressCard = ({ completedModules, totalModules, progressPercent }) => (
  <div className="rounded-2xl p-4 mb-6 bg-primary">
    {/* Optional title above the bar */}
    <p className="text-white font-semibold mb-2 text-sm">Learning Progress</p>

    {/* Progress bar */}
    <div className="w-full bg-gray-300 rounded-full h-3">
      <div
        className="h-3 rounded-full bg-dark"
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>

    {/* Subtitle */}
    <p className="text-xs text-gray-300 mt-2">
      {completedModules} of {totalModules} modules finished
    </p>
  </div>
);

const SummaryCard = ({ value, icon, label }) => (
  <div className="bg-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
    <div className="text-2xl mb-2 text-primary">
      {icon}
    </div>
    <p className="font-semibold text-gray-800 text-lg">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{label}</p>
  </div>
);

const InProgressCourseCard = ({ title, description, completedLessons, totalLessons, duration }) => {
  const progressPercent = (completedLessons / totalLessons) * 100;
  return (
    <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <div className="mt-3 bg-gray-200 rounded-full h-2 w-full">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>
          Lessons: {completedLessons}/{totalLessons}
        </span>
        <span>⏱ {duration} mins</span>
      </div>
    </div>
  );
};

const ProgressDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header sticky */}
      <Header />

      {/* Scrollable middle content */}
      <div className="flex-1 overflow-auto p-4 space-y-6 max-w-[1200px] w-full mx-auto">
        {/* Welcome text on top */}
        <div>
          <p className="font-semibold text-gray-800 text-lg">
            Welcome back {userProgress.name}!
          </p>
          <p className="text-gray-500 text-sm mt-1">
            You are making great progress on your journey!
          </p>
        </div>

        {/* Learning Progress Card */}
        <ProgressCard
          completedModules={userProgress.completedModules}
          totalModules={userProgress.totalModules}
          progressPercent={userProgress.progressPercent}
        />

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {userProgress.summary.map((item, idx) => (
            <SummaryCard key={idx} {...item} />
          ))}
        </div>

        {/* Continue Learning */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProgress.courses.map((course, idx) => (
              <InProgressCourseCard key={idx} {...course} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav sticky on mobile */}
      <BottomNav />
    </div>
  );
};

export default ProgressDashboard;