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
const SLIDES_OUT_DIR = path.join(__dirname, '..', 'scratch', 'video_slides_v2');

function createServer(port = 9888) {
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
        res.end('Not found: ' + cleanUrl);
      }
    });

    server.listen(port, '127.0.0.1', () => {
      console.log(`Serving wedding/out on http://127.0.0.1:${port}`);
      resolve(server);
    });
  });
}

async function run() {
  if (!fs.existsSync(SLIDES_OUT_DIR)) {
    fs.mkdirSync(SLIDES_OUT_DIR, { recursive: true });
  }

  const port = 9888;
  const server = await createServer(port);

  const chromePath =
    '/home/red_sky/.cache/puppeteer/chrome-headless-shell/linux-150.0.7871.24/chrome-headless-shell-linux64/chrome-headless-shell';

  console.log('Launching chrome-headless-shell from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const scenes = [
    { name: '01_book_cover', path: '/slides/book_cover.html' },
    { name: '02_couple_arch', path: '/slides/couple.html' },
    { name: '03_royal_scroll', path: '/slides/royal_scroll.html' },
    { name: '04_tilak', path: '/slides/tilak.html' },
    { name: '05_sangeet', path: '/slides/sangeet.html' },
    { name: '06_haldi', path: '/slides/haldi.html' },
    { name: '07_shubh_vivah', path: '/slides/wedding.html' },
    { name: '08_family_blessings', path: '/slides/family.html' },
    { name: '09_designer_credits', path: '/slides/credits.html' },
  ];

  for (const s of scenes) {
    const url = `http://127.0.0.1:${port}${s.path}`;
    console.log(`Capturing ${s.name} from ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1500));

    const outPath = path.join(SLIDES_OUT_DIR, `${s.name}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`Saved: ${outPath} (${fs.statSync(outPath).size} bytes)`);
  }

  await browser.close();
  server.close();
  console.log('All slides captured successfully!');
}

run().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
