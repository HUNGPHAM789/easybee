# Insert Generated Lessons

5 lessons generated. Insert them into the class files.

## BEFORE STARTING: Read CLAUDE.md in the project root. Follow ALL rules there, especially:
- ID system rules (never reassign IDs — use exactly the IDs in the JSON files)
- Use DOUBLE QUOTES for all string values in TypeScript (match existing file format)

## For each entry in _manifest.json:
1. Read the JSON file from scripts/generated/{file}
2. Insert the lesson object into the lessons:[] array in lib/content/nail-salon/{targetClass}
3. Add as the LAST element in the array (before the closing ])
4. Ensure proper comma separation between lessons

## Files to modify:
lib/content/permanent-makeup/consultation.ts

## CRITICAL — Quote style:
ALL string values MUST use DOUBLE QUOTES ("L46", "read", "Hello"). 
Match the JSON file format exactly — do NOT convert to single quotes.

## Validation:
After all inserts, run: npx tsc --noEmit
Confirm zero new errors (3 pre-existing SpeechRecognition errors are expected).

## Manifest:
- L49 (A1) "Greeting PMU Client" → consultation.ts
- L50 (A1) "Brow Shapes" → consultation.ts
- L51 (A1) "Lip Colors" → consultation.ts
- L52 (A2) "Allergies and Medical History" → consultation.ts
- L53 (A2) "Permanent Makeup: Setting Expectations" → consultation.ts
