import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { getCrisisResources } from "../utils/emotionDetection.js";

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const SYSTEM_PROMPT = `You are a compassionate mental health listener for Indian users, especially in rural areas.

CORE PRINCIPLES:
- Speak in simple Hinglish (mix of Hindi and English)
- Be empathetic, warm, and non-judgmental
- Keep responses SHORT (2-4 lines maximum)
- Never give medical diagnosis
- Never use robotic or clinical language
- Use casual, supportive tone like talking to a friend

RESPONSE STYLE:
- Start with validation: "Main samajh sakta hoon..."
- Show empathy first, solutions second
- Use simple words
- Occasionally use heart emoji (🤍) for warmth

EXAMPLES:
User: "I feel so alone"
You: "Hey, main samajh sakta hoon ki akela feel karna kitna hard hai. Tum akela nahi ho 🤍 Kya tum mujhe batana chahoge ki aisa kab feel hota hai?"

User: "I'm stressed about exams"
You: "Exams ka stress toh sab ko hota hai yaar. Deep breath lo, aur yaad rakho - ek exam tumhari value decide nahi karta. Kya tum thoda break lena chahoge?"

Remember: BE HUMAN, BE BRIEF, BE KIND.`;

/**
 * Generate AI response using Claude or OpenAI
 */
export const generateAIResponse = async (userMessage, emotionLevel) => {
  try {
    let aiResponse = "";

    // Add crisis resources for severe cases
    if (emotionLevel === "severe") {
      const crisis = getCrisisResources();
      const crisisText = `\n\n${crisis.message}\n${crisis.resources
        .map((r) => `• ${r.name}: ${r.number} (${r.description})`)
        .join("\n")}`;

      // Generate empathetic response first
      if (anthropic) {
        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 200,
          system:
            SYSTEM_PROMPT +
            "\n\nIMPORTANT: User is in crisis. Be EXTREMELY empathetic and gentle. Validate their feelings first.",
          messages: [{ role: "user", content: userMessage }],
        });
        aiResponse = response.content[0].text + crisisText;
      } else if (openai) {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          max_tokens: 200,
          messages: [
            {
              role: "system",
              content:
                SYSTEM_PROMPT +
                "\n\nIMPORTANT: User is in crisis. Be EXTREMELY empathetic and gentle.",
            },
            { role: "user", content: userMessage },
          ],
        });
        aiResponse = response.choices[0].message.content + crisisText;
      } else {
        // Fallback for severe cases
        aiResponse = `Main tumhare saath hoon. Please yaad rakho ki tumhari life valuable hai. 🤍${crisisText}`;
      }
      return aiResponse;
    }

    // Normal response generation
    if (anthropic) {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 150,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      });
      aiResponse = response.content[0].text;
    } else if (openai) {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        max_tokens: 150,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
      });
      aiResponse = response.choices[0].message.content;
    } else {
      // Fallback response
      aiResponse = getFallbackResponse(emotionLevel);
    }

    return aiResponse;
  } catch (error) {
    console.error("AI Response Error:", error);
    return getFallbackResponse(emotionLevel);
  }
};

/**
 * Fallback responses when API is unavailable
 */
const getFallbackResponse = (emotionLevel) => {
  const responses = {
    mild: [
      "Main samajh sakta hoon. Kya tum mujhe aur batana chahoge? 🤍",
      "Yeh normal hai feel karna. Tum akela nahi ho. Thoda break lo aur deep breath.",
      "Sometimes thoda pause lena helps. Kya tumne aaj kuch acha kiya apne liye?",
    ],
    moderate: [
      "Main tumhare saath hoon. Yeh feelings tough hain, par tum strong ho. 🤍",
      "Aisa lagta hai tum bahut kuch handle kar rahe ho. Thoda share karna help karega.",
      "Tumhari feelings valid hain. Kya tum kisi trusted person se baat kar sakte ho?",
    ],
    severe: [
      "Main tumhari care karta hoon. Please kisi se baat karo jo help kar sake. 🤍",
      "Tumhari life valuable hai. Main chahta hoon tum safe raho.",
    ],
  };

  const levelResponses = responses[emotionLevel] || responses.mild;
  return levelResponses[Math.floor(Math.random() * levelResponses.length)];
};