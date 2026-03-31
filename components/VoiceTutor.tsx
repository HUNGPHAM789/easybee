"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "./ActionButton";
import { connectGeminiLive, type GeminiLiveClient } from "@/lib/gemini-live";
import { startMicStream, playPcmAudio } from "@/lib/audio-utils";

type Message = { role: "user" | "model"; text: string };
type TutorState = "connecting" | "idle" | "listening" | "thinking" | "speaking" | "error";
type TutorMode = "text" | "live";

// ── Speech helpers (text mode) ──────────────────────────────────────────────

function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    (window as unknown as Record<string, unknown>).SpeechRecognition ||
    (window as unknown as Record<string, unknown>).webkitSpeechRecognition
  );
}

function createRecognition(): SpeechRecognition | null {
  if (typeof window === "undefined") return null;
  const SR =
    (window as unknown as Record<string, new () => SpeechRecognition>).SpeechRecognition ||
    (window as unknown as Record<string, new () => SpeechRecognition>).webkitSpeechRecognition;
  if (!SR) return null;
  const r = new SR();
  r.lang = "en-US";
  r.interimResults = false;
  r.maxAlternatives = 1;
  return r;
}

function speak(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85;
    u.onend = () => resolve();
    u.onerror = () => resolve();

    const voices = window.speechSynthesis.getVoices();
    const preferred = ["Samantha", "Google US English", "Karen", "Daniel"];
    for (const name of preferred) {
      const v = voices.find((v) => v.name.includes(name));
      if (v) {
        u.voice = v;
        break;
      }
    }
    window.speechSynthesis.speak(u);
  });
}

// ── Component ────────────────────────────────────────────────────────────────

export default function VoiceTutor({
  lessonTitle,
  lessonContext,
  onClose,
}: {
  lessonTitle: string;
  lessonContext: string;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<TutorMode | null>(null); // null = choosing
  const [state, setState] = useState<TutorState>("connecting");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<Message[]>([]);

  // Live mode refs
  const liveClientRef = useRef<GeminiLiveClient | null>(null);
  const micStopRef = useRef<{ stop: () => void } | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);

  // Keep historyRef in sync
  useEffect(() => {
    historyRef.current = messages;
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // ── TEXT MODE ─────────────────────────────────────────────────────────────

  const sendToTutor = useCallback(
    async (userText: string) => {
      const userMsg: Message = { role: "user", text: userText };
      setMessages((prev) => [...prev, userMsg]);
      setState("thinking");

      try {
        const res = await fetch("/api/voice-tutor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userText,
            history: [...historyRef.current, userMsg],
            lessonContext,
          }),
        });

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        const aiText = data.text || "Xin lỗi, tôi không hiểu. Bạn thử lại nhé.";

        const aiMsg: Message = { role: "model", text: aiText };
        setMessages((prev) => [...prev, aiMsg]);

        setState("speaking");
        await speak(aiText);
        setState("idle");
      } catch {
        setState("error");
        setError("Không thể kết nối. Thử lại?");
      }
    },
    [lessonContext],
  );

  const initTextMode = useCallback(async () => {
    if (!isSpeechRecognitionSupported()) {
      setState("error");
      setError("Trình duyệt không hỗ trợ nhận diện giọng nói. Vui lòng dùng Chrome.");
      return;
    }
    await sendToTutor("Xin chào, tôi muốn luyện tập.");
  }, [sendToTutor]);

  const startListening = useCallback(() => {
    if (state !== "idle") return;

    const recognition = createRecognition();
    if (!recognition) {
      setState("error");
      setError("Không thể mở micro. Vui lòng cho phép truy cập micro.");
      return;
    }

    recognitionRef.current = recognition;
    setState("listening");

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        sendToTutor(transcript);
      } else {
        setState("idle");
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setState("error");
        setError("Micro bị chặn. Vui lòng cho phép truy cập micro trong cài đặt trình duyệt.");
      } else if (event.error === "no-speech") {
        setState("idle");
      } else {
        setState("idle");
      }
    };

    recognition.onend = () => {
      setState((s) => (s === "listening" ? "idle" : s));
    };

    recognition.start();
  }, [state, sendToTutor]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }, []);

  // ── LIVE MODE ─────────────────────────────────────────────────────────────

  const playAudioQueue = useCallback(async () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;

    while (audioQueueRef.current.length > 0) {
      const chunk = audioQueueRef.current.shift()!;
      try {
        await playPcmAudio(chunk, 24000);
      } catch {
        // skip unplayable chunks
      }
    }

    isPlayingRef.current = false;
  }, []);

  const initLiveMode = useCallback(async () => {
    setState("connecting");

    try {
      // Get WebSocket config from server
      const res = await fetch("/api/voice-tutor/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonContext }),
      });

      if (!res.ok) throw new Error("Token API error");
      const { wsUrl, model, systemInstruction } = await res.json();

      // Connect WebSocket
      const client = await connectGeminiLive(wsUrl, model, systemInstruction, {
        onAudioChunk: (base64Pcm) => {
          setState("speaking");
          audioQueueRef.current.push(base64Pcm);
          playAudioQueue();
        },
        onTurnEnd: () => {
          setState("listening");
        },
        onError: (msg) => {
          setState("error");
          setError(msg);
        },
        onClose: () => {
          // Clean up mic
          micStopRef.current?.stop();
          micStopRef.current = null;
        },
      });

      liveClientRef.current = client;

      // Start mic stream
      const mic = await startMicStream(
        (base64Pcm) => {
          client.sendAudio(base64Pcm);
        },
        (errMsg) => {
          setState("error");
          setError(errMsg);
        },
      );
      micStopRef.current = mic;

      setState("listening");
      setMessages([
        {
          role: "model",
          text: "🎙️ Đang nghe... Hãy nói tiếng Anh để bắt đầu luyện tập!",
        },
      ]);
    } catch {
      setState("error");
      setError("Không thể kết nối Live API. Vui lòng thử lại.");
    }
  }, [lessonContext, playAudioQueue]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      liveClientRef.current?.close();
      micStopRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  // ── MODE SELECTION ────────────────────────────────────────────────────────

  const selectMode = useCallback(
    (selected: TutorMode) => {
      setMode(selected);
      if (selected === "text") {
        initTextMode();
      } else {
        initLiveMode();
      }
    },
    [initTextMode, initLiveMode],
  );

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleMicPress = useCallback(() => {
    if (mode === "text") {
      if (state === "listening") {
        stopListening();
      } else if (state === "idle") {
        startListening();
      }
    }
    // Live mode: mic is always streaming, no toggle needed
  }, [mode, state, startListening, stopListening]);

  const handleRetry = useCallback(() => {
    setError(null);
    if (mode === "live") {
      initLiveMode();
    } else {
      setState("idle");
    }
  }, [mode, initLiveMode]);

  const handleClose = useCallback(() => {
    liveClientRef.current?.close();
    micStopRef.current?.stop();
    window.speechSynthesis?.cancel();
    onClose();
  }, [onClose]);

  // ── Render ────────────────────────────────────────────────────────────────

  const stateLabel: Record<TutorState, string> = {
    connecting: "Đang kết nối...",
    idle: "Nhấn để nói",
    listening: mode === "live" ? "Đang nghe... hãy nói tiếng Anh" : "Đang nghe...",
    thinking: "Đang suy nghĩ...",
    speaking: "Đang nói...",
    error: "",
  };

  // ── Mode selection screen ─────────────────────────────────────────────────

  if (mode === null) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="px-5 pt-12 pb-4 flex items-center justify-between border-b border-neutral-100">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 font-title">
              {lessonTitle}
            </h2>
            <p className="text-xs text-neutral-400">Luyện phát âm</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-neutral-400 font-medium active:opacity-60 touch-manipulation"
          >
            Đóng
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-5">
          <p className="text-base text-neutral-600 font-title text-center mb-2">
            Chọn chế độ luyện tập
          </p>

          <button
            type="button"
            onClick={() => selectMode("text")}
            className="w-full max-w-xs bg-neutral-50 rounded-2xl px-6 py-5 text-left active:bg-neutral-100 touch-manipulation transition-colors"
          >
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-xl">💬</span>
              <span className="text-base font-semibold text-neutral-900 font-title">
                Trò chuyện thường
              </span>
            </div>
            <p className="text-xs text-neutral-400 pl-9">
              Nói → nhận phản hồi bằng chữ và giọng đọc
            </p>
          </button>

          <button
            type="button"
            onClick={() => selectMode("live")}
            className="w-full max-w-xs bg-neutral-50 rounded-2xl px-6 py-5 text-left active:bg-neutral-100 touch-manipulation transition-colors"
          >
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-xl">⚡</span>
              <span className="text-base font-semibold text-neutral-900 font-title">
                Trò chuyện trực tiếp
              </span>
            </div>
            <p className="text-xs text-neutral-400 pl-9">
              Hội thoại thời gian thực — tự nhiên hơn, nhanh hơn
            </p>
          </button>
        </div>
      </div>
    );
  }

  // ── Main tutor screen ─────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between border-b border-neutral-100">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 font-title">{lessonTitle}</h2>
          <p className="text-xs text-neutral-400">
            {mode === "live" ? "Trò chuyện trực tiếp ⚡" : "Luyện phát âm"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="text-sm text-neutral-400 font-medium active:opacity-60 touch-manipulation"
        >
          Kết thúc
        </button>
      </div>

      {/* Conversation transcript (text mode) / Status (live mode) */}
      {mode === "text" ? (
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-50 text-neutral-900"
                      : "bg-neutral-50 text-neutral-900"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {/* Live mode visual feedback */}
          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            {state === "speaking" ? (
              // Pulse animation when AI is speaking
              <div className="relative w-28 h-28">
                <div
                  className="absolute inset-0 rounded-full bg-blue-100"
                  style={{ animation: "livePulse 1.2s ease-in-out infinite" }}
                />
                <div
                  className="absolute inset-2 rounded-full bg-blue-200"
                  style={{ animation: "livePulse 1.2s ease-in-out infinite 0.2s" }}
                />
                <div className="absolute inset-4 rounded-full bg-blue-300 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  </svg>
                </div>
              </div>
            ) : state === "listening" ? (
              // Subtle glow when listening
              <div className="relative w-28 h-28">
                <div
                  className="absolute inset-0 rounded-full bg-green-50"
                  style={{ animation: "listenGlow 2s ease-in-out infinite" }}
                />
                <div className="absolute inset-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <rect x="9" y="2" width="6" height="11" rx="3" />
                    <path d="M5 10a7 7 0 0 0 14 0" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full bg-neutral-100 flex items-center justify-center">
                <span className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
              </div>
            )}
          </div>

          <p className="text-sm text-neutral-500 text-center">
            {messages[messages.length - 1]?.text || stateLabel[state]}
          </p>
        </div>
      )}

      {/* Bottom controls */}
      <div className="px-5 pb-10 pt-4 flex flex-col items-center gap-3 border-t border-neutral-100">
        {state === "error" ? (
          <div className="text-center">
            <p className="text-sm text-red-500 mb-3">{error}</p>
            <ActionButton onClick={handleRetry} className="px-6 text-sm">
              Thử lại
            </ActionButton>
          </div>
        ) : mode === "text" ? (
          <>
            {/* Text mode: Mic button */}
            <button
              type="button"
              onClick={handleMicPress}
              disabled={state !== "idle" && state !== "listening"}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all touch-manipulation ${
                state === "listening"
                  ? "bg-red-500 shadow-lg shadow-red-200"
                  : state === "idle"
                    ? "bg-neutral-900 active:bg-neutral-700"
                    : "bg-neutral-200"
              }`}
              style={state === "listening" ? { animation: "micPulse 1.5s ease-in-out infinite" } : undefined}
            >
              {state === "listening" ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="2" width="6" height="11" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              )}
            </button>
            <p className="text-xs text-neutral-400">
              {state === "connecting" ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                  {stateLabel[state]}
                </span>
              ) : (
                stateLabel[state]
              )}
            </p>
          </>
        ) : (
          /* Live mode: just show status */
          <p className="text-xs text-neutral-400">{stateLabel[state]}</p>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes micPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
        }
        @keyframes livePulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes listenGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
      `}</style>
    </div>
  );
}
