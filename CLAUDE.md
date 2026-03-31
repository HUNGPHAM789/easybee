# EasyBee

ESL learning app for Vietnamese nail salon workers (target: 40-50yo, reduced eyesight).

## Core Concept
Simple, touch-first English drills. No gamification, no Duolingo energy.
Think Notes.app meets a premium language tutor.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind v4 (semantic scale, no hardcoded px)
- Framer Motion (layout/reveal animations — never wrap tap targets)
- GSAP (word-by-word text entrance animations via `WhisperTextInstant`)
- Web Speech API (TTS + speech recognition — no API key needed)

## Design System

### Font Scale
One number controls all sizes: `html { font-size: Xpx }` in `globals.css`.
All components use Tailwind semantic classes (text-sm, text-base, text-lg etc).

### Fonts
- **Comfortaa** (`--font-title`) — titles, labels, section headings
- **Inter** (`--font-body`) — body text, phrases, hints
- Apply title font via `font-title` class or `h1/h2/h3` selector

### Action Buttons (`ActionButton.tsx`)
Global component — change style in `ActionButton.tsx` to retheme all buttons.
Colors driven by CSS vars in `globals.css`: `--btn-bg: #E5E5EA` (Apple keyboard gray), `--btn-text: #1c1c1e`.
Never hardcode button colors inline — always use `<ActionButton>`.

### Icon Buttons (`IconButton.tsx`)
Global component for speaker/mic icons.
Current: `bg-transparent active:bg-neutral-100`, dark gray icon.
Change in `IconButton.tsx` to retheme all icon buttons.

### Colors
- Background: white `#ffffff`
- Primary text: `#1a1a1a`
- Muted text: `text-neutral-400` / `text-neutral-300`
- Borders: `border-neutral-100`
- Cards: `bg-neutral-50` with `rounded-2xl`

## Touch Rules (CRITICAL)
- **Never use `motion.button` or `motion.div onTap`** — breaks on iOS/Android Chrome
- **Always use plain `<button onClick>`** for tap targets
- Use `motion.div` only for animations wrapping non-interactive content
- All divs with `onClick` need `cursor: pointer` (iOS Safari quirk)
- Add `allowedDevOrigins: ['192.168.1.188']` to `next.config.ts` for phone testing

## Animation System

| Component | Library | Used For |
|-----------|---------|----------|
| `WhisperTextInstant` | GSAP | Prompt text on all drill cards — words slide up on mount |
| `BlurredStagger` | Framer Motion | Answer reveals — chars blur in (dialogue + fill answers) |
| `TextReveal` | Framer Motion | Page headings only (student greeting) |
| Framer Motion `motion.*` | Framer | Layout transitions, accordion expand, progress bar spring |

**Rule:** prompt = WhisperTextInstant, answer reveal = BlurredStagger. Never mix.

## Drill Screen Architecture
- `read` cards → `SpeechDrill` component (listen × 2 → mic morphs in → 2 speech attempts)
- `recall` cards → tap to reveal answer
- `fill` cards → inline blank (`___`) with underline, word fills in on reveal
- `dialogue` cards → prompt shows Vietnamese cue, tap reveals English dialogue + speak button
- Navigation: swipe via Embla carousel (`MotionCarousel`), tap hint at bottom
- Screen taps disabled on `read` cards (SpeechDrill controls flow)
- **Drill count per lesson: 10** (3 read + 3 recall + 3 fill + 1 dialogue — one fill per phrase)

## SpeechDrill UX
1. One button, two phases:
   - Phase 1: Speaker icon — tap to listen (2 dots show progress)
   - Phase 2: After 2 listens → button morphs to mic icon
2. Tap mic → records → word-by-word color feedback (green/orange/red)
3. 2 attempts required, "Tiếp tục →" unlocks after both
4. Scoring: word overlap % + Levenshtein distance for "close" matches
5. No hard pass/fail — always allows continuing

## UI Components (`components/ui/`)

These are animation/interaction primitives. **If deleted, recreate exactly as documented below** — Claude Code has no memory between sessions.

### `text-reveal-animation.tsx`
**Export:** `TextReveal`
**Props:** `word: string`, `className?: string`
**Behavior:** Splits `word` into chars, each `motion.span` animates from `{ opacity:0, y:20 }` to visible with staggered delay (0.04s per char), cubic-bezier `[0.22,1,0.36,1]`, 0.35s duration.
**Used in:** `app/page.tsx` (page heading "Lớp học của {name}"), `DrillScreen.tsx` (completion "Hoàn thành!")

### `whisper-text.tsx`
**Exports:** `default WhisperText`, `WhisperTextInstant`
**Props:** `text: string`, `className?: string`, `delay?: number` (ms per word), `duration?: number`, `x?: number`, `y?: number`, `triggerStart?: string`
**Behavior:** GSAP-powered word-by-word reveal. `WhisperText` = scroll-triggered (ScrollTrigger). `WhisperTextInstant` = mount-triggered (no scroll). Uses `gsap.context()` scoped to `containerRef` — no `[data-word]` selector leak.
**Used in:** `LessonDetail.tsx` (English phrase text), `DrillScreen.tsx` (drill prompts)

### `blurred-stagger.tsx`
**Export:** `BlurredStagger`
**Props:** `text: string`, `className?: string`, `as?: "p" | "span" | "div"` (default `"p"`)
**Behavior:** Container `motion[Tag]` animates `opacity 0→1` with `staggerChildren: 0.015`. Each char `motion.span` animates from `{ opacity:0, filter:"blur(10px)" }` to visible, duration 0.3s. Use `as="span"` for inline contexts (e.g. inside a flex row).
**Source:** Ruixen UI (ruixen.com) — verbatim logic, `as` prop added for inline use.
**Used in:** `DrillScreen.tsx` (answer reveal on recall/dialogue cards)

### `motion-carousel.tsx`
**Export:** `MotionCarousel`
**Props:** `slides: ReactNode[]`, `selectedIndex: number`, `onSlideChange: (i) => void`, `options?: EmblaOptionsType`
**Behavior:** Embla-based horizontal swipe carousel. Controlled externally via `selectedIndex`. Fires `onSlideChange` on swipe. Used to swipe between drill cards.
**Dependency:** `embla-carousel-react`, `embla-carousel`
**Used in:** `DrillScreen.tsx` (drill card navigation)

### `search-bar.tsx`
**Export:** `default SearchBar`
**Props:** `onSearch: (query: string) => void`
**Behavior:** Expandable search input. Collapsed = search icon. Tapped = expands with text input, clear button. Left-anchored expand animation.
**Used in:** `app/page.tsx` (lesson search)

---

## File Structure
```
app/
  page.tsx            — main lesson list (modules → classes → lessons → detail) + search
  layout.tsx          — fonts, metadata
  globals.css         — font scale, btn tokens, touch fixes
components/
  ActionButton.tsx    — GLOBAL action button (change here = all buttons change)
  IconButton.tsx      — GLOBAL icon button (speaker/mic)
  DrillScreen.tsx     — full drill flow (all card types)
  LessonDetail.tsx    — phrase cards + start drill button
  NameSetup.tsx       — first-visit name capture (localStorage)
  SpeechDrill.tsx     — listen/speak component for read cards
  SpeakButton.tsx     — speaker icon using IconButton
  ui/
    motion-carousel.tsx       — Embla-based swipe carousel
    search-bar.tsx            — expandable search (left-anchored, expands right)
    whisper-text.tsx          — GSAP word-stagger animations (WhisperText + WhisperTextInstant)
    text-reveal-animation.tsx — char-by-char Framer Motion slide-up (TextReveal) — used for headings
    blurred-stagger.tsx       — Framer Motion char blur-in (BlurredStagger) — used for answer reveals
lib/
  content.ts          — all lesson data (source of truth, Phase 1/2)
  content/
    index.ts          — DATA ACCESS LAYER — import from here, never content.ts
    types.ts          — shared interfaces (DrillCard, Lesson, Class, Module, CEFRLevel)
    SCHEMA.md         — Supabase SQL schema + Phase 3 migration plan
    nail-salon/       — per-class files (placeholder, populated in Phase 2)
scripts/
  gen-lesson.js       — Gemini lesson generator
```

## ID System
- **Lesson IDs**: `L01`–`L99` — **globally sequential across the entire app**, never reset per class or module
- **DrillCard IDs**: `L__C__` — lesson prefix + 2-digit card number (e.g. `"L01C03"`) — globally unique
- **Class/Module IDs**: kebab-case strings (e.g. `"basic-communication"`)
- **Next ID auto-assigned** by `gen-lesson.js` — scans all `*.ts` in `lib/content/nail-salon/`, finds highest existing lesson ID, increments

### Current ID map
| Range | Module | Class | Status |
|-------|--------|-------|--------|
| L01–L09 | Nail Salon | Basic Communication | ✅ 9/9 |
| L10–L18 | Nail Salon | Services | ✅ 9/9 |
| L19–L27 | Nail Salon | Difficult Situations | ✅ 9/9 |
| L28–L36 | Nail Salon | Daily Life | ✅ 9/9 |
| L37–L56 | Nail Salon | Nail Care Techniques | ✅ 9/9 |
| L43–L62 | Nail Salon | Money & Tips | ✅ 9/9 |
| L46–L68 | Nail Salon | Building Relationships | ✅ 9/9 |
| L69–L72, L103–L107 | Permanent Makeup | Consultation | ✅ 9/9 |
| L73–L81 | Permanent Makeup | During Procedure | ✅ 9/9 |
| L82–L90 | Permanent Makeup | Aftercare | ✅ 9/9 |
| L91–L96 | Permanent Makeup | Pricing & Business | ✅ 6/6 |
| L97–L102 | Permanent Makeup | Problem Situations | ✅ 6/6 |
| L108–L116 | Shopping & Errands | Grocery Store | ✅ 9/9 |
| L117–L125 | Shopping & Errands | Pharmacy | ✅ 9/9 |
| L126–L134 | Shopping & Errands | Clothing & Shopping | ✅ 9/9 |
| L135–L143 | Shopping & Errands | Bank & Post Office | ✅ 9/9 |
| L144–L152 | Healthcare | At the Doctor | ✅ 9/9 |
| L153–L161 | Healthcare | At the Dentist | ✅ 9/9 |
| L162–L170 | Healthcare | Emergency Phrases | ✅ 9/9 |
| L171–L179 | Community | School & Kids | ✅ 9/9 |
| L180–L188 | Community | Neighbors & Building | ✅ 9/9 |
| L189–L197 | Community | Restaurants | ✅ 9/9 |
| L198+ | — | next available | — |

When adding a new module (e.g. Healthcare), IDs continue from wherever Nail Salon left off. No reset.

### ID Rules (MUST FOLLOW — prevent gaps)
1. **IDs are ALWAYS auto-assigned by the gen script** — never manually pick an ID
2. **Gen script scans ALL class files** to find the highest existing ID, then increments by 1
3. **NEVER align IDs to match CONTENT_ROADMAP.md numbering** — roadmap lesson numbers are labels, not IDs. L10 in roadmap ≠ lesson id "L10" in code.
4. **If a generation fails**, the ID is still consumed — next run will skip it. This is fine. Run a renumber script to close gaps after a batch.
5. **Renumber script**: After any batch generation, run audit + renumber to keep contiguous. Use two-pass rename via temp IDs (old→L_TXX→final) to avoid collisions.
6. **CONTENT_ROADMAP.md is a planning document** — it tracks topics and completion status, NOT lesson IDs. Don't map roadmap row numbers to lesson IDs.

## Content Schema
```ts
type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"

DrillCard { id: string, type: "read"|"recall"|"fill"|"dialogue", prompt: string, hint: string, answer: string, answerHint?, pronunciation? }
Lesson { id: string, title, titleVi, level?: CEFRLevel, context, phrases: [{english, vietnamese, pronunciation}], drill: DrillCard[] }
Class { id: string, title, titleVi, lessons: Lesson[] }
Module { id: string, title, titleVi, classes: Class[] }
```

## User Features
- **Name setup**: first visit → asks name → stored in `localStorage("easybee_name")` → shows "Lớp học của [name]"
- **Search**: expandable search bar below greeting — filters lessons/classes by title, expands rightward
- **CEFR badge**: shown next to lesson title (A1/A2/B1 etc) — add `level` field to lesson object

## Speech Recognition — Platform Notes

### Current (Web)
- **Chrome mobile** — works via `webkitSpeechRecognition`. Full mic + 2-attempt drill.
- **Safari (iOS)** — Apple removed `webkitSpeechRecognition`. No mic available on web.
  - Fallback: listen × 2 (speaker button) → "Tiếp tục →" directly. No mic, no error.
  - Detection: `isSpeechSupported()` in `SpeechDrill.tsx` checks at runtime.

### Future — Native iOS App (App Store)
- Wrap with **Capacitor** (`npm install @capacitor/core @capacitor/ios`)
- Use `@capacitor-community/speech-recognition` plugin → full `AVSpeechRecognizer` access
- Mic works natively, same `SpeechDrill` component with Capacitor plugin swapped in
- Submit to App Store → users get full listen → speak → feedback flow on iPhone
- This is the target experience for 40-50yo Vietnamese nail salon workers

### TTS (Text-to-Speech)
- Uses Web Speech API `SpeechSynthesisUtterance` — free, no API key
- Works on both Safari and Chrome
- Rate: 0.82 (slightly slower for ESL learners)
- Prefers: Samantha / Google US English / Karen / Daniel voices

## App Philosophy & Vision

### Who this is for
Vietnamese nail salon workers in America, 40-50yo, limited English. They need English **tomorrow**, not in 6 months. Every lesson must earn its place by being immediately useful on the job.

### What makes EasyBee different
- **Textbooks** — formal English, classroom context, useless for nail salon
- **TikTok/YouTube** — random, unstructured, can't practice, no progression
- **EasyBee** — real nail salon scenarios, structured progression A1→B2, daily 10-min practice with speech feedback

**Our moat:** No one else has built ESL content specifically for Vietnamese nail salon workers. The combination of context + structure + speech practice is unique.

### Lesson content philosophy
1. **Real over formal** — "You good?" at A2, not just "How are you?" Workers hear casual English all day. If they only learn formal, they get lost.
2. **Progression matters** — A1 survival → A2 functional → B1 natural → B2 fluent/cultural. Don't rush to slang, don't stay formal forever.
3. **Context is king** — Every lesson must answer "when would I actually use this at the salon?" If it doesn't, cut it.
4. **The unsexy stuff** — Holding phrases, numbers, tips, payment issues. These happen 50x a day but never appear in textbooks. These are EasyBee's highest-value lessons.
5. **Trash in, trash out** — Review every Gemini-generated lesson before shipping. Check: are phrases natural? Is Vietnamese accurate? Is pronunciation readable? Is the dialogue realistic?

### CEFR progression framework
```
A1 — Survival: understand and say the minimum to do the job
A2 — Functional: handle most common situations confidently  
B1 — Natural: participate in conversations, not just respond
B2 — Fluent: initiate, joke, build real relationships with customers
```

Casual English enters at A2 (not B2). Slang/humor at B2. Don't wait — workers hear casual from day one.

### Module strategy
Each module = one real-world context. Students can learn multiple modules simultaneously at their level. Modules are independent, can be sold/unlocked separately.

**9 modules — a complete English-in-America curriculum for Vietnamese immigrants.**
From day 1 at the nail salon to buying their first house.

### Priority 1 — Day 1 (use it tomorrow)
- **Module 1: Nail Salon English** — core product, 63 lessons, 7 classes. Revenue-generating skill used every single day.

### Priority 2 — First 6 months (can't wait)
- **Module 2: Healthcare English** — doctor visits, pharmacy, ER, understanding diagnosis, insurance paperwork
- **Module 3: Shopping & Errands** — grocery, returns, post office, asking for help, coupons
- **Module 8: Emergency & Safety** — roadside assistance, 911, car accidents, police reports, insurance claims. Language failure here has the worst real-world consequences — can't wait until B1.

### Priority 3 — First year (building a life)
- **Module 4: School & Parenting** — teacher meetings, parent-teacher conferences, school events, helping kids
- **Module 5: Social English** — making American friends, humor, small talk anywhere, celebrations, neighbors
- **Module 7: Money & Banking** — opening accounts, ATM, credit cards, disputing charges, loan applications, understanding statements, building credit

### Priority 4 — When ready to grow (B1+ level)
- **Module 6: Workplace Rights & Conversations** — talking to boss, asking for raise/day off, calling in sick, worker rights (wage theft, unsafe conditions, unpaid overtime). High economic impact — changes financial lives.
- **Module 9: Big Life Decisions** — buying a car (negotiation, financing, test drive), renting apartment (lease, deposit), buying a house (realtor, mortgage, inspection). Requires B1/B2 — confidence + vocabulary to navigate high-stakes negotiations.

### Why this sequencing matters
Emergency English (Module 8) is Priority 2, not Priority 4. A flat tire, a fender bender, a 911 call — these happen randomly regardless of English level. A worker who can't call roadside assistance or describe an accident to police is genuinely unsafe. Don't gate this behind fluency.

Big Purchases (Module 9) is Priority 4 because car and house negotiations require real fluency. Teaching negotiation tactics to an A1 student does more harm than good — they'll attempt it without the foundation to pull it off.

Full lesson roadmap: see `CONTENT_ROADMAP.md`

### Content generation workflow
```bash
node scripts/gen-lesson.js "topic" "A2"
# → Review output (English natural? Vietnamese accurate? Pronunciation readable?)
# → Paste into lessons: [...] array in lib/content/nail-salon/<class>.ts
# → CRITICAL: paste INSIDE lessons:[] not inside a drill:[] array
# → Add comma after the previous lesson's closing }
# → Update CONTENT_ROADMAP.md: 🔲 todo → ✅ done
# → Run: npx tsc --noEmit to confirm no errors
```

**Common mistake:** Lessons accidentally pasted inside a drill:[] array instead of the lessons:[] array. Always check the surrounding context before pasting.

### Batch generation v3 (recommended — fully automated)
```bash
node scripts/batch-gen-v3.js --plan scripts/batch-plan.json
# --dry-run to preview without generating
```
One command does everything:
1. Reads plan file → generates each lesson via Gemini 2.0 Flash
2. Auto-detects next lesson ID (scans all content files)
3. Inserts directly into the target class file (no Claude Code middleman)
4. Runs `tsc --noEmit` after each insert — rolls back on TS error
5. Retries up to 3x on Gemini parse failures
6. Saves `.debug` copy before rollback for inspection

**Plan file format** (`scripts/batch-plan.json`):
```json
[
  {
    "class": "Class Name",
    "file": "class-file.ts",
    "module": "module-folder-name",
    "lessons": [
      { "topic": "description of what to teach", "level": "A1" }
    ]
  }
]
```

### Other generators
- `gen-lesson.js` — single lesson via **Claude CLI** (higher quality, free with Max sub), prints to stdout
- `batch-gen-v2.js` — generates JSON files via Gemini, then needs Claude Code to insert (2-step)
- `gen-from-json.js` — deterministic, no API key, takes pre-written phrases JSON

### Engine note
- `batch-gen-v3.js` uses **Gemini 2.0 Flash** (API key, fast, cheap)
- `gen-lesson.js` uses **Claude CLI** (Max subscription, higher quality for single lessons)

### CEFR Level Completion & Progression System

**The core question:** What does "completing A1" actually mean?

Finishing lessons ≠ level mastery. A student who taps through 20 A1 lessons without speaking isn't A1-complete.

**Definition of level completion (target design):**
```
A1 Complete =
  80% of A1 lessons finished across active modules
  + speech score ≥ 60% on 5 consecutive read cards
  + 3-day practice streak

A2 Complete =
  80% of A2 lessons + speech scores consistently improving

B1 Complete =
  80% of B1 lessons + dialogue drills completed consistently

B2 Complete =
  80% of B2 lessons + high speech accuracy maintained
```

**What each level means in real life:**
- **A1** — Can survive: say what they need, understand basic responses
- **A2** — Can function: handle most daily situations at work confidently
- **B1** — Can participate: initiate conversations, not just respond to them
- **B2** — Can connect: build real relationships, use humor, feel at home

**Cross-module learning:**
Students learn multiple modules simultaneously at the same CEFR level. A1 in Nail Salon + A1 in Healthcare + A1 in Shopping = richer A1 competency than any single module alone. The same phrases reinforced across contexts = faster, deeper retention.

**MVP (current Phase 1/2):**
No server-side tracking yet. Show progress per module as lesson count only ("6/9 in Class 1"). CEFR badge on each lesson tells students where they are.

**Phase 3 (Supabase):**
Full progress tracking — lessons completed, speech scores over time, streak data, CEFR level unlocks. This is when the progression system becomes fully implemented.

### Cross-module phrase overlap — intentional
Some phrases ("How are you?", "Thank you!", numbers) will appear across multiple modules. This is fine — it's spaced repetition across contexts, which accelerates learning. The brain encodes a phrase deeper when it encounters it in different real-world situations (nail salon vs doctor vs grocery store).

**Rule:** Overlap is good if the *context and expected response* differ. Don't copy-paste the same lesson — vary the dialogue, setting, and stakes to make each instance meaningful.

Always review before pasting. Gemini is good but not perfect for:
- Pronunciation hints (sometimes too phonetic or wrong)
- Vietnamese accuracy (especially formal vs informal register)
- Dialogue realism (sometimes too scripted)

## Content Architecture & Scaling Plan

### Hierarchy
```
Module → Class (unlimited lessons) → Lesson → 3 Phrases + 10 Drill cards
```
- **Module** = broad topic domain (e.g. Nail Salon English, Daily Life)
- **Class** = theme within a module (e.g. Basic Communication, Services)
- **Lesson** = one session (~10 min), always 3 phrases + 10 drills
- No limit on lessons per class — add as many as the topic warrants

### Golden Rule
**Components always import from `@/lib/content/index` — never from `content.ts` directly.**
Phase 3 migration = swap 4 functions in `index.ts`, zero component changes.

### Phase 1 (current — single content.ts)
- All data in `lib/content.ts` (~100 lines/lesson)
- Trigger to split: when `content.ts` exceeds ~2,000 lines (~20 lessons)
- `index.ts` re-exports static data synchronously

### Phase 2 (20+ lessons — per-class file split)
Split by class into `lib/content/<module>/<class>.ts`:
```
lib/content/nail-salon/basic-communication.ts  ← all lessons for this class
lib/content/nail-salon/services.ts
lib/content/nail-salon/difficult-situations.ts
lib/content/nail-salon/daily-life.ts
```
Next.js code-splits automatically — only loads the class the user taps.
Placeholder files already exist. Migration = move data + update `index.ts` barrel.

### Phase 3 (multi-user / teacher dashboard — Supabase)
1. Run SQL schema from `lib/content/SCHEMA.md` in Supabase
2. Run `node scripts/migrate-to-supabase.js` (to be built)
3. Swap 4 async functions in `lib/content/index.ts` to Supabase queries
4. Delete `lib/content.ts`
5. Components untouched

Enables: teacher accounts, lesson creation UI, user progress tracking.

### Content Roadmap

| Module | Class | Lessons | Status |
|--------|-------|---------|--------|
| Nail Salon | Basic Communication | 9 | ✅ |
| Nail Salon | Services | 9 | ✅ |
| Nail Salon | Difficult Situations | 9 | ✅ |
| Nail Salon | Daily Life | 9 | ✅ |
| Nail Salon | Nail Care Techniques | 9 | ✅ |
| Nail Salon | Money & Tips | 9 | ✅ |
| Nail Salon | Building Relationships | 9 | ✅ |
| Permanent Makeup | Consultation | 9 | ✅ |
| Permanent Makeup | During Procedure | 9 | ✅ |
| Permanent Makeup | Aftercare | 9 | ✅ |
| Permanent Makeup | Pricing & Business | 6 | ✅ |
| Permanent Makeup | Problem Situations | 6 | ✅ |
| Shopping & Errands | Grocery Store | 9 | ✅ |
| Shopping & Errands | Pharmacy | 9 | ✅ |
| Shopping & Errands | Clothing & Shopping | 9 | ✅ |
| Shopping & Errands | Bank & Post Office | 9 | ✅ |
| Healthcare | At the Doctor | 9 | ✅ |
| Healthcare | At the Dentist | 9 | ✅ |
| Healthcare | Emergency Phrases | 9 | ✅ |
| Community | School & Kids | 9 | ✅ |
| Community | Neighbors & Building | 9 | ✅ |
| Community | Restaurants | 9 | ✅ |

**Total: 197 lessons across 5 modules**

Add lessons with: `node scripts/batch-gen-v3.js --plan scripts/batch-plan.json`

### Lesson Generation
```bash
# Batch (recommended): edit batch-plan.json, then:
node scripts/batch-gen-v3.js --plan scripts/batch-plan.json

# Single lesson (prints to stdout, manual paste):
node scripts/gen-lesson.js "topic" "A2"
```

## Dev
- Local: `npm run dev --experimental-https` at `C:\easyenglish`
- Phone: `https://192.168.1.188:3000` (HTTPS required for mic)
- First visit: Chrome shows cert warning → Advanced → Proceed → then allow mic
- Fonts need Vietnamese subset: `Inter({ subsets: ["latin", "vietnamese"] })`
- `allowedDevOrigins: ['192.168.1.188']` in `next.config.ts` — required for phone testing
