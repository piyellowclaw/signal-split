import {createGame,step,DURATION,TAU,wrap,sanitizeBoard} from './engine.js';
const $=id=>document.getElementById(id), canvas=$('canvas'),ctx=canvas.getContext('2d');
const KEY='signal-split-board-v1',SETTINGS='signal-split-settings-v1';
let board=[],memoryOnly=false,settings={muted:true,motion:matchMedia('(prefers-reduced-motion: reduce)').matches,contrast:false};
try{board=sanitizeBoard(JSON.parse(localStorage.getItem(KEY)||'[]'));settings={...settings,...JSON.parse(localStorage.getItem(SETTINGS)||'{}')};}catch{memoryOnly=true;}
let g=createGame(),mode='idle',paused=false,keys=new Set(),last=0,flash=0,flashGood=true,saved=false,audio=null,w=0,h=0,r=0,cx=0,cy=0,frames=0,frameTotal=0;
function storeSettings(){try{localStorage.setItem(SETTINGS,JSON.stringify(settings));}catch{}}
function settingsUI(){ $('mute').textContent=settings.muted?'Sound off':'Sound on';$('mute').setAttribute('aria-pressed',String(settings.muted));$('motion').setAttribute('aria-pressed',String(settings.motion));$('contrast').setAttribute('aria-pressed',String(settings.contrast));document.body.classList.toggle('low-motion',settings.motion);document.body.classList.toggle('contrast',settings.contrast);}
$('mute').onclick=()=>{settings.muted=!settings.muted;settingsUI();storeSettings();tone(440,.08);};$('motion').onclick=()=>{settings.motion=!settings.motion;settingsUI();storeSettings();};$('contrast').onclick=()=>{settings.contrast=!settings.contrast;settingsUI();storeSettings();};settingsUI();
function tone(freq,duration=.14){if(settings.muted)return;try{audio??=new (window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();const o=audio.createOscillator(),gain=audio.createGain();o.type='sine';o.frequency.setValueAtTime(freq,audio.currentTime);gain.gain.setValueAtTime(.045,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+duration);o.connect(gain).connect(audio.destination);o.start();o.stop(audio.currentTime+duration);}catch{}}
function renderBoard(){for(const id of ['leaders','bigLeaders']){const list=$(id);list.replaceChildren();if(!board.length){const row=document.createElement('li');row.textContent='No signals yet. Set the first score.';list.append(row);}board.forEach((entry,i)=>{const row=document.createElement('li');for(const [cls,value]of [['rank',String(i+1).padStart(2,'0')],['callsign',entry.name],['points',entry.score.toLocaleString('en-US')]]){const span=document.createElement('span');span.className=cls;span.textContent=value;row.append(span);}list.append(row);});}if(memoryOnly)$('storageNote').textContent='Storage unavailable: scores last only this session.';}
renderBoard();window.addEventListener('storage',e=>{if(e.key===KEY){try{board=sanitizeBoard(JSON.parse(e.newValue||'[]'));renderBoard();}catch{}}});
const boardMode=new URLSearchParams(location.search).has('board');if(boardMode){$('game').hidden=true;$('boardView').hidden=false;}
function resize(){const rect=canvas.getBoundingClientRect();w=rect.width;h=rect.height;if(!w||!h)return;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);cx=w/2;cy=h*.52;r=Math.min(w*.265,h*.275);}
new ResizeObserver(resize).observe(canvas);resize();
function hud(){ $('score').textContent=String(g.score).padStart(5,'0');$('timer').innerHTML=Math.ceil(DURATION-g.time)+'<span>s</span>';$('chain').textContent='CHAIN '+String(g.combo).padStart(2,'0')+' / ×'+(1+Math.floor(Math.min(Math.max(0,g.combo-1),15)/5));$('phase').textContent=mode==='idle'?'AWAITING OPERATOR':g.time<25?'01 / ACQUIRE':g.time<50?'02 / ACCELERATE':'03 / FLOW STATE';}
function start(){g=createGame();mode='playing';paused=false;keys.clear();flash=0;saved=false;$('overlay').hidden=true;$('endPanel').hidden=true;$('pausePanel').hidden=true;$('pause').disabled=false;$('feedback').textContent='';$('status').textContent='Aim ○ toward ○. Catch at the inner ring.';$('name').value='';$('saved').textContent='';$('saveForm').hidden=false;canvas.focus();hud();tone(330);}
function idle(){g=createGame();mode='idle';paused=false;keys.clear();$('overlay').hidden=false;$('endPanel').hidden=true;$('pausePanel').hidden=true;$('pause').disabled=true;$('feedback').textContent='';$('status').textContent='Aim the circle toward the incoming circle.';hud();$('start').focus();}
function pause(value){if(mode!=='playing')return;paused=value;keys.clear();$('pausePanel').hidden=!paused;if(paused)$('resume').focus();else canvas.focus();}
function finish(){mode='ended';$('pause').disabled=true;$('endPanel').hidden=false;$('feedback').textContent='';$('phase').textContent='TRANSMISSION COMPLETE';$('endScore').textContent=g.score.toLocaleString('en-US');$('endTitle').textContent=g.hits>=24?'Beautiful connection.':g.hits>=12?'Finding your frequency.':'Every signal is a new start.';$('endStats').textContent=g.hits+'/'+g.waves.length+' linked · '+g.perfect+' perfect · best chain '+g.maxCombo;$('again').focus();tone(660,.3);}
$('start').onclick=start;$('again').onclick=start;$('resume').onclick=()=>pause(false);$('abandon').onclick=idle;$('pause').onclick=()=>pause(true);
$('saveForm').onsubmit=e=>{e.preventDefault();if(saved||mode!=='ended')return;saved=true;const name=$('name').value.toUpperCase().replace(/[^A-Z0-9 ]/g,'').trim()||'PLAYER';board=sanitizeBoard([...board,{name,score:g.score,hits:g.hits,date:new Date().toISOString().slice(0,10)}]);try{localStorage.setItem(KEY,JSON.stringify(board));}catch{memoryOnly=true;}$('saveForm').hidden=true;$('saved').textContent=memoryOnly?'Saved for this session.':'Saved to this browser’s local board.';renderBoard();$('again').focus();};
canvas.addEventListener('pointermove',e=>{if(mode!=='playing'||paused)return;const rect=canvas.getBoundingClientRect(),x=e.clientX-rect.left-cx,y=e.clientY-rect.top-cy;if(Math.hypot(x,y)>20)g.angle=wrap(Math.atan2(y,x));});
canvas.addEventListener('pointerdown',e=>{if(mode==='playing'&&!paused){canvas.focus();if(e.pointerType==='touch'){const rect=canvas.getBoundingClientRect();g.angle=wrap(Math.atan2(e.clientY-rect.top-cy,e.clientX-rect.left-cx));}else g.angle=wrap(g.angle+Math.PI);}});
window.addEventListener('keydown',e=>{if(document.activeElement?.tagName==='INPUT')return;if(document.activeElement?.tagName==='BUTTON'&&!['p','P','Escape'].includes(e.key))return;if(mode==='playing'&&['ArrowLeft','ArrowRight','a','d','A','D',' ','p','P','Escape'].includes(e.key)){e.preventDefault();if(e.key==='p'||e.key==='P'||e.key==='Escape'){if(!e.repeat)pause(!paused);return;}if(paused)return;if(e.key===' '&&!e.repeat)g.angle=wrap(g.angle+Math.PI);keys.add(e.key);}});window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>pause(true));document.addEventListener('visibilitychange',()=>{if(document.hidden)pause(true);});
function line(x1,y1,x2,y2,color,width=1){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
function circle(x,y,radius,color,width=1){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.arc(x,y,radius,0,TAU);ctx.stroke();}
function shape(x,y,diamond,color,size=8){ctx.save();ctx.translate(x,y);ctx.strokeStyle=color;ctx.fillStyle='#0b1723';ctx.lineWidth=2.5;ctx.beginPath();if(diamond){ctx.moveTo(0,-size);ctx.lineTo(size,0);ctx.lineTo(0,size);ctx.lineTo(-size,0);ctx.closePath();}else ctx.arc(0,0,size,0,TAU);ctx.fill();ctx.stroke();ctx.restore();}
function draw(now){if(!w||!h)return;ctx.clearRect(0,0,w,h);const mint='#91ffe0',gold='#ffc77a',ink='#edf4ff',dim=settings.contrast?'#8199ac':'#2b4655';
 // Fine optical-instrument grid: all original vectors.
 for(let x=cx%36;x<w;x+=36)for(let y=cy%36;y<h;y+=36){ctx.fillStyle=settings.contrast?'#334656':'#203443';ctx.fillRect(x,y,1,1);}
 const outer=r+Math.min(w*.15,100);circle(cx,cy,outer,dim);circle(cx,cy,r,dim,1.5);circle(cx,cy,r-14,'#203b49');
 for(let i=0;i<72;i++){const a=i*TAU/72,rad=outer;line(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad,cx+Math.cos(a)*(rad+(i%6===0?9:4)),cy+Math.sin(a)*(rad+(i%6===0?9:4)),dim);}
 line(cx-outer-20,cy,cx+outer+20,cy,'#233b48');line(cx,cy-outer-20,cx,cy+outer+20,'#233b48');
 ctx.font='9px Arial';ctx.fillStyle='#7995a7';ctx.textAlign='center';ctx.fillText('N',cx,cy-outer-16);ctx.fillText('S',cx,cy+outer+22);
 const t=mode==='idle'?now*.00013:g.time;const angle=mode==='idle'?(settings.motion?-.7:t):g.angle;
 let active=[];if(mode==='playing'||mode==='ended'){active=g.waves.filter(wave=>!wave.done&&wave.at-g.time<=wave.travel&&wave.at>=g.time);}
 for(const wave of active){const remain=wave.at-g.time,p=Math.max(0,Math.min(1,remain/wave.travel)),rr=r+(outer-r)*p,col=wave===active[0]?ink:'#7295a8';
  for(let side=0;side<2;side++){const a=wave.angle+side*Math.PI,x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr,c=side?gold:col;
   line(cx+Math.cos(a)*(r-8),cy+Math.sin(a)*(r-8),cx+Math.cos(a)*(outer+4),cy+Math.sin(a)*(outer+4),side?'#59483b':'#355762');
   if(!settings.motion)line(x,y,cx+Math.cos(a)*(rr+22),cy+Math.sin(a)*(rr+22),c,2);
   shape(x,y,side===1,c,8);ctx.fillStyle=c;ctx.font='9px Arial';ctx.fillText(side?'◇':'○',cx+Math.cos(a)*(outer+24),cy+Math.sin(a)*(outer+24)+3);
  }
 }
 // Receiver catch windows show the angular tolerance, not a random pulse.
 for(let side=0;side<2;side++){const a=angle+side*Math.PI,c=side?gold:mint;ctx.strokeStyle=c;ctx.lineWidth=7;ctx.beginPath();ctx.arc(cx,cy,r,a-.31,a+.31);ctx.stroke();const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;line(cx,cy,x,y,c,2);shape(x,y,side===1,c,10);}
 circle(cx,cy,22,dim);circle(cx,cy,5,mint,2);ctx.fillStyle=mint;ctx.font='9px Arial';ctx.fillText('LINK',cx,cy+43);
 if(active.length){const next=active[0],remain=next.at-g.time;ctx.fillStyle='#b2c5d2';ctx.font='10px Arial';ctx.fillText(remain.toFixed(1)+'s TO LINK',cx,cy+r+41);}
 if(flash>0&&!settings.motion){ctx.globalAlpha=flash*.35;circle(cx,cy,r+(1-flash)*35,flashGood?mint:'#ffac9c',2);ctx.globalAlpha=1;}
}
function frame(now){const dt=last?Math.min((now-last)/1000,.1):0;last=now;frames++;frameTotal+=dt;
 if(mode==='playing'&&!paused){const dir=(keys.has('ArrowRight')||keys.has('d')||keys.has('D')?1:0)-(keys.has('ArrowLeft')||keys.has('a')||keys.has('A')?1:0);g.angle=wrap(g.angle+dir*2.7*dt);const events=step(g,dt);for(const hit of events){flash=1;flashGood=hit.points>0;$('feedback').style.color=hit.points?'#91ffe0':'#ffac9c';$('feedback').textContent=hit.label+(hit.points?' +'+hit.points:'');$('status').textContent=hit.points?'Connection made. Read the next approach.':'Reset your focus. The next signal is yours.';tone(hit.points?hit.label==='PERFECT'?880:550:165);}
 if(flash>0){flash=Math.max(0,flash-dt*1.5);if(!flash)$('feedback').textContent='';}hud();if(g.finished)finish();}
 draw(now);requestAnimationFrame(frame);
}
if(!boardMode)requestAnimationFrame(frame);
// Read-only diagnostics, useful for booth acceptance testing; no score injection API.
window.signalSplit=Object.freeze({state:()=>({mode,paused,time:g.time,angle:g.angle,score:g.score,hits:g.hits,misses:g.misses,combo:g.combo,waves:g.waves.map(x=>({...x})),frames,averageFrameMs:frames?1000*frameTotal/frames:0}),version:'1.0.0'});
