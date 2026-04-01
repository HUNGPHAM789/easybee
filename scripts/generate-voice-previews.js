/**
 * Generate voice preview clips for each EasyBee persona
 * Uses Gemini TTS API (REST) to speak each intro line with the correct voice
 * Outputs: public/voices/{persona}.wav
 */
import fs from 'fs';
import path from 'path';

const API_KEY = fs.readFileSync('.env', 'utf8').match(/GEMINI_API_KEY="(.+?)"/)?.[1];
if (!API_KEY) throw new Error('No GEMINI_API_KEY found in .env');

const VOICES = [
  {
    id: 'thay-bee',
    voice: 'Orus',
    text: 'Chào bạn! Mình là Thầy Bee. Mình sẽ giúp bạn luyện nói tiếng Anh — từ từ thôi, không vội đâu. Ready?',
  },
  {
    id: 'co-honey',
    voice: 'Kore',
    text: 'Hi bạn! Mình là Cô Honey. Mình làm nail mười năm ở Mỹ, mình biết bạn cần gì. Ready?',
  },
  {
    id: 'anh-max',
    voice: 'Puck',
    text: "What's up! Anh Max đây. Hôm nay mình luyện cho bạn nói nghe pro luôn. Let's get it!",
  },
  {
    id: 'chi-linh',
    voice: 'Aoede',
    text: 'Chào bạn, mình là Chị Linh. Mình giúp bạn nói tiếng Anh rõ ràng, tự nhiên. Shall we begin?',
  },
];

const outDir = path.join(import.meta.dirname, '..', 'public', 'voices');
fs.mkdirSync(outDir, { recursive: true });

async function generateVoiceClip(voiceName, text, outputPath) {
  console.log(`Generating ${voiceName}...`);
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${API_KEY}`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err.substring(0, 200)}`);
  }

  const data = await res.json();
  const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  const mimeType = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType || 'audio/L16;rate=24000';
  
  if (!audioData) {
    console.log('Response:', JSON.stringify(data).substring(0, 500));
    throw new Error('No audio data in response');
  }

  console.log(`  Mime: ${mimeType}`);
  const pcmBuffer = Buffer.from(audioData, 'base64');
  
  // Parse sample rate from mime type
  const rateMatch = mimeType.match(/rate=(\d+)/);
  const sampleRate = rateMatch ? parseInt(rateMatch[1]) : 24000;
  
  const wavBuffer = pcmToWav(pcmBuffer, sampleRate, 1, 16);
  fs.writeFileSync(outputPath, wavBuffer);
  console.log(`  → ${outputPath} (${(wavBuffer.length / 1024).toFixed(1)} KB)`);
  return true;
}

function pcmToWav(pcmData, sampleRate, channels, bitsPerSample) {
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  pcmData.copy(buffer, 44);

  return buffer;
}

async function main() {
  for (const v of VOICES) {
    const outPath = path.join(outDir, `${v.id}.wav`);
    try {
      await generateVoiceClip(v.voice, v.text, outPath);
    } catch (e) {
      console.error(`Failed ${v.id}:`, e.message);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('\nDone!');
}

main().catch(console.error);
