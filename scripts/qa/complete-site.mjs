/**
 * @file Reproducible complete-site responsive, accessibility and link checks against the static export.
 * @author meetbyte
 */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {startStaticServer} from './static-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const axePath=process.env.AXE_SCRIPT_PATH;
if(!axePath)throw new Error('Set AXE_SCRIPT_PATH to the separately installed axe-core/axe.min.js.');
const routes=['/','/about/','/resume/','/skills/','/experience/','/writing/','/contact/','/experience/apex-self-service/','/experience/mobilefirst-modernization/','/experience/engineering-tooling/','/experience/production-investigation/','/writing/beyond-screens/','/writing/modernizing-safely/','/writing/behind-the-requirement/','/writing/software-meets-reality/','/writing/ai-and-decisions/','/writing/thinking-slowly/'];
const output='docs/qa/first-paint-ink';fs.mkdirSync(output,{recursive:true});
const results={layouts:[],axe:[],localLinks:[],navigation:[],errors:[]};
const server=await startStaticServer();let browser;
try{
 browser=await chromium.launch({executablePath:process.env.FOUNDATION_BROWSER_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>results.errors.push(String(e)));
 const local=new Set();
 for(const mode of ['light','dark'])for(const width of [320,375,768,1024,1440]){
  await page.setViewportSize({width,height:900});await page.emulateMedia({colorScheme:mode});
  for(const route of routes){
   const response=await page.goto('http://127.0.0.1:4173'+route);assert.equal(response.status(),200,route);
   await page.waitForFunction(()=>!document.querySelector('.theme-toggle').disabled);await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>!document.querySelector(".inner-ink")||document.querySelector(".inner-ink").dataset.ready==="true");
   assert.equal(await page.locator('html').getAttribute('data-theme'),mode);
   const metrics=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth,h1:document.querySelectorAll('h1').length,portrait:[...document.querySelectorAll('img[src*="meet-thummar"]')].filter(e=>e.getBoundingClientRect().width>0).length,main:document.querySelector('main').getBoundingClientRect().bottom,footer:document.querySelector('footer').getBoundingClientRect().top,background:getComputedStyle(document.querySelector('.ink-layer')).backgroundImage,artBottom:document.querySelector('.page-atmosphere').getBoundingClientRect().bottom,documentHeight:document.documentElement.scrollHeight}));
   assert.ok(metrics.scroll<=width+1,JSON.stringify({mode,width,route,...metrics}));assert.equal(metrics.h1,1,route);assert.equal(metrics.portrait,route==='/about/'?1:0,route);assert.ok(metrics.footer>=metrics.main,route);if(route==='/')assert.ok(metrics.background.includes(`home-${mode}-`));else assert.equal(await page.locator('.inner-ink').count(),1);assert.ok(metrics.artBottom>=metrics.documentHeight-2,'Artwork must span the document');
   assert.equal(await page.getByText('Draft',{exact:true}).count(),0);
   if(route==='/')assert.ok(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1),'Home should fit the standard viewport');
   if(route==='/skills/')assert.ok(await page.locator('.ink-layer').evaluate(e=>Number(getComputedStyle(e).opacity)>=.24),'Skills ink must remain visible');
   if(route==='/about/' && width>=768)assert.ok(await page.evaluate(()=>document.querySelector('.about-portrait').getBoundingClientRect().left<document.querySelector('.about-intro-copy').getBoundingClientRect().left),'Portrait must be on the left');
   if(/experience\/[^/]+/.test(route))assert.equal(await page.locator('.experience-map').count(),1);
   if(/writing\/[^/]+/.test(route))assert.equal(await page.locator('.article-prose blockquote a').count(),1);
   assert.equal(await page.locator('.site-brand svg').count(),1);assert.equal(await page.locator('.site-brand svg rect').getAttribute('fill'),'var(--logo-color)');
   assert.equal(await page.locator('select').count(),0);
   if(route==='/experience/')assert.equal(await page.locator('main .eyebrow').first().innerText(),'04 / EXPERIENCE');
   if(route==='/writing/')assert.equal(await page.locator('main .eyebrow').first().innerText(),'05 / WRITING');
   results.layouts.push({mode,width,route,...metrics});
   if(['/','/about/','/resume/','/skills/','/experience/','/writing/','/contact/'].includes(route))await page.screenshot({path:`${output}/${route==='/'?'home':route.split('/')[1]}-${mode}-${width}.png`,fullPage:true});
   if(width===1440){
    await page.addScriptTag({path:axePath});const a=await page.evaluate(async()=>await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
    results.axe.push({mode,route,violations:a.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:a.incomplete.map(v=>({id:v.id,nodes:v.nodes.length}))});
    for(const url of await page.evaluate(()=>[...document.querySelectorAll('a[href],img[src],link[href]')].map(e=>e.getAttribute('href')||e.getAttribute('src')).filter(v=>v?.startsWith('/')&&!v.startsWith('//'))))local.add(url.split('#')[0]);
    if(route!=='/')assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://meetbyte.github.io'+route);
   }
  }
  console.log(`layout pass: ${mode} ${width}, ${routes.length} routes`);
 }
 for(const link of local){const response=await page.request.get('http://127.0.0.1:4173'+link);results.localLinks.push({link,status:response.status()});assert.equal(response.status(),200,link);}
 for(const [old,target] of [['/projects/','/experience/'],['/blog/','/writing/']]){assert.equal((await page.goto('http://127.0.0.1:4173'+old)).status(),200);assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://meetbyte.github.io'+target);assert.ok((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));assert.equal(await page.locator(`main a[href="${target}"]`).count(),1);}
 for(const route of ['/projects/workflow-workspace/','/blog/a-place-for-technical-notes/','/writing/_unpublished/','/experience/_unpublished/','/does-not-exist/'])assert.equal((await page.goto('http://127.0.0.1:4173'+route)).status(),404,route);
 await page.setViewportSize({width:375,height:900});await page.emulateMedia({colorScheme:'light'});await page.goto('http://127.0.0.1:4173/');await page.waitForFunction(()=>!document.querySelector('.theme-toggle').disabled);if(await page.locator('html').getAttribute('data-theme')!=='dark')await page.getByRole('button',{name:'Switch to dark theme'}).click();await page.reload();await page.waitForFunction(()=>!document.querySelector('.theme-toggle').disabled);assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await page.evaluate(()=>{localStorage.removeItem('meetbyte-theme-preference');window.dispatchEvent(new CustomEvent('meetbyte:theme-preference',{detail:'system'}));});await page.emulateMedia({colorScheme:'light'});await page.waitForFunction(()=>document.documentElement.dataset.theme==='light');
 await page.locator('summary').click();await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.tagName),'SUMMARY');assert.equal(await page.locator('details').getAttribute('open'),null);
 await page.locator('summary').click();await page.locator('details').getByRole('link',{name:'About',exact:true}).click();await page.waitForURL(/\/about\/?$/);await page.waitForFunction(()=>document.activeElement.id==='main-content');assert.equal(await page.locator('.connection-notice').count(),0);
 await page.locator('summary').click();await page.locator('details').getByRole('link',{name:'About',exact:true}).click();await page.waitForTimeout(5200);assert.equal(await page.locator('.connection-notice').count(),0);
 results.navigation=['real alias canonicals/noindex','legacy sample/unknown 404s','theme persistence/system','mobile Escape focus','route focus','same-route loading recovery'];
 assert.deepEqual(results.errors,[]);
 fs.writeFileSync(output+'/results.json',JSON.stringify(results,null,2));
 const violations=results.axe.reduce((n,r)=>n+r.violations.length,0);console.log(JSON.stringify({layouts:results.layouts.length,axeRuns:results.axe.length,violations,links:results.localLinks.length}));if(violations)process.exitCode=1;
}catch(error){fs.writeFileSync(output+'/results.json',JSON.stringify(results,null,2));console.error(error);process.exitCode=1;}finally{if(browser)await browser.close();server.close();}
