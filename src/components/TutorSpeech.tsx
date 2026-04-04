/**
 * TutorSpeech — clean single-sentence display with crossfade animation.
 * Shows only the most recent complete sentence from `lines[]`.
 * Fades in/out with blur on each new sentence.
 */
import { AnimatePresence, motion } from 'motion/react';

interface TutorSpeechProps {
  lines: string[];
}

export default function TutorSpeech({ lines }: TutorSpeechProps) {
  if (!lines.length) return null;

  const latest = lines[lines.length - 1];

  return (
    <div
      style={{
        height: '80px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={latest}
          initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: '17px',
            color: '#0a0a0a',
            fontWeight: 400,
            lineHeight: 1.6,
            textAlign: 'center',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%',
            margin: 0,
          }}
        >
          {latest}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
