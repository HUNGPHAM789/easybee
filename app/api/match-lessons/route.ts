import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { modules } from "@/lib/content/index";

const GEMINI_API_KEY = "AIzaSyCLlEOAAKPC052t6U0kjTQ2l0lC3-mUPAw";
const EMBED_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent";

type EmbeddingsData = {
  lessons: Record<string, number[]>;
  classes: Record<string, number[]>;
  modules: Record<string, number[]>;
};

let cachedEmbeddings: EmbeddingsData | null = null;

function loadEmbeddings(): EmbeddingsData {
  if (cachedEmbeddings) return cachedEmbeddings;
  const raw = readFileSync(join(process.cwd(), "lib", "embeddings.json"), "utf-8");
  cachedEmbeddings = JSON.parse(raw);
  return cachedEmbeddings!;
}

function cosineSim(a: number[], b: number[]): number {
  let dot = 0,
    magA = 0,
    magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// Build a flat lesson lookup from modules
const allLessons = modules.flatMap((m) =>
  m.classes.flatMap((c) =>
    c.lessons.map((l) => ({ id: l.id, title: l.title, titleVi: l.titleVi }))
  )
);

export async function POST(req: Request) {
  try {
    const { text, topN = 10 } = (await req.json()) as {
      text: string;
      topN?: number;
    };

    if (!text?.trim()) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    // Embed user text via Gemini
    const embedRes = await fetch(`${EMBED_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "models/gemini-embedding-001",
        content: { parts: [{ text: text.trim() }] },
      }),
    });

    if (!embedRes.ok) {
      const err = await embedRes.text();
      return NextResponse.json(
        { error: "Embedding API failed", detail: err },
        { status: 502 }
      );
    }

    const embedData = await embedRes.json();
    const userVec: number[] = embedData.embedding?.values;
    if (!userVec?.length) {
      return NextResponse.json(
        { error: "No embedding returned" },
        { status: 502 }
      );
    }

    // Load pre-computed embeddings
    const embeddings = loadEmbeddings();

    // Score all lessons
    const scored = Object.entries(embeddings.lessons)
      .map(([lessonId, vec]) => ({
        lessonId,
        score: cosineSim(userVec, vec),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);

    // Enrich with title info
    const matches = scored.map((s) => {
      const info = allLessons.find((l) => l.id === s.lessonId);
      return {
        lessonId: s.lessonId,
        title: info?.title ?? "",
        titleVi: info?.titleVi ?? "",
        score: Math.round(s.score * 1000) / 1000,
      };
    });

    // Module-level match
    const moduleScored = Object.entries(embeddings.modules)
      .map(([modId, vec]) => ({
        moduleId: modId,
        score: cosineSim(userVec, vec),
      }))
      .sort((a, b) => b.score - a.score);

    return NextResponse.json({
      matches,
      topModule: moduleScored[0] ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal error", detail: String(err) },
      { status: 500 }
    );
  }
}
