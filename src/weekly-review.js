import {today,displayLoad} from './model.js';
import {weekRange,weekStartsOn,addDays} from './calendar.js';
import {summary,createRecordTracker,achievements} from './analytics.js';
import {exposures} from './engine.js';
import {findExercise,library,GOALS} from './exercises.js';
import {migrateState} from './extensions.js';
import {goalProgress} from './training-tools.js';

const inRange=(date,start,end)=>date>=start&&date<=end;
const mean=items=>items.reduce((n,w)=>n+w.kg,0)/items.length;
const createdDate=value=>{const d=new Date(value);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
function atDate(state,date){return {...state,sessions:state.sessions.filter(w=>w.date<=date),weights:state.weights.filter(w=>w.date<=date),measurements:state.measurements.filter(w=>w.date<=date),photos:state.photos.filter(w=>w.date<=date)};}
function goalAt(state,goal,date){
 const bounded=atDate(state,date),result=goalProgress(bounded,goal);
 if(goal.type==='body'){
  const latest=bounded.weights.slice().sort((a,b)=>a.date.localeCompare(b.date)).at(-1);
  result.available=Boolean(latest);result.value=latest?.kg??null;
  if(!latest)return {...result,percent:0,reached:false,remaining:null};
  const direction=goal.baseline!=null?Math.sign(goal.target-goal.baseline):0;
  result.reached=direction?direction*(latest.kg-goal.target)>=0:Math.abs(latest.kg-goal.target)<.05;
  result.remaining=result.reached?0:Math.abs(goal.target-latest.kg);
 }else{result.available=goal.type==='workouts'||result.value>0;result.remaining=Math.max(0,goal.target-result.value);}
 return result;
}
function weightComparison(state,start,through){
 const previousStart=addDays(start,-7),previousEnd=addDays(start,-1);
 const current=state.weights.filter(w=>inRange(w.date,start,through)).slice().sort((a,b)=>a.date.localeCompare(b.date));
 const previous=state.weights.filter(w=>inRange(w.date,previousStart,previousEnd)).slice().sort((a,b)=>a.date.localeCompare(b.date));
 const smoothed=current.length>=2&&previous.length>=2;
 const currentKg=current.length?(current.length>=2?mean(current):current.at(-1).kg):null;
 const previousKg=previous.length?(previous.length>=2?mean(previous):previous.at(-1).kg):null;
 return {currentCount:current.length,previousCount:previous.length,currentKg,previousKg,smoothed,delta:currentKg!==null&&previousKg!==null?currentKg-previousKg:null};
}
export function buildWeeklyReview(state,{date=today(),asOf=today(),includeBody=true}={}){
 const u=migrateState(state).upgrade,{start,end}=weekRange(date,weekStartsOn(state));
 if(start>asOf)throw Error('Choose this week or an earlier week.');
 const through=end<asOf?end:asOf,previousStart=addDays(start,-7),previousEnd=addDays(start,-1);
 const bounded=atDate(state,through),before=atDate(state,previousEnd);
 const sessions=bounded.sessions.filter(w=>w.date>=start),previous=before.sessions.filter(w=>w.date>=previousStart);
 const totals=summary(sessions),priorTotals=summary(previous);
 const scheduled=u.schedule.filter(s=>s.status==='planned'&&inRange(s.date,start,end));
 const matched=new Set();let scheduledDone=0,missed=0,upcoming=0;
 for(const item of scheduled){
  const match=sessions.find(w=>!matched.has(w.id)&&w.date===item.date&&(w.planId===item.planId||w.name===(item.planName||state.plans.find(p=>p.id===item.planId)?.name)));
  if(match){matched.add(match.id);scheduledDone++;}else if(item.date<through||end<asOf)missed++;else upcoming++;
 }
 const target=scheduled.length||state.profile.days,completed=scheduled.length?scheduledDone:totals.workouts;
 const frequency={target:state.profile.days,completed:totals.workouts,met:totals.workouts>=state.profile.days,percent:Math.min(100,totals.workouts/state.profile.days*100)};
 const consistency={target,completed,scheduled:scheduled.length,missed,upcoming,met:completed>=target,percent:Math.min(100,completed/target*100)};
 const trends=[],records=[];
 for(const exercise of library(state)){
  const history=exposures(bounded.sessions,exercise.id),last=history.at(-1),prior=history.at(-2);
  if(last&&prior&&last.date>=start){
   const sameCount=last.sets.length===prior.sets.length;
   const sameLoad=sameCount&&last.sets.every((s,i)=>Math.abs(s.kg-prior.sets[i].kg)<.001);
   const reps=last.sets.reduce((n,s)=>n+s.reps,0),priorReps=prior.sets.reduce((n,s)=>n+s.reps,0);
   const loadGain=sameCount&&last.sets.every((s,i)=>s.kg>=prior.sets[i].kg&&s.reps>=prior.sets[i].reps)&&last.sets.some((s,i)=>s.kg>prior.sets[i].kg);
   if(sameLoad||loadGain)trends.push({exerciseId:exercise.id,name:exercise.name,date:last.date,previousDate:prior.date,reps,priorReps,sets:last.sets.length,load:Math.max(...last.sets.map(s=>s.kg)),repsGain:sameLoad?reps-priorReps:0,loadGain,effortComfortable:last.sets.every(s=>s.type!=='failure'&&(s.rir===null||s.rir>=1))});
  }
  const tracker=createRecordTracker();for(const exposure of history){
   const kinds=tracker.observe(exposure.sets);if(exposure.date>=start&&kinds.length)records.push({exerciseId:exercise.id,name:exercise.name,date:exposure.date,kinds});
  }
 }
 const weights=includeBody?weightComparison(state,start,through):null;
 const eligible=u.goals.filter(g=>createdDate(g.createdAt)<=through&&(includeBody||g.type!=='body'));
 if(includeBody&&!eligible.some(g=>g.type==='body')&&state.profile.targetWeight!==null&&state.weights.some(w=>w.date<=through)){
  const earliest=state.weights.filter(w=>w.date<=through).slice().sort((a,b)=>a.date.localeCompare(b.date))[0];
  eligible.push({id:'profile-body-target',type:'body',name:'Your body-weight target',target:state.profile.targetWeight,baseline:earliest.kg,createdAt:0});
 }
 const goals=eligible.map(g=>{const current=goalAt(state,g,through),prior=goalAt(state,g,previousEnd);return {...g,current,prior,newlyReached:current.reached&&!prior.reached,newThisWeek:createdDate(g.createdAt)>=start};});
 const milestones=[];const oldMilestones=new Map(achievements(before).map(m=>[m.id,m]));
 for(const m of achievements(bounded))if(!m.id.startsWith('plans-')&&m.value>=m.target&&(oldMilestones.get(m.id)?.value??0)<m.target)milestones.push({id:m.id,label:m.label,tier:m.tier,target:m.target,value:m.value});
 const progressing=trends.filter(t=>t.repsGain>0||t.loadGain).sort((a,b)=>Number(goals.some(g=>g.exerciseId===b.exerciseId))-Number(goals.some(g=>g.exerciseId===a.exerciseId))||Number(state.profile.priorities.includes(findExercise(state,b.exerciseId)?.muscle))-Number(state.profile.priorities.includes(findExercise(state,a.exerciseId)?.muscle)));
 const bodyPrimary=['fatloss','recomposition'].includes(state.profile.goal)||goals.some(g=>g.type==='body')&&!['strength','hypertrophy','balanced'].includes(state.profile.goal);
 const wins=[];
 for(const t of progressing)wins.push({key:'exercise-'+t.exerciseId,priority:(bodyPrimary?70:100)+(goals.some(g=>g.exerciseId===t.exerciseId)?8:state.profile.priorities.includes(findExercise(state,t.exerciseId)?.muscle)?3:0),type:'performance',exerciseId:t.exerciseId,title:t.name,detail:t.repsGain>0?`${t.priorReps} → ${t.reps} total reps across ${t.sets} sets at matching loads (${t.previousDate} → ${t.date}).`:`Working load increased without losing reps across ${t.sets} comparable sets (${t.previousDate} → ${t.date}).`});
 for(const r of records)if(!wins.some(w=>w.exerciseId===r.exerciseId))wins.push({key:'exercise-'+r.exerciseId,priority:85,type:'record',exerciseId:r.exerciseId,title:r.name+' record',detail:`New ${r.kinds.join(', ')} record on ${r.date}. Estimated strength, when included, uses 1–10 reps.`});
 if(consistency.met&&totals.workouts)wins.push({key:'consistency',priority:90,type:'consistency',title:scheduled.length?'Your scheduled sessions are complete':'Your weekly frequency target is met',detail:`${completed} of ${target} ${scheduled.length?'scheduled sessions matched to recorded workouts':'target sessions recorded'}.`});
 for(const g of goals){
  if(g.type==='body'&&weights?.smoothed&&weights.delta!==null&&g.baseline!==null&&g.baseline!==undefined){
   const direction=Math.sign(g.target-g.baseline),oldDistance=Math.max(0,direction*(g.target-weights.previousKg)),newDistance=Math.max(0,direction*(g.target-weights.currentKg)),closer=oldDistance-newDistance;
   if(closer>=.1)wins.push({key:'body-'+g.id,priority:bodyPrimary?110:75,type:'body',title:'Closer to '+g.name,detail:`Your recorded weekly average moved ${displayLoad(closer,state.profile.unit)} ${state.profile.unit} closer to the target. Based on ${weights.previousCount} previous-week and ${weights.currentCount} current-week measurements; short-term changes can include water and normal fluctuations.`,closerKg:closer});
  }
  if(g.newlyReached&&g.current.available)wins.push({key:'goal-'+g.id,priority:95,type:'goal',title:g.name+' target recorded',detail:g.type==='body'?'Your latest recorded weight meets this target. Watch the trend; this is not a body-composition measurement.':`Your recorded ${g.type==='e1rm'?'estimated strength':g.type==='workouts'?'workout count':'working load'} meets your target. No maximum-effort test is required.`});
 }
 for(const m of milestones.filter(m=>!m.id.startsWith('prs-')||!records.length))wins.push({key:'milestone-'+m.id,priority:60,type:'milestone',title:m.label+' · tier '+m.tier,detail:`${m.target} reached in the records through ${through}. Reopening this review does not award a duplicate.`});
 const distinct=[];for(const win of wins.sort((a,b)=>b.priority-a.priority)){if(distinct.some(w=>w.key===win.key||w.type==='body'&&win.type==='body'))continue;if(win.exerciseId&&distinct.filter(w=>w.exerciseId).length>=2)continue;distinct.push(win);if(distinct.length===3)break;}
 let headline=totals.workouts?'A week of recorded work.':'A quieter week in your journal.';
 if(!bounded.sessions.length)headline='Your first review starts here.';
 else if(distinct[0]?.type==='body')headline='Progress toward your weight target.';
 else if(progressing.length)headline=state.profile.goal==='strength'?'Your lifting records show progress.':'Your training is moving forward.';
 else if(consistency.met&&frequency.met&&totals.workouts)headline='A strong week of consistency.';
 const firstName=state.profile.name.trim().split(/\s+/)[0];
 let message;
 if(!totals.workouts)message=bounded.sessions.length?'No completed workouts are recorded in this week. That is a gap in the journal, not a judgment about your effort. Choose a manageable next session when it fits.':'As you save workouts, this review will connect your actual sets, performance and goals. There is no training baseline to evaluate yet.';
 else if(progressing.length)message=`${firstName?firstName+', ':''}${progressing[0].name} ${progressing[0].repsGain>0?'added '+progressing[0].repsGain+' total reps at the same recorded loads':'increased working load without losing reps'}. ${state.profile.goal==='hypertrophy'?'That supports your muscle-building process, but it does not measure muscle gained.':state.profile.goal==='strength'?'It is useful evidence toward your strength goal, not a tested maximum.':'Keep comparing the same movement and load convention.'} You recorded ${totals.sets} working sets across ${totals.workouts} ${totals.workouts===1?'workout':'workouts'}.`;
 else message=`${firstName?firstName+', ':''}you recorded ${totals.workouts} ${totals.workouts===1?'workout':'workouts'} and ${totals.sets} working sets toward ${GOALS[state.profile.goal]?.toLowerCase()||'your training goal'}. ${trends.length?'The latest comparable exposures do not show a rep or load increase. One unchanged or difficult comparison does not establish a plateau.':'More comparable exposures will help distinguish progress from a change in exercises, load or set count.'}`;
 const bodyWin=distinct.find(w=>w.type==='body');
 if(bodyWin&&(bodyPrimary||!progressing.length))message=`${firstName?firstName+', ':''}your recorded weight average moved from ${displayLoad(weights.previousKg,state.profile.unit)} to ${displayLoad(weights.currentKg,state.profile.unit)} ${state.profile.unit}, closer to your stated target. Short-term changes can include water and normal fluctuations; this does not measure fat or muscle gained or lost.${totals.workouts?' You also recorded '+totals.workouts+' workouts toward your training goal.':''}`;
 if(scheduled.length&&missed)message+=` ${missed} scheduled ${missed===1?'session has':'sessions have'} no matching workout; completed work still counts.`;
 if(weights?.delta!==null&&weights?.delta!==undefined&&!weights.smoothed)message+=' There are too few weight entries for a weekly-average comparison; isolated measurements can fluctuate.';
 if(scheduled.length&&target!==state.profile.days)message+=` Your profile target is ${state.profile.days} weekly sessions; ${totals.workouts} are recorded, separate from the ${scheduled.length} scheduled entries.`;
 const focus=[];
 if(!frequency.met||!consistency.met)focus.push(scheduled.length&&upcoming?`${upcoming} scheduled ${upcoming===1?'session remains':'sessions remain'} in this review week. Keep the plan manageable; avoid stacking missed sessions.`:`Plan ${state.profile.days} manageable sessions for the next week, or adjust the target to your available time.`);
 const bodyGoal=goals.find(g=>g.type==='body');
 if(bodyGoal&&focus.length<2)focus.push('Record weight under similar conditions and compare weekly averages. Do not try to repeat a particular weekly change.');
 const safeTrend=progressing.find(t=>t.effortComfortable&&!state.profile.excluded.includes(t.exerciseId)&&state.profile.equipment.includes(findExercise(state,t.exerciseId)?.equipment));
 if(!bodyPrimary&&safeTrend&&focus.length<2){
  const p=state.draft?.exercises.find(e=>e.exerciseId===safeTrend.exerciseId)||state.plans.flatMap(p=>p.exercises).find(e=>e.exerciseId===safeTrend.exerciseId);
  const latest=exposures(bounded.sessions,safeTrend.exerciseId).at(-1);
  const repRoom=p&&latest.sets.length>=p.sets&&latest.sets.every(s=>s.reps>=p.min)&&latest.sets.some(s=>s.reps<p.max);
  focus.push(repRoom?`Keep ${safeTrend.name} controlled at your saved targets. If it feels comfortable, aim for one more rep within the prescribed range; the load remains your choice.`:`Repeat ${safeTrend.name} with controlled reps and review its progression suggestion before changing the load.`);
 }
 if(focus.length<2&&totals.workouts)focus.push('Repeat your current targets and log effort when useful before making a larger program change.');
 const secondary=state.profile.secondaryGoals.filter(g=>g!==state.profile.goal).map(g=>GOALS[g]||g);
 return {version:1,start,end,through,previousStart,previousEnd,historical:end<asOf,partial:through<end,weekStartsOn:weekStartsOn(state),totals,priorTotals,consistency,frequency,goals,weights,trends,records,milestones,wins:distinct,headline,message,focus:focus.slice(0,2),primaryGoal:GOALS[state.profile.goal]||state.profile.goal,secondaryGoals:secondary};
}
export function weeklyReviewText(review){return [review.headline,`${review.start}–${review.end}${review.partial?'; so far through '+review.through:''}: ${review.totals.workouts} workouts, ${review.totals.sets} working sets; ${review.consistency.completed}/${review.consistency.target} ${review.consistency.scheduled?'scheduled':'weekly'} sessions.`,review.message,...review.wins.map(w=>w.title+': '+w.detail),'Focus: '+review.focus.join(' ')].join('\n\n');}
