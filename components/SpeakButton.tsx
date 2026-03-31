"use client";

import { useState, useCallback } from "react";
import IconButton from "./IconButton";

export default function SpeakButton({ text, light = false }: { text: string; light?: boolean }) {
  const iconColor = light ? "text-white/70" : "text-neutral-500";
  const barColor = light ? "bg-white/70" : "bg-neutral-500";
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (speaking) { setSpeaking(false); return; }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.85;
    utter.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) =>
      v.lang.startsWith("en") &&
      (v.name.includes("Samantha") || v.name.includes("Google US") ||
       v.name.includes("Karen") || v.name.includes("Daniel"))
    );
    if (preferred) utter.voice = preferred;

    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, [text, speaking]);

  return (
    <IconButton onClick={speak} active={speaking} ariaLabel="Nghe phát âm">
      {speaking ? (
        <span className="flex items-end gap-[3px] h-4">
          <span className={`w-[3px] ${barColor} rounded-full animate-[soundbar1_0.6s_ease-in-out_infinite]`} style={{ height: "60%" }} />
          <span className={`w-[3px] ${barColor} rounded-full animate-[soundbar2_0.6s_ease-in-out_infinite_0.1s]`} style={{ height: "100%" }} />
          <span className={`w-[3px] ${barColor} rounded-full animate-[soundbar1_0.6s_ease-in-out_infinite_0.2s]`} style={{ height: "40%" }} />
        </span>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconColor}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </IconButton>
  );
}
