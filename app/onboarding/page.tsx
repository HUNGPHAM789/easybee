"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";

type Job = "nail-salon" | "permanent-makeup" | "other";
type Level = "beginner" | "intermediate";
type Need = "customers" | "money" | "healthcare" | "daily";

const STEPS = [
  {
    title: "Ban lam nghe gi?",
    titleDisplay: "B\u1ea1n l\u00e0m ngh\u1ec1 g\u00ec?",
    options: [
      { emoji: "\ud83d\udc85", label: "Ti\u1ec7m Nail", value: "nail-salon" },
      { emoji: "\ud83d\udc84", label: "Phun X\u0103m", value: "permanent-makeup" },
      { emoji: "\ud83c\udfe2", label: "Ngh\u1ec1 kh\u00e1c", value: "other" },
    ],
  },
  {
    title: "Trinh do tieng Anh cua ban?",
    titleDisplay: "Tr\u00ecnh \u0111\u1ed9 ti\u1ebfng Anh c\u1ee7a b\u1ea1n?",
    options: [
      { emoji: "\ud83d\ude30", label: "M\u1edbi b\u1eaft \u0111\u1ea7u", value: "beginner" },
      { emoji: "\ud83d\ude42", label: "Bi\u1ebft ch\u00fat ch\u00fat r\u1ed3i", value: "intermediate" },
    ],
  },
  {
    title: "Ban can gi nhat?",
    titleDisplay: "B\u1ea1n c\u1ea7n g\u00ec nh\u1ea5t?",
    options: [
      { emoji: "\ud83d\udde3\ufe0f", label: "N\u00f3i chuy\u1ec7n v\u1edbi kh\u00e1ch", value: "customers" },
      { emoji: "\ud83d\udcb0", label: "Ti\u1ec1n, tip, thanh to\u00e1n", value: "money" },
      { emoji: "\ud83c\udfe5", label: "\u0110i b\u00e1c s\u0129, hi\u1ec7u thu\u1ed1c", value: "healthcare" },
      { emoji: "\ud83c\udfe0", label: "Cu\u1ed9c s\u1ed1ng h\u00e0ng ng\u00e0y", value: "daily" },
    ],
  },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ job?: Job; level?: Level; need?: Need }>({});
  const [saving, setSaving] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user?.user_metadata?.onboarded) {
      router.replace("/");
    }
  }, [user, router]);

  const handleSelect = async (value: string) => {
    if (step === 0) {
      setAnswers((prev) => ({ ...prev, job: value as Job }));
      setDirection(1);
      setStep(1);
    } else if (step === 1) {
      setAnswers((prev) => ({ ...prev, level: value as Level }));
      setDirection(1);
      setStep(2);
    } else if (step === 2) {
      const profile = { ...answers, need: value as Need };
      setSaving(true);

      try {
        const supabase = createClient();
        await supabase.auth.updateUser({
          data: { job: profile.job, level: profile.level, need: profile.need, onboarded: true },
        });
      } catch {
        // Supabase update failed — localStorage fallback still works
      }

      try {
        localStorage.setItem("easybee_profile", JSON.stringify(profile));
      } catch {
        // Storage unavailable
      }

      router.replace("/");
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  if (authLoading || !user) {
    return (
      <main className="px-5 pt-12 pb-10 flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-neutral-200 border-t-neutral-600 rounded-full animate-spin" />
      </main>
    );
  }

  const currentStep = STEPS[step];

  return (
    <main className="px-5 pt-14 pb-10 min-h-screen flex flex-col">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-neutral-800" : "bg-neutral-200"
            }`}
          />
        ))}
      </div>

      {/* Back button */}
      <div className="h-10 flex items-center">
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="text-sm text-neutral-400 active:opacity-60 touch-manipulation"
          >
            &larr; Quay l\u1ea1i
          </button>
        )}
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-2xl font-semibold text-neutral-900 text-center mb-8 font-title">
              {currentStep.titleDisplay}
            </h1>

            <div className="space-y-3">
              {currentStep.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={saving}
                  onClick={() => handleSelect(opt.value)}
                  className="w-full flex items-center gap-4 px-5 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 active:bg-neutral-100 transition-colors touch-manipulation min-h-[64px] disabled:opacity-50"
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <span className="text-lg font-medium text-neutral-800">{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {saving && (
        <div className="flex justify-center py-4">
          <div className="w-5 h-5 border-2 border-neutral-200 border-t-neutral-600 rounded-full animate-spin" />
        </div>
      )}
    </main>
  );
}
