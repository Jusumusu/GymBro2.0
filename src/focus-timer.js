// The persisted deadline is authoritative. Ticks only repaint; they never subtract time.
const validNow=now=>{if(!Number.isFinite(now)||now<0)throw Error('Invalid timer clock.');};
export function startRest(seconds,now=Date.now()){
 if(!Number.isInteger(seconds)||seconds<1||seconds>3600)throw Error('Choose 1–3600 rest seconds.');validNow(now);
 return {version:1,endsAt:now+seconds*1000,durationSeconds:seconds};
}
export function remainingMilliseconds(timer,now=Date.now()){
 if(!timer)return 0;validNow(now);
 return Math.max(0,timer.pausedRemainingMs??timer.endsAt-now);
}
export const remainingRest=(timer,now=Date.now())=>Math.ceil(remainingMilliseconds(timer,now)/1000);
export const restPhase=(timer,now=Date.now())=>!timer?'idle':remainingRest(timer,now)===0?'complete':timer.pausedRemainingMs!==undefined?'paused':'running';
export function pauseRest(timer,now=Date.now()){
 if(!timer||restPhase(timer,now)!=='running')return timer;
 return {...timer,pausedRemainingMs:remainingMilliseconds(timer,now)};
}
export function resumeRest(timer,now=Date.now()){
 if(!timer||timer.pausedRemainingMs===undefined)return timer;validNow(now);
 const {pausedRemainingMs,...running}=timer;return {...running,endsAt:now+pausedRemainingMs};
}
export function resetRest(timer,fallbackSeconds=90,now=Date.now()){
 return startRest(timer?.durationSeconds??fallbackSeconds,now);
}
export function adjustRest(timer,deltaSeconds,now=Date.now()){
 if(!timer||!Number.isInteger(deltaSeconds)||Math.abs(deltaSeconds)>3600)throw Error('Invalid rest adjustment.');
 const milliseconds=Math.min(3600000,Math.max(1000,remainingMilliseconds(timer,now)+deltaSeconds*1000));
 return {...timer,endsAt:now+milliseconds,...(timer.pausedRemainingMs!==undefined?{pausedRemainingMs:milliseconds}:{})};
}
