import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = 'public/greetings';

// These are the greetings we still need
const GREETINGS = [
  { id: 'co-honey-return', text: 'Chào mừng bạn quay lại lớp học! Mình đã chuẩn bị lộ trình cho bạn, tiếp tục nha?' },
  { id: 'anh-max-return', text: 'Welcome back! Mình đã chuẩn bị bài mới cho bạn. Lets go!' },
  { id: 'chi-linh-return', text: 'Mừng bạn quay trở lại. Mình đã chuẩn bị từ vựng và lộ trình cho bạn, chúng ta bắt đầu nhé?' },
];

async function findAllImages(page) {
  return page.evaluate(() => {
    const results = [];
    function walk(root) {
      // Look for audio elements or download buttons instead
      const audios = root.querySelectorAll('audio');
      for (const a of audios) results.push({ type: 'audio', src: a.src });
      const allEls = root.querySelectorAll('*');
      for (const el of allEls) { if (el.shadowRoot) walk(el.shadowRoot); }
    }
    walk(document);
    return results;
  });
}

async function main() {
  // Can't generate audio via Gemini Web easily — Gemini Web generates images, not audio
  // Instead, use the TTS API with retries and longer waits
  
  const KEY = fs.readFileSync('.env', 'utf8').match(/GEMINI_API_KEY="(.+?)"/)?.[1];
  
  function pcmToWav(p, r = 24000) {
    const b = Buffer.alloc(44 + p.length);
    b.write('RIFF', 0); b.writeUInt32LE(36 + p.length, 4);
    b.write('WAVE', 8); b.write('fmt ', 12); b.writeUInt32LE(16, 16);
    b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
    b.writeUInt32LE(r, 24); b.writeUInt32LE(r * 2, 28);
    b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
    b.write('data', 36); b.writeUInt32LE(p.length, 40);
    p.copy(b, 44);
    return b;
  }

  const voices = { 'co-honey-return': 'Kore', 'anh-max-return': 'Puck', 'chi-linh-return': 'Aoede' };

  for (const g of GREETINGS) {
    let success = false;
    for (let attempt = 0; attempt < 5 && !success; attempt++) {
      if (attempt > 0) {
        console.log(`  Retry ${attempt}/5, waiting 60s...`);
        await new Promise(r => setTimeout(r, 60000));
      }
      try {
        console.log(`Generating ${g.id}...`);
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: g.text }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voices[g.id] } } },
            },
          }),
        });
        if (!r.ok) { console.log(`  API ${r.status}`); continue; }
        const d = await r.json();
        const a = d.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!a) { console.log('  No audio'); continue; }
        const m = d.candidates[0].content.parts[0].inlineData.mimeType || '';
        const rate = parseInt((m.match(/rate=(\d+)/) || [])[1] || '24000');
        fs.writeFileSync(path.join(outDir, `${g.id}.wav`), pcmToWav(Buffer.from(a, 'base64'), rate));
        console.log(`  ✅ ${g.id}.wav`);
        success = true;
      } catch (e) {
        console.log(`  Error: ${e.message}`);
      }
    }
    if (!success) console.log(`  ❌ Failed after 5 attempts: ${g.id}`);
    await new Promise(r => setTimeout(r, 5000));
  }
  console.log('Done!');
}

main();
