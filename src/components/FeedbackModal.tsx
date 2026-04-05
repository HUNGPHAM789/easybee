import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

const RATINGS = [
  { value: 1, emoji: '😤', label: 'Rất tệ' },
  { value: 2, emoji: '😐', label: 'Tạm' },
  { value: 3, emoji: '🙂', label: 'Được' },
  { value: 4, emoji: '😊', label: 'Tốt' },
  { value: 5, emoji: '🤩', label: 'Tuyệt vời' },
];

export default function FeedbackModal({
  session,
  onClose,
}: {
  session: Session;
  onClose: () => void;
}) {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!rating) return;
    setSubmitting(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, message }),
      });
      setSubmitted(true);
      setTimeout(onClose, 1500);
    } catch (err) {
      console.error('Feedback submit failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative pt-14 pb-5 px-6">
        <button
          onClick={onClose}
          className="absolute right-6 top-14 text-[#8a8a8a] hover:text-[#0a0a0a] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h1 className="text-[22px] font-light text-[#0a0a0a]" style={{ letterSpacing: '-0.5px' }}>
          Góp ý cho EasyBee
        </h1>
      </div>

      <div className="flex-1 px-6 flex flex-col">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <p className="text-[40px] mb-3">🙏</p>
            <p className="text-[18px] text-[#0a0a0a] font-medium">Cảm ơn bạn!</p>
            <p className="text-[13px] text-[#8a8a8a] mt-1">Góp ý của bạn giúp EasyBee tốt hơn.</p>
          </motion.div>
        ) : (
          <>
            <p className="text-[15px] text-[#0a0a0a] mb-6">
              Bạn thấy EasyBee thế nào?
            </p>

            <div className="flex justify-between mb-8">
              {RATINGS.map(r => (
                <button
                  key={r.value}
                  onClick={() => setRating(r.value)}
                  className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                    rating === r.value
                      ? 'bg-[#f2f2f2] scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <span className="text-[28px]">{r.emoji}</span>
                  <span className="text-[11px] text-[#8a8a8a]">{r.label}</span>
                </button>
              ))}
            </div>

            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Bạn muốn nói gì với EasyBee? (không bắt buộc)"
              className="w-full h-32 rounded-xl border border-[#e8e8e8] p-4 text-[14px] text-[#0a0a0a] placeholder:text-[#b0b0b0] resize-none focus:outline-none focus:border-[#0a0a0a] transition-colors"
            />

            <div className="mt-auto pb-10 pt-6">
              <button
                onClick={handleSubmit}
                disabled={!rating || submitting}
                className={`w-full py-4 rounded-xl text-[15px] font-semibold transition-all ${
                  rating
                    ? 'bg-[#0a0a0a] text-white'
                    : 'bg-[#f2f2f2] text-[#b0b0b0] cursor-not-allowed'
                }`}
                style={rating ? { boxShadow: '0 2px 12px rgba(10,10,10,0.15)' } : undefined}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...
                  </span>
                ) : (
                  'Gửi góp ý'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
