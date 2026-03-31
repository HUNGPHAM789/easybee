// Fix Unicode escape sequences in source files — convert \uXXXX to actual characters
const fs = require('fs');
const path = require('path');

const filesToFix = [
  'app/page.tsx',
  'app/onboarding/page.tsx',
  'components/FloatingHelper.tsx',
  'components/VoiceTeacher.tsx',
];

let totalFixes = 0;

for (const rel of filesToFix) {
  const fp = path.join(__dirname, '..', rel);
  if (!fs.existsSync(fp)) {
    console.log(`SKIP (not found): ${rel}`);
    continue;
  }
  
  let txt = fs.readFileSync(fp, 'utf8');
  const before = txt;
  
  // Replace all \uXXXX sequences in string literals with actual characters
  // This regex matches \uXXXX patterns (4 hex digits)
  txt = txt.replace(/\\u([0-9A-Fa-f]{4})/g, (match, hex) => {
    const code = parseInt(hex, 16);
    // Only convert if it's a printable character (not control chars, not basic ASCII that should stay escaped)
    // Keep \n, \t, etc. — those use \n not \uXXXX anyway
    if (code >= 0x80) {
      return String.fromCharCode(code);
    }
    // For ASCII range, keep the escape (might be intentional)
    return match;
  });
  
  // Also fix HTML entities that should be Vietnamese
  // &agrave; → à, etc.
  const htmlEntities = {
    '&agrave;': 'à', '&aacute;': 'á', '&acirc;': 'â', '&atilde;': 'ã',
    '&egrave;': 'è', '&eacute;': 'é', '&ecirc;': 'ê',
    '&igrave;': 'ì', '&iacute;': 'í',
    '&ograve;': 'ò', '&oacute;': 'ó', '&ocirc;': 'ô', '&otilde;': 'õ',
    '&ugrave;': 'ù', '&uacute;': 'ú',
    '&yacute;': 'ý',
    '&#7885;': 'ọ', '&#7907;': 'ợ', '&#7841;': 'ạ',
  };
  for (const [entity, char] of Object.entries(htmlEntities)) {
    while (txt.includes(entity)) {
      txt = txt.replace(entity, char);
    }
  }
  
  if (txt !== before) {
    fs.writeFileSync(fp, txt, 'utf8');
    const fixes = before.length - txt.length; // approximate
    console.log(`FIXED: ${rel}`);
    totalFixes++;
  } else {
    console.log(`OK (no changes): ${rel}`);
  }
}

console.log(`\nDone — fixed ${totalFixes} files`);
