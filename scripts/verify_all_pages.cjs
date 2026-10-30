const { chromium } = require('../../new desgin/frontend-3d/node_modules/playwright');

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Project Detail - Landmark', path: '/projects/kedias-landmark' },
  { name: 'Project Detail - Atulyam', path: '/projects/kedias-atulyam' },
  { name: 'Project Detail - Tulsi', path: '/projects/kedias-tulsi' },
  { name: 'Unit Detail - Plot 11', path: '/units/KED-Plot11' },
  { name: 'Booking Flow - Step 1', path: '/booking/KED-Plot11' },
  { name: 'Customer Dashboard', path: '/dashboard' },
  { name: 'Admin Dashboard', path: '/admin' },
  { name: 'Tools (EMI / Duties)', path: '/tools' },
  { name: 'About Kedia', path: '/about' },
  { name: 'Gallery & CSR', path: '/gallery' },
  { name: 'Contact HQ', path: '/contact' },
  { name: 'NRI Desk', path: '/nri' },
  { name: 'Careers', path: '/careers' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Use', path: '/terms' },
];

async function verifyAll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`[Console Error on ${page.url()}]: ${msg.text()}`);
    }
  });

  console.log(`Verifying all ${routes.length} platform pages on http://127.0.0.1:4173 ...\n`);

  for (const route of routes) {
    const url = `http://127.0.0.1:4173${route.path}`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      const status = response ? response.status() : 'Unknown';
      if (status >= 400) {
        console.error(`❌ ${route.name} (${route.path}) returned HTTP ${status}`);
        errors.push(`HTTP ${status} on ${route.path}`);
      } else {
        console.log(`✅ ${route.name} (${route.path}) -> HTTP ${status} OK`);
      }
    } catch (e) {
      console.error(`❌ Failed navigating to ${route.name} (${route.path}):`, e.message);
      errors.push(`Navigation failed for ${route.path}: ${e.message}`);
    }
  }

  await browser.close();

  console.log('\n--- VERIFICATION SUMMARY ---');
  if (errors.length === 0) {
    console.log(`🎉 ALL ${routes.length} PAGES LOADED PERFECTLY WITH ZERO HTTP/CONSOLE ERRORS!`);
    process.exit(0);
  } else {
    console.error(`Found ${errors.length} issues:`, errors);
    process.exit(1);
  }
}

verifyAll();

