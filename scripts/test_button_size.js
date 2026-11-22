const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  // Test mobile phone viewport (390 x 844, typical iPhone / Android)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const btnInfo = await page.evaluate(() => {
    const btn = document.querySelector('#open-door-btn');
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      bottom: rect.bottom,
      viewportHeight: window.innerHeight,
      distanceFromBottom: window.innerHeight - rect.bottom,
      innerText: btn.innerText
    };
  });

  console.log('Mobile Button Info:', JSON.stringify(btnInfo, null, 2));

  await page.screenshot({ path: 'scratch/button_size_mobile.png' });
  console.log('Saved scratch/button_size_mobile.png');

  // Also test desktop viewport
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/button_size_desktop.png' });
  console.log('Saved scratch/button_size_desktop.png');

  // Test button click redirection
  const btn = await page.$('#open-door-btn');
  if (btn) {
    console.log('Clicking button...');
    await btn.click();
    await new Promise(r => setTimeout(r, 2000));
    console.log('URL after click:', page.url());
  }

  await browser.close();
})();
