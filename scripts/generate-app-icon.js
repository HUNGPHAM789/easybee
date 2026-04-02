import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.join(import.meta.dirname, '..', 'marketing');
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  console.log('Launching Chrome...');
  const browser = await chromium.launchPersistentContext(
    'C:\\tmp\\chrome-debug-profile',
    { headless: false, channel: 'chrome', args: ['--disable-blink-features=AutomationControlled'], viewport: { width: 1280, height: 900 } }
  );

  const page = await browser.newPage();
  await page.goto('https://gemini.google.com/app', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(6000);

  // Focus input
  await page.evaluate(() => {
    function findEditable(root) {
      const els = root.querySelectorAll('[contenteditable="true"]');
      for (const el of els) { if (el.offsetHeight > 0) { el.focus(); return true; } }
      const allEls = root.querySelectorAll('*');
      for (const el of allEls) { if (el.shadowRoot && findEditable(el.shadowRoot)) return true; }
      return false;
    }
    findEditable(document);
  });
  await page.waitForTimeout(500);

  const prompt = 'Generate a minimalist app icon for "EasyBee" — an English learning app. Square 1:1 ratio. The icon should feature a simple, elegant bee silhouette or abstract bee shape in black (#0a0a0a) on a pure white background. Clean lines, modern, no text, no gradients. Think Apple-level minimalism — the kind of icon that looks premium on an iPhone home screen. The bee should be recognizable but geometric/abstract, not cartoon-like.';

  await page.keyboard.type(prompt, { delay: 3 });
  await page.waitForTimeout(300);
  await page.keyboard.press('Enter');
  console.log('Submitted, waiting 45s...');
  await page.waitForTimeout(45000);

  // Find images piercing shadow DOM
  const images = await page.evaluate(() => {
    const results = [];
    function walk(root) {
      const imgs = root.querySelectorAll('img');
      for (const img of imgs) {
        const r = img.getBoundingClientRect();
        if (r.width > 100 && r.height > 100) results.push({ src: img.src, width: r.width, height: r.height, x: r.x, y: r.y });
      }
      const allEls = root.querySelectorAll('*');
      for (const el of allEls) { if (el.shadowRoot) walk(el.shadowRoot); }
    }
    walk(document);
    return results;
  });

  const target = images.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
  if (target) {
    const savePath = path.join(outDir, 'app-icon-raw.png');
    await page.screenshot({
      path: savePath,
      clip: { x: Math.max(0, Math.round(target.x)), y: Math.max(0, Math.round(target.y)), width: Math.round(target.width), height: Math.round(target.height) },
    });
    console.log(`✅ Saved app-icon-raw.png (${(fs.statSync(savePath).size / 1024).toFixed(0)} KB)`);
  } else {
    console.log('❌ No image found');
  }

  await page.close();
  await browser.close();
}

main().catch(console.error);
