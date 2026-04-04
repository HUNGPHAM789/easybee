/**
 * Bilingual upgrade prompt shown when free tier limit is hit.
 * Vietnamese + English.
 */
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { ease } from '../lib/motion';

interface FreeLimitDialogProps {
  onUpgrade: () => void;
  onClose: () => void;
}

export default function FreeLimitDialog({ onUpgrade, onClose }: FreeLimitDialogProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center px-0 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full sm:max-w-sm bg-white rounded-t-2xl sm:rounded-2xl px-6 pt-6 pb-10 sm:pb-6 flex flex-col items-center"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 -4px 32px rgba(0,0,0,0.12)' }}
      >
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-border mb-6 sm:hidden" />

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
          <Clock className="w-7 h-7 text-amber-500" />
        </div>

        {/* Heading Vietnamese */}
        <h2
          className="text-[20px] font-semibold text-text text-center mb-2"
          style={{ fontFamily: "'Comfortaa', sans-serif" }}
        >
          Hết thời gian miễn phí
        </h2>

        {/* Heading English */}
        <p className="text-[13px] text-text-secondary text-center mb-1">
          Free time used up
        </p>

        {/* Body Vietnamese */}
        <p className="text-[14px] text-text-secondary text-center leading-relaxed mt-3 mb-1">
          Bạn đã dùng hết <strong>45 phút miễn phí</strong> tháng này.
        </p>
        {/* Body English */}
        <p className="text-[12px] text-text-muted text-center leading-relaxed mb-6">
          You've used your 45 free minutes this month.
          <br />
          Nâng cấp để học không giới hạn.
        </p>

        {/* CTA */}
        <button
          onClick={onUpgrade}
          className="w-full py-4 rounded-xl bg-accent text-accent-fg text-[15px] font-semibold mb-3"
          style={{ boxShadow: '0 2px 12px rgba(10,10,10,0.15)' }}
        >
          Nâng cấp Premium
        </button>

        {/* Dismiss — resets next month hint */}
        <button
          onClick={onClose}
          className="text-[13px] text-text-muted py-2"
        >
          Để tháng sau — Come back next month
        </button>
      </motion.div>
    </motion.div>
  );
}
