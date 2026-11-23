import {workoutProgress} from './workout-progress.js';
export function createWorkoutWakeLock({getState,navigator:nav=navigator,document:doc=document,secure=globalThis.isSecureContext,onStatus=()=>{}}){
 let sentinel=null,pending=null,revision=0,blocked=false,stopped=false,status='off',preference=false;
 const supported=!!secure&&!!nav.wakeLock?.request;
 const wanted=()=>{const s=getState();return !stopped&&s.profile?.keepScreenAwake===true&&!!s.draft&&!s.draft.editingId&&!workoutProgress(s.draft).complete&&doc.visibilityState==='visible';};
 const report=value=>{status=value;onStatus(value);};
 async function release(){const old=sentinel;sentinel=null;if(old&&!old.released)try{await old.release();}catch{} }
 async function sync({retry=false}={}){
  const enabled=getState().profile?.keepScreenAwake===true;if(enabled!==preference){preference=enabled;blocked=false;revision++;}if(retry)blocked=false;
  if(!supported){report(enabled?'unsupported':'off');return;}
  if(!wanted()){revision++;await release();report(enabled?(doc.visibilityState==='visible'?'ready':'hidden'):'off');return;}
  if(sentinel&&!sentinel.released){report('active');return;}if(pending||blocked)return;
  const version=revision;report('requesting');
  pending=(async()=>{try{const lock=await nav.wakeLock.request('screen');if(version!==revision||!wanted()){try{await lock.release();}catch{}return;}sentinel=lock;lock.addEventListener('release',()=>{if(sentinel===lock){sentinel=null;blocked=true;report('released');}},{once:true});report('active');}catch{blocked=true;report('unavailable');}finally{pending=null;if(version!==revision&&wanted())sync();}})();await pending;
 }
 const visibility=()=>sync({retry:true});doc.addEventListener('visibilitychange',visibility);
 function stop(){stopped=true;revision++;doc.removeEventListener('visibilitychange',visibility);release();}
 return {sync,stop,getStatus:()=>status,supported};
}
