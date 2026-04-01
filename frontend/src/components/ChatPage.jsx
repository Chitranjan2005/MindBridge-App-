import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import TypingIndicator from "./TypingIndicator";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! 🙏 Main MindBridge hoon. Tum mujhse khul ke baat kar sakte ho. Kya chal raha hai aaj?",
      isAI: true,
      emotionLevel: null,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (userMessage) => {
    // Add user message to chat
    const userMsg = {
      id: Date.now(),
      text: userMessage,
      isAI: false,
      emotionLevel: null,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Call backend API
      const response = await axios.post("/api/chat", {
        message: userMessage,
      });

      const { aiResponse, emotionLevel } = response.data;

      // Update user message with emotion level
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMsg.id ? { ...msg, emotionLevel } : msg,
        ),
      );

      // Add AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: aiResponse,
            isAI: true,
            emotionLevel: null,
          },
        ]);
        setLoading(false);
      }, 500); // Small delay for natural feel
    } catch (error) {
      console.error("Error sending message:", error);

      // Show error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Sorry yaar, thoda technical issue hai. Phir se try karo? 🤍",
          isAI: true,
          emotionLevel: null,
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
              🧠
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MindBridge</h1>
              <p className="text-xs text-slate-400">
                Tumhara mental health companion
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Online
          </div>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isAI={message.isAI}
              emotionLevel={message.emotionLevel}
            />
          ))}

          {loading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input box */}
      <InputBox onSend={handleSendMessage} disabled={loading} />

      {/* Disclaimer footer */}
      <div className="bg-slate-800/30 text-center py-2 px-4">
        <p className="text-xs text-slate-500">
          MindBridge is not a replacement for professional medical advice. In
          case of emergency, please contact helplines.
        </p>
      </div>
    </div>
  );
};

export default ChatPage;