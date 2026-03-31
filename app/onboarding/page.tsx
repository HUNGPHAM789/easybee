"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import ActionButton from "@/components/ActionButton";
import { connectGeminiLive, type GeminiLiveClient } from "@/lib/gemini-live";
import { startMicStream, playPcmAudio } from "@/lib/audio-utils";

type VoiceState = "idle" | "connecting" | "listening" | "speaking" | "done" | "error";
type TranscriptEntry = { role: "bee" | "user"; text: string };

const ONBOARDING_PROMPT = `You are EasyBee, a friendly Vietnamese-speaking AI tutor assistant. You help Vietnamese workers in America learn English.

Your job right now: have a short, warm conversation (3-5 turns) with a new student to understand their needs.

CONVERSATION STEPS:
1. Greet warmly in Vietnamese: "Chào bạn! Mình là EasyBee. Rất vui được gặp bạn! Cho mình hỏi vài câu nha."
2. Ask about their job: "Bạn đang làm nghề gì ở Mỹ?" (follow up naturally based on answer)
3. Ask what they need: Based on their job, ask what English situations they struggle with most. Be specific. If they say nail tech, ask "Bạn muốn học nói chuyện với khách, hay học về tiền tip, hay cần đi bác sĩ mà không biết nói?"
4. Wrap up: "Tuyệt vời! Mình hiểu rồi. Để mình chọn bài học phù hợp cho bạn nha!"

RULES:
- Speak Vietnamese primarily, mix simple English phrases when relevant
- Keep it warm, casual, encouraging — like a friend, not a teacher
- Short sentences (these are ESL learners, even Vietnamese might be casual)
- Maximum 5 turns from your side, then wrap up
- After wrapping up, output a special marker: [ONBOARDING_COMPLETE]`;

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const liveClientRef = useRef<GeminiLiveClient | null>(null);
  const micStopRef = useRef<{ stop: () => void } | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Only redirect if auth is fully loaded and user is already onboarded
  useEffect(() => {
    if (!authLoading && user?.user_metadata?.onboarded) {
      router.replace("/");
    }
  }, [authLoading, user, router]);

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
        // skip
      }
    }
    isPlayingRef.current = false;
  }, []);

  const finishOnboarding = useCallback(async () => {
    setSaving(true);

    // Collect user responses for matching
    const userText = transcript
      .filter((t) => t.role === "user")
      .map((t) => t.text)
      .join(" ");

    let recommendedLessons: string[] = [];

    if (userText.trim()) {
      try {
        const res = await fetch("/api/match-lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: userText, topN: 10 }),
        });
        if (res.ok) {
          const data = await res.json();
          recommendedLessons = data.matches?.map(
            (m: { lessonId: string }) => m.lessonId
          ) ?? [];
        }
      } catch {
        // Matching failed — proceed without recommendations
      }
    }

    const metadata = {
      onboarded: true,
      recommended_lessons: recommendedLessons,
    };

    try {
      const supabase = createClient();
      await supabase.auth.updateUser({ data: metadata });
    } catch {
      // Supabase update failed
    }

    try {
      localStorage.setItem("easybee_recommended", JSON.stringify(recommendedLessons));
      localStorage.setItem("easybee_profile", JSON.stringify(metadata));
    } catch {
      // Storage unavailable
    }

    router.replace("/");
  }, [transcript, router]);

  const startSession = useCallback(async () => {
    setState("connecting");
    setError(null);

    try {
      const res = await fetch("/api/voice-tutor/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonContext: ONBOARDING_PROMPT }),
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
      setTranscript([
        { role: "bee", text: "Đang nghe... Hãy nói để bắt đầu!" },
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
    setState("done");
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      liveClientRef.current?.close();
      micStopRef.current?.stop();
    };
  }, []);

  const handleSkip = async () => {
    setSaving(true);
    const metadata = { onboarded: true, recommended_lessons: [] };
    try {
      const supabase = createClient();
      await supabase.auth.updateUser({ data: metadata });
    } catch {
      // fallback
    }
    try {
      localStorage.setItem("easybee_profile", JSON.stringify(metadata));
    } catch {
      // ignore
    }
    router.replace("/");
  };

  // No loading gate — show onboarding immediately
  // Guest users may not have auth resolved yet, that's fine

  // Done state — saving recommendations
  if (state === "done" || saving) {
    return (
      <main className="px-5 pt-12 pb-10 flex flex-col items-center justify-center min-h-screen">
        <span className="text-5xl mb-6">{"🐝"}</span>
        <p className="text-lg font-semibold text-neutral-900 font-title mb-3">
          {saving ? "Đang chọn bài học cho bạn..." : "Xong rồi!"}
        </p>
        {saving ? (
          <div className="w-6 h-6 border-2 border-neutral-200 border-t-neutral-600 rounded-full animate-spin" />
        ) : (
          <ActionButton onClick={finishOnboarding} className="px-8 py-4 text-base mt-4">
            Xem bài học gợi ý
          </ActionButton>
        )}
      </main>
    );
  }

  // Idle — show start button
  if (state === "idle") {
    return (
      <main className="px-5 pt-14 pb-10 min-h-screen flex flex-col items-center justify-center">
        <span className="text-6xl mb-6">{"🐝"}</span>
        <h1 className="text-2xl font-semibold text-neutral-900 font-title mb-3 text-center">
          Chào bạn!
        </h1>
        <p className="text-sm text-neutral-500 text-center mb-8 max-w-xs">
          Nói chuyện với EasyBee để mình chọn bài học phù hợp nhé!
        </p>
        <ActionButton onClick={startSession} className="px-8 py-4 text-base mb-4">
          Bắt đầu nói chuyện
        </ActionButton>
        <button
          type="button"
          onClick={handleSkip}
          className="text-sm text-neutral-400 active:opacity-60 touch-manipulation"
        >
          Bỏ qua →
        </button>
      </main>
    );
  }

  // Active voice session
  const stateLabel: Record<string, string> = {
    connecting: "Đang kết nối...",
    listening: "Đang nghe... hãy nói",
    speaking: "EasyBee đang nói...",
    error: "",
  };

  return (
    <main className="px-5 pt-14 pb-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{"🐝"}</span>
          <h1 className="text-xl font-semibold text-neutral-900 font-title">
            EasyBee
          </h1>
        </div>
        <button
          type="button"
          onClick={endSession}
          className="text-sm text-neutral-400 active:opacity-60 touch-manipulation"
        >
          Kết thúc
        </button>
      </div>

      {/* Mic visualization */}
      <div className="flex flex-col items-center py-6">
        <div className="relative w-24 h-24 flex items-center justify-center mb-3">
          {state === "speaking" ? (
            <div className="relative w-24 h-24">
              <div
                className="absolute inset-0 rounded-full bg-amber-100"
                style={{ animation: "onbPulse 1.2s ease-in-out infinite" }}
              />
              <div className="absolute inset-3 rounded-full bg-amber-200 flex items-center justify-center">
                <span className="text-3xl">{"🐝"}</span>
              </div>
            </div>
          ) : state === "listening" ? (
            <div className="relative w-24 h-24">
              <div
                className="absolute inset-0 rounded-full bg-green-50"
                style={{ animation: "onbGlow 2s ease-in-out infinite" }}
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
        <p className="text-sm text-neutral-500">
          {state === "error" ? error : stateLabel[state] || ""}
        </p>
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 mb-4">
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
                {entry.role === "bee" && (
                  <span className="mr-1">{"🐝"}</span>
                )}
                {entry.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Error retry / skip */}
      <div className="flex justify-center gap-4 py-3">
        {state === "error" && (
          <ActionButton onClick={startSession} className="px-6 text-sm">
            Thử lại
          </ActionButton>
        )}
        <button
          type="button"
          onClick={handleSkip}
          className="text-sm text-neutral-400 active:opacity-60 touch-manipulation"
        >
          Bỏ qua →
        </button>
      </div>

      <style jsx>{`
        @keyframes onbPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes onbGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
      `}</style>
    </main>
  );
}
