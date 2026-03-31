"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import ActionButton from "@/components/ActionButton";

const AGE_RANGES = ["20-30", "30-40", "40-50", "50+"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [age, setAge] = useState<string>("");
  const [job, setJob] = useState("");
  const [goal, setGoal] = useState("");
  const [saving, setSaving] = useState(false);

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

  const canSubmit = gender && age && job.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSaving(true);

    const metadata = { gender, age, job: job.trim(), goal: goal.trim(), onboarded: true };

    try {
      const supabase = createClient();
      await supabase.auth.updateUser({ data: metadata });
    } catch {
      // Supabase update failed — localStorage fallback still works
    }

    try {
      localStorage.setItem("easybee_profile", JSON.stringify(metadata));
    } catch {
      // Storage unavailable
    }

    router.replace("/");
  };

  if (authLoading || !user) {
    return (
      <main className="px-5 pt-12 pb-10 flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-neutral-200 border-t-neutral-600 rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="px-5 pt-14 pb-10 min-h-screen flex flex-col">
      <h1 className="text-2xl font-semibold text-neutral-900 font-title mb-8">
        Cho EasyBee bi&#7871;t v&#7873; b&#7841;n
      </h1>

      {/* Gender */}
      <div className="mb-6">
        <label className="text-sm font-medium text-neutral-600 mb-2 block">
          Gi&#7899;i t&iacute;nh
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setGender("male")}
            className={`flex-1 py-3 rounded-2xl border text-base font-medium transition-colors touch-manipulation ${
              gender === "male"
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-neutral-50 text-neutral-700 border-neutral-100 active:bg-neutral-100"
            }`}
          >
            Nam
          </button>
          <button
            type="button"
            onClick={() => setGender("female")}
            className={`flex-1 py-3 rounded-2xl border text-base font-medium transition-colors touch-manipulation ${
              gender === "female"
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-neutral-50 text-neutral-700 border-neutral-100 active:bg-neutral-100"
            }`}
          >
            N&#7919;
          </button>
        </div>
      </div>

      {/* Age */}
      <div className="mb-6">
        <label className="text-sm font-medium text-neutral-600 mb-2 block">
          Tu&#7893;i
        </label>
        <div className="flex gap-2">
          {AGE_RANGES.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setAge(range)}
              className={`flex-1 py-3 rounded-2xl border text-sm font-medium transition-colors touch-manipulation ${
                age === range
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-neutral-50 text-neutral-700 border-neutral-100 active:bg-neutral-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Job */}
      <div className="mb-6">
        <label className="text-sm font-medium text-neutral-600 mb-2 block">
          Ngh&#7873; nghi&#7879;p
        </label>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="VD: th&#7907; nail, phun x&#259;m, n&#7897;i tr&#7907;..."
          className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-100 text-base text-neutral-900 placeholder:text-neutral-300 outline-none focus:border-neutral-300 transition-colors"
        />
      </div>

      {/* Goal */}
      <div className="mb-8">
        <label className="text-sm font-medium text-neutral-600 mb-2 block">
          B&#7841;n mu&#7889;n n&oacute;i ti&#7871;ng Anh t&#7889;t h&#417;n v&#7873; g&igrave;?
        </label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="VD: n&oacute;i chuy&#7879;n v&#7899;i kh&aacute;ch, &#273;i b&aacute;c s&#297;, mua s&#7855;m..."
          className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-100 text-base text-neutral-900 placeholder:text-neutral-300 outline-none focus:border-neutral-300 transition-colors"
        />
      </div>

      {/* Submit */}
      <ActionButton
        onClick={handleSubmit}
        disabled={!canSubmit || saving}
        className="w-full text-base min-h-[52px] py-4"
      >
        {saving ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            &#272;ang l&#432;u...
          </span>
        ) : (
          "B\u1eaft \u0111\u1ea7u h\u1ecdc"
        )}
      </ActionButton>
    </main>
  );
}
