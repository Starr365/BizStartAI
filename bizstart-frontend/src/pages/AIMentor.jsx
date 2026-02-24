import React, { useState, useEffect, useRef } from "react";
import { Bell, Mic, Send, Home, Briefcase, MessageSquare, User } from "lucide-react";
import Logo from "../assets/bizstart-ai.png";
import api from "../api";
import BottomNav from "../components/BottomNav";

const PRIMARY = "#6E62B1";

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
        className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${isUser ? "bg-primary text-white" : "bg-primary-light text-dark"}`}
      >
        {text}
      </div>
    </div>
  );
};

const SuggestionCard = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-2xl text-sm shadow-sm border bg-primary-light border-primary text-dark"
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
        <button className="text-primary"><Mic /></button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your AI mentor..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none border-primary"
        />
        <button onClick={handleSend} className="p-2 rounded-full text-white bg-primary">
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
  const [conversationId, setConversationId] = useState(null); // Backend conversation tracking
  const scrollRef = useRef(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const savedData = JSON.parse(localStorage.getItem('userAccount') || '{"name": "Sandra"}');

        // Fetch existing conversations
        const convRes = await api.get('/conversations');
        let currentConvId = null;

        if (convRes.data && convRes.data.length > 0) {
          // Pick the first/latest conversation
          currentConvId = convRes.data[0].id;
        } else {
          // Create new conversation if none exist
          const createRes = await api.post('/conversations', { title: "Business Idea Discussion" });
          currentConvId = createRes.data?.data?.id || createRes.data?.id;
        }

        setConversationId(currentConvId);

        // Fetch past messages
        if (currentConvId) {
          const msgRes = await api.get(`/messages/${currentConvId}?limit=50`);
          if (msgRes.data && msgRes.data.length > 0) {
            const fetchedMessages = msgRes.data.map(m => ({
              sender: m.role || (m.isAi ? 'ai' : 'user'), // Map backend fields to sender 'user' or 'ai'
              text: m.content || m.text
            }));
            setMessages(fetchedMessages);
          } else {
            setMessages([{ sender: "ai", text: `Hello ${savedData.name}! I'm your AI mentor. Ready to work?` }]);
          }
        }
      } catch (err) {
        console.error("Failed to initialize chat:", err);
        const savedData = JSON.parse(localStorage.getItem('userAccount') || '{"name": "Sandra"}');
        setMessages([{ sender: "ai", text: `Hello ${savedData.name}! I'm your AI mentor. Ready to work?` }]);
      }
    };

    initializeChat();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (msg) => {
    if (!msg.trim() || isTyping) return;

    setMessages(prev => [...prev, { sender: "user", text: msg }]);
    setIsTyping(true);

    try {
      // Direct integration with backend API
      const res = await api.post('/messages', {
        conversation_id: conversationId,
        content: msg
      });

      const aiResponse = res.data?.data?.aiMessage;
      const responseText = aiResponse?.text || aiResponse?.content || res.data?.text || "I'm sorry, I encountered an issue processing that.";

      setMessages(prev => [...prev, { sender: "ai", text: responseText }]);
    } catch (e) {
      console.error("Error sending message to backend:", e);
      setMessages(prev => [...prev, { sender: "ai", text: "Oops, something went wrong connecting to my brain! Ensure your backend is running." }]);
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
        {isTyping && <div className="text-xs animate-pulse text-primary">Paddy is thinking...</div>}
        <div ref={scrollRef} />
      </div>

      <ChatInput onSend={handleSend} />
      <BottomNav />
    </div>
  );
};

export default AIMentor;