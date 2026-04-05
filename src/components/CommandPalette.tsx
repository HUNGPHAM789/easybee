import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCircle, User, MessageCircle, GraduationCap, BarChart3, Square, LogOut, Search, MessageSquare, Shield } from 'lucide-react';

interface Action {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onExecute: () => void;
  visibleDuringLesson?: boolean;
  lessonOnly?: boolean;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onChangeVoice: () => void;
  onSetMode: (mode: 'conversation' | 'ielts') => void;
  onShowProgress: () => void;
  onEndSession: () => void;
  onSignOut: () => void;
  onShowAccount: () => void;
  onFeedback: () => void;
  onShowAdmin?: () => void;
  isInLesson: boolean;
  isAdmin?: boolean;
  headerBottom?: number;
}

export default function CommandPalette({
  open, onClose, onChangeVoice, onSetMode, onShowProgress, onEndSession, onSignOut, onShowAccount, onFeedback, onShowAdmin, isInLesson, isAdmin, headerBottom = 120,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = [
    { id: 'account', label: 'Tài khoản', icon: User, onExecute: onShowAccount },
    { id: 'voice', label: 'Đổi giáo viên', icon: UserCircle, onExecute: onChangeVoice },
    { id: 'conversation', label: 'Học Giao Tiếp', icon: MessageCircle, onExecute: () => onSetMode('conversation') },
    { id: 'ielts', label: 'Luyện IELTS', icon: GraduationCap, onExecute: () => onSetMode('ielts') },
    { id: 'progress', label: 'Xem tiến trình', icon: BarChart3, onExecute: onShowProgress },
    { id: 'feedback', label: 'Góp ý', icon: MessageSquare, onExecute: onFeedback },
    { id: 'end', label: 'Kết thúc buổi học', icon: Square, onExecute: onEndSession, lessonOnly: true },
    ...(isAdmin && onShowAdmin ? [{ id: 'admin', label: 'Admin', icon: Shield, onExecute: onShowAdmin }] : []),
    { id: 'signout', label: 'Đăng xuất', icon: LogOut, onExecute: onSignOut },
  ];

  const filtered = actions
    .filter(a => !a.lessonOnly || isInLesson)
    .filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const execute = (action: Action) => {
    onClose();
    action.onExecute();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Dropdown panel — slides from below header */}
          <motion.div
            className="fixed left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-white rounded-b-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
            style={{ top: headerBottom }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search bar */}
            <div className="flex items-center border-b border-[#f0f0f0]">
              <Search className="w-4 h-4 text-[#8a8a8a] shrink-0 ml-4" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tìm hành động..."
                className="w-full text-[16px] text-[#0a0a0a] placeholder:text-[#8a8a8a] outline-none border-0 ring-0 focus:ring-0 focus:outline-none bg-transparent py-3 px-4"
                style={{ boxShadow: 'none', WebkitAppearance: 'none' }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && filtered.length > 0) execute(filtered[0]);
                }}
              />
            </div>

            {/* Actions list */}
            <div className="py-1 max-h-[50vh] overflow-y-auto">
              {filtered.map((action, i) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.id}
                    className="w-full px-4 py-3 hover:bg-[#f5f5f5] active:bg-[#f5f5f5] flex items-center gap-3 transition-colors duration-150"
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    onClick={() => execute(action)}
                  >
                    <Icon className="w-5 h-5 text-[#8a8a8a]" />
                    <span className="text-[15px] text-[#0a0a0a]">{action.label}</span>
                  </motion.button>
                );
              })}
              {filtered.length === 0 && (
                <p className="px-4 py-3 text-[14px] text-[#8a8a8a]">Không tìm thấy</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
