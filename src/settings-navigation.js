// Approved B — Refined Categories. Category choice and unsaved form edits are UI
// state only; this controller never reads or writes the journal.
export const SETTINGS_CATEGORIES=Object.freeze([
 {id:'appearance',title:'Appearance',description:'Theme, coach style and haptics',symbol:'◒'},
 {id:'workout',title:'Workout preferences',description:'Rest, sounds and screen awake',symbol:'↗'},
 {id:'training',title:'Training profile',description:'Your profile, units and training tools',symbol:'◎'},
 {id:'notifications',title:'Notifications',description:'Permission and reminder timing',symbol:'◌'},
 {id:'calendar',title:'Calendar',description:'Sunday or Monday week start',symbol:'▦'},
 {id:'data',title:'Data and backup',description:'Backup, restore and your exports',symbol:'⇣'},
 {id:'app',title:'About and app',description:'Version, privacy and offline app',symbol:'i'}
].map(Object.freeze));
const ids=SETTINGS_CATEGORIES.map(category=>category.id);
export function settingsCategory(value){const id=String(value||'').replace(/^settings-/,'');return ids.includes(id)?id:null;}
export function nextSettingsCategory(current,key){const index=Math.max(0,ids.indexOf(current));if(key==='Home')return ids[0];if(key==='End')return ids.at(-1);if(key==='ArrowDown')return ids[(index+1)%ids.length];if(key==='ArrowUp')return ids[(index+ids.length-1)%ids.length];return null;}
const read=control=>({value:control.type==='select-multiple'?[...control.selectedOptions].map(option=>option.value):control.type==='checkbox'||control.type==='radio'?control.checked:control.value,canonical:control.dataset.canonical??null,currentUnit:control.dataset.currentUnit??null});
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const write=(control,snapshot)=>{if(control.type==='checkbox'||control.type==='radio')control.checked=snapshot.value;else if(control.type==='select-multiple')for(const option of control.options)option.selected=snapshot.value.includes(option.value);else control.value=snapshot.value;for(const key of ['canonical','currentUnit'])if(snapshot[key]===null)delete control.dataset[key];else control.dataset[key]=snapshot[key];};
function controls(root){return [...root.querySelectorAll('input[name],select[name],textarea[name]')].filter(control=>control.form?.id);}
function controlKey(control){const siblings=[...control.form.elements].filter(other=>other.name===control.name&&other.type===control.type&&(!['checkbox','radio'].includes(control.type)||other.value===control.value));return [control.form.id,control.name,control.type,['checkbox','radio'].includes(control.type)?control.value:'',siblings.indexOf(control)].join('\u0000');}
export function createSettingsNavigation({root:documentRoot=document}={}){
 let node=null,selected='appearance',stopped=false;const edits=new Map(),initial=new Map();
 function paint(){if(!node)return;node.dataset.settingsSelected=selected;for(const button of node.querySelectorAll('[data-settings-category]')){const current=button.dataset.settingsCategory===selected;button.setAttribute('aria-selected',String(current));button.tabIndex=current?0:-1;}for(const panel of node.querySelectorAll('[data-settings-panel]'))panel.hidden=panel.dataset.settingsPanel!==selected;}
 function select(id,{focus=false,scroll=false}={}){id=settingsCategory(id);if(!id||!node)return false;selected=id;paint();const tab=node.querySelector('[data-settings-category="'+id+'"]'),panel=node.querySelector('[data-settings-panel="'+id+'"]');if(focus==='panel')panel?.focus({preventScroll:true});else if(focus)tab?.focus({preventScroll:false});if(scroll)panel?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});return true;}
 function sync(){if(stopped)return;const next=documentRoot.querySelector('.settings-refined-categories');if(next!==node){node=next;if(node){const present=new Set();for(const control of controls(node)){const key=controlKey(control),fresh=read(control),edit=edits.get(key);present.add(key);initial.set(key,fresh);if(edit){if(same(fresh,edit.current))edits.delete(key);else if(same(fresh,edit.baseline))write(control,edit.current);else edits.delete(key);}}for(const key of edits.keys())if(!present.has(key))edits.delete(key);}}paint();}
 function click(event){const button=event.target.closest?.('[data-settings-category],[data-settings-anchor]');if(!button||!node||!node.contains(button))return;const id=settingsCategory(button.dataset.settingsCategory||button.dataset.settingsAnchor);if(!id)return;event.preventDefault();event.stopPropagation();select(id,{focus:'panel',scroll:true});}
 function key(event){const tab=event.target.closest?.('[data-settings-category]');if(!tab||!node?.contains(tab)||event.altKey||event.ctrlKey||event.metaKey)return;const id=nextSettingsCategory(tab.dataset.settingsCategory,event.key);if(id){event.preventDefault();select(id,{focus:true});}}
 function input(event){const control=event.target,form=control.form;if(!node?.contains(control)||!control.matches?.('input[name],select[name],textarea[name]')||!form?.id)return;
  // The existing unit handler also updates increment metadata synchronously.
  // Snapshot after that handler, without dispatching events or saving anything.
  queueMicrotask(()=>{if(stopped||!node?.contains(form))return;for(const field of controls(form)){const key=controlKey(field),value=read(field),baseline=initial.get(key);if(same(value,baseline))edits.delete(key);else edits.set(key,{baseline,current:value});}});
 }

 documentRoot.addEventListener('click',click,true);documentRoot.addEventListener('keydown',key);documentRoot.addEventListener('input',input);documentRoot.addEventListener('change',input);
 return {sync,select,get selected(){return selected;},stop(){stopped=true;documentRoot.removeEventListener('click',click,true);documentRoot.removeEventListener('keydown',key);documentRoot.removeEventListener('input',input);documentRoot.removeEventListener('change',input);node=null;edits.clear();initial.clear();}};
}
