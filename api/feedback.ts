import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'henrypham0310@gmail.com';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  // POST — submit feedback
  if (req.method === 'POST') {
    const { rating, message } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be 1-5' });
    }

    const { error } = await supabase.from('feedback').insert({
      user_id: user.id,
      user_email: user.email || 'guest',
      rating,
      message: message || '',
    });

    if (error) {
      console.error('Feedback insert failed:', error);
      return res.status(500).json({ error: 'Failed to save feedback' });
    }

    return res.status(200).json({ success: true });
  }

  // GET — admin: list all feedback
  if (req.method === 'GET') {
    if (user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Admin only' });
    }

    const { data: feedback, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Feedback fetch failed:', error);
      return res.status(500).json({ error: 'Failed to fetch feedback' });
    }

    // Basic stats
    const total = feedback?.length ?? 0;
    const avgRating = total > 0
      ? (feedback!.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
      : '0';
    const byRating: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    feedback?.forEach(f => { byRating[f.rating] = (byRating[f.rating] || 0) + 1; });

    return res.status(200).json({
      feedback,
      stats: { total, avgRating: parseFloat(avgRating), byRating },
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
