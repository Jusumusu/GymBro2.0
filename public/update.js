// This page and script stay out of the app's offline cache, so older app shells can open them.
const button=document.querySelector('#update');
const status=document.querySelector('#status');
const base=new URL('./',location.href);
button.disabled=false;
status.textContent='Your saved data stays in this browser. Close any other Gym Bro windows before updating.';

async function refreshApp(){
 if(!window.isSecureContext||!('serviceWorker'in navigator))throw Error('Open Gym Bro using its HTTPS address to update.');
 if(!navigator.onLine)throw Error('Connect to the internet and try again. Your saved data and offline files are unchanged.');
 status.textContent='Checking the latest app files…';
 // Confirm a working production shell is available before removing any offline app cache.
 const check=new URL('index.html',base);check.searchParams.set('update-check',String(Date.now()));
 let response;
 try{response=await fetch(check,{cache:'no-store'});}catch{throw Error('Connect to the internet and try again. Your saved data and offline files are unchanged.');}
 const html=await response.text();
 if(!response.ok||!html.includes('name="production"')||!html.includes('id="app"'))throw Error('The latest app files are not available yet. Try again shortly. Your saved data is unchanged.');
 status.textContent='Refreshing app files. Your saved workouts and photos are kept…';
 const registrations=await navigator.serviceWorker.getRegistrations();
 for(const registration of registrations)if(registration.scope===base.href)await registration.unregister();
 const prefix='gymbro-'+base.href;
 for(const key of await caches.keys())if(key.startsWith(prefix)&&!key.slice(prefix.length).includes('/'))await caches.delete(key);
 // IndexedDB, localStorage, other apps' caches and user records are never deleted.
 const destination=new URL('./',base);destination.searchParams.set('updated',String(Date.now()));destination.hash='settings';
 location.replace(destination.href);
}

button.addEventListener('click',async()=>{
 button.disabled=true;
 try{
  if(navigator.locks){
   await navigator.locks.request('gymbro-writer',{ifAvailable:true},async lock=>{
    if(!lock)throw Error('Another Gym Bro window is still open. Close it, then click Update again here.');
    await refreshApp();
   });
  }else await refreshApp();
 }catch(error){status.textContent=error.message;button.disabled=false;}
});
