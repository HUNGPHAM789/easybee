# Architecture — EasyBee Speaking Tutor

## Overview

Client-side SPA using Gemini Live API for real-time bidirectional voice. Two AI agents: a live tutor (voice) and a curriculum analyst (text).

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **AI (Live)**: `@google/genai` SDK — Gemini Live API (WebSocket)
- **AI (Analysis)**: `@google/genai` SDK — Gemini API (REST)
- **Fonts**: Inter (body), Comfortaa (brand)

## Module Map

### `src/App.tsx` — Orchestrator
- Phase state machine: `idle → connecting → lesson → session-end → summary`
- Dynamic system instruction builder (adapts to new vs returning user)
- Marker parser: extracts `[PHRASE]...[/PHRASE][VN]...[/VN]` from AI output
- Manages Gemini Live API WebSocket lifecycle
- Renders phase-appropriate UI (flashcard, transcript, session end, notes)

### `src/components/MicOrb.tsx` — Mic Button
- Canvas-based horizontal waveform bars inside a white circle
- Reacts to real audio volume (0-1 prop)
- Spring physics via `useMotionValue` + `useSpring`
- Pulse ring animations when active
- States: idle (gray icon), connecting (spinner), active (black icon + waveform)

### `src/lib/audio.ts` — Audio Engine
- Mic capture via `getUserMedia`
- Custom resampler: browser native rate → 16kHz PCM
- Float32 → Int16 → Base64 encoding for Gemini API
- Playback: decodes Base64 PCM chunks, schedules via `AudioBufferSourceNode`
- Volume analysis via `AnalyserNode` for waveform visualization

### `src/lib/profile.ts` — User Profile
- localStorage CRUD for user profile and session records
- Tracks: CEFR level, goals, streak, total sessions, total phrases
- Streak detection (consecutive days)
- Spaced repetition: randomly selects phrases from past sessions for review
- Keeps last 20 sessions to prevent localStorage bloat

### `src/lib/curriculum.ts` — Curriculum Agent
- Runs after each session ends (non-blocking)
- Calls `gemini-2.5-flash` (regular API, not Live) with session transcript
- Outputs: session summary, CEFR assessment, next session topic and plan
- Saves results to localStorage via `profile.ts`
- Graceful fallback if API call fails

## Data Flow

### During Session
```
User speaks → AudioHandler captures → resample 16kHz → Base64 → WebSocket → Gemini
Gemini → audio chunks + text → AudioHandler plays audio → App parses text for [PHRASE] markers
Parsed phrases → Flashcard display + learnedPhrases array
```

### After Session
```
learnedPhrases + transcript → curriculum.ts → Gemini 2.5 Flash → session summary + next plan
Summary + plan → profile.ts → localStorage
```

### Next Session Start
```
profile.ts → buildSystemInstruction() → injects user context + last session recap + review phrases
Gemini Live API receives personalized system instruction → greets user with recap
```

## Design System

Monochrome only. No color accents.

| Token | Value |
|-------|-------|
| Primary text | `#0a0a0a` |
| Secondary text | `#8a8a8a` |
| Background | `#ffffff` |
| Card bg | `#f2f2f2` |
| Border | `#e0e0e0` |
| Shadow | `0 1px 4px rgba(0,0,0,0.08)` |
| Border radius | `rounded-xl` |
| Brand font | Comfortaa 700 |
| Body font | Inter 300-600 |
| Heading weight | 300, letter-spacing -0.5px |
