#!/usr/bin/env node
/**
 * EasyBee — Generate lesson embeddings via Gemini text-embedding-004
 *
 * Usage: node scripts/generate-embeddings.js
 * Requires: npx tsx (auto-installed)
 * Output: lib/embeddings.json
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const API_KEY = 'AIzaSyCLlEOAAKPC052t6U0kjTQ2l0lC3-mUPAw';
const EMBED_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${API_KEY}`;
const OUTPUT = path.join(ROOT, 'lib', 'embeddings.json');

// ─── Load content via tsx ────────────────────────────────────────────────────
function loadContent() {
  const script = `
    import { modules } from './lib/content';
    const data = JSON.stringify(modules.map(m => ({
      id: m.id, title: m.title, titleVi: m.titleVi,
      classes: m.classes.map(c => ({
        id: c.id, title: c.title, titleVi: c.titleVi,
        lessons: c.lessons.map(l => ({
          id: l.id, title: l.title, titleVi: l.titleVi,
          context: l.context,
          phrases: l.phrases.map(p => ({ english: p.english, vietnamese: p.vietnamese }))
        }))
      }))
    })));
    process.stdout.write(data);
  `;
  const tmpFile = path.join(ROOT, '_tmp_embed_loader.ts');
  fs.writeFileSync(tmpFile, script);
  try {
    const out = execSync(`npx tsx ${tmpFile}`, { cwd: ROOT, maxBuffer: 50 * 1024 * 1024 });
    return JSON.parse(out.toString());
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

// ─── Embed one text via Gemini API ───────────────────────────────────────────
async function embed(text) {
  const res = await fetch(EMBED_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'models/gemini-embedding-001',
      content: { parts: [{ text }] }
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Embedding API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.embedding.values;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Loading content...');
  const modules = loadContent();

  let totalLessons = 0;
  let totalClasses = 0;
  for (const m of modules) {
    totalClasses += m.classes.length;
    for (const c of m.classes) totalLessons += c.lessons.length;
  }
  console.log(`Found ${modules.length} modules, ${totalClasses} classes, ${totalLessons} lessons`);

  const result = { lessons: {}, classes: {}, modules: {} };
  let count = 0;

  // Embed modules
  for (const m of modules) {
    const text = `${m.title} ${m.titleVi} ` +
      m.classes.map(c => `${c.title} ${c.titleVi}`).join(' ');
    console.log(`[module] ${m.id}`);
    result.modules[m.id] = await embed(text);
    count++;
    await sleep(100);
  }

  // Embed classes
  for (const m of modules) {
    for (const c of m.classes) {
      const text = `${c.title} ${c.titleVi} ` +
        c.lessons.map(l => `${l.title} ${l.titleVi} ${l.context}`).join(' ');
      const classKey = `${m.id}-${c.id}`;
      console.log(`[class] ${classKey}`);
      result.classes[classKey] = await embed(text);
      count++;
      await sleep(100);
    }
  }

  // Embed lessons
  for (const m of modules) {
    for (const c of m.classes) {
      for (const l of c.lessons) {
        const text = `${l.title} ${l.titleVi} ${l.context} ` +
          l.phrases.map(p => `${p.english} ${p.vietnamese}`).join(' ');
        console.log(`[lesson] ${l.id} — ${l.title}`);
        result.lessons[l.id] = await embed(text);
        count++;
        await sleep(100);
      }
    }
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(result));
  const sizeKB = (fs.statSync(OUTPUT).size / 1024).toFixed(1);
  console.log(`\nDone! ${count} embeddings → ${OUTPUT} (${sizeKB} KB)`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
