import {calendarDate,addDays} from './calendar.js';
import {validateScheduling} from './recurrence.js';
const weekdays=['SU','MO','TU','WE','TH','FR','SA'];
const compact=s=>s.replaceAll('-','').replaceAll(':','');
const utc=ms=>new Date(ms).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
export const icsText=s=>String(s??'').replaceAll('\\','\\\\').replaceAll('\r\n','\n').replaceAll('\r','\n').replaceAll('\n','\\n').replaceAll(';','\\;').replaceAll(',','\\,');
export function foldLine(line){const chunks=[];let part='',size=0;for(const c of line){const bytes=new TextEncoder().encode(c).length;if(size+bytes>75){chunks.push(part);part=' ';size=1;}part+=c;size+=bytes;}chunks.push(part);return chunks.join('\r\n');}
function zoneFormatter(zone){if(typeof zone!=='string'||zone.length>100||!/^[A-Za-z0-9_+\-/]+$/.test(zone))throw Error('Choose a valid time zone.');try{return new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});}catch{throw Error('This time zone is not supported by this browser.');}}
const fields=(fmt,ms)=>Object.fromEntries(fmt.formatToParts(new Date(ms)).filter(x=>x.type!=='literal').map(x=>[x.type,Number(x.value)]));
function wallMs(fmt,ms){const p=fields(fmt,ms);return Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second);}
export function wallInstant(date,time,zone){calendarDate(date);if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw Error('Choose a valid workout time.');const fmt=zoneFormatter(zone),guess=Date.parse(date+'T'+time+':00Z'),offsets=new Set([-7,-1,0,1,7].map(d=>{const ms=guess+d*86400000;return wallMs(fmt,ms)-ms;})),matches=[...offsets].map(o=>guess-o).filter(ms=>wallMs(fmt,ms)===guess).sort((a,b)=>a-b);if(!matches.length)throw Error('A workout time does not exist during daylight saving. Review its scheduled time before export.');return matches[0];}
const offsetText=offset=>{const m=Math.abs(Math.round(offset/60000));return (offset<0?'-':'+')+String(Math.floor(m/60)).padStart(2,'0')+String(m%60).padStart(2,'0');};
export function timezoneLines(zone,startYear,endYear){const fmt=zoneFormatter(zone),start=Date.UTC(startYear-1,0,1),end=Date.UTC(endYear+2,0,1),offset=ms=>wallMs(fmt,ms)-ms;let previous=offset(start),cursor=start;const lines=['BEGIN:VTIMEZONE','TZID:'+zone,'BEGIN:STANDARD','DTSTART:'+utc(start+previous).slice(0,-1),'TZOFFSETFROM:'+offsetText(previous),'TZOFFSETTO:'+offsetText(previous),'END:STANDARD'];
 for(let ms=start+43200000;ms<=end;ms+=43200000){const next=offset(ms);if(next!==previous){let lo=cursor,hi=ms;while(hi-lo>60000){const mid=Math.floor((lo+hi)/120000)*60000;if(offset(mid)===previous)lo=mid;else hi=mid;}const transition=hi,type=next>previous?'DAYLIGHT':'STANDARD';lines.push('BEGIN:'+type,'DTSTART:'+utc(transition+previous).slice(0,-1),'TZOFFSETFROM:'+offsetText(previous),'TZOFFSETTO:'+offsetText(next),'END:'+type);previous=next;}cursor=ms;}
 lines.push('END:VTIMEZONE');return lines;
}
function alarm(minutes){if(minutes===null)return [];if(![0,15,30,60,1440].includes(minutes))throw Error('Choose a supported calendar reminder.');return ['BEGIN:VALARM','TRIGGER:-PT'+minutes+'M','ACTION:DISPLAY','DESCRIPTION:Workout reminder','END:VALARM'];}
const stamp=(date,time,zone,property='DTSTART')=>time?`${property};TZID=${zone}:${compact(date)}T${compact(time)}00`:`${property};VALUE=DATE:${compact(date)}`;
const uid=id=>'gymbro-'+encodeURIComponent(id)+'@gymbro.local';
// Bounded exports retain RRULEs. A horizon is explicit because static export is not a subscription.
export function exportCalendar(state,{from,through,timeZone,reminderMinutes=30,occurrenceId=null,now=Date.now()}={}){
 calendarDate(from);calendarDate(through);if(through<from||calendarDate(through)-calendarDate(from)>5*366*86400000)throw Error('Choose an export window of at most five years.');zoneFormatter(timeZone);validateScheduling(state.upgrade);
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Gym Bro//Workout Calendar//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH'],events=[];
 const title=o=>o.planName||state.plans.find(p=>p.id===o.planId)?.name||'Workout';
 const base=(id,o,start,_end,extra=[])=>['BEGIN:VEVENT','UID:'+uid(id),'DTSTAMP:'+utc(now),'SEQUENCE:0',stamp(start,o.time,timeZone),...(o.time?['DURATION:PT'+Math.min(150,Math.max(15,state.profile?.minutes||60))+'M']:[stamp(addDays(start,1),null,timeZone,'DTEND')]),'SUMMARY:'+icsText(title(o)),'DESCRIPTION:'+icsText('Gym Bro workout. One-way calendar export; reimporting may create duplicates. Private exercise feedback is not included.'),...extra,...alarm(reminderMinutes),'END:VEVENT'];
 for(const o of state.upgrade.schedule||[]){if(occurrenceId&&occurrenceId!=='one:'+o.id||o.date<from||o.date>through||o.canceled||o.status!=='planned')continue;if(o.time)wallInstant(o.date,o.time,timeZone);events.push(...base('one:'+o.id,o,o.date,null));}
 for(const r of state.upgrade.recurring||[]){const family=r.seriesKey||r.id;let last=[through,r.endDate||through,r.stoppedFrom?addDays(r.stoppedFrom,-1):through].sort()[0],first=r.startDate>from?r.startDate:from;
  const exceptions=(state.upgrade.scheduleExceptions||[]).filter(x=>x.seriesId===family&&x.originalDate>=r.startDate&&(!r.endDate||x.originalDate<=r.endDate)&&(!r.stoppedFrom||x.originalDate<r.stoppedFrom));
  if(occurrenceId){const at=occurrenceId.lastIndexOf('@'),original=occurrenceId.slice(at+1);if(occurrenceId.slice(0,at)!==family||original<r.startDate||r.endDate&&original>r.endDate||r.stoppedFrom&&original>=r.stoppedFrom||!r.weekdays.includes(calendarDate(original).getUTCDay()))continue;const x=exceptions.find(x=>x.originalDate===original),o={...r,date:original,...x};if(o.date<from||o.date>through||o.status==='canceled'||o.status==='skipped')continue;if(o.time)wallInstant(o.date,o.time,timeZone);events.push(...base(occurrenceId,o,o.date,null));continue;}
  if(first<=last){
  while(first<=last&&!r.weekdays.includes(calendarDate(first).getUTCDay()))first=addDays(first,1);if(first<=last){
  if(r.time)wallInstant(first,r.time,timeZone);
  const until=r.time?utc(wallInstant(last,'23:59',timeZone)):compact(last);
  const extra=['RRULE:FREQ=WEEKLY;BYDAY='+r.weekdays.map(d=>weekdays[d]).join(',')+';UNTIL='+until];
  for(const x of exceptions)if(x.originalDate>=first&&x.originalDate<=last)extra.push(stamp(x.originalDate,r.time,timeZone,'EXDATE'));
  events.push(...base('series:'+r.id,r,first,null,extra));}} 
  for(const x of exceptions)if(x.status==='planned'&&x.date>=from&&x.date<=through){const o={...r,...x};if(o.time)wallInstant(o.date,o.time,timeZone);events.push(...base('exception:'+x.id,o,o.date,null));}
 }
 if(!events.length)throw Error('No scheduled workouts are available in that export window.');
 lines.push(...timezoneLines(timeZone,Number(from.slice(0,4)),Number(through.slice(0,4))),...events,'END:VCALENDAR');return lines.map(foldLine).join('\r\n')+'\r\n';
}
