/** @file Verify changing inner-page artwork, stable Home and theme-aware portrait visibility. @author meetbyte */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {startStaticServer} from './static-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const server=await startStaticServer(4179);let browser;
const output='docs/qa/pr-ready';fs.mkdirSync(output,{recursive:true});
try {
 browser=await chromium.launch({executablePath:process.env.FOUNDATION_BROWSER_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const ready=async()=>{await page.waitForFunction(()=>!document.querySelector('.theme-toggle').disabled);await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>!document.querySelector(".inner-ink")||document.querySelector(".inner-ink").dataset.ready==="true");await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));};
 const scene=()=>page.locator('.inner-ink').getAttribute('data-composition');
 await page.goto('http://127.0.0.1:4179/skills/');await ready();const first=await scene();await page.reload();await ready();const second=await scene();assert.notEqual(first,second);
 await page.getByRole('button',{name:'Switch to dark theme'}).click();assert.equal(await scene(),second,'Theme switch must preserve this visit’s composition');
 await page.locator('.desktop-navigation').getByRole('link',{name:'Writing',exact:true}).click();await page.waitForURL(/writing/);await ready();
 await page.locator('.desktop-navigation').getByRole('link',{name:'Skills',exact:true}).click();await page.waitForURL(/skills/);await ready();const revisit=await scene();assert.notEqual(second,revisit);
 await page.goto('http://127.0.0.1:4179/');await ready();const home=await page.locator('.ink-layer').evaluate(e=>({background:getComputedStyle(e).backgroundImage,width:e.offsetWidth,height:e.offsetHeight,transform:getComputedStyle(e).transform,nameTop:document.querySelector("h1").getBoundingClientRect().top}));await page.reload();await ready();assert.deepEqual(await page.locator('.ink-layer').evaluate(e=>({background:getComputedStyle(e).backgroundImage,width:e.offsetWidth,height:e.offsetHeight,transform:getComputedStyle(e).transform,nameTop:document.querySelector("h1").getBoundingClientRect().top})),home);assert.equal(await page.locator('.inner-ink').count(),0);assert.equal(home.transform,'none');assert.ok(home.background.includes('home-dark-landscape.webp'));assert.ok(home.nameTop>=450,"Desktop identity must begin in the lower half of the 900px Home viewport");
 await page.goto('http://127.0.0.1:4179/about/');await ready();assert.ok(await page.locator('.portrait-dark').isVisible());assert.equal(await page.locator('.portrait-light').isVisible(),false);await page.getByRole('button',{name:'Switch to light theme'}).click();assert.ok(await page.locator('.portrait-light').isVisible());assert.equal(await page.locator('.portrait-dark').isVisible(),false);
 fs.writeFileSync(output+'/ink-visits.json',JSON.stringify({first,second,revisit,home,checks:['inner artwork changes on refresh and route return','theme switch preserves composition','Line-free landscape Home remains fixed without rotation; desktop name begins below midpoint','one visible portrait with matching theme']},null,2));console.log('PASS: artwork visit and portrait theme behavior');
} finally {await browser?.close();server.close();}
