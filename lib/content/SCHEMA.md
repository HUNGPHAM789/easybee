# Phase 3 — Supabase Schema

When ready to migrate from static files to Supabase, create these tables:

```sql
-- Modules
create table modules (
  id text primary key,
  title text not null,
  title_vi text not null,
  sort_order int default 0
);

-- Classes
create table classes (
  id text primary key,
  module_id text references modules(id),
  title text not null,
  title_vi text not null,
  sort_order int default 0
);

-- Lessons
create table lessons (
  id text primary key,
  class_id text references classes(id),
  title text not null,
  title_vi text not null,
  context text,
  sort_order int default 0
);

-- Phrases (within a lesson)
create table phrases (
  id serial primary key,
  lesson_id text references lessons(id),
  english text not null,
  vietnamese text not null,
  pronunciation text,
  sort_order int default 0
);

-- Drill cards
create table drill_cards (
  id serial primary key,
  lesson_id text references lessons(id),
  type text check (type in ('read','recall','fill','dialogue')),
  prompt text,
  hint text,
  answer text,
  answer_hint text,
  pronunciation text,
  sort_order int default 0
);
```

## Migration steps
1. Run schema above in Supabase SQL editor
2. Run `node scripts/migrate-to-supabase.js` (to be built)
3. Swap implementations in `lib/content/index.ts`
4. Delete `lib/content.ts`

## Access pattern (Phase 3)
```ts
// swap in index.ts:
export async function getModules() {
  const { data } = await supabase
    .from("modules")
    .select("*, classes(*, lessons(*, phrases(*), drill_cards(*)))")
    .order("sort_order")
  return data
}
```
