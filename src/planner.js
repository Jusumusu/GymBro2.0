import { library } from './exercises.js';
import { uid } from './model.js';
import { goalRange } from './engine.js';
export function generatePlans(state){
 const p=state.profile;const all=library(state).filter(e=>p.equipment.includes(e.equipment)&&!p.excluded.includes(e.id));
 const [min,max]=goalRange(p.goal);const sets=p.experience==='beginner'||p.minutes<30?2:3;
 const split=p.split==='custom'?'full':p.split;
 const patterns=split==='upperlower'?[['horizontal push','horizontal pull','vertical push','vertical pull'],['squat','hinge','knee flexion','plantar flexion']]:split==='ppl'?[['horizontal push','vertical push','elbow extension'],['horizontal pull','vertical pull','elbow flexion'],['squat','hinge','plantar flexion']]:[['squat','horizontal push','horizontal pull','hinge','vertical push'],['hinge','vertical pull','horizontal push','squat','trunk flexion']];
 const names=split==='upperlower'?['Upper body','Lower body']:split==='ppl'?['Push','Pull','Legs']:['Full body A','Full body B'];
 const count=Math.min(p.days,names.length);
 return Array.from({length:count},(_,i)=>{const chosen=[];for(const pattern of patterns[i]){const candidates=all.filter(e=>e.pattern===pattern);const e=candidates.sort((a,b)=>Number(p.priorities.includes(b.muscle))-Number(p.priorities.includes(a.muscle)))[0];if(e)chosen.push(e);}
 const priority=all.find(e=>p.priorities.includes(e.muscle)&&!chosen.includes(e));if(priority)chosen.push(priority);
 const defaultDays=p.trainingDays.length?p.trainingDays:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].filter((_,d)=>[0,2,4,1,3,5,6].slice(0,p.days).includes(d));return {id:uid(),name:names[i],rationale:`${p.goal} routine using your available equipment, ${sets} working sets per exercise and an approximate ${p.minutes}-minute time budget. Adjust to your technique and response.`,suggestedDays:defaultDays.filter((_,d)=>d%count===i),exercises:chosen.slice(0,Math.max(2,Math.floor(p.minutes/9))).map(e=>({exerciseId:e.id,sets,min:e.compound?min:Math.max(8,min),max:e.compound?max:Math.max(12,max),restSeconds:p.goal==='strength'?180:120,strategy:p.goal==='strength'?'load':'double'}))};});
}
export function makeDraft(plan,date){return {id:uid(),planId:plan?.id??null,name:plan?.name||'Freestyle workout',date,startedAt:Date.now(),notes:'',readiness:null,exercises:(plan?.exercises||[]).map(p=>({...p,id:uid(),notes:'',entries:[...Array.from({length:p.warmups||0},()=>({id:uid(),kg:null,reps:null,rir:null,done:false,type:'warmup'})),...Array.from({length:p.sets},(_,i)=>({id:uid(),kg:null,reps:p.repTargets?.[i]??null,rir:null,done:false,type:'working'}))]}))};}
