const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', 'node_modules', 'puppeteer-core'));

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
};

const OUT_DIR = path.join(__dirname, '..', 'out');
const SLIDES_OUT_DIR = path.join(__dirname, '..', 'scratch', 'video_slides');

function createServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let cleanUrl = req.url.split('?')[0];
      if (cleanUrl === '/') cleanUrl = '/index.html';
      let filePath = path.join(OUT_DIR, cleanUrl);

      if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(9876, '127.0.0.1', () => {
      console.log('Serving wedding/out on http://127.0.0.1:9876');
      resolve(server);
    });
  });
}

async function run() {
  if (!fs.existsSync(SLIDES_OUT_DIR)) {
    fs.mkdirSync(SLIDES_OUT_DIR, { recursive: true });
  }

  const server = await createServer();

  const chromePath =
    '/home/red_sky/.cache/puppeteer/chrome-headless-shell/linux-150.0.7871.24/chrome-headless-shell-linux64/chrome-headless-shell';

  console.log('Launching chrome-headless-shell...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const scenes = [
    { name: 'scene_01_door_closed', path: '/slides/door_closed.html' },
    { name: 'scene_01b_white_transition', path: '/slides/white_transition.html' },
    { name: 'scene_02_couple', path: '/slides/couple.html' },
    { name: 'scene_03_tilak', path: '/slides/tilak.html' },
    { name: 'scene_04_sangeet', path: '/slides/sangeet.html' },
    { name: 'scene_05_haldi', path: '/slides/haldi.html' },
    { name: 'scene_06_wedding', path: '/slides/wedding.html' },
    { name: 'scene_07_rsvp', path: '/slides/rsvp.html' },
  ];

  for (const s of scenes) {
    const url = `http://127.0.0.1:9876${s.path}`;
    console.log(`Capturing ${s.name} from ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1200));

    const outPath = path.join(SLIDES_OUT_DIR, `${s.name}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`Saved: ${outPath}`);
  }

  await browser.close();
  server.close();
  console.log('All slides captured successfully!');
}

run().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
