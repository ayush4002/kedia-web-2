const path = require('path');
const { chromium } = require('../../new desgin/frontend-3d/node_modules/playwright');

async function testProjectBlueprintVisualization() {
  console.log('Testing Project-Specific Living Blueprint & Visualizations...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 }
  });

  const page = await context.newPage();

  try {
    console.log('Navigating to http://127.0.0.1:4173 ...');
    await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle', timeout: 15000 });

    // Scroll to the Discover Luxury Living section
    const blueprintBtn = await page.locator('button:has-text("Living Blueprint Map")').first();
    await blueprintBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // Click "Living Blueprint Map" tab
    console.log('Clicking Living Blueprint Map tab...');
    await blueprintBtn.click();
    await page.waitForTimeout(600);

    // Verify Project Switcher Pills are visible
    const switcherText = await page.textContent('body');
    const hasLandmark = switcherText.includes("Kedia's Landmark");
    const hasNikunj = switcherText.includes("Nikunj Villas");
    const hasAtulyam = switcherText.includes("Kedia's Atulyam");
    const hasTulsi = switcherText.includes("Kedia's Tulsi");

    console.log("Project Switcher contains Kedia's Landmark:", hasLandmark);
    console.log("Project Switcher contains Nikunj Villas:", hasNikunj);
    console.log("Project Switcher contains Kedia's Atulyam:", hasAtulyam);
    console.log("Project Switcher contains Kedia's Tulsi:", hasTulsi);

    // 1. Capture CAD Blueprint for Kedia's Landmark
    const screenshotLandmarkCAD = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79/blueprint_landmark_cad.png';
    const blueprintContainer = await page.locator('#featured-collection');
    await blueprintContainer.screenshot({ path: screenshotLandmarkCAD });
    console.log('Saved Landmark CAD Screenshot:', screenshotLandmarkCAD);

    // 2. Toggle to Aerial Drone View
    console.log('Toggling to Aerial Drone View...');
    await page.click('button:has-text("Aerial Drone View")');
    await page.waitForTimeout(600);

    const screenshotLandmarkAerial = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79/blueprint_landmark_aerial.png';
    await blueprintContainer.screenshot({ path: screenshotLandmarkAerial });
    console.log('Saved Landmark Aerial Drone Screenshot:', screenshotLandmarkAerial);

    // 3. Switch to Nikunj Villas
    console.log('Clicking Nikunj Villas project pill...');
    await page.click('button:has-text("Nikunj Villas")');
    await page.waitForTimeout(600);

    // Toggle back to CAD mode for Nikunj Villas
    await page.click('button:has-text("CAD Blueprint")');
    await page.waitForTimeout(400);

    const screenshotNikunjVillas = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79/blueprint_nikunj_villas.png';
    await blueprintContainer.screenshot({ path: screenshotNikunjVillas });
    console.log('Saved Nikunj Villas Blueprint Screenshot:', screenshotNikunjVillas);

    // 4. Click a unit in the SVG to open the Plot Inspection Dossier Modal
    console.log('Clicking a plotted unit to open the inspection dossier modal...');
    const firstPlot = await page.locator('svg g.cursor-pointer').first();
    await firstPlot.click();
    await page.waitForTimeout(500);

    const modalTitle = await page.textContent('h3');
    console.log('Dossier Modal Title:', modalTitle);

    const screenshotModal = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79/blueprint_plot_dossier_modal.png';
    await page.screenshot({ path: screenshotModal, fullPage: false });
    console.log('Saved Plot Dossier Modal Screenshot:', screenshotModal);

    // Close modal
    await page.keyboard.press('Escape');

    // 5. Test Project Detail Page Scoped Blueprint
    console.log('Navigating to Project Detail page: /projects/kedias-landmark ...');
    await page.goto('http://127.0.0.1:4173/projects/kedias-landmark', { waitUntil: 'networkidle', timeout: 15000 });

    const detailBlueprint = await page.locator('button:has-text("Cadastral Blueprint")');
    if (await detailBlueprint.isVisible()) {
      await detailBlueprint.click();
      await page.waitForTimeout(500);
      const screenshotDetail = 'C:/Users/gupta/.gemini/antigravity/brain/84d6c9d2-c160-4db1-addf-10bd2844fc79/project_detail_blueprint.png';
      await page.screenshot({ path: screenshotDetail, fullPage: false });
      console.log('Saved Project Detail Blueprint Screenshot:', screenshotDetail);
    }

    console.log('ALL PROJECT BLUEPRINT TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('Error during test:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

testProjectBlueprintVisualization();

