// --- Types ---
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Phrase {
  english: string;
  vietnamese: string;
}

export interface SessionRecord {
  date: string; // ISO date
  topic: string;
  phrases: Phrase[];
  summary: string;
  nextPlan: string;
  cefrAssessment: CEFRLevel;
  voice?: string;           // tutor persona id e.g. "thay-bee"
  mode?: 'conversation' | 'ielts';
  durationSeconds?: number; // session length in seconds
}

export interface UserProfile {
  cefrLevel: CEFRLevel;
  goals: string; // e.g. "travel", "work", "daily conversation"
  streak: number;
  lastSessionDate: string; // ISO date
  totalSessions: number;
  totalPhrases: number;
  careerPathId: string | null;
}

export interface BankedPhrase {
  english: string;
  vietnamese: string;
  learnedDate: string;       // ISO date
  reviewCount: number;
  lastReviewDate: string;
  careerPathId: string | null;
  categoryId: string | null;
  masteryLevel: number;       // 0-3 (0=new, 1=seen, 2=practiced, 3=mastered)
}

export interface AppData {
  profile: UserProfile;
  sessions: SessionRecord[];
}

import { supabase } from './supabase';

const STORAGE_KEY = 'easybee_data';

// --- Default ---
const DEFAULT_PROFILE: UserProfile = {
  cefrLevel: 'A1',
  goals: '',
  streak: 0,
  lastSessionDate: '',
  totalSessions: 0,
  totalPhrases: 0,
  careerPathId: null,
};

const PHRASES_KEY = 'easybee_phrases';

// --- Read ---
export function loadAppData(): AppData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AppData;
  } catch {
    return null;
  }
}

export function getProfile(): UserProfile {
  const data = loadAppData();
  return data?.profile ?? { ...DEFAULT_PROFILE };
}

export function getSessions(): SessionRecord[] {
  const data = loadAppData();
  return data?.sessions ?? [];
}

export function getLastSession(): SessionRecord | null {
  const sessions = getSessions();
  return sessions.length > 0 ? sessions[sessions.length - 1] : null;
}

export function isNewUser(): boolean {
  return loadAppData() === null;
}

// --- Write ---
function saveAppData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveSessionResult(
  session: SessionRecord,
  updatedProfile: Partial<UserProfile>
): void {
  const data = loadAppData() ?? { profile: { ...DEFAULT_PROFILE }, sessions: [] };

  // Update profile
  Object.assign(data.profile, updatedProfile);

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  const lastDate = data.profile.lastSessionDate;
  if (lastDate) {
    const lastDay = new Date(lastDate);
    const todayDay = new Date(today);
    const diffDays = Math.floor(
      (todayDay.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 1) {
      data.profile.streak += 1;
    } else if (diffDays > 1) {
      data.profile.streak = 1; // Reset streak
    }
    // Same day = no streak change
  } else {
    data.profile.streak = 1; // First session
  }

  data.profile.lastSessionDate = today;
  data.profile.totalSessions += 1;
  data.profile.totalPhrases += session.phrases.length;

  // Bank phrases (separate localStorage key, keeps ALL phrases forever)
  if (session.phrases.length > 0) {
    bankPhrases(session.phrases);
  }

  // Add session
  data.sessions.push(session);

  // Keep only last 20 sessions to avoid localStorage bloat
  if (data.sessions.length > 20) {
    data.sessions = data.sessions.slice(-20);
  }

  saveAppData(data);

  // Async sync to Supabase (fire-and-forget)
  upsertProfileToSupabase();
}

// --- Helpers for system instruction ---
export function getReviewPhrases(count: number = 3): Phrase[] {
  const sessions = getSessions();
  if (sessions.length === 0) return [];

  // Collect all phrases from recent sessions, newest first
  const allPhrases: Phrase[] = [];
  for (let i = sessions.length - 1; i >= 0; i--) {
    for (const p of sessions[i].phrases) {
      allPhrases.push(p);
    }
    if (allPhrases.length >= count * 2) break;
  }

  // Shuffle and pick
  const shuffled = allPhrases.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function updateGoals(goals: string): void {
  const data = loadAppData() ?? { profile: { ...DEFAULT_PROFILE }, sessions: [] };
  data.profile.goals = goals;
  saveAppData(data);
}

// --- Phrase Bank ---
export function loadPhraseBank(): BankedPhrase[] {
  try {
    const raw = localStorage.getItem(PHRASES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BankedPhrase[];
  } catch {
    return [];
  }
}

function savePhraseBank(phrases: BankedPhrase[]): void {
  localStorage.setItem(PHRASES_KEY, JSON.stringify(phrases));
}

export function bankPhrases(newPhrases: Phrase[]): void {
  const bank = loadPhraseBank();
  const today = new Date().toISOString().split('T')[0];
  const index = new Map(bank.map((p, i) => [p.english.toLowerCase(), i]));

  for (const np of newPhrases) {
    const key = np.english.toLowerCase();
    const existing = index.get(key);
    if (existing !== undefined) {
      bank[existing].reviewCount += 1;
      bank[existing].lastReviewDate = today;
      bank[existing].masteryLevel = Math.min(3, bank[existing].masteryLevel + 1);
    } else {
      bank.push({
        english: np.english,
        vietnamese: np.vietnamese,
        learnedDate: today,
        reviewCount: 0,
        lastReviewDate: today,
        careerPathId: null,
        categoryId: null,
        masteryLevel: 0,
      });
      index.set(key, bank.length - 1);
    }
  }
  savePhraseBank(bank);
}

export function updatePhraseMappings(
  mappings: { english: string; careerPathId: string | null; categoryId: string | null }[]
): void {
  const bank = loadPhraseBank();
  const index = new Map(bank.map((p, i) => [p.english.toLowerCase(), i]));
  for (const m of mappings) {
    const idx = index.get(m.english.toLowerCase());
    if (idx !== undefined) {
      bank[idx].careerPathId = m.careerPathId;
      bank[idx].categoryId = m.categoryId;
    }
  }
  savePhraseBank(bank);
}

export function getPhrasesForCareerPath(careerPathId: string): BankedPhrase[] {
  return loadPhraseBank().filter(p => p.careerPathId === careerPathId);
}

export function saveCareerPath(careerPathId: string): void {
  const data = loadAppData() ?? { profile: { ...DEFAULT_PROFILE }, sessions: [] };
  data.profile.careerPathId = careerPathId;
  saveAppData(data);
}

// --- Supabase Sync ---

export async function upsertProfileToSupabase(): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const appData = loadAppData();
    if (!appData) return;

    const { profile, sessions } = appData;
    const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;

    await supabase.from('user_profiles').upsert({
      user_id: user.id,
      cefr_level: profile.cefrLevel,
      goals: profile.goals,
      streak: profile.streak,
      total_sessions: profile.totalSessions,
      total_phrases: profile.totalPhrases,
      last_session: lastSession,
      sessions: sessions,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  } catch (err) {
    console.error('Supabase profile sync failed:', err);
  }
}

export async function saveVoicePreference(voiceId: string, accessToken?: string): Promise<void> {
  localStorage.setItem('easybee_voice', voiceId);
  try {
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (!user) return;
    await supabase.from('user_profiles').upsert({
      user_id: user.id,
      voice_preference: voiceId,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  } catch (err) {
    console.error('Voice preference sync failed:', err);
  }
}

export async function syncProfileFromSupabase(accessToken: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error || !data) return;

    // Sync voice preference
    if (data.voice_preference && !localStorage.getItem('easybee_voice')) {
      localStorage.setItem('easybee_voice', data.voice_preference);
    }

    const localData = loadAppData();
    const localProfile = localData?.profile ?? { ...DEFAULT_PROFILE };
    const localSessions = localData?.sessions ?? [];

    // Merge: prefer whichever has more sessions (more data = more recent)
    const remoteProfile: UserProfile = {
      cefrLevel: (data.cefr_level as CEFRLevel) || localProfile.cefrLevel,
      goals: data.goals || localProfile.goals,
      streak: Math.max(data.streak || 0, localProfile.streak),
      lastSessionDate: localProfile.lastSessionDate,
      totalSessions: Math.max(data.total_sessions || 0, localProfile.totalSessions),
      totalPhrases: Math.max(data.total_phrases || 0, localProfile.totalPhrases),
      careerPathId: localProfile.careerPathId || (data as Record<string, unknown>).career_path_id as string || null,
    };

    const remoteSessions = (data.sessions as SessionRecord[]) || [];
    const mergedSessions = remoteSessions.length > localSessions.length ? remoteSessions : localSessions;

    saveAppData({ profile: remoteProfile, sessions: mergedSessions });
  } catch (err) {
    console.error('Supabase profile fetch failed:', err);
  }
}
