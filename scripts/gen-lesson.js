#!/usr/bin/env node
/**
 * EasyBee Lesson Generator — Claude CLI edition
 *
 * Usage:
 *   node scripts/gen-lesson.js \
 *     --id L37 \
 *     --class nail-care-techniques \
 *     --title "Nail Prep & Cuticle Care" \
 *     --titleVi "Chuẩn Bị Móng & Chăm Sóc Da Cuticle" \
 *     --level A1
 *
 * Requires: claude CLI in PATH
 */

"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ── Parse CLI args ────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith("--")) {
    args[argv[i].slice(2)] = argv[i + 1] ?? true;
    i++;
  }
}

const lessonId  = args.id;
const classId   = args.class;
const title     = args.title;
const titleVi   = args.titleVi;
const level     = args.level || "A1";

if (!lessonId || !classId || !title || !titleVi) {
  console.error(
    "Usage: node scripts/gen-lesson.js " +
    "--id L37 --class nail-care-techniques " +
    '--title "..." --titleVi "..." --level A1'
  );
  process.exit(1);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function kebabToCamel(s) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}
function kebabToTitle(s) {
  return s.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/** Convert a plain JS object to TypeScript-compatible object literal syntax */
function toTS(v, depth = 0) {
  const pad  = "  ".repeat(depth);
  const ipad = "  ".repeat(depth + 1);
  if (Array.isArray(v)) {
    if (v.length === 0) return "[]";
    return `[\n${v.map(el => `${ipad}${toTS(el, depth + 1)}`).join(",\n")}\n${pad}]`;
  }
  if (v !== null && typeof v === "object") {
    const entries = Object.entries(v).map(([k, val]) => `${ipad}${k}: ${toTS(val, depth + 1)}`);
    return `{\n${entries.join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(v);
}

/** Strip any markdown code fences from LLM output */
function stripFences(s) {
  return s.replace(/^```(?:json)?\s*/m, "").replace(/\s*```\s*$/m, "").trim();
}

// ── Prompt ────────────────────────────────────────────────────────────────────
// A complete reference lesson is embedded so Claude matches the exact format.
const EXAMPLE = {
  phrases: [
    { english: "What color do you like?", vietnamese: "Bạn thích màu gì?", pronunciation: "wot kuh-ler du yu laik" },
    { english: "Short or long nails?",    vietnamese: "Móng ngắn hay dài?", pronunciation: "short or long nailz" },
    { english: "Same as last time?",      vietnamese: "Giống lần trước không?", pronunciation: "saim az last taim" }
  ],
  drill: [
    { id: "L37C01", type: "read",    prompt: "What color do you like?", hint: "Bạn thích màu gì?", answer: "What color do you like?" },
    { id: "L37C02", type: "recall",  prompt: "Bạn thích màu gì?", hint: "Nhớ lại câu tiếng Anh...", answer: "What color do you like?" },
    { id: "L37C03", type: "read",    prompt: "Short or long nails?", hint: "Móng ngắn hay dài?", answer: "Short or long nails?" },
    { id: "L37C04", type: "recall",  prompt: "Móng ngắn hay dài?", hint: "Nhớ lại câu tiếng Anh...", answer: "Short or long nails?" },
    { id: "L37C05", type: "read",    prompt: "Same as last time?", hint: "Giống lần trước không?", answer: "Same as last time?" },
    { id: "L37C06", type: "recall",  prompt: "Giống lần trước không?", hint: "Nhớ lại câu tiếng Anh...", answer: "Same as last time?" },
    { id: "L37C07", type: "fill",    prompt: "What color do you ___?", hint: "Bạn thích màu gì?", answer: "like", answerHint: "What color do you like?" },
    { id: "L37C08", type: "fill",    prompt: "Short or long ___?", hint: "Móng ngắn hay dài?", answer: "nails", answerHint: "Short or long nails?" },
    { id: "L37C09", type: "fill",    prompt: "Same as last ___?", hint: "Giống lần trước không?", answer: "time", answerHint: "Same as last time?" },
    { id: "L37C10", type: "dialogue",
      prompt: "Worker: What color do you like?\nCustomer: Something pink.\nWorker: Short or long nails?\nWorker: Same as last time?",
      hint:   "Thợ nail: Bạn thích màu gì?\nKhách: Màu hồng gì đó.\nThợ nail: Móng ngắn hay dài?\nThợ nail: Giống lần trước không?",
      answer: "Worker: What color do you like?\nCustomer: Something pink.\nWorker: Short or long nails?\nWorker: Same as last time?"
    }
  ]
};

const prompt = `You are generating content for EasyBee — an ESL app for Vietnamese nail salon workers (40-50 years old, beginner English).

Generate a lesson for the topic: "${title}" at CEFR level ${level}.

Output ONLY valid JSON — no markdown, no explanation, no code fences.

Required JSON structure:
{
  "context": "One sentence in Vietnamese: when to use these phrases",
  "phrases": [
    { "english": "...", "vietnamese": "...", "pronunciation": "..." },
    { "english": "...", "vietnamese": "...", "pronunciation": "..." },
    { "english": "...", "vietnamese": "...", "pronunciation": "..." }
  ],
  "drill": [
    { "id": "${lessonId}C01", "type": "read",     "prompt": "<phrase1 english>", "hint": "<phrase1 vietnamese>", "answer": "<phrase1 english>" },
    { "id": "${lessonId}C02", "type": "recall",   "prompt": "<phrase1 vietnamese>", "hint": "Nhớ lại câu tiếng Anh...", "answer": "<phrase1 english>" },
    { "id": "${lessonId}C03", "type": "read",     "prompt": "<phrase2 english>", "hint": "<phrase2 vietnamese>", "answer": "<phrase2 english>" },
    { "id": "${lessonId}C04", "type": "recall",   "prompt": "<phrase2 vietnamese>", "hint": "Nhớ lại câu tiếng Anh...", "answer": "<phrase2 english>" },
    { "id": "${lessonId}C05", "type": "read",     "prompt": "<phrase3 english>", "hint": "<phrase3 vietnamese>", "answer": "<phrase3 english>" },
    { "id": "${lessonId}C06", "type": "recall",   "prompt": "<phrase3 vietnamese>", "hint": "Nhớ lại câu tiếng Anh...", "answer": "<phrase3 english>" },
    { "id": "${lessonId}C07", "type": "fill",     "prompt": "<phrase1 with last meaningful word replaced by ___>", "hint": "<phrase1 vietnamese>", "answer": "<the blanked word>", "answerHint": "<phrase1 full english>" },
    { "id": "${lessonId}C08", "type": "fill",     "prompt": "<phrase2 with last meaningful word replaced by ___>", "hint": "<phrase2 vietnamese>", "answer": "<the blanked word>", "answerHint": "<phrase2 full english>" },
    { "id": "${lessonId}C09", "type": "fill",     "prompt": "<phrase3 with last meaningful word replaced by ___>", "hint": "<phrase3 vietnamese>", "answer": "<the blanked word>", "answerHint": "<phrase3 full english>" },
    { "id": "${lessonId}C10", "type": "dialogue",
      "prompt": "<4-line English Worker/Customer exchange using all 3 phrases, lines separated by \\n>",
      "hint":   "<same dialogue in Vietnamese, lines separated by \\n>",
      "answer": "<same as prompt>"
    }
  ]
}

Rules:
- Exactly 3 phrases, exactly 10 drill cards
- Phrases: short (under 8 words), practical, used in a nail salon
- Vietnamese must be natural and accurate — informal register (A1/A2)
- Pronunciation: simple phonetic a Vietnamese speaker can read (e.g. "hao hav yu bin")
- Fill cards: blank the LAST meaningful word; keep punctuation after ___
- Dialogue: 4 lines, Worker/Customer labels, uses all 3 phrases naturally

Reference example (for format, NOT content — generate different phrases):
${JSON.stringify(EXAMPLE, null, 2)}`;

// ── Call Claude CLI ───────────────────────────────────────────────────────────
process.stderr.write(`🐝 Generating ${lessonId}: "${title}" (${level})...\n`);

let raw;
try {
  console.error("❌ claude CLI not available in this environment.");
  console.error("   Use gen-from-json.js with a JSON input file instead:");
  console.error("   node scripts/gen-from-json.js input.json");
  process.exit(1);
  raw = "";
} catch (e) {
  console.error("❌ claude CLI failed:", e.message);
  process.exit(1);
}

// ── Parse JSON ────────────────────────────────────────────────────────────────
let generated;
try {
  generated = JSON.parse(stripFences(raw));
} catch (e) {
  // Try extracting first {...} block
  const m = raw.match(/\{[\s\S]+\}/);
  if (m) {
    try { generated = JSON.parse(m[0]); } catch {}
  }
  if (!generated) {
    console.error("❌ Failed to parse Claude output as JSON.");
    console.error("Raw output:\n", raw);
    process.exit(1);
  }
}

// ── Validate ──────────────────────────────────────────────────────────────────
const EXPECTED_PATTERN = ["read","recall","read","recall","read","recall","fill","fill","fill","dialogue"];

const phraseCount = generated.phrases?.length ?? 0;
const drillCount  = generated.drill?.length ?? 0;
const actualPattern = (generated.drill ?? []).map(c => c.type);
const patternOK = JSON.stringify(actualPattern) === JSON.stringify(EXPECTED_PATTERN);

if (phraseCount !== 3) process.stderr.write(`⚠️  Expected 3 phrases, got ${phraseCount}\n`);
if (drillCount  !== 10) process.stderr.write(`⚠️  Expected 10 drill cards, got ${drillCount}\n`);
if (!patternOK) process.stderr.write(`⚠️  Drill pattern wrong: ${actualPattern.join(",")}\n`);

// Force correct IDs regardless of what Claude used
(generated.drill ?? []).forEach((c, i) => {
  c.id = `${lessonId}C${String(i + 1).padStart(2, "0")}`;
});

// ── Assemble lesson object ────────────────────────────────────────────────────
const lesson = {
  id:      lessonId,
  title,
  titleVi,
  level,
  context: generated.context ?? "",
  phrases: generated.phrases,
  drill:   generated.drill,
};

// ── Write / append to class file ──────────────────────────────────────────────
const contentDir  = path.join(__dirname, "../lib/content/nail-salon");
const varName     = kebabToCamel(classId);
const classTitle  = kebabToTitle(classId);
const classFile   = path.join(contentDir, `${classId}.ts`);
const lessonTS    = toTS(lesson, 2).trim(); // 2 levels deep in lessons array

if (!fs.existsSync(classFile)) {
  // ── Create new class file ────────────────────────────────────────────────
  const fileContent = `import type { Class } from '../types';

const ${varName}: Class = {
  id: '${classId}',
  title: '${classTitle}',
  titleVi: '${titleVi.split(" — ")[0]}',
  lessons: [
    ${lessonTS},
  ],
};

export default ${varName};
`;
  fs.writeFileSync(classFile, fileContent, "utf8");
  process.stderr.write(`📄 Created ${path.relative(process.cwd(), classFile)}\n`);
} else {
  // ── Append lesson to existing class file ─────────────────────────────────
  const existing = fs.readFileSync(classFile, "utf8");
  const END_MARKER = "\n  ]\n};\n";
  const insertAt = existing.lastIndexOf(END_MARKER);
  if (insertAt === -1) {
    console.error("❌ Could not find lessons array end in", classFile);
    console.error("Expected pattern: '\\n  ]\\n};\\n' near end of file");
    process.exit(1);
  }
  const before = existing.slice(0, insertAt);
  // Add comma after previous lesson if missing
  const prefix = before.trimEnd().endsWith(",") ? "" : ",";
  const newContent = before.trimEnd() + prefix + "\n    " + lessonTS + existing.slice(insertAt);
  fs.writeFileSync(classFile, newContent, "utf8");
  process.stderr.write(`📝 Appended to ${path.relative(process.cwd(), classFile)}\n`);
}

// ── Register class in lib/content.ts if not already there ────────────────────
const rootContentPath = path.join(__dirname, "../lib/content.ts");
let rootContent = fs.readFileSync(rootContentPath, "utf8");

const importLine = `import ${varName} from './content/nail-salon/${classId}';`;
const classEntry  = `      ${varName},`;

if (!rootContent.includes(importLine)) {
  // Add import after last existing import
  rootContent = rootContent.replace(
    /(import \w+ from '\.\/content\/nail-salon\/[^']+';)\n(\n\/\/ ─)/,
    `$1\n${importLine}\n$2`
  );
  // Add to classes array
  rootContent = rootContent.replace(
    /(      dailyLife,\n)/,
    `$1${classEntry}\n`
  );
  fs.writeFileSync(rootContentPath, rootContent, "utf8");
  process.stderr.write(`🔗 Registered ${varName} in lib/content.ts\n`);
} else {
  process.stderr.write(`ℹ️  ${varName} already registered in lib/content.ts\n`);
}

// ── Summary ───────────────────────────────────────────────────────────────────
process.stderr.write(`\n✅ ${lessonId} — "${title}"\n`);
process.stderr.write(`   Phrases: ${phraseCount}/3 | Drills: ${drillCount}/10 | Pattern: ${patternOK ? "✅" : "⚠️"}\n`);
process.stderr.write(`   ${lesson.phrases.map(p => `"${p.english}"`).join(", ")}\n`);
