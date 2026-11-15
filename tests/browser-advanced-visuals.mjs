import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browser} from './helpers/mobile-browser.mjs';
import {refinementFixture} from './fixtures/refinement.mjs';
import {makeDraft} from '../src/planner.js';
import {createBlock} from '../src/advanced-data.js';
const out='artifacts/advanced-training/integrated';await mkdir(out,{recursive:true});
const b=await browser({port:5218,debug:9288}),checks=[];
const date=new Date().toLocaleDateString('en-CA'),fixture=refinementFixture(date);fixture.photos=[];fixture.draft=makeDraft(fixture.plans[0],date);fixture.draft.focusMode=true;fixture.upgrade.advanced.blocks.push(createBlock({id:'visual-block',name:'Build a stronger base',goal:'hypertrophy',startDate:date,duration:6,planIds:['routine'],lighter:true}));fixture.upgrade.recurring.push({id:'visual-series',planId:'routine',planName:'Full body A',startDate:date,endDate:null,weekdays:[1,3,5],time:'18:00'});
const inspect=async(name,width,theme,dialog=false)=>{assert.ok(await b.js('document.documentElement.scrollWidth<=innerWidth+1'),name+' page overflow');if(dialog)assert.ok(await b.js('document.querySelector("dialog").scrollWidth<=document.querySelector("dialog").clientWidth+1'),name+' dialog overflow');checks.push({name,width,theme});if(width===390)await b.shot(`${out}/${theme}-detail-${name}.png`);};
try{
 await b.navigate('/');await b.until("Boolean(document.querySelector('#onboard-form'))");await b.submit('#onboard-form');await b.js(`(async()=>await(await import('./src/storage.js')).saveState(${JSON.stringify(fixture)}))()`);await b.reload("Boolean(document.querySelector('.focus-card'))");
 for(const theme of ['light','dark']){
  await b.route('settings');await b.fill('#appearance-form [name=theme]',theme);
  for(const width of [320,375,390,430,768,1024]){
   await b.cdp('Emulation.setDeviceMetricsOverride',{width,height:950,deviceScaleFactor:1,mobile:width<768});await b.route('settings');await b.js("document.querySelector('.backup-settings').scrollIntoView({block:'start'})");await inspect('backup',width,theme);
   await b.click('[data-action=export-json]');await inspect('export',width,theme,true);await b.click('dialog [data-action=close]');
   await b.route('workout');await inspect('focus',width,theme);await b.click('[data-action=feedback-open]');await inspect('feedback',width,theme,true);await b.click('dialog [data-action=close]');
   await b.click('[data-action=time-dialog]');await inspect('time-select',width,theme,true);await b.fill('#time-budget-form [name=minutes]',10);await b.submit('#time-budget-form');await inspect('time-preview',width,theme,true);await b.click('dialog [data-action=close]');
   await b.route('programs');await b.click('[data-action=block-detail]');await inspect('block',width,theme,true);await b.click('[data-action=block-week][data-week="5"]');await inspect('block-targets',width,theme,true);await b.click('dialog [data-action=close]');
   await b.route('calendar');await b.click('[data-action=calendar-export]');await inspect('calendar',width,theme,true);await b.submit('#calendar-export-form');await inspect('calendar-review',width,theme,true);await b.click('dialog [data-action=close]');
  }
 }
 assert.deepEqual(b.errors,[]);await writeFile(out+'/visual-results.json',JSON.stringify({passed:checks.length,checks,errors:b.errors},null,2));console.log(checks.length+' actual UI/dialog layout checks passed');
}finally{await b.close();}
