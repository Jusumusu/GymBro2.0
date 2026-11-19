import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {EXERCISES,library,findExercise,LEGACY_BUILTIN_IDS,substitutions} from '../src/exercises.js';
import {ALL_EXPANDED_EXERCISES,PREPARED_SPECIAL_EXERCISES} from '../src/exercise-catalog.js';
import {EQUIPMENT,equipmentAvailable,equipmentMatches} from '../src/exercise-equipment.js';
import {CONTRIBUTION_MUSCLES,validateContributions,discoverableMuscles} from '../src/muscle-contributions.js';
import {exerciseIndex,browseExercises,recordSelection,recentExercises} from '../src/exercise-browser.js';
import {initialState,validateState} from '../src/model.js';
import {migrateState} from '../src/extensions.js';
import {refinementFixture} from './fixtures/refinement.mjs';
import {makeDraft,generatePlans} from '../src/planner.js';
import {summary,muscleSets,strengthPoints,personalRecords} from '../src/analytics.js';
import {exportBackup,parseBackup} from '../src/backup.js';
const baseline=JSON.parse(readFileSync(new URL('../docs/workout-polish/catalog-baseline.json',import.meta.url),'utf8')).exercises;
const fixture=()=>refinementFixture('2026-11-18');
const program=id=>({id:'coverage',name:'Catalog exercise',exercises:[{exerciseId:id,sets:2,min:8,max:12}]});
test('43 released definitions and the original 40 protected IDs remain unchanged',()=>{assert.deepEqual(EXERCISES.slice(0,43),baseline);assert.equal(LEGACY_BUILTIN_IDS.length,40);assert.equal(EXERCISES.length,198);});
test('every available and prepared exercise has unique identities and valid centralized anatomy',()=>{
 const all=[...baseline,...ALL_EXPANDED_EXERCISES];assert.equal(all.length,219);assert.equal(new Set(all.map(e=>e.id)).size,219);assert.equal(new Set(all.map(e=>e.name.toLowerCase())).size,219);
 for(const e of all){assert.ok(Object.hasOwn(EQUIPMENT,e.equipment));validateContributions(e.contributions);assert.ok(e.contributions.some(c=>c.role==='primary'&&c.muscle===e.muscle));}
 for(const muscle of CONTRIBUTION_MUSCLES)assert.ok(EXERCISES.some(e=>e.muscle===muscle),'Direct-primary coverage '+muscle);
 assert.equal(PREPARED_SPECIAL_EXERCISES.length,21);for(const e of PREPARED_SPECIAL_EXERCISES)assert.ok(!EXERCISES.some(x=>x.id===e.id),'Unsupported tracking cannot enter the live reps/load logger');
});
test('machine families and new equipment preserve old preferences without opting into unrelated gear',()=>{
 assert.equal(equipmentMatches('smith','machine'),true);assert.equal(equipmentMatches('selectorized','machine'),true);assert.equal(equipmentMatches('cable','machine'),false);assert.equal(equipmentAvailable({equipment:'kettlebell'},['dumbbell']),false);
 const s=fixture();s.profile.equipment=['smith'];s.plans=generatePlans(s);validateState(s);assert.ok(s.plans.every(p=>p.exercises.every(e=>findExercise(s,e.exerciseId).equipment==='smith')));
 const prefs=structuredClone(s.profile.equipment);generatePlans(s);assert.deepEqual(s.profile.equipment,prefs);
});
test('new common names, equipment and broad body categories compose through the shared browser index',()=>{
 const index=exerciseIndex(EXERCISES);for(const [query,id]of [['bulgarian','gb-bulgarian-split-squat'],['cgbp','gb-close-grip-bench'],['hex bar','gb-trap-deadlift'],['bayesian','gb-bayesian-curl'],['chinup','gb-chin-up']])assert.ok(browseExercises(index,{query}).some(e=>e.id===id));
 assert.ok(!browseExercises(index,{query:'chinup'}).some(e=>e.id==='pullup'));assert.ok(!browseExercises(index,{category:'Core'}).some(e=>e.id==='gb-lumbar-extension'));assert.ok(browseExercises(index,{category:'Core training'}).some(e=>e.id==='gb-lumbar-extension'));assert.ok(browseExercises(index,{category:'Lower body'}).some(e=>e.id==='gb-kb-swing'));
 for(const category of ['Upper body','Lower body','Core training','Full body'])assert.ok(browseExercises(index,{category}).length,category);
 assert.ok(browseExercises(index,{equipment:'machine'}).some(e=>e.equipment==='smith'));assert.ok(browseExercises(index,{category:'Forearms',equipment:'ez-bar'}).some(e=>e.id==='gb-ez-reverse-curl'));
});
test('colliding custom ID and matching custom name remain separate, with old history unmodified',async()=>{
 const s=fixture(),source=EXERCISES.find(e=>e.id==='gb-hack-squat');s.customExercises=[{...source,id:source.id,name:'My existing custom squat'},{...source,id:'my-other-exercise',name:source.name}];s.plans.push(program(source.id));const before=structuredClone(s);validateState(s);
 assert.equal(findExercise(s,source.id).name,'My existing custom squat');assert.equal(library(s).filter(e=>e.id===source.id).length,1);assert.equal(library(s).filter(e=>e.name===source.name).length,1);
 const parsed=parseBackup(await exportBackup(s,{includePhotos:false}));assert.deepEqual(parsed.state.customExercises,s.customExercises);assert.deepEqual(parsed.state.sessions,s.sessions);assert.deepEqual(s,before);
});
test('new exercises log, persist and contribute real completed working sets to the canonical muscle map',()=>{
 const s=fixture();s.plans.push(program('gb-close-grip-bench'));s.draft=makeDraft(s.plans.at(-1),'2026-11-18');for(const set of s.draft.exercises[0].entries)Object.assign(set,{kg:50,reps:10,rir:2,done:true});s.sessions.push({...s.draft,finishedAt:s.draft.startedAt+60000});s.draft=null;validateState(s);
 const map=muscleSets(s,'2026-11-18');assert.ok(map.Triceps.direct>=2);assert.ok(map.Chest.indirect>=1.5);assert.equal(strengthPoints(s.sessions,'gb-close-grip-bench').length,1);
});
test('expansion does not change historical totals, estimates, records or journal bytes',()=>{
 const s=fixture(),before=JSON.stringify(s),metrics={summary:summary(s.sessions),points:strengthPoints(s.sessions,'bench'),records:personalRecords(s.sessions)};
 for(const e of EXERCISES)findExercise(s,e.id);const again={summary:summary(s.sessions),points:strengthPoints(s.sessions,'bench'),records:personalRecords(s.sessions)};assert.deepEqual(again,metrics);assert.equal(JSON.stringify(s),before);
});
test('favorites and recent selections retain new stable IDs through a full backup round trip',async()=>{
 const s=fixture(),id='gb-pec-deck';s.upgrade.exerciseBrowser.favorites.push(id);recordSelection(s,id,1e12);const restored=migrateState(parseBackup(await exportBackup(s,{includePhotos:false})).state);assert.ok(restored.upgrade.exerciseBrowser.favorites.includes(id));assert.equal(recentExercises(restored,library(restored)).some(e=>e.id===id),true);
});
