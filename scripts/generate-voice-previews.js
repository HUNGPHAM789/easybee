/**
 * Generate voice preview clips for each EasyBee persona
 * Uses Gemini Live API to speak each intro line with the correct voice
 * Outputs: public/voices/{persona}.wav
 */
import { GoogleGenAI, Modality } from '@google/genai';
import fs from 'fs';
import path from 'path';

const API_KEY = process.env.GEMINI_API_KEY || fs.readFileSync('.env', 'utf8').match(/GEMINI_API_KEY="(.+?)"/)?.[1];
if (!API_KEY) throw new Error('No GEMINI_API_KEY found');

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

const ai = new GoogleGenAI({ apiKey: API_KEY });

async function generateVoiceClip(voice, text, outputPath) {
  console.log(`Generating ${voice}...`);
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      },
    },
  });

  const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!audioData) {
    console.error(`No audio returned for ${voice}`);
    return false;
  }

  // Audio comes as base64 PCM, convert to WAV
  const pcmBuffer = Buffer.from(audioData, 'base64');
  const wavBuffer = pcmToWav(pcmBuffer, 24000, 1, 16);
  fs.writeFileSync(outputPath, wavBuffer);
  console.log(`  → ${outputPath} (${(wavBuffer.length / 1024).toFixed(1)} KB)`);
  return true;
}

function pcmToWav(pcmData, sampleRate, channels, bitsPerSample) {
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const headerSize = 44;
  const buffer = Buffer.alloc(headerSize + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  // data chunk
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
    // Small delay between requests
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('\nDone!');
}

main().catch(console.error);
