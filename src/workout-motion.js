import {activeSet} from './active-workout.js';
import {workoutProgress} from './workout-progress.js';

// Decorative motion observes committed state. It never reads or writes storage.
export function createWorkoutMotion({document:doc=document,window:win=window}={}){
 const reduced=win.matchMedia('(prefers-reduced-motion:reduce)'),running=new Set();let plane=null,target=null,stopped=false;
 const row=id=>id?doc.querySelector(`[data-set-row="${CSS.escape(id)}"]`):null;
 const rect=node=>{if(!node)return null;const r=node.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
 const visible=r=>{const v=win.visualViewport,top=v?.offsetTop||0,left=v?.offsetLeft||0;return r&&r.width>0&&r.height>0&&r.top>=top&&r.bottom<=top+(v?.height||win.innerHeight)&&r.left>=left&&r.right<=left+(v?.width||win.innerWidth);};
 function cancel(){for(const animation of running)animation.cancel();running.clear();plane?.remove();plane=null;target?.classList.remove('workout-motion-target');target=null;}
 function play(node,frames,options){if(!node||!node.animate||reduced.matches||stopped)return null;const animation=node.animate(frames,options);running.add(animation);animation.finished.catch(()=>{}).finally(()=>running.delete(animation));return animation;}
 function capture(state,{setId=null}={}){
  if(stopped||!state.draft||!doc.querySelector('.workout-list,.focus-workout'))return null;
  const active=activeSet(state.draft),source=row(active?.set.id),focus=doc.querySelector('[data-focus-exercise]'),clicked=row(setId);
  return {draftId:state.draft.id,activeId:active?.set.id||null,focus:!!focus,exerciseId:focus?.dataset.focusExercise,exerciseIndex:focus?state.draft.exercises.findIndex(e=>e.id===focus.dataset.focusExercise):-1,source:rect(source),clickedId:setId,clickedColor:clicked?win.getComputedStyle(clicked).backgroundColor:null,percent:workoutProgress(state.draft).percent,width:win.innerWidth};
 }
 function apply(before,state){
  cancel();if(!before||before.draftId!==state.draft?.id||reduced.matches||stopped)return;
  const active=activeSet(state.draft),focus=doc.querySelector('[data-focus-exercise]'),sameMode=before.focus===!!focus;
  const percent=workoutProgress(state.draft).percent,fill=doc.querySelector('.workout-progress-fill');
  if(fill&&before.percent!==percent)play(fill,[{transform:`scaleX(${before.percent/100})`},{transform:`scaleX(${percent/100})`}],{duration:240,easing:'ease-out'});
  if(!sameMode)return;
  if(focus&&before.exerciseId!==focus.dataset.focusExercise){const index=state.draft.exercises.findIndex(e=>e.id===focus.dataset.focusExercise),direction=index>=before.exerciseIndex?1:-1;play(focus,[{transform:`translateX(${direction*56}px)`,opacity:.78},{transform:'translateX(0)',opacity:1}],{duration:260,easing:'cubic-bezier(.2,.8,.25,1)'});return;}
  const next=row(active?.set.id),destination=rect(next);
  if(before.activeId!==active?.set.id&&next&&sameMode){
   if(!focus&&visible(before.source)&&visible(destination)&&Math.abs(before.width-win.innerWidth)<2){
    target=next;target.classList.add('workout-motion-target');plane=doc.createElement('span');plane.className='workout-motion-plane';plane.setAttribute('aria-hidden','true');Object.assign(plane.style,{left:before.source.left+'px',top:before.source.top+'px',width:before.source.width+'px',height:before.source.height+'px'});doc.body.append(plane);
    const overlay=plane,marked=target;const animation=play(overlay,[{transform:'translate(0,0) scale(1,1)'},{transform:`translate(${destination.left-before.source.left}px,${destination.top-before.source.top}px) scale(${destination.width/before.source.width},${destination.height/before.source.height})`}],{duration:300,easing:'cubic-bezier(.25,.8,.25,1)',fill:'forwards'});
    if(animation)animation.finished.catch(()=>{}).finally(()=>{overlay.remove();marked.classList.remove('workout-motion-target');if(plane===overlay)plane=null;if(target===marked)target=null;});else cancel();
   }else if(visible(destination))play(next,[{opacity:.7},{opacity:1}],{duration:150});
  }
  const clicked=row(before.clickedId);if(clicked&&visible(rect(clicked))&&before.clickedColor){const color=win.getComputedStyle(clicked).backgroundColor;if(color!==before.clickedColor)play(clicked,[{backgroundColor:before.clickedColor},{backgroundColor:color}],{duration:160,easing:'ease-out'});}
 }
 const scroll=event=>{if(event.target===doc||event.target===doc.scrollingElement||event.target===win)cancel();};
 doc.addEventListener('scroll',scroll,{capture:true,passive:true});win.addEventListener('resize',cancel);win.visualViewport?.addEventListener('resize',cancel);win.visualViewport?.addEventListener('scroll',cancel);if(reduced.addEventListener)reduced.addEventListener('change',cancel);else reduced.addListener(cancel);
 return {capture,apply,stop(){stopped=true;cancel();doc.removeEventListener('scroll',scroll,true);win.removeEventListener('resize',cancel);win.visualViewport?.removeEventListener('resize',cancel);win.visualViewport?.removeEventListener('scroll',cancel);if(reduced.removeEventListener)reduced.removeEventListener('change',cancel);else reduced.removeListener(cancel);}};
}
