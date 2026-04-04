import { supabase } from './supabase';

// ── Types ───────────────────────────────────────────────────
export interface SubscriptionState {
  isPremium: boolean;
  trialEndsAt: string | null;
  sessionCount: number;
  lastSessionDate: string;
}

const STORAGE_KEY = 'easybee_subscription';

// ── Helpers ─────────────────────────────────────────────────
function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function defaultState(): SubscriptionState {
  return { isPremium: false, trialEndsAt: null, sessionCount: 0, lastSessionDate: '' };
}

// ── Read / Write ────────────────────────────────────────────
export function getSubscription(): SubscriptionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function saveSubscription(state: SubscriptionState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── Gating Logic ────────────────────────────────────────────

/**
 * Returns true if user can start a session.
 * Premium: always.
 * Free: checks monthly usage (45 min/month limit).
 * Falls back to old session-count check if usage lib unavailable.
 */
export function checkCanStartSession(): boolean {
  const sub = getSubscription();
  if (sub.isPremium) return true;

  // Check monthly time limit (imported lazily to avoid circular deps)
  try {
    // Dynamic check via localStorage directly
    const STORAGE_KEY = 'easybee_monthly_usage';
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const { month, secondsUsed } = JSON.parse(raw);
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      if (month === currentMonth && secondsUsed >= 2700) return false;
    }
  } catch {}

  return true;
}

/** Bump session count for today */
export function incrementSessionCount(): void {
  const sub = getSubscription();
  const today = todayISO();
  if (sub.lastSessionDate !== today) {
    sub.sessionCount = 1;
    sub.lastSessionDate = today;
  } else {
    sub.sessionCount += 1;
  }
  saveSubscription(sub);
}

/** Set premium status locally + sync to Supabase */
export async function setPremium(isPremium: boolean): Promise<void> {
  const sub = getSubscription();
  sub.isPremium = isPremium;
  if (isPremium && !sub.trialEndsAt) {
    const trial = new Date();
    trial.setDate(trial.getDate() + 7);
    sub.trialEndsAt = trial.toISOString();
  }
  saveSubscription(sub);

  // Sync to Supabase
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('user_profiles')
        .upsert({ user_id: user.id, is_premium: isPremium, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    }
  } catch (e) {
    console.error('Failed to sync premium status to Supabase:', e);
  }
}

/** Check if a voice requires premium — all 4 tutors are now free */
export function isPremiumVoice(_persona: string): boolean {
  return false; // All 4 tutors unlocked for all users
}

export function isPremiumMode(mode: string): boolean {
  return mode === 'ielts';
}
