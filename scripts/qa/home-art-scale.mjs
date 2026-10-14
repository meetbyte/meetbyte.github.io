/** @file Record native Home artwork scaling and inspect desktop/mobile compositions. @author meetbyte */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {startStaticServer} from './static-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const output='docs/qa/pr-ready';fs.mkdirSync(output,{recursive:true});
const server=await startStaticServer(4183);let browser;const rows=[];
try {
 browser=await chromium.launch({executablePath:process.env.FOUNDATION_BROWSER_EXECUTABLE,args:['--no-sandbox']});
 for(const mode of ['light','dark'])for(const [width,height]of [[1668,940],[375,812],[1920,1080],[768,1024]]) {
  const page=await browser.newPage({viewport:{width,height},colorScheme:mode,reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:4183/');await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>!document.querySelector('.theme-toggle').disabled);
  const row=await page.locator('.ink-layer').evaluate(async e=>{
   const s=getComputedStyle(e),url=s.backgroundImage.match(/url\("?(.*?)"?\)/)[1],im=new Image();im.src=url;await im.decode();
   return {width:innerWidth,height:innerHeight,artWidth:e.offsetWidth,artHeight:e.offsetHeight,transform:s.transform,mask:s.maskImage,background:s.backgroundImage,source:[im.naturalWidth,im.naturalHeight],opacity:s.opacity};
  });
  row.coverScale=Math.max(row.artWidth/row.source[0],row.artHeight/row.source[1]);
  assert.equal(row.transform,'none');assert.equal(row.mask,'none');
  assert.ok(row.background.includes(width<=height?'portrait.webp':'landscape.webp'));
  assert.ok(row.coverScale<=1.16,'Representative screens must not heavily enlarge the source');
  rows.push({mode,...row});await page.screenshot({path:`${output}/home-${mode}-${width}.png`});await page.close();
 }
 fs.writeFileSync(`${output}/art-scale.json`,JSON.stringify({rows,checks:['native landscape or portrait based on screen aspect','no CSS rotation or mask','cover scale <=1.16 on representative screens; no claim of native 4K or retina resolution']},null,2));
 console.log('PASS: 8 native-art framing and scale checks');
}finally{await browser?.close();server.close();}
