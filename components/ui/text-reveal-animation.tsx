"use client";

import { motion } from "framer-motion";

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function TextReveal({
  word,
  className = "",
}: {
  word: string;
  className?: string;
}) {
  const chars = word.split("");

  return (
    <span className={className} aria-label={word}>
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          custom={i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
