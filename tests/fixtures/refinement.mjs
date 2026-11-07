import {initialState} from '../../src/model.js';
import {migrateState} from '../../src/extensions.js';
import {weekStart,addDays,calendarDate} from '../../src/calendar.js';
export function refinementFixture(today){
 const s=migrateState(initialState()),start=weekStart(today,1),offset=Math.round((calendarDate(today)-calendarDate(start))/86400000);
 s.profile={name:'Jordan Example',goal:'hypertrophy',experience:'intermediate',days:3,minutes:60,unit:'kg',incrementKg:2.5,split:'full',equipment:['barbell','dumbbell','machine','cable','bodyweight'],excluded:[],priorities:['Chest'],secondaryGoals:['strength','fitness'],trainingDays:['Mon','Wed','Fri'],restrictions:'',auto:true,timer:false,restSeconds:120,targetWeight:80};
 s.plans=[{id:'routine',name:'Full body A',exercises:[{exerciseId:'bench',sets:3,min:6,max:10,restSeconds:120},{exerciseId:'squat',sets:3,min:6,max:10},{exerciseId:'row',sets:3,min:8,max:12}]}];
 for(let week=-3;week<=0;week++)for(let day=0;day<3;day++){
  const date=addDays(start,week*7+(week===0?Math.min(day*2,offset):day*2)),id=`week-${week}-${day}`;
  s.sessions.push({id,name:'Full body A',planId:'routine',date,startedAt:Date.parse(date+'T10:00:00Z')+day*60000,finishedAt:Date.parse(date+'T11:00:00Z')+day*60000,notes:'Synthetic QA record',readiness:3,exercises:['bench','squat','row'].map((exerciseId,index)=>({id:id+'-'+index,exerciseId,sets:3,min:6,max:10,notes:'',entries:Array.from({length:3},(_,i)=>({id:'set-'+i,kg:exerciseId==='squat'?40:20,reps:Math.max(6,Math.min(10,7+week+day)),rir:2,type:'working',done:true}))}))});
 }
 s.weights=[{date:addDays(start,-6),kg:90},{date:addDays(start,-3),kg:89.8},{date:addDays(start,Math.min(1,offset)),kg:88.8},{date:addDays(start,Math.min(4,offset)),kg:88.6}].filter((w,i,all)=>all.findLastIndex(x=>x.date===w.date)===i);
 s.measurements=[{date:addDays(start,-2),name:'Waist',cm:85},{date:today,name:'Waist',cm:84}];
 s.upgrade.goals=[{id:'body',name:'Reach my recorded weight target',type:'body',target:80,baseline:90,createdAt:Date.parse(addDays(start,-30)+'T12:00:00Z')},{id:'lift',name:'Bench working-load target',type:'load',exerciseId:'bench',target:30,createdAt:Date.parse(addDays(start,-30)+'T12:00:00Z')},{id:'consistency',name:'Complete fifteen recorded workouts',type:'workouts',target:15,createdAt:Date.parse(addDays(start,-30)+'T12:00:00Z')}];
 s.upgrade.schedule=[0,1,2].map((i)=>({id:'scheduled-'+i,planId:'routine',planName:'Full body A',date:addDays(start,Math.min(i*2,offset)),status:'planned'}));
 s.photos=[{id:'synthetic-photo',date:today,view:'front'}];
 return s;
}
