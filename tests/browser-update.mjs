import {spawn} from 'node:child_process';
import {cp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import assert from 'node:assert/strict';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const root=tmpdir()+'/gymbro-update-'+crypto.randomUUID();
const site=root+'/site',profile=root+'/browser';
const port=Number(process.env.UPDATE_PORT||5181),debugPort=Number(process.env.UPDATE_CDP_PORT||9240);
await mkdir(root,{recursive:true});await cp(process.env.UPDATE_BASELINE_DIST||'dist',site,{recursive:true});
const appVersion=JSON.parse(await readFile('package.json','utf8')).version;
const appCode=await readFile('dist/src/app.js','utf8'),workerCode=await readFile('dist/sw.js','utf8');
assert.ok(!workerCode.includes('./update.html'));assert.ok(!workerCode.includes('./update.js'));assert.ok(!workerCode.includes('./update.css'));
for(const f of ['update.html','update.js','update.css'])await rm(site+'/'+f);
const baselineCode=process.env.UPDATE_BASELINE_DIST?await readFile(site+'/src/app.js','utf8'):appCode;
const baselineWorker=process.env.UPDATE_BASELINE_DIST?await readFile(site+'/sw.js','utf8'):workerCode;
await writeFile(site+'/src/app.js',baselineCode.replaceAll('Gym Bro '+appVersion,'Gym Bro 0.1.1')+"\nglobalThis.__UPDATE_TEST_BUILD__='old';\n");
await writeFile(site+'/sw.js',baselineWorker.replace(/const CACHE=PREFIX\+'[^']+';/,"const CACHE=PREFIX+'old-test';"));
const server=spawn(process.execPath,['scripts/serve.mjs',site],{env:{...process.env,PORT:String(port)},stdio:'ignore'});
const chrome=spawn(process.env.CHROMIUM_PATH||'/usr/bin/chromium',['--headless','--no-sandbox','--disable-dev-shm-usage','--no-first-run','--disable-background-networking',`--user-data-dir=${profile}`,`--remote-debugging-port=${debugPort}`,'about:blank'],{stdio:'ignore'});
let socket,sequence=0;const pending=new Map(),errors=[],checks=[];
async function connect(){for(let n=0;n<100;n++){try{const pages=await(await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();const page=pages.find(p=>p.type==='page');socket=new WebSocket(page.webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);};return;}catch{await sleep(100);}}throw Error('Chromium did not start.');}
const cdp=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
async function js(expression){const r=await cdp('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;}
async function until(expression){for(let n=0;n<160;n++){try{if(await js(expression))return;}catch(e){if(!/context.*destroyed|Cannot find context|Inspected target navigated or closed/i.test(e.message))throw e;}await sleep(50);}throw Error('Timed out: '+expression);}
async function click(selector){await until(`Boolean(document.querySelector(${JSON.stringify(selector)}))`);await js(`document.querySelector(${JSON.stringify(selector)}).click()`);await sleep(150);}
async function fill(selector,value){await js(`{const e=document.querySelector(${JSON.stringify(selector)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);await sleep(80);}
async function route(value){await js(`location.hash=${JSON.stringify(value)}`);await sleep(150);}
const data=()=>js(`(async()=>await (await import('./src/storage.js')).loadState())()`);
const pass=name=>{checks.push(name);console.log('PASS '+name);};
try{
 await connect();await cdp('Runtime.enable');await cdp('Network.enable');await cdp('Page.enable');
 await cdp('Page.navigate',{url:`http://127.0.0.1:${port}/`});await until(`Boolean(document.querySelector('#onboard-form'))`);
 assert.ok(await js(`Boolean(document.querySelector('[data-action="import-dialog"]'))`));pass('Welcome screen offers direct import without profile setup');
 await js(`document.querySelector('#onboard-form').requestSubmit()`);await until(`Boolean(document.querySelector('.session-hero'))`);
 await until(`Boolean(navigator.serviceWorker.controller)`);await click('[data-action="start-plan"]');await fill('[data-field="kg"]','15');await fill('[data-field="reps"]','8');await click('[data-action="toggle-set"]');await click('[data-action="finish"]');await click('[data-action="confirm-finish"]');
 await route('workout');await click('[data-action="start-plan"]');await fill('[data-field="kg"]','17.5');await fill('[data-field="reps"]','9');
 await route('body');await click('[data-action="weight-dialog"]');await fill('#weight-form [name="value"]','86');await js(`document.querySelector('#weight-form').requestSubmit()`);await sleep(180);
 await click('[data-action="photo-dialog"]');const {root:dom}=await cdp('DOM.getDocument');const {nodeId}=await cdp('DOM.querySelector',{nodeId:dom.nodeId,selector:'input[name="photo"]'});await cdp('DOM.setFileInputFiles',{nodeId,files:[process.cwd()+'/public/icon-192.png']});await js(`document.querySelector('#photo-form').requestSubmit()`);await until(`Boolean(document.querySelector('[data-photo][src]'))`);
 const saved=await data();assert.equal(saved.sessions.length,1);assert.ok(saved.draft);assert.equal(saved.photos.length,1);
 await js(`(async()=>{localStorage.setItem('update-data-marker','keep');const c=await caches.open('unrelated-app-cache');await c.put('./unrelated-marker',new Response('keep'));const nested=await caches.open('gymbro-'+location.origin+'/nested/another-app');await nested.put('./nested-marker',new Response('keep nested'));})()`);
 // Deploy a new build while the old worker continues to serve its cached app.
 await cp('dist',site,{recursive:true});await writeFile(site+'/src/app.js',appCode+"\nglobalThis.__UPDATE_TEST_BUILD__='new';\n");
 await js('window.__oldDocument=true');await cdp('Page.reload');await until(`!window.__oldDocument && document.readyState==='complete'`);await until(`Boolean(document.querySelector('.sidebar'))`);assert.equal(await js('globalThis.__UPDATE_TEST_BUILD__'),'old');pass('Reproduced stale cached code even after a newer app was deployed');
 await cdp('Page.navigate',{url:`http://127.0.0.1:${port}/update.html?v=0.1.2`});await until(`Boolean(document.querySelector('#update:not(:disabled)'))`);pass('Uncached update page opens through the old service worker');
 const other=await cdp('Target.createTarget',{url:`http://127.0.0.1:${port}/#settings`});
 // Wait for the other app window to acquire its writer lock, without reading its private state.
 await until(`navigator.locks.query().then(s=>s.held.some(l=>l.name==='gymbro-writer'))`);
 await click('#update');await until(`document.querySelector('#status')?.textContent.includes('Another Gym Bro window')`);assert.ok(await js(`caches.keys().then(keys=>keys.some(k=>k.includes('old-test')))`));pass('Updater blocks while another Gym Bro window is writing');
 await cdp('Target.closeTarget',{targetId:other.targetId});await until(`navigator.locks.query().then(s=>!s.held.some(l=>l.name==='gymbro-writer'))`);
 await cdp('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});await click('#update');await until(`document.querySelector('#status')?.textContent.includes('Connect to the internet')`);assert.ok(await js(`caches.keys().then(keys=>keys.some(k=>k.includes('old-test')))`));pass('Offline update leaves the working cached app intact');
 await cdp('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});await click('#update');await until(`location.hash==='#settings'&&Boolean(document.querySelector('.sidebar'))`);assert.equal(await js('globalThis.__UPDATE_TEST_BUILD__'),'new');pass('Update bypasses old cached code and opens the current app');
 assert.deepEqual(await data(),saved);assert.equal(await js(`localStorage.getItem('update-data-marker')`),'keep');pass('History, unfinished workout, body entries, profile and photo metadata are unchanged');
 const photoBytes=await js(`(async()=>Array.from(new Uint8Array(await (await (await import('./src/storage.js')).getPhoto(${JSON.stringify(saved.photos[0].id)})).arrayBuffer())))()`);assert.deepEqual(photoBytes,Array.from(await readFile('public/icon-192.png')));pass('Private photo bytes remain intact');
 assert.equal(await js(`(async()=>await (await (await caches.open('unrelated-app-cache')).match('./unrelated-marker')).text())()`),'keep');assert.equal(await js(`(async()=>await (await (await caches.open('gymbro-'+location.origin+'/nested/another-app')).match('./nested-marker')).text())()`),'keep nested');pass('Other applications’ and nested scopes’ cache entries are preserved');
 await until(`Boolean(navigator.serviceWorker.controller)`);assert.ok(await js(`document.body.textContent.includes('Gym Bro '+${JSON.stringify(appVersion)})`));pass('Updated version is visible and offline shell re-registers');
 if(process.env.UPDATE_BASELINE_DIST){
  assert.ok(await js(`Boolean(document.querySelector('#appearance-form'))`));
  await fill('#appearance-form [name=theme]','light');await js(`document.querySelector('#appearance-form').requestSubmit()`);await until(`document.documentElement.dataset.theme==='light'`);
  const migrated=await data();assert.equal(migrated.upgrade.version,1);assert.equal(migrated.upgrade.theme,'light');for(const key of Object.keys(saved))assert.deepEqual(migrated[key],saved[key],key+' survived the production upgrade');
  pass('Actual 0.1.2 journal upgrades to 0.2.1 and saves additive preferences without changing any original state field');
 }
 assert.deepEqual(errors,[]);await mkdir('artifacts',{recursive:true});await writeFile('artifacts/update-results.json',JSON.stringify({passed:checks.length,checks,errors},null,2));console.log(`${checks.length} browser update checks passed.`);
}catch(error){console.error(error);process.exitCode=1;}
finally{socket?.close();chrome.kill();server.kill();await sleep(300);await rm(root,{recursive:true,force:true,maxRetries:3,retryDelay:100}).catch(()=>{});}
