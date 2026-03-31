# Task: Add Supabase Auth + Progress Tracking to EasyBee

## Context
EasyBee is an ESL app for Vietnamese nail salon workers. It currently has 197 lessons across 5 modules with zero backend — all static content. We need to add user authentication and progress tracking.

## Supabase Project
- URL: `https://cmlbqornppyufehgswuz.supabase.co`
- Anon key: in `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Service role key: in `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`

## Database (already created)
```sql
user_progress (user_id uuid, lesson_id text, completed_at timestamptz, speech_score float, attempts int)
user_streaks (user_id uuid PK, current_streak int, longest_streak int, last_practice_date date)
```
RLS is already enabled — users can only read/write their own rows.

## What to Build

### 1. Install `@supabase/supabase-js` and `@supabase/ssr`
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Create Supabase client utilities
- `lib/supabase/client.ts` — browser client (uses anon key)
- `lib/supabase/server.ts` — server client for API routes
- `lib/supabase/middleware.ts` — refresh session on every request

### 3. Add middleware.ts at project root
- Uses `@supabase/ssr` to refresh auth tokens
- Matcher: exclude `_next`, static files, favicon

### 4. Auth — Simple Email Magic Link (NO passwords)
Target users are 40-50yo Vietnamese workers. Passwords = friction. Magic link = type email, click link, done.

Create `app/login/page.tsx`:
- Clean, minimal design matching existing app (white bg, neutral colors, Inter font)
- One email input + "Gửi link đăng nhập" button (Vietnamese)
- After send: show "Kiểm tra email của bạn" message
- Use `supabase.auth.signInWithOtp({ email })`
- After successful auth, redirect to `/`

### 5. Auth state in the app
- Create `components/AuthProvider.tsx` — React context that provides `user` and `signOut`
- Wrap the app in AuthProvider in `app/layout.tsx`
- On `app/page.tsx`: if not logged in, redirect to `/login`
- Add a small logout button in the top-right corner of the main page (subtle, not prominent)

### 6. Progress tracking hooks
Create `lib/hooks/useProgress.ts`:
```ts
// Returns: { completedLessons: Set<string>, completeLesson, isCompleted, loading }
// On mount: fetch all user_progress rows
// completeLesson(lessonId, speechScore?): upsert into user_progress + update streak
```

Create `lib/hooks/useStreak.ts`:
```ts
// Returns: { currentStreak, longestStreak, loading }
// On mount: fetch from user_streaks
```

### 7. Streak update logic (in completeLesson)
```
if last_practice_date === today → do nothing
if last_practice_date === yesterday → current_streak += 1
else → current_streak = 1
always: longest_streak = max(current_streak, longest_streak), last_practice_date = today
```
Use upsert with `on conflict (user_id)`.

### 8. UI Changes

**app/page.tsx (main lesson list):**
- Show streak counter below the greeting: "🔥 3 ngày liên tục" (or nothing if streak is 0)
- Show progress per class: "6/9" next to the class title
- Show ✅ checkmark on completed lessons in the lesson list

**components/DrillScreen.tsx (completion screen):**
- When user finishes all 10 drill cards, call `completeLesson(lessonId)`
- Show "Bài học hoàn thành! ✅" instead of just "Hoàn thành!"
- If streak increased, show "🔥 Chuỗi: X ngày"

### 9. CRITICAL RULES
- DO NOT touch any content files in `lib/content/`
- DO NOT change the drill card logic, animation system, or speech recognition
- DO NOT use `motion.button` — use plain `<button>` for all tap targets (iOS/Android rule)
- Use `<ActionButton>` component for styled buttons
- Keep all Vietnamese text — this is a Vietnamese-first UI
- Match existing design: white bg, neutral colors, Inter/Comfortaa fonts
- Test: run `npx tsc --noEmit` at the end — must pass (ignore SpeechRecognition if still showing)

### 10. After completing all changes
Run `npx tsc --noEmit` and `npm run build` to verify everything compiles.
