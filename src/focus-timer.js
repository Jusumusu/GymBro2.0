// Timestamp-based state survives navigation/suspension; intervals only repaint the UI.
export function startRest(seconds,now=Date.now()){if(!Number.isInteger(seconds)||seconds<1||seconds>3600||!Number.isFinite(now)||now<0)throw Error('Choose 1–3600 rest seconds.');return {version:1,endsAt:now+seconds*1000};}
export function remainingRest(timer,now=Date.now()){return timer?Math.max(0,Math.ceil((timer.endsAt-now)/1000)):0;}
export function adjustRest(timer,deltaSeconds,now=Date.now()){if(!Number.isInteger(deltaSeconds)||Math.abs(deltaSeconds)>3600)throw Error('Invalid rest adjustment.');return startRest(Math.min(3600,Math.max(1,remainingRest(timer,now)+deltaSeconds)),now);}
