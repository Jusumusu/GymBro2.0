const interactive='input,textarea,select,button,a,summary,[role=slider],[role=menu],[role=dialog],[contenteditable=true],canvas,svg';
export function swipeDirection({dx,dy,elapsed=0,width=390}){
 return elapsed<=900&&Math.abs(dx)>=Math.max(56,Math.min(90,width*.16))&&Math.abs(dx)>Math.abs(dy)*1.7?(dx<0?1:-1):0;
}
// Listeners belong to the current Focus surface; inputs and system-edge gestures are untouched.
export function createFocusGestures({navigate,document:doc=document}){
 let surface=null,start=null,busy=false;
 const down=e=>{start=null;if(e.pointerType==='mouse'||!e.isPrimary||e.target.closest(interactive)||e.clientX<28||e.clientX>doc.documentElement.clientWidth-28||doc.querySelector('dialog[open]'))return;start={id:e.pointerId,x:e.clientX,y:e.clientY,at:performance.now(),vertical:false};};
 const move=e=>{if(start?.id===e.pointerId&&Math.abs(e.clientY-start.y)>14&&Math.abs(e.clientY-start.y)>Math.abs(e.clientX-start.x))start.vertical=true;};
 const cancel=()=>{start=null;};
 const up=e=>{const from=start;start=null;if(!from||from.id!==e.pointerId||from.vertical||busy)return;const direction=swipeDirection({dx:e.clientX-from.x,dy:e.clientY-from.y,elapsed:performance.now()-from.at,width:surface.clientWidth});if(!direction)return;busy=true;Promise.resolve(navigate(direction)).catch(()=>{}).finally(()=>busy=false);};
 const key=e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest(interactive)||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();if(!busy){busy=true;Promise.resolve(navigate(e.key==='ArrowRight'?1:-1)).catch(()=>{}).finally(()=>busy=false);}};
 function detach(){if(!surface)return;for(const[type,fn]of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',cancel],['lostpointercapture',cancel],['keydown',key]])surface.removeEventListener(type,fn);surface=null;start=null;}
 function sync(){const next=doc.querySelector('.focus-workout');if(next===surface)return;detach();surface=next;if(surface){surface.tabIndex=-1;for(const[type,fn]of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',cancel],['lostpointercapture',cancel]])surface.addEventListener(type,fn,{passive:true});surface.addEventListener('keydown',key);}}
 return {sync,stop:detach};
}
export function createExerciseFollower({document:doc=document}={}){
 let node=null,selected=null,draftId=null,left=0;
 const remember=()=>{if(node?.isConnected)left=node.scrollLeft;};
 function sync(id){const next=doc.querySelector('.exercise-jump-nav');if(draftId!==id){left=0;selected=null;draftId=id;}const replaced=next!==node;if(replaced){node?.removeEventListener('scroll',remember);node=next;if(node){node.scrollLeft=left;node.addEventListener('scroll',remember,{passive:true});}}
  if(!node)return;const current=node.querySelector('[aria-current]'),key=current?.dataset.id;if(!current||key===selected)return;selected=key;
  const r=current.getBoundingClientRect(),bar=node.getBoundingClientRect();if(r.left>=bar.left+8&&r.right<=bar.right-8)return;
  const target=Math.max(0,Math.min(node.scrollWidth-node.clientWidth,node.scrollLeft+r.left-bar.left-(bar.width-r.width)/2));node.scrollTo({left:target,behavior:replaced||matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});left=target;
 }
 return {sync,capture:remember,stop:()=>{node?.removeEventListener('scroll',remember);node=null;}};
}
