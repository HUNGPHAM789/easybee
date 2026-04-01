# Handoff — EasyBee Speaking Tutor

## What This Is

A real-time voice English tutor for Vietnamese beginners (CEFR A1). Uses Gemini Live API for bidirectional voice, with a two-agent architecture: live tutor (voice) + curriculum analyst (text).

The tutor speaks Vietnamese as the primary language, teaching English phrases one at a time. It remembers users across sessions, tracks progress, and plans personalized curricula.

## Setup

```bash
git clone https://github.com/HUNGPHAM789/easybee.git
cd easybee
npm install
cp .env.example .env
# Add GEMINI_API_KEY to .env
npm run dev
```

Requires Node.js 18+ and a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

## Key Files

| File | What it does |
|------|-------------|
| `src/App.tsx` | Main app — phases, system instruction, UI, Gemini Live connection |
| `src/components/MicOrb.tsx` | Mic button — canvas waveform, spring physics, pulse rings |
| `src/lib/audio.ts` | Audio capture, 16kHz resampling, Base64 encode/decode, playback |
| `src/lib/profile.ts` | localStorage profile — CEFR, goals, streak, sessions |
| `src/lib/curriculum.ts` | Post-session Gemini API call — summary, CEFR assessment, next plan |

## How the System Instruction Works

`buildSystemInstruction()` in App.tsx generates a different prompt based on user state:

- **New user**: Greets, asks about goals (travel/work/daily), asks topic preference, then teaches
- **Returning user**: Recaps last session, suggests next topic from curriculum plan, reviews 3 old phrases via spaced repetition

The instruction uses `[PHRASE]...[/PHRASE][VN]...[/VN]` markers so the frontend can extract taught phrases and display them as flashcards.

## How Sessions Work

1. User taps mic → WebSocket opens to Gemini Live API
2. AI greets in Vietnamese, asks topic
3. During lesson: AI teaches phrases (marked with tags), frontend shows flashcards
4. User taps mic to end → session-end screen shows stats + phrases
5. Curriculum agent runs in background (Gemini 2.5 Flash) → generates summary + next plan
6. Everything saved to localStorage
7. Next session: system instruction includes profile + recap + review phrases

## Deployment

- **Platform**: Vercel
- **Framework**: Vite (not Next.js)
- **Build**: `npm run build` → output in `dist/`
- **Env var**: `GEMINI_API_KEY` must be set in Vercel project settings
- **Repo**: `HUNGPHAM789/easybee`
- **Branch**: `main`

## Known Constraints

- **Client-side only**: No backend. All persistence is localStorage (device-bound)
- **Gemini Live API**: Requires stable internet. Audio streams via WebSocket
- **Browser mic permission**: Required on first visit. Handled by user clicking mic button
- **System instruction**: Written in non-diacritical Vietnamese to avoid API encoding issues. UI text uses proper Vietnamese diacritics
- **Marker parsing**: If AI forgets `[PHRASE]` tags, text still shows but no flashcard appears (graceful degradation)

## Future Work

- Supabase backend for cross-device profile sync + user accounts
- Bee mascot/logo integration
- Voice selection (male/female)
- Lesson history timeline view
- Weekly progress email/notification
- Sharing learned phrases to social media
