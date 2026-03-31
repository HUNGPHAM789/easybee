"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lesson, DrillCard } from "@/lib/content/index";
import ActionButton from "./ActionButton";
import SpeakButton from "./SpeakButton";
import SpeechDrill from "./SpeechDrill";
import { MotionCarousel } from "./ui/motion-carousel";
import { WhisperTextInstant } from "./ui/whisper-text";
import { BlurredStagger } from "./ui/blurred-stagger";
import { TextReveal } from "./ui/text-reveal-animation";

const EASE = [0.22, 1, 0.36, 1] as const;

// ── Spring progress bar ───────────────────────────────────────────────────────
function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-[3px] bg-neutral-100 rounded-full">
      <motion.div
        className="h-full bg-neutral-800 rounded-full origin-left"
        animate={{ scaleX: value }}
        transition={{ type: "spring", stiffness: 180, damping: 28 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

// ── FillPrompt: animated blank → answer ──────────────────────────────────────
function FillPrompt({ prompt, answer, revealed }: { prompt: string; answer: string; revealed: boolean }) {
  const parts = prompt.split("___");
  if (parts.length < 2)
    return <WhisperTextInstant text={prompt} className="text-3xl font-semibold text-neutral-900 leading-snug" delay={60} duration={0.35} y={6} />;

  return (
    <div className="text-3xl font-semibold text-neutral-900 leading-tight">
      <WhisperTextInstant text={parts[0]} className="text-3xl font-semibold text-neutral-900" delay={60} duration={0.35} y={6} />
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.span
            key="blank"
            className="inline-block mx-1 align-bottom rounded-sm"
            style={{
              height: "1.05em",
              minWidth: 64,
              borderBottom: "2.5px solid #a3a3a3",
              animation: "blankPulse 1.8s ease-in-out infinite",
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          />
        ) : (
          <motion.span
            key="answer"
            className="inline-block mx-1 text-neutral-900 font-bold underline underline-offset-4 decoration-neutral-300"
            initial={{ opacity: 0, scale: 0.85, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {answer}
          </motion.span>
        )}
      </AnimatePresence>
      <WhisperTextInstant text={parts[1]} className="text-3xl font-semibold text-neutral-900" delay={60} duration={0.35} y={6} />
    </div>
  );
}

// ── DialogueLines: renders "Speaker: text\nSpeaker: text" nicely ─────────────
// isPrompt=true → WhisperTextInstant (word slide, first appearance)
// isPrompt=false → BlurredStagger (char blur, answer reveal)
function DialogueLines({ text, isPrompt = false }: { text: string; isPrompt?: boolean }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        const colonIdx = line.indexOf(": ");
        const speaker = colonIdx !== -1 ? line.slice(0, colonIdx) : null;
        const body = colonIdx !== -1 ? line.slice(colonIdx + 2) : line;
        return (
          <div key={i}>
            {speaker && (
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-0.5 font-title">
                {speaker}
              </p>
            )}
            {isPrompt
              ? <WhisperTextInstant text={body} className="text-2xl font-semibold text-neutral-900 leading-snug" delay={60} duration={0.35} y={6} />
              : <BlurredStagger text={body} className="text-2xl font-semibold text-neutral-900 leading-snug" />
            }
          </div>
        );
      })}
    </div>
  );
}

// ── Individual drill card content ─────────────────────────────────────────────
function DrillCardContent({
  card,
  revealed,
  onReveal,
  onComplete,
  getPronunciation,
}: {
  card: DrillCard;
  revealed: boolean;
  onReveal: () => void;
  onComplete: () => void;
  getPronunciation: (text: string) => string | null;
}) {
  const typeLabel: Record<string, string> = {
    read: "Đọc to",
    recall: "Nhớ lại",
    fill: "Điền vào chỗ trống",
    dialogue: "Hội thoại",
  };

  // ── recall / dialogue ──────────────────────────────────────────────────────
  if (card.type === "recall" || card.type === "dialogue") {
    return (
      <div className="flex-1 flex flex-col">
        <p className="text-xs font-semibold tracking-[0.15em] text-neutral-300 uppercase mb-6 font-title">
          {typeLabel[card.type]}
        </p>

        {/* Prompt — dialogue shows Vietnamese hint as the cue */}
        <div className="mb-6">
          {card.type === "dialogue"
            ? <DialogueLines text={card.hint ?? card.prompt} isPrompt />
            : <WhisperTextInstant
                text={card.prompt}
                className="text-2xl font-semibold text-neutral-900 leading-tight"
                delay={70}
                duration={0.35}
                y={6}
              />
          }
        </div>

        {/* Reveal area */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="reveal-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.2 }}
              className="mt-2 self-start"
            >
              <button
                type="button"
                onClick={onReveal}
                className="text-sm font-semibold text-neutral-400 border border-neutral-200 rounded-xl px-4 py-2 active:opacity-60 touch-manipulation"
              >
                Xem đáp án
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              <div className="flex items-start gap-3">
                {card.type === "dialogue"
                  ? <DialogueLines text={card.answerHint ?? card.answer} />
                  : <WhisperTextInstant
                      text={card.answerHint ?? card.answer}
                      className="text-2xl font-semibold text-neutral-900 leading-tight"
                      delay={55}
                      duration={0.32}
                      y={5}
                    />
                }
                <SpeakButton text={card.answer} />
              </div>
              {card.hint && card.type !== "dialogue" && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                >
                  <p className="text-sm text-neutral-400">{card.hint}</p>
                </motion.div>
              )}
              {getPronunciation(card.answer) && (
                <motion.p
                  className="text-xs text-neutral-400 font-mono tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                >
                  /{getPronunciation(card.answer)}/
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── fill ───────────────────────────────────────────────────────────────────
  if (card.type === "fill") {
    return (
      <div className="flex-1 flex flex-col">
        <p className="text-xs font-semibold tracking-[0.15em] text-neutral-300 uppercase mb-6 font-title">
          {typeLabel[card.type]}
        </p>
        <div
          className="flex-1 cursor-pointer"
          onClick={onReveal}
          style={{ touchAction: "manipulation" }}
        >
          <FillPrompt prompt={card.prompt} answer={card.answer} revealed={revealed} />
          {card.hint && (
            <p className="text-sm text-neutral-400 mt-4">{card.hint}</p>
          )}
          {revealed && card.answerHint && (
            <motion.p
              className="text-sm text-neutral-400 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.2 }}
            >
              {card.answerHint}
            </motion.p>
          )}
        </div>
      </div>
    );
  }

  // ── read ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex flex-col">
      <p className="text-xs font-semibold tracking-[0.15em] text-neutral-300 uppercase mb-6 font-title">
        {typeLabel[card.type]}
      </p>
      <WhisperTextInstant
        text={card.prompt}
        className="text-3xl font-semibold text-neutral-900 leading-tight"
        delay={65}
        duration={0.38}
        y={6}
      />
      {card.hint && (
        <motion.p
          className="text-base text-neutral-400 mt-5 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {card.hint}
        </motion.p>
      )}
      {getPronunciation(card.prompt) && (
        <motion.p
          className="text-sm text-neutral-400 font-mono tracking-wide mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          /{getPronunciation(card.prompt)}/
        </motion.p>
      )}
      <SpeechDrill target={card.prompt} onComplete={onComplete} />
    </div>
  );
}

// ── Main DrillScreen ──────────────────────────────────────────────────────────
export default function DrillScreen({
  lesson,
  onExit,
  onComplete,
}: {
  lesson: Lesson;
  onExit: () => void;
  onComplete?: (lessonId: string, speechScore?: number) => Promise<{ currentStreak: number; longestStreak: number } | undefined>;
}) {
  const [index, setIndex] = useState(0);
  const [revealedMap, setRevealedMap] = useState<Record<number, boolean>>({});
  const [streakResult, setStreakResult] = useState<number | null>(null);
  const cards = lesson.drill;
  const done = index >= cards.length;

  // Call onComplete when all drills are done
  useEffect(() => {
    if (done && onComplete) {
      onComplete(lesson.id).then((result) => {
        if (result && result.currentStreak > 0) {
          setStreakResult(result.currentStreak);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const getPronunciation = (text: string) =>
    lesson.phrases.find((p) => p.english === text)?.pronunciation ?? null;

  const handleSlideChange = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const revealCard = (cardIndex: number) => {
    setRevealedMap((prev) => ({ ...prev, [cardIndex]: true }));
  };

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, cards.length));
  }, [cards.length]);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (done) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
        >
          <span className="text-2xl text-neutral-700">✓</span>
        </motion.div>
        <TextReveal word="Bài học hoàn thành! ✅" className="text-2xl font-semibold text-neutral-900 mb-2 block" />
        <p className="text-sm text-neutral-400 mb-2">Bạn đã luyện {cards.length} bài tập.</p>
        {streakResult !== null && streakResult > 0 && (
          <p className="text-sm text-neutral-500 mb-6">🔥 Chuỗi: {streakResult} ngày</p>
        )}
        {streakResult === null && <div className="mb-6" />}

        <div className="w-full max-w-xs space-y-2 mb-10">
          {lesson.phrases.map((phrase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="bg-neutral-50 rounded-xl px-4 py-3 text-left"
            >
              <p className="text-sm font-semibold text-neutral-900">{phrase.english}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{phrase.vietnamese}</p>
            </motion.div>
          ))}
        </div>

        <ActionButton onClick={onExit} className="px-8 text-base">
          Quay lại
        </ActionButton>
      </motion.div>
    );
  }

  const slides = cards.map((card, i) => (
    <div key={card.id} className="flex flex-col min-h-[420px] px-1">
      <DrillCardContent
        card={card}
        revealed={!!revealedMap[i]}
        onReveal={() => revealCard(i)}
        onComplete={goNext}
        getPronunciation={getPronunciation}
      />
      {/* Per-card tap hint */}
      {card.type !== "read" && (
        <div className="mt-6 flex justify-center">
          <p className="text-xs text-neutral-300 tracking-wide">
            {card.type === "recall" || card.type === "dialogue"
              ? !revealedMap[i] ? "chạm để xem đáp án" : "vuốt để tiếp tục →"
              : !revealedMap[i] ? "chạm để xem" : "vuốt để tiếp tục →"}
          </p>
        </div>
      )}
    </div>
  ));

  return (
    <div className="flex flex-col min-h-screen px-5 pt-12 pb-8 select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <ActionButton onClick={onExit} className="flex items-center text-base pr-4 !bg-transparent !text-neutral-400 font-medium">
          ← Thoát
        </ActionButton>
        <span className="text-sm text-neutral-400">{index + 1} / {cards.length}</span>
      </div>

      {/* Spring progress bar */}
      <div className="mb-10">
        <ProgressBar value={index / cards.length} />
      </div>

      {/* Motion Carousel — all drill cards */}
      <div className="flex-1 flex flex-col">
        <MotionCarousel
          slides={slides}
          selectedIndex={index}
          onSlideChange={handleSlideChange}
          options={{ align: "center", containScroll: "trimSnaps" }}
        />
      </div>
    </div>
  );
}

