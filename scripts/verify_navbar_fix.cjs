const { chromium } = require('../../new desgin/frontend-3d/node_modules/playwright');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79';

async function testScreens() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  const viewports = [
    { width: 1200, height: 750, name: 'navbar_1200.png' },
    { width: 1280, height: 800, name: 'navbar_1280.png' },
    { width: 1366, height: 768, name: 'navbar_1366.png' },
    { width: 1440, height: 900, name: 'navbar_1440.png' },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    console.log(`Testing navbar at ${vp.width}x${vp.height}...`);
    await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, vp.name),
      clip: { x: 0, y: 0, width: vp.width, height: 95 }
    });
    await context.close();
  }

  console.log('All viewport navbar screenshots captured successfully!');
  await browser.close();
}

testScreens().catch(err => {
  console.error(err);
  process.exit(1);
});
