# MindBridge Architecture Overview

## System Design

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│             │         │             │         │             │
│   Frontend  │ ◄─────► │   Backend   │ ◄─────► │  Claude AI  │
│  (React)    │  HTTP   │  (Express)  │   API   │             │
│             │         │             │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
```

## Data Flow

1. **User sends message** → Frontend (ChatPage)
2. **HTTP POST to /api/chat** → Backend
3. **Emotion Analysis** → emotionDetection.js
   - Keyword matching
   - Classify: mild/moderate/severe
4. **AI Response Generation** → aiService.js
   - Send to Claude API
   - Add crisis resources if severe
5. **Return response** → Frontend
6. **Display in chat** → MessageBubble

## Key Components

### Backend

**emotionDetection.js**

- Keyword-based emotion analysis
- 3-level classification system
- Crisis resource provider

**aiService.js**

- Claude/OpenAI integration
- Custom prompt engineering
- Fallback responses

**chatController.js**

- Request validation
- Error handling
- Response formatting

### Frontend

**ChatPage.jsx**

- Main container
- State management
- API integration

**MessageBubble.jsx**

- Message display
- Emotion color coding
- Avatar rendering

**InputBox.jsx**

- Text input
- Send functionality
- Keyboard shortcuts

**TypingIndicator.jsx**

- Loading animation
- Visual feedback

## Security Considerations

- API keys stored in environment variables
- CORS enabled for frontend access
- Input validation on backend
- Rate limiting recommended for production
- HTTPS required in production

## Scalability Options

1. **Database Integration**
   - MongoDB for chat history
   - PostgreSQL for user analytics

2. **Authentication**
   - JWT tokens
   - Anonymous sessions

3. **Caching**
   - Redis for common responses
   - Reduce API costs

4. **Load Balancing**
   - Multiple backend instances
   - Nginx reverse proxy

## Future Enhancements

- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Professional referral system
- [ ] Emotion tracking dashboard
- [ ] Group chat support
- [ ] Mobile app (React Native)
