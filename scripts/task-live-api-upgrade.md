# Task: Upgrade Voice Tutor with Gemini Live API (Real-time Audio)

## Context
EasyBee's voice tutor currently uses text-based Gemini API + Web Speech API for TTS/STT. We want to add real-time audio streaming via Gemini Live API for lower latency and more natural conversation.

## Available Models
- `gemini-2.5-flash-native-audio-latest` — Native Audio Dialog (unlimited RPM/RPD, 1M TPM)
- `gemini-3.1-flash-live-preview` — Gemini 3.1 Flash Live (unlimited RPM/RPD, 65K TPM)

Both use `bidiGenerateContent` (bidirectional WebSocket streaming).

## What to Build

### 1. API Route for Ephemeral Tokens (`app/api/voice-tutor/token/route.ts`)
Generate short-lived tokens so the browser can connect directly to Gemini Live API without exposing the API key.

```ts
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  const { lessonContext, model } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Model selection
  const modelId = model === "live" 
    ? "gemini-3.1-flash-live-preview"
    : "gemini-2.5-flash-native-audio-latest";
  
  // Try to create ephemeral token
  // If the SDK doesn't support it, return the session config for WebSocket URL construction
  // WebSocket URL: wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=API_KEY
  
  return Response.json({ 
    wsUrl: `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey}`,
    model: modelId,
    systemInstruction: buildSystemPrompt(lessonContext)
  });
}
```

### 2. Live Audio Client (`lib/gemini-live.ts`)
WebSocket client for Gemini Live API. Handle:
- Connect with system instruction
- Send audio chunks (PCM 16-bit, 16kHz mono)
- Receive audio chunks + play them
- Handle turn detection (model knows when user stops speaking)

Key WebSocket messages:
```js
// Setup message (send first)
{
  "setup": {
    "model": "models/gemini-2.5-flash-native-audio-latest",
    "generationConfig": {
      "responseModalities": ["AUDIO"],
      "speechConfig": {
        "voiceConfig": { "prebuiltVoiceConfig": { "voiceName": "Kore" } }
      }
    },
    "systemInstruction": { "parts": [{ "text": "..." }] }
  }
}

// Send audio
{
  "realtimeInput": {
    "mediaChunks": [{
      "mimeType": "audio/pcm;rate=16000",
      "data": "<base64 PCM audio>"
    }]
  }
}

// Receive audio in serverContent.modelTurn.parts[].inlineData
```

### 3. Audio Utilities (`lib/audio-utils.ts`)
- `startMicStream()` — getUserMedia, AudioContext, ScriptProcessorNode → PCM 16-bit chunks
- `playPcmAudio(base64)` — decode PCM → AudioContext → play
- Handle Safari/iOS differences if any

### 4. Update VoiceTutor Component
Add a model selector at the top (before starting conversation):

```
🎤 Chế độ luyện tập:
[ Trò chuyện thường ] ← current text-based mode
[ Trò chuyện trực tiếp ⚡ ] ← Live API real-time audio
```

When "Trò chuyện trực tiếp" is selected:
- Get WebSocket URL from `/api/voice-tutor/token`
- Connect via WebSocket
- Stream mic audio directly to Gemini
- Play audio responses directly (no Web Speech API TTS needed)
- Model handles turn detection automatically
- Show waveform or pulse animation when AI is speaking

When "Trò chuyện thường" is selected:
- Keep current behavior (Web Speech API STT → Gemini text API → Web Speech API TTS)

### 5. Voice Selection
Use "Kore" voice (female, warm) — matches the "friendly older sister" persona.
Fallback: "Aoede" or "Puck" if Kore isn't available.

## System Prompt (same as current, add audio instruction)
Add to the existing system prompt:
```
AUDIO RULES:
- Speak clearly and at moderate speed
- Pause between Vietnamese explanation and English phrase
- When saying an English phrase for the student to repeat, say it slowly
```

## CRITICAL RULES
- API key stays server-side (in the token route, NOT in client code)
- Plain `<button>` only, no `motion.button`
- All UI text in Vietnamese
- Handle mic permission denial gracefully
- Handle WebSocket disconnect/reconnect
- DO NOT touch content files
- Run `npx tsc --noEmit` and `npm run build` at the end
