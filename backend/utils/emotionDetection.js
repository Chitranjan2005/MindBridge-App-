// Emotion detection keywords
const SEVERE_KEYWORDS = [
  "suicide",
  "kill myself",
  "end my life",
  "die",
  "death wish",
  "self harm",
  "hurt myself",
  "no reason to live",
  "better off dead",
  "want to die",
  "suicidal",
  "ending it all",
];

const MODERATE_KEYWORDS = [
  "anxious",
  "anxiety",
  "depressed",
  "depression",
  "alone",
  "lonely",
  "sad",
  "hopeless",
  "panic",
  "worthless",
  "scared",
  "afraid",
  "crying",
  "broken",
  "empty",
  "numb",
  "can't cope",
  "overwhelmed",
];

const MILD_KEYWORDS = [
  "stress",
  "stressed",
  "tired",
  "exhausted",
  "overthinking",
  "worried",
  "nervous",
  "restless",
  "sleepless",
  "frustrated",
  "confused",
  "uncertain",
  "pressure",
  "burden",
];

/**
 * Analyzes the emotional state of a message
 * @param {string} message - User's message
 * @returns {Object} - { level: 'mild'|'moderate'|'severe', responseType: string }
 */
export const analyzeEmotion = (message) => {
  const lowerMessage = message.toLowerCase();

  // Check for severe indicators
  for (const keyword of SEVERE_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      return {
        level: "severe",
        responseType: "escalation",
        keywords: SEVERE_KEYWORDS.filter((k) => lowerMessage.includes(k)),
      };
    }
  }

  // Check for moderate indicators
  for (const keyword of MODERATE_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      return {
        level: "moderate",
        responseType: "guided",
        keywords: MODERATE_KEYWORDS.filter((k) => lowerMessage.includes(k)),
      };
    }
  }

  // Check for mild indicators
  for (const keyword of MILD_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      return {
        level: "mild",
        responseType: "self-help",
        keywords: MILD_KEYWORDS.filter((k) => lowerMessage.includes(k)),
      };
    }
  }

  // Default to mild if no keywords detected
  return {
    level: "mild",
    responseType: "self-help",
    keywords: [],
  };
};

/**
 * Generates crisis resources for India
 */
export const getCrisisResources = () => {
  return {
    message: "Please remember, you're not alone. Here are some helplines:",
    resources: [
      {
        name: "AASRA",
        number: "+91-9820466726",
        description: "24/7 suicide prevention helpline",
      },
      {
        name: "iCall",
        number: "+91-9152987821",
        description: "Psychosocial helpline (Mon-Sat, 8am-10pm)",
      },
      {
        name: "Vandrevala Foundation",
        number: "+91-9999666555",
        description: "24/7 mental health support",
      },
    ],
  };
};