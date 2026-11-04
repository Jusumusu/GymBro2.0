import { library } from './exercises.js';
import { uid } from './model.js';
import { goalRange } from './engine.js';
export function generatePlans(state){
 const p=state.profile;const all=library(state).filter(e=>p.equipment.includes(e.equipment)&&!p.excluded.includes(e.id));
 const [min,max]=goalRange(p.goal);const sets=p.experience==='beginner'?2:3;
 const split=p.split==='custom'?'full':p.split;
 const patterns=split==='upperlower'?[['horizontal push','horizontal pull','vertical push','vertical pull'],['squat','hinge','knee flexion','plantar flexion']]:split==='ppl'?[['horizontal push','vertical push','elbow extension'],['horizontal pull','vertical pull','elbow flexion'],['squat','hinge','plantar flexion']]:[['squat','horizontal push','horizontal pull','hinge','vertical push'],['hinge','vertical pull','horizontal push','squat','trunk flexion']];
 const names=split==='upperlower'?['Upper body','Lower body']:split==='ppl'?['Push','Pull','Legs']:['Full body A','Full body B'];
 const count=Math.min(p.days,names.length);
 return Array.from({length:count},(_,i)=>{const chosen=[];for(const pattern of patterns[i]){const candidates=all.filter(e=>e.pattern===pattern);const e=candidates.sort((a,b)=>Number(p.priorities.includes(b.muscle))-Number(p.priorities.includes(a.muscle)))[0];if(e)chosen.push(e);}
 const priority=all.find(e=>p.priorities.includes(e.muscle)&&!chosen.includes(e));if(priority)chosen.push(priority);
 return {id:uid(),name:names[i],exercises:chosen.slice(0,Math.max(3,Math.floor(p.minutes/9))).map(e=>({exerciseId:e.id,sets,min:e.compound?min:Math.max(8,min),max:e.compound?max:Math.max(12,max)}))};});
}
export function makeDraft(plan,date){return {id:uid(),name:plan?.name||'Freestyle workout',date,startedAt:Date.now(),notes:'',readiness:null,exercises:(plan?.exercises||[]).map(p=>({...p,id:uid(),notes:'',entries:Array.from({length:p.sets},()=>({id:uid(),kg:null,reps:null,rir:null,done:false,type:'working'}))}))};}
