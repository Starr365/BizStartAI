import React from "react";
import { ArrowLeft, Sparkles, FileText, BookOpen, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#6E62B1";

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 w-full md:hidden border-t bg-white flex justify-around text-sm px-4 py-3 shadow-md z-10">
    <div>Home</div>
    <div style={{ color: PRIMARY, fontWeight: 600 }}>Tools</div>
    <div>AI Mentor</div>
    <div>Profile</div>
  </div>
);

const Header = () => (
  <div className="sticky top-0 bg-white z-20 px-4 py-3 shadow-sm flex items-center justify-center">
    <button className="absolute left-4 p-2 rounded-xl bg-gray-100">
      <ArrowLeft />
    </button>

    <h1 className="text-lg font-semibold">Tools</h1>
  </div>
);

const ToolCard = ({ icon: Icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-gray-50 rounded-2xl p-4 shadow-sm flex gap-3 items-start cursor-pointer hover:shadow-md transition"
  >
    <div
      className="p-2 rounded-lg"
      style={{ backgroundColor: "#F3F2FA", color: PRIMARY }}
    >
      <Icon size={20} />
    </div>

    <div>
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  </div>
);

const Tools = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex-1 overflow-auto pb-24">
        <div className="max-w-[900px] mx-auto px-4 py-6">

          <p className="text-center text-gray-500 mb-6">
            Everything you need to plan, learn,
            <br />
            and grow your business.
          </p>

          <div
            className="rounded-2xl p-5 text-white flex justify-between items-center mb-6"
            style={{ backgroundColor: PRIMARY }}
          >
            <div className="flex gap-3 items-start">
              <Sparkles className="mt-1" />
              <p className="text-sm">
                Tap a tool to get instant help for your business
              </p>
            </div>

            <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium">
              Got it
            </button>
          </div>

          <div className="space-y-4">
            <ToolCard
              icon={FileText}
              title="Business Plan Builder"
              description="Turn your idea into a structured, investor-ready business plan."
              onClick={() => navigate("/business-plan")}
            />

            <ToolCard
              icon={BookOpen}
              title="Learning"
              description="Bite-sized lessons for business owners and tenderpreneurs who want clarity."
            />

            <ToolCard
              icon={BarChart3}
              title="Financial Projections"
              description="See your 12-month revenue, cost and profit forecast."
            />
          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Tools;