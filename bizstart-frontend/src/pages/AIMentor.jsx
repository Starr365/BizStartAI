import React, { useState, useEffect, useRef } from "react";
import { Bell, Mic, Send, Home, Briefcase, MessageSquare, User } from "lucide-react"; // Added icons
import Logo from "../assets/bizstart-ai.png";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom"; // 1. Import the hook

  const PRIMARY = "#6E62B1";

const BottomNav = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function


  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden border-t bg-white flex justify-around items-center text-[10px] py-2 shadow-md z-50">
      
      {/* Home Button */}
      <div 
        onClick={() => navigate("/dashboard")} 
        className="flex flex-col items-center gap-1 cursor-pointer text-gray-400"
      >
        <Home size={18} />
        <span>Home</span>
      </div>

      {/* Tools Button */}
      <div 
        onClick={() => navigate("/tools")} 
        className="flex flex-col items-center gap-1 cursor-pointer text-gray-400"
      >
        <Briefcase size={18} />
        <span>Tools</span>
      </div>

      {/* AI Mentor Button (Active State) */}
      <div 
        onClick={() => navigate("/chat")} 
        className="flex flex-col items-center gap-1 cursor-pointer" 
        style={{ color: PRIMARY, fontWeight: 600 }}
      >
        <MessageSquare size={18} />
        <span>AI Mentor</span>
      </div>

      {/* Profile Button */}
      <div 
        onClick={() => navigate("/profile")} 
        className="flex flex-col items-center gap-1 cursor-pointer text-gray-400"
      >
        <User size={18} />
        <span>Profile</span>
      </div>

    </div>
  );
};
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
          whiteSpace: "pre-wrap" // Added: This ensures line breaks from AI look organized
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
    style={{ backgroundColor: "#F3F2FA", borderColor: PRIMARY, color: "#1A1426" }}
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
    /* Changed: Wrapped in a div with bottom-[56px] to sit exactly above the BottomNav */
    <div className="fixed bottom-[56px] left-0 w-full bg-white border-t z-40">
      <div className="flex items-center px-4 py-3 gap-2">
        <button style={{ color: PRIMARY }}><Mic /></button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your AI mentor..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          style={{ borderColor: PRIMARY }}
        />
        <button onClick={handleSend} className="p-2 rounded-full text-white" style={{ backgroundColor: PRIMARY }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

// --- 2. THE MAIN COMPONENT ---

const AIMentor = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const savedData = localStorage.getItem('userAccount');
    const userData = savedData ? JSON.parse(savedData) : { name: "Sandra" };
    setMessages([{ sender: "ai", text: `Hello ${userData.name}! I'm your AI mentor. Ready to work?` }]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

const handleSend = async (msg) => {
  if (!msg.trim() || isTyping) return;
  
  const savedData = localStorage.getItem('userAccount');
  const businessProfile = savedData ? JSON.parse(savedData) : null;

  setMessages(prev => [...prev, { sender: "user", text: msg }]);
  setIsTyping(true);

  try {
   const genAI = new GoogleGenerativeAI("AIzaSyCvDPGH154PJk1pakpHV_PVgq9erhld2Is");
               const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = businessProfile 
      ? `You are Paddy, a business mentor. You are talking to ${businessProfile.name}. 
         Their business is "${businessProfile.businessName}" in the ${businessProfile.suggestedIndustry} industry. 
         They are at the ${businessProfile.stage} stage. 
         NEVER ask them what their business is; you already know this. Provide specific advice based on this data.
         Keep your responses organized with bullet points and clear steps.`
      : "You are a business mentor named Paddy.";

    const prompt = `${systemPrompt}\n\nUser Message: ${msg}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    setMessages(prev => [...prev, { sender: "ai", text }]);
  } catch (e) {
    console.error(e);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="flex flex-col w-full h-screen bg-white overflow-hidden">
      <ChatHeader />
      {/* Changed: pb-40 ensures you can scroll past the fixed input and nav bar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-40">
        {messages.map((m, i) => <ChatMessage key={i} {...m} />)}
        {isTyping && <div className="text-xs animate-pulse" style={{ color: PRIMARY }}>Paddy is thinking...</div>}
        <div ref={scrollRef} />
      </div>
      
      <ChatInput onSend={handleSend} />
      <BottomNav />
    </div>
  );
};

export default AIMentor;