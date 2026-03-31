# Task: 5 Feature Changes for EasyBee

Read CLAUDE.md first for design system, touch rules, and architecture.

## 1. Admin Inline Editing (henrypham0310@gmail.com)

When logged-in user email is `henrypham0310@gmail.com`, enable admin mode:
- In `LessonDetail.tsx` (the expanded lesson view), make all text fields editable inline:
  - Lesson title, titleVi, context
  - Each phrase: english, vietnamese, pronunciation
  - Each drill card: prompt, hint, answer, answerHint
- Show a small pencil icon (✏️) next to editable fields
- On click: field becomes an `<input>` or `<textarea>` with current value
- On blur or Enter: save to localStorage key `easybee_admin_edits` as a JSON map `{ [lessonId]: patchObject }`
- Apply saved edits when rendering (merge over static content)
- Show a subtle "Admin" badge in the header when admin mode is active
- This is local-only editing (no backend needed) — just localStorage persistence

## 2. Add Module-Level Tree (Bài Học Tab)

Currently `page.tsx` shows a flat list of Classes. Add a Module level:

**New navigation structure:**
- Bottom tab bar with 3 tabs: **Bài Học** | **Thầy giáo EasyBee** | (profile/settings if needed)
- "Bài Học" tab shows the module tree:
  - **Module row** (collapsible): shows module titleVi + title, count of completed/total lessons
  - Inside module: **Class rows** (current behavior — collapsible, showing lessons inside)
  - Inside class: **Lesson rows** (current behavior)

So the hierarchy becomes: Module → Class → Lesson (3 levels deep).

Currently modules are imported from `@/lib/content/index`. The `modules` array already has `id, title, titleVi, classes[]`. Use this directly.

**Bottom tab bar design:**
- Fixed at bottom, white bg, subtle top border
- Two tabs for now: "📚 Bài Học" and "🎤 Thầy giáo EasyBee"
- Use clean Apple-style tab icons
- Tab bar should be visible on the main page only (not during drills)

## 3. "Thầy giáo EasyBee" Tab — AI Voice Teacher

Create a new tab/view for AI voice conversation:

**UI:**
- Large mic button in center (like Apple's Siri UI)
- Animated rings/pulse when listening
- Text transcript appears below the mic as conversation happens
- Clean, minimal design — white bg, centered layout

**Tech:**
- Use Gemini Live API (already implemented in `lib/gemini-live.ts` and `app/api/voice-tutor/token/route.ts`)
- The mic records audio, sends to Gemini Live API for real-time conversation
- Text transcript generated separately using Gemini 2.0 Flash Lite (via the existing `/api/voice-tutor` route or a new lightweight route)
- The teacher's persona: friendly ESL tutor for Vietnamese speakers, speaks slowly and clearly, corrects pronunciation gently
- System prompt: "You are EasyBee Teacher, a friendly English tutor for Vietnamese nail salon workers in America. Speak slowly, use simple words. When the student makes a mistake, gently correct them. Mix in Vietnamese translations when helpful."

**Reuse existing code:**
- `VoiceTutor.tsx` already has Live API mode — refactor/extract the live mode portion
- `lib/gemini-live.ts` — Gemini Live connection
- `lib/audio-utils.ts` — mic stream + PCM playback
- `/api/voice-tutor/token/route.ts` — ephemeral token generation

## 4. Always Show Search Box

Currently search is visible. Keep it visible and functional — just make sure it's always shown (not hidden behind any toggle or scroll). The search bar should be inside the "Bài Học" tab, at the top, searching across all modules/classes/lessons.

Check current behavior — if search is already always visible, no changes needed. Just verify it searches across the new module tree structure.

## 5. Redesign Onboarding (No Lesson Filtering)

Current `app/onboarding/page.tsx` asks job/level/need and uses those to sort/filter lessons. Change this:

**Remove from onboarding:**
- Remove "Trình độ tiếng Anh" step (level)
- Remove "Bạn cần gì nhất?" step (need)

**New onboarding flow (single page, not multi-step):**
1. Title: "Cho EasyBee biết về bạn" (Let EasyBee know about you)
2. Fields:
   - **Giới tính** (Gender): Radio buttons — Nam (Male) / Nữ (Female)  
   - **Tuổi** (Age): Number input or age range selector (20-30, 30-40, 40-50, 50+)
   - **Nghề nghiệp** (Job): Free text input (no dropdown), placeholder: "VD: thợ nail, phun xăm, nội trợ..."
   - **Bạn muốn nói tiếng Anh tốt hơn về gì?** (What do you want to improve?): Free text input, placeholder: "VD: nói chuyện với khách, đi bác sĩ, mua sắm..."
3. Save button: "Bắt đầu học" (Start learning)
4. Save all fields to `user_metadata` via Supabase auth updateUser AND localStorage
5. Set `onboarded: true` in metadata

**Remove lesson sorting/filtering from page.tsx:**
- Remove `getModulePriority`, `getClassPriority`, `sortLessonsByLevel`, `getSortedClasses` functions
- Remove `UserProfile` type and `profile` state
- Show modules/classes/lessons in their natural order (as defined in content files)

## Technical Notes

- **Touch rules:** Never use `motion.button` — always plain `<button onClick>`. See CLAUDE.md.
- **Styling:** Use Tailwind classes matching existing design (neutral palette, rounded-2xl cards, etc.)
- **Font:** Use `font-title` class for headings (Comfortaa font)
- **ActionButton:** Use existing `ActionButton` component for CTA buttons
- **No new API keys needed** — Gemini Live uses existing `/api/voice-tutor/token/route.ts`
- **Mobile-first:** Everything must work well on phone screens (375px width)
- **Bottom tab bar:** Only show on main dashboard, hide during drill screen
- **Gemini API key for text gen (server-side):** Already set as `GEMINI_API_KEY` env var. Use model `gemini-2.0-flash-lite` for text transcript.
