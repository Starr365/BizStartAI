import React from "react";

const ChatMessage = ({ text, sender = "ai" }) => {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-2xl ${
          isUser ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;