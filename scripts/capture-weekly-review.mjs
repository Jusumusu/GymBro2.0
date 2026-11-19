import {mkdir,writeFile,copyFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {browser} from '../tests/helpers/mobile-browser.mjs';
const folder='docs/weekly-review-progression-search/review/previews',out='artifacts/weekly-review-progression-search/design';await mkdir(out,{recursive:true});const b=await browser({root:'review-site',port:5271,debug:9341}),checks=[];
const base='/preview/docs/weekly-review-progression-search/review/';
try{
 for(const theme of ['light','dark'])for(const id of ['a','b','c']){
  for(const type of ['weekly','glass']){await b.navigate(base+`screen.html?layout=${id}&glass=${id}&theme=${theme}&view=${type==='weekly'?'weekly':'workout'}`);await b.until('window.reviewReady');await b.js('document.fonts.ready');assert.equal(await b.js('document.documentElement.scrollWidth>innerWidth'),false);const name=`${type}-${id}-${theme}.png`;
   if(type==='weekly'){const {cssContentSize:s}=await b.cdp('Page.getLayoutMetrics');await b.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:Math.ceil(s.height),deviceScaleFactor:1,mobile:true});const shot=await b.cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:390,height:s.height,scale:1}});await writeFile(folder+'/'+name,Buffer.from(shot.data,'base64'));}else await b.shot(folder+'/'+name);await b.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});await copyFile(folder+'/'+name,out+'/'+name);checks.push({type,id,theme,overflow:false});
  }
  for(const overlay of ['options','modal']){await b.navigate(base+`screen.html?glass=${id}&theme=${theme}&view=workout&overlay=${overlay}`);await b.until('window.reviewReady');await b.shot(`${out}/glass-${id}-${theme}-${overlay}.png`);checks.push({type:overlay,id,theme,overflow:await b.js('document.documentElement.scrollWidth>innerWidth')});}
 }
 for(const width of [320,375,390,430,768,1024,1440]){await b.cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});for(const layout of ['a','b','c']){await b.navigate(base+`screen.html?layout=${layout}`);await b.until('window.reviewReady');assert.equal(await b.js('document.documentElement.scrollWidth>innerWidth'),false);checks.push({type:'responsive',layout,width,overflow:false});}}
 await b.navigate(base+'screen.html?view=workout&glass=c&theme=dark&overlay=modal&fallback=1');await b.until('window.reviewReady');assert.equal(await b.js('getComputedStyle(document.querySelector(".modal")).backdropFilter'),'none');checks.push({type:'opaque-fallback',passed:true});
 assert.deepEqual(b.errors,[]);await writeFile(out+'/checks.json',JSON.stringify({checks,errors:b.errors},null,2));console.log(JSON.stringify({checks:checks.length,errors:b.errors}));
}finally{await b.close();}
