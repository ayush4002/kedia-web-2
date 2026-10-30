const { chromium } = require('../../new desgin/frontend-3d/node_modules/playwright');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log('Navigating to http://127.0.0.1:4173 ...');
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 1. Hero Screenshot
  console.log('Capturing 01_spaciaz_hero.png...');
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_spaciaz_hero.png') });

  // 2. Section 2: 3 Cards
  console.log('Capturing 02_spaciaz_3cards.png...');
  await page.locator('text=We developed landmark real estate projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_spaciaz_3cards.png') });

  // 3. Stats Banner
  console.log('Capturing 03_spaciaz_skyline_stats.png...');
  await page.locator('text=completed land projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_spaciaz_skyline_stats.png') });

  // 4. What makes us different
  console.log('Capturing 04_spaciaz_what_makes_us_different.png...');
  await page.locator('text=What makes us different').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_spaciaz_what_makes_us_different.png') });

  // 5. Featured Projects Collection (Dossiers)
  console.log('Capturing 05_spaciaz_project_dossiers.png...');
  await page.locator('#featured-collection').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '05_spaciaz_project_dossiers.png') });

  // 6. Interactive Living Blueprint Map
  console.log('Clicking Living Blueprint Map toggle...');
  const blueprintBtn = page.locator('button:has-text("Living Blueprint Map")');
  if (await blueprintBtn.isVisible()) {
    await blueprintBtn.click();
    await page.waitForTimeout(1000);
    console.log('Capturing 06_spaciaz_living_blueprint_interactive.png...');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '06_spaciaz_living_blueprint_interactive.png') });
  }

  // 7. Leadership & Recognitions
  console.log('Capturing 07_spaciaz_leadership.png...');
  await page.locator('text=Executive leadership').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '07_spaciaz_leadership.png') });

  // 8. Testimonials & Homeowner feedback
  console.log('Capturing 08_spaciaz_feedback.png...');
  await page.locator('text=Happy users feedback').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '08_spaciaz_feedback.png') });

  // 9. Curved Pre-Footer CTA & Footer
  console.log('Capturing 09_spaciaz_cta_footer.png...');
  await page.locator('text=Your dream home awaits').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '09_spaciaz_cta_footer.png') });

  // 10. Full page overview
  console.log('Capturing 10_spaciaz_fullpage.png...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '10_spaciaz_fullpage.png'), fullPage: true });

  console.log('All Spaciaz redesign screenshots refreshed successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Error running screenshot script:', err);
  process.exit(1);
});
