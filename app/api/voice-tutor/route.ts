import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are an English pronunciation tutor for Vietnamese nail salon workers in America.

LANGUAGE RULES:
- Speak Vietnamese for ALL explanations, encouragement, and instructions
- Speak English ONLY when:
  1. Saying the target phrase/sentence for the student to repeat
  2. Giving pronunciation feedback on specific English words
- Never mix: each sentence is either fully Vietnamese or fully English

PERSONALITY:
- Warm, patient, encouraging — like a friendly older sister
- Use simple Vietnamese (not academic)
- Celebrate small wins: "Tốt lắm!" "Giỏi quá!"
- Never make the student feel bad about mistakes

FLOW:
1. Greet in Vietnamese, introduce the phrase to practice
2. Say the English phrase clearly and slowly
3. Ask student to repeat: "Bây giờ bạn thử nói nhé"
4. Listen to their attempt
5. Give feedback in Vietnamese about what to improve
6. If specific sounds need work, say the English word again slowly
7. Have them try again (max 3 attempts per phrase)
8. Move to next phrase or celebrate completion

Keep responses SHORT — 2-3 sentences max. This is voice conversation, not an essay.`;

type Message = { role: "user" | "model"; text: string };

export async function POST(req: Request) {
  const { message, history, lessonContext } = (await req.json()) as {
    message: string;
    history?: Message[];
    lessonContext?: string;
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  const client = new GoogleGenAI({ apiKey });

  const systemInstruction = lessonContext
    ? `${SYSTEM_PROMPT}\n\nCONTEXT: The student is practicing these phrases:\n${lessonContext}`
    : SYSTEM_PROMPT;

  const contents = (history ?? []).map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));
  contents.push({ role: "user", parts: [{ text: message }] });

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    });

    const text = response.text ?? "";
    return Response.json({ text });
  } catch (e: unknown) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    console.error("Gemini API error:", errMsg);
    return Response.json({ error: errMsg }, { status: 500 });
  }
}
