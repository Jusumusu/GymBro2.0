/* Updates activate only after an explicit user request. */
const PREFIX='gymbro-'+self.registration.scope;
const CACHE=PREFIX+'__VERSION__';
const ASSETS=__ASSETS__;
const RELEASE=__RELEASE__;
const scope=new URL(self.registration.scope);
const freshPaths=new Set(['update.html','update.js','update.css','version.json'].map(p=>new URL(p,scope).pathname));
async function digest(response){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await response.arrayBuffer())),b=>b.toString(16).padStart(2,'0')).join('');}
async function prepare(){
 const cache=await caches.open(CACHE);
 try{
  await Promise.all(ASSETS.map(async path=>{
   const url=new URL(path,scope),key=path.replace(/^\.\//,'');
   const existing=await cache.match(url);if(existing&&await digest(existing.clone())===RELEASE.assets[key])return;
   const network=new URL(url);network.searchParams.set('build',RELEASE.build);
   const response=await fetch(network,{cache:'no-store',signal:AbortSignal.timeout(20000)});
   if(!response.ok||await digest(response.clone())!==RELEASE.assets[key])throw Error('Incomplete release: '+key);
   await cache.put(url,response);
  }));
 }catch(error){await caches.delete(CACHE);throw error;}
}
self.addEventListener('install',event=>event.waitUntil(prepare()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&!key.slice(PREFIX.length).includes('/')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('message',event=>{
 if(event.data?.type==='GET_BUILD_INFO')event.ports[0]?.postMessage({build:RELEASE.build,version:RELEASE.version,environment:RELEASE.environment});
 if(event.data?.type==='ACTIVATE_UPDATE'&&event.data.build===RELEASE.build)event.waitUntil(self.skipWaiting().then(()=>event.ports[0]?.postMessage({ok:true})));
});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==scope.origin)return;
 // Recovery and release metadata always come from the network, never an old shell.
 if(freshPaths.has(url.pathname)){event.respondWith(fetch(event.request,{cache:'no-store'}));return;}
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE),shell=event.request.mode==='navigate'&&(url.pathname===scope.pathname||url.pathname===new URL('index.html',scope).pathname);
  const cached=await cache.match(shell?new URL('index.html',scope):event.request);
  if(cached)return cached;
  return fetch(event.request);
 })());
});
