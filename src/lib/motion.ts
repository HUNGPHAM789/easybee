import { useEffect, useState } from 'react';

// ── Shared Animation Tokens ─────────────────────────────────

export const ease = [0.22, 1, 0.36, 1] as const;

export const transitions = {
  fast: { duration: 0.2, ease },
  normal: { duration: 0.4, ease },
  slow: { duration: 0.6, ease },
  spring: { type: 'spring' as const, damping: 25, stiffness: 200 },
  springSnappy: { type: 'spring' as const, damping: 20, stiffness: 300 },
};

export const fadeUp = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)' },
};

export const phaseVariants = {
  enter: { opacity: 0, y: 30, filter: 'blur(8px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -20, filter: 'blur(4px)' },
};

// ── Reduced Motion ──────────────────────────────────────────

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

// Reduced-motion-safe versions of tokens
export function getTransitions(reduced: boolean) {
  if (!reduced) return transitions;
  return {
    fast: { duration: 0 },
    normal: { duration: 0 },
    slow: { duration: 0 },
    spring: { duration: 0 },
    springSnappy: { duration: 0 },
  };
}

export function getFadeUp(reduced: boolean) {
  if (!reduced) return fadeUp;
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
}

export function getPhaseVariants(reduced: boolean) {
  if (!reduced) return phaseVariants;
  return {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };
}
