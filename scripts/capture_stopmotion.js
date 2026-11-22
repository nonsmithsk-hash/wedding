const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outDir = path.join(__dirname, '..', 'scratch', 'stopmotion_frames');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('Launching Chrome via puppeteer-core for stop-motion capture...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  // 1. Capture Door Opening Stop-Motion Frames
  const doorAngles = [0, 6, 14, 24, 36, 50, 65, 80, 95, 110];
  for (let i = 0; i < doorAngles.length; i++) {
    const angle = doorAngles[i];
    const url = `http://localhost:3001/slides?scene=door_anim&angle=${angle}`;
    console.log(`Capturing door stop-motion frame ${i} (angle=${angle}deg)...`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 400));
    const dest = path.join(outDir, `door_${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: dest, type: 'png' });
  }

  // 2. Capture Pure White Transition Frame
  {
    const url = 'http://localhost:3001/slides?scene=white_transition';
    console.log('Capturing white heavenly transition frame...');
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 400));
    const dest = path.join(outDir, 'white_transition.png');
    await page.screenshot({ path: dest, type: 'png' });
  }

  // 3. Capture Main Ceremony Scenes (High-Res 1080x1920)
  const scenes = [
    { name: 'scene_02_couple', scene: 'couple' },
    { name: 'scene_03_tilak', scene: 'tilak' },
    { name: 'scene_04_sangeet', scene: 'sangeet' },
    { name: 'scene_05_haldi', scene: 'haldi' },
    { name: 'scene_06_wedding', scene: 'wedding' },
    { name: 'scene_07_rsvp', scene: 'rsvp' },
  ];

  for (const s of scenes) {
    const url = `http://localhost:3001/slides?scene=${s.scene}`;
    console.log(`Capturing ${s.name} from ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));
    const dest = path.join(outDir, `${s.name}.png`);
    await page.screenshot({ path: dest, type: 'png' });
    console.log(`Saved: ${dest}`);
  }

  await browser.close();
  console.log('All stop-motion and ceremony frames captured successfully!');
}

run().catch((err) => {
  console.error('Error during stop-motion capture:', err);
  process.exit(1);
});
