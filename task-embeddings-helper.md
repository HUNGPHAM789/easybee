# Task: EasyBee AI Helper — Embeddings + Voice Onboarding + Floating Assistant

Read CLAUDE.md first for design system, touch rules, and architecture.

## Overview

Build an AI voice assistant ("EasyBee Helper") that:
1. Pre-computes embeddings for all 197 lessons
2. Greets new users with voice conversation (Live API) to understand their needs
3. Uses embeddings to match user intent → recommended lessons
4. Stays available as a floating 🐝 button on every screen

---

## Phase A: Pre-compute Lesson Embeddings

### Script: `scripts/generate-embeddings.js`

```js
// For each lesson, combine into a single text block:
// `${title} ${titleVi} ${context} ${phrases.map(p => p.english + ' ' + p.vietnamese).join(' ')}`
// 
// Call Gemini Embedding API:
// POST https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent
// Headers: x-goog-api-key: process.env.GEMINI_API_KEY || "AIzaSyCLlEOAAKPC052t6U0kjTQ2l0lC3-mUPAw"
// Body: { "model": "models/text-embedding-004", "content": { "parts": [{ "text": combinedText }] } }
// Response: { "embedding": { "values": [0.012, -0.034, ...] } }
//
// Also embed at module level and class level for broader matching.
//
// Output: lib/embeddings.json
// Format: { 
//   "lessons": { "L01": [...768 floats...], "L02": [...], ... },
//   "classes": { "nail-salon-basic-communication": [...], ... },
//   "modules": { "nail-salon": [...], ... }
// }
//
// Rate limit: add 100ms delay between requests (Google rate limits)
```

Import content from `lib/content.ts` (use dynamic import or require).
The script should be runnable with: `node scripts/generate-embeddings.js`

After generating, the JSON file should be committed to the repo (it's static data, ~300KB).

### API Route: `app/api/embed/route.ts`

```ts
// POST /api/embed
// Body: { "text": "user's spoken text" }
// Returns: { "embedding": number[] }
// Uses same Gemini embedding model server-side
// Also accepts: { "text": "...", "match": true, "topN": 5 }
// When match=true, loads embeddings.json, computes cosine similarity, returns top N lessons
```

### API Route: `app/api/match-lessons/route.ts`

```ts
// POST /api/match-lessons  
// Body: { "text": "tôi muốn học nói chuyện khi khách complain" }
// 1. Embeds the text via Gemini API
// 2. Loads lib/embeddings.json
// 3. Computes cosine similarity against all lesson embeddings
// 4. Returns top 5-10 matches: { matches: [{ lessonId: "L19", title: "...", titleVi: "...", score: 0.87 }, ...] }
// 5. Also returns module-level match for broader routing
```

Cosine similarity function:
```ts
function cosineSim(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
```

---

## Phase B: Voice Onboarding Flow

### Replace current onboarding (`app/onboarding/page.tsx`)

Instead of form fields, show a voice conversation UI:

**UI Design:**
- Full screen, white bg, centered
- EasyBee logo/icon at top (use 🐝 emoji, large)
- Large animated mic button in center (reuse the Siri-style design from VoiceTeacher)
- Transcript area below showing the conversation
- Each message: left-aligned for EasyBee (with 🐝 prefix), right-aligned for user
- Skip button at bottom: "Bỏ qua →" (goes straight to lesson list with no recommendations)

**Conversation Flow (system prompt for Live API):**
```
You are EasyBee, a friendly Vietnamese-speaking AI tutor assistant. You help Vietnamese workers in America learn English.

Your job right now: have a short, warm conversation (3-5 turns) with a new student to understand their needs.

CONVERSATION STEPS:
1. Greet warmly in Vietnamese: "Chào bạn! Mình là EasyBee 🐝 Rất vui được gặp bạn! Cho mình hỏi vài câu nha."
2. Ask how they found the app: "Bạn biết EasyBee từ đâu vậy?" (save answer as survey data)
3. Ask about their job: "Bạn đang làm nghề gì ở Mỹ?" (follow up naturally based on answer)
4. Ask what they need: Based on their job, ask what English situations they struggle with most. Be specific. If they say nail tech, ask "Bạn muốn học nói chuyện với khách, hay học về tiền tip, hay cần đi bác sĩ mà không biết nói?" 
5. Wrap up: "Tuyệt vời! Mình hiểu rồi. Để mình chọn bài học phù hợp cho bạn nha!" Then end the conversation.

RULES:
- Speak Vietnamese primarily, mix simple English phrases when relevant
- Keep it warm, casual, encouraging — like a friend, not a teacher
- Short sentences (these are ESL learners, even Vietnamese might be casual)
- Maximum 5 turns from your side, then wrap up
- After wrapping up, output a special marker: [ONBOARDING_COMPLETE]
```

**After conversation ends:**
1. Collect all user responses from transcript
2. Send combined text to `POST /api/match-lessons`
3. Get top 10 matching lessons
4. Save to Supabase user_metadata:
   - `onboarded: true`
   - `source: <how they found the app>`
   - `job: <their job>`
   - `needs: <what they want to learn>`
   - `recommended_lessons: ["L19", "L25", ...]`
5. Also save to localStorage as `easybee_recommended`
6. Redirect to home page

**On home page (`app/page.tsx`):**
- If `recommended_lessons` exists in user metadata, show a "Bài học gợi ý cho bạn" (Recommended for you) section at the top of Bài Học tab
- This section shows the matched lessons as cards (horizontal scroll)
- Tapping a card opens that lesson
- Below this section, show the full module tree as normal

---

## Phase C: Floating Helper Button

### Component: `components/FloatingHelper.tsx`

**Always visible on every screen EXCEPT:**
- Login page
- Onboarding page  
- During active drill (DrillScreen)

**UI:**
- Fixed position bottom-right (bottom: 80px to sit above tab bar, right: 20px)
- 56x56px circle, yellow/amber gradient background (#F59E0B → #D97706)
- 🐝 emoji centered, slightly animated (gentle bounce every 5s)
- Box shadow for depth
- On tap: opens a slide-up panel (half screen height)

**Slide-up Panel:**
- Rounded top corners, white bg
- Drag handle at top (small gray bar)
- Mini voice chat interface (reuse VoiceTeacher/VoiceTutor logic)
- Mic button + transcript area
- X button to close
- Context-aware system prompt:

```
You are EasyBee Helper 🐝, a friendly AI English tutor for Vietnamese workers in America.
You're always available to help students.

Current context: {screenContext}
- If on lesson list: help them find the right lesson, suggest what to learn next
- If on a specific lesson: explain phrases, give extra examples, help with pronunciation  
- If they seem confused: reassure them, explain in simple Vietnamese

RULES:
- Speak Vietnamese by default, use English when teaching
- Keep responses short (2-3 sentences)
- Be warm and encouraging
- If they ask about a topic, suggest specific lessons by name
```

**Where to add it:**
- In `app/layout.tsx` or `app/page.tsx` — wrap the main content
- Use a React context or prop to pass current screen context to the helper
- The helper component manages its own open/closed state

### Live API Connection for Helper:
- Reuse existing `/api/voice-tutor/token/route.ts` for ephemeral tokens
- Reuse `lib/gemini-live.ts` for Live API connection
- Connect/disconnect on panel open/close (don't keep connection alive when closed)

---

## Technical Notes

- **Gemini API Key** (server-side): `AIzaSyCLlEOAAKPC052t6U0kjTQ2l0lC3-mUPAw` (already in env as GEMINI_API_KEY)
- **Embedding model**: `text-embedding-004` (768 dimensions, free tier)
- **Live API model**: `gemini-2.5-flash-preview-native-audio-dialog` (already configured in existing voice tutor)
- **Touch rules**: Never use `motion.button` — plain `<button onClick>` only
- **Mobile-first**: Panel should work well on 375px screens
- **Tab bar**: Floating button sits ABOVE the tab bar (z-index higher)
- **No new dependencies needed** — everything uses existing Gemini APIs
- **embeddings.json**: Commit to repo, regenerate when content changes

## Build Order
1. First: generate-embeddings.js script → run it → commit embeddings.json
2. Second: API routes (embed + match-lessons)
3. Third: Floating helper component  
4. Fourth: Onboarding voice flow
5. Last: Recommended section on home page
6. Run `npm run build` to verify everything compiles

## Files to Create/Modify
- CREATE: `scripts/generate-embeddings.js`
- CREATE: `lib/embeddings.json` (generated)
- CREATE: `app/api/embed/route.ts`
- CREATE: `app/api/match-lessons/route.ts`
- CREATE: `components/FloatingHelper.tsx`
- MODIFY: `app/onboarding/page.tsx` (voice conversation)
- MODIFY: `app/page.tsx` (recommended section + floating helper)
- MODIFY: `app/layout.tsx` (floating helper wrapper if needed)
