#!/usr/bin/env node
/**
 * EasyBee Batch Generator v3 — HARDENED
 * Generates lessons AND inserts them directly. No Claude Code step.
 *
 * Usage: node scripts/batch-gen-v3.js --plan scripts/batch-plan.json
 *
 * Improvements over v2:
 * - Direct file insertion (no Claude Code middleman)
 * - Retry on Gemini parse failure (same ID, up to 3 attempts)
 * - Post-insert TypeScript validation
 * - Rollback on TS error
 * - Batch reporting with notification per lesson
 */

import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ─── Load env ────────────────────────────────────────────────────────────────
const envPath = path.join(process.env.HOME || process.env.USERPROFILE, ".openclaw", ".env");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8").split("\n").forEach((line) => {
    const [k, ...v] = line.split("=");
    if (k && v.length) process.env[k.trim()] = v.join("=").trim();
  });
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("ERROR: GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const DRY_RUN = process.argv.includes("--dry-run");
const PLAN_ARG = process.argv.indexOf("--plan");
const PLAN_FILE = PLAN_ARG !== -1 ? process.argv[PLAN_ARG + 1] : path.join(__dirname, "batch-plan.json");
const MAX_RETRIES = 3;

// ─── Auto-detect next lesson ID ───────────────────────────────────────────────
function getNextLessonId() {
  let maxNum = 0;
  const contentBase = path.join(ROOT, "lib/content");
  if (fs.existsSync(contentBase)) {
    fs.readdirSync(contentBase, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .forEach(dir => {
        const moduleDir = path.join(contentBase, dir.name);
        fs.readdirSync(moduleDir).filter(f => f.endsWith(".ts")).forEach(f => {
          const src = fs.readFileSync(path.join(moduleDir, f), "utf8");
          [...src.matchAll(/["']L(\d+)["']/g)].forEach(m => {
            maxNum = Math.max(maxNum, parseInt(m[1], 10));
          });
        });
      });
  }
  return maxNum + 1;
}

// ─── Generate one lesson via Gemini (with retry) ─────────────────────────────
async function generateLesson(topic, level, lessonId) {
  const prompt = `You are generating content for EasyBee — an ESL app for Vietnamese workers in America (40-50yo).

Generate a lesson about: "${topic}" at CEFR level: ${level}

Output ONLY valid JSON. No markdown, no explanation, no code blocks.
{
  "id": "PLACEHOLDER",
  "title": "English title (short, 3-5 words)",
  "titleVi": "Vietnamese title",
  "level": "${level}",
  "context": "One sentence in Vietnamese explaining when to use these phrases",
  "phrases": [
    { "english": "phrase1", "vietnamese": "translation", "pronunciation": "simple phonetic like: hao-z it go-ing" },
    { "english": "phrase2", "vietnamese": "translation", "pronunciation": "simple phonetic" },
    { "english": "phrase3", "vietnamese": "translation", "pronunciation": "simple phonetic" }
  ],
  "drill": [
    { "id": 1, "type": "read", "prompt": "phrase1", "hint": "viet1", "answer": "phrase1" },
    { "id": 2, "type": "recall", "prompt": "viet1", "hint": "Nhớ lại câu tiếng Anh...", "answer": "phrase1" },
    { "id": 3, "type": "read", "prompt": "phrase2", "hint": "viet2", "answer": "phrase2" },
    { "id": 4, "type": "recall", "prompt": "viet2", "hint": "Nhớ lại câu tiếng Anh...", "answer": "phrase2" },
    { "id": 5, "type": "read", "prompt": "phrase3", "hint": "viet3", "answer": "phrase3" },
    { "id": 6, "type": "recall", "prompt": "viet3", "hint": "Nhớ lại câu tiếng Anh...", "answer": "phrase3" },
    { "id": 7, "type": "fill", "prompt": "phrase1 with ___ for ONE content word", "hint": "viet1", "answer": "missing_word", "answerHint": "phrase1 full" },
    { "id": 8, "type": "fill", "prompt": "phrase2 with ___", "hint": "viet2", "answer": "missing_word", "answerHint": "phrase2 full" },
    { "id": 9, "type": "fill", "prompt": "phrase3 with ___", "hint": "viet3", "answer": "missing_word", "answerHint": "phrase3 full" },
    { "id": 10, "type": "dialogue", "prompt": "Worker: line\\nCustomer: line\\nWorker: line", "hint": "Thợ: line\\nKhách: line\\nThợ: line", "answer": "Worker: line\\nCustomer: line\\nWorker: line" }
  ]
}

RULES:
- Exactly 3 phrases, practical, under 8 words each
- NEVER use IPA symbols (ʃ ɪ dʒ ʌ ə ð ɔ æ etc). Use simple phonetic ONLY.
- Fill blanks: blank a CONTENT word (noun/verb/adjective), never function words (it, you, the, or, are)
- Dialogue: Worker speaks FIRST. Worker asks questions. Customer responds. Never reverse roles.
- prompt = answer for dialogue (English both ways)
- hint = Vietnamese translation
- Vietnamese must be accurate and natural`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
        }),
      });

      const data = await res.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) throw new Error("Empty Gemini response");

      const json = raw.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim();
      const lesson = JSON.parse(json);

      // Override IDs
      lesson.id = lessonId;
      lesson.level = level;
      lesson.drill = (lesson.drill || []).map((card, i) => ({
        ...card,
        id: `${lessonId}C${String(i + 1).padStart(2, "0")}`,
      }));

      if (lesson.drill.length !== 10) throw new Error(`Got ${lesson.drill.length} drills, need 10`);
      if (lesson.phrases.length !== 3) throw new Error(`Got ${lesson.phrases.length} phrases, need 3`);

      return lesson;
    } catch (e) {
      if (attempt === MAX_RETRIES) throw e;
      console.log(`⟳ retry ${attempt}/${MAX_RETRIES} (${e.message})`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

// ─── Insert lesson into class file ───────────────────────────────────────────
function insertLesson(lesson, classFile, moduleName) {
  const filePath = path.join(ROOT, "lib/content", moduleName, classFile);
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);

  const src = fs.readFileSync(filePath, "utf8");
  // Convert JSON to TypeScript object literal (unquoted keys, double-quoted values)
  const lessonJson = JSON.stringify(lesson, null, 2)
    .replace(/"([a-zA-Z_]\w*)":/g, "$1:");

  // Find the lessons array and insert
  // Strategy: find "lessons: [" and the matching close, insert before close
  const lessonsMatch = src.match(/lessons:\s*\[/);
  if (!lessonsMatch) throw new Error(`No lessons:[] found in ${classFile}`);

  const arrStart = src.indexOf(lessonsMatch[0]) + lessonsMatch[0].length;

  // Find the matching ] — count brackets
  let depth = 1;
  let pos = arrStart;
  while (pos < src.length && depth > 0) {
    if (src[pos] === "[") depth++;
    if (src[pos] === "]") depth--;
    if (depth > 0) pos++;
  }

  // pos is now at the closing ]
  const before = src.substring(0, pos).trimEnd();
  const after = src.substring(pos);

  // Check if array is empty or has content
  const arrContent = src.substring(arrStart, pos).trim();
  // Strip trailing comma from existing content to avoid double comma
  const cleanBefore = before.replace(/,\s*$/, "").trimEnd();
  const separator = arrContent.length > 0 ? ",\n  " : "\n  ";

  const newSrc = cleanBefore + separator + lessonJson + "\n  " + after;
  fs.writeFileSync(filePath, newSrc, "utf8");
}

// ─── TypeScript validation ───────────────────────────────────────────────────
function validateTs() {
  try {
    execSync("npx tsc --noEmit", { cwd: ROOT, stdio: "pipe" });
    return true;
  } catch (e) {
    const out = (e.stdout?.toString() || "") + (e.stderr?.toString() || "");
    const errors = out.split("\n").filter(l => l.includes("error TS") && !l.includes("SpeechRecognition"));
    return errors.length === 0 ? true : errors;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(PLAN_FILE)) {
    console.error(`❌ Plan file not found: ${PLAN_FILE}`);
    process.exit(1);
  }

  const plan = JSON.parse(fs.readFileSync(PLAN_FILE, "utf8"));
  let nextId = getNextLessonId();
  const totalLessons = plan.reduce((acc, cls) => acc + cls.lessons.length, 0);

  console.log(`\n🐝 EasyBee Batch Generator v3 (hardened)`);
  console.log(`   Starting ID: L${String(nextId).padStart(2, "0")}`);
  console.log(`   Lessons: ${totalLessons}`);
  console.log(`   Dry run: ${DRY_RUN}\n`);

  const results = { success: [], failed: [] };

  for (const cls of plan) {
    const moduleName = cls.module || "nail-salon";
    console.log(`📂 ${cls.class} → ${moduleName}/${cls.file}`);

    for (const lesson of cls.lessons) {
      const lessonId = `L${String(nextId).padStart(2, "0")}`;
      const shortTopic = lesson.topic.substring(0, 55);
      process.stdout.write(`   ${lessonId} (${lesson.level}) ${shortTopic}... `);

      if (DRY_RUN) {
        console.log(`[dry run]`);
        nextId++;
        continue;
      }

      try {
        // Generate
        const generated = await generateLesson(lesson.topic, lesson.level, lessonId);

        // Backup file before insert
        const filePath = path.join(ROOT, "lib/content", moduleName, cls.file);
        const backup = fs.readFileSync(filePath, "utf8");

        // Insert
        insertLesson(generated, cls.file, moduleName);

        // Validate
        const valid = validateTs();
        if (valid !== true) {
          // Save debug copy before rollback
          fs.writeFileSync(filePath + ".debug", fs.readFileSync(filePath, "utf8"));
          // Rollback
          fs.writeFileSync(filePath, backup, "utf8");
          console.log(`❌ TS error — rolled back (debug saved)`);
          results.failed.push({ lessonId, topic: lesson.topic, error: valid[0] });
          nextId++;
          continue;
        }

        console.log(`✅`);
        results.success.push({ lessonId, title: generated.title, level: lesson.level });
        nextId++;

        // Rate limit
        await new Promise(r => setTimeout(r, 1500));

      } catch (err) {
        console.log(`❌ ${err.message}`);
        results.failed.push({ lessonId, topic: lesson.topic, error: err.message });
        nextId++;
      }
    }
  }

  // Summary
  console.log(`\n${"═".repeat(60)}`);
  console.log(`🐝 Batch complete`);
  console.log(`   ✅ ${results.success.length} generated & inserted`);
  if (results.failed.length) {
    console.log(`   ❌ ${results.failed.length} failed:`);
    results.failed.forEach(f => console.log(`      ${f.lessonId}: ${f.error}`));
  }
  console.log(`   Next ID: L${String(nextId).padStart(2, "0")}`);
  console.log(`${"═".repeat(60)}\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
