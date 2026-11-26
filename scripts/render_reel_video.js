const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
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
};

const ROOT_DIR = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT_DIR, 'out');
const AUDIO_PATH = path.join(ROOT_DIR, 'public', 'audio', 'wedding_theme.mp3');
const VIDEO_DIR = path.join(ROOT_DIR, 'public', 'video');
const OUT_VIDEO = path.join(VIDEO_DIR, 'rakesh_pooja_wedding_invitation.mp4');
const OUT_VIDEO_ALT = path.join(VIDEO_DIR, 'rakesh_pooja_wedding.mp4');
const DOWNLOADS_VIDEO = '/home/red_sky/Downloads/rakesh_pooja_wedding_invitation.mp4';

const CHROME_PATH =
  '/home/red_sky/.cache/puppeteer/chrome-headless-shell/linux-150.0.7871.24/chrome-headless-shell-linux64/chrome-headless-shell';

function createServer(port = 9889) {
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
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found: ' + cleanUrl);
      }
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function run() {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
  const server = await createServer(9889);
  console.log('Static server listening on http://127.0.0.1:9889');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1080,1920',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  console.log('Loading /video-reel ...');
  await page.goto('http://127.0.0.1:9889/video-reel', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Preload all images in DOM
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.onload = res;
              img.onerror = res;
            })
      )
    );
  });

  const cdp = await page.createCDPSession();

  const FPS = 30;
  const DURATION = 47.0;
  const TOTAL_FRAMES = Math.round(DURATION * FPS);

  console.log(`Starting FFmpeg encode: ${TOTAL_FRAMES} frames @ ${FPS}fps (${DURATION}s)...`);
  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(FPS),
    '-i', '-',
    '-i', AUDIO_PATH,
    '-filter_complex', `[1:a]afade=type=in:start_time=0:duration=1.0,afade=type=out:start_time=${DURATION - 1.5}:duration=1.5[a_out]`,
    '-map', '0:v',
    '-map', '[a_out]',
    '-t', String(DURATION),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'medium',
    '-crf', '18',
    '-c:a', 'aac',
    '-b:a', '256k',
    OUT_VIDEO,
  ]);

  let ffmpegErr = '';
  ffmpeg.stderr.on('data', (chunk) => {
    ffmpegErr += chunk.toString();
  });

  const ffmpegDone = new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}: ${ffmpegErr.slice(-1500)}`));
    });
  });

  const startTs = Date.now();
  for (let f = 0; f < TOTAL_FRAMES; f++) {
    const t = f / FPS;
    await page.evaluate((timeVal) => {
      if (window.__seekTo) window.__seekTo(timeVal);
      return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }, t);

    const { data } = await cdp.send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 94,
    });
    const buf = Buffer.from(data, 'base64');
    if (!ffmpeg.stdin.write(buf)) {
      await new Promise((res) => ffmpeg.stdin.once('drain', res));
    }

    if (f % 150 === 0 || f === TOTAL_FRAMES - 1) {
      const elapsed = ((Date.now() - startTs) / 1000).toFixed(1);
      console.log(`Rendered frame ${f + 1}/${TOTAL_FRAMES} (t=${t.toFixed(2)}s) [${elapsed}s elapsed]`);
    }
  }

  ffmpeg.stdin.end();
  await ffmpegDone;

  await browser.close();
  server.close();

  fs.copyFileSync(OUT_VIDEO, OUT_VIDEO_ALT);
  fs.copyFileSync(OUT_VIDEO, DOWNLOADS_VIDEO);

  const outStaticDir = path.join(OUT_DIR, 'video');
  if (fs.existsSync(outStaticDir)) {
    fs.copyFileSync(OUT_VIDEO, path.join(outStaticDir, 'rakesh_pooja_wedding_invitation.mp4'));
    fs.copyFileSync(OUT_VIDEO, path.join(outStaticDir, 'rakesh_pooja_wedding.mp4'));
  }

  const sizeMB = (fs.statSync(OUT_VIDEO).size / (1024 * 1024)).toFixed(2);
  console.log(`SUCCESS: Rendered ${OUT_VIDEO} (${sizeMB} MB)`);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
