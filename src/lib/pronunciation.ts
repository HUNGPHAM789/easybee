/**
 * Pronunciation Helper — generates stressed-syllable pronunciation hints.
 * Format: ALL CAPS = stressed syllable. Simple, readable by non-English speakers.
 * e.g. "appointment" → "uh-POINT-ment"
 *
 * Uses a dictionary of common nail salon / ESL phrases, with a fallback
 * simple-syllable algorithm for unknown words.
 */

// ── Dictionary of common phrases & words ───────────────────
const PRONUNCIATION_DICT: Record<string, string> = {
  // Greetings & basics
  'hello': 'heh-LOH',
  'hi': 'HY',
  'goodbye': 'good-BY',
  'bye': 'BY',
  'please': 'PLEEZ',
  'thank you': 'THANK-yoo',
  'thanks': 'THANKS',
  'you\'re welcome': 'yor WEL-kum',
  'welcome': 'WEL-kum',
  'sorry': 'SAW-ree',
  'excuse me': 'ex-KYOOZ mee',
  'yes': 'YES',
  'no': 'NOH',
  'okay': 'oh-KAY',
  'ok': 'oh-KAY',

  // Numbers
  'one': 'WUN',
  'two': 'TOO',
  'three': 'THREE',
  'four': 'FOR',
  'five': 'FYV',
  'ten': 'TEN',
  'fifteen': 'fif-TEEN',
  'twenty': 'TWEN-tee',
  'thirty': 'THUR-tee',
  'forty': 'FOR-tee',
  'fifty': 'FIF-tee',
  'sixty': 'SIX-tee',
  'hundred': 'HUN-dred',

  // Nail salon — services
  'manicure': 'MAN-ih-kyoor',
  'pedicure': 'PED-ih-kyoor',
  'appointment': 'uh-POINT-ment',
  'acrylic': 'uh-KRIL-ik',
  'gel': 'JEL',
  'polish': 'POL-ish',
  'color': 'KUL-er',
  'design': 'deh-ZYN',
  'nail': 'NAYL',
  'nails': 'NAYLZ',
  'finger': 'FIN-ger',
  'fingernail': 'FIN-ger-nayl',
  'toe': 'TOH',
  'toenail': 'TOH-nayl',
  'cuticle': 'KYOO-tih-kul',
  'lotion': 'LOH-shun',
  'massage': 'muh-SAHJ',
  'soak': 'SOHK',
  'trim': 'TRIM',
  'shape': 'SHAYP',
  'file': 'FYL',
  'buff': 'BUF',
  'extend': 'ex-TEND',
  'extension': 'ex-TEN-shun',
  'dip': 'DIP',
  'powder': 'POW-der',
  'french': 'FRENCH',
  'ombre': 'OM-bray',
  'glitter': 'GLIT-er',
  'rhinestone': 'RYN-stohn',
  'art': 'ART',
  'nail art': 'NAYL art',
  'topcoat': 'TOP-koht',
  'base coat': 'BAYS koht',
  'primer': 'PRY-mer',
  'uv': 'yoo-VEE',
  'led': 'EL-ee-DEE',
  'lamp': 'LAMP',
  'cure': 'KYOOR',
  'dry': 'DRY',
  'remove': 'reh-MOOV',
  'removal': 'reh-MOO-vul',
  'soak off': 'SOHK awf',
  'fill': 'FIL',
  'fill in': 'FIL in',
  'refill': 'REE-fil',

  // Customer service
  'customer': 'KUS-tuh-mer',
  'service': 'SUR-vis',
  'ready': 'RED-ee',
  'wait': 'WAYT',
  'minute': 'MIN-it',
  'minutes': 'MIN-its',
  'hour': 'OW-er',
  'next': 'NEXT',
  'available': 'uh-VAY-luh-bul',
  'busy': 'BIZ-ee',
  'walk in': 'WAWK in',
  'walk-in': 'WAWK-in',
  'book': 'BUK',
  'schedule': 'SKED-yool',
  'cancel': 'KAN-sel',
  'change': 'CHAYNJ',
  'today': 'tuh-DAY',
  'tomorrow': 'tuh-MAWR-oh',

  // Payment
  'price': 'PRYS',
  'cost': 'KOST',
  'how much': 'how MUCH',
  'total': 'TOH-tul',
  'cash': 'KASH',
  'card': 'KARD',
  'credit': 'KRED-it',
  'debit': 'DEB-it',
  'tip': 'TIP',
  'receipt': 'reh-SEET',
  'pay': 'PAY',
  'payment': 'PAY-ment',
  'charge': 'CHARJ',
  'dollar': 'DOL-er',
  'dollars': 'DOL-erz',

  // Questions / phrases
  'what color': 'wut KUL-er',
  'which color': 'wich KUL-er',
  'do you like': 'doo yoo LYK',
  'do you want': 'doo yoo WONT',
  'would you like': 'wud yoo LYK',
  'can i help': 'kan EYE help',
  'are you ready': 'ar yoo RED-ee',
  'how are you': 'how ar YOO',
  'come in': 'KUM in',
  'sit down': 'SIT down',
  'have a seat': 'hav uh SEET',
  'which one': 'wich WUN',
  'this one': 'THIS wun',
  'that one': 'THAT wun',
  'right here': 'RYT heer',

  // Body / health
  'allergic': 'uh-LER-jik',
  'allergy': 'AL-er-jee',
  'sensitive': 'SEN-sih-tiv',
  'hurt': 'HURT',
  'pain': 'PAYN',
  'comfortable': 'KUM-fer-tuh-bul',
  'too tight': 'too TYT',
  'too short': 'too SHORT',
  'too long': 'too LAWNG',
  'perfect': 'PUR-fekt',
  'beautiful': 'BYOO-tih-ful',
  'pretty': 'PRIT-ee',
  'nice': 'NYS',
  'love it': 'LUV it',
  'like it': 'LYK it',

  // Common words
  'water': 'WAW-ter',
  'please sit': 'pleez SIT',
  'follow me': 'FOL-oh mee',
  'one moment': 'wun MOH-ment',
  'almost done': 'AWL-mohst DUN',
  'finished': 'FIN-isht',
  'done': 'DUN',
  'complete': 'kum-PLEET',
  'enjoy': 'en-JOY',
  'have a nice day': 'hav uh NYS DAY',
  'see you next time': 'see yoo NEXT tym',
  'come back soon': 'kum BAK soon',
  'take care': 'tayk KAIR',

  // IELTS / academic phrases
  'in my opinion': 'in my uh-PIN-yun',
  'i believe': 'eye beh-LEEV',
  'for example': 'for ex-AM-pul',
  'for instance': 'for IN-stuns',
  'in conclusion': 'in kun-KLOO-zhun',
  'on the other hand': 'on the UH-ther hand',
  'furthermore': 'FUR-ther-mor',
  'however': 'how-EV-er',
  'therefore': 'THAIR-for',
  'although': 'awl-THOH',
  'because': 'beh-KUZ',
  'important': 'im-POR-tunt',
  'especially': 'eh-SPESH-uh-lee',
  'usually': 'YOO-zhoo-uh-lee',
  'actually': 'AK-choo-uh-lee',
  'definitely': 'DEF-uh-nit-lee',
  'probably': 'PROB-uh-blee',
  'interesting': 'IN-ter-es-ting',
  'understand': 'un-der-STAND',
  'communicate': 'kuh-MYOO-nih-kayt',
  'experience': 'ex-PEER-ee-ents',
  'situation': 'sich-yoo-AY-shun',
  'opportunity': 'op-er-TOO-nih-tee',
  'environment': 'en-VY-ern-ment',
  'government': 'GUV-ern-ment',
  'technology': 'tek-NOL-oh-jee',
  'education': 'ej-yoo-KAY-shun',
  'information': 'in-fer-MAY-shun',
  'international': 'in-ter-NASH-un-ul',
  'traditional': 'truh-DISH-un-ul',
  'development': 'deh-VEL-up-ment',
  'community': 'kuh-MYOO-nih-tee',
  'responsibility': 'reh-spon-sih-BIL-ih-tee',
  'challenge': 'CHAL-enj',
  'advantage': 'ad-VAN-tij',
  'disadvantage': 'dis-ad-VAN-tij',
  'difference': 'DIF-er-ents',
  'similar': 'SIM-ih-ler',
  'different': 'DIF-er-ent',
  'necessary': 'NES-eh-sair-ee',
  'possible': 'POS-ih-bul',
  'impossible': 'im-POS-ih-bul',
};

// ── Vowel-group phoneme map ──────────────────────────────────
const VOWEL_MAP: [RegExp, string][] = [
  [/tion|sion/, 'shun'],
  [/ough(?=t)/, 'awt'],
  [/ough/, 'oh'],
  [/augh/, 'aw'],
  [/igh/, 'y'],
  [/oo/, 'oo'],
  [/ee|ea/, 'ee'],
  [/oa|ow/, 'oh'],
  [/ou|ow/, 'ow'],
  [/ai|ay/, 'ay'],
  [/ie|igh/, 'y'],
  [/au|aw/, 'aw'],
  [/ew/, 'yoo'],
  [/ue/, 'yoo'],
  [/ui/, 'oo'],
  [/a(?=[^aeiou]e)/, 'ay'],
  [/e(?=[^aeiou]e)/, 'ee'],
  [/i(?=[^aeiou]e)/, 'y'],
  [/o(?=[^aeiou]e)/, 'oh'],
  [/u(?=[^aeiou]e)/, 'yoo'],
  [/a/, 'a'],
  [/e/, 'eh'],
  [/i/, 'ih'],
  [/o/, 'o'],
  [/u/, 'uh'],
];

/**
 * Split a single English word into rough phonetic syllables.
 * Good enough for ESL learners — not a full G2P system.
 */
function wordToPhonetic(word: string): string {
  if (!word) return word;
  // Very short words — just capitalise
  if (word.length <= 2) return word.toUpperCase();

  // Remove silent trailing 'e'
  let w = word.toLowerCase();

  // Split on consonant clusters to approximate syllables
  // Strategy: insert hyphens before each vowel cluster that follows a consonant
  const syllables: string[] = [];
  let current = '';
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let inVowel = false;
  for (let i = 0; i < w.length; i++) {
    const ch = w[i];
    const isV = vowels.has(ch);
    if (isV && !inVowel && current.length > 1) {
      // Transition into vowel group — look back: keep one consonant with new syllable
      const last = current.slice(-1);
      syllables.push(current.slice(0, -1));
      current = last + ch;
    } else {
      current += ch;
    }
    inVowel = isV;
  }
  if (current) syllables.push(current);

  // Stress heuristic: stress second-to-last syllable for ≥2 syllables, else first
  const stressIdx = syllables.length >= 2 ? syllables.length - 2 : 0;
  return syllables
    .map((s, i) => (i === stressIdx ? s.toUpperCase() : s))
    .filter(s => s.length > 0)
    .join('-');
}

/**
 * Look up pronunciation for a phrase or word.
 * Always returns a string (never null) — falls back to a simple
 * phonetic syllable split so the hint shows for every phrase.
 */
export function getPronunciation(text: string): string | null {
  if (!text) return null;
  const lower = text.toLowerCase().trim();

  // Direct lookup
  if (PRONUNCIATION_DICT[lower]) return PRONUNCIATION_DICT[lower];

  const words = lower.split(/\s+/);

  // Word-by-word: use dict entry where available, fallback for the rest
  const parts = words.map(w => PRONUNCIATION_DICT[w] || wordToPhonetic(w));
  return parts.join(' ');
}
