// Export synthetic, actually rendered 0.4.0 views for an isolated design study.
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {browser} from '../tests/helpers/mobile-browser.mjs';
import {refinementFixture} from '../tests/fixtures/refinement.mjs';
import {makeDraft} from '../src/planner.js';
import {createBlock} from '../src/advanced-data.js';
import {EXERCISES} from '../src/exercises.js';
const root='docs/liquid-glass',out='artifacts/liquid-glass/baseline',b=await browser({port:5240,debug:9310});
await mkdir(out,{recursive:true});
const views={},dialogs={};
const save=async s=>{await b.js(`(async()=>await(await import('./src/storage.js')).saveState(${JSON.stringify(s)}))()`);await b.reload("Boolean(document.querySelector('.sidebar'))");};
const capture=async(id,route,selector='#main')=>{await b.route(route);await b.js('(async()=>await document.fonts.ready)()');views[id]=await b.js(`document.querySelector(${JSON.stringify(selector)}).innerHTML`);};
try{
 await b.cdp('Emulation.setTimezoneOverride',{timezoneId:'Asia/Jerusalem'});await b.navigate('/');await b.until("Boolean(document.querySelector('#onboard-form'))");await b.submit('#onboard-form');
 const date='2026-11-16',s=refinementFixture('2026-11-15');s.profile.name='Alex Example';s.photos=[];s.sessions.sort((a,b)=>a.date.localeCompare(b.date));
 s.sessions.forEach((w,i)=>{for(const e of w.exercises)for(const set of e.entries){set.kg=e.exerciseId==='bench'?52.5+Math.floor(i/3)*2.5:e.exerciseId==='squat'?40:35;set.reps=i>=9?10:8;set.rir=2;}});
 s.upgrade.schedule=[0,2,4].map((offset,i)=>({id:'sample-planned-'+i,planId:s.plans[0].id,planName:'Full body A',date:'2026-11-'+(16+offset),status:'planned',time:'18:00'}));
 s.upgrade.advanced.blocks.push(createBlock({id:'sample-block',name:'Build a stronger base',goal:'hypertrophy',startDate:date,duration:6,planIds:[s.plans[0].id],lighter:true}));await save(s);
 for(const theme of ['light','dark']){await b.route('settings');await b.fill('#appearance-form [name=theme]',theme);for(const route of ['workout','progress','settings','calendar']){await b.route(route);await b.js('scrollTo(0,0)');await b.shot(`${out}/${theme}-${route}.png`);}}
 for(const [id,route] of [['workout','workout'],['gains','progress'],['schedule','calendar'],['settings','settings'],['muscles','muscles'],['review','review'],['programs','programs'],['coach','coach']])await capture(id,route);
 await b.route('review');await b.click('[data-action=review-previous]');views.review=await b.js("document.querySelector('#main').innerHTML");
 await b.route('programs');await b.click('[data-action=browse-library]');await b.click('[data-action=browser-category][data-muscle=all]');views.library='<header class="page-head"><div><p class="eyebrow">EXERCISE LIBRARY</p><h1>Find your next movement.</h1><p class="subtitle">Your existing movements, favorites and history.</p></div></header>'+await b.js("document.querySelector('[data-exercise-browser]').outerHTML");views.blocks='<header class="page-head"><div><p class="eyebrow">PROGRAMS</p><h1>Training blocks.</h1></div></header>'+await b.js("document.querySelector('.training-blocks').outerHTML");
 await b.js(`(async()=>{(await import('./src/upgrade-ui.js')).setSummaryId(${JSON.stringify(s.sessions.at(-1).id)})})()`);await capture('summary','summary');
 await b.route('progress');views.records='<header class="page-head"><div><p class="eyebrow">YOUR RECORDS</p><h1>Progress worth keeping.</h1><p class="subtitle">Recorded milestones, with no invented growth score.</p></div></header>'+await b.js("document.querySelector('.achievement-grid').outerHTML");
 const active=await b.data();active.draft=makeDraft(active.plans[0],date);for(const e of active.draft.exercises)for(const set of e.entries)Object.assign(set,{kg:e.exerciseId==='bench'?60:e.exerciseId==='squat'?40:35,reps:10,rir:null});Object.assign(active.draft.exercises[0].entries[0],{done:true,rir:2});await save(active);await capture('active','workout');
 await b.click('[data-action=exercise-options]');dialogs.options=await b.js("document.querySelector('dialog').innerHTML");await b.click('dialog [data-action=close]');
 await b.click('[data-action=focus-enter]');views.focus=await b.js("document.querySelector('#main').innerHTML");await b.click('[data-action=focus-exit]');
 await b.route('settings');await b.click('[data-action=export-json]');dialogs.backup=await b.js("document.querySelector('dialog').innerHTML");await b.click('dialog [data-action=close]');
 await b.click('[data-action=update-app]');await b.until("location.pathname.endsWith('/update.html')&&document.querySelector('#release-version')?.textContent.includes('0.4.0')");views.update=await b.js("document.querySelector('main').innerHTML");
 assert.deepEqual(b.errors,[]);
 for(const [id,value] of Object.entries(views))views[id]=value.replaceAll('Autosaved on device','Sample journal').replaceAll('blob:','sample:');
 await writeFile(root+'/views.json',JSON.stringify({baseline:'f8b5d80d914c8d877d67d4155965be26170bed08',version:'0.4.0',fixture:'Alex Example; 12 saved sessions through Nov 13; 60 kg × 10 recent bench; Nov 16/18/20 planned',views,dialogs,exercises:EXERCISES.map(({id,name,muscle,equipment})=>({id,name,muscle,equipment}))}));
 await writeFile(out+'/audit.json',JSON.stringify({baseline:'0.4.0 / f8b5d80',views:Object.keys(views),dialogs:Object.keys(dialogs),syntheticOnly:true,errors:b.errors},null,2));console.log('Exported '+Object.keys(views).length+' actual app views and '+Object.keys(dialogs).length+' dialogs from synthetic data');
}finally{await b.close();}
