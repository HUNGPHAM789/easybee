"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { modules } from "@/lib/content/index";
import LessonDetail from "@/components/LessonDetail";
import DrillScreen from "@/components/DrillScreen";
import NameSetup from "@/components/NameSetup";
import SearchBar from "@/components/ui/search-bar";
import { TextReveal } from "@/components/ui/text-reveal-animation";
import { useAuth } from "@/components/AuthProvider";
import { useProgress } from "@/lib/hooks/useProgress";
import { useStreak } from "@/lib/hooks/useStreak";

import type { Lesson, Class, Module } from "@/lib/content/index";

type UserProfile = {
  job?: "nail-salon" | "permanent-makeup" | "other";
  level?: "beginner" | "intermediate";
  need?: "customers" | "money" | "healthcare" | "daily";
};

function getModulePriority(mod: Module, profile: UserProfile): number {
  const { job, need } = profile;

  // Job-based primary sort
  if (job === "nail-salon" && mod.id === "nail-salon") return 0;
  if (job === "permanent-makeup" && mod.id === "permanent-makeup") return 0;
  if (job === "other" && ["shopping-errands", "healthcare", "community"].includes(mod.id)) return 0;

  // Need-based secondary sort
  if (need === "healthcare" && mod.id === "healthcare") return 1;
  if (need === "daily" && ["shopping-errands", "community"].includes(mod.id)) return 1;
  if (need === "money" && mod.id === "nail-salon") return 1; // money/tips classes inside nail salon
  if (need === "customers" && mod.id === "nail-salon") return 1;

  return 5;
}

function getClassPriority(cls: Class, profile: UserProfile): number {
  const { need } = profile;
  const id = cls.id.toLowerCase();

  if (need === "customers" && (id.includes("communication") || id.includes("relationship"))) return 0;
  if (need === "money" && (id.includes("money") || id.includes("tip") || id.includes("pricing"))) return 0;

  return 5;
}

function sortLessonsByLevel(lessons: Lesson[], profile: UserProfile): Lesson[] {
  if (!profile.level) return lessons;
  const beginnerFirst = profile.level === "beginner";

  return [...lessons].sort((a, b) => {
    const levelOrder: Record<string, number> = beginnerFirst
      ? { A1: 0, A2: 1, B1: 2, B2: 3 }
      : { B1: 0, B2: 1, A1: 2, A2: 3 };
    const aPri = levelOrder[a.level ?? "A1"] ?? 4;
    const bPri = levelOrder[b.level ?? "A1"] ?? 4;
    return aPri - bPri;
  });
}

function getSortedClasses(profile: UserProfile): Class[] {
  const sorted = [...modules].sort(
    (a, b) => getModulePriority(a, profile) - getModulePriority(b, profile)
  );

  return sorted.flatMap((mod) => {
    const sortedClasses = [...mod.classes].sort(
      (a, b) => getClassPriority(a, profile) - getClassPriority(b, profile)
    );
    return sortedClasses.map((cls) => ({
      ...cls,
      lessons: sortLessonsByLevel(cls.lessons, profile),
    }));
  });
}

export default function Home() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { completedLessons, completeLesson, isCompleted } = useProgress();
  const { currentStreak, refresh: refreshStreak } = useStreak();
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [drillLesson, setDrillLesson] = useState<Lesson | null>(null);
  const [mounted, setMounted] = useState(false);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState<UserProfile>({});

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("easybee_name");
      if (saved) setStudentName(saved);
    } catch {
      // Private browsing or storage unavailable
    }
    try {
      const savedProfile = localStorage.getItem("easybee_profile");
      if (savedProfile) setProfile(JSON.parse(savedProfile));
    } catch {
      // ignore
    }
  }, []);

  // Read profile from user metadata when available
  useEffect(() => {
    if (user?.user_metadata) {
      const meta = user.user_metadata;
      if (meta.job || meta.level || meta.need) {
        const p: UserProfile = {
          job: meta.job,
          level: meta.level,
          need: meta.need,
        };
        setProfile(p);
      }
    }
  }, [user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  // Redirect to onboarding if not onboarded
  useEffect(() => {
    if (!authLoading && user && !user.user_metadata?.onboarded) {
      router.push("/onboarding");
    }
  }, [authLoading, user, router]);

  // Compute sorted classes from profile
  const sortedClasses = useMemo(() => {
    const cls = getSortedClasses(profile);
    if (cls.length > 0 && !expandedClass) setExpandedClass(cls[0].id);
    return cls;
  }, [profile]);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  // Filter classes/lessons by query
  const query = searchQuery.trim().toLowerCase();
  const visibleClasses = useMemo(() =>
    query
      ? sortedClasses
          .map((cls) => ({
            ...cls,
            lessons: cls.lessons.filter(
              (l) =>
                l.id.toLowerCase().includes(query) ||
                l.title.toLowerCase().includes(query) ||
                l.titleVi.toLowerCase().includes(query) ||
                cls.title.toLowerCase().includes(query) ||
                cls.titleVi.toLowerCase().includes(query)
            ),
          }))
          .filter((cls) => cls.lessons.length > 0)
      : sortedClasses,
    [query, sortedClasses]
  );

  // When searching, auto-expand all matching classes
  const effectiveExpandedClass = query
    ? visibleClasses[0]?.id ?? null
    : expandedClass;

  if (drillLesson) {
    return (
      <DrillScreen
        lesson={drillLesson}
        onExit={() => {
          setDrillLesson(null);
          refreshStreak();
        }}
        onComplete={completeLesson}
      />
    );
  }

  if (!mounted || authLoading) return (
    <main className="px-5 pt-12 pb-10 flex items-center justify-center min-h-screen">
      <div className="w-6 h-6 border-2 border-neutral-200 border-t-neutral-600 rounded-full animate-spin" />
    </main>
  );

  if (!user) return null;

  if (!studentName) return <NameSetup onSave={setStudentName} />;

  return (
    <motion.main
      className="px-5 pt-12 pb-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
            <TextReveal word={`Lớp học của ${studentName}`} />
          </h1>
          <button
            type="button"
            onClick={signOut}
            className="text-xs text-neutral-300 mt-2 active:opacity-60 touch-manipulation"
          >
            Đăng xuất
          </button>
        </div>
        {currentStreak > 0 && (
          <p className="text-sm text-neutral-500 mt-1">
            🔥 {currentStreak} ngày liên tục
          </p>
        )}
        <div className="mt-4" style={{ position: "relative", zIndex: 30 }}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Search active — clear hint */}
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mb-4 flex items-center gap-2"
          >
            <p className="text-sm text-neutral-400">
              Kết quả cho &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              className="text-xs text-neutral-400 underline underline-offset-2 active:opacity-60 touch-manipulation"
              onClick={() => setSearchQuery("")}
            >
              Xoá
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Classes */}
      <div className="space-y-1">
        {visibleClasses.length === 0 && (
          <p className="text-sm text-neutral-400 py-6 text-center">Không tìm thấy bài học nào.</p>
        )}
        {visibleClasses.map((cls) => {
          const isExpanded = query
            ? true
            : expandedClass === cls.id;

          return (
            <div key={cls.id}>
              {/* Class row */}
              <button
                type="button"
                className="w-full text-left min-h-[52px] active:opacity-60 transition-opacity"
                onClick={() =>
                  !query && setExpandedClass((prev) => (prev === cls.id ? null : cls.id))
                }
              >
                <div className="flex items-center justify-between py-4 border-b border-neutral-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-medium text-neutral-900">{cls.titleVi}</p>
                      <span className="text-xs text-neutral-400">
                        {cls.lessons.filter((l) => completedLessons.has(l.id)).length}/{cls.lessons.length}
                      </span>
                    </div>
                    <p className="text-base text-neutral-400 mt-0.5">{cls.title}</p>
                  </div>
                  {!query && (
                    <motion.span
                      className="text-neutral-300 text-lg inline-block"
                      animate={{ rotate: expandedClass === cls.id ? 90 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      ›
                    </motion.span>
                  )}
                </div>
              </button>

              {/* Lessons */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="lessons"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="mt-1 mb-2">
                      {cls.lessons.map((lesson, i) => (
                        <motion.div
                          key={lesson.id}
                          className="ml-4"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.22, ease: "easeOut" }}
                        >
                          <button
                            type="button"
                            className="w-full text-left min-h-[52px] active:opacity-60 transition-opacity"
                            onClick={() =>
                              setExpandedLesson((prev) =>
                                prev === lesson.id ? null : lesson.id
                              )
                            }
                          >
                            <div className="flex items-center justify-between py-4 border-b border-neutral-100">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-neutral-400 shrink-0">{lesson.id}</span>
                                  {isCompleted(lesson.id) && (
                                    <span className="text-xs text-green-500">✅</span>
                                  )}
                                  <p className="text-lg font-medium text-neutral-800">
                                    {lesson.titleVi}
                                  </p>
                                  {lesson.level && (
                                    <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-500 font-title">
                                      {lesson.level}
                                    </span>
                                  )}
                                </div>
                                <p className="text-base text-neutral-400 mt-0.5">
                                  {lesson.phrases.length} câu &bull;{" "}
                                  {lesson.drill.length} bài tập
                                </p>
                              </div>
                              <motion.span
                                className="text-neutral-300 text-base inline-block"
                                animate={{ rotate: expandedLesson === lesson.id ? 90 : 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                              >
                                ›
                              </motion.span>
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {expandedLesson === lesson.id && (
                              <motion.div
                                key="detail"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                                style={{ overflow: "hidden" }}
                              >
                                <LessonDetail
                                  lesson={lesson}
                                  onStartDrill={() => setDrillLesson(lesson)}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.main>
  );
}

