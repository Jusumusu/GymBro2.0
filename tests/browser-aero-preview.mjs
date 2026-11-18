import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {browser} from './helpers/mobile-browser.mjs';
import {refinementFixture} from './fixtures/refinement.mjs';
import {makeDraft} from '../src/planner.js';
const b=await browser({root:'review-site',port:5256,debug:9326}),checks=[];
try{
 await b.navigate('/preview/');await b.until("document.querySelector('#onboard-form')");assert((await b.js("getComputedStyle(document.querySelector('.welcome-brand'),'::after').content")).includes('PREVIEW'));await b.shot('artifacts/liquid-glass/implementation/preview-onboarding.png');await b.submit('#onboard-form');
 const state=refinementFixture('2026-11-17');state.profile.name='Alex Example';state.photos=[];state.draft=makeDraft(state.plans[0],'2026-11-17');for(const e of state.draft.exercises)for(const set of e.entries)Object.assign(set,{kg:60,reps:10,rir:null});
 await b.js(`(async()=>await(await import('./src/storage.js')).saveState(${JSON.stringify(state)}))()`);await b.reload("document.querySelector('.active-set')");
 for(const width of [320,375,390,430,768,1024,1280]){
  await b.cdp('Emulation.setDeviceMetricsOverride',{width,height:950,deviceScaleFactor:1,mobile:width<768});await b.js('scrollTo(0,0)');
  if(width>650){const rectangles=await b.js("(()=>{const h=document.querySelector('.topbar').getBoundingClientRect(),n=document.querySelector('.sidebar nav').getBoundingClientRect();return {headerBottom:h.bottom,navTop:n.top}})()");assert(rectangles.navTop>=rectangles.headerBottom+20,JSON.stringify(rectangles));}
  await b.js("document.querySelector('.active-set').scrollIntoView({block:'center'})");const geometry=await b.js("(()=>{const banner=document.querySelector('.preview-banner').getBoundingClientRect(),jump=document.querySelector('.exercise-jump-nav').getBoundingClientRect(),button=document.querySelector('.exercise-jump-nav button'),r=button.getBoundingClientRect(),hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {bannerBottom:banner.bottom,jumpTop:jump.top,hit:button===hit||button.contains(hit),overflow:document.documentElement.scrollWidth>innerWidth+1}})()");assert(geometry.jumpTop>=geometry.bannerBottom+4,JSON.stringify(geometry));assert(geometry.hit);assert(!geometry.overflow);checks.push({width,...geometry});if([390,1280].includes(width))await b.shot(`artifacts/liquid-glass/implementation/preview-${width}-active.png`);
 }
 assert.equal((await b.js("(async()=>await indexedDB.databases())()")).some(d=>d.name==='gymbro-local'),false);assert.deepEqual(b.errors,[]);await writeFile('artifacts/liquid-glass/implementation/preview-chrome.json',JSON.stringify({checks,onboardingLabel:true,productionDatabaseOpened:false,errors:b.errors},null,2)+'\n');console.log('PASS Preview onboarding label and unobscured controls at seven widths');
}finally{await b.close();}
