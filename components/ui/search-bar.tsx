"use client";

import { useState, useRef, useCallback } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = useCallback(() => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (!value) {
      setExpanded(false);
    }
  }, [expanded, value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onSearch(e.target.value);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setValue("");
    onSearch("");
    inputRef.current?.focus();
  }, [onSearch]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleToggle}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 active:opacity-60 touch-manipulation"
        aria-label="Search"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <line x1="13" y1="13" x2="18" y2="18" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ width: expanded ? "100%" : 0, opacity: expanded ? 1 : 0 }}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Tìm bài học..."
            className="w-full h-10 pl-3 pr-8 text-base text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 transition-colors"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 active:opacity-60 touch-manipulation"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 6.586L4.707 3.293a1 1 0 00-1.414 1.414L6.586 8l-3.293 3.293a1 1 0 101.414 1.414L8 9.414l3.293 3.293a1 1 0 001.414-1.414L9.414 8l3.293-3.293a1 1 0 00-1.414-1.414L8 6.586z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
