/**
 * Audio utilities for Gemini Live API — PCM 16-bit 16kHz mono
 */

/** Start mic capture, returns a stream of base64-encoded PCM chunks via callback */
export async function startMicStream(
  onChunk: (base64Pcm: string) => void,
  onError?: (err: string) => void,
): Promise<{ stop: () => void }> {
  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
  } catch {
    onError?.("Không thể mở micro. Vui lòng cho phép truy cập micro.");
    return { stop: () => {} };
  }

  const audioCtx = new AudioContext({ sampleRate: 16000 });
  const source = audioCtx.createMediaStreamSource(stream);

  // Use ScriptProcessorNode (widely supported, including Safari)
  const processor = audioCtx.createScriptProcessor(4096, 1, 1);
  let stopped = false;

  processor.onaudioprocess = (e) => {
    if (stopped) return;
    const float32 = e.inputBuffer.getChannelData(0);
    const pcm16 = float32ToPcm16(float32);
    const base64 = arrayBufferToBase64(pcm16.buffer as ArrayBuffer);
    onChunk(base64);
  };

  source.connect(processor);
  processor.connect(audioCtx.destination);

  return {
    stop: () => {
      stopped = true;
      processor.disconnect();
      source.disconnect();
      stream.getTracks().forEach((t) => t.stop());
      audioCtx.close();
    },
  };
}

/** Play base64-encoded PCM 16-bit 24kHz audio */
export async function playPcmAudio(
  base64: string,
  sampleRate: number = 24000,
): Promise<void> {
  const bytes = base64ToArrayBuffer(base64);
  const int16 = new Int16Array(bytes);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768;
  }

  const audioCtx = new AudioContext({ sampleRate });

  try {
    const buffer = audioCtx.createBuffer(1, float32.length, sampleRate);
    buffer.getChannelData(0).set(float32);

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);

    return new Promise((resolve) => {
      source.onended = () => {
        audioCtx.close();
        resolve();
      };
      source.start();
    });
  } catch {
    audioCtx.close();
    throw new Error("Audio playback failed");
  }
}

// ── Conversion helpers ──────────────────────────────────────────────────────

function float32ToPcm16(float32: Float32Array): Int16Array {
  const pcm16 = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return pcm16;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
