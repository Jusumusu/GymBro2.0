import test from 'node:test';
import assert from 'node:assert/strict';
import {ANATOMY,ANATOMY_BOUNDS,BODY_OUTLINE,HEAD_OUTLINE} from '../src/anatomy.js';
import {regionsFor} from '../docs/mobile-polish/muscle-map/anatomy-review.js';
import {MUSCLES} from '../src/exercises.js';
import {muscleMapView} from '../src/muscle-map.js';
import {muscleSets} from '../src/analytics.js';
import {today} from '../src/model.js';
import {refinementFixture} from './fixtures/refinement.mjs';

test('integrated atlas uses the approved C paths and retains all canonical muscle identities',()=>{
 assert.deepEqual(ANATOMY_BOUNDS,{width:320,height:680,mirror:320});assert.ok(BODY_OUTLINE.startsWith('M145 101'));assert.ok(HEAD_OUTLINE.startsWith('M133 54'));
 for(const side of ['front','back'])assert.deepEqual(ANATOMY[side],regionsFor('C',side).map(r=>({id:r.id,muscle:r.muscle,path:r.d,label:r.label,...(r.mirror?{mirror:true}:{})})));
 assert.deepEqual([...new Set(Object.values(ANATOMY).flat().map(r=>r.muscle))].sort(),[...MUSCLES].sort());
 for(const part of ['upper','middle','lower'])assert.ok(ANATOMY.back.filter(r=>r.id.startsWith(part+'-trapezius')).every(r=>r.muscle==='Back'));
});
test('empty atlas keeps neutral fill levels distinct from the selected outline and does not mutate the journal',()=>{
 const s=refinementFixture(today());s.sessions=[];const before=structuredClone(s);const neutral=muscleMapView(s),selected=muscleMapView(s,'Chest','front');
 assert.equal((neutral.match(/class="muscle-region selected"/g)||[]).length,0);assert.equal((selected.match(/class="muscle-region selected"/g)||[]).length,2);assert.equal((selected.match(/data-level="none"/g)||[]).length,ANATOMY.front.length+1);assert.ok(selected.includes('No relevant working sets recorded yet.'));assert.deepEqual(s,before);
});
test('atlas renders actual direct, secondary and stabilizing totals for Back rather than regional trap estimates',()=>{
 const s=refinementFixture(today()),counts=muscleSets(s,today()).Back,html=muscleMapView(s,'Back','back'),n=value=>new Intl.NumberFormat(undefined,{maximumFractionDigits:2}).format(value||0);
 for(const [label,key]of [['Direct working sets','direct'],['Estimated secondary','indirect'],['Estimated stabilizing','stabilizing']])assert.ok(html.includes(`<dt>${label}</dt><dd>${n(counts[key])}</dd>`));
 assert.ok(html.includes('Upper, middle and lower trapezius'));assert.ok(html.includes('Separate historical totals are not inferred'));assert.ok(html.includes('Barbell row'));assert.ok(html.includes('Weekly trend & contribution details'));
 assert.ok(!html.includes('data-muscle="Traps"'));assert.ok(html.includes('transform="translate(320 0) scale(-1 1)"'));
});
test('invalid selection and view stay safe and recent custom exercise names remain escaped',()=>{
 const s=refinementFixture(today());s.customExercises.push({id:'custom-atlas',name:'<img src=x onerror=alert(1)>',muscle:'Back',secondary:[]});s.sessions.at(-1).exercises[0].exerciseId='custom-atlas';
 const selected=muscleMapView(s,'Back','back');assert.ok(!selected.includes('<img src=x'));assert.ok(selected.includes('&lt;img src=x'));
 const invalid=muscleMapView(s,'<svg onload=alert(1)>','invalid');assert.ok(invalid.includes('data-side="front"'));assert.ok(!invalid.includes('<svg onload'));assert.ok(invalid.includes('No muscle is selected'));
});
