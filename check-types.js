import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

function search(dir) {
  const files = readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = join(dir, file.name);
    if (file.isDirectory()) {
      search(fullPath);
    } else if (file.name.endsWith('.d.ts')) {
      const content = readFileSync(fullPath, 'utf-8');
      if (content.includes('Blob_2')) {
        console.log('Found in', fullPath);
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('Blob_2')) {
            console.log(lines.slice(Math.max(0, i - 2), i + 5).join('\n'));
          }
        }
      }
    }
  }
}

search(join(process.cwd(), 'node_modules', '@google', 'genai'));
