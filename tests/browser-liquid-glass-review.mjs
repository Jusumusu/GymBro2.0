import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browser} from './helpers/mobile-browser.mjs';
const out='artifacts/liquid-glass/review';await mkdir(out,{recursive:true});
const b=await browser({port:5245,debug:9315});let assertions=0;const layouts=[],contrasts=[],timings=[];
const check=(value,message)=>{assert(value,message);assertions++;};
const js=expression=>b.js(`(()=>{const p=document.querySelector('gymbro-preview'),s=p.shadowRoot;${expression}})()`);
const settle=async()=>{await b.until("globalThis.reviewReady&&document.querySelector('gymbro-preview')?.shadowRoot.querySelectorAll('link')[1]?.sheet");await b.js('document.fonts.ready');await b.until("getComputedStyle(document.querySelector('gymbro-preview').shadowRoot.querySelector('.review-nav')).display==='grid'||getComputedStyle(document.querySelector('gymbro-preview').shadowRoot.querySelector('.review-nav')).display==='flex'");};
const view=async(concept,theme,screen,width=390)=>{
 await b.cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
 await b.navigate(`/docs/liquid-glass/?solo=1&concept=${concept}&theme=${theme}&screen=${screen}&size=${width>=700?'desktop':'phone'}`);await settle();
};
try{
 await b.cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await view('A','dark','workout');
 await b.js("Promise.all(['Manrope','DM Sans','Geist','Barlow Condensed','Newsreader'].map(f=>document.fonts.load('700 20px \"'+f+'\"')))");
 check(await js("return !document.querySelector('script[src*=app]')&&!s.querySelector('script')"),'No app controller in prototype');
 const screens=await js("return [...Object.keys(p.payload.views),'states']");
 // Same actual components in all five concepts, both appearances and requested widths.
 for(const width of [320,375,390,430,768,1120]){
  await b.cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
  for(const concept of ['A','B','C','D','E'])for(const theme of ['light','dark']){
   await js(`p.dataset.concept='${concept}';p.dataset.theme='${theme}';return true;`);
   for(const screen of screens){
    await js(`p.go('${screen}');return true;`);
    const result=await js(`const c=s.querySelector('.sample-container'),nav=s.querySelector('.review-nav');return {width:c.clientWidth,scroll:c.scrollWidth,main:s.querySelector('#main').scrollWidth,nav:nav.getBoundingClientRect().toJSON(),frame:p.getBoundingClientRect().toJSON()};`);
    layouts.push({concept,theme,screen,width,...result});
    check(result.scroll<=result.width+1,`${concept}/${theme}/${screen}/${width} content overflow: ${result.scroll}/${result.width}`);
    check(result.nav.left>=result.frame.left-1&&result.nav.right<=result.frame.right+1,`${concept}/${theme}/${screen}/${width} nav containment`);
   }
  }
 }
 console.log('Layout checks: '+layouts.length);
 // Contrast of token pairs on solid surfaces; glass has its own solid text backing.
 await view('A','dark','states');
 for(const concept of ['A','B','C','D','E'])for(const theme of ['light','dark']){
  const pairs=await js(`p.dataset.concept='${concept}';p.dataset.theme='${theme}';const c=getComputedStyle(p);return [['--ink','--paper'],['--ink','--surface'],['--muted','--paper'],['--muted','--surface'],['--accent','--accent-soft'],['--on-accent','--accent'],['--success','--success-soft'],['--record','--record-soft'],['--notice-ink','--notice-surface'],['--hero-ink','--hero-surface'],['--hero-muted','--hero-surface'],['--hero-action-ink','--hero-action']].map(v=>v.map(k=>c.getPropertyValue(k).trim()));`);
  const lum=hex=>{if(hex.length===4)hex='#'+[...hex.slice(1)].map(c=>c+c).join('');const rgb=hex.slice(1).match(/.{2}/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
  for(const [fg,bg]of pairs){const a=lum(fg),z=lum(bg),ratio=(Math.max(a,z)+.05)/(Math.min(a,z)+.05);contrasts.push({concept,theme,fg,bg,ratio});check(ratio>=4.5,`${concept}/${theme} contrast ${fg}/${bg}: ${ratio.toFixed(2)}`);}
 }
 // Representative logging: valid completion, undo, invalid input and optional RIR.
 await view('D','dark','active');
 const id=await js("return s.querySelector('.active-set').dataset.setRow");
 await js(`s.querySelector('[data-set-row="${id}"] .complete-button').click();return true;`);
 check(await js(`return s.querySelector('[data-set-row="${id}"]').classList.contains('complete')`),'Complete sample set');
 await js(`s.querySelector('[data-set-row="${id}"] .complete-button').click();let t=s.querySelector('[data-set-row="${id}"] [data-field=reps]');t.value='-2';t.dispatchEvent(new Event('input',{bubbles:true}));s.querySelector('[data-set-row="${id}"] .complete-button').click();return true;`);
 check(await js(`return !s.querySelector('[data-set-row="${id}"]').classList.contains('complete')&&s.querySelector('[aria-invalid=true]')!==null`),'Invalid entries rejected');
 await js(`let t=s.querySelector('[data-set-row="${id}"] [data-field=reps]');t.value='10';t.dispatchEvent(new Event('input',{bubbles:true}));s.querySelector('[data-set-row="${id}"] .complete-button').click();return true;`);
 check(await js(`return s.querySelector('[data-set-row="${id}"]').classList.contains('complete')`),'Blank RIR remains optional');
 await js("s.querySelector('[data-action=exercise-options]').click();return true;");check(await js("return s.querySelector('dialog').open"),'Native options dialog opens');await b.shot(out+'/D-dark-options.png');await js("s.querySelector('.sample-dialog-top button').click();p.go('focus');s.querySelector('[data-action=toggle-set]').click();return true;");
 check(await js("return !s.querySelector('dialog').open&&s.querySelector('[data-action=toggle-set]').getAttribute('aria-pressed')==='false'"),'Focus sample undo');
 await js("p.go('library');const t=s.querySelector('[data-browser-search]');t.value='zzzzzzz';t.dispatchEvent(new Event('input',{bubbles:true}));return true;");check(await js("return !s.querySelector('.sample-search-empty').hidden"),'Library empty search state');
 await js("s.querySelector('[data-action=browser-clear-search]').click();s.querySelector('[data-action=browser-favorite]').click();return true;");check(await js("return s.querySelector('[data-action=browser-favorite]').getAttribute('aria-pressed')==='true'"),'Sample favorite');
 await js("p.go('settings');s.querySelector('[data-action=export-json]').click();return true;");check(await js("return s.querySelector('dialog').open"),'Backup controls shown without downloading');await js("s.querySelector('.sample-dialog-top button').click();p.go('update');s.querySelector('#update').click();return true;");
 check(await b.js("(async()=>({db:await indexedDB.databases(),local:localStorage.length,workers:await navigator.serviceWorker.getRegistrations(),caches:await caches.keys()}))()").then(r=>r.db.length===0&&r.local===0&&r.workers.length===0&&r.caches.length===0),'No storage, cache or worker side effects');
 // Four material levels and the real OS preference fallback.
 const fills=[];for(const glass of ['solid','subtle','balanced','expressive'])fills.push(await js(`p.dataset.glass='${glass}';return [getComputedStyle(s.querySelector('.review-nav')).backgroundColor,getComputedStyle(s.querySelector('.review-nav')).backdropFilter];`));
 check(new Set(fills.map(x=>x.join('/'))).size===4,'Four distinct glass levels');
 await b.cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'},{name:'prefers-reduced-transparency',value:'reduce'}]});
 check(await js("return getComputedStyle(s.querySelector('.review-nav')).backdropFilter==='none'"),'Reduced transparency removes blur');
 await b.cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 // Actual screen evidence, not generated imagery.
 for(const concept of ['A','B','C','D','E'])for(const theme of ['light','dark']){
  await view(concept,theme,'workout');
  for(const screen of screens){await js(`p.go('${screen}');return true;`);await b.js('document.fonts.ready');
   if(screen==='active')await js("const c=s.querySelector('.sample-container'),card=s.querySelector('.exercise-card');c.scrollTop=card.offsetTop-90;return true;");
   await b.shot(`${out}/${concept}-${theme}-${screen}.png`);
  }
 }
 for(const theme of ['light','dark'])for(const screen of ['workout','active']){
  await b.cdp('Emulation.setDeviceMetricsOverride',{width:2280,height:1500,deviceScaleFactor:1,mobile:false});await b.navigate(`/docs/liquid-glass/?compare=1&theme=${theme}&screen=${screen}`);await settle();
  await b.until("[...document.querySelectorAll('gymbro-preview')].every(p=>p.shadowRoot.querySelectorAll('link')[1].sheet)");await b.js('document.fonts.ready');
  if(screen==='active')await b.js("document.querySelectorAll('gymbro-preview').forEach(p=>{const s=p.shadowRoot,c=s.querySelector('.sample-container');c.scrollTop=s.querySelector('.exercise-card').offsetTop-90;})");
  const box=await b.js("document.querySelector('#previews').getBoundingClientRect().toJSON()");const shot=await b.cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:box.x,y:box.y,width:box.width,height:box.height,scale:1}});await writeFile(`${out}/board-${theme}-${screen}.png`,Buffer.from(shot.data,'base64'));
 }
 await view('A','dark','gains',1120);await b.shot(out+'/A-dark-desktop-gains.png');await view('E','light','workout',1120);await b.shot(out+'/E-light-desktop-workout.png');
 check(b.errors.length===0,'No browser exceptions: '+b.errors.join(';'));
 await writeFile(out+'/results.json',JSON.stringify({assertions,layouts:layouts.length,screens:screens.length,contrasts,glass:fills,errors:b.errors,executed:'Chromium; synthetic RAM-only prototypes; not physical Safari certification'},null,2));
 console.log(`PASS ${assertions} assertions; ${layouts.length} layouts; ${screens.length} screens per concept; 120 contrast pairs; no storage side effects`);
}catch(error){await writeFile('work/liquid-glass/layouts-partial.json',JSON.stringify(layouts));console.error(error);await b.shot('work/liquid-glass/failure.png');process.exitCode=1;}finally{await b.close();}
