import { analyzeEmotion } from "../utils/emotionDetection.js";
import { generateAIResponse } from "../services/aiService.js";

/**
 * Handle chat messages
 */
export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Analyze emotion
    const emotionAnalysis = analyzeEmotion(message);

    // Generate AI response
    const aiResponse = await generateAIResponse(message, emotionAnalysis.level);

    // Return response
    res.json({
      success: true,
      userMessage: message,
      aiResponse,
      emotionLevel: emotionAnalysis.level,
      responseType: emotionAnalysis.responseType,
    });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({
      error: "Failed to process message",
      message: "Main tumhari baat sun raha hoon. Thoda phir se try karo? 🤍",
    });
  }
};

/**
 * Analyze emotion endpoint (standalone)
 */
export const handleAnalyze = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const emotionAnalysis = analyzeEmotion(message);

    res.json({
      success: true,
      ...emotionAnalysis,
    });
  } catch (error) {
    console.error("Analyze Error:", error);
    res.status(500).json({ error: "Failed to analyze emotion" });
  }
};