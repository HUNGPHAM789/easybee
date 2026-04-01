import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { CAREER_PATHS, type CareerPath } from '../lib/career-paths';
import { loadPhraseBank, getProfile, type BankedPhrase } from '../lib/profile';

const ease = [0.25, 0.1, 0.25, 1] as const;
const spring = { type: 'spring' as const, damping: 25, stiffness: 200 };

function ProgressBar({ value, max, className = '' }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-2 rounded-xl bg-[#f2f2f2] overflow-hidden">
        <motion.div
          className="h-full rounded-xl bg-[#0a0a0a]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease }}
        />
      </div>
      <span className="text-[11px] text-[#8a8a8a] font-semibold min-w-[32px] text-right">{pct}%</span>
    </div>
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
      className={`p-5 rounded-xl border ${isPrimary ? 'border-[#0a0a0a]' : 'border-[#e0e0e0]'}`}
      style={{ background: '#f2f2f2', opacity: isPrimary ? 1 : 0.7 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{path.emoji}</span>
          <div>
            <p className={`text-[14px] font-semibold text-[#0a0a0a] ${isPrimary ? '' : 'opacity-70'}`}>
              {path.titleEn}
            </p>
            <p className="text-[11px] text-[#8a8a8a]">{path.title}</p>
          </div>
        </div>
        <span className="text-[13px] text-[#8a8a8a] font-semibold">
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
                <span className="text-[11px] text-[#8a8a8a] min-w-[100px] truncate">{cat.titleEn}</span>
                <div className="flex-1 h-1 rounded-full bg-[#e0e0e0] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#0a0a0a]"
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.targetCount > 0 ? Math.min(100, (catCount / cat.targetCount) * 100) : 0}%` }}
                    transition={{ duration: 0.5, delay: delay + 0.2, ease }}
                  />
                </div>
                <span className="text-[10px] text-[#8a8a8a] min-w-[28px] text-right">{catCount}/{cat.targetCount}</span>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export default function ProgressScreen({ onBack }: { onBack: () => void }) {
  const phrases = loadPhraseBank();
  const profile = getProfile();
  const primaryId = profile.careerPathId;

  // Sort: primary first, then by phrase count descending
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
        className="flex items-center gap-1.5 text-[#8a8a8a] hover:text-[#0a0a0a] text-[13px] mb-4 self-start transition-colors duration-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ease }}
        className="mb-6"
      >
        <h2
          className="text-[22px] font-light text-[#0a0a0a]"
          style={{ letterSpacing: '-0.5px', fontFamily: "'Comfortaa', sans-serif" }}
        >
          Tiến trình của bạn
        </h2>
        <p className="text-[#8a8a8a] text-[13px] mt-1">
          {phrases.length} cụm từ đã học
        </p>
      </motion.div>

      {/* Primary path label */}
      {actualPrimary && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[10px] text-[#8a8a8a] font-semibold tracking-[0.1em] uppercase mb-2"
        >
          Lộ trình của bạn
        </motion.p>
      )}

      <div className="space-y-3">
        {sorted.map((path, i) => {
          const isPrimary = path.id === actualPrimary;
          if (i === 1 && sorted[0].id === actualPrimary) {
            return (
              <div key={path.id}>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-[10px] text-[#8a8a8a] font-semibold tracking-[0.1em] uppercase mb-2 mt-4"
                >
                  Khám phá thêm
                </motion.p>
                <CareerCard path={path} phrases={phrases} isPrimary={false} delay={0.15 + i * 0.1} />
              </div>
            );
          }
          return (
            <CareerCard key={path.id} path={path} phrases={phrases} isPrimary={isPrimary} delay={0.15 + i * 0.1} />
          );
        })}
      </div>
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
      className="text-[12px] text-[#8a8a8a] text-center"
    >
      {path.emoji} {path.titleEn}: {count}/{path.targetPhraseCount} câu
      {todayCount > 0 && <span className="text-[#0a0a0a]"> (+{todayCount} hôm nay)</span>}
    </motion.div>
  );
}
