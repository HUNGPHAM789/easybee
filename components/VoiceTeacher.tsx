"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "./ActionButton";
import { connectGeminiLive, type GeminiLiveClient } from "@/lib/gemini-live";
import { startMicStream, playPcmAudio } from "@/lib/audio-utils";

type TeacherState = "idle" | "connecting" | "listening" | "speaking" | "error";
type TranscriptEntry = { role: "user" | "model"; text: string };

const SYSTEM_CONTEXT =
  "You are EasyBee Teacher, a friendly English tutor for Vietnamese nail salon workers in America. " +
  "Speak slowly, use simple words. When the student makes a mistake, gently correct them. " +
  "Mix in Vietnamese translations when helpful. Keep responses to 2-3 sentences. " +
  "Start by greeting them warmly in Vietnamese, then ask what they want to practice today.";

export default function VoiceTeacher() {
  const [state, setState] = useState<TeacherState>("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const liveClientRef = useRef<GeminiLiveClient | null>(null);
  const micStopRef = useRef<{ stop: () => void } | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript]);

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

  const startSession = useCallback(async () => {
    setState("connecting");
    setError(null);

    try {
      const res = await fetch("/api/voice-tutor/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonContext: SYSTEM_CONTEXT }),
      });

      if (!res.ok) throw new Error("Token API error");
      const { wsUrl, model, systemInstruction } = await res.json();

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
          micStopRef.current?.stop();
          micStopRef.current = null;
        },
      });

      liveClientRef.current = client;

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
      setTranscript([
        { role: "model", text: "🌟 Đang nghe... Hãy nói tiếng Anh để bắt đầu!" },
      ]);
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
    setTranscript([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      liveClientRef.current?.close();
      micStopRef.current?.stop();
    };
  }, []);

  const stateLabel: Record<TeacherState, string> = {
    idle: "",
    connecting: "Đang kết nối...",
    listening: "Đang nghe... hãy nói tiếng Anh",
    speaking: "Thầy đang nói...",
    error: "",
  };

  // Idle state — show start button
  if (state === "idle") {
    return (
      <div className="flex flex-col items-center justify-center pt-20 px-6">
        <div className="w-28 h-28 rounded-full bg-neutral-50 flex items-center justify-center mb-6">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2" width="6" height="11" rx="3" />
            <path d="M5 10a7 7 0 0 0 14 0" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 font-title mb-2 text-center">
          Thầy giáo EasyBee
        </h2>
        <p className="text-sm text-neutral-400 text-center mb-8 max-w-xs">
          Nói chuyện với thầy giáo AI để luyện tiếng Anh. Thầy nói chậm, dễ hiểu, và sửa lỗi nhẹ nhàng.
        </p>
        <ActionButton onClick={startSession} className="px-8 py-4 text-base">
          Bắt đầu nói chuyện
        </ActionButton>
      </div>
    );
  }

  // Active session
  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">
      {/* Mic visualization */}
      <div className="flex flex-col items-center pt-8 pb-4">
        <div className="relative w-24 h-24 flex items-center justify-center mb-3">
          {state === "speaking" ? (
            <div className="relative w-24 h-24">
              <div
                className="absolute inset-0 rounded-full bg-blue-100"
                style={{ animation: "teacherPulse 1.2s ease-in-out infinite" }}
              />
              <div
                className="absolute inset-2 rounded-full bg-blue-200"
                style={{ animation: "teacherPulse 1.2s ease-in-out infinite 0.2s" }}
              />
              <div className="absolute inset-4 rounded-full bg-blue-300 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
              </div>
            </div>
          ) : state === "listening" ? (
            <div className="relative w-24 h-24">
              <div
                className="absolute inset-0 rounded-full bg-green-50"
                style={{ animation: "teacherGlow 2s ease-in-out infinite" }}
              />
              <div className="absolute inset-3 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <rect x="9" y="2" width="6" height="11" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </div>
            </div>
          ) : state === "connecting" ? (
            <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center">
              <span className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
            </div>
          ) : null}
        </div>

        <p className="text-sm text-neutral-500">{stateLabel[state]}</p>
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
        <AnimatePresence initial={false}>
          {transcript.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  entry.role === "user"
                    ? "bg-blue-50 text-neutral-900"
                    : "bg-neutral-50 text-neutral-900"
                }`}
              >
                {entry.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Error / End session */}
      <div className="px-4 py-3 flex justify-center">
        {state === "error" ? (
          <div className="text-center">
            <p className="text-sm text-red-500 mb-2">{error}</p>
            <ActionButton onClick={startSession} className="px-6 text-sm">
              Thử lại
            </ActionButton>
          </div>
        ) : (
          <button
            type="button"
            onClick={endSession}
            className="text-sm text-neutral-400 active:opacity-60 touch-manipulation"
          >
            Kết thúc
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes teacherPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes teacherGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
      `}</style>
    </div>
  );
}
