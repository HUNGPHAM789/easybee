# Task: Build Voice AI Tutor for EasyBee using Gemini Live API

## Context
EasyBee is an ESL app for Vietnamese workers. We want to add a real-time voice tutor that students can practice speaking with. Uses Gemini Live API (WebSocket, unlimited free tier).

## Architecture
1. **API Route** (`app/api/gemini-token/route.ts`) — generates ephemeral tokens using server-side API key
2. **Voice Tutor Component** (`components/VoiceTutor.tsx`) — handles WebSocket, audio streaming, UI
3. **Integration** — accessible from DrillScreen after completing a lesson, or as a standalone practice mode

## API Key (server-side only)
Use env var `GEMINI_API_KEY` — already set. For token generation, call:
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-native-audio-dialog:generateContent
```

Actually, for the Live API with ephemeral tokens:
```ts
// app/api/gemini-token/route.ts
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  const { lessonContext } = await req.json();
  
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  // Generate ephemeral token for client-side WebSocket
  const token = await client.models.generateEphemeralToken({
    model: "gemini-2.5-flash-native-audio-dialog",
    config: {
      systemInstruction: getSystemPrompt(lessonContext),
    },
  });
  
  return Response.json({ token: token.token });
}
```

If the ephemeral token API isn't available in the SDK, use a simpler approach:
- Proxy the WebSocket connection through a Next.js API route, OR
- Use the REST API for audio-in/audio-out (non-streaming but simpler)

If neither ephemeral tokens nor WebSocket proxy works easily, fall back to:
- Use `@google/genai` SDK directly in an API route
- Send audio as base64, get audio response back
- Not real-time streaming but still voice conversation

## System Prompt (CRITICAL)
```
You are an English pronunciation tutor for Vietnamese nail salon workers in America.

LANGUAGE RULES:
- Speak Vietnamese for ALL explanations, encouragement, and instructions
- Speak English ONLY when:
  1. Saying the target phrase/sentence for the student to repeat
  2. Giving pronunciation feedback on specific English words
- Never mix: each sentence is either fully Vietnamese or fully English

PERSONALITY:
- Warm, patient, encouraging — like a friendly older sister
- Use simple Vietnamese (not academic)
- Celebrate small wins: "Tốt lắm!" "Giỏi quá!"
- Never make the student feel bad about mistakes

FLOW:
1. Greet in Vietnamese, introduce the phrase to practice
2. Say the English phrase clearly and slowly
3. Ask student to repeat: "Bây giờ bạn thử nói nhé"
4. Listen to their attempt
5. Give feedback in Vietnamese about what to improve
6. If specific sounds need work, say the English word again slowly
7. Have them try again (max 3 attempts per phrase)
8. Move to next phrase or celebrate completion

CONTEXT: The student is practicing phrases from their current lesson.
```

If lesson context is provided (phrases, topic), include them in the system prompt so the tutor knows what to practice.

## UI Design (`components/VoiceTutor.tsx`)

### Layout
- Full screen overlay (like DrillScreen)
- Clean white background, centered content
- Top: lesson title + "Luyện phát âm" subtitle
- Center: large animated mic button (pulsing when listening)
- Below mic: transcript of conversation (scrollable)
- Bottom: "Kết thúc" (End) button

### States
1. **Connecting** — "Đang kết nối..." with spinner
2. **Listening** — mic button pulsing blue, "Đang nghe..."
3. **Speaking** — speaker icon animating, AI voice playing
4. **Idle** — "Nhấn để nói" (Tap to speak)
5. **Error** — "Không thể kết nối. Thử lại?" with retry button

### Mic Button
- Plain `<button>` (NO motion.button — iOS/Android rule)
- Large: min 80px × 80px
- Tap to start recording, tap again to stop
- Visual feedback: border pulse animation via CSS

### Conversation Transcript
- Show last 5-6 exchanges
- AI messages: left-aligned, light gray bg
- User messages: right-aligned, light blue bg
- Auto-scroll to bottom

## Integration Points

### From DrillScreen (after lesson complete)
Add a "🎤 Luyện phát âm" button on the completion screen.
When tapped, opens VoiceTutor with the lesson's phrases as context.

### Standalone (future)
Could add a "Practice" tab on the home page — not needed now.

## Dependencies
```bash
npm install @google/genai
```

## Environment
Add to `.env.local`:
```
GEMINI_API_KEY=AIzaSyAi1lmSaKjlHmZXYUJvMboCznDr3N3IsT4
```

Add to Vercel env vars too (already have SUPABASE vars, add this one).

## CRITICAL RULES
- DO NOT use `motion.button` — plain `<button>` only
- All UI text in Vietnamese
- Big touch targets (80px+ for mic button)
- Match existing design: white bg, neutral colors, Inter font
- DO NOT touch content files in `lib/content/`
- Handle mic permission gracefully — if denied, show Vietnamese error message
- Test: `npx tsc --noEmit` and `npm run build` must pass

## Fallback Strategy
If the Live API WebSocket is too complex to wire up in one session:
1. Build the UI (mic button, transcript, states)
2. Use regular Gemini API for text-based conversation (send text, get text)
3. Use Web Speech API for TTS (text-to-speech) on the response
4. Use Web Speech API for STT (speech-to-text) on user input
This gives the same UX (speak → AI responds → speak again) without WebSocket complexity.
The Live API can be swapped in later.
