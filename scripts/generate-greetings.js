/**
 * Generate greeting audio clips for each persona x state
 * Outputs: public/greetings/{persona}-{state}.wav
 */
import fs from 'fs';
import path from 'path';

const KEY = fs.readFileSync('.env', 'utf8').match(/GEMINI_API_KEY="(.+?)"/)?.[1];
if (!KEY) throw new Error('No key');

const outDir = path.join(import.meta.dirname, '..', 'public', 'greetings');
fs.mkdirSync(outDir, { recursive: true });

const GREETINGS = [
  // First-time greetings
  { id: 'thay-bee-new', voice: 'Orus', text: 'Chào bạn! Mình là Thầy Bee. Rất vui được gặp bạn!' },
  { id: 'co-honey-new', voice: 'Kore', text: 'Hi bạn! Mình là Cô Honey. Rất vui được gặp bạn nha!' },
  { id: 'anh-max-new', voice: 'Puck', text: 'Hey! Mình là Anh Max. Nice to meet you!' },
  { id: 'chi-linh-new', voice: 'Aoede', text: 'Chào bạn. Mình là Chị Linh. Rất vui được gặp bạn.' },
  // Returning greetings (short — AI will handle recap)
  { id: 'thay-bee-return', voice: 'Orus', text: 'Hey! Mình quay lại rồi nè. Ready?' },
  { id: 'co-honey-return', voice: 'Kore', text: 'Chào mừng bạn quay lại!' },
  { id: 'anh-max-return', voice: 'Puck', text: "Let's go! Học tiếp nào!" },
  { id: 'chi-linh-return', voice: 'Aoede', text: 'Chào bạn. Mình tiếp tục nha.' },
];

function pcmToWav(pcmData, sampleRate = 24000, channels = 1, bits = 16) {
  const byteRate = sampleRate * channels * (bits / 8);
  const blockAlign = channels * (bits / 8);
  const buf = Buffer.alloc(44 + pcmData.length);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + pcmData.length, 4);
  buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); buf.writeUInt16LE(channels, 22);
  buf.writeUInt32LE(sampleRate, 24); buf.writeUInt32LE(byteRate, 28);
  buf.writeUInt16LE(blockAlign, 32); buf.writeUInt16LE(bits, 34);
  buf.write('data', 36); buf.writeUInt32LE(pcmData.length, 40);
  pcmData.copy(buf, 44);
  return buf;
}

async function generate(id, voice, text) {
  console.log(`  ${id}...`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
      },
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  const audio = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!audio) throw new Error('No audio');
  const mime = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType || '';
  const rate = parseInt(mime.match(/rate=(\d+)/)?.[1] || '24000');
  const wav = pcmToWav(Buffer.from(audio, 'base64'), rate);
  const out = path.join(outDir, `${id}.wav`);
  fs.writeFileSync(out, wav);
  console.log(`    → ${out} (${(wav.length/1024).toFixed(0)} KB)`);
}

async function main() {
  console.log('Generating greetings...');
  for (const g of GREETINGS) {
    try { await generate(g.id, g.voice, g.text); }
    catch (e) { console.error(`  FAIL ${g.id}: ${e.message}`); }
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log('Done!');
}

main().catch(console.error);
