import {weekStart,weekStartsOn,addDays} from './calendar.js';
export {weekStart} from './calendar.js';
import { e1rm, working, exposures } from './engine.js';
import { findExercise } from './exercises.js';
export const sessionSets=w=>w.exercises.flatMap(e=>working(e));
export const volume=w=>sessionSets(w).reduce((sum,s)=>sum+s.kg*s.reps,0);
export function summary(sessions){const sets=sessions.flatMap(sessionSets);return {workouts:sessions.length,sets:sets.length,reps:sets.reduce((n,s)=>n+s.reps,0),volume:sets.reduce((n,s)=>n+s.kg*s.reps,0)};}
export function muscleSets(state,date){const start=weekStart(date,weekStartsOn(state));const end=new Date(start+'T12:00:00Z');end.setUTCDate(end.getUTCDate()+7);const until=end.toISOString().slice(0,10);const counts={};for(const w of state.sessions.filter(w=>w.date>=start&&w.date<until&&w.date<=date)){for(const x of w.exercises){const e=findExercise(state,x.exerciseId);if(!e)continue;const hard=working(x).filter(s=>s.rir===null||s.rir<=4).length;counts[e.muscle]??={direct:0,indirect:0};counts[e.muscle].direct+=hard;for(const m of e.secondary){counts[m]??={direct:0,indirect:0};counts[m].indirect+=hard*.5;}}}return counts;}
export function weightTrend(weights,date){const end=Date.parse(date+'T12:00:00Z');const entries=weights.filter(w=>{const age=(end-Date.parse(w.date+'T12:00:00Z'))/86400000;return age>=0&&age<7;});return {count:entries.length,average:entries.length?entries.reduce((s,w)=>s+w.kg,0)/entries.length:null};}
export function strengthPoints(sessions,id){return exposures(sessions,id).map(x=>({date:x.date,value:Math.max(...x.sets.map(s=>e1rm(s.kg,s.reps)??0))})).filter(x=>x.value>0);}
export function recordKinds(previous,current){if(!previous.length||!current.length)return [];const result=[];const oldLoad=Math.max(...previous.map(s=>s.kg)),newLoad=Math.max(...current.map(s=>s.kg));if(newLoad>oldLoad+.001)result.push('working load');if(current.some(s=>{const peers=previous.filter(p=>Math.abs(p.kg-s.kg)<.001);return peers.length&&s.reps>Math.max(...peers.map(p=>p.reps));}))result.push('reps at the same load');const oldEstimate=Math.max(0,...previous.map(s=>e1rm(s.kg,s.reps)??0)),newEstimate=Math.max(0,...current.map(s=>e1rm(s.kg,s.reps)??0));if(oldEstimate>0&&newEstimate>oldEstimate+.001)result.push('estimated strength');return result;}
// Incremental per-exercise peaks preserve matched-load tolerance without rescanning history.
export function createRecordTracker(){
 let seen=false,maxLoad=0,maxEstimate=0;const loads=new Map();
 return {observe(sets){
  if(!sets.length)return [];
  const kinds=[],newLoad=Math.max(...sets.map(s=>s.kg)),newEstimate=Math.max(0,...sets.map(s=>e1rm(s.kg,s.reps)??0));
  if(seen){
   if(newLoad>maxLoad+.001)kinds.push('working load');
   const repRecord=sets.some(s=>{const bucket=Math.round(s.kg*1000);let peak=-Infinity;for(let i=bucket-1;i<=bucket+1;i++)for(const [kg,reps]of loads.get(i)||[])if(Math.abs(kg-s.kg)<.001)peak=Math.max(peak,reps);return peak!==-Infinity&&s.reps>peak;});
   if(repRecord)kinds.push('reps at the same load');
   if(maxEstimate>0&&newEstimate>maxEstimate+.001)kinds.push('estimated strength');
  }
  for(const s of sets){const key=Math.round(s.kg*1000),bucket=loads.get(key)||new Map();bucket.set(s.kg,Math.max(bucket.get(s.kg)||0,s.reps));loads.set(key,bucket);}
  maxLoad=Math.max(maxLoad,newLoad);maxEstimate=Math.max(maxEstimate,newEstimate);seen=true;return kinds;
 }};
}
export function personalRecords(sessions){const history=new Map();let records=0;for(const w of [...sessions].sort((a,b)=>a.date.localeCompare(b.date)||a.startedAt-b.startedAt)){const groups=new Map();for(const e of w.exercises)groups.set(e.exerciseId,[...(groups.get(e.exerciseId)||[]),...working(e)]);for(const [id,sets]of groups){const tracker=history.get(id)||createRecordTracker();if(tracker.observe(sets).length)records++;history.set(id,tracker);}}return records;}
export const achievementCategories=[
 ['workouts','Workouts completed',[1,5,10,25,50,100,250]],['days','Training days',[1,5,10,25,50,100,200]],['weeks','Consistent weeks',[1,2,4,8,12,26,52]],['streak','Weeks in a row',[2,3,4,6,8,12]],['sets','Working sets',[10,50,100,250,500,1000,5000]],['reps','Repetitions',[50,100,500,1000,5000,10000,50000]],['prs','Personal records',[1,3,5,10,25,50,100]],['volume','Total kg × reps',[100,1000,5000,10000,50000,100000,1000000]],['variety','Exercise variety',[2,4,6,8,12,16,20]],['rir','Effort ratings',[5,10,25,50,100,250,500]],['body','Weigh-ins',[1,3,7,14,30,60]],['measure','Measurements',[1,5,10,20,50,100]],['photo','Progress photos',[1,3,6,12,24,52]],['plans','Saved plans',[1,2,3,5,8,12]]
]; // 93 deterministic milestones across 14 categories.
export function achievements(state){const total=summary(state.sessions);const days=new Set(state.sessions.map(w=>w.date));const weeks=new Map();for(const d of days){const key=weekStart(d,weekStartsOn(state));weeks.set(key,(weeks.get(key)||0)+1);}const consistent=[...weeks].filter(([,n])=>n>=state.profile.days).map(([d])=>d).sort();let streak=0,best=0,prior=null;for(const w of consistent){streak=prior&&addDays(prior,7)===w?streak+1:1;best=Math.max(best,streak);prior=w;}
 const values={...total,days:days.size,weeks:consistent.length,streak:best,prs:personalRecords(state.sessions),variety:new Set(state.sessions.flatMap(w=>w.exercises.filter(e=>working(e).length).map(e=>e.exerciseId))).size,rir:state.sessions.flatMap(sessionSets).filter(s=>s.rir!==null).length,body:state.weights.length,measure:state.measurements.length,photo:state.photos.length,plans:state.plans.length};
 return achievementCategories.flatMap(([key,label,tiers])=>tiers.map((target,i)=>({id:`${key}-${i}`,label,tier:i+1,target,value:values[key]||0,unlocked:state.unlocks.includes(`${key}-${i}`)||(values[key]||0)>=target})));
}
