import {test} from 'node:test';
import assert from 'node:assert/strict';
import {workoutProgress,reconcileWorkoutRest} from '../src/workout-progress.js';
import {swipeDirection} from '../src/workout-navigation.js';
import {createWorkoutWakeLock} from '../src/workout-wake-lock.js';
import {createRestSignalTracker,createRestAlerts} from '../src/rest-alerts.js';
import {startRest,pauseRest,resumeRest,resetRest} from '../src/focus-timer.js';
import {createAdvancedController} from '../src/advanced-controller.js';
import {refinementFixture} from './fixtures/refinement.mjs';
import {makeDraft} from '../src/planner.js';
const row=(done=false,extra={})=>({type:'working',done,...extra});
const draft=entries=>({exercises:[{entries}]});
test('long workouts never round progress to 100 while required work remains',()=>{
 const w={exercises:Array.from({length:10},()=>({entries:Array.from({length:30},()=>row(true))}))};w.exercises.at(-1).entries.at(-1).done=false;assert.equal(workoutProgress(w).percent,99);assert.equal(workoutProgress(w).complete,false);w.exercises.at(-1).entries.at(-1).done=true;assert.equal(workoutProgress(w).percent,100);assert.equal(workoutProgress(w).complete,true);
});
test('one required-work measure excludes warm-ups and opted-out work without inflating completion',()=>{
 const w=draft([row(true),row(false),row(true,{type:'warmup'}),row(false,{skipped:true}),row(false,{deferred:true}),row(false,{optional:true})]);
 assert.deepEqual(workoutProgress(w),{total:2,completed:1,remaining:1,percent:50,complete:false});w.exercises[0].entries[1].done=true;assert.equal(workoutProgress(w).complete,true);w.exercises[0].entries.push(row());assert.equal(workoutProgress(w).percent,67);w.exercises[0].entries[0].done=false;assert.equal(workoutProgress(w).remaining,2);assert.equal(workoutProgress(null).complete,false);
});
test('finishing, skipping or shortening required work reconciles rest without erasing manual later rest',()=>{
 const before=draft([row()]),after=draft([row(true)]);after.restTimer=startRest(60,0);reconcileWorkoutRest(before,after);assert.equal(after.restTimer,undefined);
 after.restTimer=startRest(60,0);reconcileWorkoutRest(after,after);assert.ok(after.restTimer);const skipped=draft([row(false,{skipped:true})]);skipped.restTimer=startRest(60,0);reconcileWorkoutRest(before,skipped);assert.equal(skipped.restTimer,undefined);
});
test('automatic rest checks the entire workout, including out-of-order and superset work',async()=>{
 const s=refinementFixture('2026-11-22');s.profile.timer=true;s.draft=makeDraft(s.plans[0],'2026-11-22');for(const e of s.draft.exercises)for(const set of e.entries)Object.assign(set,{kg:20,reps:8,done:true});const last=s.draft.exercises[0],set=last.entries[0];let writes=0;const c=createAdvancedController({getState:()=>s,commit:fn=>{writes++;fn(s);return Promise.resolve();}});
 await c.onCompleted(last.id,set.id);assert.equal(writes,0);s.draft.exercises.at(-1).entries.at(-1).done=false;await c.onCompleted(last.id,set.id);assert.equal(writes,1);assert.ok(s.draft.restTimer);
});
test('swipe recognition rejects vertical, accidental, slow and small drags',()=>{
 for(const sample of [{dx:30,dy:2},{dx:100,dy:80},{dx:90,dy:0,elapsed:1000}])assert.equal(swipeDirection(sample),0);assert.equal(swipeDirection({dx:-100,dy:15}),1);assert.equal(swipeDirection({dx:100,dy:15}),-1);
});
test('countdown emits exactly 5,4,3,2,1 and one distinct completion from deadlines',()=>{
 const tracker=createRestSignalTracker(),t=startRest(7,0),events=[];for(let now=0;now<=9000;now+=100)events.push(...tracker.sample(t,{now}));assert.deepEqual(events,[5,4,3,2,1].map(second=>({type:'countdown',second})).concat({type:'complete'}));
});
test('pause/resume keeps prior seconds deduplicated; reset is a new audible sequence',()=>{
 const tracker=createRestSignalTracker(),t=startRest(5,0);assert.equal(tracker.sample(t,{now:0})[0].second,5);tracker.sample(t,{now:1000});tracker.sample(t,{now:2000});const paused=pauseRest(t,2200);assert.deepEqual(tracker.sample(paused,{now:9000}),[]);const resumed=resumeRest(paused,10000);assert.deepEqual(tracker.sample(resumed,{now:10000}),[]);assert.equal(tracker.sample(resumed,{now:11000})[0].second,2);assert.equal(tracker.sample(resetRest(resumed,5,12000),{now:12000})[0].second,5);
});
test('background expiry, old restored expiry and skipped seconds never replay a sound backlog',()=>{
 const tracker=createRestSignalTracker(),t=startRest(10,0);tracker.sample(t,{now:0});assert.deepEqual(tracker.sample(t,{now:8000}),[{type:'countdown',second:2}]);tracker.sample(t,{now:8500,visible:false});assert.deepEqual(tracker.sample(t,{now:12000}),[]);assert.deepEqual(createRestSignalTracker().sample(t,{now:12000}),[]);tracker.sample(null,{now:13000});assert.deepEqual(tracker.sample(t,{now:13000}),[]);
});
function wakeHarness(request){const doc=new EventTarget();doc.visibilityState='visible';const s={profile:{keepScreenAwake:true},draft:draft([row()])},statuses=[];let calls=0;const nav={wakeLock:{request:async()=>{calls++;return request();}}},c=createWorkoutWakeLock({getState:()=>s,navigator:nav,document:doc,secure:true,onStatus:x=>statuses.push(x)});return {doc,s,c,statuses,calls:()=>calls};}
function lock(){const value=new EventTarget();value.released=false;value.release=async()=>{value.released=true;value.dispatchEvent(new Event('release'));};return value;}
test('one wake lock follows preference, visibility, completion and cancellation',async()=>{
 const locks=[],h=wakeHarness(()=>{const l=lock();locks.push(l);return l;});await Promise.all([h.c.sync(),h.c.sync()]);assert.equal(h.calls(),1);assert.equal(h.c.getStatus(),'active');h.doc.visibilityState='hidden';await h.c.sync();assert.ok(locks[0].released);h.doc.visibilityState='visible';await h.c.sync({retry:true});assert.equal(h.calls(),2);h.s.profile.keepScreenAwake=false;await h.c.sync();assert.ok(locks[1].released);h.s.profile.keepScreenAwake=true;await h.c.sync();h.s.draft.exercises[0].entries[0].done=true;await h.c.sync();assert.ok(locks[2].released);h.s.draft=null;await h.c.sync();h.c.stop();
});
test('late wake-lock responses are released after the workout ends',async()=>{
 let resolve;const promise=new Promise(r=>resolve=r),h=wakeHarness(()=>promise);const pending=h.c.sync();h.s.draft=null;await h.c.sync();const l=lock();resolve(l);await pending;assert.equal(l.released,true);assert.notEqual(h.c.getStatus(),'active');h.c.stop();
});
test('wake-lock refusal is quiet and bounded until a visibility or interaction retry',async()=>{
 const h=wakeHarness(()=>{throw Error('Power saving');});await h.c.sync();await h.c.sync();assert.equal(h.calls(),1);assert.equal(h.c.getStatus(),'unavailable');await h.c.sync({retry:true});assert.equal(h.calls(),2);h.c.stop();
});
test('unsupported wake lock does not request access or touch workout data',async()=>{
 const s={profile:{keepScreenAwake:true},draft:draft([row()])},before=structuredClone(s),doc=new EventTarget();doc.visibilityState='visible';const c=createWorkoutWakeLock({getState:()=>s,navigator:{},document:doc,secure:true});await c.sync();assert.equal(c.getStatus(),'unsupported');assert.deepEqual(s,before);c.stop();
});
test('rest audio is opt-in, initializes on gesture and cancels active voices on pause',()=>{
 const doc=new EventTarget();doc.visibilityState='visible';let contexts=0,tones=0,stops=0;class Audio{constructor(){contexts++;this.state='running';this.currentTime=0;this.destination={};}createOscillator(){return{frequency:{setValueAtTime(){}},connect(){},disconnect(){},start(){tones++;},stop(){stops++;}};}createGain(){return{gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}close(){return Promise.resolve();}}
 const s={profile:{},draft:{id:'draft',restTimer:startRest(5,0)}};const c=createRestAlerts({getState:()=>s,window:{AudioContext:Audio},document:doc,navigator:{}});c.arm();c.tick(0);assert.equal(contexts,0);s.profile.restCountdownSound=true;c.arm();c.tick(1000);assert.equal(contexts,1);assert.equal(tones,1);s.draft.restTimer=pauseRest(s.draft.restTimer,1100);c.tick(1200);assert.ok(stops>=2);c.stop();
});
