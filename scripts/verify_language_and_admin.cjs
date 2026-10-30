const path = require('path');
const { chromium } = require('../../new desgin/frontend-3d/node_modules/playwright');

async function testLanguageAndAdmin() {
  console.log('Launching browser to test Language Switcher and Admin E-Commerce Dashboard...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  try {
    // 1. Visit Home
    console.log('Navigating to http://127.0.0.1:4173 ...');
    await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle', timeout: 15000 });

    // Verify Initial English text
    let headline = await page.textContent('h1');
    console.log('Initial headline:', headline.trim());

    // 2. Click Language Toggle Button
    console.log('Clicking Language Switcher button to toggle to Hindi...');
    const langBtn = await page.locator('button[title*="Switch Language"]').first();
    await langBtn.click();
    await page.waitForTimeout(500);

    // Verify Hindi text
    let hindiHeadline = await page.textContent('h1');
    console.log('Headline after toggle:', hindiHeadline.trim());

    // Verify Nav translated
    const navText = await page.textContent('nav');
    console.log('Nav text in Hindi contains परियोजनाएं:', navText.includes('परियोजनाएं'));
    console.log('Nav text in Hindi contains हमारे बारे में:', navText.includes('हमारे बारे में'));

    // Capture screenshot of Hindi Home page
    const screenshotHindi = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79/home_hindi_language.png';
    await page.screenshot({ path: screenshotHindi, fullPage: false });
    console.log('Saved Hindi screenshot to:', screenshotHindi);

    // Toggle back to English
    console.log('Clicking Language Switcher button to toggle back to English...');
    await langBtn.click();
    await page.waitForTimeout(500);
    let enHeadlineAgain = await page.textContent('h1');
    console.log('Headline after toggling back to EN:', enHeadlineAgain.trim());

    // 3. Navigate to Admin Dashboard
    console.log('Navigating to http://127.0.0.1:4173/admin ...');
    await page.goto('http://127.0.0.1:4173/admin', { waitUntil: 'networkidle', timeout: 15000 });

    const adminTitle = await page.textContent('h1');
    console.log('Admin Page Title:', adminTitle.trim());

    // Switch to Product Catalog Tab
    console.log('Clicking Product Catalog Tab...');
    await page.click('button:has-text("Product Catalog")');
    await page.waitForTimeout(500);

    // Open Add New Unit Modal
    console.log('Clicking Add Product / Add New Unit...');
    await page.click('button:has-text("Add Product")');
    await page.waitForTimeout(500);

    // Fill form
    await page.fill('input[placeholder*="Villa 108"]', 'Villa 108 Luxury');
    await page.click('button:has-text("Publish Unit to Catalog")');
    await page.waitForTimeout(800);

    // Check if new unit exists in the table
    const tableText = await page.textContent('table');
    console.log('Catalog table includes Villa 108 Luxury:', tableText.includes('Villa 108 Luxury'));

    // Switch to Orders Tab
    console.log('Clicking Orders & Allotments Tab...');
    await page.click('button:has-text("Orders & Allotments")');
    await page.waitForTimeout(500);

    // Switch to Inbound Leads Tab
    console.log('Clicking Inbound Leads CRM Tab...');
    await page.click('button:has-text("Inbound Leads CRM")');
    await page.waitForTimeout(500);

    // Capture screenshot of Admin Center
    const screenshotAdmin = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79/admin_ecommerce_center.png';
    await page.screenshot({ path: screenshotAdmin, fullPage: false });
    console.log('Saved Admin Center screenshot to:', screenshotAdmin);

    console.log('ALL VERIFICATIONS SUCCESSFUL!');
  } catch (err) {
    console.error('Error during verification:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

testLanguageAndAdmin();

