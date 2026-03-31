# EasyBee Scripts

## gen-from-json.js — Deterministic lesson generator (no API key)

Takes a JSON file with 3 pre-written phrases and generates all 10 drill cards automatically.

```bash
node scripts/gen-from-json.js scripts/sample-input.json
```

Output is printed to stdout — pipe it or copy-paste into the target class file.

### Input format

```json
{
  "lessonId": "L37",
  "classId": "basic-communication",
  "title": "Asking About Preferences",
  "titleVi": "Hỏi Về Sở Thích",
  "level": "A1",
  "context": "Sử dụng những câu này khi bạn muốn hỏi khách hàng về sở thích.",
  "phrases": [
    { "english": "What color do you like?", "vietnamese": "Bạn thích màu gì?", "pronunciation": "wot kuh-ler du yu laik" },
    { "english": "Short or long nails?",    "vietnamese": "Móng ngắn hay dài?", "pronunciation": "short or long nailz" },
    { "english": "Same as last time?",      "vietnamese": "Giống lần trước không?", "pronunciation": "saim az last taim" }
  ]
}
```

### Drill card pattern generated

| Card | Type     | What it tests |
|------|----------|---------------|
| C01  | read     | Phrase 1 — listen and repeat |
| C02  | recall   | Phrase 1 reversed — Vietnamese → English |
| C03  | read     | Phrase 2 |
| C04  | recall   | Phrase 2 reversed |
| C05  | read     | Phrase 3 |
| C06  | recall   | Phrase 3 reversed |
| C07  | fill     | Phrase 1 — last word blanked |
| C08  | fill     | Phrase 2 — last word blanked |
| C09  | fill     | Phrase 3 — last word blanked |
| C10  | dialogue | 4-line worker/customer exchange using all 3 phrases |

### Pasting into the content file

1. Run the generator, copy the output block
2. Open `lib/content/nail-salon/<class>.ts`
3. Find the `lessons: [` array
4. Paste after the last lesson's closing `}`, adding a comma: `}, ← paste here`
5. Run `npx tsc --noEmit` to confirm no TypeScript errors

### Next lesson ID

Check `CLAUDE.md` → ID System section for the current highest ID.
Current last lesson: L36. Next available: **L37**.

---

## gen-lesson.js — AI-powered generator (requires Gemini API key)

Takes a topic string and CEFR level, calls Gemini to generate phrases + all 10 drill cards.

```bash
node scripts/gen-lesson.js "At the grocery store" "A2"
```

Requires `GEMINI_API_KEY` in `~/.openclaw/.env`.

Auto-detects the next lesson ID by scanning existing content files.

**Always review Gemini output before pasting:**
- Are phrases natural English (not textbook stiff)?
- Is Vietnamese accurate and in the right register (informal for A1/A2)?
- Is pronunciation phonetic and readable by a Vietnamese speaker?
- Is the dialogue realistic — something that would actually happen in a nail salon?

---

## batch-gen-v3.js — Batch generator (recommended)

```bash
node scripts/batch-gen-v3.js --plan scripts/batch-plan.json
# --dry-run to preview without generating
```

Fully automated: generates lessons via Gemini → inserts into class files → validates TypeScript → rolls back on error. Retries up to 3x on parse failures. No Claude Code step needed.

See `batch-plan.json` for plan format.

## batch-gen-v2.js — Legacy batch generator

```bash
node scripts/batch-gen-v2.js --plan scripts/batch-plan.json
```

Two-step: generates JSON files, then needs Claude Code to insert them. Superseded by v3.
