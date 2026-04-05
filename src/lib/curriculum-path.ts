import { CAREER_PATHS, IELTS_PATH, getCareerPath } from './career-paths';
import { getProfile } from './profile';

// ── Types ────────────────────────────────────────────────────

export interface CurriculumLesson {
  id: string;
  moduleId: string;
  title: string;        // Vietnamese
  titleEn: string;
  objectives: string;   // Vietnamese — what student will learn
  status: 'locked' | 'current' | 'completed';
  phrasesLearned?: number;
}

export interface CurriculumModule {
  id: string;
  title: string;        // Vietnamese
  titleEn: string;
  lessons: CurriculumLesson[];
}

export interface Curriculum {
  id: string;
  type: 'main' | 'side-quest';
  careerPathId?: string;
  title: string;
  titleEn: string;
  emoji: string;
  modules: CurriculumModule[];
  currentLessonId: string | null;
  createdAt: string;
  completedAt?: string;
  cefrLevel: string;
}

// ── Storage ──────────────────────────────────────────────────

const CURRICULUM_KEY = 'easybee_curriculum';

export function loadCurriculums(): Curriculum[] {
  try {
    const raw = localStorage.getItem(CURRICULUM_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Curriculum[];
  } catch {
    return [];
  }
}

function saveCurriculums(curricula: Curriculum[]): void {
  localStorage.setItem(CURRICULUM_KEY, JSON.stringify(curricula));
}

export function getMainCurriculum(): Curriculum | null {
  return loadCurriculums().find(c => c.type === 'main' && !c.completedAt) ?? null;
}

export function getActiveSideQuest(): Curriculum | null {
  return loadCurriculums().find(c => c.type === 'side-quest' && !c.completedAt) ?? null;
}

export function getAllLessons(curriculum: Curriculum): CurriculumLesson[] {
  return curriculum.modules.flatMap(m => m.lessons);
}

export function getCurrentLesson(curriculum: Curriculum): CurriculumLesson | null {
  if (!curriculum.currentLessonId) return null;
  return getAllLessons(curriculum).find(l => l.id === curriculum.currentLessonId) ?? null;
}

export function getModuleForLesson(curriculum: Curriculum, lessonId: string): CurriculumModule | null {
  return curriculum.modules.find(m => m.lessons.some(l => l.id === lessonId)) ?? null;
}

export function getLessonProgress(curriculum: Curriculum): { completed: number; total: number } {
  const all = getAllLessons(curriculum);
  return { completed: all.filter(l => l.status === 'completed').length, total: all.length };
}

// ── Progression ──────────────────────────────────────────────

export function markLessonComplete(curriculumId: string, lessonId: string, phrasesLearned: number): void {
  const curricula = loadCurriculums();
  const curriculum = curricula.find(c => c.id === curriculumId);
  if (!curriculum) return;

  const lesson = getAllLessons(curriculum).find(l => l.id === lessonId);
  if (!lesson) return;

  lesson.status = 'completed';
  lesson.phrasesLearned = phrasesLearned;
  saveCurriculums(curricula);
}

export function advanceToNextLesson(curriculumId: string): void {
  const curricula = loadCurriculums();
  const curriculum = curricula.find(c => c.id === curriculumId);
  if (!curriculum) return;

  const all = getAllLessons(curriculum);
  const currentIdx = all.findIndex(l => l.id === curriculum.currentLessonId);
  const nextLesson = all.find((l, i) => i > currentIdx && l.status !== 'completed');

  if (nextLesson) {
    nextLesson.status = 'current';
    curriculum.currentLessonId = nextLesson.id;
  } else {
    // All lessons done
    curriculum.currentLessonId = null;
    curriculum.completedAt = new Date().toISOString().split('T')[0];
  }

  saveCurriculums(curricula);
}

export function addCurriculum(curriculum: Curriculum): void {
  const curricula = loadCurriculums();
  curricula.push(curriculum);
  saveCurriculums(curricula);
}

// ── Generation ───────────────────────────────────────────────

function buildCurriculumPrompt(careerPathId: string, cefrLevel: string, goals: string): string {
  const path = getCareerPath(careerPathId) ?? CAREER_PATHS[0];
  const categories = path.categories.map(c => `${c.titleEn} (${c.title})`).join(', ');

  return `You are a curriculum designer for EasyBee, a Vietnamese-English tutoring app for Vietnamese workers in America.

Generate a structured lesson plan for a ${cefrLevel} learner working in: ${path.titleEn} (${path.title}).
User goals: ${goals || 'improve English for work'}

CAREER PATH CATEGORIES: ${categories}

RULES:
- Generate 3-4 modules, each with 3-4 lessons (total ~12 lessons)
- Lessons should progress from basic to advanced within the career context
- Each lesson teaches exactly 3 phrases
- Module 1 should cover basics (greetings, introductions)
- Last module should cover difficult situations (complaints, problems, negotiations)
- Lesson titles in BOTH Vietnamese and English
- Objectives in Vietnamese, 1 sentence, specific to what phrases will be taught
- Order matters: each lesson builds on previous ones

Respond in EXACTLY this JSON format (no markdown, no code blocks, just raw JSON):

{
  "title": "${path.title}",
  "titleEn": "${path.titleEn}",
  "emoji": "${path.emoji}",
  "modules": [
    {
      "id": "module-1",
      "title": "Vietnamese module name",
      "titleEn": "English module name",
      "lessons": [
        {
          "id": "lesson-1",
          "moduleId": "module-1",
          "title": "Vietnamese lesson name",
          "titleEn": "English lesson name",
          "objectives": "Vietnamese description of what 3 phrases will be taught"
        }
      ]
    }
  ]
}`;
}

function buildSideQuestPrompt(topic: string, cefrLevel: string): string {
  return `You are a curriculum designer for EasyBee, a Vietnamese-English tutoring app for Vietnamese workers in America.

A ${cefrLevel} learner wants to learn English for a specific situation: "${topic}"

Generate a SHORT mini lesson plan (side quest) for this topic.

RULES:
- Generate exactly 1 module with 2-4 lessons
- Each lesson teaches exactly 3 phrases
- Keep it practical and focused on the specific situation
- Lesson titles in BOTH Vietnamese and English
- Objectives in Vietnamese
- Pick an appropriate emoji for this topic

Respond in EXACTLY this JSON format (no markdown, no code blocks, just raw JSON):

{
  "title": "Vietnamese title",
  "titleEn": "English title",
  "emoji": "single emoji",
  "modules": [
    {
      "id": "module-1",
      "title": "Vietnamese module name",
      "titleEn": "English module name",
      "lessons": [
        {
          "id": "lesson-1",
          "moduleId": "module-1",
          "title": "Vietnamese lesson name",
          "titleEn": "English lesson name",
          "objectives": "Vietnamese description of what 3 phrases will be taught"
        }
      ]
    }
  ]
}`;
}

function parseCurriculumResponse(text: string, type: 'main' | 'side-quest', careerPathId?: string): Curriculum {
  const jsonStr = text.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
  const result = JSON.parse(jsonStr);

  const profile = getProfile();
  const id = `${type}-${Date.now()}`;

  // Set first lesson as current, rest as locked
  let firstLesson = true;
  for (const mod of result.modules) {
    for (const lesson of mod.lessons) {
      lesson.status = firstLesson ? 'current' : 'locked';
      firstLesson = false;
    }
  }

  const curriculum: Curriculum = {
    id,
    type,
    careerPathId,
    title: result.title,
    titleEn: result.titleEn,
    emoji: result.emoji,
    modules: result.modules,
    currentLessonId: result.modules[0]?.lessons[0]?.id ?? null,
    createdAt: new Date().toISOString().split('T')[0],
    cefrLevel: profile.cefrLevel,
  };

  return curriculum;
}

export async function generateCurriculum(
  careerPathId: string,
  accessToken: string
): Promise<Curriculum> {
  const profile = getProfile();
  const prompt = buildCurriculumPrompt(careerPathId, profile.cefrLevel, profile.goals);

  const res = await fetch('/api/curriculum', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const { text } = await res.json();
  if (!text) throw new Error('Empty response');

  const curriculum = parseCurriculumResponse(text, 'main', careerPathId);
  addCurriculum(curriculum);
  return curriculum;
}

export async function generateSideQuest(
  topic: string,
  accessToken: string
): Promise<Curriculum> {
  const profile = getProfile();
  const prompt = buildSideQuestPrompt(topic, profile.cefrLevel);

  const res = await fetch('/api/curriculum', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const { text } = await res.json();
  if (!text) throw new Error('Empty response');

  const curriculum = parseCurriculumResponse(text, 'side-quest');
  addCurriculum(curriculum);
  return curriculum;
}
