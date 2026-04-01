import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Check } from 'lucide-react';

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

// ── Avatar gradients & initials ─────────────────────────────
const AVATAR_STYLES: Record<Persona, { gradient: string; initials: string }> = {
  'thay-bee': { gradient: 'linear-gradient(135deg, #4a4a4a, #8a8a8a)', initials: 'TB' },
  'co-honey': { gradient: 'linear-gradient(135deg, #d4a373, #e8c9a0)', initials: 'CH' },
  'anh-max': { gradient: 'linear-gradient(135deg, #5a5a5a, #3a3a3a)', initials: 'AM' },
  'chi-linh': { gradient: 'linear-gradient(135deg, #c9b1d4, #e0d0e8)', initials: 'CL' },
};

// ── Animated Equalizer (3 bars) ─────────────────────────────
function Equalizer() {
  return (
    <div className="flex items-end gap-[2px] h-[10px]">
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.div
          key={i}
          className="w-[2px] bg-white rounded-full"
          animate={{ height: ['3px', '10px', '3px'] }}
          transition={{ duration: 0.5, repeat: Infinity, delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ── Spring presets ──────────────────────────────────────────
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
      {/* Heading */}
      <motion.h2
        className="text-[20px] font-light text-[#0a0a0a] text-center mb-6"
        style={{ fontFamily: "'Comfortaa', sans-serif" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        Chọn giáo viên
      </motion.h2>

      {/* 2x2 grid of avatars */}
      <div className="grid grid-cols-2 gap-4 mb-8 px-2">
        {VOICES.map((voice, i) => {
          const isSelected = selected === voice.id;
          const isPlaying = playing === voice.id;
          const avatar = AVATAR_STYLES[voice.id];

          return (
            <motion.div
              key={voice.id}
              className="flex flex-col items-center"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0 } : { ...spring, delay: 0.1 + i * 0.07 }}
            >
              {/* Avatar with double ring */}
              <div
                className="relative cursor-pointer mb-2"
                onClick={() => setSelected(voice.id)}
              >
                {/* Outer ring */}
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 86,
                    height: 86,
                    border: '1px solid #e0e0e0',
                    padding: 2, // 2px gap
                  }}
                >
                  {/* Inner ring */}
                  <motion.div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: 80,
                      height: 80,
                      border: isSelected ? '2px solid #0a0a0a' : '1px solid #e0e0e0',
                      padding: isSelected ? 1 : 2, // compensate border width
                    }}
                    animate={{ scale: isSelected ? 1.05 : 1 }}
                    transition={spring}
                  >
                    {/* Avatar circle */}
                    <div
                      className="rounded-full w-full h-full overflow-hidden"
                      style={{ background: avatar.gradient }}
                    >
                      <img
                        src={`/avatars/${voice.id}.png`}
                        alt={voice.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center');
                          const span = document.createElement('span');
                          span.className = 'text-white text-[20px] font-semibold select-none';
                          span.textContent = avatar.initials;
                          (e.target as HTMLImageElement).parentElement!.appendChild(span);
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Checkmark badge (selected) */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={spring}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0a0a0a] flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Name */}
              <p
                className="text-[14px] text-[#0a0a0a] text-center leading-tight"
                style={{ fontWeight: isSelected ? 700 : 600 }}
              >
                {voice.name}
              </p>

              {/* Description */}
              <p className="text-[11px] text-[#8a8a8a] text-center leading-snug mt-0.5 line-clamp-2">
                {voice.description}
              </p>

              {/* Play button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isPlaying) stopPreview();
                  else playPreview(voice);
                }}
                className="mt-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ background: isPlaying ? '#0a0a0a' : '#e8e8e8' }}
              >
                {isPlaying
                  ? <Equalizer />
                  : <Play className="w-2.5 h-2.5 text-[#8a8a8a] ml-[1px]" />
                }
              </button>
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
