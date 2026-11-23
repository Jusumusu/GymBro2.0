// One definition for required-work completion. Warm-ups and opted-out rows stay recorded.
export const requiredSet=set=>set.type!=='warmup'&&set.skipped!==true&&set.deferred!==true&&set.optional!==true;
export function workoutProgress(draft){
 const rows=(draft?.exercises||[]).flatMap(e=>e.entries).filter(requiredSet),total=rows.length,completed=rows.filter(s=>s.done).length;
 return {total,completed,remaining:total-completed,percent:total?Math.min(completed===total?100:99,Math.round(completed/total*100)):0,complete:total>0&&completed===total};
}
export function reconcileWorkoutRest(before,after){
 if(after&&workoutProgress(before).remaining>0&&workoutProgress(after).remaining===0)delete after.restTimer;
}
