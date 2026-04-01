# Handoff — EasyBee Voice Tutor

## What This Is

A real-time voice English tutor for Vietnamese workers in America (A1) and IELTS exam prep (B1-C1). Uses Gemini Live API for bidirectional voice, with a two-agent architecture: live tutor (voice) + curriculum analyst (text).

Two modes:
- **Conversation**: Teaches 3 phrases at a time using micro-lesson cycles (teach → combine → scenario → pause)
- **IELTS Speaking**: Simulates exam with Part 1/2/3, scores band, coaches technique

4 AI tutor personas with real voice previews. Supabase auth. Career path progress tracking.

## Setup

```bash
git clone https://github.com/HUNGPHAM789/easybee.git
cd easybee
npm install
cp .env.example .env
# Add all 4 env vars to .env
npm run dev
```

Requires Node.js 18+ and env vars:
- `GEMINI_API_KEY` — from [Google AI Studio](https://aistudio.google.com/apikey)
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key

## Key Files

| File | What it does |
|------|-------------|
| `src/App.tsx` | Main orchestrator — phases, modes, system instructions, UI |
| `src/components/MicOrb.tsx` | Mic button — canvas waveform, spring physics, breathing |
| `src/components/VoicePicker.tsx` | 4-voice selector with real Gemini TTS preview audio |
| `src/components/LoginScreen.tsx` | Google OAuth + guest login |
| `src/components/ProgressScreen.tsx` | Career path progress display |
| `src/components/CueCard.tsx` | IELTS Part 2 cue card with prep timer |
| `src/components/BandScore.tsx` | IELTS band score with 4 sub-criteria bars |
| `src/lib/audio.ts` | Audio capture, 16kHz resampling, Base64 encode/decode, playback |
| `src/lib/profile.ts` | localStorage + Supabase profile sync, phrase bank |
| `src/lib/curriculum.ts` | Post-session Gemini API call — summary, CEFR, career mapping |
| `src/lib/career-paths.ts` | Career path definitions (Nail, PMU, Daily, Restaurant, IELTS) |
| `src/lib/motion.ts` | Shared animation tokens, reduced-motion hook |
| `src/lib/supabase.ts` | Supabase client |
| `api/gemini-token.ts` | Vercel serverless — returns API key to authenticated users |
| `api/curriculum.ts` | Vercel serverless — proxies Gemini analysis calls |
| `public/voices/*.wav` | Pre-generated Gemini TTS voice preview clips |

## How the System Instruction Works

Two builder functions in App.tsx:

**`buildSystemInstruction(persona)`** — Conversation mode:
- Micro-lesson loop: teach 3 phrases → combine → scenario roleplay → pause
- Feedback rules: no sugarcoating, stealth English praise, blame the word not student
- Pronunciation: strict, phonetic breakdown, max 3 attempts
- Per-persona style (Thầy Bee = warm/patient, Cô Honey = nurturing/real-world, etc.)
- Career path awareness if student has one

**`buildIELTSInstruction(persona)`** — IELTS mode:
- Simulate → Score (Band + FC/LR/GRA/P) → Coach → Retry cycle
- Part 1/2/3 structure
- Band-raising phrase teaching via [PHRASE] markers
- [CUECARD] and [BAND] markers for visual elements

Both use non-diacritical Vietnamese to avoid API encoding issues. UI text uses proper diacritics.

## How Sessions Work

1. User selects mode (conversation/IELTS) + taps mic
2. App fetches API key from `/api/gemini-token` (auth-gated)
3. WebSocket opens to Gemini Live API with persona-specific system instruction
4. AI greets in Vietnamese, teaches/examines based on mode
5. During lesson: phrases parsed from `[PHRASE]` markers, shown as word-by-word reveal
6. User taps mic to end → session-end screen with stats + phrases
7. Curriculum agent runs in background (Gemini 2.5 Flash via `/api/curriculum`)
8. Phrases saved to phrase bank, mapped to career path categories
9. Everything persisted to localStorage + Supabase

## Voice Personas

| Name | Voice | Vibe | Default? |
|------|-------|------|----------|
| Thầy Bee 🎓 | Orus | Warm, patient, steady | ✅ |
| Cô Honey 💛 | Kore | Nurturing, real-world salon experience | |
| Anh Max ⚡ | Puck | High energy, challenge mode | |
| Chị Linh 🌸 | Aoede | Calm, precise, elegant | |

Voice preview clips are pre-generated Gemini TTS WAV files in `public/voices/`.

## Deployment

- **Platform**: Vercel
- **Framework**: Vite (not Next.js)
- **Build**: `npm run build` → output in `dist/`
- **Env vars**: Set in Vercel project settings (never in code)
- **Repo**: `HUNGPHAM789/easybee` → auto-deploys from main/master
- **Domain**: `easybee-english.vercel.app`

## Known Constraints

- **Client-side primary**: localStorage for speed, Supabase for cross-device sync
- **Gemini Live API**: Requires stable internet, WebSocket connection
- **Browser mic permission**: Required on first visit
- **System instruction**: Non-diacritical Vietnamese to avoid API encoding issues
- **Marker parsing**: Graceful degradation if AI forgets [PHRASE] tags
- **API key**: Server-side only via Vercel serverless proxy. NEVER commit to git.

## Supabase

- **Project**: `cmlbqornppyufehgswuz` (ap-southeast-1)
- **Auth**: Google OAuth + anonymous enabled
- **Table**: `user_profiles` (user_id, cefr_level, goals, streak, total_sessions, total_phrases, last_session, sessions)
- **RLS**: Users can only read/write own profile
