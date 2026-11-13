import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browser,sleep} from './helpers/mobile-browser.mjs';
await mkdir('artifacts/mobile-refinement',{recursive:true});
const baseline=process.argv.includes('--baseline');
const b=await browser({root:baseline?'/tmp/gymbro-024-mobile-baseline':'dist'});
try{
 await b.navigate();await b.until(`Boolean(document.querySelector('#onboard-form'))`);await b.submit('#onboard-form');await b.until(`Boolean(navigator.serviceWorker.controller)`);await b.route('settings');
 if(baseline){
  await b.click('[data-action=update-app]');await b.until(`location.search.includes('updated=')&&Boolean(document.querySelector('.sidebar'))`);
  const helper=b.navigations.find(n=>n.url.includes('/update.html')),returned=b.navigations.find(n=>n.at>=helper?.at&&n.url.includes('updated='));
  assert.ok(helper?.url.includes('auto=1'));assert.ok(returned);
  const result={baseline:'Released main 0.2.4, no newer version deployed',reproduced:true,helperVisibleMs:returned.at-helper.at,navigations:b.navigations,cause:'The app adds auto=1; the standalone helper calls button.click() on module startup and location.replace() after verifying the already-current build. No second user action or reading opportunity is offered.',scope:'Actual Chromium service worker lifecycle with synthetic journal; physical phone was not inspected'};
  await writeFile('artifacts/mobile-refinement/update-baseline.json',JSON.stringify(result,null,2)+'\n');console.log('Reproduced premature updater return:',result.helperVisibleMs,'ms');
 }else{throw Error('Regression scenarios will be added with the repair.');}
}finally{await b.close();}
