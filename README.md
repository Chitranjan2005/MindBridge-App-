# 🧠 MindBridge - AI-Powered Mental Health First Responder

**A compassionate mental health chatbot designed for rural India**

MindBridge provides empathetic, culturally-aware mental health support using AI. Built with React (Vite) + Node.js + Claude API.

---

## 📁 Project Structure

```
MindBridge-App/
├── backend/                    # Node.js Express API
│   ├── controllers/
│   │   └── chatController.js   # Chat & analyze endpoints
│   ├── routes/
│   │   └── chatRoutes.js       # API routes
│   ├── services/
│   │   └── aiService.js        # Claude/OpenAI integration
│   ├── utils/
│   │   └── emotionDetection.js # Emotion analysis logic
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env.example
│
└── frontend/                   # React + Vite + Tailwind
    ├── src/
    │   ├── components/
    │   │   ├── ChatPage.jsx    # Main chat interface
    │   │   ├── MessageBubble.jsx
    │   │   ├── InputBox.jsx
    │   │   └── TypingIndicator.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Claude API key (or OpenAI API key)

### Backend Setup

1. **Navigate to backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create environment file:**

```bash
cp .env.example .env
```

4. **Add your API key to `.env`:**

```env
PORT=5000
ANTHROPIC_API_KEY=your_claude_api_key_here
# OR use OpenAI:
# OPENAI_API_KEY=your_openai_api_key_here
```

5. **Start the backend server:**

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Access the App

Open your browser and navigate to `http://localhost:3000`

---

## 🎯 Core Features

### 1. **Emotion Detection System**

- **Mild:** stress, tired, overthinking → Self-help tips
- **Moderate:** anxiety, sadness, loneliness → Guided exercises
- **Severe:** self-harm, suicidal thoughts → Crisis resources + empathy

### 2. **AI Response Generation**

- Powered by Claude API (fallback to OpenAI)
- Speaks in Hinglish (Hindi + English mix)
- Short, empathetic responses (2-4 lines)
- Non-clinical, friend-like tone

### 3. **WhatsApp-Style Chat UI**

- Clean, mobile-first design
- Color-coded emotion indicators
- Typing animation
- Auto-scroll to latest message
- Dark theme with purple gradient

### 4. **Crisis Support**

India-specific helplines automatically provided for severe cases:

- **AASRA:** +91-9820466726 (24/7)
- **iCall:** +91-9152987821
- **Vandrevala Foundation:** +91-9999666555

---

## 🧪 Testing the App

### Test Messages

**Mild Emotion:**

```
"I'm feeling stressed about exams"
"Can't sleep properly these days"
```

**Moderate Emotion:**

```
"I feel so alone and sad"
"Having anxiety attacks lately"
```

**Severe Emotion:**

```
"I don't want to live anymore"
"Thinking about ending it all"
```

The AI will respond appropriately based on detected emotion level.

---

## 🛠️ API Endpoints

### POST `/api/chat`

Send a message and receive AI response

**Request:**

```json
{
  "message": "I feel stressed"
}
```

**Response:**

```json
{
  "success": true,
  "userMessage": "I feel stressed",
  "aiResponse": "Main samajh sakta hoon...",
  "emotionLevel": "mild",
  "responseType": "self-help"
}
```

### POST `/api/analyze`

Analyze emotion without AI response

**Request:**

```json
{
  "message": "I want to die"
}
```

**Response:**

```json
{
  "success": true,
  "level": "severe",
  "responseType": "escalation",
  "keywords": ["die"]
}
```

---

## 🎨 Design Features

### Color Coding

- **Green:** Mild emotions
- **Yellow:** Moderate emotions
- **Red:** Severe emotions (crisis)
- **Purple:** AI messages

### Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface

### Animations

- Smooth message transitions
- Typing indicator with bounce animation
- Auto-scroll to latest message

---

## 🔐 Environment Variables

### Backend `.env`

```env
PORT=5000
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx
```

**Note:** You only need ONE API key (Claude OR OpenAI). Claude is recommended for more empathetic responses.

---

## 📦 Dependencies

### Backend

- `express` - Web framework
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `@anthropic-ai/sdk` - Claude API client
- `openai` - OpenAI API client

### Frontend

- `react` - UI library
- `react-dom` - React renderer
- `axios` - HTTP client
- `vite` - Build tool
- `tailwindcss` - Styling

---

## 🚨 Important Safety Rules

The AI is programmed to:

- ✅ **Always prioritize empathy first**
- ✅ **Never give medical diagnosis**
- ✅ **Provide crisis resources for severe cases**
- ✅ **Keep responses short and human-like**
- ✅ **Use supportive, non-judgmental language**
- ❌ **Never give harmful advice**
- ❌ **Never use robotic/clinical tone**

---

## 🌟 Bonus Features (Optional)

To add these features, you can extend the app:

1. **Voice Input**
   - Use Web Speech API
   - Add microphone button to InputBox

2. **Language Toggle**
   - Switch between English/Hinglish
   - Store preference in localStorage

3. **Chat History**
   - Save messages to localStorage
   - Add "Clear History" button

4. **Emotion Analytics**
   - Track emotion trends over time
   - Visualize with charts

---

## 🐛 Troubleshooting

### Backend won't start

- Check if port 5000 is available
- Verify API key in `.env`
- Run `npm install` again

### Frontend can't connect to backend

- Ensure backend is running on port 5000
- Check proxy settings in `vite.config.js`
- Clear browser cache

### AI responses not working

- Verify API key is correct
- Check API quota/billing
- Look at backend console for errors

---

## 📄 License

This is a prototype/MVP for educational purposes.

---

## 🤝 Contributing

Feel free to enhance this prototype with:

- Better emotion detection (ML models)
- Multi-language support
- Voice/video calling
- Professional therapist referrals

---

## 📧 Support

For crisis support in India:

- **AASRA:** +91-9820466726
- **iCall:** +91-9152987821
- **Vandrevala Foundation:** +91-9999666555

---

**Built with ❤️ for mental health awareness in rural India**
