import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {inflateSync} from 'node:zlib';
import {runInNewContext} from 'node:vm';
const read=name=>readFileSync(new URL('../'+name,import.meta.url));
test('Aperture artwork matches the approved D paths and leaves original app identity scopes stable',()=>{
 for(const theme of ['light','dark']){const svg=read(`public/aperture-${theme}.svg`).toString(),approved=read(`docs/mobile-polish/review/logos/d-${theme}.svg`).toString();const paths=s=>[...s.matchAll(/<path\s[^>]*d="([^"]+)"/g)].map(m=>m[1]);assert.deepEqual(paths(svg),paths(approved));assert.match(svg,/viewBox="0 0 96 96"/);}
 for(const name of ['manifest.webmanifest','manifest-light.webmanifest']){const m=JSON.parse(read('public/'+name));assert.equal(m.id,'./');assert.equal(m.scope,'./');assert.equal(m.start_url,'./');assert.equal(m.name,'Gym Bro — Training journal');assert.equal(m.short_name,'Gym Bro');}
});
test('Both themed PWA icon sets have exact sizes and transparent safe margins with valid PNG data',()=>{
 for(const theme of ['light','dark'])for(const size of [192,512]){const png=read(`public/aperture-${theme}-${size}.png`);assert.equal(png.subarray(1,4).toString(),'PNG');assert.equal(png.readUInt32BE(16),size);assert.equal(png.readUInt32BE(20),size);assert.equal(png[25],6);const chunks=[];for(let i=8;i<png.length;){const length=png.readUInt32BE(i);if(png.toString('ascii',i+4,i+8)==='IDAT')chunks.push(png.subarray(i+8,i+8+length));i+=length+12;}const raw=inflateSync(Buffer.concat(chunks));assert.equal(raw[4],0,'transparent corner');assert.ok(chunks.reduce((n,c)=>n+c.length,0)>1000);}
 for(const size of [192,512])assert.deepEqual(read(`public/icon-${size}.png`),read(`public/aperture-dark-${size}.png`));assert.deepEqual(read('public/icon.svg'),read('public/aperture-light.svg'));
});
test('Theme changes update displayed branding, favicon, touch icon and manifest without changing journal storage',()=>{
 const root={dataset:{}},callbacks=[],media={matches:false,addEventListener:(name,fn)=>callbacks.push(fn)},values=new Map(),images=[{setAttribute:(key,value)=>values.set('image:'+key,value)}];
 const document={documentElement:root,querySelector:selector=>({setAttribute:(key,value)=>values.set(selector+':'+key,value)}),querySelectorAll:()=>images};
 const window={matchMedia:()=>media,requestAnimationFrame:fn=>fn()},stored=new Map();runInNewContext(read('src/appearance-init.js').toString(),{document,window,location:{pathname:'/preview/'},localStorage:{getItem:()=>null,setItem:(key,value)=>stored.set(key,value)}});
 window.GymBroAppearance.apply('light');assert.equal(values.get('image:src'),'./aperture-light.svg');assert.equal(values.get('link[rel=manifest]:href'),'./manifest-light.webmanifest');assert.equal(values.get('link[rel=icon]:href'),'./aperture-light.svg');assert.equal(values.get('link[rel=apple-touch-icon]:href'),'./aperture-light-192.png');window.GymBroAppearance.apply('system');media.matches=true;callbacks[0]();assert.equal(values.get('image:src'),'./aperture-dark.svg');assert.equal(values.get('link[rel=manifest]:href'),'./manifest.webmanifest');assert.ok([...stored.keys()].every(k=>k==='gymbro-appearance-preview'));
});
