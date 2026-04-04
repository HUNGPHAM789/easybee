/**
 * TutorSpeech — Scrollable conversation transcript.
 * Appends lines as they arrive, auto-scrolls to bottom.
 * English words/phrases are bolded automatically.
 */
import { useEffect, useRef } from 'react';

interface TutorSpeechProps {
  lines: string[];
}

/** Returns true if a word is English (ASCII letters only, length > 1) */
function isEnglishWord(word: string): boolean {
  return /^[a-zA-Z][a-zA-Z\-']*[a-zA-Z]$/.test(word) || /^[A-Z][a-zA-Z]+$/.test(word);
}

/** Render a line with English words bolded */
function renderLine(text: string): React.ReactNode[] {
  // Split by spaces but preserve punctuation attached to words
  const tokens = text.split(/(\s+)/);
  return tokens.map((token, i) => {
    const clean = token.replace(/[^a-zA-Z\-']/g, '');
    if (clean.length > 1 && isEnglishWord(clean)) {
      return <strong key={i} style={{ fontWeight: 600, color: '#0a0a0a' }}>{token}</strong>;
    }
    return <span key={i}>{token}</span>;
  });
}

export default function TutorSpeech({ lines }: TutorSpeechProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new lines arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  if (!lines.length) return (
    <div style={{ height: '80px' }} />
  );

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: '200px',
        overflowY: 'auto',
        width: '100%',
        padding: '0 1.5rem',
        boxSizing: 'border-box',
      }}
      className="scrollbar-hide"
    >
      {lines.map((line, i) => (
        <p
          key={i}
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#0a0a0a',
            marginBottom: '0.5rem',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {renderLine(line)}
        </p>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
