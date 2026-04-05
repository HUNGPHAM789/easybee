import {
  type Phrase,
  type SessionRecord,
  type CEFRLevel,
  getProfile,
  getLastSession,
  saveSessionResult,
  updatePhraseMappings,
} from './profile';
import {
  getMainCurriculum,
  getActiveSideQuest,
  getCurrentLesson,
  getModuleForLesson,
  markLessonComplete,
  advanceToNextLesson,
  generateSideQuest,
} from './curriculum-path';

/**
 * Post-session analysis agent.
 * Calls /api/curriculum serverless function to keep API key server-side.
 */
export async function analyzeSession(
  learnedPhrases: Phrase[],
  tutorTranscript: string[],
  sessionTopic: string,
  accessToken: string,
  mode: 'conversation' | 'ielts' = 'conversation',
  voice?: string,
  durationSeconds?: number
): Promise<SessionRecord | null> {
  if (learnedPhrases.length === 0 && tutorTranscript.length === 0) return null;

  const profile = getProfile();
  const lastSession = getLastSession();

  const phrasesText = learnedPhrases
    .map((p, i) => `${i + 1}. ${p.english} — ${p.vietnamese}`)
    .join('\n');

  const transcriptText = tutorTranscript
    .filter(t => t.trim())
    .slice(-15)
    .join('\n---\n');

  // Build curriculum context for prompt
  const sideQuest = getActiveSideQuest();
  const mainCurr = getMainCurriculum();
  const activeCurr = sideQuest ?? mainCurr;
  let curriculumContext = '';
  if (activeCurr) {
    const lesson = getCurrentLesson(activeCurr);
    const mod = lesson ? getModuleForLesson(activeCurr, lesson.id) : null;
    if (lesson && mod) {
      curriculumContext = `\nCURRICULUM CONTEXT:
- Active path: ${activeCurr.titleEn}${sideQuest ? ' (side quest)' : ''}
- Current lesson: ${lesson.titleEn} — ${lesson.objectives}
- Module: ${mod.titleEn}`;
    }
  }

  const prompt = mode === 'ielts'
    ? `You are a curriculum analyst for EasyBee IELTS Speaking mode.

Analyze this IELTS practice session and respond in EXACTLY this JSON format (no markdown, no code blocks, just raw JSON):

{
  "summary": "1-2 sentence Vietnamese summary of the IELTS practice",
  "cefrLevel": "A2 or B1 or B2 or C1",
  "nextTopic": "suggested next IELTS topic in Vietnamese",
  "nextPlan": "2-3 sentence Vietnamese plan for next IELTS session",
  "ieltsScores": { "band": "5.5", "fc": "5", "lr": "6", "gra": "5", "p": "6" },
  "phraseMapping": [
    { "english": "exact phrase text", "careerPathId": "ielts-speaking", "categoryId": "opinion" }
  ]
}

IELTS PHRASE CATEGORIES (for phraseMapping):
- ielts-speaking: opinion, hedging, linking, examples, comparing, buying-time

For each phrase learned, assign the best-matching categoryId from above.

CONTEXT:
- Current CEFR level: ${profile.cefrLevel}
- Total sessions completed: ${profile.totalSessions}
- Last session topic: ${lastSession?.topic || 'first session'}

PHRASES LEARNED THIS SESSION:
${phrasesText || 'No structured phrases detected'}

TUTOR TRANSCRIPT (last messages):
${transcriptText || 'No transcript available'}

RULES:
- Summary must be in Vietnamese
- nextPlan must be in Vietnamese, focused on IELTS improvement
- Extract band scores from transcript if AI gave them, otherwise estimate from performance
- nextTopic should be an IELTS topic area (Part 1/2/3 with specific theme)
- Keep nextPlan encouraging and specific about how to improve band score`
    : `You are a curriculum analyst for EasyBee, a Vietnamese-English tutoring app.

Analyze this tutoring session and respond in EXACTLY this JSON format (no markdown, no code blocks, just raw JSON):

{
  "summary": "1-2 sentence Vietnamese summary of what was taught",
  "cefrLevel": "A1 or A2 or B1 or B2",
  "nextTopic": "suggested next topic in Vietnamese",
  "nextPlan": "2-3 sentence Vietnamese description of what to teach next session",
  "phraseMapping": [
    { "english": "exact phrase text", "careerPathId": "nail-salon", "categoryId": "greeting" }
  ]${activeCurr ? `,
  "lessonCompleted": true,
  "offTopic": { "detected": false, "topic": "", "scope": "single" }` : ''}
}

CAREER PATH CATEGORIES (for phraseMapping):
- nail-salon: greeting, services, pricing, smalltalk, problems, tips
- permanent-makeup: consultation, procedure, aftercare, pricing
- daily-life: shopping, healthcare, school, neighbors, restaurant, emergency
- restaurant: greeting, ordering, menu, payment, complaints

For each phrase learned, assign the best-matching careerPathId and categoryId.
If a phrase doesn't fit any career path, use careerPathId: null, categoryId: null.

CONTEXT:
- Current CEFR level: ${profile.cefrLevel}
- User goals: ${profile.goals || 'not set yet'}
- Total sessions completed: ${profile.totalSessions}
- Last session topic: ${lastSession?.topic || 'first session'}
- This session topic: ${sessionTopic || 'unknown'}${curriculumContext}

PHRASES LEARNED THIS SESSION:
${phrasesText || 'No structured phrases detected'}

TUTOR TRANSCRIPT (last messages):
${transcriptText || 'No transcript available'}

RULES:
- Summary must be in Vietnamese
- nextPlan must be in Vietnamese
- CEFR assessment should be based on the complexity of phrases the student could handle
- nextTopic should logically follow from current topic and user goals
- For beginners, suggest simple practical topics: greetings, self-intro, numbers, food, directions, shopping
- Keep nextPlan encouraging and specific${activeCurr ? `
- "lessonCompleted": set to true if the student practiced the curriculum lesson topic and learned relevant phrases. false if the session was mostly off-topic.
- "offTopic": if student spent most time on a topic OUTSIDE the curriculum lesson, set detected=true, topic=the topic they discussed, scope="multi" if it needs 2+ lessons to cover properly or "single" if one session was enough` : ''}`;

  try {
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
    if (!text) return null;

    const jsonStr = text.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(jsonStr);

    const today = new Date().toISOString().split('T')[0];
    const sessionRecord: SessionRecord = {
      date: today,
      topic: sessionTopic || result.nextTopic || 'general',
      phrases: learnedPhrases,
      summary: result.summary || '',
      nextPlan: result.nextPlan || '',
      cefrAssessment: (result.cefrLevel as CEFRLevel) || profile.cefrLevel,
      voice,
      mode,
      durationSeconds,
    };

    saveSessionResult(sessionRecord, {
      cefrLevel: sessionRecord.cefrAssessment,
    });

    // Update phrase bank with career path mappings
    if (result.phraseMapping && Array.isArray(result.phraseMapping)) {
      updatePhraseMappings(result.phraseMapping);
    }

    // ── Curriculum progression ──
    if (activeCurr && activeCurr.currentLessonId) {
      if (result.lessonCompleted) {
        markLessonComplete(activeCurr.id, activeCurr.currentLessonId, learnedPhrases.length);
        advanceToNextLesson(activeCurr.id);
      }

      // Side quest generation (fire-and-forget)
      if (result.offTopic?.detected && result.offTopic.scope === 'multi' && !getActiveSideQuest()) {
        generateSideQuest(result.offTopic.topic, accessToken).catch(err =>
          console.error('Side quest generation failed:', err)
        );
      }
    }

    return sessionRecord;
  } catch (error) {
    console.error('Curriculum analysis failed:', error);

    const today = new Date().toISOString().split('T')[0];
    const fallbackRecord: SessionRecord = {
      date: today,
      topic: sessionTopic || 'general',
      phrases: learnedPhrases,
      summary: `Da hoc ${learnedPhrases.length} cum tu moi.`,
      nextPlan: 'Tiep tuc luyen tap va hoc them cum tu moi.',
      cefrAssessment: profile.cefrLevel,
      voice,
      mode,
      durationSeconds,
    };

    saveSessionResult(fallbackRecord, {});
    return fallbackRecord;
  }
}
