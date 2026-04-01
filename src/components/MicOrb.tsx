import { useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Mic, Loader2 } from 'lucide-react';

interface MicOrbProps {
  volume: number;
  isActive: boolean;
  isConnecting: boolean;
  onClick: () => void;
  reduced?: boolean;
}

const SIZE = 96;
const BAR_COUNT = 28;

export default function MicOrb({ volume, isActive, isConnecting, onClick, reduced = false }: MicOrbProps) {
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 400, damping: 22 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const smoothVol = useRef(0);

  const handleTapStart = useCallback(() => scale.set(0.92), [scale]);
  const handleTapEnd = useCallback(() => scale.set(1), [scale]);

  // Canvas waveform — renders horizontal bars INSIDE the button
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const barWidth = 2.5;
    const barGap = 2;
    const totalWidth = BAR_COUNT * (barWidth + barGap) - barGap;
    const startX = (SIZE - totalWidth) / 2;
    const maxBarH = SIZE * 0.35;

    const draw = () => {
      smoothVol.current += (volume - smoothVol.current) * 0.15;
      const v = smoothVol.current;
      ctx.clearRect(0, 0, SIZE, SIZE);

      if (!isActive) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const t = Date.now() * 0.004;

      for (let i = 0; i < BAR_COUNT; i++) {
        const norm = (i - BAR_COUNT / 2) / (BAR_COUNT / 2);
        const centerWeight = 1 - Math.abs(norm) * 0.5;
        const wave = Math.sin(t + i * 0.4) * 0.3 + Math.cos(t * 0.7 - i * 0.3) * 0.2;
        const h = Math.max(3, (0.15 + v * 0.85 + wave * v) * maxBarH * centerWeight);
        const x = startX + i * (barWidth + barGap);
        const y = cy - h / 2;
        const alpha = 0.15 + v * 0.6;

        ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, h, barWidth / 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isActive, volume]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.4 }}
    >
      {/* Pulse rings */}
      <AnimatePresence>
        {isActive && [0, 1].map(i => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full"
            style={{
              width: SIZE,
              height: SIZE,
              border: '1px solid rgba(10,10,10,0.05)',
            }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.4 + i * 0.2], opacity: [0, 0.2, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={onClick}
        disabled={isConnecting}
        className="relative z-10 rounded-full flex items-center justify-center cursor-pointer select-none overflow-hidden"
        style={{
          width: SIZE,
          height: SIZE,
          background: '#ffffff',
          border: '1px solid #e0e0e0',
          boxShadow: isActive
            ? '0 2px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)'
            : '0 1px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
          scale: springScale,
        }}
        onTapStart={handleTapStart}
        onTap={handleTapEnd}
        onTapCancel={handleTapEnd}
        whileHover={{ scale: 1.04 }}
        animate={!isActive && !isConnecting && !reduced ? { scale: [1, 1.02, 1] } : undefined}
        transition={!isActive && !isConnecting ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        {/* Waveform canvas inside button */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />

        {/* Active subtle overlay */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'rgba(0,0,0,0.015)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Icon */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isConnecting ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <Loader2 className="w-7 h-7 text-[#8a8a8a] animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <Mic className={`w-7 h-7 transition-colors duration-300 ${isActive ? 'text-[#0a0a0a]' : 'text-[#8a8a8a]'}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.div>
  );
}
