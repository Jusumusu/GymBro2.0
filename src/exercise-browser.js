import {contributions,discoverableMuscles,muscleLabel} from './muscle-contributions.js';
const aliases={row:'rows bent over row bb row','db-row':'rows db row dumbbell row','cable-row':'rows seated cable row','chest-supported-row':'rows supported row',crunch:'abs abdominals crunches','reverse-crunch':'abs reverse crunches','cable-crunch':'abs cable crunches',squat:'back squat bb squat squats',bench:'bp flat bench bb bench',ohp:'ohp overhead press military press',rdl:'rdl rdls romanian deadlift', 'db-rdl':'db rdl dumbbell romanian deadlift',pulldown:'lat pulldown pull down pulldowns latpulldown',pullup:'pull up pullup pullups pull ups chin up',pushup:'push up pushup pushups push ups', 'incline-db':'incline bench press db incline',deadlift:'dl conventional deadlift','curl-leg':'hamstring curl leg curl'};
export const normalizeSearch=value=>String(value||'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
export function exerciseIndex(exercises){return [...new Map(exercises.map(e=>[e.id,e])).values()].map(exercise=>({exercise,categories:discoverableMuscles(exercise),text:normalizeSearch([exercise.id,exercise.name,exercise.name.replace(/dumbbell/gi,'db').replace(/barbell/gi,'bb'),aliases[exercise.id],...(exercise.aliases||[]),exercise.equipment,exercise.pattern,exercise.muscle,...contributions(exercise).filter(r=>r.role!=='stabilizer').map(r=>muscleLabel(r.muscle))].join(' '))}));}
export function browseExercises(index,{query='',category='',equipment='',pattern='',type='',customIds=new Set()}={}){
 const words=normalizeSearch(query).split(' ').filter(Boolean);
 return index.filter(x=>(words.length?words.every(w=>x.text.includes(w)):!category||x.categories.includes(category))&&(!equipment||x.exercise.equipment===equipment)&&(!pattern||x.exercise.pattern===pattern)&&(!type||type==='custom'?(!type||customIds.has(x.exercise.id)):type==='compound'?x.exercise.compound:!x.exercise.compound)).map(x=>x.exercise);
}
export function recentExercises(state,exercises,limit=6){
 const latest=new Map();
 const add=(id,at)=>{if(Number.isFinite(at))latest.set(id,Math.max(latest.get(id)||0,at));};
 for(const w of state.sessions)for(const e of w.exercises)if(e.entries.some(s=>s.done&&s.type!=='warmup'))add(e.exerciseId,Math.max(Date.parse(w.date+'T00:00:00'),w.finishedAt||0));
 for(const item of state.upgrade?.exerciseBrowser?.recentSelections||[])add(item.exerciseId,item.at);
 const available=new Map(exercises.map(e=>[e.id,e]));return [...latest].filter(([id])=>available.has(id)).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,limit).map(([id])=>available.get(id));
}
export function recordSelection(state,id,at=Date.now()){const prefs=state.upgrade.exerciseBrowser;prefs.recentSelections=[{exerciseId:id,at},...prefs.recentSelections.filter(x=>x.exerciseId!==id)].slice(0,50);}
