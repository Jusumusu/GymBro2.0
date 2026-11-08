// Only published builds check for updates. No journal data leaves this device.
export function validRelease(value,environment){
 return !!value&&value.schema===1&&/^[a-f0-9]{12}$/.test(value.build)&&typeof value.version==='string'&&/^\d+\.\d+\.\d+$/.test(value.version)&&value.environment===environment;
}

export function createAppUpdates({beforeUpdate,onError,pollMs=60000}){
 const base=new URL('./',document.baseURI),production=!!document.querySelector('meta[name="production"]');
 const environment=document.querySelector('meta[name="gymbro-environment"]')?.content==='preview'?'preview':'production';
 const current=document.querySelector('meta[name="gymbro-build"]')?.content;
 let latest=null,dismissed=null,inflight=null,registration=null,timer=null,loading=false,message='Checks automatically when online.';
 const supported=production&&'serviceWorker'in navigator&&window.isSecureContext;
 function renderStatus(){const el=document.querySelector('#app-update-status');if(el)el.textContent=message;}
 function report(message){const notice=document.querySelector('#app-update-notice');if(notice){let error=notice.querySelector('[role="alert"]');if(!error){error=document.createElement('p');error.setAttribute('role','alert');notice.append(error);}error.textContent=message;}onError(message);}
 function showUpdate(){
  if(!latest||latest.build===dismissed||document.querySelector('#app-update-notice'))return;
  const notice=document.createElement('aside');notice.id='app-update-notice';notice.className='app-update-notice panel';notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');notice.setAttribute('aria-atomic','true');
  const title=document.createElement('strong');title.textContent='Update available';
  const text=document.createElement('p');text.textContent=`Gym Bro ${latest.version} is available. Load it when you’re ready; your saved workout stays on this device.`;
  const actions=document.createElement('div');actions.className='actions';
  const load=document.createElement('button');load.id='load-app-update';load.className='primary';load.textContent='Load update';load.onclick=()=>loadLatest();
  const later=document.createElement('button');later.className='secondary';later.textContent='Later';later.onclick=()=>{dismissed=latest.build;const hadFocus=notice.contains(document.activeElement);notice.remove();if(hadFocus)document.querySelector('#main')?.focus({preventScroll:true});};
  actions.append(load,later);notice.append(title,text,actions);document.body.append(notice);
 }
 async function check(){
  if(!supported||!current||navigator.onLine===false)return;
  if(inflight)return inflight;
  inflight=(async()=>{
   try{
    const url=new URL('version.json',base);url.searchParams.set('check',String(Date.now()));
    const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(8000)});
    if(!response.ok)throw Error('Update check unavailable');
    const release=await response.json();if(!validRelease(release,environment))throw Error('Invalid release');
    latest=release;
    if(release.build!==current){
     const notice=document.querySelector('#app-update-notice');if(notice&&notice.dataset.build!==release.build)notice.remove();
     message=`Update available: Gym Bro ${release.version}.`;showUpdate();const shown=document.querySelector('#app-update-notice');if(shown)shown.dataset.build=release.build;
     registration?.update().catch(()=>{});
    }else{message='You’re using the latest published version.';document.querySelector('#app-update-notice')?.remove();}
   }catch{message=navigator.onLine===false?'Offline. Update checks resume when you reconnect.':'Could not check for updates. We’ll try again automatically.';}
   finally{renderStatus();inflight=null;}
  })();return inflight;
 }
 async function loadLatest(){
  if(loading)return;
  if(!supported){report('App updates are available at the published HTTPS app address.');return;}
  if(navigator.onLine===false){report('Connect to the internet to load the latest version. Your offline app is kept.');return;}
  loading=true;const button=document.querySelector('#load-app-update');if(button)button.disabled=true;
  try{await beforeUpdate();const url=new URL('update.html',base);url.searchParams.set('latest',String(Date.now()));url.searchParams.set('auto','1');location.assign(url.href);}
  catch(error){report(error.message);loading=false;if(button)button.disabled=false;}
 }
 const visible=()=>{if(document.visibilityState!=='hidden')check();};
 const offline=()=>{message='Offline. Update checks resume when you reconnect.';renderStatus();};
 async function start(){
  if(!supported){message='Updates are checked in the published app.';renderStatus();return;}
  // Registration failure must never prevent opening a saved offline journal.
  try{registration=await navigator.serviceWorker.register(new URL('sw.js',base),{scope:base.href,updateViaCache:'none'});registration.addEventListener('updatefound',()=>{const worker=registration.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed')check();});});}catch{}
  check();timer=setInterval(visible,pollMs);window.addEventListener('focus',visible);window.addEventListener('online',visible);window.addEventListener('offline',offline);document.addEventListener('visibilitychange',visible);
 }
 function stop(){clearInterval(timer);window.removeEventListener('focus',visible);window.removeEventListener('online',visible);window.removeEventListener('offline',offline);document.removeEventListener('visibilitychange',visible);}
 return {start,stop,check,loadLatest,renderStatus};
}
