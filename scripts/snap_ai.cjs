const { chromium } = require('../../new desgin/frontend-3d/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Click floating AI Concierge button
  const aiBtn = page.locator('button[aria-label="Open Kedia AI Concierge"]').first();
  await aiBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/18_ai_concierge_open.png' });
  console.log('Successfully captured screenshots/18_ai_concierge_open.png!');
  await browser.close();
})();

