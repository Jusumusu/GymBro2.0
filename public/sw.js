/* No skipWaiting: an update never interrupts an active workout. */
const PREFIX='gymbro-'+self.registration.scope;
const CACHE=PREFIX+'__VERSION__';
const ASSETS=__ASSETS__;
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(Array.isArray(ASSETS)?ASSETS:['./','./index.html','./src/app.js','./src/style.css']))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(event.request);if(cached)return cached;try{return await fetch(event.request);}catch(error){if(event.request.mode==='navigate')return await cache.match(new URL('./index.html',self.registration.scope));throw error;}})());});
