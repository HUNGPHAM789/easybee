# EasyBee — Voice-First ESL Tutor

Real-time voice English tutor for Vietnamese workers in America, powered by Gemini Live API.

> "EasyBee makes English feel like something you're already doing, not something you're studying."

## Features

- **Voice-first**: Real-time bidirectional audio via Gemini Live API WebSocket
- **Vietnamese-first pedagogy**: Tutor speaks Vietnamese, teaches English 3 phrases at a time
- **Micro-lesson loop**: Teach → Combine → Scenario roleplay → Pause + flashcards
- **4 AI tutors**: Thầy Bee, Cô Honey, Anh Max, Chị Linh — each with unique persona and real voice preview
- **IELTS Speaking mode**: Examiner-coach with Part 1/2/3, cue cards, band scoring (FC/LR/GRA/P)
- **Career paths**: Nail Salon, PMU, Daily Life, Restaurant — progress tracking per career
- **Phrase bank**: Every phrase taught is saved permanently with spaced repetition
- **Honest feedback**: No sugarcoating. Stealth English praise. Blame the word, not the student.
- **Pronunciation strictness**: Phonetic breakdowns, max 3 attempts, "trick" not "khó"
- **Session memory**: CEFR assessment, curriculum planning, spaced repetition across sessions
- **Post-session analysis**: Curriculum agent generates summary, next plan, career mapping
- **Auth**: Google OAuth + anonymous guest mode via Supabase
- **API proxy**: Gemini key never exposed to client (Vercel serverless functions)
- **Premium UI**: Monochrome design, word-by-word reveal animations, spring physics, `prefers-reduced-motion` support

## Tech Stack

- **React 19** + TypeScript + Vite
- **Gemini Live API** (`gemini-3.1-flash-live-preview`) for real-time voice
- **Gemini TTS** (`gemini-2.5-flash-preview-tts`) for voice previews
- **Gemini API** (`gemini-2.5-flash`) for post-session curriculum analysis
- **Supabase** (auth + profile sync)
- **Tailwind CSS v4**
- **Motion** (Framer Motion) for animations
- **Lucide React** for icons
- **Vercel** serverless functions for API proxy

## Setup

```bash
npm install
cp .env.example .env
# Add env vars to .env (see below)
npm run dev
```

## Project Structure

```
src/
  App.tsx                      # Main orchestrator — phases, system instruction, UI
  components/
    MicOrb.tsx                 # Mic button with canvas waveform + spring physics
    VoicePicker.tsx            # 4-voice selector with real Gemini TTS previews
    LoginScreen.tsx            # Google OAuth + guest login
    ProgressScreen.tsx         # Career path progress tracking
    CueCard.tsx                # IELTS Part 2 cue card with prep timer
    BandScore.tsx              # IELTS band score display (4 criteria)
  lib/
    audio.ts                   # Web Audio API — capture, resample, playback
    profile.ts                 # localStorage + Supabase profile sync
    curriculum.ts              # Post-session analysis agent
    career-paths.ts            # 4 career paths + IELTS path definitions
    supabase.ts                # Supabase client
    motion.ts                  # Shared animation tokens + reduced-motion hook
api/
  gemini-token.ts              # Returns API key to authenticated users (Vercel serverless)
  curriculum.ts                # Server-side Gemini analysis proxy (Vercel serverless)
public/
  voices/                      # Pre-generated Gemini TTS voice preview clips
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key (server-side only) |
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (serverless functions) |

## Deployment

- **Platform**: Vercel
- **Framework**: Vite
- **Build**: `npm run build` → output in `dist/`
- **Domain**: `easybee-english.vercel.app`
- **Auto-deploy**: from GitHub `HUNGPHAM789/easybee` main branch

## Design Philosophy

- **Voice first, text second** — teach through conversation, not reading
- **Teach 3, not 30** — micro-lessons, not overwhelming vocabulary dumps
- **Honest warmth** — not sugarcoating, not cold. Stealth English praise.
- **UI = invisible** — monochrome, no cards, animations ARE the interface
