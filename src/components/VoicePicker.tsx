import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Square } from 'lucide-react';

// ── Types & Data ────────────────────────────────────────────
export type Persona = 'thay-bee' | 'co-honey' | 'anh-max' | 'chi-linh';

export interface VoiceOption {
  id: Persona;
  name: string;
  emoji: string;
  description: string;
  liveApiVoice: string;
  introPreview: string;
}

export const VOICES: VoiceOption[] = [
  {
    id: 'thay-bee',
    name: 'Thầy Bee',
    emoji: '🎓',
    description: 'Ấm áp, kiên nhẫn, dạy chắc tay',
    liveApiVoice: 'Orus',
    introPreview: 'Chào bạn! Mình là Thầy Bee. Mình sẽ giúp bạn luyện nói tiếng Anh — từ từ thôi, không vội đâu.',
  },
  {
    id: 'co-honey',
    name: 'Cô Honey',
    emoji: '💛',
    description: 'Ấm áp, kinh nghiệm thực tế salon',
    liveApiVoice: 'Kore',
    introPreview: 'Hi bạn! Mình là Cô Honey. Mình làm nail 10 năm ở Mỹ, mình biết bạn cần gì. Ready?',
  },
  {
    id: 'anh-max',
    name: 'Anh Max',
    emoji: '⚡',
    description: 'Năng lượng cao, học như chơi game',
    liveApiVoice: 'Puck',
    introPreview: 'What\'s up! Anh Max đây. Hôm nay mình luyện cho bạn nói nghe pro luôn. Let\'s get it!',
  },
  {
    id: 'chi-linh',
    name: 'Chị Linh',
    emoji: '🌸',
    description: 'Thanh lịch, chính xác, chi tiết',
    liveApiVoice: 'Aoede',
    introPreview: 'Chào bạn, mình là Chị Linh. Mình giúp bạn nói tiếng Anh rõ ràng, tự nhiên. Shall we begin?',
  },
];

export const VOICE_MAP: Record<Persona, string> = {
  'thay-bee': 'Orus',
  'co-honey': 'Kore',
  'anh-max': 'Puck',
  'chi-linh': 'Aoede',
};

// ── Helpers ─────────────────────────────────────────────────
const STORAGE_KEY = 'easybee_voice';

export function getSavedVoice(): Persona | null {
  return localStorage.getItem(STORAGE_KEY) as Persona | null;
}

export function saveVoice(persona: Persona): void {
  localStorage.setItem(STORAGE_KEY, persona);
}

// ── Spring / ease presets ───────────────────────────────────
const spring = { type: 'spring' as const, damping: 25, stiffness: 200 };
const ease = [0.25, 0.1, 0.25, 1] as const;

// ── Component ───────────────────────────────────────────────
export default function VoicePicker({ onSelect, reduced = false }: { onSelect: (persona: Persona) => void; reduced?: boolean }) {
  const [selected, setSelected] = useState<Persona>(getSavedVoice() || 'thay-bee');
  const [playing, setPlaying] = useState<Persona | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopPreview = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setPlaying(null);
  }, []);

  const playPreview = useCallback((voice: VoiceOption) => {
    stopPreview();
    const audio = new Audio(`/voices/${voice.id}.wav`);
    audio.onended = () => setPlaying(null);
    audio.onerror = () => setPlaying(null);
    audioRef.current = audio;
    setPlaying(voice.id);
    audio.play().catch(() => setPlaying(null));
  }, [stopPreview]);

  // Cleanup on unmount
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const handleConfirm = useCallback(() => {
    stopPreview();
    saveVoice(selected);
    onSelect(selected);
  }, [selected, onSelect, stopPreview]);

  const selectedVoice = VOICES.find(v => v.id === selected)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col px-6 pt-4 pb-8"
    >
      <motion.h2
        className="text-[20px] font-bold text-[#0a0a0a] text-center mb-1"
        style={{ fontFamily: "'Comfortaa', sans-serif" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        Chọn giáo viên
      </motion.h2>
      <motion.p
        className="text-[12px] text-[#8a8a8a] text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        Mỗi giáo viên có phong cách dạy riêng
      </motion.p>

      {/* 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {VOICES.map((voice, i) => {
          const isSelected = selected === voice.id;
          const isPlaying = playing === voice.id;
          return (
            <motion.div
              key={voice.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              transition={reduced ? { duration: 0 } : { ...spring, delay: 0.1 + i * 0.07 }}
              onClick={() => setSelected(voice.id)}
              className="relative rounded-xl p-4 cursor-pointer transition-all duration-200"
              style={{
                background: '#f2f2f2',
                border: isSelected ? '2px solid #0a0a0a' : '1px solid #e0e0e0',
                boxShadow: isSelected ? '0 2px 12px rgba(10,10,10,0.1)' : '0 1px 4px rgba(0,0,0,0.08)',
                padding: isSelected ? '15px' : '16px', // compensate border width
              }}
            >
              {/* Play button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isPlaying) stopPreview();
                  else playPreview(voice);
                }}
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ background: isPlaying ? '#0a0a0a' : '#e0e0e0' }}
              >
                {isPlaying
                  ? <Square className="w-3 h-3 text-white" />
                  : <Play className="w-3 h-3 text-[#8a8a8a] ml-0.5" />
                }
              </button>

              {/* Emoji with bounce on select */}
              <motion.div
                className="text-[32px] mb-2"
                animate={isSelected && !reduced ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 400 }}
                key={`${voice.id}-${isSelected}`}
              >
                {voice.emoji}
              </motion.div>
              <p className="text-[14px] font-semibold text-[#0a0a0a] mb-1">{voice.name}</p>
              <p className="text-[11px] text-[#8a8a8a] leading-snug">{voice.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Confirm button */}
      <motion.div className="mt-auto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease }}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          className="w-full py-4 rounded-xl bg-[#0a0a0a] text-white text-[15px] font-semibold"
          style={{ boxShadow: '0 2px 12px rgba(10,10,10,0.15)' }}
        >
          Bắt đầu với {selectedVoice.name}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
