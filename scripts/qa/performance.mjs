/**
 * @file Reproducible Lighthouse lab checks against the local static export, never live-release claims.
 * @author meetbyte
 */
import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {startStaticServer} from './static-server.mjs';
const cli=process.env.LIGHTHOUSE_CLI_PATH;
if(!cli)throw new Error('Set LIGHTHOUSE_CLI_PATH to the separately installed Lighthouse CLI.');
const server=await startStaticServer(4174);fs.mkdirSync('docs/qa/pr-ready',{recursive:true});
const summary=[];
try{
 for(const [label,route,desktop] of [['home-mobile','/',false],['home-desktop','/',true],['resume-mobile','/resume/',false]]){
  const report=`docs/qa/pr-ready/lighthouse-${label}.json`;
  const args=[cli,'http://127.0.0.1:4174'+route,'--output=json','--output-path='+report,'--quiet','--only-categories=performance,accessibility,best-practices,seo','--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage --disable-gpu','--no-enable-error-reporting','--disable-full-page-screenshot'];if(desktop)args.push('--preset=desktop');
  await new Promise((resolve,reject)=>{const p=spawn(process.execPath,args,{stdio:'inherit',env:{...process.env,CHROME_PATH:process.env.FOUNDATION_BROWSER_EXECUTABLE}});p.on('exit',code=>code===0?resolve():reject(new Error('Lighthouse exit '+code)));});
  const r=JSON.parse(fs.readFileSync(report,'utf8'));summary.push({label,route,scores:Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(k=>[k,r.audits[k].numericValue])),warnings:r.runWarnings,failedAudits:Object.entries(r.audits).filter(([,a])=>a.score!==null&&a.score<1).map(([id,a])=>({id,score:a.score,title:a.title,displayValue:a.displayValue}))});console.log(JSON.stringify(summary.at(-1)));
 }
 fs.writeFileSync('docs/qa/pr-ready/performance-summary.json',JSON.stringify(summary,null,2));
}finally{server.close();}
