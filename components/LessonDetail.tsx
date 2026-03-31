"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { Lesson } from "@/lib/content/index";
import SpeakButton from "./SpeakButton";
import ActionButton from "./ActionButton";
import WhisperText from "./ui/whisper-text";

type AdminEdits = Record<string, Record<string, unknown>>;

function getAdminEdits(): AdminEdits {
  try {
    const raw = localStorage.getItem("easybee_admin_edits");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAdminEdits(edits: AdminEdits) {
  try {
    localStorage.setItem("easybee_admin_edits", JSON.stringify(edits));
  } catch {
    // storage unavailable
  }
}

function applyEdits(lesson: Lesson): Lesson {
  const edits = getAdminEdits()[lesson.id];
  if (!edits) return lesson;

  const patched = { ...lesson };
  if (edits.title) patched.title = edits.title as string;
  if (edits.titleVi) patched.titleVi = edits.titleVi as string;
  if (edits.context) patched.context = edits.context as string;

  if (edits.phrases && Array.isArray(edits.phrases)) {
    patched.phrases = lesson.phrases.map((p, i) => {
      const pe = (edits.phrases as Record<string, string>[])?.[i];
      if (!pe) return p;
      return {
        english: pe.english ?? p.english,
        vietnamese: pe.vietnamese ?? p.vietnamese,
        pronunciation: pe.pronunciation ?? p.pronunciation,
      };
    });
  }

  if (edits.drill && Array.isArray(edits.drill)) {
    patched.drill = lesson.drill.map((d, i) => {
      const de = (edits.drill as Record<string, string>[])?.[i];
      if (!de) return d;
      return {
        ...d,
        prompt: de.prompt ?? d.prompt,
        hint: de.hint ?? d.hint,
        answer: de.answer ?? d.answer,
        answerHint: de.answerHint ?? d.answerHint,
      };
    });
  }

  return patched;
}

// Inline editable field
function EditableField({
  value,
  onSave,
  multiline = false,
  className = "",
}: {
  value: string;
  onSave: (val: string) => void;
  multiline?: boolean;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = useCallback(() => {
    setEditing(false);
    if (draft.trim() !== value) {
      onSave(draft.trim());
    }
  }, [draft, value, onSave]);

  if (editing) {
    if (multiline) {
      return (
        <textarea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          className={`w-full bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 outline-none text-neutral-900 resize-y ${className}`}
          rows={3}
        />
      );
    }
    return (
      <input
        autoFocus
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className={`w-full bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 outline-none text-neutral-900 ${className}`}
      />
    );
  }

  return (
    <span
      className={`cursor-pointer group inline ${className}`}
      onClick={() => { setDraft(value); setEditing(true); }}
    >
      {value}
      <span className="opacity-0 group-hover:opacity-100 ml-1 text-amber-500 text-xs">
        &#9998;
      </span>
    </span>
  );
}

export default function LessonDetail({
  lesson: rawLesson,
  onStartDrill,
  isAdmin = false,
}: {
  lesson: Lesson;
  onStartDrill: () => void;
  isAdmin?: boolean;
}) {
  const [lesson, setLesson] = useState(() => applyEdits(rawLesson));

  // Re-apply edits if rawLesson changes
  useEffect(() => {
    setLesson(applyEdits(rawLesson));
  }, [rawLesson]);

  const updateField = useCallback(
    (field: string, value: string) => {
      const all = getAdminEdits();
      const patch = all[rawLesson.id] || {};
      (patch as Record<string, unknown>)[field] = value;
      all[rawLesson.id] = patch;
      saveAdminEdits(all);
      setLesson(applyEdits(rawLesson));
    },
    [rawLesson],
  );

  const updatePhrase = useCallback(
    (index: number, field: string, value: string) => {
      const all = getAdminEdits();
      const patch = all[rawLesson.id] || {};
      if (!Array.isArray(patch.phrases)) {
        patch.phrases = rawLesson.phrases.map(() => ({}));
      }
      ((patch.phrases as Record<string, string>[])[index] ??= {})[field] = value;
      all[rawLesson.id] = patch;
      saveAdminEdits(all);
      setLesson(applyEdits(rawLesson));
    },
    [rawLesson],
  );

  const updateDrill = useCallback(
    (index: number, field: string, value: string) => {
      const all = getAdminEdits();
      const patch = all[rawLesson.id] || {};
      if (!Array.isArray(patch.drill)) {
        patch.drill = rawLesson.drill.map(() => ({}));
      }
      ((patch.drill as Record<string, string>[])[index] ??= {})[field] = value;
      all[rawLesson.id] = patch;
      saveAdminEdits(all);
      setLesson(applyEdits(rawLesson));
    },
    [rawLesson],
  );

  return (
    <div className="py-5 pr-1">
      {/* Context */}
      {isAdmin ? (
        <div className="text-sm text-neutral-500 leading-relaxed mb-6">
          <EditableField
            value={lesson.context}
            onSave={(v) => updateField("context", v)}
            multiline
            className="text-sm text-neutral-500"
          />
        </div>
      ) : (
        <p className="text-sm text-neutral-500 leading-relaxed mb-6">
          {lesson.context}
        </p>
      )}

      {/* Phrases */}
      <div className="space-y-3 mb-6">
        {lesson.phrases.map((phrase, i) => (
          <motion.div
            key={i}
            className="bg-neutral-50 rounded-2xl px-5 py-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.22, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              {isAdmin ? (
                <div className="text-base font-semibold text-neutral-900 flex-1">
                  <EditableField
                    value={phrase.english}
                    onSave={(v) => updatePhrase(i, "english", v)}
                    className="text-base font-semibold"
                  />
                </div>
              ) : (
                <p className="text-base font-semibold text-neutral-900">
                  <WhisperText
                    text={phrase.english}
                    delay={70}
                    duration={0.35}
                    y={5}
                    triggerStart="top 95%"
                  />
                </p>
              )}
              <SpeakButton text={phrase.english} />
            </div>

            {isAdmin ? (
              <>
                <div className="text-sm text-neutral-500 mb-2">
                  <EditableField
                    value={phrase.vietnamese}
                    onSave={(v) => updatePhrase(i, "vietnamese", v)}
                    className="text-sm text-neutral-500"
                  />
                </div>
                <div className="text-xs text-neutral-400 font-mono tracking-wide">
                  /<EditableField
                    value={phrase.pronunciation}
                    onSave={(v) => updatePhrase(i, "pronunciation", v)}
                    className="text-xs text-neutral-400 font-mono"
                  />/
                </div>
              </>
            ) : (
              <>
                <motion.p
                  className="text-sm text-neutral-500 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 + 0.25, duration: 0.3 }}
                >
                  {phrase.vietnamese}
                </motion.p>
                <motion.p
                  className="text-xs text-neutral-400 font-mono tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 + 0.35, duration: 0.3 }}
                >
                  /{phrase.pronunciation}/
                </motion.p>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Drill cards (admin only) */}
      {isAdmin && lesson.drill.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-amber-600 font-medium mb-2 uppercase tracking-wider">
            Drill Cards (admin)
          </p>
          <div className="space-y-2">
            {lesson.drill.map((card, i) => (
              <div key={card.id} className="bg-amber-50 rounded-xl px-4 py-3 text-sm space-y-1">
                <div className="flex items-center gap-2 text-xs text-amber-500 mb-1">
                  <span className="font-mono">{card.id}</span>
                  <span className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-600">{card.type}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400">prompt: </span>
                  <EditableField value={card.prompt} onSave={(v) => updateDrill(i, "prompt", v)} className="text-sm" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400">hint: </span>
                  <EditableField value={card.hint} onSave={(v) => updateDrill(i, "hint", v)} className="text-sm" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400">answer: </span>
                  <EditableField value={card.answer} onSave={(v) => updateDrill(i, "answer", v)} className="text-sm" />
                </div>
                {card.answerHint && (
                  <div>
                    <span className="text-xs text-neutral-400">answerHint: </span>
                    <EditableField value={card.answerHint} onSave={(v) => updateDrill(i, "answerHint", v)} className="text-sm" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ActionButton onClick={onStartDrill} className="w-full text-base min-h-[52px] py-4">
        B\u1EAFt \u0111\u1EA7u luy\u1EC7n t\u1EADp
      </ActionButton>
    </div>
  );
}
