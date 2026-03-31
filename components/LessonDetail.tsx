"use client";

import { motion } from "framer-motion";
import type { Lesson } from "@/lib/content/index";
import SpeakButton from "./SpeakButton";
import ActionButton from "./ActionButton";
import WhisperText from "./ui/whisper-text";

export default function LessonDetail({
  lesson,
  onStartDrill,
}: {
  lesson: Lesson;
  onStartDrill: () => void;
}) {
  return (
    <div className="py-5 pr-1">
      <p className="text-sm text-neutral-500 leading-relaxed mb-6">
        {lesson.context}
      </p>

      <div className="space-y-3 mb-8">
        {lesson.phrases.map((phrase, i) => (
          <motion.div
            key={i}
            className="bg-neutral-50 rounded-2xl px-5 py-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.22, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <p className="text-base font-semibold text-neutral-900">
                <WhisperText
                  text={phrase.english}
                  delay={70}
                  duration={0.35}
                  y={5}
                  triggerStart="top 95%"
                />
              </p>
              <SpeakButton text={phrase.english} />
            </div>
            <motion.p
              className="text-sm text-neutral-500 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 + 0.25, duration: 0.3 }}
            >
              {phrase.vietnamese}
            </motion.p>
            <motion.p
              className="text-xs text-neutral-400 font-mono tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 + 0.35, duration: 0.3 }}
            >
              /{phrase.pronunciation}/
            </motion.p>
          </motion.div>
        ))}
      </div>

      <ActionButton onClick={onStartDrill} className="w-full text-base min-h-[52px] py-4">
        Bắt đầu luyện tập
      </ActionButton>
    </div>
  );
}
