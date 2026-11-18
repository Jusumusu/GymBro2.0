// Exactly one repaint interval, suspended when hidden. No countdown state lives here.
export function createRestClock({paint,window:win=window,document:doc=document,setInterval:every=setInterval,clearInterval:clear=clearInterval}){
 let interval=null,started=false;
 const stopTicks=()=>{if(interval!==null)clear(interval);interval=null;};
 const wake=()=>{if(!started)return;paint();stopTicks();if(doc.visibilityState!=='hidden')interval=every(paint,1000);};
 const hide=()=>stopTicks();
 function start(){if(started){wake();return;}started=true;win.addEventListener('pageshow',wake);win.addEventListener('focus',wake);win.addEventListener('pagehide',hide);doc.addEventListener('visibilitychange',wake);wake();}
 function stop(){started=false;stopTicks();win.removeEventListener('pageshow',wake);win.removeEventListener('focus',wake);win.removeEventListener('pagehide',hide);doc.removeEventListener('visibilitychange',wake);}
 return {start,stop,paint:wake};
}
