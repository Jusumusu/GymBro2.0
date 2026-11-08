// Calendar dates are values, not instants. UTC noon arithmetic avoids DST shifts.
export const weekStartsOn=state=>state.upgrade?.weekStartsOn===0?0:1;
export function calendarDate(value){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))throw Error('Choose a valid calendar date.');
 const date=new Date(value+'T12:00:00Z');
 if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==value)throw Error('Choose a valid calendar date.');
 return date;
}
export function addDays(value,count){const date=calendarDate(value);date.setUTCDate(date.getUTCDate()+count);return date.toISOString().slice(0,10);}
export function weekStart(value,firstDay=1){if(![0,1].includes(firstDay))throw Error('Start of week must be Sunday or Monday.');const date=calendarDate(value);return addDays(value,-((date.getUTCDay()-firstDay+7)%7));}
export const weekStartFor=(state,date)=>weekStart(date,weekStartsOn(state));
export const weekRange=(date,firstDay=1)=>{const start=weekStart(date,firstDay);return {start,end:addDays(start,6)};};
export const weekLabels=(firstDay=1)=>Array.from({length:7},(_,i)=>['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][(i+firstDay)%7]);
