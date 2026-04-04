import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCircle, MessageCircle, GraduationCap, BarChart3, Square, LogOut, Search } from 'lucide-react';

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
  isInLesson: boolean;
}

export default function CommandPalette({
  open, onClose, onChangeVoice, onSetMode, onShowProgress, onEndSession, onSignOut, isInLesson,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = [
    { id: 'voice', label: 'Đổi giáo viên', icon: UserCircle, onExecute: onChangeVoice },
    { id: 'conversation', label: 'Học Giao Tiếp', icon: MessageCircle, onExecute: () => onSetMode('conversation') },
    { id: 'ielts', label: 'Luyện IELTS', icon: GraduationCap, onExecute: () => onSetMode('ielts') },
    { id: 'progress', label: 'Xem tiến trình', icon: BarChart3, onExecute: onShowProgress },
    { id: 'end', label: 'Kết thúc buổi học', icon: Square, onExecute: onEndSession, lessonOnly: true },
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
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-sm mx-auto mt-[20vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-2 px-4 py-4 border-b border-[#e8e8e8]">
              <Search className="w-4 h-4 text-[#8a8a8a] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tìm hành động..."
                className="w-full text-[16px] text-[#0a0a0a] placeholder:text-[#8a8a8a] outline-none border-0 ring-0 focus:ring-0 focus:outline-none bg-transparent"
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
                    className="w-full px-4 py-3 hover:bg-[#f2f2f2] flex items-center gap-3 transition-colors"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
