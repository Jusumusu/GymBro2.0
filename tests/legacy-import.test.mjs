import {test} from 'node:test';
import assert from 'node:assert/strict';
import {prepareLegacyImport} from '../src/legacy-import.js';
import {initialState,validateState} from '../src/model.js';
import {summary} from '../src/analytics.js';

// Synthetic fixtures only: no personal export is stored in this repository.
import {legacyFixture as fixture} from './fixtures/legacy-v3.mjs';

test('legacy import preserves real dates, loads, reps and original prescriptions',async()=>{
 const old=fixture(),snapshot=JSON.stringify(old);const {state,report}=await prepareLegacyImport(old);
 validateState(state);assert.equal(state.sessions[0].date,'2024-02-01');assert.equal(state.sessions[0].exercises[0].entries[0].kg,22.5);assert.equal(state.sessions[0].exercises[0].entries[1].reps,7);assert.equal(state.sessions[0].exercises[1].min,10);assert.equal(report.addedWorkouts,1);assert.equal(report.addedSets,6);assert.equal(summary(state.sessions).reps,59);assert.equal(JSON.stringify(old),snapshot);
});
test('legacy exercise IDs do not mix leg/dumbbell curls or cable/barbell rows',async()=>{
 const {state}=await prepareLegacyImport(fixture());const [bench,leg,row]=state.sessions[0].exercises;
 assert.equal(bench.exerciseId,'bench');assert.notEqual(leg.exerciseId,'curl');assert.notEqual(leg.exerciseId,'curl-leg');assert.equal(row.exerciseId,'cable-row');assert.equal(state.customExercises.length,3);
});
test('legacy warmup flags never mark all working sets as warmups; missing time and RIR stay unknown',async()=>{
 const {state}=await prepareLegacyImport(fixture());const w=state.sessions[0];assert.equal(w.importMetadata.sourceWarmupFlag,true);assert.equal(w.startedAt,0);assert.equal(w.finishedAt,0);assert.equal(w.importMetadata.durationKnown,false);assert.ok(w.exercises.every(e=>e.entries.every(s=>s.type==='working'&&s.rir===null&&s.done)));
});
test('legacy merge preserves current history, profile, active draft, photos and measurements',async()=>{
 const first=await prepareLegacyImport(fixture());const current=first.state;current.profile.name='Existing profile';current.profile.unit='lb';current.profile.goal='strength';current.profile.targetWeight=90;
 current.measurements=[{date:'2024-02-01',name:'Waist',cm:88}];current.photos=[{id:'local-photo',date:'2024-02-01',view:'front'}];current.draft={...structuredClone(current.sessions[0]),id:'active-draft'};delete current.draft.finishedAt;
 const snapshot=JSON.stringify(current);const next=fixture();next.sessions[0].date='2024-02-03';
 const merged=await prepareLegacyImport(next,current);assert.equal(merged.state.sessions.length,2);assert.deepEqual(merged.state.profile,current.profile);assert.deepEqual(merged.state.draft,current.draft);assert.deepEqual(merged.state.photos,current.photos);assert.deepEqual(merged.state.measurements,current.measurements);assert.equal(JSON.stringify(current),snapshot);assert.deepEqual(merged.photos,[]);
});
test('reimport and repeated source rows never duplicate workouts, programs, exercises, weights, receipts or unlocks',async()=>{
 const src=fixture();src.sessions.push(structuredClone(src.sessions[0]));const first=await prepareLegacyImport(src);assert.equal(first.report.addedWorkouts,1);assert.equal(first.report.skippedWorkouts,1);
 const second=await prepareLegacyImport(src,first.state);assert.equal(second.report.addedWorkouts,0);assert.equal(second.report.skippedWorkouts,2);assert.deepEqual(second.state,first.state);assert.equal(new Set(second.state.unlocks).size,second.state.unlocks.length);
});
test('exercise and item reordering does not duplicate the same workout',async()=>{
 const src=fixture(),first=await prepareLegacyImport(src);src.sessions[0].items=Object.fromEntries(Object.entries(src.sessions[0].items).reverse());const next=await prepareLegacyImport(src,first.state);assert.equal(next.report.addedWorkouts,0);assert.equal(next.state.sessions.length,1);
});
test('two same-date workouts with different performance are retained',async()=>{
 const src=fixture();const w=structuredClone(src.sessions[0]);w.items.bench[0].weight=25;src.sessions.push(w);const result=await prepareLegacyImport(src);assert.equal(result.report.addedWorkouts,2);assert.equal(result.state.sessions.length,2);
});
test('same-date weigh-in conflicts keep current data and are disclosed',async()=>{
 const first=await prepareLegacyImport(fixture());first.state.weights[0].kg=84;const next=await prepareLegacyImport(fixture(),first.state);assert.equal(next.state.weights[0].kg,84);assert.equal(next.report.weightConflicts,1);assert.equal(next.report.addedWeights,0);
});
test('body target imports only when the current target is unset',async()=>{
 const first=await prepareLegacyImport(fixture());assert.equal(first.state.profile.targetWeight,83);first.state.profile.targetWeight=90;const next=await prepareLegacyImport(fixture(),first.state);assert.equal(next.state.profile.targetWeight,90);
});
test('zero-rep source placeholders remain incomplete and do not become performance',async()=>{
 const src=fixture();src.sessions[0].items.bench[1].reps=0;const result=await prepareLegacyImport(src);assert.equal(result.state.sessions[0].exercises[0].entries[1].done,false);assert.equal(result.report.addedSets,5);
});
test('unsupported formats and unit declarations are rejected',async()=>{
 await assert.rejects(()=>prepareLegacyImport({...fixture(),version:4}),/version/);await assert.rejects(()=>prepareLegacyImport({...fixture(),unit:'lb'}),/kilogram/);
});
test('unsupported media and saved-plan formats fail without a partial import',async()=>{
 const current=initialState();const snapshot=JSON.stringify(current);const src=fixture();src.photos_v23=[{id:'unsupported'}];await assert.rejects(()=>prepareLegacyImport(src,current),/photos/);assert.equal(JSON.stringify(current),snapshot);src.photos_v23=[];src.plans_v17={arbitrary:'shape'};await assert.rejects(()=>prepareLegacyImport(src,current),/saved plans/);
});
test('unmapped movements, invalid sets and invalid dates are rejected',async()=>{
 let src=fixture();src.sessions[0].planSnapshot[0].name='Unrecognized machine';await assert.rejects(()=>prepareLegacyImport(src),/safely map/);
 src=fixture();src.sessions[0].items.bench[0].weight=NaN;await assert.rejects(()=>prepareLegacyImport(src),/invalid load/);
 src=fixture();src.sessions[0].date='2024-02-31';await assert.rejects(()=>prepareLegacyImport(src),/invalid date/);
 src=fixture();src.sessions[0].items.bench[0].rir=2;await assert.rejects(()=>prepareLegacyImport(src),/additional fields/);
});
test('exercise collisions and contradictory source weigh-ins are rejected',async()=>{
 const first=await prepareLegacyImport(fixture());first.state.customExercises[0].name='Changed exercise identity';await assert.rejects(()=>prepareLegacyImport(fixture(),first.state),/conflicts/);
 const src=fixture();src.metrics_v11.body.push({date:'2024-02-02',weight:86});await assert.rejects(()=>prepareLegacyImport(src),/conflicting weigh-ins/);
});
