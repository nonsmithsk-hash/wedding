const path = require('path');
const fs = require('fs');
const http = require('http');
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

    server.listen(9877, '127.0.0.1', () => {
      console.log('Serving wedding/out on http://127.0.0.1:9877');
      resolve(server);
    });
  });
}

async function run() {
  const server = await createServer();
  const chromePath =
    '/home/red_sky/.cache/puppeteer/chrome-headless-shell/linux-150.0.7871.24/chrome-headless-shell-linux64/chrome-headless-shell';

  const outDir = path.join(
    '/home/red_sky/.gemini/antigravity/brain/a6fad08c-a596-44e0-9dd3-fd8d1e8d7da1',
    'preview_evidence'
  );
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  console.log('Navigating to http://127.0.0.1:9877...');
  await page.goto('http://127.0.0.1:9877', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  // 1. Capture Closed Book Cover
  const p1 = path.join(outDir, '01_book_cover.png');
  await page.screenshot({ path: p1, type: 'png' });
  console.log('Saved:', p1);

  // 2. Click to open book
  console.log('Opening book...');
  const openBtn = await page.$('button');
  if (openBtn) {
    await openBtn.click();
    await new Promise((r) => setTimeout(r, 1400));
  }

  // Capture Names Reveal
  const p2 = path.join(outDir, '02_names_reveal.png');
  await page.screenshot({ path: p2, type: 'png' });
  console.log('Saved:', p2);

  // 3. Scroll to Royal Scroll and click to unroll
  console.log('Unrolling scroll...');
  await page.evaluate(() => {
    window.scrollTo({ top: 750, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));

  // Click on unroll button / tassel
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('div, button, span'));
    const tassel = btns.find((el) => el.textContent && el.textContent.includes('खोलने के लिए'));
    if (tassel) tassel.click();
  });
  await new Promise((r) => setTimeout(r, 900));

  const p3 = path.join(outDir, '03_royal_scroll_unrolled.png');
  await page.screenshot({ path: p3, type: 'png' });
  console.log('Saved:', p3);

  // 4. Scroll to Festivities & Countdown
  console.log('Capturing Festivities & Countdown...');
  await page.evaluate(() => {
    window.scrollTo({ top: 1550, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  const p4 = path.join(outDir, '04_festivities_countdown.png');
  await page.screenshot({ path: p4, type: 'png' });
  console.log('Saved:', p4);

  // 5. Scroll to Family & Map
  console.log('Capturing Family, Reception & Location...');
  await page.evaluate(() => {
    window.scrollTo({ top: 2500, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  const p5 = path.join(outDir, '05_family_reception_location.png');
  await page.screenshot({ path: p5, type: 'png' });
  console.log('Saved:', p5);

  await browser.close();
  server.close();
  console.log('All preview screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
