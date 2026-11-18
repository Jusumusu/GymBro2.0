// Same synthetic logger on the actual released build and the Aero candidate.
// Headless Chromium observations, not physical-phone frame-rate guarantees.
import assert from 'node:assert/strict';
import {mkdir,readFile,readdir,stat,writeFile} from 'node:fs/promises';
import {browser} from '../tests/helpers/mobile-browser.mjs';
import {refinementFixture} from '../tests/fixtures/refinement.mjs';
import {makeDraft} from '../src/planner.js';
const out='artifacts/liquid-glass/implementation/performance';await mkdir(out,{recursive:true});
const results=[];
const percentile=(values,p)=>+values.toSorted((a,b)=>a-b)[Math.min(values.length-1,Math.floor(values.length*p))].toFixed(2);
const summary=values=>({medianMs:percentile(values,.5),p95Ms:percentile(values,.95),samples:values.length});
const luminance=hex=>{hex=hex.trim();if(hex.length===4)hex='#'+[...hex.slice(1)].map(c=>c+c).join('');const c=hex.slice(1).match(/.{2}/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
for(const [index,label,root]of [[0,'released-0.4','work/liquid-glass/implementation/upgrade/stable/dist'],[1,'aero-0.5','dist']]){
 const b=await browser({root,port:5254+index,debug:9324+index});
 try{
  await b.navigate('/');await b.until("document.querySelector('#onboard-form')");await b.submit('#onboard-form');const state=refinementFixture('2026-11-17');state.profile.name='Alex Example';state.photos=[];state.draft=makeDraft(state.plans[0],'2026-11-17');for(const e of state.draft.exercises)for(const set of e.entries)Object.assign(set,{kg:60,reps:10,rir:null});
  await b.js(`(async()=>await(await import('./src/storage.js')).saveState(${JSON.stringify(state)}))()`);await b.reload("document.querySelector('.active-set')");await b.js('document.fonts.ready');
  const starts=[];for(let n=0;n<5;n++){await b.reload("document.querySelector('.active-set')");await b.js('document.fonts.ready');starts.push(await b.js('performance.now()'));}
  const input=await b.js(`(async()=>{const times=[];for(let n=0;n<20;n++){await new Promise(requestAnimationFrame);const el=document.querySelector('.active-set [data-field=reps]'),at=performance.now();el.value=String(8+n%3);el.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('.active-set').getBoundingClientRect();times.push(performance.now()-at);}return times;})()`);
  const themes=await b.js(`(async()=>{const times=[];for(let n=0;n<20;n++){await new Promise(requestAnimationFrame);const at=performance.now();GymBroAppearance.apply(n%2?'dark':'light',{remember:false});document.body.getBoundingClientRect();times.push(performance.now()-at);}return times;})()`);
  const frames=await b.js(`(async()=>{const times=[];let last;for(let n=0;n<60;n++){const now=await new Promise(requestAnimationFrame);if(last!==undefined)times.push(now-last);last=now;scrollTo(0,n*30);}return times;})()`);
  const glass=await b.js("[...document.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&getComputedStyle(e).backdropFilter!=='none';}).map(e=>({class:e.className,filter:getComputedStyle(e).backdropFilter}))");
  const contrasts=[];
  if(index===1)for(const theme of ['light','dark']){
   await b.js(`GymBroAppearance.apply('${theme}',{remember:false})`);
   const pairs=await b.js("(()=>{const c=getComputedStyle(document.documentElement);return [['--ink','--paper'],['--muted','--paper'],['--ink','--surface'],['--muted','--surface'],['--on-accent','--accent'],['--accent','--accent-soft'],['--success','--success-soft'],['--record','--record-soft'],['--danger','--surface'],['--notice-ink','--notice-surface'],['--hero-ink','--hero-surface'],['--hero-muted','--hero-surface'],['--hero-action-ink','--hero-action']].map(keys=>keys.map(k=>c.getPropertyValue(k).trim()));})()");
   for(const [foreground,background]of pairs){const a=luminance(foreground),z=luminance(background),ratio=(Math.max(a,z)+.05)/(Math.min(a,z)+.05);assert(ratio>=4.5,`${theme} ${foreground}/${background}: ${ratio}`);contrasts.push({theme,foreground,background,ratio:+ratio.toFixed(2)});}
   await b.click('[data-action=exercise-options]');assert.equal(await b.js("getComputedStyle(document.querySelector('.dialog-head')).backdropFilter"),'blur(16px) saturate(1.15)');await b.shot(`${out}/${label}-${theme}-options.png`);await b.click('dialog [data-action=close]');
  }
  await b.js("GymBroAppearance.apply('dark',{remember:false});scrollTo(0,0)");await b.click('.active-set .complete-button');assert.equal(await b.js("document.querySelectorAll('.active-set').length"),1);
  if(index===1){const colors=await b.js("['.set-row.complete','.set-row.active-set'].map(s=>getComputedStyle(document.querySelector(s)).backgroundColor)");assert.notEqual(colors[0],colors[1]);}
  await b.shot(`${out}/${label}-dark-active.png`);
  for(const theme of ['light','dark']){await b.route('settings');await b.fill('#appearance-form [name=theme]',theme);await b.js(`(async()=>{const storage=await import('./src/storage.js'),s=await storage.loadState();s.draft=null;await storage.saveState(s);})()`);await b.reload("document.querySelector('.sidebar')");await b.route('workout');await b.js('document.fonts.ready');await b.shot(`${out}/${label}-${theme}-workout.png`);}
  if(index===1){const s=await b.data();await b.js(`(async()=>{(await import('./src/upgrade-ui.js')).setSummaryId(${JSON.stringify(s.sessions.at(-1).id)})})()`);for(const theme of ['light','dark']){await b.route('settings');await b.fill('#appearance-form [name=theme]',theme);await b.route('summary');await b.shot(`${out}/${label}-${theme}-summary.png`);await b.route('muscles');await b.click('[data-action=muscle-side][data-view=back]');await b.shot(`${out}/${label}-${theme}-muscle-back.png`);}}
  let cssBytes=0,jsBytes=0;for(const file of await readdir(root+'/src')){const size=(await stat(root+'/src/'+file)).size;if(file.endsWith('.css'))cssBytes+=size;if(file.endsWith('.js'))jsBytes+=size;}
  assert.deepEqual(b.errors,[]);results.push({label,release:JSON.parse(await readFile(root+'/version.json','utf8')).build,warmLoggerReady:summary(starts),inputHandlerIncludingLayout:summary(input),themeChangeIncludingLayout:summary(themes),scrollFrameIntervals:summary(frames),visibleGlass:glass,cssBytes,jsBytes,contrastPairs:contrasts,errors:b.errors});
 }finally{await b.close();}
}
await writeFile(out+'/results.json',JSON.stringify({scope:'Same 12-session synthetic journal and real active logger; 390×900 headless Chromium; five warm reloads, twenty input/theme samples, sixty scrolling frames. Local machine observations; not physical Safari/PWA, memory or battery certification.',results},null,2)+'\n');
for(const r of results)console.log(r.label,JSON.stringify({ready:r.warmLoggerReady,input:r.inputHandlerIncludingLayout,theme:r.themeChangeIncludingLayout,scroll:r.scrollFrameIntervals,css:r.cssBytes,js:r.jsBytes,glass:r.visibleGlass.length,contrastPairs:r.contrastPairs.length}));
