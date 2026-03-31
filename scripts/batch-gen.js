#!/usr/bin/env node
/**
 * EasyBee Batch Lesson Generator
 * Generates multiple lessons and writes them directly to class files.
 *
 * Usage:
 *   node scripts/batch-gen.js --plan scripts/batch-plan.json
 *   node scripts/batch-gen.js --dry-run   (preview only, no writes)
 *
 * Plan file format: scripts/batch-plan.json
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

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBmXE-zjAV66tQQQecr23nnJ6yosDBjWGc";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const DRY_RUN = process.argv.includes("--dry-run");
const PLAN_ARG = process.argv.indexOf("--plan");
const PLAN_FILE = PLAN_ARG !== -1 ? process.argv[PLAN_ARG + 1] : path.join(__dirname, "batch-plan.json");

// ─── Auto-detect next lesson ID ───────────────────────────────────────────────
function getNextLessonId() {
  const contentDir = path.join(ROOT, "lib/content/nail-salon");
  let maxNum = 0;
  if (fs.existsSync(contentDir)) {
    fs.readdirSync(contentDir).filter(f => f.endsWith(".ts")).forEach(f => {
      const src = fs.readFileSync(path.join(contentDir, f), "utf8");
      [...src.matchAll(/id:\s*"L(\d+)"/g)].forEach(m => {
        maxNum = Math.max(maxNum, parseInt(m[1], 10));
      });
    });
  }
  return maxNum + 1;
}

// ─── Generate one lesson via Gemini ──────────────────────────────────────────
async function generateLesson(topic, level, lessonId) {
  const prompt = `You are generating content for EasyBee — an ESL app for Vietnamese nail salon workers (40-50yo).

Generate a lesson about: "${topic}" at CEFR level: ${level}

Output ONLY valid JSON in this exact structure:
{
  "id": "PLACEHOLDER",
  "title": "English title",
  "titleVi": "Vietnamese title",
  "level": "${level}",
  "context": "One sentence in Vietnamese explaining when to use these phrases",
  "phrases": [
    { "english": "phrase", "vietnamese": "translation", "pronunciation": "phonetic" },
    { "english": "phrase", "vietnamese": "translation", "pronunciation": "phonetic" },
    { "english": "phrase", "vietnamese": "translation", "pronunciation": "phonetic" }
  ],
  "drill": [
    { "id": 1, "type": "read",   "prompt": "phrase1 english", "hint": "phrase1 vietnamese", "answer": "phrase1 english" },
    { "id": 2, "type": "recall", "prompt": "phrase1 vietnamese", "hint": "Nhớ lại câu tiếng Anh...", "answer": "phrase1 english" },
    { "id": 3, "type": "read",   "prompt": "phrase2 english", "hint": "phrase2 vietnamese", "answer": "phrase2 english" },
    { "id": 4, "type": "recall", "prompt": "phrase2 vietnamese", "hint": "Nhớ lại câu tiếng Anh...", "answer": "phrase2 english" },
    { "id": 5, "type": "read",   "prompt": "phrase3 english", "hint": "phrase3 vietnamese", "answer": "phrase3 english" },
    { "id": 6, "type": "recall", "prompt": "phrase3 vietnamese", "hint": "Nhớ lại câu tiếng Anh...", "answer": "phrase3 english" },
    { "id": 7, "type": "fill",   "prompt": "phrase1 with ___ for one key word", "hint": "phrase1 vietnamese", "answer": "missing word", "answerHint": "phrase1 full" },
    { "id": 8, "type": "fill",   "prompt": "phrase2 with ___ for one key word", "hint": "phrase2 vietnamese", "answer": "missing word", "answerHint": "phrase2 full" },
    { "id": 9, "type": "fill",   "prompt": "phrase3 with ___ for one key word", "hint": "phrase3 vietnamese", "answer": "missing word", "answerHint": "phrase3 full" },
    { "id": 10, "type": "dialogue", "prompt": "Worker: line\\nCustomer: line\\nWorker: line", "hint": "Thợ: line\\nKhách: line\\nThợ: line", "answer": "Worker: line\\nCustomer: line\\nWorker: line" }
  ]
}

Rules:
- Exactly 3 phrases, practical, under 8 words each
- Dialogue: weave all 3 phrases into a realistic nail salon exchange
- prompt = answer for dialogue (English both ways)
- hint = Vietnamese translation of dialogue
- Fill: blank ONE key word with ___
- Pronunciation: simple phonetic a Vietnamese person can read
- Vietnamese must be accurate and natural`;

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
  if (!raw) throw new Error("No response from Gemini: " + JSON.stringify(data));

  const json = raw.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim();
  const lesson = JSON.parse(json);

  // Override IDs
  lesson.id = lessonId;
  lesson.drill = (lesson.drill || []).map((card, i) => ({
    ...card,
    id: `${lessonId}C${String(i + 1).padStart(2, "0")}`,
  }));

  if (lesson.drill.length !== 10) {
    throw new Error(`Expected 10 drill cards, got ${lesson.drill.length}`);
  }

  return lesson;
}

// ─── Write lesson to class file ───────────────────────────────────────────────
function writeLessonToFile(lesson, classFile) {
  const filePath = path.join(ROOT, "lib/content/nail-salon", classFile);
  if (!fs.existsSync(filePath)) throw new Error(`Class file not found: ${filePath}`);

  let src = fs.readFileSync(filePath, "utf8");

  const lessonTs = JSON.stringify(lesson, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, '"');

  // Simple approach: find the export line, remove it and the closing syntax,
  // get the variable name, append new lesson, rewrite the closing.
  const exportMatch = src.match(/export default (\w+);/);
  if (!exportMatch) throw new Error(`Could not find 'export default' in ${classFile}`);
  const varName = exportMatch[1];

  // Strip everything from the last lesson's drill array close through end of file
  // Find the LAST occurrence of the pattern that closes the entire Class object
  // and replace it with: ,newLesson + close
  //
  // Approach: read file as text, find last "]}," or "]}" before "};", insert before it
  
  // Find the export line and everything between last } of last drill card and export
  // Replace approach: find last occurrence of "export default X;" and rebuild from there
  const exportLine = `export default ${varName};`;
  const exportIdx = src.lastIndexOf(exportLine);
  if (exportIdx === -1) throw new Error(`Could not find '${exportLine}' in ${classFile}`);

  // Everything before export, trimmed
  let before = src.substring(0, exportIdx).trimEnd();

  // Strip the closing structure: could be }],\n}; or }\n  ]\n}; or }\n]\n};
  // Remove trailing };  then trailing ]  then trailing },  
  before = before.replace(/\};\s*$/, "").trimEnd();   // remove };
  before = before.replace(/\]\s*$/, "").trimEnd();     // remove ]
  before = before.replace(/,?\s*$/, "").trimEnd();     // remove trailing comma

  // Now 'before' ends at the last lesson's closing }
  // Append comma + new lesson + close
  const newSrc = before + `,\n  ${lessonTs}\n  ]\n};\n\n${exportLine}\n`;
  fs.writeFileSync(filePath, newSrc, "utf8");
}

// ─── Validate TypeScript ──────────────────────────────────────────────────────
function validateTs() {
  try {
    execSync("npx tsc --noEmit", { cwd: ROOT, stdio: "pipe" });
    return true;
  } catch (e) {
    const out = e.stdout?.toString() || e.stderr?.toString() || "";
    const errors = out.split("\n")
      .filter(l => l.includes("error TS") && !l.includes("SpeechRecognition"));
    return errors.length === 0 ? true : errors;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(PLAN_FILE)) {
    console.error(`❌ Plan file not found: ${PLAN_FILE}`);
    console.error(`Create it with: node scripts/batch-gen.js --init`);
    process.exit(1);
  }

  const plan = JSON.parse(fs.readFileSync(PLAN_FILE, "utf8"));
  let nextId = getNextLessonId();

  console.log(`\n🐝 EasyBee Batch Generator`);
  console.log(`   Plan: ${path.basename(PLAN_FILE)}`);
  console.log(`   Starting lesson ID: L${String(nextId).padStart(2, "0")}`);
  console.log(`   Dry run: ${DRY_RUN}`);
  console.log(`   Total lessons: ${plan.reduce((acc, cls) => acc + cls.lessons.length, 0)}\n`);

  const results = { success: [], failed: [] };

  for (const cls of plan) {
    console.log(`\n📂 Class: ${cls.class} → ${cls.file}`);
    let classCount = 0;

    for (const lesson of cls.lessons) {
      const lessonId = `L${String(nextId).padStart(2, "0")}`;
      process.stdout.write(`   ${lessonId} (${lesson.level}) ${lesson.topic} ... `);

      try {
        const generated = await generateLesson(lesson.topic, lesson.level, lessonId);

        if (DRY_RUN) {
          console.log(`[DRY RUN - skipped write]`);
        } else {
          writeLessonToFile(generated, cls.file);

          // Validate after each write
          const valid = validateTs();
          if (valid !== true) {
            // Rollback — remove the lesson we just wrote
            console.log(`❌ TS ERROR — rolling back`);
            console.error(`   Errors: ${valid.join("\n   ")}`);
            results.failed.push({ lessonId, topic: lesson.topic, errors: valid });
            nextId++;
            continue;
          }

          console.log(`✅ written`);
        }

        results.success.push({ lessonId, topic: lesson.topic, class: cls.class });
        classCount++;
        nextId++;

        // Rate limit: 1s between Gemini calls
        await new Promise(r => setTimeout(r, 1000));

      } catch (err) {
        console.log(`❌ FAILED — ${err.message}`);
        results.failed.push({ lessonId, topic: lesson.topic, error: err.message });
        nextId++;
      }
    }

    console.log(`   ✅ ${cls.class} — ${classCount} lessons added`);
  }

  // Summary
  console.log(`\n${"═".repeat(60)}`);
  console.log(`🐝 Batch complete!`);
  console.log(`   ✅ ${results.success.length} lessons generated`);
  if (results.failed.length) {
    console.log(`   ❌ ${results.failed.length} failed:`);
    results.failed.forEach(f => console.log(`      - ${f.lessonId}: ${f.topic}`));
  }
  console.log(`   Next available ID: L${String(nextId).padStart(2, "0")}`);
  console.log(`${"═".repeat(60)}\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
