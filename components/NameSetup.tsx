"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ActionButton from "./ActionButton";

export default function NameSetup({ onSave }: { onSave: (name: string) => void }) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("easybee_name", trimmed);
    onSave(trimmed);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-4xl mb-2">🐝</p>
      <h1 className="text-3xl font-bold text-neutral-900 mb-2 font-title">EasyBee</h1>
      <p className="text-base text-neutral-400 mb-10">Bạn tên gì?</p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
        <input
          type="text"
          placeholder="Tên của bạn..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          className="w-full text-center text-lg font-medium border-0 border-b-2 border-neutral-200 focus:border-neutral-900 outline-none py-3 bg-transparent text-neutral-900 placeholder:text-neutral-300 transition-colors"
        />
        <ActionButton type="submit" className="w-full py-4 text-base mt-2">
          Bắt đầu →
        </ActionButton>
      </form>
    </motion.div>
  );
}
