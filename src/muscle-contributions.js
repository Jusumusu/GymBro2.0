// Ordinal coaching classifications, not measured activation or growth percentages.
export const CONTRIBUTION_MUSCLES=['Chest','Back','Quads','Hamstrings','Glutes','Shoulders','Biceps','Triceps','Calves','Core','Adductors','Spinal erectors','Forearms','Obliques'];
export const muscleLabel=m=>({Quads:'Quadriceps',Core:'Abdominals','Spinal erectors':'Lower back',Adductors:'Adductors / hips'}[m]||m);
const primary=m=>({muscle:m,role:'primary',level:'high'}),secondary=(m,level='moderate')=>({muscle:m,role:'secondary',level}),stable=(m,level='low')=>({muscle:m,role:'stabilizer',level});
const catalog={};const assign=(ids,...map)=>ids.split(' ').forEach(id=>catalog[id]=map);
assign('squat goblet body-squat',primary('Quads'),secondary('Glutes','high'),secondary('Adductors'),stable('Spinal erectors'),stable('Core'));
assign('front-squat',primary('Quads'),secondary('Glutes','high'),secondary('Adductors'),stable('Spinal erectors','moderate'),stable('Core'));
assign('leg-press',primary('Quads'),secondary('Glutes','high'),secondary('Adductors'));
assign('db-split-squat lunge',primary('Quads'),secondary('Glutes','high'),secondary('Adductors'),stable('Core'));
assign('bench db-bench chest-press',primary('Chest'),secondary('Triceps'),secondary('Shoulders'));
assign('incline-db',primary('Chest'),secondary('Shoulders','high'),secondary('Triceps'));
assign('pushup',primary('Chest'),secondary('Triceps'),secondary('Shoulders'),stable('Core'));
assign('rdl db-rdl',primary('Hamstrings'),secondary('Glutes','high'),secondary('Adductors','low'),stable('Spinal erectors','moderate'),stable('Forearms'));
assign('deadlift',primary('Glutes'),secondary('Quads'),secondary('Hamstrings'),secondary('Adductors','low'),stable('Spinal erectors','moderate'),stable('Back'),stable('Forearms'));
assign('bridge hip-thrust',primary('Glutes'),secondary('Hamstrings','low'),stable('Core'));
assign('curl-leg seated-leg-curl',primary('Hamstrings'));
assign('row',primary('Back'),secondary('Biceps'),secondary('Shoulders','low'),stable('Spinal erectors','moderate'),stable('Forearms'),stable('Core'));
assign('db-row',primary('Back'),secondary('Biceps'),secondary('Shoulders','low'),stable('Forearms'),stable('Core'));
assign('cable-row chest-supported-row',primary('Back'),secondary('Biceps'),secondary('Shoulders','low'),stable('Forearms'));
assign('floor-pull',primary('Back'),secondary('Shoulders','low'));
assign('ohp db-ohp pike',primary('Shoulders'),secondary('Triceps'),secondary('Chest','low'),stable('Core'));
assign('pulldown pullup',primary('Back'),secondary('Biceps'),stable('Forearms'),stable('Core'));
assign('lateral',primary('Shoulders'));
assign('curl',primary('Biceps'),secondary('Forearms','low'));
assign('hammer-curl',primary('Biceps'),secondary('Forearms'));
assign('pushdown overhead-cable-extension',primary('Triceps'));
assign('calf seated-calf',primary('Calves'));
assign('crunch reverse-crunch cable-crunch',primary('Core'),secondary('Obliques','low'));
assign('cable-fly',primary('Chest'));
assign('leg-extension',primary('Quads'));
assign('rear-delt-fly face-pull',primary('Shoulders'),secondary('Back'));
export const auditedExerciseIds=Object.freeze(Object.keys(catalog));
export function contributions(exercise){
 if(!exercise)return [];
 const rows=exercise.contributions||catalog[exercise.id]||[primary(exercise.muscle),...(exercise.secondary||[]).map(m=>secondary(m))];
 const seen=new Set();return rows.filter(r=>r.muscle&&!seen.has(r.muscle)&&seen.add(r.muscle)).map(r=>({...r,weight:r.role==='primary'?1:r.role==='stabilizer'?({high:.25,moderate:.15,low:.1}[r.level]):({high:.75,moderate:.5,low:.25}[r.level])}));
}
export const discoverableMuscles=exercise=>contributions(exercise).filter(r=>r.role==='primary'||r.role==='secondary'&&r.level!=='low').map(r=>r.muscle);
export function validateContributions(rows){
 if(!Array.isArray(rows)||rows.length>CONTRIBUTION_MUSCLES.length)throw Error('Invalid muscle contributions.');
 const seen=new Set();for(const r of rows){if(!r||!CONTRIBUTION_MUSCLES.includes(r.muscle)||seen.has(r.muscle)||!['primary','secondary','stabilizer'].includes(r.role)||!['high','moderate','low'].includes(r.level))throw Error('Invalid or duplicate muscle classification.');seen.add(r.muscle);}
}
export function muscleIntensity(count,max){
 if(!count)return 'none';const training=count.direct+count.indirect;
 if(!training)return count.stabilizing?'low':'none';
 const normalized=Math.sqrt(training/Math.max(1,max));return normalized>=.8?'high':normalized>=.4?'moderate':'low';
}
