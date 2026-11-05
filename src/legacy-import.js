import {initialState,validateState,validDate} from './model.js';
import {EXERCISES} from './exercises.js';
import {achievements,summary} from './analytics.js';

const normalize=name=>name.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');
const aliases=new Map([
 ['barbell bench press','bench'], ['leg press','leg-press'],
 ['lat pulldown','pulldown'], ['dumbbell lateral raise','lateral'],
 ['seated cable row','cable-row']
]);
const variants=new Map([
 ['seated leg curl',{key:'seated-leg-curl',muscle:'Hamstrings',pattern:'knee flexion',equipment:'machine'}],
 ['cable biceps curl',{key:'cable-biceps-curl',muscle:'Biceps',pattern:'elbow flexion',equipment:'cable'}],
 ['rope triceps pushdown',{key:'rope-triceps-pushdown',muscle:'Triceps',pattern:'elbow extension',equipment:'cable'}]
]);
const fail=message=>{throw Error(message);};
const list=(value,label,max=20000)=>{if(!Array.isArray(value)||value.length>max)fail(`Invalid legacy ${label}.`);return value;};
const string=(value,label,max=80)=>{if(typeof value!=='string'||!value.trim()||value.length>max)fail(`Invalid legacy ${label}.`);return value;};
const canonical=value=>JSON.stringify(value,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
async function hash(value){const bytes=new TextEncoder().encode(value);return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');}
// Stable IDs also match the previously supplied one-off v3 conversion.
async function id(key){const h=await hash('gymbro-legacy-v3:'+key);return `${h.slice(0,8)}-${h.slice(8,12)}-5${h.slice(13,16)}-a${h.slice(17,20)}-${h.slice(20,32)}`;}
const prescription=e=>({exerciseId:e.exerciseId,sets:e.sets,min:e.min,max:e.max});
const planSignature=p=>canonical({name:p.name,exercises:p.exercises.map(prescription)});
const sessionSignature=w=>canonical({date:w.date,exercises:w.exercises.map(e=>({exerciseId:e.exerciseId,entries:e.entries.map(s=>({kg:s.kg,reps:s.reps,type:s.type,done:s.done}))})).sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId))});

/** Validate and merge a known original Gym Bro v3 export. Never mutates either input. */
export async function prepareLegacyImport(source,current=initialState()){
 if(!source||source.type!=='muscle-workout-backup'||source.version!==3)fail('This legacy export version is not supported. Use an original Gym Bro v3 complete JSON export.');
 validateState(current);
 for(const [value,label]of [[source.photos_v23,'photos'],[source.wellness_v23?.measurements,'measurements']]){
  if(value!=null&&list(value,label).length)fail(`This legacy file includes ${label} that need a separate verified conversion. Your current data has not changed.`);
 }
 if(source.plans_v17!=null)fail('This legacy file includes additional saved plans that need a separate verified conversion.');
 if(source.metrics_v11?.targets&&Object.keys(source.metrics_v11.targets).length)fail('This legacy file includes lift targets that need a separate verified conversion.');
 const declaredUnit=source.unit??source.units;
 if(declaredUnit!=null&&!['kg','metric'].includes(declaredUnit))fail('This legacy importer supports kilogram exports only. No weights have been converted.');
 const sessions=list(source.sessions,'sessions');
 const candidate=structuredClone(current);
 if(!candidate.profile)candidate.profile={name:'',goal:'hypertrophy',days:3,minutes:60,experience:'beginner',unit:'kg',split:'full',incrementKg:2.5,equipment:['barbell','machine','cable','dumbbell'],excluded:[],priorities:[],secondaryGoals:[],trainingDays:[],restrictions:'',auto:true,timer:false,restSeconds:120,targetWeight:null};
 const report={addedWorkouts:0,skippedWorkouts:0,addedPlans:0,addedWeights:0,skippedWeights:0,weightConflicts:0,addedSets:0,addedReps:0};
 const existingSessions=new Set(candidate.sessions.map(sessionSignature));
 const sessionIDs=new Set(candidate.sessions.map(w=>w.id));
 const existingPlans=new Set(candidate.plans.map(planSignature));
 const customIDs=new Map(candidate.customExercises.map(e=>[e.id,e]));
 const sourceWeights=new Map();
 const builtinNames=new Map(EXERCISES.map(e=>[normalize(e.name),e.id]));
 async function resolveExercise(spec){
  const name=normalize(string(spec.name,'exercise name'));
  const match=aliases.get(name)||builtinNames.get(name);if(match)return match;
  const variant=variants.get(name);if(!variant)fail(`Cannot safely map legacy exercise “${spec.name}”. No data was changed.`);
  const exerciseId=await id('exercise:'+variant.key);
  const definition={id:exerciseId,name:spec.name,muscle:variant.muscle,pattern:variant.pattern,equipment:variant.equipment,secondary:[],compound:false,loadKind:'total load',cues:typeof spec.tip==='string'?spec.tip.slice(0,1000):'',difficulty:'user-defined',unilateral:false};
  if(customIDs.has(exerciseId)){
   const existing=customIDs.get(exerciseId);
   if(['name','muscle','pattern','equipment','loadKind'].some(k=>normalize(existing[k])!==normalize(definition[k])))fail('An imported exercise ID conflicts with an edited custom exercise. No data was changed.');
  }else{candidate.customExercises.push(definition);customIDs.set(exerciseId,definition);}
  return exerciseId;
 }
 for(const legacy of sessions){
  if(!legacy||!validDate(legacy.date))fail('A legacy session has an invalid date.');
  string(legacy.planName,'workout name');
  if(!legacy.items||Array.isArray(legacy.items)||typeof legacy.items!=='object')fail('A legacy workout has invalid exercise records.');
  const specs=new Map();
  for(const spec of list(legacy.planSnapshot,'exercise prescriptions',40)){
   string(spec.id,'exercise identifier',100);if(specs.has(spec.id))fail('A legacy plan contains duplicate exercise identifiers.');
   specs.set(spec.id,{source:spec,target:await resolveExercise(spec)});
  }
  const fingerprint=JSON.stringify({date:legacy.date,planId:legacy.planId,items:legacy.items,planSnapshot:legacy.planSnapshot});
  const sessionId=await id('session:'+fingerprint);
  const exercises=[];
  for(const [key,rows]of Object.entries(legacy.items)){
   const resolved=specs.get(key);if(!resolved)fail('A logged exercise has no matching prescription in the legacy file.');
   const spec=resolved.source;
   const entries=[];
   for(const [index,set]of list(rows,'set records',30).entries()){
    if(!set||typeof set.weight!=='number'||!Number.isFinite(set.weight)||set.weight<0||set.weight>1000||!Number.isInteger(set.reps)||set.reps<0||set.reps>200)fail('A legacy set contains an invalid load or repetition count.');
    if(Object.keys(set).some(k=>!['weight','reps'].includes(k)))fail('A legacy set contains additional fields that need a verified conversion.');
    entries.push({id:await id(sessionId+':'+key+':set:'+index),kg:set.weight,reps:set.reps,rir:null,done:set.reps>0,type:'working'});
   }
   const notes=[typeof spec.tip==='string'?spec.tip:'',`Imported rest preference: ${spec.rest??'not recorded'}. Legacy increment: ${spec.increment??'not recorded'} kg. Future suggestions use your current profile increment.`].filter(Boolean).join('\n');
   exercises.push({id:await id(sessionId+':exercise:'+key),exerciseId:resolved.target,sets:spec.sets,min:spec.min,max:spec.max,notes:notes.slice(0,1000),entries,legacyExerciseId:key,legacyIncrementKg:spec.increment,legacyRest:spec.rest});
  }
  if(!exercises.some(e=>e.entries.some(s=>s.done)))fail('A legacy session has no completed repetitions. It was not imported as a completed workout.');
  const session={id:sessionId,name:legacy.planName,date:legacy.date,startedAt:0,finishedAt:0,readiness:null,notes:`Imported original Gym Bro v3 workout. Session warmup flag: ${String(legacy.warmup??'not recorded')}. No per-set types were supplied; logged positive-repetition rows are working sets. Weights are kg. Exact times and duration were not recorded; timestamp 0 means unknown.`,exercises,importMetadata:{sourcePlanId:legacy.planId,sourceWarmupFlag:legacy.warmup,timePrecision:'date-only',durationKnown:false,unknownTimestamps:true}};
  const signature=sessionSignature(session);
  if(existingSessions.has(signature)||sessionIDs.has(session.id))report.skippedWorkouts++;
  else{candidate.sessions.push(session);existingSessions.add(signature);sessionIDs.add(session.id);report.addedWorkouts++;const totals=summary([session]);report.addedSets+=totals.sets;report.addedReps+=totals.reps;}
  const planKey=JSON.stringify({id:legacy.planId,name:legacy.planName,snapshot:legacy.planSnapshot});
  const plan={id:await id('plan:'+planKey),name:legacy.planName,exercises:[...specs.values()].map(({source:spec,target})=>({exerciseId:target,sets:spec.sets,min:spec.min,max:spec.max,legacyIncrementKg:spec.increment,legacyRest:spec.rest}))};
  const planKeySemantic=planSignature(plan);
  if(!existingPlans.has(planKeySemantic)){
   if(candidate.plans.some(p=>p.id===plan.id))fail('An imported plan ID conflicts with an edited existing program.');
   candidate.plans.push(plan);existingPlans.add(planKeySemantic);report.addedPlans++;
  }
 }
 for(const w of list(source.metrics_v11?.body??[],'weigh-ins')){
  if(!validDate(w.date)||typeof w.weight!=='number'||!Number.isFinite(w.weight)||w.weight<20||w.weight>500)fail('A legacy weigh-in is invalid.');
  if(sourceWeights.has(w.date)&&sourceWeights.get(w.date)!==w.weight)fail('The legacy file has conflicting weigh-ins on the same date.');
  sourceWeights.set(w.date,w.weight);
 }
 for(const [date,kg]of sourceWeights){
  const existing=candidate.weights.find(w=>w.date===date);
  if(existing){report.skippedWeights++;if(existing.kg!==kg)report.weightConflicts++;}
  else{candidate.weights.push({date,kg});report.addedWeights++;}
 }
 if(candidate.profile.targetWeight===null&&source.metrics_v11?.bodyTarget!=null)candidate.profile.targetWeight=source.metrics_v11.bodyTarget;
 candidate.sessions.sort((a,b)=>a.date.localeCompare(b.date)||a.startedAt-b.startedAt);candidate.weights.sort((a,b)=>a.date.localeCompare(b.date));
 candidate.unlocks=[...new Set([...candidate.unlocks,...achievements(candidate).filter(a=>a.unlocked).map(a=>a.id)])];
 const receipt={source:'muscle-workout-backup',version:3,digest:await hash(canonical(source))};
 candidate.legacyImports??=[];
 if(!candidate.legacyImports.some(r=>r.digest===receipt.digest))candidate.legacyImports.push({...receipt,legacyAchievementFlags:Array.isArray(source.achievements_v30?.seen)?source.achievements_v30.seen.filter(v=>typeof v==='string').slice(0,1000):[]});
 validateState(candidate);
 return {state:candidate,photos:[],mode:'legacy',report};
}
