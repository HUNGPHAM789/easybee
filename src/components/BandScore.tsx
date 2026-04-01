import { motion } from 'motion/react';

export interface BandScoreData {
  band: string;
  fc?: string;
  lr?: string;
  gra?: string;
  p?: string;
}

const CRITERIA = [
  { key: 'fc', label: 'FC' },
  { key: 'lr', label: 'LR' },
  { key: 'gra', label: 'GRA' },
  { key: 'p', label: 'P' },
] as const;

function scoreFraction(score: string): number {
  const n = parseFloat(score);
  if (isNaN(n)) return 0;
  return Math.min(n / 9, 1);
}

export default function BandScore({ data }: { data: BandScoreData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="flex flex-col items-center mx-6 rounded-xl px-8 py-8 bg-surface border border-border"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
    >
      {/* Main band circle */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 border-accent"
      >
        <span className="text-[28px] font-light text-text">{data.band}</span>
      </div>

      <p className="text-[12px] text-text-secondary font-semibold tracking-[0.12em] uppercase mb-4">Band Score</p>

      {/* Sub-score bars */}
      <div className="w-full space-y-2.5">
        {CRITERIA.map(({ key, label }) => {
          const val = data[key as keyof BandScoreData];
          if (!val) return null;
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="text-[12px] font-semibold text-text-secondary w-8 text-right">{label}</span>
              <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${scoreFraction(val) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
              <span className="text-[13px] font-medium text-text w-6">{val}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
