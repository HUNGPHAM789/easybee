import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface CueCardProps {
  text: string; // raw text inside [CUECARD]...[/CUECARD]
}

function parseCueCard(raw: string) {
  const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean);
  const topic = lines[0] || '';
  const bullets: string[] = [];
  let explain = '';
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('-')) {
      bullets.push(line.replace(/^-\s*/, ''));
    } else if (/^and\s+/i.test(line)) {
      explain = line;
    } else if (line.toLowerCase() !== 'you should say:') {
      bullets.push(line);
    }
  }
  return { topic, bullets, explain };
}

export default function CueCard({ text }: CueCardProps) {
  const { topic, bullets, explain } = parseCueCard(text);
  const [seconds, setSeconds] = useState(60);
  const [prepDone, setPrepDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset timer when cue card text changes
  useEffect(() => {
    setSeconds(60);
    setPrepDone(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setPrepDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [text]);

  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="flex flex-col mx-6 rounded-xl px-6 py-6 bg-white border border-border"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
    >
      <p className="text-[12px] text-text-secondary font-semibold tracking-[0.12em] uppercase mb-3">Part 2</p>
      <p className="text-[16px] font-semibold text-text leading-snug mb-3">{topic}</p>

      {bullets.length > 0 && (
        <div className="space-y-1.5 mb-2">
          <p className="text-[12px] text-text-secondary">You should say:</p>
          {bullets.map((b, i) => (
            <p key={i} className="text-[13px] text-text-secondary pl-3">{'\u2022'} {b}</p>
          ))}
        </div>
      )}

      {explain && (
        <p className="text-[13px] text-text-secondary pl-3 mb-3">{explain}</p>
      )}

      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
        {!prepDone ? (
          <>
            <p className="text-[12px] text-text-secondary">Thời gian chuẩn bị</p>
            <p className="text-[16px] font-semibold text-text tabular-nums">{mm}:{ss}</p>
          </>
        ) : (
          <p className="text-[13px] text-text font-medium">Nói trong 1-2 phút</p>
        )}
      </div>
    </motion.div>
  );
}
