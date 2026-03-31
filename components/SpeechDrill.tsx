"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "./ActionButton";
import IconButton from "./IconButton";

// --- Scoring helpers ---
function wordScore(target: string, spoken: string): number {
  const t = target.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/);
  const s = spoken.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/);
  let matches = 0;
  t.forEach((word) => { if (s.includes(word)) matches++; });
  return Math.round((matches / t.length) * 100);
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function isClose(target: string, spoken: string): boolean {
  const t = target.toLowerCase();
  const s = spoken.toLowerCase();
  if (t === s) return true;
  return levenshtein(t, s) / Math.max(t.length, s.length) < 0.35;
}

function HighlightedTranscript({ target, spoken }: { target: string; spoken: string }) {
  const targetWords = target.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/);
  const spokenWords = spoken.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/);
  return (
    <span className="flex flex-wrap gap-1.5">
      {spokenWords.map((word, i) => {
        const exact = targetWords.includes(word);
        const close = !exact && targetWords.some((t) => isClose(t, word));
        return (
          <span key={i} className={`px-2 py-0.5 rounded-lg text-base font-medium ${
            exact ? "bg-green-100 text-green-700"
            : close ? "bg-orange-100 text-orange-600"
            : "bg-red-100 text-red-500"
          }`}>
            {word}
          </span>
        );
      })}
    </span>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 75 ? "text-green-600 bg-green-50"
    : score >= 50 ? "text-orange-500 bg-orange-50"
    : "text-red-500 bg-red-50";
  const label = score >= 75 ? "Tốt lắm! 👍"
    : score >= 50 ? "Gần đúng 💪"
    : "Thử lại lần 2 🎯";
  return (
    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${color}`}>
      {label} {score}%
    </span>
  );
}

interface Attempt { transcript: string; score: number; }

function isSpeechSupported() {
  if (typeof window === "undefined") return false;
  return !!(
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );
}

export default function SpeechDrill({
  target,
  onComplete,
}: {
  target: string;
  onComplete: () => void;
}) {
  const LISTEN_REQUIRED = 2;
  const speechSupported = isSpeechSupported();

  const [listenCount, setListenCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const readyToSpeak = listenCount >= LISTEN_REQUIRED;
  const done = speechSupported ? attempts.length >= 2 : readyToSpeak;

  // Ensure TTS voices are loaded (Chrome returns [] on first getVoices() call)
  const [voicesReady, setVoicesReady] = useState(false);
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (synth.getVoices().length > 0) { setVoicesReady(true); return; }
    const onVoicesChanged = () => setVoicesReady(true);
    synth.addEventListener("voiceschanged", onVoicesChanged);
    return () => synth.removeEventListener("voiceschanged", onVoicesChanged);
  }, []);

  // Pre-request mic permission as soon as mic button appears
  useEffect(() => {
    if (!readyToSpeak || !speechSupported) return;
    navigator.mediaDevices?.getUserMedia({ audio: true })
      .then((stream) => stream.getTracks().forEach((t) => t.stop())) // release immediately
      .catch(() => {}); // user denied — will handle on tap
  }, [readyToSpeak, speechSupported]);

  useEffect(() => {
    setListenCount(0);
    setPlaying(false);
    setAttempts([]);
    setRecording(false);
    setError(null);
    window.speechSynthesis?.cancel();
  }, [target]);

  const playAudio = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing || readyToSpeak) return; // locked after threshold
    window.speechSynthesis?.cancel();

    const utter = new SpeechSynthesisUtterance(target);
    utter.lang = "en-US";
    utter.rate = 0.82;
    const voices = window.speechSynthesis?.getVoices() ?? [];
    const preferred = voices.find((v) =>
      v.lang.startsWith("en") &&
      (v.name.includes("Samantha") || v.name.includes("Google US") ||
       v.name.includes("Karen") || v.name.includes("Daniel"))
    );
    if (preferred) utter.voice = preferred;
    utter.onstart = () => setPlaying(true);
    utter.onend = () => {
      setPlaying(false);
      setListenCount((c) => Math.min(c + 1, LISTEN_REQUIRED));
    };
    utter.onerror = () => setPlaying(false);
    window.speechSynthesis?.speak(utter);
  }, [playing, readyToSpeak, target, voicesReady]);

  const startRecording = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (done || recording) return;
    setError(null);

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) { setError("Trình duyệt chưa hỗ trợ — thử tải lại trang"); return; }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setRecording(true);
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript.trim();
      const score = wordScore(target, transcript);
      setAttempts((prev) => [...prev, { transcript, score }]);
      setRecording(false);
    };
    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      setRecording(false);
      if (e.error === "no-speech") setError("Không nghe thấy gì — thử lại nhé!");
      else if (e.error === "not-allowed") setError("Cho phép dùng microphone trong thanh địa chỉ trình duyệt rồi thử lại");
      else if (e.error === "aborted") { /* user aborted, no message */ }
      else setError("Lỗi — thử lại.");
    };
    recognition.onend = () => setRecording(false);
    recognition.start();
  }, [done, recording, target]);

  const stopRecording = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    recognitionRef.current?.stop();
  }, []);

  // Hint text
  const hint = done ? "" :
    !readyToSpeak
      ? `Nghe ${listenCount}/${LISTEN_REQUIRED} lần rồi tiếp tục`
      : !speechSupported
      ? "Nhấn tiếp tục sau khi đã nghe"
      : attempts.length === 0 ? "Bây giờ bạn nói — Lần 1"
      : "Thử lại — Lần 2";

  return (
    <div className="mt-10 space-y-6" onClick={(e) => e.stopPropagation()}>

      {/* Hint label */}
      {!done && (
        <p className="text-center text-sm text-neutral-400 font-title">{hint}</p>
      )}

      {/* Attempt results */}
      <AnimatePresence>
        {attempts.map((attempt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-neutral-50 rounded-2xl px-4 py-4 space-y-2"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wide font-title">
                Lần {i + 1}
              </span>
              <ScoreBadge score={attempt.score} />
            </div>
            <HighlightedTranscript target={target} spoken={attempt.transcript} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Single morphing button */}
      {!done && (
        <div className="flex flex-col items-center gap-4 mt-6">

          {/* Dots — outside button, between hint and button */}
          {!readyToSpeak && (
            <div className="flex gap-2">
              {Array.from({ length: LISTEN_REQUIRED }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    i < listenCount ? "bg-neutral-800" : "bg-neutral-200"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="relative">
            <motion.div
              animate={{ scale: playing ? 1.08 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                onClick={!readyToSpeak ? playAudio : (!speechSupported ? undefined : recording ? stopRecording : startRecording)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95 touch-manipulation ${
                  recording ? "bg-red-100 animate-pulse" : "bg-transparent active:bg-neutral-100"
                }`}
              >
                <AnimatePresence mode="wait">
                  {!readyToSpeak ? (
                    // Speaker icon
                    <motion.span
                      key="speaker"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                    >
                      {playing ? (
                        <span className="flex items-end gap-[3px] h-5">
                          <span className="w-[3px] bg-neutral-500 rounded-full animate-[soundbar1_0.6s_ease-in-out_infinite]" style={{ height: "55%" }} />
                          <span className="w-[3px] bg-neutral-500 rounded-full animate-[soundbar2_0.6s_ease-in-out_infinite_0.1s]" style={{ height: "100%" }} />
                          <span className="w-[3px] bg-neutral-500 rounded-full animate-[soundbar1_0.6s_ease-in-out_infinite_0.2s]" style={{ height: "40%" }} />
                        </span>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                      )}
                    </motion.span>
                  ) : !speechSupported ? (
                    // Safari — no mic, button disappears after listening
                    <motion.span key="none" initial={{ opacity: 0 }} animate={{ opacity: 0 }} />
                  ) : recording ? (
                    // Stop square
                    <motion.span
                      key="stop"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                      </svg>
                    </motion.span>
                  ) : (
                    // Mic icon
                    <motion.span
                      key="mic"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="22" />
                        <line x1="8" y1="22" x2="16" y2="22" />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </div>
      )}

      {recording && (
        <p className="text-center text-sm text-red-500 font-medium animate-pulse">Đang nghe...</p>
      )}
      {error && <p className="text-center text-sm text-red-400">{error}</p>}

      {/* Done state */}
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 pt-2"
        >
          {speechSupported && attempts.length >= 2 && (
            <p className="text-sm text-neutral-400 font-title">
              {attempts[1].score >= attempts[0].score
                ? "Lần 2 tốt hơn lần 1! 🎉"
                : "Tiếp tục luyện tập nhé 💪"}
            </p>
          )}
          <ActionButton onClick={onComplete} className="px-8 py-3 text-base">
            Tiếp tục →
          </ActionButton>
        </motion.div>
      )}
    </div>
  );
}

















