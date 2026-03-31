#!/usr/bin/env node
/**
 * EasyBee Batch Generator v3 — Claude CLI Edition
 * Generates lessons via Claude CLI and inserts them directly into class files.
 *
 * Usage: node scripts/batch-gen-v3.js --plan scripts/batch-plan.json
 *
 * Features:
 * - Uses Claude CLI (free with Max subscription, no API key needed)
 * - Direct file insertion (no separate step)
 * - Retry on parse failure (up to 3 attempts)
 * - Post-insert TypeScript validation
 * - Rollback on TS error
 * - Batch reporting
 */

import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

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

// ─── Generate one lesson via Claude CLI (with retry) ─────────────────────────
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

  // Write prompt to temp file (avoids shell quoting hell on Windows)
  const tmpFile = path.join(ROOT, "scripts", `.tmp-prompt-${lessonId}.txt`);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      fs.writeFileSync(tmpFile, prompt);

      // Call Claude CLI with --print mode (no interactive, no PTY needed)
      const raw = execSync(
        `claude --print --permission-mode bypassPermissions "Read ${tmpFile} and follow the instructions exactly. Output ONLY the JSON, nothing else."`,
        { cwd: ROOT, timeout: 120000, maxBuffer: 1024 * 1024, encoding: "utf8" }
      );

      // Clean up temp file
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);

      // Parse — strip markdown fences if Claude wraps them
      const cleaned = raw.replace(/^```(?:json)?\n?/m, "").replace(/\n?```\s*$/m, "").trim();
      
      // Find the JSON object in the output
      const jsonStart = cleaned.indexOf("{");
      const jsonEnd = cleaned.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON object found in Claude output");
      
      const json = cleaned.substring(jsonStart, jsonEnd + 1);
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
      // Clean up temp file on error too
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
      
      if (attempt === MAX_RETRIES) throw e;
      console.log(`⟳ retry ${attempt}/${MAX_RETRIES} (${e.message.substring(0, 80)})`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

// ─── Insert lesson into class file ───────────────────────────────────────────
function insertLesson(lesson, classFile, moduleName) {
  const filePath = path.join(ROOT, "lib/content", moduleName, classFile);
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);

  const src = fs.readFileSync(filePath, "utf8");
  const lessonJson = JSON.stringify(lesson, null, 2)
    .replace(/"([a-zA-Z_]\w*)":/g, "$1:");

  const lessonsMatch = src.match(/lessons:\s*\[/);
  if (!lessonsMatch) throw new Error(`No lessons:[] found in ${classFile}`);

  const arrStart = src.indexOf(lessonsMatch[0]) + lessonsMatch[0].length;

  let depth = 1;
  let pos = arrStart;
  while (pos < src.length && depth > 0) {
    if (src[pos] === "[") depth++;
    if (src[pos] === "]") depth--;
    if (depth > 0) pos++;
  }

  const before = src.substring(0, pos).trimEnd();
  const after = src.substring(pos);

  const arrContent = src.substring(arrStart, pos).trim();
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
  // Verify Claude CLI is available
  try {
    execSync("claude --version", { stdio: "pipe" });
  } catch {
    console.error("❌ Claude CLI not found. Install: npm install -g @anthropic-ai/claude-cli");
    process.exit(1);
  }

  if (!fs.existsSync(PLAN_FILE)) {
    console.error(`❌ Plan file not found: ${PLAN_FILE}`);
    process.exit(1);
  }

  const plan = JSON.parse(fs.readFileSync(PLAN_FILE, "utf8"));
  let nextId = getNextLessonId();
  const totalLessons = plan.reduce((acc, cls) => acc + cls.lessons.length, 0);

  console.log(`\n🐝 EasyBee Batch Generator v3 (Claude CLI)`);
  console.log(`   Engine: Claude Code (Max subscription)`);
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
        const generated = await generateLesson(lesson.topic, lesson.level, lessonId);

        const filePath = path.join(ROOT, "lib/content", moduleName, cls.file);
        const backup = fs.readFileSync(filePath, "utf8");

        insertLesson(generated, cls.file, moduleName);

        const valid = validateTs();
        if (valid !== true) {
          fs.writeFileSync(filePath + ".debug", fs.readFileSync(filePath, "utf8"));
          fs.writeFileSync(filePath, backup, "utf8");
          console.log(`❌ TS error — rolled back (debug saved)`);
          results.failed.push({ lessonId, topic: lesson.topic, error: valid[0] });
          nextId++;
          continue;
        }

        console.log(`✅`);
        results.success.push({ lessonId, title: generated.title, level: lesson.level });
        nextId++;

        // No aggressive rate limit needed for Claude CLI (Max sub has generous limits)
        await new Promise(r => setTimeout(r, 500));

      } catch (err) {
        console.log(`❌ ${err.message.substring(0, 80)}`);
        results.failed.push({ lessonId, topic: lesson.topic, error: err.message });
        nextId++;
      }
    }
  }

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
