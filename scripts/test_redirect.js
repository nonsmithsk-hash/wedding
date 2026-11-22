const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.toString()));

  // Mobile viewport matching user's phone screenshot (390x844)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  // 1. Visit Door Page (/)
  console.log('Navigating to Door Page (http://localhost:3001)...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/page_1_door.png' });
  console.log('Captured scratch/page_1_door.png');

  // 2. Click the Royal Button or door
  let btn = await page.$('#open-door-btn');
  if (!btn) {
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await (await b.getProperty('innerText')).jsonValue();
      if (text.includes('द्वार खोलें')) {
        btn = b;
        break;
      }
    }
  }

  if (btn) {
    console.log('Clicking door button...');
    await Promise.all([
      btn.click(),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }).catch(e => console.log('Navigation wait:', e.message))
    ]);
    await new Promise(r => setTimeout(r, 1500));

    console.log('Current URL after redirect:', page.url());
    await page.screenshot({ path: 'scratch/page_2_peacock_invitation.png' });
    console.log('Captured scratch/page_2_peacock_invitation.png');
  } else {
    console.error('Door button not found!');
  }

  // 3. Test scrolling down on /invitation to check ceremonies
  await page.evaluate(() => window.scrollTo(0, 1000));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scratch/page_2_ceremony_scroll.png' });
  console.log('Captured scratch/page_2_ceremony_scroll.png');

  // 4. Test desktop viewport
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scratch/desktop_page_1_door.png' });
  console.log('Captured scratch/desktop_page_1_door.png');

  await page.goto('http://localhost:3001/invitation', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scratch/desktop_page_2_peacock.png' });
  console.log('Captured scratch/desktop_page_2_peacock.png');

  await browser.close();
  console.log('All verifications completed! Total errors:', errors.length);
})();
