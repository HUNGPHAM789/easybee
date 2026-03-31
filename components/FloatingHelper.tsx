"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { connectGeminiLive, type GeminiLiveClient } from "@/lib/gemini-live";
import { startMicStream, playPcmAudio } from "@/lib/audio-utils";

type HelperState = "idle" | "connecting" | "listening" | "speaking" | "error";

const HELPER_PROMPT =
  "You are EasyBee Helper, a friendly AI English tutor for Vietnamese workers in America. " +
  "You're always available to help students. " +
  "Speak Vietnamese by default, use English when teaching. " +
  "Keep responses short (2-3 sentences). Be warm and encouraging. " +
  "If they ask about a topic, suggest specific lessons by name. " +
  "Help them find the right lesson, explain phrases, give extra examples, help with pronunciation.";

export default function FloatingHelper() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<HelperState>("idle");
  const [error, setError] = useState<string | null>(null);

  const liveClientRef = useRef<GeminiLiveClient | null>(null);
  const micStopRef = useRef<{ stop: () => void } | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);

  const playAudioQueue = useCallback(async () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    while (audioQueueRef.current.length > 0) {
      const chunk = audioQueueRef.current.shift()!;
      try {
        await playPcmAudio(chunk, 24000);
      } catch {
        // skip
      }
    }
    isPlayingRef.current = false;
  }, []);

  const startSession = useCallback(async () => {
    setState("connecting");
    setError(null);
    try {
      const res = await fetch("/api/voice-tutor/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonContext: HELPER_PROMPT }),
      });
      if (!res.ok) throw new Error("Token API error");
      const { wsUrl, model, systemInstruction } = await res.json();

      const client = await connectGeminiLive(wsUrl, model, systemInstruction, {
        onAudioChunk: (base64Pcm) => {
          setState("speaking");
          audioQueueRef.current.push(base64Pcm);
          playAudioQueue();
        },
        onTurnEnd: () => setState("listening"),
        onError: (msg) => {
          setState("error");
          setError(msg);
        },
        onClose: () => {
          micStopRef.current?.stop();
          micStopRef.current = null;
        },
      });

      liveClientRef.current = client;

      const mic = await startMicStream(
        (base64Pcm) => client.sendAudio(base64Pcm),
        (errMsg) => {
          setState("error");
          setError(errMsg);
        }
      );
      micStopRef.current = mic;
      setState("listening");
    } catch {
      setState("error");
      setError("Không thể kết nối. Vui lòng thử lại.");
    }
  }, [playAudioQueue]);

  const endSession = useCallback(() => {
    liveClientRef.current?.close();
    liveClientRef.current = null;
    micStopRef.current?.stop();
    micStopRef.current = null;
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    setState("idle");
  }, []);

  // When panel opens, start session; when closes, end it
  useEffect(() => {
    if (open && state === "idle") {
      startSession();
    }
    if (!open && state !== "idle") {
      endSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      liveClientRef.current?.close();
      micStopRef.current?.stop();
    };
  }, []);

  const stateLabel: Record<HelperState, string> = {
    idle: "",
    connecting: "Đang kết nối...",
    listening: "Đang nghe... hãy nói",
    speaking: "EasyBee đang nói...",
    error: "",
  };

  return (
    <>
      {/* Floating bee button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Mở EasyBee Helper"
        className="fixed z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform touch-manipulation"
        style={{
          bottom: 80,
          right: 20,
          background: "linear-gradient(135deg, #F59E0B, #D97706)",
        }}
      >
        <span className="text-2xl" style={{ lineHeight: 1 }}>
          🐝
        </span>
      </button>

      {/* Slide-up panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl"
              style={{ height: "50vh", minHeight: 320 }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-neutral-200" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🐝</span>
                  <span className="text-base font-semibold text-neutral-900 font-title">
                    EasyBee Helper
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center active:bg-neutral-200 touch-manipulation"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="#737373"
                  >
                    <path d="M8 6.586L4.707 3.293a1 1 0 00-1.414 1.414L6.586 8l-3.293 3.293a1 1 0 101.414 1.414L8 9.414l3.293 3.293a1 1 0 001.414-1.414L9.414 8l3.293-3.293a1 1 0 00-1.414-1.414L8 6.586z" />
                  </svg>
                </button>
              </div>

              {/* Voice UI */}
              <div className="flex flex-col items-center justify-center flex-1 px-5"
                style={{ height: "calc(50vh - 100px)" }}
              >
                {/* Mic visualization */}
                <div className="relative w-20 h-20 flex items-center justify-center mb-4">
                  {state === "speaking" ? (
                    <div className="relative w-20 h-20">
                      <div
                        className="absolute inset-0 rounded-full bg-amber-100"
                        style={{
                          animation:
                            "helperPulse 1.2s ease-in-out infinite",
                        }}
                      />
                      <div className="absolute inset-3 rounded-full bg-amber-200 flex items-center justify-center">
                        <span className="text-2xl">🐝</span>
                      </div>
                    </div>
                  ) : state === "listening" ? (
                    <div className="relative w-20 h-20">
                      <div
                        className="absolute inset-0 rounded-full bg-green-50"
                        style={{
                          animation:
                            "helperGlow 2s ease-in-out infinite",
                        }}
                      />
                      <div className="absolute inset-3 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="2"
                        >
                          <rect
                            x="9"
                            y="2"
                            width="6"
                            height="11"
                            rx="3"
                          />
                          <path d="M5 10a7 7 0 0 0 14 0" />
                          <line x1="12" y1="19" x2="12" y2="22" />
                        </svg>
                      </div>
                    </div>
                  ) : state === "connecting" ? (
                    <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-neutral-50 flex items-center justify-center">
                      <span className="text-3xl">🐝</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-neutral-500 mb-4">
                  {state === "error"
                    ? error
                    : stateLabel[state] ||
                      "Nhấn để nói chuyện với EasyBee"}
                </p>

                {state === "error" && (
                  <button
                    type="button"
                    onClick={startSession}
                    className="text-sm text-amber-600 font-medium active:opacity-60 touch-manipulation"
                  >
                    Thử lại
                  </button>
                )}
              </div>

              <style jsx>{`
                @keyframes helperPulse {
                  0%,
                  100% {
                    transform: scale(1);
                    opacity: 0.6;
                  }
                  50% {
                    transform: scale(1.08);
                    opacity: 1;
                  }
                }
                @keyframes helperGlow {
                  0%,
                  100% {
                    opacity: 0.5;
                    transform: scale(1);
                  }
                  50% {
                    opacity: 1;
                    transform: scale(1.04);
                  }
                }
              `}</style>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
