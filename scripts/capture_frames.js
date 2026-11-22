const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outDir = path.join(__dirname, '..', 'scratch', 'video_frames');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const scenes = [
    { name: '01_door_closed', scene: 'door_closed' },
    { name: '02_white_transition', scene: 'white_transition' },
    { name: '03_couple', scene: 'couple' },
    { name: '04_tilak', scene: 'tilak' },
    { name: '05_sangeet', scene: 'sangeet' },
    { name: '06_haldi', scene: 'haldi' },
    { name: '07_wedding', scene: 'wedding' },
    { name: '08_rsvp', scene: 'rsvp' },
  ];

  for (const s of scenes) {
    const url = `http://localhost:3001/slides?scene=${s.scene}`;
    console.log(`Capturing scene: ${s.name} from ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    // Wait an extra 800ms for fonts and images to settle
    await new Promise((r) => setTimeout(r, 800));
    const dest = path.join(outDir, `${s.name}.png`);
    await page.screenshot({ path: dest, type: 'png' });
    console.log(`Saved: ${dest}`);
  }

  await browser.close();
  console.log('All scenes captured successfully!');
}

run().catch((err) => {
  console.error('Error capturing scenes:', err);
  process.exit(1);
});
