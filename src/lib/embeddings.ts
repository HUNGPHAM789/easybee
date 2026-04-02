/**
 * Embeddings helper for smart phrase matching.
 * Uses /api/embed (Gemini Embedding 001, 3072-dim vectors).
 * 
 * Use cases:
 * - Match user intent to career path phrases
 * - Detect duplicate phrases in the bank
 * - Find semantically similar phrases for review
 */

// In-memory embedding cache: text → vector
const cache = new Map<string, number[]>();

let authToken = '';

export function setEmbedAuthToken(token: string) {
  authToken = token;
}

/**
 * Embed a single text string.
 */
export async function embedText(text: string): Promise<number[]> {
  const key = text.toLowerCase().trim();
  if (cache.has(key)) return cache.get(key)!;

  const res = await fetch('/api/embed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error(`Embed failed: ${res.status}`);
  const { embedding } = await res.json();
  cache.set(key, embedding);
  return embedding;
}

/**
 * Embed multiple texts in one request (batch).
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await fetch('/api/embed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ texts }),
  });

  if (!res.ok) throw new Error(`Batch embed failed: ${res.status}`);
  const { embeddings } = await res.json();

  // Cache each
  texts.forEach((t, i) => {
    cache.set(t.toLowerCase().trim(), embeddings[i]);
  });

  return embeddings;
}

/**
 * Cosine similarity between two vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Find the most similar phrases from a list.
 * Returns sorted by similarity (highest first).
 */
export async function findSimilarPhrases(
  query: string,
  phrases: { english: string; vietnamese: string }[],
  topN: number = 5
): Promise<{ phrase: { english: string; vietnamese: string }; score: number }[]> {
  if (phrases.length === 0) return [];

  const queryVec = await embedText(query);

  // Embed all phrases (batch)
  const phraseTexts = phrases.map(p => `${p.english} ${p.vietnamese}`);
  const needEmbed = phraseTexts.filter(t => !cache.has(t.toLowerCase().trim()));

  if (needEmbed.length > 0) {
    await embedBatch(needEmbed);
  }

  // Score each phrase
  const scored = phrases.map((p, i) => {
    const vec = cache.get(phraseTexts[i].toLowerCase().trim());
    if (!vec) return { phrase: p, score: 0 };
    return { phrase: p, score: cosineSimilarity(queryVec, vec) };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

/**
 * Check if a phrase is a duplicate of existing phrases.
 * Returns true if similarity > threshold (default 0.9).
 */
export async function isDuplicate(
  newPhrase: string,
  existingPhrases: string[],
  threshold: number = 0.9
): Promise<{ isDuplicate: boolean; mostSimilar?: string; score: number }> {
  if (existingPhrases.length === 0) return { isDuplicate: false, score: 0 };

  const newVec = await embedText(newPhrase);

  // Embed existing (use cache)
  const needEmbed = existingPhrases.filter(t => !cache.has(t.toLowerCase().trim()));
  if (needEmbed.length > 0) {
    await embedBatch(needEmbed);
  }

  let maxScore = 0;
  let mostSimilar = '';

  for (const existing of existingPhrases) {
    const vec = cache.get(existing.toLowerCase().trim());
    if (!vec) continue;
    const score = cosineSimilarity(newVec, vec);
    if (score > maxScore) {
      maxScore = score;
      mostSimilar = existing;
    }
  }

  return {
    isDuplicate: maxScore >= threshold,
    mostSimilar: mostSimilar || undefined,
    score: maxScore,
  };
}

/**
 * Match a user's stated goal/job to the best career path.
 * Faster than asking Gemini — pure vector similarity.
 */
export async function matchCareerPath(
  userText: string
): Promise<{ pathId: string; score: number }[]> {
  const careerDescriptions: Record<string, string> = {
    'nail-salon': 'nail salon manicure pedicure gel acrylic customer tip payment tiệm nail thợ nail',
    'permanent-makeup': 'permanent makeup PMU phun xăm microblading lip tattoo brow lông mày',
    'daily-life': 'daily life shopping grocery doctor hospital school neighbor mua sắm bác sĩ trường',
    'restaurant': 'restaurant food waiter order menu kitchen nhà hàng phục vụ order đồ ăn',
    'ielts-speaking': 'IELTS speaking exam test band score fluency vocabulary grammar thi IELTS',
  };

  const userVec = await embedText(userText);
  const results: { pathId: string; score: number }[] = [];

  for (const [pathId, desc] of Object.entries(careerDescriptions)) {
    const descVec = await embedText(desc);
    results.push({ pathId, score: cosineSimilarity(userVec, descVec) });
  }

  return results.sort((a, b) => b.score - a.score);
}
