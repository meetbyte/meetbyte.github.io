/**
 * @file Targeted navigation/content/artwork regressions against the actual static export.
 * @author meetbyte
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const root=path.resolve('out');
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.woff2':'font/woff2','.txt':'text/x-component'};
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,'http://local').pathname);let file=path.join(root,name);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,req.headers.rsc==='1'?'index.txt':'index.html');
 if(!fs.existsSync(file)){res.writeHead(404,{'content-type':'text/html'});return res.end(fs.readFileSync(path.join(root,'404.html')));}
 res.setHeader('content-type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
let browser;
try{
 await new Promise(resolve=>server.listen(4173,'127.0.0.1',resolve));
 browser=await chromium.launch({executablePath:process.env.FOUNDATION_BROWSER_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const page=await browser.newPage({viewport:{width:1440,height:900},colorScheme:'light'});const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('http://127.0.0.1:4173/');await page.waitForFunction(()=>!document.querySelector('select').disabled);await page.evaluate(()=>document.fonts.ready);
 const words=(await page.locator('main').innerText()).split(/\s+/).length;assert.ok(words<35,`Home has ${words} words`);
 assert.equal(await page.locator('.artwork-light').evaluate(e=>getComputedStyle(e).display),'block');
 fs.mkdirSync('docs/qa/corrections-artwork',{recursive:true});await page.screenshot({path:'docs/qa/corrections-artwork/home-light-desktop.png',fullPage:true});
 for(const name of ['About','Experience','Writing','Contact']){
  await page.getByRole('link',{name,exact:true}).first().click();await page.waitForURL(new RegExp('/'+name.toLowerCase()+'/?$'));
  assert.equal(await page.locator('.connection-notice').count(),0,name);
 }
 // Clicking the active route must not leave a trailing-slash mismatch waiting forever.
 await page.getByRole('link',{name:'Contact',exact:true}).first().click();await page.waitForTimeout(5200);assert.equal(await page.locator('.connection-notice').count(),0);
 for(const [kind,slugs] of [['experience',['apex-self-service','mobilefirst-modernization','engineering-tooling','production-investigation']],['writing',['beyond-screens','modernizing-safely','behind-the-requirement','software-meets-reality','ai-and-decisions','thinking-slowly']]]){
  for(const slug of slugs){assert.equal((await page.goto(`http://127.0.0.1:4173/${kind}/${slug}/`)).status(),200);assert.equal(await page.getByText('Draft',{exact:true}).count(),0);if(kind==='writing')assert.equal(await page.locator('blockquote').count(),1);}
 }
 await page.goto('http://127.0.0.1:4173/experience/apex-self-service/');const text=await page.locator('main').innerText();for(const phrase of ['DBA','LDAP','PII','User, Supervisor and Admin','weekly or monthly','server installation'])assert.ok(text.includes(phrase),phrase);assert.ok(!text.includes('content brief'));
 await page.setViewportSize({width:320,height:900});await page.goto('http://127.0.0.1:4173/');await page.waitForFunction(()=>!document.querySelector('select').disabled);await page.getByRole('combobox',{name:'Appearance'}).selectOption('dark');await page.evaluate(()=>document.fonts.ready);assert.equal(await page.locator('.artwork-dark').evaluate(e=>getComputedStyle(e).display),'block');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'docs/qa/corrections-artwork/home-dark-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);
 const result={homeWords:words,editorialRoutes:10,checks:['normal and same-route navigation without busy notice','static editorial URLs','non-draft presentation','source-backed APEX detail','six original pull quotes','manual-theme artwork','mobile overflow','no page errors']};fs.writeFileSync('docs/qa/corrections-artwork/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}catch(error){console.error(error);process.exitCode=1}finally{if(browser)await browser.close();server.close();}
