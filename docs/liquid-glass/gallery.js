import './preview.js';
export const concepts={
 A:{name:'Aero',tag:'Liquid athletic',note:'Mineral blue, crisp Manrope type and a lifted control layer. Neutral graphite in the dark. The closest refinement of the existing light-mode structure.'},
 B:{name:'Index',tag:'Monochrome performance',note:'Geist, compact spacing, squared geometry and ruled surfaces. Active work uses strong ink; completion uses green. Glass stays quiet and functional.'},
 C:{name:'Morrow',tag:'Organic premium',note:'Warm ivory, softened typography and muted sage. More space around solid content surfaces; a warm charcoal partner for low-light training.'},
 D:{name:'Pulse',tag:'Modern sports',note:'Condensed athletic headlines, precise orange accents and a strong active-set marker. Small-radius geometry and a floating ribbon of controls.'},
 E:{name:'Still',tag:'Editorial glass',note:'Newsreader headlines, mineral teal and open ruled layouts. Restrained content surfaces make room for a more expressive translucent navigation layer.'}
};
const screens={workout:'Workout',active:'Active workout',gains:'Gains dashboard',library:'Exercise library',schedule:'Schedule',settings:'Settings',muscles:'Muscle map',review:'Weekly review',focus:'Focus Mode',blocks:'Training blocks',records:'Records & achievements',summary:'Completion summary',programs:'Programs',coach:'Coach',update:'App update',states:'Component states'};
const params=new URLSearchParams(location.search),valid=(key,values,fallback)=>values.includes(params.get(key))?params.get(key):fallback;
let concept=valid('concept',Object.keys(concepts),'A'),theme=valid('theme',['light','dark','pair'],innerWidth<760?'dark':'pair'),screen=valid('screen',Object.keys(screens),'workout'),glass=valid('glass',['solid','subtle','balanced','expressive','clear'],'balanced'),size=valid('size',['phone','desktop'],'phone'),compare=params.get('compare')==='1';
const solo=params.get('solo')==='1';if(solo){document.body.classList.add('solo');if(theme==='pair')theme='dark';}
document.querySelector('#concepts').innerHTML=Object.entries(concepts).map(([id,c])=>`<button type="button" data-concept="${id}" aria-pressed="${id===concept}"><strong><i>${id}</i>${c.name}</strong><small>${c.tag}</small></button>`).join('');
document.querySelector('#screen').innerHTML=Object.entries(screens).map(([id,name])=>`<option value="${id}">${name}</option>`).join('');
for(const [id,value]of Object.entries({theme,screen,glass,size}))document.getElementById(id).value=value;
const payload=await fetch('views.json').then(r=>{if(!r.ok)throw Error('Unable to load sample views');return r.json();});
const query=()=>new URLSearchParams({concept,theme,screen,glass,size,...(compare?{compare:'1'}:{}),...(solo?{solo:'1'}:{})});
function render(){
 const q=query();history.replaceState(null,'','?'+q);q.set('solo','1');q.delete('compare');if(q.get('theme')==='pair')q.set('theme','dark');document.querySelector('#solo').href='?'+q;
 document.querySelectorAll('#concepts button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.concept===concept)));
 document.querySelector('#direction').innerHTML=`<strong>${concept} / ${concepts[concept].name}</strong><p>${concepts[concept].note}</p>`;
 const target=document.querySelector('#previews');target.dataset.size=size;target.dataset.compare=compare;target.replaceChildren();
 document.querySelector('#compare').textContent=compare?'Return to one concept':'Compare all five';
 for(const id of compare?Object.keys(concepts):[concept])for(const mode of theme==='pair'?['light','dark']:[theme]){
  const section=document.createElement('section');section.className='preview-unit';section.innerHTML=`<h2>${id} / ${concepts[id].name}<span>${mode} · ${glass} glass</span></h2>`;
  const p=document.createElement('gymbro-preview');p.dataset.concept=id;p.dataset.theme=mode;p.dataset.glass=glass;p.payload=payload;p.screen=screen;section.append(p);target.append(section);
 }
}
document.querySelector('#concepts').addEventListener('click',e=>{const b=e.target.closest('[data-concept]');if(b){concept=b.dataset.concept;render();}});
for(const id of ['screen','theme','glass','size'])document.getElementById(id).addEventListener('change',e=>{if(id==='screen')screen=e.target.value;if(id==='theme')theme=e.target.value;if(id==='glass')glass=e.target.value;if(id==='size')size=e.target.value;render();});
document.querySelector('#compare').onclick=()=>{compare=!compare;render();};
render();globalThis.reviewReady=true;
