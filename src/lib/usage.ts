/**
 * Monthly usage tracking for EasyBee free tier.
 * Free tier: 2700 seconds (45 minutes) per calendar month.
 * Syncs with Supabase table: user_monthly_usage (user_id, month, seconds_used).
 * Falls back to localStorage if Supabase is unavailable.
 */

import { supabase } from './supabase';

const FREE_TIER_SECONDS = 2700; // 45 minutes
const STORAGE_KEY = 'easybee_monthly_usage';

// ── Types ────────────────────────────────────────────────────
export interface MonthlyUsage {
  month: string; // 'YYYY-MM'
  secondsUsed: number;
}

// ── Helpers ──────────────────────────────────────────────────
function currentMonth(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

// ── Local state ───────────────────────────────────────────────
function loadLocal(): MonthlyUsage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { month: currentMonth(), secondsUsed: 0 };
    const parsed = JSON.parse(raw) as MonthlyUsage;
    // Auto-reset if new month
    if (parsed.month !== currentMonth()) {
      return { month: currentMonth(), secondsUsed: 0 };
    }
    return parsed;
  } catch {
    return { month: currentMonth(), secondsUsed: 0 };
  }
}

function saveLocal(usage: MonthlyUsage): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  } catch {}
}

// ── Supabase sync ─────────────────────────────────────────────

/**
 * Fetch usage from Supabase for this month.
 * Returns null if table doesn't exist or user not logged in.
 */
async function fetchRemoteUsage(userId: string): Promise<number | null> {
  const month = currentMonth();
  try {
    const { data, error } = await supabase
      .from('user_monthly_usage')
      .select('seconds_used')
      .eq('user_id', userId)
      .eq('month', month)
      .single();

    if (error) {
      // Table might not exist yet, or no row — both return null gracefully
      return null;
    }
    return data?.seconds_used ?? 0;
  } catch {
    return null;
  }
}

/**
 * Upsert usage to Supabase (fire-and-forget).
 * Creates the row if it doesn't exist.
 */
async function syncRemoteUsage(userId: string, secondsUsed: number): Promise<void> {
  const month = currentMonth();
  try {
    await supabase.from('user_monthly_usage').upsert(
      {
        user_id: userId,
        month,
        seconds_used: secondsUsed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,month' }
    );
  } catch {
    // Silently fail — local is source of truth for now
  }
}

// ── Public API ────────────────────────────────────────────────

/**
 * Get current month's usage for a user.
 * Tries Supabase first, falls back to localStorage.
 */
export async function getMonthlyUsage(userId?: string): Promise<MonthlyUsage> {
  const local = loadLocal();

  if (!userId) return local;

  // Try remote
  const remote = await fetchRemoteUsage(userId);
  if (remote !== null) {
    const usage = { month: currentMonth(), secondsUsed: remote };
    saveLocal(usage);
    return usage;
  }

  return local;
}

/**
 * Get remaining seconds this month (sync, from localStorage).
 */
export function getRemainingSecondsSync(): number {
  const usage = loadLocal();
  return Math.max(0, FREE_TIER_SECONDS - usage.secondsUsed);
}

/**
 * Get remaining minutes (display-ready).
 */
export function getRemainingMinutes(): number {
  return Math.floor(getRemainingSecondsSync() / 60);
}

/**
 * Check if user can start a session (has remaining time).
 */
export function canStartFreeSession(): boolean {
  return getRemainingSecondsSync() > 0;
}

/**
 * Add seconds to usage (call when session ends or periodically).
 * Syncs to Supabase.
 */
export async function addUsageSeconds(
  seconds: number,
  userId?: string
): Promise<void> {
  if (seconds <= 0) return;
  const usage = loadLocal();
  usage.secondsUsed = Math.min(
    usage.secondsUsed + seconds,
    FREE_TIER_SECONDS + 300 // allow slight overage
  );
  saveLocal(usage);

  if (userId) {
    syncRemoteUsage(userId, usage.secondsUsed);
  }
}

export const FREE_SECONDS = FREE_TIER_SECONDS;
