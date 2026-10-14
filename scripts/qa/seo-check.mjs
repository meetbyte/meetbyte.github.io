/** @file Static HTML crawlability and metadata audit; no ranking or indexing claim. @author meetbyte */
import fs from 'node:fs';
import assert from 'node:assert/strict';
const sitemap=fs.readFileSync('out/sitemap.xml','utf8');const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);const titles=new Set();const descriptions=new Set();const rows=[];
const unescape=s=>s.replaceAll('&amp;','&').replaceAll('&#x27;',"'");
for(const url of urls){
 const route=new URL(url).pathname;const file=`out${route==='/'?'/':route.endsWith('/')?route:route+'/'}index.html`;const html=fs.readFileSync(file,'utf8');
 const title=unescape(html.match(/<title>([^<]+)<\/title>/)?.[1]||'');const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
 assert.ok(title&&description,url);assert.ok(!titles.has(title),`duplicate title ${title}`);titles.add(title);assert.ok(!descriptions.has(description),`duplicate description ${description}`);descriptions.add(description);
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];assert.equal(canonical,url);assert.ok(!html.match(/<meta name="robots" content="[^"]*noindex/));
 assert.equal((html.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1);assert.ok(html.includes('property="og:title"'));assert.ok(html.includes('name="twitter:card"'));assert.ok(html.includes('<a '));
 if(route==='/')assert.ok(title.includes('Software Engineer & Enterprise Systems')&&title.includes('Meet Thummar'));
 rows.push({url,title,description:unescape(description),canonical});
}
assert.equal(rows.length,17);assert.ok(!urls.some(u=>u.includes('/projects/')||u.includes('/blog/')||u.includes('_unpublished')));assert.ok(fs.readFileSync('out/robots.txt','utf8').includes('Sitemap: https://meetbyte.github.io/sitemap.xml'));
fs.mkdirSync('docs/qa/pr-ready',{recursive:true});fs.writeFileSync('docs/qa/pr-ready/seo-results.json',JSON.stringify({rows,checks:['17 unique static titles/descriptions','17 correct canonicals/indexable HTML pages','one h1 each','crawlable HTML anchors','OG/Twitter tags','robots sitemap declaration','sample/draft/alias sitemap exclusion']},null,2));console.log('PASS: 17 static canonical metadata/crawlability checks');
