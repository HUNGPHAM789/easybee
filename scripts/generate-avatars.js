/**
 * Generate tutor avatar portraits using Gemini image generation
 * Outputs: public/avatars/{persona}.png
 */
import fs from 'fs';
import path from 'path';

const KEY = fs.readFileSync('.env', 'utf8').match(/GEMINI_API_KEY="(.+?)"/)?.[1];
if (!KEY) throw new Error('No key');

const outDir = path.join(import.meta.dirname, '..', 'public', 'avatars');
fs.mkdirSync(outDir, { recursive: true });

const AVATARS = [
  {
    id: 'thay-bee',
    prompt: 'Generate a professional portrait headshot photo of a young Vietnamese-American male English teacher, age 30, warm confident smile, smart casual navy polo shirt, clean-shaven, modern short hairstyle, soft studio lighting, plain white background, photorealistic, shoulders up, friendly approachable expression',
  },
  {
    id: 'co-honey',
    prompt: 'Generate a professional portrait headshot photo of a Vietnamese-American woman nail salon owner, age 35, warm genuine smile, elegant but approachable, subtle makeup, hair tied back neatly, wearing simple black top, soft studio lighting, plain white background, photorealistic, shoulders up, confident and kind expression',
  },
  {
    id: 'anh-max',
    prompt: 'Generate a professional portrait headshot photo of a young Vietnamese-American man, age 25, energetic big smile, athletic build, wearing white t-shirt, modern fade haircut, soft studio lighting, plain white background, photorealistic, shoulders up, enthusiastic and motivating expression',
  },
  {
    id: 'chi-linh',
    prompt: 'Generate a professional portrait headshot photo of an elegant Vietnamese-American woman, age 38, calm composed smile, sophisticated, wearing cream blouse, pearl earrings, hair in elegant bun, soft studio lighting, plain white background, photorealistic, shoulders up, refined and intelligent expression',
  },
];

async function generateAvatar(id, prompt, outputPath) {
  console.log(`Generating ${id}...`);
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${KEY}`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err.substring(0, 300)}`);
  }

  const data = await res.json();
  
  // Find image part in response
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
  
  if (!imagePart) {
    console.log('Parts:', parts.map(p => p.text ? 'text' : p.inlineData?.mimeType).join(', '));
    throw new Error('No image in response');
  }

  const ext = imagePart.inlineData.mimeType === 'image/png' ? 'png' : 'jpg';
  const finalPath = outputPath.replace('.png', `.${ext}`);
  fs.writeFileSync(finalPath, Buffer.from(imagePart.inlineData.data, 'base64'));
  const size = (fs.statSync(finalPath).size / 1024).toFixed(1);
  console.log(`  → ${finalPath} (${size} KB)`);
}

async function main() {
  for (const a of AVATARS) {
    const outPath = path.join(outDir, `${a.id}.png`);
    try {
      await generateAvatar(a.id, a.prompt, outPath);
    } catch (e) {
      console.error(`Failed ${a.id}:`, e.message);
    }
    await new Promise(r => setTimeout(r, 15000));
  }
  console.log('\nDone!');
}

main().catch(console.error);
