import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lensMap} from '../src/liquid-glass.js';
const pixel=(map,w,x,y)=>[...map.slice((y*w+x)*4,(y*w+x)*4+4)];
test('optical map leaves the center neutral and bends only the rounded perimeter',()=>{const w=120,h=60,map=lensMap(w,h,20);assert.deepEqual(pixel(map,w,60,30),[128,128,128,255]);assert.ok(pixel(map,w,1,30)[0]<128);assert.ok(pixel(map,w,118,30)[0]>128);assert.ok(pixel(map,w,60,1)[1]<128);assert.deepEqual(pixel(map,w,0,0),[128,128,128,255]);});
test('lens field is symmetric, bounded, opaque and finite for short or square controls',()=>{for(const [w,h,r]of [[40,40,20],[320,60,23],[1,1,0]]){const map=lensMap(w,h,r);assert.equal(map.length,w*h*4);for(let i=0;i<map.length;i+=4){assert.ok(map[i]>=8&&map[i]<=248);assert.ok(map[i+1]>=8&&map[i+1]<=248);assert.equal(map[i+3],255);}if(w>1)assert.equal(pixel(map,w,1,Math.floor(h/2))[0]+pixel(map,w,w-2,Math.floor(h/2))[0],256);}});
test('invalid or unbounded lens allocations are rejected before rasterization',()=>{for(const args of [[0,40,20],[20000,10000,20],[40,40,NaN],[40,-1,10]])assert.throws(()=>lensMap(...args),/Invalid glass bounds/);});
