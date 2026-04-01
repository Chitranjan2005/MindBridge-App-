import React from "react";

const MessageBubble = ({ message, isAI, emotionLevel }) => {
  // Color coding based on emotion level
  const getEmotionColor = () => {
    if (!emotionLevel) return "bg-purple-600";

    switch (emotionLevel) {
      case "mild":
        return "bg-green-600";
      case "moderate":
        return "bg-yellow-600";
      case "severe":
        return "bg-red-600";
      default:
        return "bg-purple-600";
    }
  };

  return (
    <div
      className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4 animate-fade-in`}
    >
      <div className={`max-w-[75%] ${isAI ? "order-2" : "order-1"}`}>
        {/* Avatar */}
        <div
          className={`flex items-end gap-2 ${isAI ? "flex-row" : "flex-row-reverse"}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              isAI ? "bg-purple-500 text-white" : "bg-slate-600 text-white"
            }`}
          >
            {isAI ? "🤖" : "👤"}
          </div>

          {/* Message bubble */}
          <div
            className={`rounded-2xl px-4 py-3 ${
              isAI
                ? "bg-slate-700 text-slate-100 rounded-bl-none"
                : `${getEmotionColor()} text-white rounded-br-none`
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message}
            </p>
          </div>
        </div>

        {/* Emotion indicator for user messages */}
        {!isAI && emotionLevel && (
          <div
            className={`text-xs mt-1 ${isAI ? "text-left ml-10" : "text-right mr-10"}`}
          >
            <span
              className={`px-2 py-1 rounded-full ${
                emotionLevel === "mild"
                  ? "bg-green-500/20 text-green-400"
                  : emotionLevel === "moderate"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
              }`}
            >
              {emotionLevel === "mild"
                ? "😊 Mild"
                : emotionLevel === "moderate"
                  ? "😟 Moderate"
                  : "🆘 Needs Support"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;