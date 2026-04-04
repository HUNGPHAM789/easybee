/**
 * PronunciationHint — shows small muted pronunciation text under a phrase.
 * Format: "THANK-yoo" (ALL CAPS = stressed syllable)
 */
import { motion } from 'motion/react';
import { getPronunciation } from '../lib/pronunciation';

interface PronunciationHintProps {
  text: string;
  className?: string;
  reduced?: boolean;
}

export default function PronunciationHint({ text, className = '', reduced = false }: PronunciationHintProps) {
  const pronunciation = getPronunciation(text);
  if (!pronunciation) return null;

  return (
    <motion.p
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className={`text-[11px] font-mono tracking-wide text-text-muted mt-0.5 select-none ${className}`}
      style={{ letterSpacing: '0.04em' }}
      aria-label={`Cách đọc: ${pronunciation}`}
    >
      {pronunciation}
    </motion.p>
  );
}
