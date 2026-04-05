import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronDown, Flame, BookOpen, TrendingUp, Check, Lock, Circle } from 'lucide-react';
import { CAREER_PATHS, type CareerPath } from '../lib/career-paths';
import { loadPhraseBank, getProfile, getSessions, type BankedPhrase, type SessionRecord } from '../lib/profile';
import { VOICES } from './VoicePicker';
import { getMainCurriculum, getActiveSideQuest, getLessonProgress, type Curriculum, type CurriculumModule, type CurriculumLesson } from '../lib/curriculum-path';

const ease = [0.25, 0.1, 0.25, 1] as const;
const spring = { type: 'spring' as const, damping: 25, stiffness: 200 };

// ── Helpers ──────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}p ${s}s` : `${m} phút`;
}

function getVoiceLabel(voiceId?: string): { emoji: string; name: string } | null {
  if (!voiceId) return null;
  const v = VOICES.find(v => v.id === voiceId);
  return v ? { emoji: v.emoji, name: v.name } : null;
}

function groupSessionsByDate(sessions: SessionRecord[]): { label: string; sessions: SessionRecord[] }[] {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const groups = new Map<string, SessionRecord[]>();
  // Reverse so newest first
  for (let i = sessions.length - 1; i >= 0; i--) {
    const s = sessions[i];
    const date = s.date;
    if (!groups.has(date)) groups.set(date, []);
    groups.get(date)!.push(s);
  }

  return Array.from(groups.entries()).map(([date, items]) => {
    let label: string;
    if (date === today) label = 'Hôm nay';
    else if (date === yesterday) label = 'Hôm qua';
    else {
      const d = new Date(date + 'T00:00:00');
      label = d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' });
    }
    return { label, sessions: items };
  });
}

// ── Components ───────────────────────────────────────────────

function ProgressBar({ value, max, className = '' }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-2 rounded-xl bg-surface overflow-hidden">
        <motion.div
          className="h-full rounded-xl bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease }}
        />
      </div>
      <span className="text-[12px] text-text-secondary font-semibold min-w-[32px] text-right">{pct}%</span>
    </div>
  );
}

function StatCard({ icon, value, label, delay }: { icon: React.ReactNode; value: string | number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay }}
      className="flex-1 py-4 px-3 rounded-xl bg-[#f2f2f2] border border-border text-center"
    >
      <div className="flex justify-center mb-1.5 text-text-secondary">{icon}</div>
      <p className="text-[20px] font-semibold text-text leading-none">{value}</p>
      <p className="text-[11px] text-text-secondary mt-1">{label}</p>
    </motion.div>
  );
}

function CareerCard({
  path,
  phrases,
  isPrimary,
  delay,
}: {
  path: CareerPath;
  phrases: BankedPhrase[];
  isPrimary: boolean;
  delay: number;
}) {
  const count = phrases.filter(p => p.careerPathId === path.id).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay }}
      className={`p-5 rounded-xl border ${isPrimary ? 'border-accent' : 'border-border'}`}
      style={{ background: '#f2f2f2', opacity: isPrimary ? 1 : 0.7 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{path.emoji}</span>
          <div>
            <p className={`text-[14px] font-semibold text-text ${isPrimary ? '' : 'opacity-70'}`}>
              {path.titleEn}
            </p>
            <p className="text-[12px] text-text-secondary">{path.title}</p>
          </div>
        </div>
        <span className="text-[13px] text-text-secondary font-semibold">
          {count}/{path.targetPhraseCount}
        </span>
      </div>

      <ProgressBar value={count} max={path.targetPhraseCount} className="mb-3" />

      {isPrimary && (
        <div className="space-y-1.5 mt-3">
          {path.categories.map(cat => {
            const catCount = phrases.filter(
              p => p.careerPathId === path.id && p.categoryId === cat.id
            ).length;
            return (
              <div key={cat.id} className="flex items-center gap-2">
                <span className="text-[12px] text-text-secondary min-w-[100px] truncate">{cat.titleEn}</span>
                <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.targetCount > 0 ? Math.min(100, (catCount / cat.targetCount) * 100) : 0}%` }}
                    transition={{ duration: 0.5, delay: delay + 0.2, ease }}
                  />
                </div>
                <span className="text-[12px] text-text-secondary min-w-[28px] text-right">{catCount}/{cat.targetCount}</span>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

function SessionItem({ session, delay }: { session: SessionRecord; delay: number }) {
  const [expanded, setExpanded] = useState(false);
  const voice = getVoiceLabel(session.voice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay }}
    >
      <button
        onClick={() => setExpanded(prev => !prev)}
        className="w-full flex items-center gap-3 py-3 text-left"
      >
        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-text font-medium truncate">{session.topic}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[12px] text-text-secondary">{session.phrases.length} cụm từ</span>
            {session.durationSeconds && (
              <span className="text-[12px] text-text-secondary">· {formatDuration(session.durationSeconds)}</span>
            )}
            {voice && (
              <span className="text-[12px] text-text-secondary">· {voice.emoji} {voice.name}</span>
            )}
            {session.mode === 'ielts' && (
              <span className="text-[11px] text-text-secondary bg-[#e8e8e8] px-1.5 py-0.5 rounded">IELTS</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-text-secondary font-semibold">{session.cefrAssessment}</span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-1 space-y-1.5">
              {session.phrases.map((p, i) => (
                <div key={i} className="flex gap-2 items-baseline">
                  <span className="text-[11px] text-text-muted font-semibold min-w-[14px]">{i + 1}</span>
                  <div>
                    <p className="text-[13px] text-text">{p.english}</p>
                    <p className="text-[12px] text-text-secondary">{p.vietnamese}</p>
                  </div>
                </div>
              ))}
              {session.summary && (
                <p className="text-[12px] text-text-secondary italic mt-2 pt-2 border-t border-border">
                  {session.summary}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Curriculum Tree ───────────────────────────────────────

function LessonStatusIcon({ status }: { status: CurriculumLesson['status'] }) {
  if (status === 'completed') return <Check className="w-3.5 h-3.5 text-accent" />;
  if (status === 'current') return <Circle className="w-3.5 h-3.5 text-accent fill-accent" />;
  return <Lock className="w-3 h-3 text-text-muted" />;
}

function CurriculumTreeView({ curriculum, delay }: { curriculum: Curriculum; delay: number }) {
  const progress = getLessonProgress(curriculum);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay }}
      className="rounded-xl border border-accent p-5 bg-[#f2f2f2] mb-3"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{curriculum.emoji}</span>
          <div>
            <p className="text-[14px] font-semibold text-text">{curriculum.titleEn}</p>
            <p className="text-[12px] text-text-secondary">{curriculum.title}</p>
          </div>
        </div>
        <span className="text-[13px] text-text-secondary font-semibold">
          {progress.completed}/{progress.total} bài
        </span>
      </div>

      <ProgressBar value={progress.completed} max={progress.total} className="mb-4" />

      <div className="space-y-3">
        {curriculum.modules.map(mod => (
          <div key={mod.id}>
            <p className="text-[12px] text-text-secondary font-semibold mb-1.5">
              {mod.titleEn}
            </p>
            <div className="space-y-1 pl-1">
              {mod.lessons.map(lesson => (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-2.5 py-1.5 ${lesson.status === 'current' ? 'text-text' : lesson.status === 'completed' ? 'text-text-secondary' : 'text-text-muted'}`}
                >
                  <LessonStatusIcon status={lesson.status} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] truncate ${lesson.status === 'current' ? 'font-medium' : ''}`}>
                      {lesson.titleEn}
                    </p>
                  </div>
                  {lesson.phrasesLearned != null && (
                    <span className="text-[11px] text-text-secondary">{lesson.phrasesLearned} cụm từ</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {curriculum.completedAt && (
        <p className="text-[13px] text-accent font-semibold text-center mt-4">Hoàn thành!</p>
      )}
    </motion.div>
  );
}

// ── Main Screen ──────────────────────────────────────────

export default function ProgressScreen({ onBack }: { onBack: () => void }) {
  const phrases = loadPhraseBank();
  const profile = getProfile();
  const sessions = getSessions();
  const primaryId = profile.careerPathId;
  const grouped = groupSessionsByDate(sessions);
  const mainCurriculum = getMainCurriculum();
  const sideQuest = getActiveSideQuest();
  const hasCurriculum = !!mainCurriculum || !!sideQuest;

  const sorted = [...CAREER_PATHS].sort((a, b) => {
    if (a.id === primaryId) return -1;
    if (b.id === primaryId) return 1;
    const ca = phrases.filter(p => p.careerPathId === a.id).length;
    const cb = phrases.filter(p => p.careerPathId === b.id).length;
    return cb - ca;
  });

  const actualPrimary = primaryId || (sorted.length > 0 ? sorted[0].id : null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col px-6 pt-2 pb-6 overflow-y-auto"
    >
      <motion.button
        onClick={onBack}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-1.5 text-text-secondary hover:text-text text-[13px] mb-4 self-start transition-colors duration-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </motion.button>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ease }}
        className="mb-5"
      >
        <h2
          className="text-[22px] font-light text-text"
          style={{ letterSpacing: '-0.5px', fontFamily: "'Comfortaa', sans-serif" }}
        >
          Tiến trình của bạn
        </h2>
      </motion.div>

      {/* ── Stats Row ── */}
      <div className="flex gap-2.5 mb-6">
        <StatCard
          icon={<Flame className="w-4 h-4" />}
          value={profile.streak}
          label="ngày liên tiếp"
          delay={0.12}
        />
        <StatCard
          icon={<BookOpen className="w-4 h-4" />}
          value={profile.totalPhrases}
          label="cụm từ"
          delay={0.16}
        />
        <StatCard
          icon={<TrendingUp className="w-4 h-4" />}
          value={profile.cefrLevel}
          label="trình độ"
          delay={0.2}
        />
      </div>

      {/* ── Curriculum Tree or Career Paths ── */}
      {hasCurriculum ? (
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-[12px] text-text-secondary font-semibold tracking-[0.1em] uppercase mb-2"
          >
            Lộ trình
          </motion.p>
          {mainCurriculum && <CurriculumTreeView curriculum={mainCurriculum} delay={0.3} />}
          {sideQuest && (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[12px] text-text-secondary font-semibold tracking-[0.1em] uppercase mb-2 mt-4"
              >
                Nhiệm vụ phụ
              </motion.p>
              <CurriculumTreeView curriculum={sideQuest} delay={0.45} />
            </>
          )}
        </div>
      ) : (
        <>
          {actualPrimary && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-[12px] text-text-secondary font-semibold tracking-[0.1em] uppercase mb-2"
            >
              Lộ trình
            </motion.p>
          )}

          <div className="space-y-3 mb-8">
            {sorted.map((path, i) => {
              const isPrimary = path.id === actualPrimary;
              if (i === 1 && sorted[0].id === actualPrimary) {
                return (
                  <div key={path.id}>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[12px] text-text-secondary font-semibold tracking-[0.1em] uppercase mb-2 mt-4"
                    >
                      Khám phá thêm
                    </motion.p>
                    <CareerCard path={path} phrases={phrases} isPrimary={false} delay={0.25 + i * 0.1} />
                  </div>
                );
              }
              return (
                <CareerCard key={path.id} path={path} phrases={phrases} isPrimary={isPrimary} delay={0.25 + i * 0.1} />
              );
            })}
          </div>
        </>
      )}

      {/* ── Session History ── */}
      {grouped.length > 0 && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[12px] text-text-secondary font-semibold tracking-[0.1em] uppercase mb-2"
          >
            Các buổi học
          </motion.p>

          <div className="space-y-1">
            {grouped.map((group, gi) => (
              <div key={group.label}>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 + gi * 0.05 }}
                  className="text-[13px] text-text font-semibold mt-3 mb-1"
                >
                  {group.label}
                </motion.p>
                <div className="divide-y divide-border">
                  {group.sessions.map((s, si) => (
                    <SessionItem
                      key={`${s.date}-${si}`}
                      session={s}
                      delay={0.5 + gi * 0.05 + si * 0.03}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

/** Mini progress line for showing during/after session */
export function MiniProgress({ todayCount }: { todayCount: number }) {
  const profile = getProfile();
  const primaryId = profile.careerPathId;
  if (!primaryId) return null;

  const path = CAREER_PATHS.find(p => p.id === primaryId);
  if (!path) return null;

  const phrases = loadPhraseBank();
  const count = phrases.filter(p => p.careerPathId === primaryId).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className="text-[12px] text-text-secondary text-center"
    >
      {path.emoji} {path.titleEn}: {count}/{path.targetPhraseCount} câu
      {todayCount > 0 && <span className="text-text"> (+{todayCount} hôm nay)</span>}
    </motion.div>
  );
}
