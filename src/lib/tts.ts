/**
 * On-demand TTS for phrases — uses Gemini TTS via /api/tts
 * Caches audio so second tap is instant.
 */

// In-memory cache: "text|voice" → AudioBuffer
const audioCache = new Map<string, AudioBuffer>();
let audioContext: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;
let authToken: string | null = null;

/** Set the auth token for TTS API calls. Call after login. */
export function setTTSAuthToken(token: string): void {
  authToken = token;
}

function getContext(): AudioContext {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new AudioContext({ sampleRate: 24000 });
  }
  return audioContext;
}

function cacheKey(text: string, voice: string): string {
  return `${text.toLowerCase().trim()}|${voice}`;
}

/**
 * Play a phrase with natural TTS voice.
 * First call fetches from API, subsequent calls use cache.
 */
export async function speakPhrase(
  text: string,
  voice: string = 'Orus',
  onStart?: () => void,
  onEnd?: () => void,
): Promise<void> {
  const key = cacheKey(text, voice);
  const ctx = getContext();

  // Resume context if suspended (iOS requirement)
  if (ctx.state === 'suspended') await ctx.resume();

  // Stop any currently playing audio
  if (currentSource) {
    try { currentSource.stop(); } catch {}
    currentSource = null;
  }

  let buffer = audioCache.get(key);

  if (!buffer) {
    // Fetch from API
    onStart?.();
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers,
        body: JSON.stringify({ text, voice }),
      });

      if (!res.ok) throw new Error(`TTS API error: ${res.status}`);

      const { audio, mimeType } = await res.json();
      if (!audio) throw new Error('No audio data');

      // Decode base64 PCM to AudioBuffer
      const raw = atob(audio);
      const bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

      // Parse sample rate from mimeType (e.g. "audio/L16;codec=pcm;rate=24000")
      const rateMatch = mimeType?.match(/rate=(\d+)/);
      const sampleRate = rateMatch ? parseInt(rateMatch[1]) : 24000;

      // Convert Int16 PCM to Float32
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768;
      }

      buffer = ctx.createBuffer(1, float32.length, sampleRate);
      buffer.getChannelData(0).set(float32);

      // Cache it
      audioCache.set(key, buffer);
    } catch (e) {
      console.error('TTS failed:', e);
      onEnd?.();
      return;
    }
  } else {
    onStart?.();
  }

  // Play
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.onended = () => {
    currentSource = null;
    onEnd?.();
  };
  currentSource = source;
  source.start();
}

/**
 * Stop any currently playing TTS audio.
 */
export function stopTTS(): void {
  if (currentSource) {
    try { currentSource.stop(); } catch {}
    currentSource = null;
  }
}

/**
 * Pre-cache a phrase (e.g., during idle time).
 */
export async function precachePhrase(text: string, voice: string = 'Orus'): Promise<void> {
  const key = cacheKey(text, voice);
  if (audioCache.has(key)) return;
  // Silent fetch — don't play
  await speakPhrase(text, voice, undefined, undefined).catch(() => {});
  stopTTS();
}
