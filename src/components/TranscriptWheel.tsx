/**
 * TranscriptWheel — iOS-style drum/wheel transcript display.
 * Shows 3 lines at a time; middle line is focused (black, 15px).
 * Lines above/below are muted (gray, 13px) and fade toward edges.
 * Supports touch drag, mouse scroll, and snapping.
 * Auto-scrolls to the latest line when new tutor speech arrives.
 */
import { useRef, useEffect, useCallback, useState } from 'react';

interface TranscriptWheelProps {
  lines: string[];
}

const LINE_HEIGHT = 40; // px per row

export default function TranscriptWheel({ lines }: TranscriptWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // offsetY: how many pixels we've scrolled from position-0 (first line centered)
  // We want the latest line centered by default.
  const [offsetY, setOffsetY] = useState(() => Math.max(0, (lines.length - 1) * LINE_HEIGHT));
  const dragStartY = useRef<number | null>(null);
  const dragStartOffset = useRef(0);
  const isAnimating = useRef(false);

  // Max offset: last line centered
  const maxOffset = Math.max(0, (lines.length - 1) * LINE_HEIGHT);

  // Clamp and snap offset
  const clamp = useCallback((v: number) => Math.max(0, Math.min(maxOffset, v)), [maxOffset]);
  const snap = useCallback((v: number) => Math.round(clamp(v) / LINE_HEIGHT) * LINE_HEIGHT, [clamp]);

  // Auto-scroll to latest when lines array grows
  useEffect(() => {
    const target = Math.max(0, (lines.length - 1) * LINE_HEIGHT);
    setOffsetY(target);
  }, [lines.length]);

  // Mouse wheel
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setOffsetY(prev => snap(prev + e.deltaY));
  }, [snap]);

  // Touch start
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    dragStartOffset.current = offsetY;
    isAnimating.current = false;
  }, [offsetY]);

  // Touch move
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const dy = dragStartY.current - e.touches[0].clientY;
    setOffsetY(clamp(dragStartOffset.current + dy));
  }, [clamp]);

  // Touch end — snap
  const onTouchEnd = useCallback(() => {
    dragStartY.current = null;
    setOffsetY(prev => snap(prev));
  }, [snap]);

  // Mouse drag
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragStartY.current = e.clientY;
    dragStartOffset.current = offsetY;
    isAnimating.current = false;
    const onMove = (ev: MouseEvent) => {
      if (dragStartY.current === null) return;
      const dy = dragStartY.current - ev.clientY;
      setOffsetY(clamp(dragStartOffset.current + dy));
    };
    const onUp = () => {
      dragStartY.current = null;
      setOffsetY(prev => snap(prev));
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [offsetY, clamp, snap]);

  if (!lines.length) return null;

  // Which line index is focused (centered)
  const focusedIdx = Math.round(offsetY / LINE_HEIGHT);

  // Render a window of lines: focusedIdx-1, focusedIdx, focusedIdx+1
  // We show all lines translated by offsetY so the focused one sits in center
  const translateY = (LINE_HEIGHT * lines.length) / 2 - offsetY - LINE_HEIGHT / 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none cursor-grab active:cursor-grabbing"
      style={{
        height: `${LINE_HEIGHT * 3}px`,
        overflow: 'hidden',
        width: '100%',
        WebkitMaskImage: 'linear-gradient(transparent, #fff 30%, #fff 70%, transparent)',
        maskImage: 'linear-gradient(transparent, #fff 30%, #fff 70%, transparent)',
      }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
    >
      <div
        style={{
          transform: `translateY(${translateY + LINE_HEIGHT}px)`,
          transition: dragStartY.current !== null ? 'none' : 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform',
        }}
      >
        {lines.map((line, i) => {
          const dist = Math.abs(i - focusedIdx);
          const isFocused = dist === 0;
          const isAdjacent = dist === 1;
          // Only render lines within ±2 of focused for perf
          if (dist > 2) return null;
          return (
            <div
              key={i}
              style={{
                minHeight: `${LINE_HEIGHT}px`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                fontSize: isFocused ? '15px' : '13px',
                color: isFocused ? '#0a0a0a' : '#aaa',
                opacity: isFocused ? 1 : isAdjacent ? 0.7 : 0.3,
                fontWeight: isFocused ? 400 : 300,
                transition: 'font-size 0.2s ease, color 0.2s ease, opacity 0.2s ease',
                lineHeight: 1.4,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                width: '100%',
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}
