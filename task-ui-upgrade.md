# Task: UI Animation & Polish Upgrade

Read plan.md and architecture.md for context.

## Philosophy
EasyBee is monochrome, minimal, voice-first. The UI should feel like breathing — things appear and disappear naturally. No cards, no boxes, no visual noise. Animations ARE the UI since the app is so simple.

Design style reference: "E-Ink / Paper" meets "Exaggerated Minimalism" — high contrast monochrome, elegant typography, purposeful motion.

## Current Animation Audit

### What exists now:
1. `TextReveal` — character-by-character with blur-in (used for phrase English text)
2. `Flashcard` container — opacity + y + blur transition (container removed, just text now)  
3. `MicOrb` — canvas waveform bars + spring scale + pulse rings
4. `AnimatePresence mode="wait"` — for phase transitions
5. Various `motion.div` with opacity/y for lists and content

### What's generic/weak:
- Vietnamese subtitle just fades in with `opacity + y` — boring, could be more intentional
- Phase transitions (idle → lesson → session-end) are basic crossfades
- Mode selector cards have no entrance animation
- Voice picker cards are static
- Session end stats just slide up — could be more celebratory
- Pulsing dots (loading) are generic
- Latest tutor message text just replaces — no smooth transition between messages
- Error messages pop in without personality

## Upgrade Plan

### 1. Text Animations (PRIORITY — this is what users see most)

**Phrase English text** — Replace current `TextReveal` (char-by-char with blur):
Use a word-by-word stagger with spring physics instead. Each word slides up from below with slight blur, staggered 60ms apart. More natural than character-by-character.

```tsx
// New WordReveal component
const WordReveal = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1], // custom ease-out
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
```

**Vietnamese subtitle** — Fade up with a longer delay, so it feels like the translation "arrives" after the English:
```tsx
<motion.p
  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
  transition={{ 
    duration: 0.6, 
    delay: delay + words.length * 0.06 + 0.2,  // waits for English to finish
    ease: [0.22, 1, 0.36, 1]
  }}
>
```

**Tutor message text** — When tutor speaks, text should type in smoothly, not replace. Use a streaming-style animation where each new segment appends with a fade:
```tsx
// Instead of replacing text, append with crossfade
// Key on full text length to trigger re-animation of new content
```

### 2. Phase Transitions

**Idle → Lesson** — The mic button stays, everything else fades. Add a subtle scale-down of the idle text before it leaves.

**Lesson → Session End** — Instead of basic crossfade, use a "curtain" effect: content slides up while new content slides up from below. Or a blur-out / blur-in with slight y movement.

```tsx
// Phase transition variants
const phaseVariants = {
  enter: { opacity: 0, y: 30, filter: 'blur(8px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -20, filter: 'blur(4px)' },
};

// Apply to AnimatePresence mode="wait"
<motion.div variants={phaseVariants} initial="enter" animate="center" exit="exit"
  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
```

### 3. Session End Polish

**Stats counters** — Number should count up from 0 to final value (animated counter), not just appear:
```tsx
// AnimatedNumber component
const AnimatedNumber = ({ value, duration = 0.8 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    // Animate from 0 to value over duration
    const start = Date.now();
    const animate = () => {
      const progress = Math.min((Date.now() - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [value]);
  return <span>{display}</span>;
};
```

**Phrase list in session end** — Stagger entrance with alternating slide direction (odds from left, evens from right):
```tsx
initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
```

### 4. Voice Picker Upgrade

**Cards** — Add subtle entrance stagger. When hovering/tapping a card, the emoji gently bounces (spring). Selected card gets a smooth border-width animation.

**Preview audio playing** — Add a small animated equalizer icon (3 bars bouncing) while audio plays, instead of static play/stop icons.

### 5. Mode Selector Upgrade

**Cards entrance** — Scale up from 0.95 with stagger, not just opacity:
```tsx
initial={{ opacity: 0, scale: 0.95, y: 10 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
```

### 6. MicOrb Refinements

The MicOrb is already the best component. Small refinements:
- When connecting: add a subtle rotation to the loader (already spinning, but make it smoother)
- When active and AI is speaking: waveform bars should be smoother, use `lerp` for volume smoothing
- Inactive state: very subtle "breathing" animation (scale 1 → 1.02 → 1, 3s loop) to invite tap

### 7. Loading & Empty States

**Pulsing dots** — Replace with a more elegant loading indicator. Three dots that morph into a horizontal line and back:
```tsx
// Or use a simple breathing circle that expands and contracts
```

**Error state** — Add a subtle shake animation when error appears (3px horizontal shake, 300ms)

### 8. Scroll & List Behaviors

**Phrase list scrolling** — Add `scroll-behavior: smooth` and momentum scrolling on iOS (`-webkit-overflow-scrolling: touch`)

### 9. prefers-reduced-motion

All animations should respect `prefers-reduced-motion: reduce`. Wrap animations in a check:
```tsx
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// If reduced: skip or minimize animations (instant transitions, no blur)
```

### 10. Global Animation Tokens

Create consistent animation presets used everywhere:
```tsx
// In a new file: src/lib/motion.ts
export const transitions = {
  fast: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  normal: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  slow: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  spring: { type: 'spring', damping: 25, stiffness: 200 },
  springSnappy: { type: 'spring', damping: 20, stiffness: 300 },
};

export const fadeUp = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)' },
};

// Use everywhere: <motion.div {...fadeUp} transition={transitions.normal}>
```

## Implementation Order
1. Create `src/lib/motion.ts` with animation tokens
2. Replace `TextReveal` with `WordReveal` in phrase display
3. Upgrade Vietnamese subtitle animation
4. Add `AnimatedNumber` for session end stats
5. Upgrade phase transitions with blur
6. Add MicOrb breathing animation in idle
7. Polish voice picker and mode selector entrances
8. Add `prefers-reduced-motion` support
9. Remove any remaining card/box styling missed earlier
10. Run `npm run build` to verify

## Rules
- NO new dependencies — use only `motion/react` (already installed)
- NO color — monochrome only (#0a0a0a, #8a8a8a, #b0b0b0, #f2f2f2, #ffffff)
- NO cards/boxes for phrase display — text floats in space
- Animation durations: 200-600ms max. Nothing slower.
- Every animation must have purpose — if removing it wouldn't be noticed, remove it
- Mobile performance: use `transform` and `opacity` only for 60fps. `filter: blur()` is OK on modern devices but use sparingly
