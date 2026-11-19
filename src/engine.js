import { number } from './model.js';
export const goalRange=goal=>goal==='strength'?[3,6]:goal==='endurance'?[12,20]:goal==='fitness'?[8,12]:[6,10];
export const e1rm=(kg,reps)=>kg>0&&reps>=1&&reps<=10?kg*(1+reps/30):null;
export const working=e=>e.entries.filter(s=>s.done&&s.type!=='warmup'&&s.kg!==null&&s.reps>0);
export function exposures(sessions,exerciseId){const seen=new Set();return sessions.filter(w=>{if(seen.has(w.id))return false;seen.add(w.id);return true;}).slice().sort((a,b)=>a.date.localeCompare(b.date)||a.startedAt-b.startedAt).flatMap(w=>{const sets=w.exercises.filter(e=>e.exerciseId===exerciseId).flatMap(working);return sets.length?[{date:w.date,sets,readiness:w.readiness,prescriptions:w.exercises.filter(e=>e.exerciseId===exerciseId).map(e=>({sets:e.sets,min:e.min,max:e.max})),intentional:!!w.timeAdaptation?.intentional||!!w.blockContext?.target?.lighter}]:[];});}
const score=x=>Math.max(...x.sets.map(s=>s.kg===0?s.reps:s.kg*(1+Math.min(s.reps,10)/30)));
export function recommend({exerciseId,sessions,goal='hypertrophy',prescription,increment=2.5,readiness=null,now=new Date(),auto=true,strategy='double',targetRir=null}){
 number(increment,.1,50);if(readiness!==null)number(readiness,1,5);if(targetRir!==null)number(targetRir,0,10);
 const range=goalRange(goal);const target={sets:prescription?.sets??3,min:range[0],max:range[1]};
 if(prescription){target.min=prescription.min;target.max=prescription.max;}
 const cutoff=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');const progressionSessions=sessions.filter(w=>w.date<=cutoff).map(w=>({...w,exercises:w.exercises.map(e=>({...e,entries:e.entries.filter(s=>s.type==='working'||s.type==='failure')}))}));const history=exposures(progressionSessions,exerciseId).filter(x=>!x.intentional);const sameTargets=x=>x.prescriptions.every(p=>(p.sets===undefined||p.sets===target.sets)&&(p.min===undefined||p.min===target.min)&&(p.max===undefined||p.max===target.max));const last=history.at(-1);
 const result=(action,kg,reason,confidence='limited')=>({action,kg,...target,reason,confidence,evidence:history.length});
 if(!last)return result('baseline',null,'Choose a comfortable starting load. Log completed working sets to establish this exercise’s own baseline.');
 last.sets.forEach(s=>{number(s.kg,0,1000);number(s.reps,1,200);if(s.rir!==null)number(s.rir,0,10);});
 const kg=Math.min(...last.sets.map(s=>s.kg));
 const confidence=history.length>=3&&last.sets.every(s=>s.rir!==null)?'moderate':'limited';
 if(!auto||strategy==='maintain')return result('maintain',kg,!auto?'Automatic adaptations are off. Your last completed load is shown for reference.':'Your maintain strategy keeps the recorded load as a reference. Change it manually whenever appropriate.',confidence);
 const gap=(Date.parse(cutoff+'T00:00:00Z')-Date.parse(last.date+'T00:00:00Z'))/86400000;
 const comparable=x=>sameTargets(x)&&x.sets.length===target.sets&&x.sets.every(s=>Math.abs(s.kg-kg)<.001)&&(Date.parse(last.date)-Date.parse(x.date))/86400000<=42;
 if(gap>=21){const factor=gap>=42?.8:.9;const load=kg===0?0:Math.max(0,Math.floor((kg*factor+1e-8)/increment)*increment);return result('return',load,'You have been away for at least three weeks. Consider a lighter return session, then rebuild from your feedback.',confidence);}
 if(readiness!==null&&readiness<=2)return result('review',kg,'Your optional readiness check reports low energy today, which is separate from set RIR. Review the load or workload; no increase or extra sets are applied.',confidence);
 const recent=history.slice(-3).filter(x=>sameTargets(x)&&x.sets.length===target.sets&&(Date.parse(last.date)-Date.parse(x.date))/86400000<=42);
 if(recent.length===3&&score(recent[2])<score(recent[1])*.98&&score(recent[1])<score(recent[0])*.98)return result('review',kg,'Performance declined across three comparable exposures. Review recovery and workload; consider a lighter session. This is not a diagnosis.',confidence);
 if(last.sets.length<target.sets)return result('maintain',kg,'Next session: maintain this load. Fewer working sets were completed than prescribed; skipped sets do not qualify as completed work. No extra sets are added.',confidence);
 if(last.sets.some(s=>s.reps<target.min)){
  const repeated=history.length>=2&&comparable(history.at(-2))&&history.at(-2).sets.some(s=>s.reps<target.min);
  const lighter=Number((Math.floor((kg*.95+1e-8)/increment)*increment).toFixed(6));
  const optionalKg=repeated&&lighter>0&&lighter<kg&&lighter>=kg*.85?lighter:null;
  return {...result('maintain',kg,repeated?'Two exposures missed the minimum repetition target. Keep the load or review the optional lighter candidate; changing it is your choice.':'At least one set missed the minimum repetition target. Keep or manually reduce the load; do not increase it.',confidence),optionalKg};
 }
 const priorTwo=history.slice(-3,-1);if(priorTwo.length===2&&priorTwo.every(x=>comparable(x)&&x.sets.some(s=>s.reps<target.min)))return result('maintain',kg,'Next session: maintain this load. Two recent sessions missed these same prescribed targets; establish another complete successful session before increasing. No extra sets or exercises are requested.',confidence);
 const minimumRir=targetRir??1;if(last.sets.some(s=>s.rir!==null&&s.rir<minimumRir||s.type==='failure'))return result('maintain',kg,targetRir!==null?`Next session: maintain this load. Reported RIR was below the configured ${targetRir}-RIR target, or a set was marked to failure. No extra sets are requested.`:'Next session: maintain this load. A set was at 0 RIR or marked to failure; establish controlled reps before increasing. Sets do not need to feel easy.',confidence);
 const uniform=last.sets.every(s=>Math.abs(s.kg-kg)<.001);
 const ceiling=last.sets.every(s=>s.reps>=target.max);
 if(ceiling&&uniform&&kg===0)return result('maintain',0,'All target sets reached the rep ceiling at zero added load. Repeat controlled reps, or manually choose an appropriate variation or added load. Body mass is not an equipment increment.',confidence);
 if(strategy==='reps'&&ceiling)return result('maintain',kg,'Next session: maintain this load. The rep ceiling is met, but your reps-only strategy does not increase weight. You can edit the range or strategy.',confidence);
 const comfortableLoadProgression=strategy==='load'&&history.length>=2&&comparable(history.at(-2))&&history.at(-2).sets.every(s=>s.reps>=target.min&&s.rir!==null&&s.rir>=3)&&last.sets.every(s=>s.rir!==null&&s.rir>=3&&s.reps>=target.min);
 if((ceiling||comfortableLoadProgression)&&uniform&&kg>0&&strategy!=='reps'){
  const missing=last.sets.some(s=>s.rir===null);
  const next=(Math.floor((kg+1e-8)/increment)+1)*increment;
  if(next-kg>kg*.075+1e-8)return result('maintain',kg,'The next available increment exceeds the 7.5% coaching guardrail. Add reps or choose a smaller equipment increment.',confidence);
  return result('increase',Number(next.toFixed(6)),comfortableLoadProgression&&!ceiling?'All target sets were completed with at least 3 reported reps in reserve. In load-progression mode, try the next small equipment increment and keep quality reps.':`All ${last.sets.length} completed working sets reached the rep ceiling. Next session: consider this small load increase and rebuild reps.${missing?' RIR was not recorded, so effort is uncertain; it remains optional.':''}`,confidence);
 }
 if(!uniform)return result('maintain',kg,'Next session: review the different working loads you recorded. Double progression compares all target sets at a consistent load before suggesting an increase.',confidence);
 if(history.length>=4&&history.slice(-4).every(x=>{if(!comparable(x))return false;const a=x.sets,b=last.sets;return a.length===b.length&&a.every((s,i)=>Math.abs(s.kg-b[i].kg)<.001&&s.reps===b[i].reps);}))return result('review',kg,'Four exposures show little change. This may be a plateau; review adherence, smaller increments, and recovery before changing the program.',confidence);
 const remaining=last.sets.reduce((n,s)=>n+Math.max(0,target.max-s.reps),0);return result('reps',kg,`Next session: maintain this load and aim for ${remaining} more total rep${remaining===1?'':'s'} across your working sets to reach the ceiling. No extra sets or exercises are requested.`,confidence);
}

// Apply only after an explicit user action; never alter role-specific or completed work.
export function applyRecommendedLoad(exercise,kg){number(kg,0,1000);let changed=0;for(const set of exercise.entries)if(!set.done&&!set.skipped&&!set.deferred&&(set.type==='working'||set.type==='failure')){set.kg=kg;changed++;}return changed;}
