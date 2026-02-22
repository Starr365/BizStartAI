import React, { useState } from "react";
import { Bell, Mic, Send } from "lucide-react";
import Logo from "../assets/bizstart-ai.png";

// Mock user
const user = { name: "Sandra" };

const PRIMARY = "#6E62B1";

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 w-full md:hidden border-t bg-white flex justify-around text-sm px-4 py-3 shadow-md z-10">
    <div>Home</div>
    <div>Tools</div>
    <div style={{ color: PRIMARY, fontWeight: 600 }}>AI Mentor</div>
    <div>Profile</div>
  </div>
);

const ChatHeader = () => (
  <div className="flex items-center justify-between sticky top-0 bg-white z-10 py-3 px-4 shadow-md">
    <img src={Logo} alt="BizStart AI" className="h-10 object-contain" />
    <Bell stroke={PRIMARY} size={22} />
  </div>
);

const ChatMessage = ({ text, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className="max-w-[80%] p-3 rounded-2xl text-sm"
        style={{
          backgroundColor: isUser ? PRIMARY : "#F3F2FA",
          color: isUser ? "white" : "#1A1426",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const SuggestionCard = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-2xl text-sm shadow-sm border"
    style={{
      backgroundColor: "#F3F2FA",
      borderColor: PRIMARY,
      color: "#1A1426",
    }}
  >
    {text}
  </button>
);

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center sticky bottom-0 bg-white px-4 py-3 border-t gap-2 z-10">
      <button style={{ color: PRIMARY }}>
        <Mic />
      </button>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask your AI mentor..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        style={{ borderColor: PRIMARY }}
      />

      <button
        onClick={handleSend}
        className="p-2 rounded-full text-white"
        style={{ backgroundColor: PRIMARY }}
      >
        <Send size={18} />
      </button>
    </div>
  );
};

const AIMentor = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello ${user.name}! I'm your AI mentor. What would you like to work on today?`,
    },
  ]);

  const suggestions = [
    "Improve my idea",
    "Validate this idea",
    "Define the problem statement",
  ];

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);

    // Mock AI reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Great choice! Let’s dive into that together." },
      ]);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} {...msg} />
        ))}

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestions.map((s, i) => (
            <SuggestionCard key={i} text={s} onClick={() => handleSend(s)} />
          ))}
        </div>
      </div>

      <ChatInput onSend={handleSend} />

      <BottomNav />
    </div>
  );
};

export default AIMentor;