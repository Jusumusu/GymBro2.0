import {browser} from './helpers/mobile-browser.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
await mkdir('artifacts/advanced-training',{recursive:true});
const b=await browser({root:'.',port:5216,debug:9286});
const checks=[];
try{
 await b.cdp('Page.setBypassCSP',{enabled:true});
 await b.navigate('/docs/advanced-training/design-review.html');
 await b.until("document.querySelectorAll('.gb-phone main h2').length>=3");
 await b.js(`{const meta=document.createElement('meta');meta.name='viewport';meta.content='width=device-width,initial-scale=1';document.head.append(meta);}`);
 for(const concept of ['A','B','C']){
  await b.js(`document.querySelectorAll('[data-variant]').forEach(s=>s.hidden=s.querySelector('.gb-phone').dataset.concept!==${JSON.stringify(concept)})`);
  for(const theme of ['light','dark']){
   await b.js(`document.querySelector('[data-concept=${concept}]').dataset.theme=${JSON.stringify(theme)}`);
   for(const feature of ['focus','backup','blocks','adaptive','notes','calendar']){
    await b.fill(`[data-concept=${concept}] select`,feature);
    for(const width of [320,375,390,430,768,1024]){
     await b.cdp('Emulation.setDeviceMetricsOverride',{width,height:1050,deviceScaleFactor:1,mobile:width<768});
     const fit=await b.js(`(()=>{const p=document.querySelector('[data-concept=${concept}]');return {viewport:innerWidth,page:document.documentElement.scrollWidth,phone:p.clientWidth,content:p.scrollWidth,title:p.querySelector('h2').textContent}})()`);
     assert.ok(fit.page<=fit.viewport+1,JSON.stringify({concept,theme,feature,width,...fit}));
     assert.ok(fit.content<=fit.phone+1,JSON.stringify({concept,theme,feature,width,...fit}));
     checks.push({concept,theme,feature,width,passed:true});
     if(width===390)await b.shot(`artifacts/advanced-training/${concept}-${theme}-${feature}.png`);
    }
   }
  }
 }
 // Ordinary controls must respond without invoking app storage or downloads.
 await b.fill('[data-concept=C] select','focus');
 await b.click('[data-concept=C] [data-demo]');
 assert.match(await b.js("document.querySelector('[data-concept=C] .gb-feedback').textContent"),/Prototype only/);
 await b.click('[data-concept=C] [data-timer]');
 assert.equal(await b.js("document.querySelector('[data-concept=C] [data-timer]').textContent"),'Stop');
 assert.equal(await b.js('localStorage.length'),0);
 assert.equal(await b.js('(async()=>await indexedDB.databases())()').then(x=>x.length),0);
 const browserCrypto=await b.js(`(async()=>{const {encryptBackup,decryptBackup}=await import('/src/backup-crypto.js');const password='browser-only test password';const plain=JSON.stringify({private:'notes, history and photos'});const encrypted=await encryptBackup(plain,password);const roundTrip=await decryptBackup(encrypted,password);let rejected=false;try{await decryptBackup(encrypted,'incorrect test password')}catch{rejected=true}return {roundTrip:roundTrip===plain,wrongPasswordRejected:rejected,plaintextHidden:!encrypted.includes('history')};})()`);
 assert.deepEqual(browserCrypto,{roundTrip:true,wrongPasswordRejected:true,plaintextHidden:true});
 assert.deepEqual(b.errors,[]);
 await writeFile('artifacts/advanced-training/design-results.json',JSON.stringify({layoutChecks:checks,interactions:'prototype action and timer toggle passed',storage:'no IndexedDB or localStorage created',runtimeErrors:b.errors,browserCrypto},null,2));
 console.log(`${checks.length} design layout checks passed; prototype actions and storage isolation passed.`);
}finally{await b.close();}
