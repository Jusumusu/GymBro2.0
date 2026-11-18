import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
import {EXERCISES,LEGACY_BUILTIN_IDS,findExercise,library} from '../src/exercises.js';
import {ALL_EXPANDED_EXERCISES,PREPARED_SPECIAL_EXERCISES} from '../src/exercise-catalog.js';
import {CONTRIBUTION_MUSCLES,validateContributions,discoverableMuscles} from '../src/muscle-contributions.js';
import {EQUIPMENT} from '../src/exercise-equipment.js';
import {exerciseIndex,browseExercises} from '../src/exercise-browser.js';
const baseline=JSON.parse(await readFile('docs/workout-polish/catalog-baseline.json','utf8')).exercises;
assert.deepEqual(EXERCISES.slice(0,43),baseline,'Every released definition, ID, order and contribution row must remain identical');
assert.equal(LEGACY_BUILTIN_IDS.length,40);
const all=[...baseline,...ALL_EXPANDED_EXERCISES],ids=new Set(),names=new Set(),primary={},equipment={},patterns={},categories={};
for(const e of all){
 assert.match(e.id,/^[a-z][a-z0-9-]*$/);assert.ok(!ids.has(e.id),'Duplicate ID '+e.id);ids.add(e.id);
 const name=e.name.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'');assert.ok(!names.has(name),'Duplicate name '+e.name);names.add(name);
 assert.ok(CONTRIBUTION_MUSCLES.includes(e.muscle));assert.ok(Object.hasOwn(EQUIPMENT,e.equipment));validateContributions(e.contributions);
 assert.ok(e.contributions.some(r=>r.role==='primary'&&r.muscle===e.muscle));
 if(e.id.startsWith('gb-')){assert.ok(e.category&&['reps','duration'].includes(e.trackingType));assert.ok(Array.isArray(e.aliases)&&e.aliases.every(a=>typeof a==='string'&&a.length>0));assert.ok(e.pattern&&e.cues.length>35&&e.loadKind&&e.primaryMuscles.length);assert.deepEqual(e.secondary,e.contributions.filter(r=>r.role==='secondary').map(r=>r.muscle));}
 primary[e.muscle]=(primary[e.muscle]||0)+1;equipment[e.equipment]=(equipment[e.equipment]||0)+1;patterns[e.pattern]=(patterns[e.pattern]||0)+1;categories[e.category||'Legacy strength']=(categories[e.category||'Legacy strength']||0)+1;
}
for(const muscle of CONTRIBUTION_MUSCLES)assert.ok(primary[muscle]>0,'No direct-primary coverage for '+muscle);
const activeIndex=exerciseIndex(EXERCISES);const start=performance.now();let searches=0;
for(let round=0;round<100;round++)for(const [query,id]of [['bulgarian','gb-bulgarian-split-squat'],['cgbp','gb-close-grip-bench'],['bayesian','gb-bayesian-curl'],['hex bar','gb-trap-deadlift'],['pec deck','gb-pec-deck'],['chinup','gb-chin-up']]){assert.ok(browseExercises(activeIndex,{query}).some(e=>e.id===id));searches++;}
const searchMs=performance.now()-start;
for(const type of new Set(EXERCISES.map(e=>e.equipment)))assert.ok(browseExercises(activeIndex,{equipment:type}).length);
for(const muscle of CONTRIBUTION_MUSCLES)assert.ok(browseExercises(activeIndex,{category:muscle}).length);
const custom={...EXERCISES[0],id:'gb-hack-squat',name:'My existing hack squat'},state={customExercises:[custom]};assert.equal(findExercise(state,custom.id),custom);assert.equal(library(state).filter(e=>e.id===custom.id).length,1);
const result={baseline:43,available:EXERCISES.length,addedAvailable:EXERCISES.length-43,preparedSpecial:PREPARED_SPECIAL_EXERCISES.length,preparedTotal:all.length,availableCoverage:{primary:Object.fromEntries(CONTRIBUTION_MUSCLES.map(m=>[m,EXERCISES.filter(e=>e.muscle===m).length])),equipment:Object.fromEntries([...new Set(EXERCISES.map(e=>e.equipment))].map(type=>[type,EXERCISES.filter(e=>e.equipment===type).length]))},preparedCoverage:{primary,equipment,patterns,categories},duplicates:0,invalidMappings:0,legacyDefinitionsUnchanged:43,protectedLegacyIds:40,search:{runs:searches,totalMs:Number(searchMs.toFixed(2)),averageMs:Number((searchMs/searches).toFixed(4)),scope:'Node, local observation; not a phone benchmark'},pendingTracking:PREPARED_SPECIAL_EXERCISES.map(e=>({id:e.id,name:e.name,trackingType:e.trackingType,loadKind:e.loadKind})),limits:['Ordinal roles are coaching estimates, not measured activation or growth percentages.','Timed holds/carries, assistance load and band setup entries are prepared but excluded from the current reps/load logger until their tracking integration.','Olympic lifts, distance/cardio tracking and mobility routines are not added to this strength logger.','Generic legacy entries are retained alongside explicit equipment/setup variations; no history is remapped.']};
await writeFile('docs/workout-polish/review/catalog.json',JSON.stringify(EXERCISES)+'\n');
await mkdir('artifacts/workout-polish/catalog',{recursive:true});await writeFile('docs/workout-polish/catalog-coverage.json',JSON.stringify(result,null,2)+'\n');await writeFile('artifacts/workout-polish/catalog/validation.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({available:result.available,added:result.addedAvailable,preparedSpecial:result.preparedSpecial,preparedTotal:result.preparedTotal,duplicates:0,legacyDefinitionsUnchanged:43,search:result.search}));
