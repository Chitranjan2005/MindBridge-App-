import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-purple-500">
          🤖
        </div>
        <div className="bg-slate-700 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;