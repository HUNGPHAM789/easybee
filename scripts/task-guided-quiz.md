# Task: Build Guided Quiz (Onboarding) for EasyBee

## Context
EasyBee is an ESL app for Vietnamese workers in America (40-50yo). After login, first-time users should see a 3-step guided quiz that personalizes their lesson homepage. Results are saved to Supabase.

## Database
Run this SQL first (already have Supabase configured):
The quiz results should be stored in a new `user_profiles` table. Add it via the existing Supabase client.

Create a new table by adding a migration in the onboarding component itself using supabase RPC, OR just store in `localStorage` + Supabase `user_profiles` table.

**Simplest approach:** Store quiz results in Supabase `user_metadata` via `supabase.auth.updateUser({ data: { job, level, need } })`. No new table needed — it's built into Supabase Auth.

## Quiz Flow (3 screens)

### Screen 1: "Bạn làm nghề gì?" (What's your job?)
Three big tap buttons with emoji:
- 💅 Tiệm Nail → saves `job: "nail-salon"`
- 💄 Phun Xăm → saves `job: "permanent-makeup"`
- 🏢 Nghề khác → saves `job: "other"`

### Screen 2: "Trình độ tiếng Anh của bạn?" (Your English level?)
Two big tap buttons:
- 😰 Mới bắt đầu (Beginner) → saves `level: "beginner"` (maps to A1/A2)
- 🙂 Biết chút chút rồi (Know a little) → saves `level: "intermediate"` (maps to B1/B2)

### Screen 3: "Bạn cần gì nhất?" (What do you need most?)
Four big tap buttons:
- 🗣️ Nói chuyện với khách (Talk to customers) → saves `need: "customers"`
- 💰 Tiền, tip, thanh toán (Money & payments) → saves `need: "money"`
- 🏥 Đi bác sĩ, hiệu thuốc (Doctor, pharmacy) → saves `need: "healthcare"`
- 🏠 Cuộc sống hàng ngày (Daily life) → saves `need: "daily"`

## After Quiz
1. Save to Supabase user metadata: `supabase.auth.updateUser({ data: { job, level, need, onboarded: true } })`
2. Also save to localStorage as fallback: `localStorage.setItem("easybee_profile", JSON.stringify({ job, level, need }))`
3. Redirect to home page `/`

## How Results Affect the Homepage

In `app/page.tsx`, read the user's profile and **sort modules**:

**Job-based module priority:**
- `nail-salon` → Nail Salon module first
- `permanent-makeup` → Permanent Makeup module first
- `other` → Shopping/Healthcare/Community first (skip job-specific)

**Level-based lesson sorting within each class:**
- `beginner` → A1/A2 lessons shown first
- `intermediate` → B1/B2 lessons shown first

**Need-based secondary sort:**
- `customers` → communication/relationship classes bumped up
- `money` → money/pricing/tips classes bumped up
- `healthcare` → Healthcare module bumped up after job module
- `daily` → Shopping + Community bumped up after job module

## Component: `app/onboarding/page.tsx`
- Single page with 3 steps (use state to track current step)
- Animate between steps (simple slide or fade — use Framer Motion `AnimatePresence`)
- Big emoji + Vietnamese text buttons (same size as ActionButton but taller)
- Progress dots at top (● ● ○ = step 2 of 3)
- Back button on steps 2 and 3
- White background, matches existing design system

## Where to Show
- In `app/page.tsx`: check if user has `onboarded: true` in metadata
- If not onboarded → redirect to `/onboarding`
- If onboarded → show normal homepage with personalized sort

## CRITICAL RULES
- DO NOT touch content files in `lib/content/`
- DO NOT use `motion.button` — plain `<button>` only
- All text in Vietnamese
- Big touch targets (min 48px height) — users are 40-50yo
- Match existing design: white bg, neutral colors, Inter font, Comfortaa for headings
- Run `npx tsc --noEmit` and `npm run build` at the end
