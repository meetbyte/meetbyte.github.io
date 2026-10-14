/** @file Verify native ink before hydration, including refresh and delayed/failed client scripts. @author meetbyte */
import fs from 'node:fs';import sharp from 'sharp';import assert from 'node:assert/strict';import {startStaticServer} from './static-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');const server=await startStaticServer(4197);let browser;const rows=[];
const geometry=async page=>page.locator('.inner-ink').evaluate(e=>({variant:document.documentElement.dataset.inkVariant||'0',ready:e.dataset.ready,svg:e.querySelectorAll('svg').length,primary:getComputedStyle(e.querySelector('.ink-primary-stain')).transform,shape:[...e.querySelectorAll('.ink-outline')].filter(p=>getComputedStyle(p).display!=='none').map(p=>p.getAttribute('d')),opacity:getComputedStyle(e).opacity}));
try {
 browser=await chromium.launch({executablePath:process.env.FOUNDATION_BROWSER_EXECUTABLE,args:['--no-sandbox']});
 for(const mode of ['light','dark'])for(const loading of ['normal','delayed-client','failed-client','slow-image','failed-image','blocked-storage','no-js']) {
  const context=await browser.newContext({viewport:{width:1440,height:900},colorScheme:mode,javaScriptEnabled:loading!=='no-js'});const page=await context.newPage();page.setDefaultTimeout(10000);console.log(`first-paint: ${mode} ${loading}`);const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  if(loading==='blocked-storage')await page.addInitScript(()=>Object.defineProperty(window,'sessionStorage',{get(){throw new DOMException('Blocked','SecurityError');}}));
  if(loading==='delayed-client')await page.route('**/_next/static/**/*.js',async route=>{await new Promise(r=>setTimeout(r,600));await route.continue();});
  if(loading==='failed-client')await page.route('**/_next/static/**/*.js',route=>route.abort());
  if(loading==='slow-image')await page.route('**/hero-*-600.webp',async route=>{await new Promise(r=>setTimeout(r,450));await route.continue();});
  if(loading==='failed-image')await page.route('**/hero-*-600.webp',route=>route.abort());
  await page.goto('http://127.0.0.1:4197/skills/',{waitUntil:'commit'});
  await page.locator('.inner-ink svg').first().waitFor({state:'visible'});if(loading==='no-js')await page.waitForTimeout(100);else await page.waitForFunction(()=>getComputedStyle(document.querySelector('.inner-ink')).opacity!=='1');
  const first=await geometry(page);
  await page.evaluate(()=>{const style=document.createElement('style');style.id='ink-pixel-hide';style.textContent='body > *:not(.page-atmosphere){visibility:hidden!important}';document.head.appendChild(style);});
  const base=await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--page').trim());
  const background=base.replace(/^#/,'').match(/.{2}/g).map(v=>parseInt(v,16));
  const cdp=await context.newCDPSession(page);const shot=Buffer.from((await cdp.send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false})).data,"base64");await cdp.detach();const {data,info}=await sharp(shot).raw().toBuffer({resolveWithObject:true});let inkPixels=0;
  for(let y=10;y<info.height;y+=12)for(let x=10;x<info.width;x+=12){const offset=(y*info.width+x)*info.channels;if(background.some((v,c)=>Math.abs(data[offset+c]-v)>5))inkPixels++;}
  await page.evaluate(()=>document.querySelector('#ink-pixel-hide').remove());assert.ok(inkPixels>12,'Before client hydration the rendered background must contain actual ink pixels, not just an empty SVG');
assert.equal(first.svg,2);assert.equal(first.shape.length,1);assert.equal(first.ready,'true');assert.notEqual(first.primary,'none');
  // Failed-client/no-JS cases prove actual ink pixels without hydration; delayed-client retains real script loading.
  await page.waitForTimeout(1000);const settled=await geometry(page);assert.deepEqual(settled,first,'First-visible ink must not change or disappear when hydration/images complete');
  if(!['failed-client','no-js'].includes(loading)) {
   await page.waitForFunction(()=>!document.querySelector('.theme-toggle').disabled);
   await page.getByRole('button',{name:/Switch to .* theme/}).click();assert.equal((await geometry(page)).variant,first.variant);
   await page.locator('.desktop-navigation').getByRole('link',{name:'Writing',exact:true}).click();await page.waitForURL(/writing/);await page.waitForFunction(()=>document.documentElement.dataset.inkPath==='/writing');const writing=await geometry(page);
   await page.reload({waitUntil:'commit'});await page.locator('.inner-ink svg').first().waitFor({state:'visible'});const refreshed=await geometry(page);await page.waitForTimeout(650);assert.deepEqual(await geometry(page),refreshed,'Refresh has no hydration artwork swap');if(loading!=='blocked-storage')assert.notEqual(refreshed.variant,writing.variant);
  }
  assert.deepEqual(errors,[]);rows.push({mode,loading,first,settled,inkPixels,errors});await context.close();
 }
 fs.mkdirSync('docs/qa/first-paint-ink',{recursive:true});fs.writeFileSync('docs/qa/first-paint-ink/artwork-loading.json',JSON.stringify({rows,checks:['native ink is already visible with client bundles delayed or failed','no empty server SVG or hydration composition swap','refresh and navigation retain one selected pattern','no-JS fallback, slow/failed images and blocked storage retain visible ink']},null,2));console.log('PASS: 14 first-paint/loading/storage theme cases, including pre-hydration and refresh');
}finally{await browser?.close();server.close();}
