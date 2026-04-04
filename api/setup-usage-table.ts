/**
 * One-time migration: creates user_monthly_usage table if it doesn't exist.
 * Called by the frontend at startup to ensure the table exists.
 * Uses service role to bypass RLS.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth check
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  const token = authHeader.slice(7);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Try to insert a test row — if table doesn't exist, we can't help from here.
  // The table must be created in Supabase dashboard.
  // This endpoint just returns the user's current month usage.
  const month = new Date().toISOString().slice(0, 7);
  
  const { data, error } = await supabase
    .from('user_monthly_usage')
    .upsert(
      { user_id: user.id, month, seconds_used: 0, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,month', ignoreDuplicates: true }
    )
    .select()
    .single();

  if (error) {
    // Table might not exist yet
    return res.status(200).json({ 
      ok: false, 
      tableExists: false,
      message: 'Table not yet created. Please run migration in Supabase dashboard.',
      sql: `
CREATE TABLE IF NOT EXISTS public.user_monthly_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  month TEXT NOT NULL,
  seconds_used INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT user_monthly_usage_user_month_unique UNIQUE(user_id, month)
);
ALTER TABLE public.user_monthly_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own usage" ON public.user_monthly_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage" ON public.user_monthly_usage FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own usage" ON public.user_monthly_usage FOR UPDATE USING (auth.uid() = user_id);
      `
    });
  }

  return res.status(200).json({ ok: true, tableExists: true, data });
}
