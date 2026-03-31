#!/usr/bin/env node
/**
 * EasyBee Deterministic Lesson Generator
 * Usage: node scripts/gen-from-json.js input.json
 *
 * Takes a JSON file with lessonId, title, titleVi, level, context, and 3 phrases.
 * Outputs a ready-to-paste TypeScript lesson object — NO API KEY NEEDED.
 *
 * Drill pattern generated:
 *   C01 read    — phrase 1 (english prompt, vietnamese hint)
 *   C02 recall  — phrase 1 reversed (vietnamese prompt, english answer)
 *   C03 read    — phrase 2
 *   C04 recall  — phrase 2 reversed
 *   C05 read    — phrase 3
 *   C06 recall  — phrase 3 reversed
 *   C07 fill    — phrase 1, last word blanked
 *   C08 fill    — phrase 2, last word blanked
 *   C09 fill    — phrase 3, last word blanked
 *   C10 dialogue — short 4-line worker/customer exchange using all 3 phrases
 */

const fs = require("fs");
const path = require("path");

const inputArg = process.argv[2];
if (!inputArg) {
  console.error("Usage: node scripts/gen-from-json.js input.json");
  console.error("");
  console.error("Input JSON shape:");
  console.error(JSON.stringify({
    lessonId: "L37",
    classId: "basic-communication",
    title: "Lesson Title",
    titleVi: "Tên bài học",
    level: "A1",
    context: "Sử dụng những câu này khi...",
    phrases: [
      { english: "How have you been?", vietnamese: "Dạo này bạn có khỏe không?", pronunciation: "hao hav yu bin" },
      { english: "The usual today?", vietnamese: "Hôm nay vẫn làm như mọi khi không?", pronunciation: "đơ diu-zhơ-uơl tờ-đei" },
      { english: "You're all set!", vietnamese: "Xong rồi nhé!", pronunciation: "diu-ơ ol set" }
    ]
  }, null, 2));
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), inputArg);
if (!fs.existsSync(inputPath)) {
  console.error(`❌ File not found: ${inputPath}`);
  process.exit(1);
}

let input;
try {
  input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
} catch (e) {
  console.error(`❌ Invalid JSON: ${e.message}`);
  process.exit(1);
}

// ── Validate input ────────────────────────────────────────────────────────────
const required = ["lessonId", "title", "titleVi", "phrases"];
for (const field of required) {
  if (!input[field]) {
    console.error(`❌ Missing required field: ${field}`);
    process.exit(1);
  }
}
if (!Array.isArray(input.phrases) || input.phrases.length !== 3) {
  console.error("❌ 'phrases' must be an array of exactly 3 items");
  process.exit(1);
}
for (const [i, p] of input.phrases.entries()) {
  for (const f of ["english", "vietnamese", "pronunciation"]) {
    if (!p[f]) {
      console.error(`❌ phrases[${i}] missing field: ${f}`);
      process.exit(1);
    }
  }
}

const { lessonId, title, titleVi, level, context, phrases } = input;
const id = lessonId;

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Blank the last content word in a phrase.
 * "Hello, welcome!" → { prompt: "Hello, ___!", answer: "welcome" }
 * Handles trailing punctuation: keeps it after the blank.
 */
function makeFill(english) {
  // Strip trailing punctuation to find last word
  const trailingPunct = english.match(/[!?.,"]+$/)?.[0] ?? "";
  const withoutPunct = english.slice(0, english.length - trailingPunct.length);
  const words = withoutPunct.trim().split(/\s+/);
  if (words.length < 2) {
    // Single-word phrase — blank the whole thing
    return { prompt: `___${trailingPunct}`, answer: words[0] ?? english };
  }
  const lastWord = words[words.length - 1];
  const rest = words.slice(0, -1).join(" ");
  return {
    prompt: `${rest} ___${trailingPunct}`,
    answer: lastWord,
  };
}

/**
 * Build a simple 4-line dialogue using all 3 phrases.
 * Pattern:
 *   Worker:   phrase 1
 *   Customer: phrase 2 (or a generic acknowledgement if phrase 2 is worker-voiced)
 *   Worker:   phrase 2
 *   Worker:   phrase 3
 *
 * For maximum usefulness we assign:
 *   Worker line 1: phrase 1
 *   Customer line:  generic opener that sets up phrase 2
 *   Worker line 2:  phrase 2
 *   Worker line 3:  phrase 3
 * This gives a realistic 4-line exchange that uses every phrase.
 */
function makeDialogue(phrases) {
  const [p1, p2, p3] = phrases;

  const en = [
    `Worker: ${p1.english}`,
    `Customer: Thank you!`,
    `Worker: ${p2.english}`,
    `Worker: ${p3.english}`,
  ].join("\n");

  const vi = [
    `Thợ nail: ${p1.vietnamese}`,
    `Khách: Cảm ơn!`,
    `Thợ nail: ${p2.vietnamese}`,
    `Thợ nail: ${p3.vietnamese}`,
  ].join("\n");

  return { en, vi };
}

// ── Build drill cards ─────────────────────────────────────────────────────────
function cardId(n) {
  return `${id}C${String(n).padStart(2, "0")}`;
}

const [p1, p2, p3] = phrases;
const fill1 = makeFill(p1.english);
const fill2 = makeFill(p2.english);
const fill3 = makeFill(p3.english);
const dialogue = makeDialogue(phrases);

const drill = [
  // C01 — read phrase 1
  { id: cardId(1), type: "read", prompt: p1.english, hint: p1.vietnamese, answer: p1.english },
  // C02 — recall phrase 1
  { id: cardId(2), type: "recall", prompt: p1.vietnamese, hint: "Nhớ lại câu tiếng Anh...", answer: p1.english },
  // C03 — read phrase 2
  { id: cardId(3), type: "read", prompt: p2.english, hint: p2.vietnamese, answer: p2.english },
  // C04 — recall phrase 2
  { id: cardId(4), type: "recall", prompt: p2.vietnamese, hint: "Nhớ lại câu tiếng Anh...", answer: p2.english },
  // C05 — read phrase 3
  { id: cardId(5), type: "read", prompt: p3.english, hint: p3.vietnamese, answer: p3.english },
  // C06 — recall phrase 3
  { id: cardId(6), type: "recall", prompt: p3.vietnamese, hint: "Nhớ lại câu tiếng Anh...", answer: p3.english },
  // C07 — fill phrase 1
  { id: cardId(7), type: "fill", prompt: fill1.prompt, hint: p1.vietnamese, answer: fill1.answer, answerHint: p1.english },
  // C08 — fill phrase 2
  { id: cardId(8), type: "fill", prompt: fill2.prompt, hint: p2.vietnamese, answer: fill2.answer, answerHint: p2.english },
  // C09 — fill phrase 3
  { id: cardId(9), type: "fill", prompt: fill3.prompt, hint: p3.vietnamese, answer: fill3.answer, answerHint: p3.english },
  // C10 — dialogue
  { id: cardId(10), type: "dialogue", prompt: dialogue.en, hint: dialogue.vi, answer: dialogue.en },
];

// ── Assemble lesson ───────────────────────────────────────────────────────────
const lesson = {
  id,
  title,
  titleVi,
  ...(level ? { level } : {}),
  context: context ?? "",
  phrases,
  drill,
};

// ── Output as TypeScript-compatible object ────────────────────────────────────
// JSON.stringify then prettify: unquote keys, keep string values as-is
function toTS(obj, indent = 0) {
  const pad = " ".repeat(indent);
  const inner = " ".repeat(indent + 2);

  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map(v => `${inner}${toTS(v, indent + 2)}`).join(",\n");
    return `[\n${items}\n${pad}]`;
  }

  if (obj !== null && typeof obj === "object") {
    const entries = Object.entries(obj)
      .map(([k, v]) => `${inner}${k}: ${toTS(v, indent + 2)}`);
    return `{\n${entries.join(",\n")}\n${pad}}`;
  }

  return JSON.stringify(obj);
}

const targetHint = input.classId
  ? `lib/content/nail-salon/${input.classId}.ts`
  : "lib/content/nail-salon/<class>.ts";

const header = [
  `// ════════════════════════════════════════════════════════════`,
  `// Paste INSIDE the lessons: [ ... ] array in:`,
  `//   ${targetHint}`,
  `// Add a comma after the previous lesson's closing }`,
  `// ════════════════════════════════════════════════════════════`,
].join("\n");

const footer = `// ════════════════════════════════════════════════════════════`;

console.log(header);
console.log(toTS(lesson) + ",");
console.log(footer);

// Validation summary to stderr
process.stderr.write(`\n✅ ${id} — "${title}" — ${drill.length} drill cards\n`);
process.stderr.write(`   Fill blanks: "${fill1.prompt}" → ${fill1.answer}\n`);
process.stderr.write(`               "${fill2.prompt}" → ${fill2.answer}\n`);
process.stderr.write(`               "${fill3.prompt}" → ${fill3.answer}\n`);
