const pending=set=>!set.done&&!set.skipped;
export function activeSet(draft){
 if(!draft)return null;
 const all=draft.exercises.flatMap(exercise=>exercise.entries.map(set=>({exercise,set})));
 const selected=all.find(x=>x.set.id===draft.activeSetId);
 if(selected&&pending(selected.set))return selected;
 const first=all.find(x=>pending(x.set));if(!first)return null;
 const source=selected?.exercise.group&&all.some(x=>x.exercise.group===selected.exercise.group&&pending(x.set))?selected.exercise:first.exercise;
 if(!source.group)return all.find(x=>x.exercise===source&&pending(x.set))||first;
 const group=draft.exercises.filter(e=>e.group===source.group&&e.entries.some(pending));
 // Complete/skip warm-ups before alternating working rounds in a superset.
 const warming=group.filter(e=>e.entries.some(s=>s.type==='warmup'&&pending(s)));
 const candidates=warming.length?warming:group;
 const count=e=>e.entries.filter(s=>(warming.length?s.type==='warmup':s.type!=='warmup')&&(s.done||s.skipped)).length;
 const minimum=Math.min(...candidates.map(count)),exercise=candidates.find(e=>count(e)===minimum);
 return {exercise,set:exercise.entries.find(s=>pending(s)&&(!warming.length||s.type==='warmup'))};
}
export function reconcileActiveSet(draft){if(draft)draft.activeSetId=activeSet(draft)?.set.id||null;return draft;}
export function selectActiveSet(draft,id){const found=draft.exercises.flatMap(e=>e.entries).find(s=>s.id===id);if(!found||found.done)throw Error('Choose an unfinished set.');if(found.skipped)found.skipped=false;draft.activeSetId=id;}
export function exerciseStatus(exercise){const completed=exercise.entries.filter(s=>s.done).length,skipped=exercise.entries.filter(s=>s.skipped&&!s.done).length;return {completed,skipped,finished:completed>0&&exercise.entries.every(s=>s.done||s.skipped),allSkipped:exercise.entries.length>0&&skipped===exercise.entries.length};}
