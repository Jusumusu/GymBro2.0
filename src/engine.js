import { number } from './model.js';
export const goalRange=goal=>goal==='strength'?[3,6]:goal==='endurance'?[12,20]:goal==='fitness'?[8,12]:[6,10];
export const e1rm=(kg,reps)=>kg>0&&reps>=1&&reps<=10?kg*(1+reps/30):null;
export const working=e=>e.entries.filter(s=>s.done&&s.type!=='warmup'&&s.kg!==null&&s.reps>0);
export function exposures(sessions,exerciseId){const seen=new Set();return sessions.filter(w=>{if(seen.has(w.id))return false;seen.add(w.id);return true;}).slice().sort((a,b)=>a.date.localeCompare(b.date)||a.startedAt-b.startedAt).flatMap(w=>{const sets=w.exercises.filter(e=>e.exerciseId===exerciseId).flatMap(working);return sets.length?[{date:w.date,sets,readiness:w.readiness}]:[];});}
const score=x=>Math.max(...x.sets.map(s=>s.kg===0?s.reps:s.kg*(1+Math.min(s.reps,10)/30)));
export function recommend({exerciseId,sessions,goal='hypertrophy',prescription,increment=2.5,readiness=null,now=new Date(),auto=true}){
 number(increment,.1,50);if(readiness!==null)number(readiness,1,5);
 const range=goalRange(goal);const target={sets:prescription?.sets??3,min:range[0],max:range[1]};
 if(prescription){target.min=prescription.min;target.max=prescription.max;}
 const history=exposures(sessions,exerciseId);const last=history.at(-1);
 const result=(action,kg,reason,confidence='limited')=>({action,kg,...target,reason,confidence,evidence:history.length});
 if(!last)return result('baseline',null,'Choose a comfortable starting load. Log completed working sets to establish this exercise’s own baseline.');
 last.sets.forEach(s=>{number(s.kg,0,1000);number(s.reps,1,200);if(s.rir!==null)number(s.rir,0,10);});
 const kg=Math.min(...last.sets.map(s=>s.kg));
 const confidence=history.length>=3&&last.sets.every(s=>s.rir!==null)?'moderate':'limited';
 if(!auto)return result('maintain',kg,'Automatic adaptations are off. Your last completed load is shown for reference.',confidence);
 const gap=(now.getTime()-Date.parse(last.date+'T12:00:00Z'))/86400000;
 if(gap>=21){const factor=gap>=42?.8:.9;const load=kg===0?0:Math.max(0,Math.floor((kg*factor+1e-8)/increment)*increment);return result('return',load,'You have been away for at least three weeks. Consider a lighter return session, then rebuild from your feedback.',confidence);}
 if(readiness!==null&&readiness<=2)return result('review',kg,'You reported low readiness. Consider fewer sets or a lighter session; no increase is suggested.',confidence);
 const recent=history.slice(-3);
 if(recent.length===3&&score(recent[2])<score(recent[1])*.98&&score(recent[1])<score(recent[0])*.98)return result('review',kg,'Performance declined across three comparable exposures. Review recovery and workload; consider a lighter session. This is not a diagnosis.',confidence);
 if(last.sets.length<target.sets)return result('maintain',kg,'Fewer working sets were completed than prescribed. Keep the load and review the session before progressing.',confidence);
 if(last.sets.some(s=>s.reps<target.min))return result('maintain',kg,'At least one set missed the minimum repetition target. Keep or manually reduce the load; do not increase it.',confidence);
 if(last.sets.some(s=>s.rir!==null&&s.rir<1||s.type==='failure'))return result('maintain',kg,'At least one set was at or near technical failure. Repeat this load with controlled repetitions before increasing it.',confidence);
 const uniform=last.sets.every(s=>Math.abs(s.kg-kg)<.001);
 const ceiling=last.sets.every(s=>s.reps>=target.max);
 if(ceiling&&uniform&&kg>0){
  const missing=last.sets.some(s=>s.rir===null);
  const previous=history.at(-2);
  if(missing&&(!previous||previous.sets.length<target.sets||!previous.sets.every(s=>s.reps>=target.max&&Math.abs(s.kg-kg)<.001)))return result('maintain',kg,'You reached the rep ceiling. Without effort ratings, repeat this performance once before increasing the load.',confidence);
  const next=(Math.floor((kg+1e-8)/increment)+1)*increment;
  if(next-kg>kg*.075+1e-8)return result('maintain',kg,'The next available increment exceeds the 7.5% coaching guardrail. Add reps or choose a smaller equipment increment.',confidence);
  return result('increase',Number(next.toFixed(6)),`All ${last.sets.length} completed working sets reached the rep ceiling${missing?' on two exposures':' with repetitions in reserve'}. Try the next available load, and rebuild reps.`,confidence);
 }
 if(history.length>=4&&history.slice(-4).every(x=>Math.abs(score(x)-score(last))<Math.max(1,score(last)*.01)))return result('review',kg,'Four exposures show little change. This may be a plateau; review adherence, smaller increments, and recovery before changing the program.',confidence);
 return result('reps',kg,'Build repetitions within your target range at this load. One difficult session alone does not establish a plateau.',confidence);
}
