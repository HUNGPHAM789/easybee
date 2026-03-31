"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { modules } from "@/lib/content/index";
import LessonDetail from "@/components/LessonDetail";
import DrillScreen from "@/components/DrillScreen";
import NameSetup from "@/components/NameSetup";
import { TextReveal } from "@/components/ui/text-reveal-animation";
import { useAuth } from "@/components/AuthProvider";
import { useProgress } from "@/lib/hooks/useProgress";
import { useStreak } from "@/lib/hooks/useStreak";
import VoiceTeacher from "@/components/VoiceTeacher";
import FloatingHelper from "@/components/FloatingHelper";

import type { Lesson } from "@/lib/content/index";

type Tab = "lessons" | "teacher";

export default function Home() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { completedLessons, completeLesson, isCompleted } = useProgress();
  const { currentStreak, refresh: refreshStreak } = useStreak();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [drillLesson, setDrillLesson] = useState<Lesson | null>(null);
  const [mounted, setMounted] = useState(false);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("lessons");
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("easybee_name");
      if (saved) setStudentName(saved);
    } catch {
      // Private browsing or storage unavailable
    }
  }, []);

  // Load recommended lessons
  useEffect(() => {
    // From user_metadata or localStorage
    const metaRecs = user?.user_metadata?.recommended_lessons;
    if (Array.isArray(metaRecs) && metaRecs.length > 0) {
      setRecommendedIds(metaRecs);
      return;
    }
    try {
      const stored = localStorage.getItem("easybee_recommended");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setRecommendedIds(parsed);
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Resolve recommended lesson objects
  const allLessonsFlat = useMemo(
    () => modules.flatMap((m) => m.classes.flatMap((c) => c.lessons)),
    []
  );
  const recommendedLessons = useMemo(
    () =>
      recommendedIds
        .map((id) => allLessonsFlat.find((l) => l.id === id))
        .filter((l): l is Lesson => !!l),
    [recommendedIds, allLessonsFlat]
  );

  // Auto-expand first module
  useEffect(() => {
    if (modules.length > 0 && !expandedModule) {
      setExpandedModule(modules[0].id);
    }
  }, [expandedModule]);

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

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Filter modules/classes/lessons by query
  const query = searchQuery.trim().toLowerCase();
  const visibleModules = useMemo(() => {
    if (!query) return modules;
    return modules
      .map((mod) => ({
        ...mod,
        classes: mod.classes
          .map((cls) => ({
            ...cls,
            lessons: cls.lessons.filter(
              (l) =>
                l.id.toLowerCase().includes(query) ||
                l.title.toLowerCase().includes(query) ||
                l.titleVi.toLowerCase().includes(query) ||
                cls.title.toLowerCase().includes(query) ||
                cls.titleVi.toLowerCase().includes(query) ||
                mod.title.toLowerCase().includes(query) ||
                mod.titleVi.toLowerCase().includes(query)
            ),
          }))
          .filter((cls) => cls.lessons.length > 0),
      }))
      .filter((mod) => mod.classes.length > 0);
  }, [query]);

  // Admin check
  const isAdmin = user?.email === "henrypham0310@gmail.com";

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
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <motion.main
        className="px-5 pt-12 pb-24 flex-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {activeTab === "lessons" ? (
          <>
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
                  <TextReveal word={`Lớp học của ${studentName}`} />
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  {isAdmin && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={signOut}
                    className="text-xs text-neutral-300 active:opacity-60 touch-manipulation"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
              {currentStreak > 0 && (
                <p className="text-sm text-neutral-500 mt-1">
                  🔥 {currentStreak} ngày liên tục
                </p>
              )}

              {/* Search — always visible */}
              <div className="mt-4 relative" style={{ zIndex: 30 }}>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <circle cx="8.5" cy="8.5" r="5.5" />
                    <line x1="13" y1="13" x2="18" y2="18" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Tìm bài học..."
                    className="w-full h-11 pl-10 pr-8 text-base text-neutral-900 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:border-neutral-300 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 active:opacity-60 touch-manipulation"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 6.586L4.707 3.293a1 1 0 00-1.414 1.414L6.586 8l-3.293 3.293a1 1 0 101.414 1.414L8 9.414l3.293 3.293a1 1 0 001.414-1.414L9.414 8l3.293-3.293a1 1 0 00-1.414-1.414L8 6.586z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Search active hint */}
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
                    onClick={clearSearch}
                  >
                    Xoá
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recommended lessons */}
            {recommendedLessons.length > 0 && !query && (
              <div className="mb-6">
                <h2 className="text-base font-semibold text-neutral-900 font-title mb-3">
                  Bài học gợi ý cho bạn
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
                  {recommendedLessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => setExpandedLesson(lesson.id)}
                      className="shrink-0 w-44 bg-neutral-50 rounded-2xl p-4 text-left active:bg-neutral-100 transition-colors touch-manipulation border border-neutral-100"
                    >
                      <span className="text-xs text-neutral-400">{lesson.id}</span>
                      {lesson.level && (
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-500 ml-2">
                          {lesson.level}
                        </span>
                      )}
                      <p className="text-sm font-medium text-neutral-800 mt-1 line-clamp-2">
                        {lesson.titleVi}
                      </p>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{lesson.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Module → Class → Lesson tree */}
            <div className="space-y-1">
              {visibleModules.length === 0 && (
                <p className="text-sm text-neutral-400 py-6 text-center">Không tìm thấy bài học nào.</p>
              )}
              {visibleModules.map((mod) => {
                const isModExpanded = query ? true : expandedModule === mod.id;
                const totalLessons = mod.classes.reduce((s, c) => s + c.lessons.length, 0);
                const completedCount = mod.classes.reduce(
                  (s, c) => s + c.lessons.filter((l) => completedLessons.has(l.id)).length,
                  0
                );

                return (
                  <div key={mod.id}>
                    {/* Module row */}
                    <button
                      type="button"
                      className="w-full text-left min-h-[56px] active:opacity-60 transition-opacity"
                      onClick={() =>
                        !query && setExpandedModule((prev) => (prev === mod.id ? null : mod.id))
                      }
                    >
                      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-neutral-900 font-title">
                              {mod.titleVi}
                            </p>
                            <span className="text-xs text-neutral-400">
                              {completedCount}/{totalLessons}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-400 mt-0.5">{mod.title}</p>
                        </div>
                        {!query && (
                          <motion.span
                            className="text-neutral-300 text-xl inline-block"
                            animate={{ rotate: isModExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                          >
                            ›
                          </motion.span>
                        )}
                      </div>
                    </button>

                    {/* Classes inside module */}
                    <AnimatePresence initial={false}>
                      {isModExpanded && (
                        <motion.div
                          key="classes"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="ml-3 mt-1 mb-2">
                            {mod.classes.map((cls) => {
                              const isClassExpanded = query ? true : expandedClass === cls.id;

                              return (
                                <div key={cls.id}>
                                  {/* Class row */}
                                  <button
                                    type="button"
                                    className="w-full text-left min-h-[48px] active:opacity-60 transition-opacity"
                                    onClick={() =>
                                      !query && setExpandedClass((prev) => (prev === cls.id ? null : cls.id))
                                    }
                                  >
                                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <p className="text-base font-medium text-neutral-800">
                                            {cls.titleVi}
                                          </p>
                                          <span className="text-xs text-neutral-400">
                                            {cls.lessons.filter((l) => completedLessons.has(l.id)).length}/{cls.lessons.length}
                                          </span>
                                        </div>
                                        <p className="text-sm text-neutral-400 mt-0.5">{cls.title}</p>
                                      </div>
                                      {!query && (
                                        <motion.span
                                          className="text-neutral-300 text-lg inline-block"
                                          animate={{ rotate: isClassExpanded ? 90 : 0 }}
                                          transition={{ duration: 0.2, ease: "easeInOut" }}
                                        >
                                          ›
                                        </motion.span>
                                      )}
                                    </div>
                                  </button>

                                  {/* Lessons inside class */}
                                  <AnimatePresence initial={false}>
                                    {isClassExpanded && (
                                      <motion.div
                                        key="lessons"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ overflow: "hidden" }}
                                      >
                                        <div className="ml-4 mt-1 mb-2">
                                          {cls.lessons.map((lesson, i) => (
                                            <motion.div
                                              key={lesson.id}
                                              initial={{ opacity: 0, x: -8 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: i * 0.04, duration: 0.2, ease: "easeOut" }}
                                            >
                                              <button
                                                type="button"
                                                className="w-full text-left min-h-[48px] active:opacity-60 transition-opacity"
                                                onClick={() =>
                                                  setExpandedLesson((prev) =>
                                                    prev === lesson.id ? null : lesson.id
                                                  )
                                                }
                                              >
                                                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                                                  <div>
                                                    <div className="flex items-center gap-2">
                                                      <span className="text-xs text-neutral-400 shrink-0">{lesson.id}</span>
                                                      {isCompleted(lesson.id) && (
                                                        <span className="text-xs text-green-500">✅</span>
                                                      )}
                                                      <p className="text-base font-medium text-neutral-800">
                                                        {lesson.titleVi}
                                                      </p>
                                                      {lesson.level && (
                                                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-500 font-title">
                                                          {lesson.level}
                                                        </span>
                                                      )}
                                                    </div>
                                                    <p className="text-sm text-neutral-400 mt-0.5">
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
                                                      isAdmin={isAdmin}
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Voice Teacher tab */
          <VoiceTeacher />
        )}
      </motion.main>

      {/* Floating Helper */}
      {activeTab === "lessons" && <FloatingHelper />}

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 z-40">
        <div className="max-w-[390px] mx-auto flex">
          <button
            type="button"
            onClick={() => setActiveTab("lessons")}
            className={`flex-1 flex flex-col items-center gap-1 py-3 touch-manipulation transition-colors ${
              activeTab === "lessons" ? "text-neutral-900" : "text-neutral-400"
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span className="text-xs font-medium">Bài Học</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("teacher")}
            className={`flex-1 flex flex-col items-center gap-1 py-3 touch-manipulation transition-colors ${
              activeTab === "teacher" ? "text-neutral-900" : "text-neutral-400"
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="2" width="6" height="11" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
            <span className="text-xs font-medium">Thầy giáo EasyBee</span>
          </button>
        </div>
      </div>
    </div>
  );
}
