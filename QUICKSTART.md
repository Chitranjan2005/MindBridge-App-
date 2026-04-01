# 🚀 Quick Start Guide

## Get MindBridge Running in 5 Minutes

### Step 1: Get API Key

Sign up for Claude API: https://console.anthropic.com/
(or OpenAI: https://platform.openai.com/)

### Step 2: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your API key
npm run dev
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Step 4: Open App

Navigate to http://localhost:3000

---

## Test It Out

Try these messages:

1. "I'm feeling stressed" (Mild)
2. "I feel so alone" (Moderate)
3. "I want to end it all" (Severe - will show helplines)

---

## Common Issues

**"API key not working"**

- Make sure it's in `.env` file (not `.env.example`)
- Check for typos
- Verify billing is enabled

**"Port already in use"**

- Change PORT in backend/.env
- Update proxy in frontend/vite.config.js

**"Module not found"**

- Run `npm install` in both backend and frontend

---

## Project Structure at a Glance

```
backend/
├── server.js           → Express server
├── controllers/        → Request handlers
├── services/          → AI logic
└── utils/             → Emotion detection

frontend/
├── src/
│   ├── App.jsx        → Main app
│   └── components/    → UI components
└── vite.config.js     → Config
```

---

**Need help? Check the full README.md**
