import {browserShell,hydrateBrowser,renderBrowser} from './exercise-browser-ui.js';
import {recordSelection} from './exercise-browser.js';
export function closePlanBrowser(){const layer=document.querySelector('[data-library-layer]');if(!layer)return false;const form=layer.parentElement.querySelector('#plan-form'),trigger=layer._trigger;if(form)form.hidden=false;layer.remove();trigger?.focus({preventScroll:true});return true;}
export function createBrowserController({getState,commit,selectWorkout}){
 const rootFor=el=>el.closest('[data-exercise-browser]');
 function reset(root){root._filters={query:'',category:'',equipment:'',type:'',pattern:'',limit:30};root._favoritesOnly=false;root.querySelector('[data-browser-search]').value='';root.querySelectorAll('[data-browser-filter]').forEach(el=>el.value='');renderBrowser(root);}
 const actions={
  'browser-favorite':async b=>{const root=rootFor(b),id=b.dataset.id;await commit(s=>{const list=s.upgrade.exerciseBrowser.favorites;s.upgrade.exerciseBrowser.favorites=list.includes(id)?list.filter(x=>x!==id):[...list,id];},{draw:false,award:false});hydrateBrowser(root,getState());const target=[...root.querySelectorAll('[data-action=browser-favorite]')].find(el=>el.dataset.id===id&&el.offsetParent!==null)||root.querySelector('[data-action=browser-home]')||root.querySelector('[data-browser-search]');target?.focus({preventScroll:true});},
  'browser-category':b=>{const root=rootFor(b);root._favoritesOnly=false;root._filters.category=b.dataset.muscle;root._filters.query='';root._filters.limit=30;root.querySelector('[data-browser-search]').value='';const filter=root.querySelector('[data-browser-filter=category]');filter.value=b.dataset.muscle==='all'?'':b.dataset.muscle;renderBrowser(root);},
  'browser-home':b=>reset(rootFor(b)),
  'browser-favorites':b=>{const root=rootFor(b);reset(root);root._favoritesOnly=true;root._filters.category='all';renderBrowser(root);},
  'browser-more':b=>{const root=rootFor(b);root._filters.limit+=30;renderBrowser(root);},
  'browser-clear-search':b=>{const root=rootFor(b);root._filters.query='';root.querySelector('[data-browser-search]').value='';renderBrowser(root);root.querySelector('[data-browser-search]').focus({preventScroll:true});},
  'browser-clear-filters':b=>{const root=rootFor(b);Object.assign(root._filters,{category:'',equipment:'',type:'',pattern:'',limit:30});root._favoritesOnly=false;root.querySelectorAll('[data-browser-filter]').forEach(el=>el.value='');renderBrowser(root);},
  'browser-select':async b=>{const root=rootFor(b),id=b.dataset.id;if(root.dataset.context==='plan'){
   const row=document.getElementById(root.dataset.row),definition=root._state.customExercises.find(e=>e.id===id)||root._index.find(e=>e.exercise.id===id)?.exercise;if(!row||!definition)throw Error('This plan row is no longer available.');
   row.querySelector('[name=exerciseId]').value=id;row.querySelector('[data-plan-exercise-label]').textContent=definition.name;
   await commit(s=>recordSelection(s,id),{draw:false,award:false});closePlanBrowser();
  }else await selectWorkout(id,root.dataset.replace||null);},
  'plan-pick-exercise':b=>{const form=b.closest('#plan-form'),row=b.closest('.plan-edit-row'),dialog=form.closest('dialog');const layer=document.createElement('div');layer.dataset.libraryLayer='true';layer._trigger=b;layer.innerHTML='<button type="button" class="secondary" data-action="browser-back">← Back to program</button>'+browserShell({context:'plan',rowId:row.id});form.hidden=true;dialog.append(layer);hydrateBrowser(layer.querySelector('[data-exercise-browser]'),getState());layer.querySelector('[data-browser-search]').focus({preventScroll:true});},
  'browser-back':()=>closePlanBrowser()
 };
 return {actions,hydrate:root=>hydrateBrowser(root,getState()),input:el=>{const root=rootFor(el);if(!root||!el.matches('[data-browser-search]'))return false;root._filters.query=el.value;root._filters.limit=30;clearTimeout(root._searchTimer);root._searchTimer=setTimeout(()=>{if(root.isConnected)renderBrowser(root);},50);return true;},change:el=>{const root=rootFor(el);if(!root||!el.dataset.browserFilter)return false;root._filters[el.dataset.browserFilter]=el.value;root._filters.limit=30;renderBrowser(root);return true;}};
}
