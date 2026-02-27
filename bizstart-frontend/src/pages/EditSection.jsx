import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#6E62B1";

export default function EditSection() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white flex flex-col h-screen">

        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-center relative">
          <button onClick={() => navigate(-1)} className="absolute left-6 p-2 bg-gray-100 rounded-xl">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-semibold">Edit Section</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">

          <div className="bg-gray-100 rounded-xl p-4 mb-6 text-center">
            <p className="font-medium">Editing: Executive Summary</p>
            <p className="text-sm text-gray-500">
              Make this section your own!
            </p>
          </div>

          <textarea
            rows={12}
            className="w-full p-4 border rounded-xl"
            defaultValue="GlowPath is a mobile platform..."
          />

          <button
            className="w-full mt-6 py-3 rounded-xl text-white font-medium"
            style={{ backgroundColor: PRIMARY }}
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}