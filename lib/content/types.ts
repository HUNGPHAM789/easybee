// ─── Shared types ─────────────────────────────────────────────────────────────
// These types are stable. In Phase 3 (Supabase), rows will map to these shapes.

export type DrillCard = {
  id: string;           // globally unique e.g. "L01C03"
  type: "read" | "recall" | "fill" | "dialogue";
  prompt: string;
  hint: string;
  answer: string;
  answerHint?: string;  // optional: full sentence for fill cards
  pronunciation?: string;
  [key: string]: any;   // allow Gemini-generated extra fields
};

export interface Phrase {
  english: string;
  vietnamese: string;
  pronunciation: string;
}

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface Lesson {
  id: string;
  title: string;
  titleVi: string;
  level?: CEFRLevel;
  context: string;
  phrases: Phrase[];
  drill: DrillCard[];
}

export interface Class {
  id: string;
  title: string;
  titleVi: string;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  title: string;
  titleVi: string;
  classes: Class[];
}
