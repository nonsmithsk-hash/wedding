const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const buttons = await page.$$eval('button', els => els.map(b => ({
    text: b.innerText,
    id: b.id,
    className: b.className
  })));
  console.log('Buttons found:', buttons);

  // Click the door open button
  const openBtn = await page.$('button.group');
  if (openBtn) {
    console.log('Found open button, clicking it!');
    await openBtn.click();
    console.log('Clicked! Waiting 2.5s for smooth scroll & transition to peacock section...');
    await new Promise(r => setTimeout(r, 2500));
    await page.screenshot({ path: 'scratch/button_peacock_landed.png' });
    console.log('Saved scratch/button_peacock_landed.png');
  } else {
    console.log('button.group not found');
  }

  await browser.close();
  console.log('Done test_button.js');
})();
