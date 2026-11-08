// Uncached recovery entry point: stage the complete release before activation.
const button=document.querySelector('#update'),status=document.querySelector('#status');
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
   status.textContent=`Downloading and verifying Gym Bro ${release.version}… Your saved workouts and photos are kept.`;
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
 button.disabled=true;
 try{
  if(navigator.locks)await navigator.locks.request(writerLock,{ifAvailable:true},async lock=>{if(!lock)throw Error('Another Gym Bro window is still open. Close it, then click Update again here.');await refreshApp();});
  else await refreshApp();
 }catch(error){status.textContent=error.message;button.disabled=false;}
});
// The in-app buttons are explicit consent; the standalone recovery link stays manual.
if(new URL(location.href).searchParams.get('auto')==='1')button.click();
