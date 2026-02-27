import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center sticky bottom-0 bg-white px-4 py-3 border-t gap-2 z-10">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={handleSend}
        className="bg-purple-500 text-white px-4 py-2 rounded-full"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;