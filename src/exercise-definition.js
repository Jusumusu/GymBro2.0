// One schema for additive catalog definitions. Ordinal roles are coaching estimates.
export const P=muscle=>({muscle,role:'primary',level:'high'}),S=(muscle,level='moderate')=>({muscle,role:'secondary',level}),T=(muscle,level='low')=>({muscle,role:'stabilizer',level});
const upper=new Set(['Chest','Back','Shoulders','Biceps','Triceps','Forearms']),lower=new Set(['Quads','Hamstrings','Glutes','Calves','Adductors']);
export function defineExercise(slug,name,equipment,pattern,mapping,cues,{aliases=[],compound=true,unilateral=false,loadKind,trackingType='reps',difficulty='moderate',category}={}){
 const primary=mapping.filter(r=>r.role==='primary').map(r=>r.muscle);
 return {id:'gb-'+slug,name,aliases,muscle:primary[0],primaryMuscles:primary,secondary:mapping.filter(r=>r.role==='secondary').map(r=>r.muscle),contributions:mapping,equipment,pattern,category:category||(upper.has(primary[0])?'Upper body':lower.has(primary[0])?'Lower body':'Core'),trackingType,compound,unilateral,difficulty,loadKind:loadKind||(equipment==='dumbbell'?'per dumbbell':equipment==='kettlebell'?'per kettlebell':equipment==='bodyweight'?'added load':'total load'),cues};
}
