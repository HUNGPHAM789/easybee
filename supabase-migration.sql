-- EasyBee Migration: user_monthly_usage table
-- Run this in Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS public.user_monthly_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  month TEXT NOT NULL,  -- format: 'YYYY-MM'
  seconds_used INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT user_monthly_usage_user_month_unique UNIQUE(user_id, month)
);

CREATE INDEX IF NOT EXISTS idx_user_monthly_usage_user_month 
  ON public.user_monthly_usage(user_id, month);

-- Enable Row Level Security
ALTER TABLE public.user_monthly_usage ENABLE ROW LEVEL SECURITY;

-- Policies: users can only read/write their own usage
CREATE POLICY "Users can read own usage" 
  ON public.user_monthly_usage 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage" 
  ON public.user_monthly_usage 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage" 
  ON public.user_monthly_usage 
  FOR UPDATE USING (auth.uid() = user_id);

-- Optional: Service role can manage all
CREATE POLICY "Service role full access"
  ON public.user_monthly_usage
  FOR ALL USING (auth.role() = 'service_role');

-- ═══════════════════════════════════════════════════════════
-- Feedback table
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_email TEXT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access feedback"
  ON public.feedback FOR ALL
  USING (auth.role() = 'service_role');
