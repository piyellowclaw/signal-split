// Original deterministic game rules. No DOM, clock, storage or network dependencies.
export const TAU = Math.PI * 2;
export const DURATION = 75;
export const SEED = 20261119;
export const wrap = a => ((a % TAU) + TAU) % TAU;
export const distance = (a,b) => Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
export function random(seed) { let s=seed>>>0; return ()=>{s=(Math.imul(s,1664525)+1013904223)>>>0; return s/4294967296;}; }
export function schedule(seed=SEED) {
 const rng=random(seed), waves=[]; let at=4;
 while(at< DURATION-1) { const phase=at<25?0:at<50?1:2; waves.push({id:waves.length,at,angle:rng()*TAU,travel:3.5-phase*.45}); at+=2.7-phase*.35; }
 return waves;
}
export function createGame(){return {time:0,angle:-Math.PI/2,score:0,combo:0,maxCombo:0,hits:0,perfect:0,misses:0,finished:false,waves:schedule(),results:[]};}
export function judge(angle,target,combo){
 const error=distance(angle,target), tolerance=.31;
 if(error>tolerance)return {label:'MISSED',points:0,combo:0,error};
 const perfect=error<=.095, next=combo+1, multiplier=1+Math.floor(Math.min(next-1,15)/5);
 return {label:perfect?'PERFECT':'LINKED',points:(perfect?150:90)*multiplier,combo:next,error};
}
export function step(g,dt){
 if(g.finished)return [];
 g.time=Math.min(DURATION,g.time+Math.max(0,Math.min(dt,.1)));const events=[];
 for(const wave of g.waves){if(wave.done||wave.at>g.time)continue;wave.done=true;const hit=judge(g.angle,wave.angle,g.combo);g.combo=hit.combo;g.maxCombo=Math.max(g.maxCombo,g.combo);g.score+=hit.points;if(hit.points)g.hits++;else g.misses++;if(hit.label==='PERFECT')g.perfect++;const event={...hit,id:wave.id,time:g.time};g.results.push(event);events.push(event);}
 if(g.time>=DURATION)g.finished=true;return events;
}
export function sanitizeBoard(raw){if(!Array.isArray(raw))return [];return raw.filter(r=>r&&Number.isFinite(r.score)&&r.score>=0&&r.score<=100000&&typeof r.name==='string').map(r=>({name:r.name.replace(/[^A-Z0-9 ]/gi,'').slice(0,10)||'PLAYER',score:Math.floor(r.score),hits:Math.max(0,Math.floor(Number(r.hits)||0)),date:typeof r.date==='string'?r.date.slice(0,10):''})).sort((a,b)=>b.score-a.score).slice(0,10);}
