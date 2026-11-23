import {remainingRest,restPhase} from './focus-timer.js';
// Deadline sampling emits only the current second, never a backlog after suspension.
export function createRestSignalTracker(){
 let id=null,seen=new Set(),completed=false,last=null;
 return {sample(timer,{now=Date.now(),visible=true,key='legacy'}={}){
  if(!timer){id=null;last=null;seen.clear();completed=false;return [];}
  const next=timer.id||key,n=remainingRest(timer,now),phase=restPhase(timer,now);if(next!==id){id=next;seen=new Set();completed=n===0;last=null;}
  const events=[];
  if(phase==='running'&&visible&&n<=5&&!seen.has(n)){seen.add(n);events.push({type:'countdown',second:n});}
  if(n===0&&!completed){completed=true;if(visible&&last?.visible&&last.phase==='running'&&last.n>0&&last.n<=5&&now-last.at<2200)events.push({type:'complete'});}
  last={at:now,n,phase,visible};return events;
 },reset(){id=null;last=null;seen.clear();completed=false;}};
}
export function createRestAlerts({getState,window:win=window,document:doc=document,navigator:nav=navigator,onStatus=()=>{}}){
 const tracker=createRestSignalTracker();let audio=null,arming=null,stopped=false,lastTimerKey=null;const voices=new Set();
 const prefs=()=>getState().profile||{};
 const report=value=>onStatus(value);
 function silence(){for(const voice of voices)try{voice.stop();}catch{}voices.clear();}
 function arm({force=false}={}){
  if(stopped||!force&&!prefs().restCountdownSound&&!prefs().restCompletionSound)return;
  const Audio=win.AudioContext||win.webkitAudioContext;if(!Audio){report('unsupported');return;}
  try{audio||=new Audio();if(audio.state==='running'){report('ready');return;}if(!arming)arming=audio.resume().then(()=>report(audio.state==='running'?'ready':'blocked')).catch(()=>report('blocked')).finally(()=>arming=null);}catch{report('blocked');}
 }
 function tone(complete){if(audio?.state!=='running'){report('blocked');return;}try{const oscillator=audio.createOscillator(),gain=audio.createGain(),at=audio.currentTime;oscillator.type='sine';oscillator.frequency.setValueAtTime(complete?880:660,at);if(complete)oscillator.frequency.setValueAtTime(1175,at+.12);gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.075,at+.008);gain.gain.exponentialRampToValueAtTime(.001,at+(complete?.32:.075));oscillator.connect(gain);gain.connect(audio.destination);voices.add(oscillator);oscillator.onended=()=>{voices.delete(oscillator);oscillator.disconnect();gain.disconnect();};oscillator.start(at);oscillator.stop(at+(complete?.34:.09));}catch{report('blocked');}}
 function tick(now=Date.now()){
  const s=getState(),p=prefs(),timer=s.draft?.restTimer,visible=doc.visibilityState==='visible',timerKey=timer?(timer.id||s.draft.id+':legacy'):null;if(timerKey!==lastTimerKey){silence();lastTimerKey=timerKey;}if(!visible||!timer||restPhase(timer,now)!=='running')silence();
  const events=tracker.sample(timer,{now,visible,key:s.draft?.id||'legacy'});for(const event of events){if(event.type==='countdown'&&p.restCountdownSound)tone(false);if(event.type==='complete'){if(p.restCompletionSound)tone(true);if(p.restVibration&&s.upgrade?.haptics&&nav.vibrate)try{nav.vibrate([100,60,180]);}catch{}}}
  if(!p.restCountdownSound&&!p.restCompletionSound)silence();return events;
 }
 const visibility=()=>{if(doc.visibilityState!=='visible')silence();tick();};doc.addEventListener('visibilitychange',visibility);
 return {arm,tick,silence,stop(){stopped=true;silence();doc.removeEventListener('visibilitychange',visibility);audio?.close().catch(()=>{});}};
}
