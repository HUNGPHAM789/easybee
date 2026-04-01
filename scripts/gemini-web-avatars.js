/**
 * Generate avatars via Gemini Web - pierce shadow DOM
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.join(import.meta.dirname, '..', 'public', 'avatars');
fs.mkdirSync(outDir, { recursive: true });

const AVATARS = [
  {
    id: 'thay-bee',
    prompt: 'Generate a professional portrait headshot photo. Square 1:1 ratio. Subject: a young Vietnamese-American male English teacher, age 30, warm confident smile, wearing smart casual navy polo shirt, clean-shaven, modern short hairstyle. Soft studio lighting, plain white background, photorealistic, shoulders and head only.',
  },
  {
    id: 'co-honey',
    prompt: 'Generate a professional portrait headshot photo. Square 1:1 ratio. Subject: a Vietnamese-American woman nail salon owner, age 35, warm genuine smile, elegant, subtle natural makeup, hair tied back neatly, wearing a simple black top. Soft studio lighting, plain white background, photorealistic, shoulders and head only.',
  },
  {
    id: 'anh-max',
    prompt: 'Generate a professional portrait headshot photo. Square 1:1 ratio. Subject: a young Vietnamese-American man, age 25, energetic big smile, athletic, wearing a clean white t-shirt, modern fade haircut. Soft studio lighting, plain white background, photorealistic, shoulders and head only.',
  },
  {
    id: 'chi-linh',
    prompt: 'Generate a professional portrait headshot photo. Square 1:1 ratio. Subject: an elegant Vietnamese-American woman, age 38, calm composed gentle smile, sophisticated, wearing a cream silk blouse, small pearl earrings, hair in elegant low bun. Soft studio lighting, plain white background, photorealistic, shoulders and head only.',
  },
];

async function findAllImages(page) {
  // Pierce shadow DOM to find all img elements
  return page.evaluate(() => {
    const results = [];
    function walk(root) {
      const imgs = root.querySelectorAll('img');
      for (const img of imgs) {
        const r = img.getBoundingClientRect();
        if (r.width > 100 && r.height > 100) {
          results.push({
            src: img.src,
            width: r.width,
            height: r.height,
            x: r.x,
            y: r.y,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
          });
        }
      }
      // Recurse into shadow roots
      const allEls = root.querySelectorAll('*');
      for (const el of allEls) {
        if (el.shadowRoot) walk(el.shadowRoot);
      }
    }
    walk(document);
    return results;
  });
}

async function main() {
  console.log('Launching Chrome...');
  
  const downloadDir = path.join(outDir, '_downloads');
  fs.mkdirSync(downloadDir, { recursive: true });
  
  const browser = await chromium.launchPersistentContext(
    'C:\\tmp\\chrome-debug-profile',
    {
      headless: false,
      channel: 'chrome',
      args: ['--disable-blink-features=AutomationControlled'],
      viewport: { width: 1280, height: 900 },
      acceptDownloads: true,
    }
  );

  for (const avatar of AVATARS) {
    console.log(`\n=== ${avatar.id} ===`);
    
    const page = await browser.newPage();
    
    try {
      await page.goto('https://gemini.google.com/app', { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(6000);
      
      // Click on the input and type
      await page.evaluate(() => {
        function findEditable(root) {
          const els = root.querySelectorAll('[contenteditable="true"]');
          for (const el of els) { if (el.offsetHeight > 0) { el.focus(); return true; } }
          const allEls = root.querySelectorAll('*');
          for (const el of allEls) {
            if (el.shadowRoot && findEditable(el.shadowRoot)) return true;
          }
          return false;
        }
        findEditable(document);
      });
      
      await page.waitForTimeout(500);
      await page.keyboard.type(avatar.prompt, { delay: 3 });
      await page.waitForTimeout(300);
      await page.keyboard.press('Enter');
      console.log('  Submitted, waiting 45s...');
      
      await page.waitForTimeout(45000);
      
      // Find images piercing shadow DOM
      const images = await findAllImages(page);
      console.log(`  Found ${images.length} large images`);
      images.forEach((img, i) => console.log(`    [${i}] ${img.width.toFixed(0)}x${img.height.toFixed(0)} src=${img.src?.substring(0, 60)}`));
      
      // Get the largest image
      const target = images.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
      
      if (target) {
        // Screenshot the image region
        const savePath = path.join(outDir, `${avatar.id}.png`);
        await page.screenshot({
          path: savePath,
          clip: {
            x: Math.max(0, Math.round(target.x)),
            y: Math.max(0, Math.round(target.y)),
            width: Math.round(target.width),
            height: Math.round(target.height),
          },
        });
        const size = (fs.statSync(savePath).size / 1024).toFixed(0);
        console.log(`  ✅ ${avatar.id}.png (${size} KB, ${Math.round(target.width)}x${Math.round(target.height)})`);
      } else {
        console.log('  ❌ No image found');
        // Full page screenshot for debug
        await page.screenshot({ path: path.join(outDir, `${avatar.id}-noimages.png`), fullPage: true });
      }
      
    } catch (e) {
      console.error(`  Error: ${e.message.substring(0, 120)}`);
    }
    
    await page.close();
    await new Promise(r => setTimeout(r, 3000));
  }
  
  console.log('\nDone!');
  await browser.close();
}

main().catch(console.error);
