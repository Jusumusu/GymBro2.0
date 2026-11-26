import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createAppUpdates,issueUpdateIntent} from '../src/app-updates.js';

// Small DOM/event adapter exercises the update decision controller without a browser.
class Element extends EventTarget{
 constructor(tag,doc){super();this.tagName=tag;this.doc=doc;this.children=[];this.dataset={};this.attributes={};this.className='';this.textContent='';}
 append(...nodes){for(const node of nodes){node.parent=this;this.children.push(node);}}
 replaceChildren(...nodes){this.children=[];this.append(...nodes);}
 setAttribute(key,value){this.attributes[key]=value;}
 remove(){if(this.parent)this.parent.children=this.parent.children.filter(e=>e!==this);}
 contains(node){return this===node||this.children.some(c=>c.contains(node));}
 focus(){this.doc.activeElement=this;}
 querySelector(selector){const matches=e=>selector.startsWith('#')?e.id===selector.slice(1):selector.startsWith('.')?e.className.split(' ').includes(selector.slice(1)):selector==='[data-update-version]'?Object.hasOwn(e.dataset,'updateVersion'):selector==='[role="alert"]'?e.attributes.role==='alert':false;for(const child of this.children){if(matches(child))return child;const found=child.querySelector(selector);if(found)return found;}return null;}
}
const release=build=>({schema:1,version:'0.9.0',build,environment:'preview',notes:['Accurate test fixture notes']});
function environment({register}={}){
 const originals=new Map(['document','window','navigator','fetch','location','sessionStorage'].map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)])),doc=new EventTarget(),win=new EventTarget(),registration=new EventTarget(),storage=new Map(),navigations=[];
 doc.baseURI='https://example.test/GymBro2.0/preview/';doc.visibilityState='visible';doc.createElement=tag=>new Element(tag,doc);doc.body=doc.createElement('body');const main=doc.createElement('main');main.id='main';doc.body.append(main);const metas={'production':{content:'true'},'gymbro-environment':{content:'preview'},'gymbro-build':{content:'123456abcdef'}};doc.querySelector=selector=>selector.startsWith('meta[')?metas[selector.match(/name="([^"]+)"/)[1]]:doc.body.querySelector(selector);win.isSecureContext=true;registration.update=async()=>{};let published=release('abcdef123456'),fetches=0;
 const locals={document:doc,window:win,navigator:{onLine:true,serviceWorker:{register:register||(()=>Promise.resolve(registration))}},fetch:async()=>{fetches++;return{ok:true,json:async()=>published};},location:{assign:url=>navigations.push(url)},sessionStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)}};
 for(const [key,value]of Object.entries(locals))Object.defineProperty(globalThis,key,{configurable:true,writable:true,value});
 return{doc,win,registration,storage,navigations,setRelease:r=>published=r,fetches:()=>fetches,restore:()=>{for(const [key,descriptor]of originals)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}};
}
const settle=()=>new Promise(resolve=>setTimeout(resolve,0));
test('metadata changes keep the same update notice and focused decision control until explicit dismissal',async()=>{
 const e=environment(),updates=createAppUpdates({beforeUpdate:async()=>{},onError:()=>{}});
 try{await updates.start();await updates.check();const notice=e.doc.querySelector('#app-update-notice'),button=e.doc.querySelector('#load-app-update');assert.ok(notice);button.focus();e.setRelease(release('bbcdef123456'));await updates.check();assert.equal(e.doc.querySelector('#app-update-notice'),notice);assert.equal(e.doc.activeElement,button);assert.equal(notice.dataset.build,'bbcdef123456');e.setRelease(release('123456abcdef'));await updates.check();assert.equal(e.doc.querySelector('#app-update-notice'),notice);assert.deepEqual(e.navigations,[]);e.setRelease(release('bbcdef123456'));await updates.check();notice.querySelector('.secondary').onclick();assert.equal(e.doc.querySelector('#app-update-notice'),null);for(const name of ['focus','online'])e.win.dispatchEvent(new Event(name));const restored=new Event('pageshow');restored.persisted=true;e.win.dispatchEvent(restored);await settle();assert.equal(e.doc.querySelector('#app-update-notice'),null);assert.deepEqual(e.navigations,[]);}finally{updates.stop();e.restore();}
});
test('only explicit install action issues a one-use tab intent after successful save',async()=>{
 const e=environment();let saves=0;const updates=createAppUpdates({beforeUpdate:async()=>{saves++;},onError:()=>{}});
 try{await updates.start();await updates.check();assert.equal(e.storage.size,0);assert.deepEqual(e.navigations,[]);await updates.loadLatest({install:true});assert.equal(saves,1);assert.equal(e.navigations.length,1);const url=new URL(e.navigations[0]),token=url.searchParams.get('intent'),saved=JSON.parse(e.storage.get('gymbro-update-intent:'+e.doc.baseURI));assert.match(token,/^[0-9a-f-]{36}$/);assert.equal(saved.token,token);assert.equal(saved.environment,'preview');assert.ok(Math.abs(Date.now()-saved.at)<1000);}finally{updates.stop();e.restore();}
});
test('viewing update details carries no install intent and a failed save prevents navigation',async()=>{
 const e=environment(),errors=[];let fail=false;const updates=createAppUpdates({beforeUpdate:async()=>{if(fail)throw Error('Synthetic unsaved workout');},onError:message=>errors.push(message)});
 try{await updates.start();await updates.check();fail=true;await updates.loadLatest({install:true});assert.deepEqual(e.navigations,[]);assert.equal(e.storage.size,0);assert.match(errors[0],/unsaved workout/);fail=false;await updates.loadLatest();assert.equal(new URL(e.navigations[0]).searchParams.has('intent'),false);}finally{updates.stop();e.restore();}
});
test('stopping during asynchronous worker registration cannot restart polling or navigation listeners',async()=>{
 let finish;const pending=new Promise(resolve=>finish=resolve),e=environment({register:()=>pending}),updates=createAppUpdates({beforeUpdate:async()=>{},onError:()=>{}});
 try{const start=updates.start();updates.stop();finish(e.registration);await start;for(const type of ['focus','online'])e.win.dispatchEvent(new Event(type));await settle();assert.equal(e.fetches(),0);assert.deepEqual(e.navigations,[]);}finally{updates.stop();e.restore();}
});
test('tab consent does not fall back to a replayable flag when storage is unavailable',()=>{assert.throws(()=>issueUpdateIntent('https://example.test/','production',{setItem(){throw Error('Storage blocked');}}),/Storage blocked/);});
