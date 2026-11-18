// Actual isolated browser UI capture. Requires existing Playwright; no account/profile attachment.
import {mkdir,cp,writeFile,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const root=resolve(import.meta.dir,'..'),out=resolve(root,'evidence/demo-final'),frozen=resolve(root,'evidence/demo-final-build');
await mkdir(out,{recursive:true});if(await Bun.file(out+'/video-verification.json').exists())throw Error('Archive prior final take before recapture.');
await mkdir(out+'/frames',{recursive:true});if((await readdir(out+'/frames')).length)throw Error('Never mix existing frame takes.');
await cp(resolve(root,'dist'),frozen,{recursive:true});
const hashes={};for(const f of ['index.html','style.css','src/app.js','src/engine.js'])hashes[f]=new Bun.CryptoHasher('sha256').update(await Bun.file(frozen+'/'+f).arrayBuffer()).digest('hex');
await writeFile(out+'/captured-build-sha256.json',JSON.stringify(hashes,null,2));
const server=Bun.serve({hostname:'127.0.0.1',port:4174,async fetch(req){const p=decodeURIComponent(new URL(req.url).pathname);if(p==='/favicon.ico')return new Response(null,{status:204});const name=resolve(frozen,'.'+(p==='/'?'/index.html':p));if(!name.startsWith(frozen+'/'))return new Response('',{status:403});const f=Bun.file(name);if(!await f.exists())return new Response('',{status:404});return new Response(f,{headers:{'Content-Type':p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html'}});}});
const browser=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{channel:'chrome'})});
let active=false,frames=0,loop,segmentStart=0,segmentBase=0;const sections=[],checkpoints=[],errors=[],requests=[];
const context=await browser.newContext({viewport:{width:1440,height:960},deviceScaleFactor:1}),page=await context.newPage(),cdp=await context.newCDPSession(page);
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function begin(label){segmentStart=Date.now();segmentBase=frames;active=true;sections.push({label,start:frames/10});loop=(async()=>{while(active){const {data}=await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:82}),jpg=Buffer.from(data,'base64'),target=segmentBase+Math.max(1,Math.round((Date.now()-segmentStart)/100));while(frames<target)await Bun.write(out+'/frames/'+String(frames++).padStart(6,'0')+'.jpg',jpg);await sleep(45);}})();}
async function stop(){active=false;await loop;sections.at(-1).end=frames/10;}
async function caption(text){await page.evaluate(text=>{let el=document.getElementById('demo-caption');if(!el){el=document.createElement('div');el.id='demo-caption';el.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:99;padding:15px 25px;background:#06111cf5;border-top:1px solid #91ffe0;color:#edf4ff;text-align:center;font:16px Arial';document.body.append(el);}el.textContent=text;},text);}
async function shot(name){await page.screenshot({path:out+'/'+name+'.png'});checkpoints.push({name,videoTime:frames/10,state:await page.evaluate(()=>signalSplit.state())});}
try{
 await page.goto('http://127.0.0.1:4174/');await page.waitForSelector('#start');await page.screenshot({path:out+'/initial.png'});
 await caption('SIGNAL / SPLIT · Real browser footage · Automated demo player, not human playtesting');await begin('Start, complete round, score, live reset and accessibility');await sleep(3500);await shot('01-start');
 await caption('Aim ○ toward ○. Catch automatically at the inner ring. Arrows rotate; Space flips shapes.');await sleep(3000);await page.click('#start');const roundStart=frames/10;let previous=-1;
 while(true){const s=await page.evaluate(()=>signalSplit.state());if(s.mode==='ended')break;if(s.paused)throw Error('Unexpected pause in full round');const n=s.waves.find(w=>!w.done);if(n&&n.id!==previous){previous=n.id;const a=n.angle+(n.id===0?1:0),b=await page.locator('#canvas').boundingBox();await page.mouse.move(b.x+b.width/2+Math.cos(a)*150,b.y+b.height*.52+Math.sin(a)*150,{steps:7});
 if(n.id===3)await caption('Centered catches earn PERFECT +150. Consecutive links increase your multiplier.');
 if(n.id===8){await page.keyboard.press('Space');await caption('A wrong polarity flip misses the connection. Recover your focus on the next signal.');}
 if(n.id===12)await caption('Three tempo stages · Same seeded circuit for every operator · No firing button');
 if(n.id===21)await caption('75 active seconds · Original procedural visuals · No login, analytics or remote services');}
 if(s.time>15&&s.time<15.2)await shot('02-links');await sleep(45);}
 const endState=await page.evaluate(()=>signalSplit.state());checkpoints.push({name:'round-ended',videoTime:frames/10,roundStart,state:endState});
 await caption('Transmission complete: actual score and all 31 approaches. The full round ran without time acceleration.');await shot('03-end');await sleep(3500);await page.fill('#name','DEMO');await page.click('#saveForm button');await caption('Save an optional callsign to the local top ten. No Wi-Fi required.');await sleep(2500);await shot('04-saved');
 await page.click('#again');await caption('LIVE NEXT OPERATOR RESET · Score and chain return to zero; local leaderboard stays.');await shot('05-live-reset');await sleep(2200);
 await page.keyboard.press('Tab');const before=await page.evaluate(()=>signalSplit.state());await sleep(600);const after=await page.evaluate(()=>signalSplit.state());if(!after.paused||before.time!==after.time)throw Error('Focus pause regression');checkpoints.push({name:'focus-pause-frozen',before,after});await caption('Keyboard focus leaves the arena: clock pauses immediately. Explicit Resume prevents accidental play.');await shot('06-focus-pause');await sleep(2500);
 await page.click('#resume');await sleep(600);await page.keyboard.press('p');await page.click('#abandon');await page.click('#motion');await page.click('#contrast');await page.click('#mute');await page.click('#mute');await caption('Keyboard / mouse / touch · Sound toggle · Low motion · Contrast · AI-assisted original game');await sleep(3500);await shot('07-accessibility');
 await stop();await page.goto('http://127.0.0.1:4174/?board');await page.waitForSelector('#bigLeaders');await caption('LIVE LOCAL SCOREBOARD · Same browser profile + origin · Offline-capable · Automated demo disclosed');await begin('Live scoreboard after navigation cut');await sleep(5500);await shot('08-live-board');await stop();
 await writeFile(out+'/capture-report.json',JSON.stringify({frames,framesPerSecond:10,durationSeconds:frames/10,sections,hashes,errors,requests:[...new Set(requests)],checkpoints,disclosure:'Full genuine DOM screenshots; ordinary automated pointer/keyboard inputs; no score/clock injection or accelerated gameplay. One navigation cut before live scoreboard; no still-frame substitutes. Silent recording. Captions are explanatory overlays.'},null,2));
 console.log(JSON.stringify({out,frames,durationSeconds:frames/10,score:endState.score,hits:endState.hits,focusPauseVerified:true,hashes}));
}finally{if(active)await stop();await browser.close();server.stop();}
