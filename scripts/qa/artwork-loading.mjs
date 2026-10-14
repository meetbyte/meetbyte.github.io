/** @file Observe first-visible artwork through slow/failed loads, route changes and theme updates. @author meetbyte */
import fs from 'node:fs';import assert from 'node:assert/strict';import {startStaticServer} from './static-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');const server=await startStaticServer(4184);let browser;const rows=[];
try {
 browser=await chromium.launch({executablePath:process.env.FOUNDATION_BROWSER_EXECUTABLE,args:['--no-sandbox']});
 for(const loading of ['normal','slow','failed','blocked-storage']) {
  const context=await browser.newContext({viewport:{width:1440,height:900}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.addInitScript(({blocked})=>{
   if(blocked)Object.defineProperty(window,'sessionStorage',{get(){throw new DOMException('Blocked','SecurityError');}});
   window.artFrames=[];let last='';
   const record=()=>{const e=document.querySelector('.inner-ink');if(e?.querySelector('svg')){const key=location.pathname+':'+e.dataset.composition;if(key!==last){window.artFrames.push({route:location.pathname,composition:e.dataset.composition,ready:e.dataset.ready});last=key;}}};
   new MutationObserver(record).observe(document,{subtree:true,childList:true,attributes:true,attributeFilter:['data-composition','data-ready']});
  },{blocked:loading==='blocked-storage'});
  if(loading==='slow')await page.route('**/hero-*-600.webp',async route=>{await new Promise(r=>setTimeout(r,350));await route.continue();});
  if(loading==='failed')await page.route('**/hero-*-600.webp',route=>route.abort());
  await page.goto('http://127.0.0.1:4184/skills/');await page.waitForFunction(()=>document.querySelector('.inner-ink')?.dataset.ready==='true');
  await page.waitForTimeout(400);const initial=await page.evaluate(()=>window.artFrames);assert.equal(initial.length,1,'Only one composition may become visible on initial load');assert.equal(initial[0].ready,'true');
  const art=await page.locator('.inner-ink').getAttribute('data-composition');await page.waitForFunction(()=>!document.querySelector('.theme-toggle').disabled);await page.getByRole('button',{name:'Switch to dark theme'}).click();assert.equal(await page.locator('.inner-ink').getAttribute('data-composition'),art);assert.equal((await page.evaluate(()=>window.artFrames)).length,1);
  await page.locator('.desktop-navigation').getByRole('link',{name:'Writing',exact:true}).click();await page.waitForURL(/writing/);await page.waitForFunction(()=>document.querySelector('.inner-ink')?.dataset.ready==='true');await page.waitForTimeout(200);
  await page.locator('.desktop-navigation').getByRole('link',{name:'Skills',exact:true}).click();await page.waitForURL(/skills/);await page.waitForFunction(()=>document.querySelector('.inner-ink')?.dataset.ready==='true');await page.waitForTimeout(200);
  const frames=await page.evaluate(()=>window.artFrames);assert.equal(frames.length,3,'Each route visit reveals exactly one composition');assert.deepEqual(errors,[]);
  rows.push({loading,frames,errors});await context.close();
 }
 fs.mkdirSync('docs/qa/pr-ready',{recursive:true});fs.writeFileSync('docs/qa/pr-ready/artwork-loading.json',JSON.stringify({rows,checks:['one first-visible composition, no interim server design','theme preserves composition','one selection per client navigation','slow/failed image loads and blocked storage remain usable']},null,2));console.log('PASS: 4 loading modes with stable initial and client-navigation artwork');
}finally{await browser?.close();server.close();}
