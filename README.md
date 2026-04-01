# EasyBee — Speaking Tutor

Real-time voice English tutor for Vietnamese beginners, powered by Gemini Live API.

EasyBee speaks Vietnamese as the primary language, teaching English phrases one at a time with step-by-step corrections, flashcard display, and session memory.

## Features

- **Voice-first**: Real-time bidirectional audio via Gemini Live API WebSocket
- **Vietnamese-first pedagogy**: Tutor speaks Vietnamese, introduces English 2-5 words at a time
- **Flashcard display**: Focus phrases shown as large text with Vietnamese translation
- **Session memory**: CEFR assessment, curriculum planning, spaced repetition across sessions
- **Post-session analysis**: Curriculum agent generates lesson summary and next session plan
- **Copy notes**: Export learned phrases to clipboard
- **Progress tracking**: Streak counter, phrase count, session history (localStorage)
- **Premium UI**: Monochrome design system (Comfortaa + Inter), canvas waveform mic, spring animations

## Tech Stack

- **React 19** + TypeScript + Vite
- **Gemini Live API** (`gemini-3.1-flash-live-preview`) for real-time voice
- **Gemini API** (`gemini-2.5-flash`) for post-session curriculum analysis
- **Tailwind CSS v4**
- **Motion** (Framer Motion) for animations
- **Lucide React** for icons

## Setup

```bash
npm install
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm run dev
```

## Project Structure

```
src/
  App.tsx              # Main app — UI, state, Gemini Live API connection
  components/
    MicOrb.tsx         # Mic button with canvas waveform + spring physics
  lib/
    audio.ts           # Web Audio API — capture, resample, playback
    profile.ts         # localStorage user profile + session history
    curriculum.ts      # Post-session Gemini API analysis agent
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key |
