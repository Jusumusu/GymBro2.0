// Install the actual released 0.4.0, then update it to this candidate in place.
import assert from 'node:assert/strict';
import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {browser} from './helpers/mobile-browser.mjs';
import {refinementFixture} from './fixtures/refinement.mjs';
import {makeDraft} from '../src/planner.js';
const root=process.cwd(),work=path.resolve('work/liquid-glass/implementation/upgrade'),out='artifacts/liquid-glass/implementation/upgrade';
await mkdir(work+'/stable',{recursive:true});await mkdir(out,{recursive:true});
function run(cmd,args,cwd=root){const r=spawnSync(cmd,args,{cwd,encoding:'utf8'});assert.equal(r.status,0,r.stderr);return r.stdout;}
run('git',['archive','--format=tar','--output='+work+'/stable.tar','f8b5d80d914c8d877d67d4155965be26170bed08']);run('tar',['-xf',work+'/stable.tar','-C',work+'/stable']);run(process.execPath,['scripts/build.mjs'],work+'/stable');
await cp(work+'/stable/dist',work+'/site',{recursive:true});const old=JSON.parse(await readFile(work+'/site/version.json','utf8')),candidate=JSON.parse(await readFile('dist/version.json','utf8'));
assert.equal(old.version,'0.4.0');assert.equal(candidate.version,'0.5.0');
const b=await browser({root:work+'/site',port:5251,debug:9321}),checks=[];
const check=name=>{checks.push(name);console.log('PASS '+name);};
try{
 await b.navigate('/');await b.until("document.querySelector('#onboard-form')");await b.submit('#onboard-form');
 const date=await b.js("new Date().toLocaleDateString('en-CA')"),state=refinementFixture(date);state.profile.name='Alex Example';state.photos=[];state.draft=makeDraft(state.plans[0],date);
 for(const e of state.draft.exercises)for(const [i,set]of e.entries.entries())Object.assign(set,{kg:60,reps:10,rir:i===0?2:null,done:i===0});
 await b.js(`(async()=>await(await import('./src/storage.js')).saveState(${JSON.stringify(state)}))()`);await b.reload("document.querySelector('.sidebar')");
 await b.route('body');await b.click('[data-action=photo-dialog]');const {root:dom}=await b.cdp('DOM.getDocument'),{nodeId}=await b.cdp('DOM.querySelector',{nodeId:dom.nodeId,selector:'input[name=photo]'});await b.cdp('DOM.setFileInputFiles',{nodeId,files:[root+'/public/icon-192.png']});await b.submit('#photo-form');await b.until("document.querySelector('[data-photo][src]')");
 await b.route('settings');await b.fill('#appearance-form [name=theme]','dark');await b.until('navigator.serviceWorker.controller');await b.js("localStorage.setItem('aero-unrelated-marker','keep');globalThis.__aeroOldDocument=true");const before=await b.data();await b.shot(out+'/before-0.4-dark.png');
 assert.equal(await b.js("document.querySelector('meta[name=gymbro-version]').content"),'0.4.0');assert.equal(await b.js("getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()"),'#17151e');check('Actual released 0.4.0 controls the original synthetic journal and private photo');
 await cp('dist',work+'/site',{recursive:true});assert.equal(await b.js('globalThis.__aeroOldDocument'),true);check('Publishing candidate files does not interrupt or reload the old app');
 await b.click('[data-action=update-app]');await b.until("location.pathname.endsWith('/update.html')&&document.querySelector('#release-version')?.textContent.includes('0.5.0')");assert.deepEqual(await b.js("(async()=>{const storage=await import('./src/storage.js');await storage.openDB();return storage.loadState();})()"),before);check('Settings opens version information without silently installing the update');
 await b.click('#update');await b.until("location.hash==='#settings'&&document.querySelector('.sidebar')&&document.querySelector('meta[name=gymbro-version]')?.content==='0.5.0'",500);
 assert.equal(await b.js("getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()"),'#14191c');assert.deepEqual(await b.data(),before);assert.equal(await b.js("localStorage.getItem('aero-unrelated-marker')"),'keep');check('One explicit update installs Aero while preserving the complete journal and dark preference');
 const photo=await b.js(`(async()=>Array.from(new Uint8Array(await(await(await import('./src/storage.js')).getPhoto(${JSON.stringify(before.photos[0].id)})).arrayBuffer())))()`);assert.deepEqual(photo,Array.from(await readFile('public/icon-192.png')));check('Private photo bytes, stable exercise/set identities and unfinished workout survive exactly');
 await b.js('document.fonts.ready');await b.shot(out+'/after-0.5-dark.png');await b.until('navigator.serviceWorker.controller');await b.cdp('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});await b.reload("document.querySelector('.sidebar')");assert.equal(await b.js("document.querySelector('meta[name=gymbro-version]').content"),'0.5.0');assert.deepEqual(await b.data(),before);assert(await b.js("document.fonts.check('600 16px Manrope')"));check('Updated Aero shell, fonts and unchanged journal reload offline');
 assert.deepEqual(b.errors,[]);await writeFile(out+'/results.json',JSON.stringify({from:old,to:candidate,checks,errors:b.errors},null,2)+'\n');
}catch(e){await b.shot(work+'/failure.png').catch(()=>{});throw e;}finally{await b.close();}
