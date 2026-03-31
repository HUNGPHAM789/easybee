"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export function useProgress() {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCompletedLessons(new Set());
      setLoading(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("user_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) {
          setCompletedLessons(new Set(data.map((r) => r.lesson_id)));
        }
        setLoading(false);
      });
  }, [user]);

  const completeLesson = useCallback(
    async (lessonId: string, speechScore?: number) => {
      if (!user) return;
      const supabase = createClient();

      // Upsert progress
      await supabase.from("user_progress").upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          completed_at: new Date().toISOString(),
          speech_score: speechScore ?? null,
          attempts: 1,
        },
        { onConflict: "user_id,lesson_id" }
      );

      // Update streak
      const today = new Date().toISOString().split("T")[0];
      const { data: streak } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", user.id)
        .single();

      let currentStreak = 1;
      let longestStreak = 1;

      if (streak) {
        const lastDate = streak.last_practice_date;
        if (lastDate === today) {
          // Already practiced today — keep current values
          currentStreak = streak.current_streak;
          longestStreak = streak.longest_streak;
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0];

          if (lastDate === yesterdayStr) {
            currentStreak = streak.current_streak + 1;
          } else {
            currentStreak = 1;
          }
          longestStreak = Math.max(currentStreak, streak.longest_streak);
        }
      }

      await supabase.from("user_streaks").upsert(
        {
          user_id: user.id,
          current_streak: currentStreak,
          longest_streak: longestStreak,
          last_practice_date: today,
        },
        { onConflict: "user_id" }
      );

      setCompletedLessons((prev) => new Set(prev).add(lessonId));

      return { currentStreak, longestStreak };
    },
    [user]
  );

  const isCompleted = useCallback(
    (lessonId: string) => completedLessons.has(lessonId),
    [completedLessons]
  );

  return { completedLessons, completeLesson, isCompleted, loading };
}
