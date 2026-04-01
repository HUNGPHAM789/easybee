# EasyBee V2 — Product Plan

## Vision
Voice-first ESL tutor for Vietnamese workers in America. Not a language app — a training partner that makes you actually speak.

## North Star
> "Warm, uplifting, trendy friendly, but elegant, smart and sharp."
> — Boss, 2026-04-01

## Design Philosophy
> "EasyBee makes English feel like something you're already doing, not something you're studying."

- **Voice first, text second** — teach through conversation, not reading
- **Teach 3, not 30** — micro-lessons, not overwhelming vocabulary dumps
- **Honest warmth** — not sugarcoating, not cold. Stealth English praise.
- **UI = invisible** — monochrome, no cards, animations ARE the interface
- **The bee** — small, industrious, produces something sweet from hard work

## Core Loop: Micro-Lesson Cycle

Every session = multiple micro-lesson cycles. Each cycle teaches 3 phrases.

```
🔄 CYCLE (repeats):

1. TEACH (3 phrases, one at a time)
   → Tutor demos pronunciation
   → Student repeats each phrase
   → Fix pronunciation with phonetic breakdown (2-3 attempts)
   → Don't skip errors — "mình cùng thử lại nha"

2. COMBINE
   → "Giờ nối 3 câu lại nha"
   → Student says all 3 in natural sequence
   → Tutor corrects rhythm/flow

3. SCENARIO
   → Roleplay: tutor plays customer/other person
   → Student must respond naturally using learned phrases
   → Tutor may throw curveballs to test adaptation

4. PAUSE + FLASHCARDS
   → "Nice! 3 câu mới — mình ghi lại cho bạn."
   → Frontend shows phrase summary
   → "Muốn học thêm 3 câu nữa không?"
```

## Feedback Language Rules

### Never
- "Giỏi quá" or "Bạn làm tốt lắm" (generic sugarcoating)
- "Nghe lại nè" (condescending)
- Same praise phrase twice in a row
- Blame the student for errors

### Always
- Blame the word, not the student: "chữ này trick lắm — ai cũng bị"
- Vietnamese for instruction, English for praise (stealth teaching)
- Partner frame: "mình cùng thử" not "bạn nói sai"
- Specific feedback: what to fix, how to fix it

## 4 Voice Personas

| Voice | Name | Vibe | API Voice | Status |
|-------|------|------|-----------|--------|
| 🎓 | Thầy Bee (default) | Warm, patient, steady, confident | Orus | ✅ Built + preview |
| 💛 | Cô Honey | Nurturing, real-world salon experience | Kore | ✅ Built + preview |
| ⚡ | Anh Max | High energy, challenge mode, game vibe | Puck | ✅ Built + preview |
| 🌸 | Chị Linh | Calm, precise, elegant, cultural context | Aoede | ✅ Built + preview |

Voice previews are real Gemini TTS audio clips (`public/voices/*.wav`).

## Career Paths (Phrase Bank)

AI teaches freely. Career paths just track progress.

| Path | Phrases | Categories |
|------|---------|------------|
| 💅 Nail Salon Pro | 50 | Greetings, Services, Pricing, Small Talk, Problems, Tips |
| 💄 PMU Expert | 40 | Consultation, Procedure, Aftercare, Pricing |
| 🏠 Daily Life | 60 | Shopping, Healthcare, School, Neighbors, Restaurant, Emergency |
| 🍜 Restaurant | 45 | Greetings, Orders, Menu, Payment, Complaints |
| 📝 IELTS Speaking | 60 | Opinions, Hedging, Linking, Examples, Comparing, Buying Time |

## Pronunciation Rules
- Never skip pronunciation errors
- Break down sounds with Vietnamese phonetic approximation
- "Miệng tròn", "lưỡi cong lên", "bật hơi nhẹ" — physical descriptions
- Max 3 attempts per phrase, then move on with encouragement
- Use the word "trick" not "khó" — reframes difficulty as interesting

## Tech Roadmap

### Phase 1 ✅ DONE
- [x] Voice tutor with Gemini Live API
- [x] Supabase auth (Google + guest)
- [x] API proxy (Vercel serverless functions)
- [x] Deployed on Vercel (`easybee-english.vercel.app`)

### Phase 2 ✅ DONE
- [x] Micro-lesson loop (teach → combine → scenario → pause)
- [x] Voice picker (4 personas with real Gemini TTS preview audio)
- [x] System instruction rewrite (feedback rules, persona, pronunciation strictness)
- [x] Stealth English teaching patterns
- [x] Per-persona instruction variants

### Phase 3 ✅ DONE
- [x] Career paths: Nail Salon, PMU, Daily Life, Restaurant
- [x] Phrase bank (persistent, separate from sessions, de-duplicated)
- [x] Post-session career mapping via curriculum agent
- [x] Progress screen with career path breakdown
- [x] Auto-detect career from first session

### Phase 4 — UI/Animation ✅ DONE
- [x] WordReveal (word-by-word stagger) replaces char-by-char TextReveal
- [x] Phase blur transitions (blur-in/blur-out)
- [x] Animated number counters for stats
- [x] MicOrb idle breathing animation
- [x] Voice picker card stagger + emoji bounce
- [x] `prefers-reduced-motion` support
- [x] Shared animation tokens (`src/lib/motion.ts`)
- [x] Removed card styling — clean text, no backgrounds

### Phase 5 ✅ DONE
- [x] Mode selector: "Học Giao Tiếp" vs "Luyện IELTS Speaking"
- [x] IELTS examiner-coach system instruction (simulate → score → coach → retry)
- [x] Band scoring (Fluency, Vocabulary, Grammar, Pronunciation — 4 criteria)
- [x] Part 2 cue card UI with 1-min prep timer
- [x] IELTS phrase bank (opinions, hedging, linking, examples, comparing, buying time)
- [x] Per-persona IELTS variants

### Code Review ✅ DONE
- [x] 9 bug fixes (audio cleanup, double-click guard, WebSocket reset, dead imports, type safety)
- [x] Security: API key proxy, no client exposure, git history cleaned
- [x] Mobile UX: touch targets, iOS scrolling
- [x] Accessibility: semantic buttons, reduced-motion

### Phase 6 (NEXT)
- [ ] Session history timeline view
- [ ] Weekly progress summary / streak visualization
- [ ] Sharing learned phrases (social/clipboard)
- [ ] Bee mascot/avatar animation
- [ ] Offline flashcard review mode

### Phase 7 (LATER)
- [ ] Group/classroom mode
- [ ] Teacher dashboard (Boss's classes)
- [ ] Natural TTS for flashcard review
- [ ] Cross-device flashcard sync
- [ ] Progressive Web App (installable)

## Files Reference
```
C:\viettutor\
  src/
    App.tsx                    — Main orchestrator
    components/
      MicOrb.tsx               — Mic button + waveform
      VoicePicker.tsx          — 4-voice selector + real audio preview
      LoginScreen.tsx          — Auth UI
      ProgressScreen.tsx       — Career progress
      CueCard.tsx              — IELTS Part 2 cue card
      BandScore.tsx            — IELTS band score display
    lib/
      audio.ts                 — Audio capture/playback
      profile.ts               — Profile + phrase bank + Supabase sync
      curriculum.ts            — Post-session analysis agent
      career-paths.ts          — Career + IELTS path definitions
      supabase.ts              — Supabase client
      motion.ts                — Animation tokens + reduced-motion hook
  api/
    gemini-token.ts            — API key proxy (Vercel)
    curriculum.ts              — Analysis proxy (Vercel)
  public/
    voices/                    — Gemini TTS preview clips
```

---
Last updated: 2026-04-01
