import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMBED_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  // Auth check
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }
  const token = authHeader.slice(7);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

  if (!GEMINI_API_KEY) return res.status(500).json({ error: 'No API key' });

  try {
    const { texts, text } = req.body;

    // Single text embedding
    if (text && typeof text === 'string') {
      const embedding = await embedText(text);
      return res.status(200).json({ embedding });
    }

    // Batch embedding (array of texts)
    if (texts && Array.isArray(texts)) {
      const embeddings: number[][] = [];
      for (const t of texts.slice(0, 50)) { // max 50 per request
        embeddings.push(await embedText(t));
      }
      return res.status(200).json({ embeddings });
    }

    return res.status(400).json({ error: 'Provide "text" (string) or "texts" (string[])' });
  } catch (err: any) {
    console.error('Embed API error:', err);
    return res.status(500).json({ error: err.message?.substring(0, 200) || 'Embedding failed' });
  }
}

async function embedText(text: string): Promise<number[]> {
  const response = await fetch(`${EMBED_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'models/gemini-embedding-001',
      content: { parts: [{ text }] },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Embedding API ${response.status}: ${err.substring(0, 100)}`);
  }

  const data = await response.json();
  return data.embedding?.values || [];
}
