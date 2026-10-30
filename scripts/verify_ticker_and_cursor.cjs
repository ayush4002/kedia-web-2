const { chromium } = require('../../new desgin/frontend-3d/node_modules/playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79';
const BASE_URL = 'http://127.0.0.1:4173';

(async () => {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  console.log('Navigating to homepage...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check 1: Verify Custom Cursor elements are completely absent from DOM
  const customCursorCount = await page.locator('.w-2.h-2.rounded-full.bg-brass-400').count();
  const customRingCount = await page.locator('[data-cursor]').count();
  console.log(`Custom cursor dots found: ${customCursorCount} (Expected: 0)`);
  if (customCursorCount === 0) {
    console.log('✅ Custom cursor effect completely removed!');
  } else {
    console.error('❌ Custom cursor dot still present!');
  }

  // Check 2: Scroll to ticker and capture it
  // Scroll down so ticker is centered
  const tickerSection = page.locator('section').filter({ hasText: 'Master Planned Townships' });
  await tickerSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const tickerBox = await tickerSection.boundingBox();
  console.log('Ticker bounding box:', tickerBox);

  // Capture screenshot of ticker in viewport
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'ticker_fixed.png'),
    clip: {
      x: 0,
      y: Math.max(0, tickerBox.y - 120),
      width: 1440,
      height: Math.min(450, tickerBox.height + 240)
    }
  });
  console.log('Saved ticker_fixed.png screenshot!');

  await browser.close();
  console.log('Verification finished successfully!');
})();

