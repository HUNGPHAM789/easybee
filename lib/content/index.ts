/**
 * EasyBee Content API — Data Access Layer
 *
 * PHASE 1/2 (current): returns static data from content.ts
 * PHASE 3 (Supabase):  swap implementations below to fetch from DB
 *                       Components never change — only this file.
 *
 * Pattern:
 *   import { getModules, getLesson } from "@/lib/content"
 *   const modules = await getModules()
 */

import type { Module, Class, Lesson } from "./types";
import { modules as _modules } from "../content";

// Sync exports for client components (Phase 1/2)
// Classes derived from modules — single source of truth
export { _modules as modules };
export const classes: Class[] = _modules.flatMap((m) => m.classes);

// ─── Read API ─────────────────────────────────────────────────────────────────

export async function getModules(): Promise<Module[]> {
  // Phase 3: return supabase.from("modules").select("*, classes(*, lessons(*))")
  return _modules;
}

export async function getClasses(): Promise<Class[]> {
  // Phase 3: return supabase.from("classes").select("*, lessons(*)")
  return classes;
}

export async function getClass(id: string): Promise<Class | null> {
  // Phase 3: return supabase.from("classes").select("*, lessons(*)").eq("id", id).single()
  return classes.find((c) => c.id === id) ?? null;
}

export async function getLesson(lessonId: string): Promise<Lesson | null> {
  // Phase 3: return supabase.from("lessons").select("*, drill(*)").eq("id", lessonId).single()
  for (const cls of classes) {
    const lesson = cls.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}

// ─── Re-export types ──────────────────────────────────────────────────────────
export type { Module, Class, Lesson, DrillCard, Phrase } from "./types";
