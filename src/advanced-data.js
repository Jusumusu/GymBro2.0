import {calendarDate,addDays} from './calendar.js';
export const advancedDefaults=()=>({version:1,backup:{interval:'never',lastSuccessful:null,lastRequestedAt:null,lastReminderAt:null},blocks:[],feedback:[]});
export const advanced=state=>state.upgrade?.advanced||advancedDefaults();
const bad=()=>{throw Error('Invalid advanced training data. No records were changed.');};
const text=(s,max=100)=>typeof s==='string'&&s.length>0&&s.length<=max;
const instant=x=>Number.isFinite(x)&&x>=0&&x<=1e15;
const date=x=>{try{calendarDate(x);return true;}catch{return false;}};
export function validateAdvanced(a,exerciseIds){
 if(a===undefined)return;if(!a||a.version!==1)bad();
 const b=a.backup;if(!b||!['never','weekly','monthly','quarterly'].includes(b.interval)||![b.lastRequestedAt,b.lastReminderAt].every(x=>x===null||instant(x)))bad();
 if(b.lastSuccessful!==null){const r=b.lastSuccessful;if(!r||!instant(r.at)||!['file-saved','file-verified'].includes(r.evidence)||!['json','encrypted'].includes(r.type)||r.photosIncluded!==undefined&&typeof r.photosIncluded!=='boolean')bad();}
 if(!Array.isArray(a.blocks)||a.blocks.length>1000||!Array.isArray(a.feedback)||a.feedback.length>20000)bad();
 const ids=new Set();for(const block of a.blocks){if(!text(block.id)||ids.has(block.id)||!text(block.name,80)||!text(block.goal,80)||!date(block.startDate)||!Number.isInteger(block.duration)||block.duration<1||block.duration>52||!['active','paused','ended'].includes(block.status)||!['double','reps','load','maintain'].includes(block.progression))bad();ids.add(block.id);
  if(!Array.isArray(block.planIds)||!block.planIds.length||block.planIds.length>100||new Set(block.planIds).size!==block.planIds.length||!block.planIds.every(x=>text(x))||!Array.isArray(block.pauses)||block.pauses.length>1000||!Array.isArray(block.weeks)||block.weeks.length!==block.duration||!instant(block.createdAt))bad();
  let end=null;for(const p of block.pauses){if(!date(p.start)||p.end!==null&&(!date(p.end)||p.end<p.start)||end&&p.start<end)bad();end=p.end||'9999-12-31';}if(block.status==='paused'&&!block.pauses.some(p=>p.end===null)||block.status!=='paused'&&block.pauses.some(p=>p.end===null))bad();
  if(block.endedOn!==undefined&&!date(block.endedOn))bad();for(const w of block.weeks){if(typeof w.lighter!=='boolean'||!Number.isFinite(w.setFactor)||w.setFactor<.25||w.setFactor>1.5||!Number.isFinite(w.loadFactor)||w.loadFactor<.5||w.loadFactor>1.1||!Number.isInteger(w.min)||w.min<1||!Number.isInteger(w.max)||w.max<w.min||w.max>100||!Number.isInteger(w.rir)||w.rir<0||w.rir>10)bad();}
 }
 ids.clear();for(const n of a.feedback){if(!text(n.id)||ids.has(n.id)||!text(n.exerciseId)||exerciseIds&&!exerciseIds.has(n.exerciseId)||!text(n.sessionId)||!date(n.date)||!instant(n.at)||!instant(n.updatedAt)||!['good','difficult','equipment-uncomfortable','equipment-unavailable','technique','discomfort','note'].includes(n.category)||typeof n.text!=='string'||n.text.length>1000||typeof n.dismissed!=='boolean')bad();ids.add(n.id);}
}
const daysBetween=(a,b)=>Math.round((calendarDate(b)-calendarDate(a))/86400000);
export function blockWeek(block,on){
 calendarDate(on);if(on<block.startDate||block.endedOn&&on>block.endedOn)return null;
 let paused=0;for(const p of block.pauses){if(p.start>on)continue;const start=p.start<block.startDate?block.startDate:p.start,end=!p.end||p.end>on?on:p.end;if(end>start)paused+=daysBetween(start,end);}
 const week=Math.floor(Math.max(0,daysBetween(block.startDate,on)-paused)/7)+1;return week<=block.duration?week:null;
}
export function createBlock({id,name,goal,startDate,duration,planIds,progression='double',lighter=false},now=Date.now()){
 const range=goal==='strength'?[3,6]:goal==='endurance'?[12,20]:[8,12];
 const b={id,name:name.trim(),goal,startDate,duration,planIds:[...new Set(planIds)],progression,status:'active',createdAt:now,pauses:[],weeks:Array.from({length:duration},(_,i)=>({lighter:lighter&&i===duration-1,setFactor:lighter&&i===duration-1?.65:1,loadFactor:lighter&&i===duration-1?.9:1,min:range[0],max:range[1],rir:lighter&&i===duration-1?4:2}))};
 validateAdvanced({...advancedDefaults(),blocks:[b]});return b;
}
export function changeBlockStatus(block,status,on){calendarDate(on);if(on<block.startDate)throw Error('A block cannot be paused or ended before it starts.');if(block.status==='ended')throw Error('This block has ended. Duplicate it to start again.');
 if(status==='paused'&&block.status==='active'){block.pauses.push({start:on,end:null});block.status='paused';}
 else if(status==='active'&&block.status==='paused'){const p=block.pauses.at(-1);if(on<p.start)throw Error('Resume date precedes pause.');p.end=on;block.status='active';}
 else if(status==='ended'){if(block.status==='paused')block.pauses.at(-1).end=on;block.status='ended';block.endedOn=on;}
 else throw Error('Choose a valid block action.');
}
export function blockForPlan(state,planId,on){return advanced(state).blocks.find(b=>b.status==='active'&&b.planIds.includes(planId)&&blockWeek(b,on)!==null)||null;}
export function blockPlan(state,plan,on){const b=blockForPlan(state,plan.id,on);if(!b)return {plan,context:null};const week=blockWeek(b,on),target=b.weeks[week-1];return {plan:{...plan,exercises:plan.exercises.map(e=>({...e,sets:Math.max(1,Math.min(12,Math.round(e.sets*target.setFactor))),min:target.min,max:target.max,repTargets:[],strategy:b.progression}))},context:{version:1,blockId:b.id,blockName:b.name,week,target:structuredClone(target)}};}
export function blockProgress(state,block,on){const week=blockWeek(block,on),sessions=state.sessions.filter(s=>s.blockContext?.blockId===block.id&&s.date<=on);return {week,remaining:week===null?0:block.duration-week,completed:sessions.length,lighterWeek:block.weeks.findIndex((w,i)=>w.lighter&&i>=(week||1)-1)+1||null};}
export function nextFeedback(state,exerciseId){return [...advanced(state).feedback].filter(n=>n.exerciseId===exerciseId&&!n.dismissed&&(n.text.trim()||n.category!=='good')).sort((a,b)=>b.at-a.at||b.updatedAt-a.updatedAt)[0]||null;}
export function backupDue(state,now=Date.now()){
 const b=advanced(state).backup,days={weekly:7,monthly:30,quarterly:90}[b.interval];if(!days||!state.upgrade?.notifications?.enabled)return false;
 const baseline=b.lastSuccessful?.at??0;
 return now-baseline>=days*86400000&&(b.lastReminderAt===null||now-b.lastReminderAt>=7*86400000);
}
export function editBlockWeek(block,index,target,on){if(!Number.isInteger(index)||index<0||index>=block.duration)throw Error('Choose a valid week.');const current=blockWeek(block,on);if(block.status==='ended'||current!==null&&index<current||current===null&&on>=block.startDate)throw Error('Only future weeks can be changed. Completed targets stay intact.');const copy=structuredClone(block);copy.weeks[index]=target;validateAdvanced({...advancedDefaults(),blocks:[copy]});block.weeks[index]=structuredClone(target);}
export const blockEndDate=block=>addDays(block.startDate,block.duration*7-1+block.pauses.reduce((n,p)=>n+(p.end?daysBetween(p.start,p.end):0),0));
export function validateAdvancedSession(w){
 if(w.focusMode!==undefined&&typeof w.focusMode!=='boolean')bad();for(const k of ['focusExerciseId','focusSetId'])if(w[k]!==undefined&&w[k]!==null&&!text(w[k]))bad();
 if(w.restTimer!==undefined&&(!w.restTimer||w.restTimer.version!==1||!instant(w.restTimer.endsAt)))bad();
 if(w.timeAdaptation!==undefined){const a=w.timeAdaptation;if(!a||a.version!==1||!instant(a.at)||a.intentional!==true||!Number.isFinite(a.targetMinutes)||a.targetMinutes<5||a.targetMinutes>180)bad();}
 if(w.blockContext!==undefined){const c=w.blockContext,t=c?.target;if(!c||c.version!==1||!text(c.blockId)||!text(c.blockName,80)||!Number.isInteger(c.week)||c.week<1||c.week>52||!t||typeof t.lighter!=='boolean'||!Number.isFinite(t.setFactor)||t.setFactor<.25||t.setFactor>1.5||!Number.isFinite(t.loadFactor)||t.loadFactor<.5||t.loadFactor>1.1||!Number.isInteger(t.min)||t.min<1||!Number.isInteger(t.max)||t.max<t.min||t.max>100||!Number.isInteger(t.rir)||t.rir<0||t.rir>10)bad();}
 for(const e of w.exercises||[])for(const set of e.entries||[])if(set.deferredForTime!==undefined&&typeof set.deferredForTime!=='boolean')bad();
}
export function blockTrends(state,block,on){
 const sessions=state.sessions.filter(s=>s.blockContext?.blockId===block.id&&s.date<=on&&!s.timeAdaptation?.intentional&&!s.blockContext.target.lighter).sort((a,b)=>a.date.localeCompare(b.date)||a.startedAt-b.startedAt),byExercise=new Map();
 for(const s of sessions)for(const e of s.exercises){const values=e.entries.filter(x=>x.done&&x.type!=='warmup'&&x.kg>0&&x.reps>=1&&x.reps<=10).map(x=>x.kg*(1+x.reps/30));if(values.length){const list=byExercise.get(e.exerciseId)||[];list.push(Math.max(...values));byExercise.set(e.exerciseId,list);}}
 return [...byExercise].filter(([,values])=>values.length>=2).map(([exerciseId,values])=>({exerciseId,percent:(values.at(-1)/values[0]-1)*100})).slice(0,3);
}
