import {test} from 'node:test';
import assert from 'node:assert/strict';
import {startRest,remainingRest,remainingMilliseconds,pauseRest,resumeRest,resetRest,adjustRest,restPhase} from '../src/focus-timer.js';
import {createRestClock} from '../src/rest-clock.js';
import {validateAdvancedSession} from '../src/advanced-data.js';
test('pause preserves milliseconds, resume ignores time spent paused, reset uses original duration',()=>{
 const t=startRest(90,1000),p=pauseRest(t,2345);assert.equal(p.pausedRemainingMs,88655);assert.equal(remainingRest(p,900000),89);assert.equal(restPhase(p,900000),'paused');
 const r=resumeRest(JSON.parse(JSON.stringify(p)),900000);assert.equal(remainingMilliseconds(r,900001),88654);assert.equal(r.pausedRemainingMs,undefined);assert.equal(resetRest(r,15,1e6).endsAt,1090000);
 assert.equal(remainingRest(adjustRest(p,-15,900000),1e7),74);assert.equal(adjustRest(p,15,900000).durationSeconds,90);
});
test('expired, absent and legacy deadlines remain safe across restore and navigation',()=>{
 const t={version:1,endsAt:91000};assert.equal(remainingRest(t,61000),30);assert.equal(remainingRest(t,900000),0);assert.equal(restPhase(t,900000),'complete');assert.equal(pauseRest(t,900000),t);assert.equal(resetRest(t,120,900000).durationSeconds,120);assert.equal(restPhase(null),'idle');assert.equal(remainingRest(null),0);
 assert.throws(()=>startRest(0));assert.throws(()=>startRest(3601));assert.throws(()=>adjustRest(null,15));assert.throws(()=>startRest(60,NaN));
});
test('timer metadata is backward compatible and malformed paused states are rejected atomically',()=>{
 for(const t of [{version:1,endsAt:1000},startRest(90,0),pauseRest(startRest(90,0),1000)])assert.doesNotThrow(()=>validateAdvancedSession({restTimer:t}));
 for(const change of [{pausedRemainingMs:NaN},{pausedRemainingMs:-1},{pausedRemainingMs:3600001},{durationSeconds:0},{durationSeconds:1.5}])assert.throws(()=>validateAdvancedSession({restTimer:{...startRest(90,0),...change}}));
});
test('lifecycle repainting is immediate, idempotent and owns exactly one interval',()=>{
 const win=new EventTarget(),doc=new EventTarget();doc.visibilityState='visible';let next=0,painted=0;const live=new Map();
 const clock=createRestClock({window:win,document:doc,paint:()=>painted++,setInterval:fn=>{const id=++next;live.set(id,fn);return id;},clearInterval:id=>live.delete(id)});
 clock.start();clock.start();assert.equal(live.size,1);assert.equal(painted,2);win.dispatchEvent(new Event('pagehide'));assert.equal(live.size,0);
 win.dispatchEvent(new Event('pageshow'));assert.equal(live.size,1);doc.visibilityState='hidden';doc.dispatchEvent(new Event('visibilitychange'));assert.equal(live.size,0);
 doc.visibilityState='visible';doc.dispatchEvent(new Event('visibilitychange'));assert.equal(live.size,1);win.dispatchEvent(new Event('focus'));assert.equal(live.size,1);
 clock.stop();assert.equal(live.size,0);const before=painted;win.dispatchEvent(new Event('pageshow'));assert.equal(painted,before);
});
