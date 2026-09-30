import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
test('Website desktop and mobile functionality', async () => {
 const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
 try {
 const page = await browser.newPage();
 await page.route('https://fonts.googleapis.com/**', route => route.abort());
 const errors = []; page.on('pageerror', error => errors.push(error.message));
 await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:3000', {waitUntil:'domcontentloaded'});
 assert.equal(await page.locator('header').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(255, 255, 255)');
 assert.equal(await page.locator('.service-card').count(), 6);
 assert.match(await page.locator('body').innerText(), /Rapid Rentals/);
 assert.match(await page.locator('nav .button').getAttribute('href'), /mailto:info@yeezyescapes.com/);
 await page.locator('details summary').first().click();
 assert.equal(await page.locator('details').first().getAttribute('open'), '');
 await page.screenshot({path:'/tmp/yeezy-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
 await page.locator('.menu-toggle').click();
 assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
 await page.locator('nav a[href="#services"]').click();
 assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
 await page.locator('input[name="name"]').fill('Test User');
 await page.locator('input[name="email"]').fill('test@example.com');
 await page.locator('#service').selectOption('Property management');
 await page.locator('textarea[name="message"]').fill('Test property consultation');
 await page.locator('button[type="submit"]').click();
 await page.locator('#inquiry-result').waitFor({state:'visible'});
 assert.match(await page.locator('#inquiry-text').inputValue(), /Test property consultation/);
 await page.screenshot({path:'/tmp/yeezy-mobile.png',fullPage:true});
 assert.deepEqual(errors, []);
 } finally { await browser.close(); }
});
