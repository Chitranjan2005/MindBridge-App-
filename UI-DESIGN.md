# 🎨 MindBridge UI Design Guide

## Color Scheme

### Primary Colors

```css
Primary:    #8B5CF6 (Purple)
Secondary:  #EC4899 (Pink)
Background: #0F172A (Dark Slate)
Surface:    #1E293B (Slate Gray)
Text:       #F1F5F9 (Light Slate)
```

### Emotion Colors

```css
Mild:       #10B981 (Green)
Moderate:   #F59E0B (Yellow/Amber)
Severe:     #EF4444 (Red)
```

## Component Breakdown

### 1. Header

```
┌─────────────────────────────────────────┐
│  🧠  MindBridge                    🟢 Online │
│      Tumhara mental health companion       │
└─────────────────────────────────────────┘
```

**Features:**

- App logo (brain emoji + gradient circle)
- App name and tagline
- Online status indicator (green dot + text)
- Sticky header with backdrop blur

### 2. Chat Messages

**AI Message (Left-aligned):**

```
┌────────────────────────────┐
│ 🤖  [Purple/Gray bubble]   │
│     "Namaste! Main..."     │
└────────────────────────────┘
```

**User Message (Right-aligned):**

```
                ┌────────────────────────────┐
                │  [Emotion-colored bubble] 👤│
                │    "I feel stressed"       │
                └────────────────────────────┘
                          [😊 Mild]
```

**Features:**

- Rounded bubbles (border-radius: 16px)
- Avatar icons (emoji or circles)
- Tail on inner corner
- Emotion badge for user messages
- Fade-in animation on appear

### 3. Typing Indicator

```
┌────────────────────┐
│ 🤖  [● ● ●]       │
└────────────────────┘
```

**Features:**

- Three animated dots
- Bounce animation (sequential)
- Shows while AI is thinking

### 4. Input Box

```
┌─────────────────────────────────────────┐
│  [Share karo kya chal raha hai... 🤍]  [➤] │
└─────────────────────────────────────────┘
```

**Features:**

- Auto-expanding textarea (1-3 rows)
- Rounded corners
- Placeholder in Hinglish
- Send button (circular, purple)
- Disabled state while loading

### 5. Footer Disclaimer

```
┌─────────────────────────────────────────┐
│  MindBridge is not a replacement for    │
│  professional medical advice...         │
└─────────────────────────────────────────┘
```

## Layout Structure

```
┌─────────────────────────────────────────┐
│              HEADER                     │
│  (Fixed, bg-blur, border-bottom)        │
├─────────────────────────────────────────┤
│                                         │
│                                         │
│           CHAT MESSAGES                 │
│         (Scrollable Area)               │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│           INPUT BOX                     │
│  (Fixed bottom, border-top)             │
├─────────────────────────────────────────┤
│         DISCLAIMER                      │
│  (Small text, center-aligned)           │
└─────────────────────────────────────────┘
```

## Responsive Breakpoints

### Mobile (< 640px)

- Single column
- Full width bubbles (max 85%)
- Smaller fonts
- Touch-friendly buttons

### Tablet (640px - 1024px)

- Centered content
- Max-width: 768px
- Comfortable padding

### Desktop (> 1024px)

- Max-width: 1024px
- Centered content
- More breathing space

## Typography

```css
App Title:    text-xl font-bold
Tagline:      text-xs font-normal
Messages:     text-sm leading-relaxed
Input:        text-sm
Disclaimer:   text-xs
Emotion Badge: text-xs
```

## Spacing

```css
Container Padding: 16px (p-4)
Message Margin:    16px (mb-4)
Bubble Padding:    12px 16px (px-4 py-3)
Gap between items: 8px (gap-2)
```

## Animations

### 1. Message Fade-in

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 2. Typing Dots Bounce

```css
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
```

### 3. Status Dot Pulse

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

## Visual Hierarchy

1. **User's last message** - Most prominent (emotion color)
2. **AI response** - Clear and readable (gray)
3. **Emotion indicators** - Subtle badges
4. **Input area** - Inviting, clear
5. **Header/Footer** - Secondary, informative

## Accessibility

- ✅ High contrast text
- ✅ Large touch targets (min 44x44px)
- ✅ Clear focus states
- ✅ Screen reader friendly
- ✅ Keyboard navigation support
- ✅ ARIA labels on buttons

## Emotion Color Meanings

**🟢 Green (Mild):**

- Calm, reassuring
- "Things are manageable"

**🟡 Yellow (Moderate):**

- Attention needed
- "We're here to help"

**🔴 Red (Severe):**

- Urgent, serious
- "Let's get you support"

## Best Practices

1. **Keep it simple** - No clutter
2. **Use white space** - Let content breathe
3. **Consistent spacing** - Use Tailwind scale
4. **Smooth transitions** - All state changes animated
5. **Mobile-first** - Design for smallest screen first
6. **Accessibility** - WCAG 2.1 AA compliance

## Example Message Flow

```
[AI] 🤖 "Namaste! Main MindBridge hoon..."
         [Gray bubble, left]

[User] 👤 "I'm feeling very stressed"
           [Yellow bubble, right]
           [😟 Moderate badge]

[AI] 🤖 "Main samajh sakta hoon..."
         [Gray bubble, left]

[User] 👤 "I feel like ending it all"
           [Red bubble, right]
           [🆘 Needs Support badge]

[AI] 🤖 "Main tumhare saath hoon... [crisis resources]"
         [Gray bubble, left, longer text with helplines]
```

## Dark Theme Gradient

```css
background: linear-gradient(
  135deg,
  #0f172a 0%,
  /* Dark slate */ #581c87 50%,
  /* Purple */ #0f172a 100% /* Dark slate */
);
```

This creates a subtle, calming purple glow in the center of the screen.

---

**Design Philosophy:**

- Warm but professional
- Empathetic without being clinical
- Familiar (WhatsApp-like) but unique
- Calming colors, smooth interactions
- Trust-building visual language
