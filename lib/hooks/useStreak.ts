"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export function useStreak() {
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCurrentStreak(0);
      setLongestStreak(0);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("user_streaks")
      .select("current_streak, longest_streak")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setCurrentStreak(data.current_streak);
          setLongestStreak(data.longest_streak);
        }
        setLoading(false);
      });
  }, [user]);

  const refresh = async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("user_streaks")
      .select("current_streak, longest_streak")
      .eq("user_id", user.id)
      .single();
    if (data) {
      setCurrentStreak(data.current_streak);
      setLongestStreak(data.longest_streak);
    }
  };

  return { currentStreak, longestStreak, loading, refresh };
}
