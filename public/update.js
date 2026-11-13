// Uncached recovery entry point: stage the complete release before activation.
const button=document.querySelector('#update'),status=document.querySelector('#status');
let updating=false;
const base=new URL('./',location.href),environment=base.pathname.split('/').includes('preview')?'preview':'production';
const writerLock=environment==='preview'?'gymbro-preview-writer':'gymbro-writer';
button.disabled=false;
status.textContent='Your saved data stays in this browser. Close any other Gym Bro windows before updating.';
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function latestRelease(){
 const url=new URL('version.json',base);url.searchParams.set('check',String(Date.now()));
 const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw Error('The latest app files are not available yet. Try again shortly. Your saved data is unchanged.');
 const release=await response.json();
 if(release.schema!==1||!/^[a-f0-9]{12}$/.test(release.build)||release.environment!==environment||!/^\d+\.\d+\.\d+$/.test(release.version))throw Error('The latest release could not be verified. Try again shortly.');
 return release;
}
function message(worker,data){return new Promise((resolve,reject)=>{const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();reject(Error('The update worker did not respond. Please try again.'));},3000);channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();resolve(event.data);};worker.postMessage(data,[channel.port2]);});}
async function readyWorker(registration,build){
 const started=Date.now(),deadline=started+60000,checked=new WeakMap();
 while(Date.now()<deadline){
  const worker=registration.installing||registration.waiting||registration.active;
  if(worker&&['installed','activated'].includes(worker.state)){
   if(!checked.has(worker))checked.set(worker,message(worker,{type:'GET_BUILD_INFO'}).catch(()=>null));
   const info=await checked.get(worker);if(info?.build===build&&info.environment===environment)return worker;
   if(!registration.installing&&!registration.waiting&&Date.now()-started>1500)break;
  }
  await delay(200);
 }
 throw Error('The complete update could not be downloaded. Your working offline app and saved data are kept. Reconnect and try again.');
}
async function refreshApp(){
 if(!window.isSecureContext||!('serviceWorker'in navigator))throw Error('Open Gym Bro using its HTTPS address to update.');
 if(!navigator.onLine)throw Error('Connect to the internet and try again. Your saved data and offline files are unchanged.');
 try{
  for(let attempt=0;attempt<3;attempt++){
   status.textContent='Checking the latest published version…';const release=await latestRelease();
   showRelease(release);status.textContent=`Downloading and verifying Gym Bro ${release.version}… Your saved workouts and photos are kept.`;
   const registration=await navigator.serviceWorker.register(new URL('sw.js',base),{scope:base.href,updateViaCache:'none'});await registration.update();
   const worker=await readyWorker(registration,release.build);
   // A deployment may finish while downloading. Never knowingly activate an older release.
   if((await latestRelease()).build!==release.build)continue;
   if(worker.state!=='activated'){
    await message(worker,{type:'ACTIVATE_UPDATE',build:release.build});
    const deadline=Date.now()+10000;while(worker.state!=='activated'&&Date.now()<deadline)await delay(50);
    if(worker.state!=='activated')throw Error('The update is downloaded but could not activate. Please try again.');
   }
   const destination=new URL('./',base);destination.searchParams.set('updated',release.build);destination.hash='settings';location.replace(destination.href);return;
  }
  throw Error('A newer release is still being published. Please try again shortly.');
 }catch(error){if(navigator.onLine===false||error.name==='TypeError')throw Error('Connect to the internet and try again. Your saved data and offline files are unchanged.');throw error;}
}
button.addEventListener('click',async()=>{
 if(updating)return;updating=true;button.disabled=true;
 try{
  if(navigator.locks)await navigator.locks.request(writerLock,{ifAvailable:true},async lock=>{if(!lock)throw Error('Another Gym Bro window is still open. Close it, then click Update again here.');await refreshApp();});
  else await refreshApp();
 }catch(error){status.textContent=error.message;updating=false;button.disabled=false;}
});
// Old clients send auto=1 on a Settings visit. Deliberately ignore that flag:
// viewing version information is not consent to install or navigate away.
function showRelease(release){
 document.querySelector('#release-version').textContent='Gym Bro '+release.version;
 const list=document.querySelector('#release-notes');list.replaceChildren();
 for(const text of (release.notes||['The latest published Gym Bro release.']).slice(0,12)){const li=document.createElement('li');li.textContent=String(text).slice(0,300);list.append(li);}
}
async function describeRelease(){
 try{
  const release=await latestRelease();if(updating)return;showRelease(release);
  if(!window.isSecureContext||!('serviceWorker'in navigator)){status.textContent='Offline app updates are unavailable in this browser. Open the HTTPS app in a supported browser; release information remains readable here.';button.textContent='Offline updates unavailable';button.disabled=true;return;}
  const registration=await navigator.serviceWorker.getRegistration(base.href);
  const info=registration?.scope===base.href&&registration.active?await message(registration.active,{type:'GET_BUILD_INFO'}).catch(()=>null):null;
  if(updating)return;
  const current=info?.build===release.build&&info?.environment===environment;
  status.textContent=current?'You’re running the latest version. You can refresh its verified offline files below.':'A published version is available. Read the notes and choose when to update.';
  button.textContent=current?'Refresh current version':'Update Now';
 }catch(error){if(updating)return;status.textContent=navigator.onLine===false||error.name==='TypeError'?'You’re offline. Your saved app and workouts are kept. Reconnect to check the latest version.':error.message;document.querySelector('#release-version').textContent='Version check unavailable';}
}
// Only the new notice's explicit Update Now action carries this install intent.
if(new URL(location.href).searchParams.get('intent')==='apply')button.click();
else describeRelease();
