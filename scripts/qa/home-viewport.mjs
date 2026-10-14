/** @file Short-viewport Home and left portrait regression checks. @author meetbyte */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {startStaticServer} from './static-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const server=await startStaticServer(4175);let browser;const rows=[];
try{
 browser=await chromium.launch({executablePath:process.env.FOUNDATION_BROWSER_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 for(const mode of ['light','dark']){
  const context=await browser.newContext({colorScheme:mode});const page=await context.newPage();
  for(const [width,height]of [[1440,600],[1024,768],[375,667],[320,568]]){
   await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4175/');await page.evaluate(()=>document.fonts.ready);
   const geometry=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,title:getComputedStyle(document.querySelector('h1')).fontSize,body:getComputedStyle(document.body).fontSize}));
   assert.ok(geometry.scrollWidth<=width+1,JSON.stringify(geometry));assert.ok(geometry.scrollHeight<=height+1,JSON.stringify(geometry));
   rows.push({mode,...geometry});await page.screenshot({path:`docs/qa/ribbon-art/home-${mode}-${width}x${height}.png`,fullPage:true});
  }
  // A narrow, short reflow must remain usable instead of clipping content to prevent scrolling.
  await page.setViewportSize({width:320,height:400});await page.goto('http://127.0.0.1:4175/');await page.getByRole('link',{name:'Explore the work'}).scrollIntoViewIfNeeded();assert.ok(await page.getByRole('link',{name:'Explore the work'}).isVisible());await page.locator('footer').scrollIntoViewIfNeeded();assert.ok(await page.locator('footer').isVisible());
  await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:4175/experience/apex-self-service/');await page.screenshot({path:`docs/qa/ribbon-art/apex-${mode}-1440.png`,fullPage:true});
  await page.goto('http://127.0.0.1:4175/writing/ai-and-decisions/');await page.screenshot({path:`docs/qa/ribbon-art/essay-${mode}-1440.png`,fullPage:true});
  await context.close();
 }
 fs.writeFileSync('docs/qa/ribbon-art/home-viewports.json',JSON.stringify({rows,checks:['8 short/standard viewport theme checks','short reflow preserves reachable content','reading visual screenshots']},null,2));console.log('PASS: 8 short-viewport/theme fits and reachable reflow content');
}finally{await browser?.close();server.close();}
