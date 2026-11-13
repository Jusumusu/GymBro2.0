import {calendarDate,addDays} from './calendar.js';
export const REMINDER_MINUTES=[0,15,30,60,1440];
export const localDate=instant=>{const d=new Date(instant);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const key=r=>r.seriesKey||r.id;
const dateOK=v=>{try{calendarDate(v);return true;}catch{return false;}};
const timeOK=v=>v===null||v===undefined||typeof v==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(v);
const reminderOK=v=>v===undefined||v===null||REMINDER_MINUTES.includes(v);
const string=v=>typeof v==='string'&&v.length>0&&v.length<=100;
export function validateScheduling(u){
 const list=(x,n)=>{if(!Array.isArray(x)||x.length>n)throw Error('Invalid scheduling data.');};
 const fields=x=>{if(!timeOK(x.time)||!reminderOK(x.reminderMinutes))throw Error('Invalid scheduled time or reminder.');};
 for(const x of u.schedule||[])fields(x);
 if(u.recurring!==undefined){list(u.recurring,2000);const ids=new Set();for(const r of u.recurring){if(!string(r.id)||ids.has(r.id)||!string(r.planId)||!dateOK(r.startDate)||r.endDate!==null&&r.endDate!==undefined&&(!dateOK(r.endDate)||r.endDate<r.startDate)||r.seriesKey!==undefined&&!string(r.seriesKey)||r.stoppedFrom!==undefined&&!dateOK(r.stoppedFrom))throw Error('Invalid recurring rule.');ids.add(r.id);if(!Array.isArray(r.weekdays)||!r.weekdays.length||r.weekdays.length>7||new Set(r.weekdays).size!==r.weekdays.length||r.weekdays.some(n=>!Number.isInteger(n)||n<0||n>6))throw Error('Choose at least one distinct weekday.');fields(r);}}
 if(u.scheduleExceptions!==undefined){list(u.scheduleExceptions,10000);const ids=new Set();for(const x of u.scheduleExceptions){if((typeof x.id!=='string'||!x.id||x.id.length>250)||ids.has(x.id)||!string(x.seriesId)||!dateOK(x.originalDate)||!dateOK(x.date)||!['planned','skipped','canceled'].includes(x.status)||x.id!==x.seriesId+'@'+x.originalDate||x.planId!==undefined&&!string(x.planId))throw Error('Invalid occurrence exception.');ids.add(x.id);fields(x);}}
 if(u.notifications!==undefined){const n=u.notifications;if(!n||typeof n.enabled!=='boolean'||!REMINDER_MINUTES.includes(n.defaultMinutes))throw Error('Invalid notification preferences.');list(n.delivered,500);const ids=new Set();for(const x of n.delivered){if(typeof x.id!=='string'||!x.id||x.id.length>250||ids.has(x.id)||!Number.isFinite(x.at)||x.at<0||x.at>1e15)throw Error('Invalid reminder delivery record.');ids.add(x.id);}}
}
function inRule(r,date){return date>=r.startDate&&(!r.endDate||date<=r.endDate)&&(!r.stoppedFrom||date<r.stoppedFrom);}
export function rulesOverlap(a,b){
 if(a.planId!==b.planId||(a.time||'')!==(b.time||''))return false;
 const start=a.startDate>b.startDate?a.startDate:b.startDate;
 const limits=[a.endDate,b.endDate,a.stoppedFrom?addDays(a.stoppedFrom,-1):null,b.stoppedFrom?addDays(b.stoppedFrom,-1):null].filter(Boolean);
 const end=limits.length?limits.sort()[0]:addDays(start,6);
 for(let i=0;i<7;i++){const date=addDays(start,i);if(date>end)return false;const day=calendarDate(date).getUTCDay();if(a.weekdays.includes(day)&&b.weekdays.includes(day))return true;}return false;
}
function occurrenceFrom(r,date,exception){return {...r,id:key(r)+'@'+date,seriesId:key(r),originalDate:date,date,kind:'recurring',status:'planned',...exception};}
export function getOccurrence(state,id){
 const u=state.upgrade;
 if(id.startsWith('one:')){const x=u.schedule.find(x=>x.id===id.slice(4));return x?{...x,id,sourceId:x.id,kind:'single',originalDate:x.date}:null;}
 const at=id.lastIndexOf('@'),seriesId=id.slice(0,at),date=id.slice(at+1);if(at<1||!dateOK(date))return null;
 const r=(u.recurring||[]).find(r=>key(r)===seriesId&&inRule(r,date)),x=(u.scheduleExceptions||[]).find(x=>x.id===id);
 if(!r||!r.weekdays.includes(calendarDate(date).getUTCDay())&&!x)return null;return occurrenceFrom(r,date,x);
}
export function occurrences(state,start,end){
 const span=Math.round((calendarDate(end)-calendarDate(start))/86400000);if(span<0||span>370)throw Error('Choose a calendar window of at most one year.');
 const u=state.upgrade,result=new Map();
 for(const x of u.schedule||[])if(x.date>=start&&x.date<=end)result.set('one:'+x.id,{...x,id:'one:'+x.id,sourceId:x.id,kind:'single',originalDate:x.date});
 for(const r of u.recurring||[]){let date=start>r.startDate?start:r.startDate;const last=r.endDate&&r.endDate<end?r.endDate:end;for(;date<=last;date=addDays(date,1)){if(!inRule(r,date)||!r.weekdays.includes(calendarDate(date).getUTCDay()))continue;const id=key(r)+'@'+date,x=(u.scheduleExceptions||[]).find(x=>x.id===id),o=occurrenceFrom(r,date,x);if(o.date>=start&&o.date<=end)result.set(id,o);}}
 for(const x of u.scheduleExceptions||[])if(x.date>=start&&x.date<=end){const o=getOccurrence(state,x.id);if(o)result.set(o.id,o);}
 const list=[...result.values()].sort((a,b)=>a.date.localeCompare(b.date)||(a.time||'').localeCompare(b.time||'')||a.id.localeCompare(b.id));
 const linked=new Map(state.sessions.filter(s=>s.scheduledOccurrenceId).map(s=>[s.scheduledOccurrenceId,s]));
 const used=new Set();for(const o of list){let session=linked.get(o.id);if(!session&&o.kind==='single'&&o.status==='planned')session=state.sessions.find(s=>!s.scheduledOccurrenceId&&!used.has(s.id)&&s.date===o.date&&(s.planId===o.planId||s.name===o.planName));if(session){o.completedSessionId=session.id;used.add(session.id);}}
 return list;
}
export function occurrenceStatus(o,today,now=Date.now()){
 if(o.completedSessionId)return 'completed';if(['skipped','canceled'].includes(o.status))return o.status;
 const instant=scheduledInstant(o);return o.date<today||o.date===today&&instant!==null&&instant<now?'missed':'upcoming';
}
export function scheduledInstant(o){
 if(!o.time)return null;const [year,month,day]=o.date.split('-').map(Number),[hour,minute]=o.time.split(':').map(Number),d=new Date(year,month-1,day,hour,minute);
 // A nonexistent DST wall time stays on the calendar; it has no shifted reminder.
 return d.getFullYear()===year&&d.getMonth()===month-1&&d.getDate()===day&&d.getHours()===hour&&d.getMinutes()===minute?d.getTime():null;
}
export function updateOccurrence(state,id,patch,scope='this',newId){
 const o=getOccurrence(state,id);if(!o)throw Error('This scheduled occurrence is no longer available.');
 if(scope==='this'&&state.sessions.some(s=>s.scheduledOccurrenceId===id))throw Error('This workout is completed. Edit its record from History.');
 if(o.kind==='single'){Object.assign(state.upgrade.schedule.find(x=>x.id===o.sourceId),patch);return;}
 if(scope==='this'){const list=state.upgrade.scheduleExceptions;const index=list.findIndex(x=>x.id===id);const x={...(index>=0?list[index]:{}),id,seriesId:o.seriesId,originalDate:o.originalDate,date:o.date,status:o.status,...patch};if(index>=0)list[index]=x;else list.push(x);return;}
 const rules=state.upgrade.recurring,r=rules.find(r=>key(r)===o.seriesId&&inRule(r,o.originalDate));
 const {date,status,...seriesPatch}=patch;
 if(scope==='series'){for(const item of rules.filter(x=>key(x)===o.seriesId))Object.assign(item,seriesPatch);return;}
 if(scope!=='future'||!string(newId))throw Error('Choose a valid series editing scope.');
 // Future segments retain the family key, so completed/exception identities do not change.
 for(const item of rules.filter(x=>key(x)===o.seriesId&&x.startDate>=o.originalDate))item.stoppedFrom=o.originalDate;
 const endDate=r.endDate;r.endDate=addDays(o.originalDate,-1);
 if(r.endDate<r.startDate){r.endDate=endDate;r.stoppedFrom=o.originalDate;}
 rules.push({...r,...seriesPatch,id:newId,seriesKey:o.seriesId,startDate:o.originalDate,endDate,stoppedFrom:undefined});
}
export function stopSeries(state,seriesId,from){calendarDate(from);for(const r of state.upgrade.recurring.filter(r=>key(r)===seriesId))r.stoppedFrom=r.stoppedFrom&&r.stoppedFrom<from?r.stoppedFrom:from;}
export function linkScheduledCompletion(state,session){
 if(session.scheduledOccurrenceId)return;
 const matches=occurrences(state,session.date,session.date).filter(o=>o.status==='planned'&&!o.completedSessionId&&o.planId===session.planId);
 if(matches.length===1)session.scheduledOccurrenceId=matches[0].id;
}
export function dueReminders(state,since,now){
 const n=state.upgrade.notifications;if(!n?.enabled||now<=since)return [];
 const delivered=new Set(n.delivered.map(x=>x.id)),start=addDays(localDate(now),-1),end=addDays(localDate(now),2);
 return occurrences(state,start,end).filter(o=>{if(o.status!=='planned'||o.completedSessionId||delivered.has(o.id)||o.reminderMinutes===null)return false;const at=scheduledInstant(o),minutes=o.reminderMinutes??n.defaultMinutes;if(at===null||at<now-(minutes===0?60000:0))return false;const due=at-minutes*60000;return due>since&&due<=now&&now-due<=120000;}).map(o=>({...o,dueAt:scheduledInstant(o)-(o.reminderMinutes??n.defaultMinutes)*60000})).sort((a,b)=>a.dueAt-b.dueAt).slice(0,3);
}
