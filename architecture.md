# Architecture — EasyBee Voice Tutor

## Overview

Client-side SPA with Vercel serverless API proxy. Two AI agents: a live tutor (voice) and a curriculum analyst (text). Two modes: Conversation (A1 learners) and IELTS Speaking (B1+ exam prep).

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion) — shared tokens in `src/lib/motion.ts`
- **Icons**: Lucide React (no emoji as UI icons)
- **AI (Live)**: `@google/genai` SDK — Gemini Live API (WebSocket)
- **AI (Analysis)**: Gemini 2.5 Flash via `/api/curriculum` serverless proxy
- **AI (TTS)**: Gemini 2.5 Flash Preview TTS for voice preview generation
- **Auth**: Supabase (Google OAuth + anonymous guest)
- **Persistence**: localStorage (primary) + Supabase `user_profiles` (sync)
- **Fonts**: Inter (body), Comfortaa (brand)

## Module Map

### `src/App.tsx` — Orchestrator (~900 lines)
- Phase state machine: `idle → connecting → lesson → session-end → summary`
- Mode selector: `conversation` | `ielts`
- Dynamic system instruction builder per persona + mode
- `buildSystemInstruction(persona)` — conversation mode with micro-lesson loop
- `buildIELTSInstruction(persona)` — IELTS examiner-coach mode
- Marker parsers: `[PHRASE]...[/PHRASE][VN]...[/VN]`, `[CUECARD]...[/CUECARD]`, `[BAND]...[/BAND]`
- Manages Gemini Live API WebSocket lifecycle
- Auth wrapper: shows LoginScreen if not authenticated
- Voice picker integration: shown on first visit or via header icon

### `src/components/MicOrb.tsx` — Mic Button
- Canvas-based horizontal waveform bars inside a white circle
- Reacts to real audio volume (0-1 prop)
- Spring physics via `useMotionValue` + `useSpring`
- Idle breathing animation (subtle scale pulse)
- States: idle (gray, breathing), connecting (spinner), active (black icon + waveform)

### `src/components/VoicePicker.tsx` — Voice Selection
- 4 personas: Thầy Bee, Cô Honey, Anh Max, Chị Linh
- Real Gemini TTS voice previews (`public/voices/*.wav`)
- Each persona maps to a Live API voice (Orus, Kore, Puck, Aoede)
- Stagger entrance, emoji bounce on select
- Saves to localStorage + Supabase profile

### `src/components/LoginScreen.tsx` — Auth
- Google OAuth sign-in
- Anonymous guest mode (signInAnonymously)
- Monochrome design matching app theme

### `src/components/ProgressScreen.tsx` — Career Progress
- Shows career path progress (X/Y phrases)
- Category breakdown within each path
- Accessible from header icon

### `src/components/CueCard.tsx` — IELTS Part 2
- Visual cue card matching real IELTS format
- 1-minute prep countdown timer
- Bullet point display for cue card prompts

### `src/components/BandScore.tsx` — IELTS Scoring
- Circular band score badge
- 4 animated sub-score bars (FC, LR, GRA, P)
- Monochrome design

### `src/lib/audio.ts` — Audio Engine
- Mic capture via `getUserMedia`
- Custom resampler: browser native rate → 16kHz PCM
- Float32 → Int16 → Base64 encoding for Gemini API
- Playback: decodes Base64 PCM chunks, schedules via `AudioBufferSourceNode`
- Volume analysis via `AnalyserNode` for waveform visualization

### `src/lib/profile.ts` — User Profile & Data
- localStorage CRUD for user profile, sessions, and phrase bank
- Tracks: CEFR level, goals, streak, career path, total sessions/phrases
- Phrase bank: separate `easybee_phrases` key, de-duplicated, mastery tracking
- Supabase sync: `upsertProfileToSupabase()` (fire-and-forget after sessions)
- `syncProfileFromSupabase()` (merges remote profile on login)
- Keeps last 20 sessions to prevent localStorage bloat

### `src/lib/curriculum.ts` — Curriculum Agent
- Runs after each session ends (non-blocking)
- Calls `/api/curriculum` (Vercel serverless → Gemini 2.5 Flash)
- Outputs: session summary, CEFR assessment, next topic/plan
- Career path mapping: categorizes phrases into career categories
- IELTS mode: tracks band scores over time
- Graceful fallback if API call fails

### `src/lib/career-paths.ts` — Career & IELTS Paths
- 4 career paths: Nail Salon (50 phrases), PMU (40), Daily Life (60), Restaurant (45)
- IELTS path: 60 phrases across 6 categories
- Each path has categories with target phrase counts
- Progress calculated from phrase bank

### `src/lib/motion.ts` — Animation System
- Shared transition presets (fast/normal/slow, spring/springSnappy)
- `fadeUp` animation preset used across components
- Phase transition variants (blur-in/blur-out)
- `usePrefersReducedMotion()` hook
- All animations respect OS reduced-motion setting

### `src/lib/supabase.ts` — Supabase Client
- Initialized from `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`
- Throws explicit error if env vars missing

### `api/gemini-token.ts` — API Key Proxy (Vercel)
- Validates Supabase JWT from Authorization header
- Returns `GEMINI_API_KEY` to authenticated users only
- Key never exposed in client JS

### `api/curriculum.ts` — Analysis Proxy (Vercel)
- Receives prompt from client
- Calls Gemini 2.5 Flash server-side
- Returns analysis text
- Validates auth before processing

## Data Flow

### During Session (Conversation Mode)
```
User speaks → AudioHandler captures → resample 16kHz → Base64 → WebSocket → Gemini
Gemini → audio chunks + text → AudioHandler plays audio → App parses text for markers
[PHRASE] markers → WordReveal display + learnedPhrases array
Micro-lesson cycle: Teach 3 → Combine → Scenario → Pause
```

### During Session (IELTS Mode)
```
Same audio flow as conversation
[CUECARD] markers → CueCard component with timer
[BAND] markers → BandScore component
Cycle: Simulate → Score → Coach → Retry
```

### After Session
```
learnedPhrases + transcript → /api/curriculum → Gemini 2.5 Flash → analysis
Analysis → career path mapping → phrase bank update → profile save
Profile → localStorage + Supabase sync
```

### Next Session
```
profile.ts → buildSystemInstruction(persona) → injects user context + recap + review phrases
Gemini Live API receives personalized instruction → greets user with recap
```

## Design System

Monochrome only. No color accents.

| Token | Value |
|-------|-------|
| Primary text | `#0a0a0a` |
| Secondary text | `#8a8a8a` |
| Muted text | `#b0b0b0` |
| Background | `#ffffff` |
| Subtle bg | `#f2f2f2` |
| Border | `#e0e0e0` |
| Border radius | `rounded-xl` |
| Brand font | Comfortaa 700 |
| Body font | Inter 300-600 |

## Animation Principles

- Word-by-word reveal (WordReveal) for phrases, not character-by-character
- Phase transitions use blur-in/blur-out with y-movement
- Spring physics for interactive elements (mic, voice cards)
- Stat counters animate from 0 to final value
- All animations respect `prefers-reduced-motion`
- Duration: 200-600ms max. Easing: `[0.22, 1, 0.36, 1]`
