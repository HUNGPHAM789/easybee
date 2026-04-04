import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Lock, Play } from 'lucide-react';

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
  try { return localStorage.getItem(STORAGE_KEY) as Persona | null; }
  catch { return null; }
}

export function saveVoice(persona: Persona): void {
  try { localStorage.setItem(STORAGE_KEY, persona); } catch {}
}

// ── Avatar gradients & initials ─────────────────────────────
const AVATAR_STYLES: Record<Persona, { gradient: string; initials: string }> = {
  'thay-bee': { gradient: 'linear-gradient(135deg, #4a4a4a, #8a8a8a)', initials: 'TB' },
  'co-honey': { gradient: 'linear-gradient(135deg, #d4a373, #e8c9a0)', initials: 'CH' },
  'anh-max': { gradient: 'linear-gradient(135deg, #5a5a5a, #3a3a3a)', initials: 'AM' },
  'chi-linh': { gradient: 'linear-gradient(135deg, #c9b1d4, #e0d0e8)', initials: 'CL' },
};

// ── Audio file paths ────────────────────────────────────────
const VOICE_AUDIO: Record<Persona, string> = {
  'thay-bee': '/voices/thay-bee.wav',
  'co-honey': '/voices/co-honey.wav',
  'anh-max': '/voices/anh-max.wav',
  'chi-linh': '/voices/chi-linh.wav',
};

// ── Animated Equalizer (on avatar ring) ────────────────────
function AvatarEqualizer() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-[2px] h-[8px] z-10">
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          style={{ background: 'var(--color-accent)' }}
          animate={{ height: ['2px', '8px', '2px'] }}
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
export default function VoicePicker({ onSelect, reduced = false, isLockedVoice, onLockedTap }: { onSelect: (persona: Persona) => void; reduced?: boolean; isLockedVoice?: (id: Persona) => boolean; onLockedTap?: () => void }) {
  const [selected, setSelected] = useState<Persona>(getSavedVoice() || 'thay-bee');
  const [playing, setPlaying] = useState<Persona | null>(null);
  const [failedImgs, setFailedImgs] = useState<Set<Persona>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mount: light haptic
  useEffect(() => {
    navigator.vibrate?.([30]);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
  }, []);

  const playPreview = useCallback((persona: Persona, e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger card selection
    // Stop previous audio
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlaying(persona);
    const audio = new Audio(VOICE_AUDIO[persona]);
    audioRef.current = audio;
    audio.addEventListener('ended', () => setPlaying(null));
    audio.addEventListener('error', () => setPlaying(null));
    audio.play().catch(() => setPlaying(null));
  }, []);

  const handleConfirm = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlaying(null);
    saveVoice(selected);
    onSelect(selected);
  }, [selected, onSelect]);

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
        className="text-[20px] font-light text-text text-center mb-6"
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
          const imgFailed = failedImgs.has(voice.id);
          const locked = isLockedVoice?.(voice.id) ?? false;

          return (
            <motion.div
              key={voice.id}
              className="flex flex-col items-center"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0 } : { ...spring, delay: 0.1 + i * 0.07 }}
            >
              {/* Avatar — tap to select (no audio) */}
              <button
                className="relative mb-2 cursor-pointer bg-transparent border-none p-0"
                onClick={() => {
                  if (locked) { onLockedTap?.(); return; }
                  navigator.vibrate?.([20]);
                  setSelected(voice.id);
                }}
                aria-label={locked ? `${voice.name} — Premium` : `Chọn ${voice.name}`}
              >
                {/* Outer ring */}
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 86,
                    height: 86,
                    border: '1px solid var(--color-border)',
                    padding: 2,
                  }}
                >
                  {/* Inner ring */}
                  <motion.div
                    className="rounded-full flex items-center justify-center relative"
                    style={{
                      width: 80,
                      height: 80,
                      border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      padding: isSelected ? 1 : 2,
                    }}
                    animate={{ scale: isSelected ? 1.05 : 1 }}
                    transition={spring}
                  >
                    {/* Avatar circle */}
                    <div
                      className="rounded-full w-full h-full overflow-hidden flex items-center justify-center"
                      style={{ background: avatar.gradient }}
                    >
                      {imgFailed ? (
                        <span className="text-white text-[20px] font-semibold select-none">
                          {avatar.initials}
                        </span>
                      ) : (
                        <img
                          src={`/avatars/${voice.id}.png`}
                          alt={voice.name}
                          className="w-full h-full object-cover"
                          onError={() => setFailedImgs(prev => new Set(prev).add(voice.id))}
                        />
                      )}
                    </div>

                    {/* Equalizer on avatar ring */}
                    <AnimatePresence>
                      {isPlaying && <AvatarEqualizer />}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Checkmark badge (selected) or Lock badge (locked) */}
                <AnimatePresence>
                  {locked ? (
                    <motion.div
                      key="lock"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={spring}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#b0b0b0] flex items-center justify-center"
                    >
                      <Lock className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </motion.div>
                  ) : isSelected ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={spring}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </button>

              {/* Name + play button */}
              <div className="flex items-center gap-1.5">
                <p
                  className="text-[14px] text-text text-center leading-tight"
                  style={{ fontWeight: isSelected ? 700 : 600 }}
                >
                  {voice.name}
                </p>
                {!locked && (
                  <button
                    onClick={(e) => playPreview(voice.id, e)}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-[#f0f0f0] border-none cursor-pointer hover:bg-[#e0e0e0] transition-colors"
                    aria-label={`Nghe ${voice.name}`}
                  >
                    <Play className="w-2.5 h-2.5 text-[#555]" strokeWidth={3} />
                  </button>
                )}
              </div>

              {/* Description */}
              <p className="text-[12px] text-text-secondary text-center leading-snug mt-0.5 line-clamp-2">
                {voice.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Confirm button */}
      <motion.div className="mt-auto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease }}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          className="w-full py-4 rounded-xl bg-accent text-accent-fg text-[15px] font-semibold"
          style={{ boxShadow: '0 2px 12px rgba(10,10,10,0.15)' }}
        >
          Bắt đầu với {selectedVoice.name}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
