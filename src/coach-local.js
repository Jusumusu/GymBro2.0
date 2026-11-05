import {findExercise} from './exercises.js';
import {migrateState} from './extensions.js';
import {exposures} from './engine.js';
import {today,displayLoad} from './model.js';
import {GOALS} from './exercises.js';

export function assessRoutine(state,{date=today(),message=''}={}){
 const recent=state.sessions.filter(w=>w.date<=date).slice().sort((a,b)=>a.date.localeCompare(b.date)||a.startedAt-b.startedAt);
 const latest=recent.at(-1),active=state.plans.find(p=>p.id===state.draft?.planId);
 const named=state.plans.filter(p=>message.toLowerCase().includes(p.name.toLowerCase()));
 const plan=(named.length===1?named[0]:null)??active??state.plans.find(p=>p.id===latest?.planId||p.name===latest?.name)??(state.plans.length===1?state.plans[0]:null);
 const result=reply=>({reply,topic:'routine-review',factIds:['routine-review']});
 if(!plan)return result(state.plans.length?`Which saved routine do you mean: ${state.plans.slice(0,4).map(p=>p.name).join(', ')}? I cannot tell which one you are following from the latest workout. Tell me its name and whether your concern is progress, time, equipment or enjoyment; I have not changed anything.`:'I cannot assess your routine because no program is saved here. Add/import the routine or tell me its exercises, sets, weekly frequency and what you want to improve. Workout history alone does not tell me the intended program.');
 const cutoff=new Date(date+'T12:00:00Z');cutoff.setUTCDate(cutoff.getUTCDate()-27);const since=cutoff.toISOString().slice(0,10),window=recent.filter(w=>w.date>=since);
 const matches=window.filter(w=>w.planId===plan.id||w.name===plan.name),trends=[],misses=[];
 let comparable=0,progressing=0,unchanged=0,declining=0;
 for(const p of plan.exercises){
  const h=exposures(window,p.exerciseId),a=h.at(-2),b=h.at(-1);if(!a||!b)continue;
  const name=findExercise(state,p.exerciseId)?.name||'Exercise',same=a.sets.length===b.sets.length&&a.sets.every((set,i)=>Math.abs(set.kg-b.sets[i].kg)<.001);
  if(same){comparable++;const from=a.sets.reduce((n,s)=>n+s.reps,0),to=b.sets.reduce((n,s)=>n+s.reps,0);if(to>from)progressing++;else if(to<from)declining++;else unchanged++;
   if(trends.length<3)trends.push(`${name}: ${from} → ${to} total reps across ${b.sets.length} sets with matching recorded loads (${a.date} → ${b.date}).`);
  }else if(a.sets.length===b.sets.length&&b.sets.every((s,i)=>s.kg>=a.sets[i].kg&&s.reps>=a.sets[i].reps)&&b.sets.some((s,i)=>s.kg>a.sets[i].kg)){
   comparable++;progressing++;
   if(trends.length<3)trends.push(`${name}: recorded load increased without losing reps across ${b.sets.length} sets (${a.date} → ${b.date}); latest ${b.sets.map(s=>displayLoad(s.kg,state.profile.unit)+' '+state.profile.unit+' × '+s.reps).join(', ')}.`);
  }
  if(a.sets.some(s=>s.reps<p.min)&&b.sets.some(s=>s.reps<p.min))misses.push(name);
 }
 const excludes=plan.exercises.filter(p=>{const e=findExercise(state,p.exerciseId);return e&&(!state.profile.equipment.includes(e.equipment)||state.profile.excluded.includes(e.id));}).map(p=>findExercise(state,p.exerciseId).name);
 const intro=`Saved routine: ${plan.name}. Your goal: ${GOALS[state.profile.goal]||state.profile.goal}; target: ${state.profile.days} sessions/week. It prescribes ${plan.exercises.reduce((n,e)=>n+e.sets,0)} working sets per session.`;
 const evidence=`In the last 28 days (${since}–${date}), you saved ${window.length} workouts; ${matches.length} match this routine by name or plan ID. ${comparable} routine exercises have two recent exposures suitable for a load/rep comparison.`;
 let verdict;
 if(excludes.length)verdict=`I would review these exercises first because they conflict with your current equipment or exclusions: ${excludes.join(', ')}. You may only need substitutions, rather than replacing the whole routine.`;
 else if(misses.length)verdict=`I would review the load/rep targets for ${misses.join(', ')} first: two recent exposures fell below the currently saved minimum rep target. Check whether targets changed, effort and available increments before replacing the whole routine.`;
 else if(progressing)verdict=`I would not replace the routine solely because the weights stayed the same: ${progressing} exercise${progressing===1?' has':'s have'} improved reps at matching loads or raised loads without losing reps. ${declining?`${declining} declined on the latest comparison; one decline does not establish a plateau.`:'Keep tracking technique and effort as well.'}`;
 else if(comparable)verdict=`${unchanged} exercise${unchanged===1?' is':'s are'} unchanged and ${declining} declined on the latest matched-load comparison. Two exposures are not enough to declare a plateau or justify replacing the routine. Review effort, consistency and recovery, then compare further exposures.`;
 else verdict='There is not enough comparable recent performance to judge whether this routine has stopped working. I would not recommend a complete change from these records alone.';
 return result(`${verdict}\n\n${intro}\n${evidence}${trends.length?'\n\n'+trends.join('\n'):''}\n\nWhat is making you consider a change: stalled progress, session length, equipment, boredom, or a different goal? That reason matters alongside the numbers. Nothing has been changed.`);
}

// These are deliberately small offline tools, not a simulated language model.
export function localReadOnlyAnswer(state,message,{exerciseId,context,date}={}){
 const q=message.toLowerCase().trim(),exercise=findExercise(state,exerciseId);
 const u=migrateState(state).upgrade;
 const prescription=state.draft?.exercises.find(e=>e.exerciseId===exerciseId)??state.plans.flatMap(p=>p.exercises).find(e=>e.exerciseId===exerciseId);
 const result=(reply,factIds=[])=>({reply,factIds});
 if(/\b(routine|program|plan)\b/.test(q)&&/\b(change|switch|keep|working|suit|good|review|should|assess)\b/.test(q)||state.plans.some(p=>p.name.toLowerCase()===q))return assessRoutine(state,{date,message});
 if(/^(hi|hello|hey|thanks|thank you)[!. ]*$/.test(q))return result('Hi! I’m the offline training assistant. I can check recorded progress, explain a saved exercise target, review your week, or prepare a plan. For open-ended conversation, connect Cloud AI using “Connect AI”.');
 if(/\b(are you (an? )?ai|real ai|what can you do|how do you work|not smart)\b/.test(q))return result('This mode uses offline rules and training tools, not a live AI model. I can analyze saved workouts and prepare supported changes. Connect your hosted backend using “Connect AI” for conversational AI; you choose when training facts are sent.');
 if(/\b(rir|reps? in reserve)\b/.test(q)&&/\b(what|mean|explain|understand)\b/.test(q))return result('RIR means repetitions in reserve: your estimate of how many more controlled reps you could have completed. RIR 2 means about two more. It is optional; leave it blank if you are unsure. A lower number means the set felt closer to your limit.');
 if(/\b(1rm|e1rm|one.rep max)\b/.test(q)&&/\b(what|mean|explain)\b/.test(q))return result('Estimated 1RM is an estimate of a one-repetition maximum, not a tested max. Gym Bro uses the Epley formula, load × (1 + reps / 30), only for loaded sets of 1–10 reps. Higher-rep progress is still tracked through actual load and reps.');
 if(/\b(rest|resting)\b/.test(q)&&/\b(between|sets|long|much|seconds|minutes)\b/.test(q)){
  const seconds=u.exerciseRules[exerciseId]?.restSeconds??prescription?.restSeconds??state.profile.restSeconds;
  return result(`${exercise?exercise.name+' has':'Your profile has'} ${seconds} seconds of rest configured. Treat that as a starting point: take longer if breathing or technique has not settled enough for another controlled set. You can change rest guidance in the exercise rules.`,exercise?['prescription']:['goal']);
 }
 if(/\b(technique|form|perform|cues)\b|how (do|should) i (do|perform)/.test(q))return exercise?result(`${exercise.name}: ${exercise.cues}\n\nLoad convention: ${exercise.loadKind}.`,['exercise']):result('Which exercise do you mean? Choose it in “Exercise context” or use its full name so I can show its technique cues.');
 if(/how many.*(reps|repetitions|sets)|(?:sets|reps|repetitions).*(?:target|range)|(?:target|range).*(?:sets|reps|repetitions)/.test(q)){
  if(!exercise)return result('Which exercise do you mean? Choose it in “Exercise context” to check the saved set and rep targets.');
  if(!prescription)return result(`${exercise.name} has no saved prescription yet. Add it to a program or active workout to set your own working sets and rep range.`,['exercise']);
  return result(`${exercise.name}: your saved target is ${prescription.sets} working sets of ${prescription.min}–${prescription.max} reps.${prescription.repTargets?.length?' Set-specific targets: '+prescription.repTargets.join(', ')+'.':''} Warm-ups are separate. These are your plan targets, not a claim that one range is optimal for everyone.`,['prescription']);
 }
 return null;
}
