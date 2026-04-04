/**
 * Usage banner — shows remaining free tier time in the UI.
 * Shows "38 min left this month" style display.
 */
import { motion, AnimatePresence } from 'motion/react';
import { Clock, X } from 'lucide-react';
import { FREE_SECONDS } from '../lib/usage';

interface UsageBannerProps {
  remainingSeconds: number;
  onUpgrade: () => void;
  onDismiss?: () => void;
  className?: string;
}

function formatTime(seconds: number): string {
  if (seconds <= 0) return '0 phút';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} giây`;
  if (secs === 0) return `${mins} phút`;
  return `${mins} phút ${secs} giây`;
}

function getBarColor(fraction: number): string {
  if (fraction > 0.5) return 'var(--color-accent)';
  if (fraction > 0.25) return '#f59e0b'; // amber
  return '#ef4444'; // red
}

export default function UsageBanner({
  remainingSeconds,
  onUpgrade,
  onDismiss,
  className = '',
}: UsageBannerProps) {
  const fraction = Math.max(0, Math.min(1, remainingSeconds / FREE_SECONDS));
  const timeText = formatTime(remainingSeconds);
  const isLow = fraction < 0.25;
  const isEmpty = remainingSeconds <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full px-4 py-3 rounded-xl border ${
        isEmpty
          ? 'bg-red-50 border-red-200'
          : isLow
          ? 'bg-amber-50 border-amber-200'
          : 'bg-surface border-border'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Clock
            className={`w-3.5 h-3.5 shrink-0 ${
              isEmpty ? 'text-red-500' : isLow ? 'text-amber-500' : 'text-text-secondary'
            }`}
          />
          <div className="flex-1 min-w-0">
            {isEmpty ? (
              <p className="text-[12px] font-semibold text-red-600">
                Hết thời gian miễn phí tháng này
              </p>
            ) : (
              <p className={`text-[12px] font-medium ${isLow ? 'text-amber-700' : 'text-text-secondary'}`}>
                Còn <span className="font-bold text-text">{timeText}</span> miễn phí tháng này
              </p>
            )}
            {/* Progress bar */}
            <div className="mt-1.5 h-1 w-full rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: getBarColor(fraction) }}
                initial={{ width: 0 }}
                animate={{ width: `${fraction * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onUpgrade}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
              isEmpty
                ? 'bg-red-500 text-white'
                : 'bg-accent text-accent-fg'
            }`}
          >
            Nâng cấp
          </button>
          {onDismiss && !isEmpty && (
            <button
              onClick={onDismiss}
              className="text-text-muted hover:text-text"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
