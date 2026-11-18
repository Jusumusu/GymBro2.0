import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {browser,sleep} from '../tests/helpers/mobile-browser.mjs';
const b=await browser({port:5262,debug:9332}),out='artifacts/workout-polish/concepts',results=[];await mkdir(out,{recursive:true});
try{
 for(const theme of ['light','dark'])for(const concept of ['a','b','c'])for(const view of ['chart','focus','plan']){
  await b.navigate(`/docs/workout-polish/review/?concept=${concept}&view=${view}&theme=${theme}&capture=1`);await b.until("document.querySelector('#demo .screen-heading')");await b.js('document.fonts.ready');await sleep(150);
  const metrics=await b.js("({width:innerWidth,scroll:document.documentElement.scrollWidth,fonts:document.fonts.check('14px Manrope'),completed:document.querySelectorAll('.set-state.done').length,active:document.querySelectorAll('.set-state.active').length})");assert.ok(metrics.scroll<=metrics.width+1);assert.equal(metrics.fonts,true);if(view==='focus'){assert.equal(metrics.completed,2);assert.equal(metrics.active,1);}await b.shot(`${out}/${concept}-${view}-${theme}-390.png`);results.push({concept,view,theme,...metrics});
 }
 for(const width of [320,375,390,430,768,1024,1440]){await b.cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});for(const concept of ['a','b','c']){await b.navigate(`/docs/workout-polish/review/?concept=${concept}&view=plan&theme=light&capture=1`);await b.until("document.querySelector('#example-plan')");assert.ok(await b.js('document.documentElement.scrollWidth<=innerWidth+1'));}results.push({width,layout:'all plan concepts fit'});}
 await b.cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});await b.navigate('/docs/workout-polish/review/?concept=a&view=focus');await b.until("document.querySelector('.set-state')");await b.js('document.fonts.ready');await b.shot(out+'/gallery-desktop.png');
 assert.equal(b.errors.length,0);await writeFile(out+'/results.json',JSON.stringify({results,errors:b.errors,scope:'Headless Chromium; actual rendered prototypes. Physical mobile browsers not available.'},null,2));console.log(JSON.stringify({screenshots:19,checks:results.length,errors:b.errors}));
}finally{await b.close();}
