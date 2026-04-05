import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

const RATING_EMOJI: Record<number, string> = { 1: '😤', 2: '😐', 3: '🙂', 4: '😊', 5: '🤩' };

interface FeedbackItem {
  id: string;
  user_email: string;
  rating: number;
  message: string;
  created_at: string;
}

interface FeedbackStats {
  total: number;
  avgRating: number;
  byRating: Record<number, number>;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'vừa xong';
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  return new Date(dateStr).toLocaleDateString('vi-VN');
}

export default function AdminScreen({
  session,
  onClose,
}: {
  session: Session;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);

  useEffect(() => {
    fetch('/api/feedback', {
      headers: { 'Authorization': `Bearer ${session.access_token}` },
    })
      .then(r => r.json())
      .then(data => {
        setFeedback(data.feedback || []);
        setStats(data.stats || null);
      })
      .catch(err => console.error('Admin fetch failed:', err))
      .finally(() => setLoading(false));
  }, [session.access_token]);

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
          Admin
        </h1>
        <p className="text-[12px] text-[#8a8a8a] mt-1">EasyBee Dashboard</p>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12">
            <Loader2 className="w-4 h-4 animate-spin text-[#8a8a8a]" />
            <span className="text-[13px] text-[#8a8a8a]">Đang tải...</span>
          </div>
        ) : (
          <>
            {/* Stats */}
            {stats && (
              <div className="mb-6 pb-6 border-b border-[#e8e8e8]">
                <p className="text-[12px] text-[#8a8a8a] font-semibold tracking-[0.1em] uppercase mb-3">
                  Tổng quan
                </p>
                <div className="space-y-2">
                  <p className="text-[14px] text-[#0a0a0a]">
                    Tổng feedback: <span className="font-semibold">{stats.total}</span>
                  </p>
                  <p className="text-[14px] text-[#0a0a0a]">
                    Trung bình: <span className="font-semibold">{stats.avgRating}</span> / 5
                  </p>
                  <div className="flex items-center gap-3 text-[13px] text-[#8a8a8a]">
                    {[5, 4, 3, 2, 1].map(r => (
                      <span key={r}>
                        {RATING_EMOJI[r]} {stats.byRating[r] || 0}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback list */}
            <p className="text-[12px] text-[#8a8a8a] font-semibold tracking-[0.1em] uppercase mb-3">
              Feedback gần đây
            </p>

            {feedback.length === 0 ? (
              <p className="text-[13px] text-[#8a8a8a] py-4">Chưa có feedback nào.</p>
            ) : (
              <div className="space-y-1">
                {feedback.map(f => (
                  <div key={f.id} className="py-3 border-b border-[#e8e8e8] last:border-b-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[16px]">{RATING_EMOJI[f.rating]}</span>
                      <span className="text-[13px] text-[#0a0a0a] font-medium">{f.user_email}</span>
                      <span className="text-[11px] text-[#b0b0b0] ml-auto">{timeAgo(f.created_at)}</span>
                    </div>
                    {f.message ? (
                      <p className="text-[13px] text-[#8a8a8a] pl-7">"{f.message}"</p>
                    ) : (
                      <p className="text-[12px] text-[#b0b0b0] pl-7 italic">không có bình luận</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
