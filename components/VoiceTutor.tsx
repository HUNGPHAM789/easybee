"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "./ActionButton";

type Message = { role: "user" | "model"; text: string };
type TutorState = "connecting" | "idle" | "listening" | "thinking" | "speaking" | "error";

// ── Speech helpers ───────────────────────────────────────────────────────────

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
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85;
    u.onend = () => resolve();
    u.onerror = () => resolve();

    // Pick a good voice
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
  const [state, setState] = useState<TutorState>("connecting");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<Message[]>([]);

  // Keep historyRef in sync
  useEffect(() => {
    historyRef.current = messages;
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Send message to API and speak response
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

        // Speak the response
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

  // Initial greeting
  useEffect(() => {
    const init = async () => {
      if (!isSpeechRecognitionSupported()) {
        setState("error");
        setError("Trình duyệt không hỗ trợ nhận diện giọng nói. Vui lòng dùng Chrome.");
        return;
      }

      // Send a start signal to get the tutor's greeting
      await sendToTutor("Xin chào, tôi muốn luyện tập.");
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start listening
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
      // Only reset to idle if we're still in listening state (not already processing)
      setState((s) => (s === "listening" ? "idle" : s));
    };

    recognition.start();
  }, [state, sendToTutor]);

  // Stop listening
  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }, []);

  // Mic button handler
  const handleMicPress = useCallback(() => {
    if (state === "listening") {
      stopListening();
    } else if (state === "idle") {
      startListening();
    }
  }, [state, startListening, stopListening]);

  // Retry on error
  const handleRetry = useCallback(() => {
    setError(null);
    setState("idle");
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  const stateLabel: Record<TutorState, string> = {
    connecting: "Đang kết nối...",
    idle: "Nhấn để nói",
    listening: "Đang nghe...",
    thinking: "Đang suy nghĩ...",
    speaking: "Đang nói...",
    error: "",
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between border-b border-neutral-100">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 font-title">{lessonTitle}</h2>
          <p className="text-xs text-neutral-400">Luyện phát âm</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-neutral-400 font-medium active:opacity-60 touch-manipulation"
        >
          Kết thúc
        </button>
      </div>

      {/* Conversation transcript */}
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

      {/* Bottom controls */}
      <div className="px-5 pb-10 pt-4 flex flex-col items-center gap-3 border-t border-neutral-100">
        {state === "error" ? (
          <div className="text-center">
            <p className="text-sm text-red-500 mb-3">{error}</p>
            <ActionButton onClick={handleRetry} className="px-6 text-sm">
              Thử lại
            </ActionButton>
          </div>
        ) : (
          <>
            {/* Mic button */}
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
                // Stop icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                // Mic icon
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="2" width="6" height="11" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              )}
            </button>

            {/* State label */}
            <p className="text-xs text-neutral-400">
              {state === "connecting" && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                  {stateLabel[state]}
                </span>
              )}
              {state !== "connecting" && stateLabel[state]}
            </p>
          </>
        )}
      </div>

      {/* Pulse animation */}
      <style jsx>{`
        @keyframes micPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
        }
      `}</style>
    </div>
  );
}
