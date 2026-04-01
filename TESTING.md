# 🧪 Testing Guide

## Manual Testing Checklist

### 1. Backend API Tests

#### Health Check

```bash
curl http://localhost:5000/health
```

**Expected:** `{ status: 'ok', message: 'MindBridge API is running' }`

#### Chat Endpoint - Mild

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "I am feeling stressed about work"}'
```

**Expected:**

- `emotionLevel: "mild"`
- `responseType: "self-help"`
- Supportive Hinglish response

#### Chat Endpoint - Moderate

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "I feel so alone and depressed"}'
```

**Expected:**

- `emotionLevel: "moderate"`
- `responseType: "guided"`
- Empathetic response with support

#### Chat Endpoint - Severe

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "I want to end my life"}'
```

**Expected:**

- `emotionLevel: "severe"`
- `responseType: "escalation"`
- Crisis resources included
- AASRA, iCall, Vandrevala numbers

#### Analyze Endpoint

```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"message": "I am suicidal"}'
```

**Expected:**

```json
{
  "success": true,
  "level": "severe",
  "responseType": "escalation",
  "keywords": ["suicidal"]
}
```

### 2. Frontend UI Tests

#### Initial Load

- [ ] App loads without errors
- [ ] Header displays correctly
- [ ] Welcome message appears
- [ ] Online status shows green dot
- [ ] Input box is ready

#### Sending Messages

- [ ] Can type in input box
- [ ] Send button becomes active when text entered
- [ ] Send button disabled while loading
- [ ] Message appears immediately after sending
- [ ] Typing indicator shows while waiting
- [ ] AI response appears after short delay

#### Message Display

- [ ] User messages align right
- [ ] AI messages align left
- [ ] Avatars display correctly (👤 and 🤖)
- [ ] Message bubbles have correct colors
- [ ] Emotion badges appear for user messages
- [ ] Long messages wrap properly
- [ ] Auto-scroll to bottom works

#### Emotion Detection Visual

**Test mild message:** "I'm stressed"

- [ ] User bubble is green
- [ ] Badge shows "😊 Mild"

**Test moderate message:** "I feel anxious"

- [ ] User bubble is yellow
- [ ] Badge shows "😟 Moderate"

**Test severe message:** "I want to die"

- [ ] User bubble is red
- [ ] Badge shows "🆘 Needs Support"
- [ ] AI response includes crisis helplines

#### Responsive Design

- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (640-1024px)
- [ ] Works on desktop (> 1024px)
- [ ] No horizontal scroll
- [ ] All buttons are touch-friendly

#### Input Box

- [ ] Placeholder text shows
- [ ] Can type multiple lines
- [ ] Enter key sends message (without Shift)
- [ ] Shift+Enter creates new line
- [ ] Send button click works
- [ ] Input clears after sending
- [ ] Disabled state works during loading

### 3. Error Handling Tests

#### Backend Not Running

- [ ] Frontend shows error message
- [ ] User-friendly error (not technical)
- [ ] Can try again after error

#### Invalid API Key

- [ ] Falls back to default responses
- [ ] App doesn't crash
- [ ] User still gets replies

#### Empty Message

- [ ] Send button stays disabled
- [ ] Can't send empty message
- [ ] No error thrown

#### Network Error

- [ ] Graceful error handling
- [ ] Retry option available
- [ ] User notified clearly

### 4. AI Response Quality Tests

#### Response Characteristics

- [ ] Responses in Hinglish
- [ ] Short (2-4 lines typically)
- [ ] Empathetic tone
- [ ] Non-clinical language
- [ ] Occasional emoji (🤍)
- [ ] No robotic phrases

#### Context Awareness

**Test conversation flow:**

```
User: "I'm stressed"
AI: [acknowledges stress]
User: "It's getting worse"
AI: [shows deeper concern]
```

- [ ] AI maintains appropriate tone throughout

#### Crisis Response

**Test severe message:**

```
User: "I want to kill myself"
```

- [ ] Empathy comes first
- [ ] No judgment or dismissal
- [ ] Crisis resources provided
- [ ] Numbers are correct
- [ ] Formatting is clear

### 5. Performance Tests

#### Load Time

- [ ] Frontend loads in < 3 seconds
- [ ] Backend responds in < 500ms (without AI)
- [ ] AI response in < 5 seconds

#### Memory Usage

- [ ] No memory leaks after 50+ messages
- [ ] Scroll performance remains smooth
- [ ] App doesn't slow down over time

#### Multiple Users (if applicable)

- [ ] Backend handles concurrent requests
- [ ] No request mixing or data leaks

### 6. Security Tests

#### Input Validation

- [ ] XSS attempts are handled
- [ ] SQL injection attempts fail (if using DB)
- [ ] Very long messages are truncated
- [ ] Special characters don't break app

#### API Security

- [ ] CORS is configured correctly
- [ ] API keys not exposed in frontend
- [ ] Environment variables work
- [ ] No sensitive data in responses

### 7. Accessibility Tests

#### Keyboard Navigation

- [ ] Can tab to input box
- [ ] Can tab to send button
- [ ] Enter key sends message
- [ ] Escape clears input (optional)

#### Screen Reader

- [ ] Messages are announced
- [ ] Buttons have labels
- [ ] Status changes are announced
- [ ] ARIA labels present

#### Visual

- [ ] Text contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] No text too small to read
- [ ] Colors distinguishable for color-blind users

### 8. Edge Cases

#### Very Long Message

```
Send a 1000+ character message
```

- [ ] Doesn't break layout
- [ ] Scrolls properly
- [ ] AI responds appropriately

#### Rapid Fire Messages

```
Send 5 messages in quick succession
```

- [ ] All messages queue properly
- [ ] Responses arrive in order
- [ ] No crashes or errors

#### Special Characters

```
Test: "I'm feeling 😢 sad... can't cope!!!"
```

- [ ] Emojis display correctly
- [ ] Punctuation handled
- [ ] Emotion still detected

#### Mixed Languages

```
Test: "मैं बहुत stressed हूँ"
```

- [ ] Hindi characters display
- [ ] Emotion detection works
- [ ] AI responds appropriately

## Automated Testing Setup (Future)

### Backend Unit Tests

```javascript
// Example test structure
describe("Emotion Detection", () => {
  test("detects severe emotions", () => {
    const result = analyzeEmotion("I want to die");
    expect(result.level).toBe("severe");
  });
});
```

### Frontend Component Tests

```javascript
// Example test structure
describe("MessageBubble", () => {
  test("renders user message correctly", () => {
    render(<MessageBubble message="test" isAI={false} />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
```

### Integration Tests

```javascript
// Example test structure
describe("Full Chat Flow", () => {
  test("sends message and receives response", async () => {
    // Simulate user typing and sending
    // Verify API call
    // Verify response displayed
  });
});
```

## Test Scenarios

### Scenario 1: First-time User

1. Open app
2. See welcome message
3. Type "Hi"
4. Receive greeting
5. Continue conversation

**Pass Criteria:** Smooth, intuitive flow

### Scenario 2: Crisis Intervention

1. Open app
2. Type severe message
3. Receive empathetic response
4. See crisis resources
5. Helpline numbers are clickable (optional)

**Pass Criteria:** Resources displayed clearly, empathy evident

### Scenario 3: Long Conversation

1. Exchange 20+ messages
2. Vary emotion levels
3. Check performance
4. Verify scroll works
5. No crashes or slowdowns

**Pass Criteria:** Stable throughout, good UX maintained

### Scenario 4: Mobile User

1. Open on mobile device
2. Test in portrait mode
3. Test in landscape mode
4. Type using on-screen keyboard
5. Navigate and scroll

**Pass Criteria:** Fully functional, no layout issues

## Browser Compatibility

Test on:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Pre-Launch Checklist

- [ ] All critical tests passing
- [ ] No console errors
- [ ] No 404s or network errors
- [ ] Crisis resources verified
- [ ] API keys configured
- [ ] Environment variables set
- [ ] Documentation reviewed
- [ ] Privacy policy added (if required)
- [ ] Terms of service added (if required)
- [ ] Analytics setup (optional)
- [ ] Error tracking setup (optional)

## Monitoring in Production

After launch, monitor:

- [ ] API response times
- [ ] Error rates
- [ ] User engagement metrics
- [ ] Crisis resource clicks
- [ ] AI API costs
- [ ] Server resource usage

## Reporting Issues

When reporting bugs, include:

1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser/device info
5. Screenshots if applicable
6. Console errors if any

---

**Remember:** Mental health apps require extra care in testing. Always verify crisis intervention flows thoroughly!
