import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browser,sleep} from './helpers/mobile-browser.mjs';
import {refinementFixture} from './fixtures/refinement.mjs';
import {makeDraft} from '../src/planner.js';

const out='artifacts/workout-interactions/exercise-bar';await mkdir(out,{recursive:true});
const checks=[],samples=[];
const pass=name=>{checks.push(name);console.log('PASS '+name);};
const rects=`(()=>{const n=document.querySelector('.exercise-jump-nav'),frame=n.closest('.exercise-glass-frame')||n,s=frame.querySelector('.liquid-surface'),a=n.querySelector('[aria-current]'),p=n.querySelector('.liquid-selection');const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,right:r.right}};return{rail:rect(n),glass:rect(s),selected:rect(a),pill:rect(p),scroll:n.scrollLeft,max:n.scrollWidth-n.clientWidth,transform:getComputedStyle(s).transform,mode:frame.dataset.liquidGlass,overflow:document.documentElement.scrollWidth>innerWidth}})()`;
const stable=g=>{for(const axis of ['x','y','width','height'])assert.ok(Math.abs(g.rail[axis]-g.glass[axis])<1,JSON.stringify(g));assert.equal(g.transform,'none');assert.equal(g.overflow,false);};
for(const mode of ['chromium','ios-css']){
 const b=await browser({root:'review-site',port:5313,debug:9383});
 try{
  if(mode==='ios-css')await b.cdp('Network.setUserAgentOverride',{userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 26_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/142.0 Mobile/15E148 Safari/604.1'});
  await b.cdp('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});await b.navigate('/preview/');await b.until('document.querySelector("#onboard-form")');await b.submit('#onboard-form');
  const state=refinementFixture('2026-11-23');state.photos=[];state.profile.timer=true;state.draft=makeDraft({...state.plans[0],exercises:Array.from({length:10},(_,i)=>({...state.plans[0].exercises[i%state.plans[0].exercises.length],sets:2,warmups:0,group:''}))},'2026-11-23');for(const e of state.draft.exercises)for(const row of e.entries)Object.assign(row,{kg:40,reps:10,rir:2});
  await b.js(`(async()=>await(await import('./src/storage.js')).saveState(${JSON.stringify(state)}))()`);await b.reload('document.querySelector(".sidebar")');await b.route('workout');
  const scrollBar=async()=>{await b.js('document.querySelector(".workout-navigation").scrollIntoView({block:"start",behavior:"instant"})');await sleep(100);};
  const drag=async direction=>{
   const g=await b.js(rects),p={x:direction<0?g.rail.right-24:g.rail.x+24,y:g.rail.y+g.rail.height/2},distance=Math.min(220,g.rail.width-60)*direction;
   await b.cdp('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[p]});await sleep(90);stable(await b.js(rects));
   for(let i=1;i<=5;i++){await b.cdp('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:p.x+distance*i/5,y:p.y}]});await sleep(30);stable(await b.js(rects));}
   await b.cdp('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await sleep(500);stable(await b.js(rects));
  };
  for(const theme of ['light','dark']){
   await b.route('settings');await b.fill('#appearance-form [name=theme]',theme);await b.route('workout');const saved=await b.data();
   for(const width of [320,390,430,768]){
    await b.cdp('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width<768});await b.js('document.fonts.ready');await scrollBar();await b.js('document.querySelector(".exercise-jump-nav").scrollLeft=0');await sleep(100);
    stable(await b.js(rects));await drag(-1);const g=await b.js(rects);assert.ok(g.scroll>80,JSON.stringify(g));assert.equal(g.mode,mode==='chromium'?'lens':'fluid-css');samples.push({mode,theme,width,...g});if(width===390)await b.shot(`${out}/${mode}-${theme}-scrolled.png`);
    await drag(1);await b.js('(()=>{const n=document.querySelector(".exercise-jump-nav");n.scrollLeft=n.scrollWidth})()');await sleep(100);await drag(-1);await drag(1);assert.deepEqual(await b.data(),saved);
   }
  }
  pass(mode+': real touch drags in both directions and at the ends keep the entire glass frame fixed across eight layouts without changing the journal');
  await b.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});const last=state.draft.exercises.at(-1);await b.js(`document.querySelector('[data-set-row="${last.entries[0].id}"] input').focus({preventScroll:true})`);await b.until(`document.querySelector('.exercise-jump-nav [aria-current]').dataset.id==='${last.id}'`);await sleep(700);let g=await b.js(rects);stable(g);assert.ok(g.selected.x>=g.rail.x-1&&g.selected.right<=g.rail.right+1,JSON.stringify(g));for(const axis of ['x','y','width','height'])assert.ok(Math.abs(g.pill[axis]-g.selected[axis])<1,JSON.stringify(g));
  await b.js('document.querySelector(".exercise-jump-nav").scrollLeft=140');await sleep(100);const left=await b.js('document.querySelector(".exercise-jump-nav").scrollLeft');await b.route('settings');await b.route('workout');await scrollBar();await sleep(100);g=await b.js(rects);stable(g);assert.ok(Math.abs(g.scroll-left)<3,JSON.stringify({g,left}));pass(mode+': auto-follow and selected pill align after distant selection; a full redraw retains manual scroll and fixed glass');
  await b.click('[data-action=focus-enter]');await scrollBar();const beforeFocus=await b.data();await drag(-1);await drag(1);assert.deepEqual(await b.data(),beforeFocus);await b.click(`[data-action=focus-go][data-id="${last.id}"]`);await b.until(`document.querySelector('[data-focus-exercise]').dataset.focusExercise==='${last.id}'`);await sleep(650);g=await b.js(rects);stable(g);for(const axis of ['x','y','width','height'])assert.ok(Math.abs(g.pill[axis]-g.selected[axis])<1,JSON.stringify(g));pass(mode+': Focus bar scrolling stays independent of carousel gestures; exercise selection and its glass pill remain aligned');
  await b.cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'},{name:'prefers-reduced-transparency',value:'reduce'}]});await drag(1);assert.equal(await b.js('document.querySelector(".exercise-glass-frame>.liquid-surface").getAnimations().length'),0);assert.equal(await b.js('getComputedStyle(document.querySelector(".exercise-glass-frame>.liquid-surface")).backdropFilter'),'none');assert.deepEqual(b.errors,[]);pass(mode+': accessibility preferences retain a stable readable frame with no decorative animation or browser errors');
 }finally{await b.close();}
}
await writeFile(out+'/results.json',JSON.stringify({checks,samples,scope:'Real Chromium touch and geometry, with Chromium lens and Chrome-iOS UA CSS fallback. Physical iPhone/WebKit not certified.'},null,2)+'\n');
