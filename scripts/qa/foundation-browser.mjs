/** Foundation static-host browser checks; install Playwright separately. @author meetbyte */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const root=path.resolve('out');
const evidence=process.env.QA_OUTPUT_DIR || 'docs/qa/foundation';
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.pdf':'application/pdf','.txt':'text/x-component'};
const server=http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://local').pathname);let file=path.join(root,name);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,req.headers.rsc==='1'?'index.txt':'index.html');if(!fs.existsSync(file)){res.writeHead(404,{'content-type':'text/html'});return res.end(fs.readFileSync(path.join(root,'404.html')));}res.setHeader('content-type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
(async()=>{
 await new Promise(r=>server.listen(4173,'127.0.0.1',r));
 const b=await chromium.launch({executablePath:process.env.FOUNDATION_BROWSER_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'],headless:true});
 const results=[],errors=[];
 fs.mkdirSync(evidence,{recursive:true});
 for(const mode of ['light','dark'])for(const width of [320,375,768,1024,1440]){
  const c=await b.newContext({viewport:{width,height:900},colorScheme:mode,reducedMotion:'reduce'});
  const p=await c.newPage();p.on('pageerror',e=>errors.push(String(e)));
  for(const route of ['/','/about/','/resume/','/skills/','/contact/']){
   const response=await p.goto('http://127.0.0.1:4173'+route);assert.equal(response.status(),200);
   await p.getByRole('combobox',{name:'Appearance'}).waitFor();await p.waitForFunction(()=>!document.querySelector('select[aria-label="Appearance"]').disabled);await p.evaluate(()=>document.fonts.ready);
   assert.equal(await p.locator('html').getAttribute('data-theme'),mode);
   const metrics=await p.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,portrait:document.querySelectorAll('img[src*="meet-thummar"]').length,h1:document.querySelectorAll('h1').length}));
   assert.ok(metrics.scroll<=width+1,JSON.stringify({mode,width,route,...metrics}));assert.equal(metrics.portrait,route==='/about/'?1:0);assert.equal(metrics.h1,1); const geometry=await p.evaluate(()=>({main:document.querySelector('main').getBoundingClientRect().bottom,footer:document.querySelector('footer').getBoundingClientRect().top})); assert.ok(geometry.footer>=geometry.main,JSON.stringify(geometry));
   if(process.env.QA_ALL_PAGES || route==='/'||route==='/about/')await p.screenshot({path:`${evidence}/${route==='/'?'home':route.split('/')[1]}-${mode}-${width}.png`,fullPage:true});
   results.push({mode,width,route,...metrics});
  }
  await c.close();
 }
 const c=await b.newContext({viewport:{width:375,height:900},colorScheme:'dark'}),p=await c.newPage();
 await p.goto('http://127.0.0.1:4173/');await p.waitForFunction(()=>!document.querySelector('select').disabled);
 await p.getByRole('combobox',{name:'Appearance'}).selectOption('light');assert.equal(await p.locator('html').getAttribute('data-theme'),'light');await p.reload();await p.waitForFunction(()=>!document.querySelector('select').disabled);assert.equal(await p.locator('html').getAttribute('data-theme'),'light');
 await p.emulateMedia({colorScheme:'dark'});assert.equal(await p.locator('html').getAttribute('data-theme'),'light');
 await p.getByRole('combobox',{name:'Appearance'}).selectOption('system');await p.waitForFunction(()=>document.documentElement.dataset.theme==='dark');await p.emulateMedia({colorScheme:'light'});await p.waitForFunction(()=>document.documentElement.dataset.theme==='light');
 await p.locator('summary').click();assert.equal(await p.locator('details').getAttribute('open'),'');await p.keyboard.press('Escape');assert.equal(await p.locator('details').getAttribute('open'),null);assert.equal(await p.evaluate(()=>document.activeElement.tagName),'SUMMARY');
 await p.locator('summary').click();await p.locator('details').getByRole('link',{name:'About',exact:true}).click();await p.waitForURL(/\/about\/?$/);await p.waitForFunction(()=>document.activeElement.id==='main-content');
 for(const route of ['/experience/','/writing/','/projects/','/blog/','/does-not-exist/']) { const response=await p.goto('http://127.0.0.1:4173'+route); assert.equal(response.status(),404,`${route}: ${response.url()}`); }
 assert.equal((await p.request.get('http://127.0.0.1:4173/files/Meet-Thummar-CV.pdf')).status(),200);
 await c.close();assert.deepEqual(errors,[]);
 // Denied storage must retain a usable manual selection during this visit.
 const denied=await b.newContext({colorScheme:'dark'});await denied.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('denied')}}));const q=await denied.newPage();await q.goto('http://127.0.0.1:4173/');await q.waitForFunction(()=>!document.querySelector('select').disabled);assert.equal(await q.locator('html').getAttribute('data-theme'),'dark');await q.getByRole('combobox',{name:'Appearance'}).selectOption('light');assert.equal(await q.locator('html').getAttribute('data-theme'),'light');await denied.close();
 fs.writeFileSync(`${evidence}/browser-results.json`,JSON.stringify({routes:results,checks:['persistent override across reload','OS changes in System mode','manual choice ignores OS','blocked storage','Escape returns menu focus','client route focus','unpublished/unknown 404','CV asset','no runtime errors']},null,2));
 console.log('PASS: 50 route/theme/viewport checks plus theme, menu, focus and publication checks');await b.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exit(1)});
