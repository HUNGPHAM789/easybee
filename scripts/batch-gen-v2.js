#!/usr/bin/env node
/**
 * EasyBee Batch Generator v2
 * Step 1: Generates lesson JSON files into scripts/generated/
 * Step 2: Run Claude Code to insert them into class files (see INSTRUCTIONS.md)
 *
 * Usage:
 *   node scripts/batch-gen-v2.js --plan scripts/batch-plan.json
 *   node scripts/batch-gen-v2.js --plan scripts/batch-plan.json --dry-run
 */

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(__dirname, "generated");

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
  let maxNum = 0;
  // Scan ALL module folders under lib/content/
  const contentBase = path.join(ROOT, "lib/content");
  if (fs.existsSync(contentBase)) {
    fs.readdirSync(contentBase, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .forEach(dir => {
        const moduleDir = path.join(contentBase, dir.name);
        fs.readdirSync(moduleDir).filter(f => f.endsWith(".ts")).forEach(f => {
          const src = fs.readFileSync(path.join(moduleDir, f), "utf8");
          [...src.matchAll(/id:\s*["']L(\d+)["']/g)].forEach(m => {
            maxNum = Math.max(maxNum, parseInt(m[1], 10));
          });
        });
      });
  }
  // Also scan generated/ in case of partial re-runs
  if (fs.existsSync(OUT_DIR)) {
    fs.readdirSync(OUT_DIR).filter(f => f.endsWith(".json")).forEach(f => {
      const m = f.match(/^L(\d+)/);
      if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
    });
  }
  return maxNum + 1;
}

// ─── Generate one lesson via Gemini ──────────────────────────────────────────
async function generateLesson(topic, level, lessonId) {
  const prompt = `You are generating content for EasyBee — an ESL app for Vietnamese nail salon workers (40-50yo).

Generate a lesson about: "${topic}" at CEFR level: ${level}

Output ONLY valid JSON (no markdown, no explanation) in this exact structure:
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

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(PLAN_FILE)) {
    console.error(`❌ Plan file not found: ${PLAN_FILE}`);
    process.exit(1);
  }

  const plan = JSON.parse(fs.readFileSync(PLAN_FILE, "utf8"));
  let nextId = getNextLessonId();

  // Clean output dir
  if (!DRY_RUN) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const totalLessons = plan.reduce((acc, cls) => acc + cls.lessons.length, 0);

  console.log(`\n🐝 EasyBee Batch Generator v2`);
  console.log(`   Plan: ${path.basename(PLAN_FILE)}`);
  console.log(`   Starting ID: L${String(nextId).padStart(2, "0")}`);
  console.log(`   Output: scripts/generated/`);
  console.log(`   Dry run: ${DRY_RUN}`);
  console.log(`   Total: ${totalLessons} lessons\n`);

  // Generate manifest for Claude Code to use
  const manifest = [];

  for (const cls of plan) {
    console.log(`📂 ${cls.class} → ${cls.file}`);

    for (const lesson of cls.lessons) {
      const lessonId = `L${String(nextId).padStart(2, "0")}`;
      process.stdout.write(`   ${lessonId} (${lesson.level}) ${lesson.topic.substring(0, 60)}... `);

      try {
        const generated = await generateLesson(lesson.topic, lesson.level, lessonId);

        if (!DRY_RUN) {
          const moduleName = cls.module || "nail-salon";
          const outFile = `${lessonId}-${moduleName}-${cls.file.replace(".ts", "")}.json`;
          fs.writeFileSync(
            path.join(OUT_DIR, outFile),
            JSON.stringify(generated, null, 2),
            "utf8"
          );
          manifest.push({
            lessonId,
            file: outFile,
            targetClass: cls.file,
            targetModule: cls.module || "nail-salon",
            title: generated.title,
            level: lesson.level,
          });
          console.log(`✅ → ${outFile}`);
        } else {
          console.log(`✅ [dry run]`);
        }

        nextId++;
        await new Promise(r => setTimeout(r, 1000)); // rate limit
      } catch (err) {
        console.log(`❌ ${err.message}`);
        nextId++;
      }
    }
  }

  // Write manifest
  if (!DRY_RUN && manifest.length > 0) {
    const manifestPath = path.join(OUT_DIR, "_manifest.json");
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

    // Write Claude Code instructions
    const instructions = `# Insert Generated Lessons

${manifest.length} lessons generated. Insert them into the class files.

## BEFORE STARTING: Read CLAUDE.md in the project root. Follow ALL rules there, especially:
- ID system rules (never reassign IDs — use exactly the IDs in the JSON files)
- Use DOUBLE QUOTES for all string values in TypeScript (match existing file format)

## For each entry in _manifest.json:
1. Read the JSON file from scripts/generated/{file}
2. Insert the lesson object into the lessons:[] array in lib/content/{targetModule}/{targetClass}
3. Add as the LAST element in the array (before the closing ])
4. Ensure proper comma separation between lessons

## Files to modify:
${[...new Set(manifest.map(m => `lib/content/${m.targetModule}/${m.targetClass}`))].join("\n- ")}

## CRITICAL — Quote style:
ALL string values MUST use DOUBLE QUOTES ("L46", "read", "Hello"). 
Match the JSON file format exactly — do NOT convert to single quotes.

## Validation:
After all inserts, run: npx tsc --noEmit
Confirm zero new errors (3 pre-existing SpeechRecognition errors are expected).

## Manifest:
${manifest.map(m => `- ${m.lessonId} (${m.level}) "${m.title}" → ${m.targetClass}`).join("\n")}
`;

    fs.writeFileSync(path.join(OUT_DIR, "INSTRUCTIONS.md"), instructions, "utf8");
    console.log(`\n📋 Manifest: scripts/generated/_manifest.json`);
    console.log(`📝 Instructions: scripts/generated/INSTRUCTIONS.md`);
  }

  console.log(`\n${"═".repeat(60)}`);
  console.log(`🐝 Step 1 complete — ${manifest.length} JSON files ready`);
  console.log(`\n   Step 2: Run Claude Code to insert them:`);
  console.log(`   cd C:\\easyenglish && claude --permission-mode bypassPermissions --print "Read scripts/generated/INSTRUCTIONS.md and follow it exactly."`);
  console.log(`${"═".repeat(60)}\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
