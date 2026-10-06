const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3075';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'readme');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const pages = [
    { path: '/', name: 'landing.png', title: 'Landing Page' },
    { path: '/compete', name: 'compete.png', title: 'Competitions Page' },
    { path: '/labs', name: 'labs.png', title: 'Labs Page' },
    { path: '/leaderboard', name: 'leaderboard.png', title: 'Leaderboard Page' },
  ];

  for (const pageInfo of pages) {
    try {
      console.log(`Navigating to ${pageInfo.path}...`);
      await page.goto(`${BASE_URL}${pageInfo.path}`, { waitUntil: 'networkidle' });
      
      // Wait a bit for any animations to complete
      await page.waitForTimeout(1000);
      
      const outputPath = path.join(OUTPUT_DIR, pageInfo.name);
      await page.screenshot({ 
        path: outputPath,
        fullPage: true 
      });
      console.log(`✓ Saved ${pageInfo.title} to ${outputPath}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${pageInfo.title}:`, error.message);
    }
  }

  await browser.close();
  console.log('\nScreenshot capture complete!');
}

captureScreenshots().catch(console.error);
