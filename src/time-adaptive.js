// Pure proposals: never mutate saved plans, history, or the active draft.
const pending=s=>!s.done&&!s.skipped;
function cost(exercise,set,lookup,rest){const known=lookup(exercise.exerciseId);const reps=set.reps??exercise.max??10;const seconds=Math.max(20,reps*3)+15;return seconds+(exercise.restSeconds??rest??(known?.compound?150:75));}
export function estimateRemaining(draft,lookup,rest=120){
 let seconds=0;for(const e of draft.exercises){const sets=e.entries.filter(pending);if(sets.length)seconds+=45;for(const s of sets)seconds+=cost(e,s,lookup,rest);}return Math.ceil(seconds/60);
}
export function proposeTimeAdaptation(draft,minutes,{lookup,priorities=[],goal='balanced',restSeconds=120}={}){
 if(!draft||!Array.isArray(draft.exercises)||!Number.isFinite(minutes)||minutes<5||minutes>180||typeof lookup!=='function')throw Error('Choose 5–180 remaining minutes and a valid workout.');
 const original=structuredClone(draft),candidate=structuredClone(draft),changes=[];
 const priorityMuscles=new Set(priorities.map(x=>String(x).toLowerCase()));
 const rank=e=>{const known=lookup(e.exerciseId);return (priorityMuscles.has(known?.muscle?.toLowerCase())?100:0)+(goal==='strength'&&known?.compound?30:0)+(known?.compound?10:0);};
 // Explicit muscle priorities outweigh compound defaults. Preserve warm-ups until an exercise is deferred.
 while(estimateRemaining(candidate,lookup,restSeconds)>minutes){
  const coverage=new Map();for(const e of candidate.exercises)if(e.entries.some(s=>s.done||pending(s))){const muscle=lookup(e.exerciseId)?.muscle;if(muscle)coverage.set(muscle,(coverage.get(muscle)||0)+1);}
  const options=candidate.exercises.flatMap((e,index)=>{const remaining=e.entries.filter(s=>pending(s)&&s.type!=='warmup');if(!remaining.length)return [];const muscle=lookup(e.exerciseId)?.muscle,only=remaining.length===1&&!e.entries.some(s=>s.done);return [{e,index,set:remaining.at(-1),score:rank(e)+(only?40:0)+(only&&coverage.get(muscle)===1?25:0)}];}).sort((a,b)=>a.score-b.score||b.index-a.index);
  if(!options.length)break;
  const {e,set}=options[0];set.skipped=true;set.deferredForTime=true;
  changes.push({exerciseId:e.exerciseId,entryId:set.id,reason:'Reduce lower-priority remaining work while retaining completed sets and muscle coverage where feasible.'});
  if(!e.entries.some(s=>s.done||pending(s)&&s.type!=='warmup'))for(const warmup of e.entries.filter(s=>pending(s)&&s.type==='warmup')){warmup.skipped=true;warmup.deferredForTime=true;changes.push({exerciseId:e.exerciseId,entryId:warmup.id,reason:'Warm-up deferred with its exercise.'});}
 }
 const originalMinutes=estimateRemaining(original,lookup,restSeconds),proposedMinutes=estimateRemaining(candidate,lookup,restSeconds);
 return {version:1,source:JSON.stringify(original),originalMinutes,proposedMinutes,targetMinutes:minutes,feasible:proposedMinutes<=minutes,changes};
}
export function applyTimeAdaptation(draft,proposal,now=Date.now()){
 if(proposal.version!==1||JSON.stringify(draft)!==proposal.source)throw Error('The workout changed. Review a fresh time proposal.');
 const next=structuredClone(draft);
 for(const change of proposal.changes){const e=next.exercises.find(x=>x.exerciseId===change.exerciseId&&x.entries.some(s=>s.id===change.entryId)),s=e?.entries.find(x=>x.id===change.entryId);if(!s||s.done)throw Error('The proposed set is no longer available.');s.skipped=true;s.deferredForTime=true;}
 next.timeAdaptation={version:1,at:now,targetMinutes:proposal.targetMinutes,intentional:true};return next;
}
export function undoTimeAdaptation(draft){const next=structuredClone(draft);for(const e of next.exercises)for(const s of e.entries)if(s.deferredForTime){if(!s.done)s.skipped=false;delete s.deferredForTime;}delete next.timeAdaptation;return next;}
