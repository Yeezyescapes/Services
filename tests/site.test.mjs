import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
test('Original brand, real assets, service finder, and booking work across screen sizes', async () => {
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try {
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.TEST_BASE_URL||'http://127.0.0.1:3000');
 assert.match(await page.locator('h1').innerText(),/One partner\.\s*More possibility\./);
 assert.equal(await page.locator('img').evaluateAll(images=>images.every(i=>i.complete&&i.naturalWidth>0)),true);
 assert.equal(await page.locator('.service').count(),13);
 assert.equal(await page.locator('a[href="https://rentrapidnj.com"]').count(),1);
 await page.locator('.service button').first().click();assert.equal(await page.locator('.service button').first().getAttribute('aria-expanded'),'true');
 for(const [type,title] of [['agent','Lead-to-Move-In System'],['business','Business Clarity Bundle'],['idea','Custom Digital Build'],['landlord','Property Operations Setup']]){await page.locator(`[data-type="${type}"]`).click();assert.equal(await page.locator('#result h3').innerText(),title);}
 await page.locator('#result .cta').click();await page.locator('#bookName').fill('Test User');await page.locator('#bookEmail').fill('test@example.com');await page.locator('#bookDate').fill('2030-10-01');await page.locator('.book-form button').click();
 const href=await page.locator('#booking-email').getAttribute('href');assert.match(href,/^mailto:info@yeezyescapes.com/);assert.match(decodeURIComponent(href),/Name: Test User\nEmail: test@example.com/);
 await page.keyboard.press('Escape');assert.equal(await page.locator('.modal').isVisible(),false);
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'/tmp/yeezy-original-desktop.png',fullPage:true});
 for(const width of [320,390,768,1280]){await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`No overflow at ${width}`);}
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/yeezy-original-mobile.png',fullPage:true});
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.marquee span').evaluate(e=>getComputedStyle(e).animationName),'none');assert.deepEqual(errors,[]);
 }finally{await browser.close()}
});
