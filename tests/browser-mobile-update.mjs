import assert from 'node:assert/strict';
import {mkdir,writeFile,mkdtemp,cp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {releasedBaseline} from './helpers/released-baseline.mjs';
import {browser,sleep} from './helpers/mobile-browser.mjs';
await mkdir('artifacts/mobile-refinement',{recursive:true});
const baseline=process.argv.includes('--baseline'),released=await releasedBaseline();
const scratch=baseline?null:await mkdtemp(tmpdir()+'/gymbro-mobile-updates-');if(scratch)await cp(released.root,scratch+'/site',{recursive:true});
const b=await browser({root:baseline?released.root:scratch+'/site'});
try{
 await b.navigate();await b.until(`Boolean(document.querySelector('#onboard-form'))`);await b.submit('#onboard-form');await b.until(`Boolean(navigator.serviceWorker.controller)`);await b.route('settings');
 if(baseline){
  await b.click('[data-action=update-app]');await b.until(`location.search.includes('updated=')&&Boolean(document.querySelector('.sidebar'))`);
  const helper=b.navigations.find(n=>n.url.includes('/update.html')),returned=b.navigations.find(n=>n.at>=helper?.at&&n.url.includes('updated='));
  assert.ok(helper?.url.includes('auto=1'));assert.ok(returned);
  const result={baseline:'Released main 0.2.4, no newer version deployed',reproduced:true,helperVisibleMs:returned.at-helper.at,navigations:b.navigations,cause:'The app adds auto=1; the standalone helper calls button.click() on module startup and location.replace() after verifying the already-current build. No second user action or reading opportunity is offered.',scope:'Actual Chromium service worker lifecycle with synthetic journal; physical phone was not inspected'};
  await writeFile('artifacts/mobile-refinement/update-baseline.json',JSON.stringify(result,null,2)+'\n');console.log('Reproduced premature updater return:',result.helperVisibleMs,'ms');
 }else{
  const checks=[],pass=name=>{checks.push(name);console.log('PASS '+name);};
  await b.route('workout');await b.click('[data-action=start-plan]');await b.fill('[data-field=kg]','27.5');await b.fill('[data-field=reps]','9');const before=await b.data();
  await cp('dist',scratch+'/site',{recursive:true});await b.route('settings');await b.js("window.dispatchEvent(new Event('focus'))");await b.until(`Boolean(document.querySelector('#app-update-notice'))`);await sleep(1500);assert.ok(await b.js(`Boolean(document.querySelector('#app-update-notice'))`));assert.ok((await b.data()).draft);pass('An actual installed 0.2.4 worker detects the new release without reloading or interrupting an unfinished workout');
  await b.click('[data-action=update-app]');await b.until(`location.pathname.endsWith('/update.html')&&document.querySelector('#release-version').textContent.includes('0.2.5')`);await sleep(3000);assert.ok(await b.js(`location.pathname.endsWith('/update.html')`));assert.ok(await b.js(`document.querySelector('#release-notes').children.length>=4`));pass('Old auto=1 entry remains on a readable release screen until intentional action; no artificial dismissal delay');
  for(const theme of ['light','dark']){await b.js(`document.documentElement.dataset.theme='${theme}'`);for(const width of [320,375,390,430,768,1024]){await b.cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<700});assert.ok(await b.js(`document.documentElement.scrollWidth<=innerWidth+1`));}await b.shot('artifacts/mobile-refinement/'+theme+'-update-screen.png');}pass('Release information and actions fit both themes at all six required widths');
  await b.click('#update');await b.until(`location.search.includes('updated=')&&Boolean(document.querySelector('.sidebar'))`);const after=await b.data();assert.deepEqual(after.draft,before.draft);assert.deepEqual(after.sessions,before.sessions);assert.equal(await b.js(`document.querySelector('meta[name="gymbro-version"]').content`),'0.2.5');pass('An intentional Update Now activates the verified new worker and preserves entered workout data');
  await b.click('[data-action=update-app]');await b.until(`location.pathname.endsWith('/update.html')&&document.querySelector('#status').textContent.includes('latest version')`);await sleep(1800);assert.ok(await b.js(`location.pathname.endsWith('/update.html')`));pass('Settings always opens a stable screen and explicitly reports the latest version when already current');
  await b.click('.back');await b.until(`Boolean(document.querySelector('.sidebar'))`);assert.equal(await b.js(`Boolean(document.querySelector('#app-update-notice'))`),false);assert.deepEqual((await b.data()).draft,before.draft);pass('Later returns to the unchanged workout without repeating an installed-release prompt');
  await b.cdp('Page.addScriptToEvaluateOnNewDocument',{source:'delete Navigator.prototype.serviceWorker;'});await b.navigate('/#settings');await b.until(`Boolean(document.querySelector('.sidebar'))`);await b.click('[data-action=update-app]');await b.until(`location.pathname.endsWith('/update.html')&&document.querySelector('#status').textContent.includes('unavailable in this browser')`);assert.equal(await b.js(`document.querySelector('#update').disabled`),true);assert.ok(await b.js(`document.querySelector('#release-notes').children.length>=4`));await b.click('.back');await b.until(`Boolean(document.querySelector('.sidebar'))`);assert.deepEqual((await b.data()).draft,before.draft);pass('Unsupported offline-update browsers still open readable version information with accurate guidance and no destructive fallback');
  assert.deepEqual(b.errors,[]);await writeFile('artifacts/mobile-refinement/update-regression.json',JSON.stringify({passed:checks.length,checks,errors:b.errors,navigations:b.navigations,physicalDevices:'Not inspected; real Chromium worker lifecycle with mobile viewport emulation'},null,2)+'\n');
 }
}finally{await b.close();if(scratch)await rm(scratch,{recursive:true,force:true});await released.close();}
