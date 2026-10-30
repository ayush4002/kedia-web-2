const { chromium } = require('../../new desgin/frontend-3d/node_modules/playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79';
const BASE_URL = 'http://127.0.0.1:4173';

const pagesToCapture = [
  { name: 'theme_unit_detail', path: '/units/KED-Plot11' },
  { name: 'theme_booking_flow', path: '/booking/KED-Plot11' },
  { name: 'theme_customer_dashboard', path: '/dashboard' },
  { name: 'theme_admin_dashboard', path: '/admin' },
  { name: 'theme_tools_calculator', path: '/tools' },
  { name: 'theme_about_page', path: '/about' },
  { name: 'theme_gallery_archives', path: '/gallery' },
  { name: 'theme_contact_hq', path: '/contact' },
  { name: 'theme_nri_desk', path: '/nri' },
  { name: 'theme_careers_page', path: '/careers' }
];

(async () => {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  for (const item of pagesToCapture) {
    console.log(`Capturing ${item.name} at ${item.path}...`);
    await page.goto(`${BASE_URL}${item.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const screenshotPath = path.join(ARTIFACT_DIR, `${item.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved screenshot to ${screenshotPath}`);
  }

  await browser.close();
  console.log('Finished capturing all unified theme pages!');
})();

