// Clear optical rim. No page capture, duplicate content, journal access or animation loop.
const SELECTOR='.mobile-nav,.exercise-glass-frame,.exercise-jump-nav,.advanced-rest,.sidebar nav,.optical-demo-lens';
const NS='http://www.w3.org/2000/svg';
let nextId=0;
export function lensMap(width,height,radius){
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width>1600||height>800||!Number.isFinite(radius)||radius<0)throw Error('Invalid glass bounds');
 const r=Math.min(radius,width/2,height/2),rim=Math.min(12,height*.2),data=new Uint8ClampedArray(width*height*4);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const px=x+.5-width/2,py=y+.5-height/2,qx=Math.abs(px)-(width/2-r),qy=Math.abs(py)-(height/2-r),ax=Math.max(qx,0),ay=Math.max(qy,0),length=Math.hypot(ax,ay),distance=length+Math.min(Math.max(qx,qy),0)-r;
  let nx=0,ny=0;if(qx>0&&qy>0){nx=Math.sign(px)*ax/length;ny=Math.sign(py)*ay/length;}else if(qx>qy)nx=Math.sign(px);else ny=Math.sign(py);
  const t=Math.max(0,Math.min(1,-distance/rim)),bend=distance<=0?(1-t)**2:0,i=(y*width+x)*4;
  data[i]=128+nx*bend*120;data[i+1]=128+ny*bend*120;data[i+2]=128;data[i+3]=255;
 }
 return data;
}
export function createLiquidGlass(root=document){
 const ua=navigator.userAgent,safari=/Safari/.test(ua)&&!/Chrome|Chromium|Edg|OPR/.test(ua);
 const supported=!safari&&/Chrome|Chromium|Edg|OPR/.test(ua)&&globalThis.CSS?.supports('backdrop-filter','url("#glass-test")')&&globalThis.ResizeObserver;
 const motion=matchMedia('(prefers-reduced-motion:reduce)'),transparency=matchMedia('(prefers-reduced-transparency:reduce)'),entries=new Map(),cache=new Map(),pending=new Set(),selections=new Map(),impulses=new Map();let svg=null,defs=null,frame=null,stopped=false;
 const element=(name,attrs)=>{const e=document.createElementNS(NS,name);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;};
 const play=(target,keyframes,options)=>{if(motion.matches||typeof target.animate!=='function')return null;const animation=target.animate(keyframes,options);animation.finished.catch(()=>{});return animation;};
 function optics(node){
  if(stopped||!node.isConnected||!supported)return;const bounds=node.getBoundingClientRect();if(bounds.width<1||bounds.height<1)return;
  const width=Math.min(1600,Math.ceil(bounds.width)),height=Math.min(800,Math.ceil(bounds.height)),radius=Math.min(parseFloat(getComputedStyle(node).borderTopLeftRadius)||0,width/2,height/2),key=width+':'+height+':'+radius;
  let filter=cache.get(key);if(!filter){
   const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const context=canvas.getContext('2d');if(!context)return;
   context.putImageData(new ImageData(lensMap(width,height,radius),width,height),0,0);
   if(!svg){svg=element('svg',{width:0,height:0,'aria-hidden':'true',focusable:'false','data-glass-optics':'true'});svg.style.position='absolute';defs=element('defs',{});svg.append(defs);document.body.append(svg);}
   const id='gymbro-glass-'+(++nextId);filter=element('filter',{id,filterUnits:'userSpaceOnUse',x:0,y:0,width:bounds.width,height:bounds.height,'color-interpolation-filters':'sRGB'});
   filter.append(element('feImage',{href:canvas.toDataURL(),x:0,y:0,width:bounds.width,height:bounds.height,preserveAspectRatio:'none',result:'rim'}),element('feDisplacementMap',{in:'SourceGraphic',in2:'rim',scale:14,xChannelSelector:'R',yChannelSelector:'G'}));defs.append(filter);cache.set(key,filter);
  }
  const reference=new URL(location.href);reference.hash=filter.id;node.style.setProperty('--glass-optics',`url("${reference.href}") blur(var(--glass-blur)) saturate(1.15)`);
 }
 function select(entry,animate=true){
  const node=entry.rail;if(!entry.indicator)return;const selected=node.querySelector('a[aria-current],button[aria-current]');if(!selected)return;
  const bounds=node.getBoundingClientRect(),rect=selected.getBoundingClientRect();if(!bounds.width||!rect.width)return;
  const key=node.matches('.mobile-nav')?'main':'exercise',id=selected.hash||selected.dataset.id||selected.textContent,next={id,x:rect.left-bounds.left-1+node.scrollLeft,y:rect.top-bounds.top-1+node.scrollTop,width:rect.width,height:rect.height,barWidth:bounds.width},prior=selections.get(key),indicator=entry.indicator;
  indicator.style.left='0';indicator.style.top=next.y+'px';indicator.style.width=next.width+'px';indicator.style.height=next.height+'px';indicator.style.transform=`translateX(${next.x}px)`;entry.selectionAnimation?.cancel();
  if(animate&&prior&&prior.id!==next.id&&Math.abs(prior.barWidth-next.barWidth)<2){const dx=next.x-prior.x;entry.selectionAnimation=play(indicator,[{transform:`translateX(${prior.x}px) scaleX(${prior.width/next.width})`},{transform:`translateX(${prior.x+dx*.65}px) scale(1.18,.94)`,offset:.42},{transform:`translateX(${next.x+dx*.025}px) scale(.97,1.025)`,offset:.77},{transform:`translateX(${next.x}px) scale(1)`}],{duration:520,easing:'cubic-bezier(.2,.75,.25,1)'});}
  selections.set(key,next);entry.lastSize={width:bounds.width,height:bounds.height};
 }
 function lighting(entry,event){
  if(motion.matches)return;const r=entry.node.getBoundingClientRect(),x=event?.clientX??r.left+r.width/2,y=event?.clientY??r.top+r.height/2;
  entry.surface.style.setProperty('--liquid-x',Math.max(0,Math.min(100,(x-r.left)/r.width*100))+'%');entry.surface.style.setProperty('--liquid-y',Math.max(0,Math.min(100,(y-r.top)/r.height*100))+'%');entry.light={x:entry.surface.style.getPropertyValue('--liquid-x'),y:entry.surface.style.getPropertyValue('--liquid-y')};
 }
 function press(entry,event){
  if(event?.isPrimary===false||event?.button>0)return;lighting(entry,event);entry.pressed=true;entry.node.dataset.liquidPressed='true';entry.animation?.cancel();
  // Horizontal dragging belongs to the exercise rail; its frame must stay still.
  if(entry.kind==='jump')return;
  entry.animation=play(entry.surface,[{transform:'scale(1)'},{transform:'scale(1.012,.968)'}],{duration:130,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
 }
 function release(entry){
  if(!entry.pressed)return;entry.pressed=false;delete entry.node.dataset.liquidPressed;if(entry.kind==='jump')return;const from=getComputedStyle(entry.surface).transform;entry.animation?.cancel();
  impulses.set(entry.kind,{at:performance.now(),from,light:entry.light});entry.animation=play(entry.surface,[{transform:from},{transform:'scale(.995,1.018)',offset:.45},{transform:'scale(1)'}],{duration:430,easing:'cubic-bezier(.15,.75,.25,1)'});
 }
 function attach(node){
  const surface=document.createElement('span');surface.className='liquid-surface';surface.setAttribute('aria-hidden','true');node.prepend(surface);node.dataset.liquidMotion=motion.matches?'reduced':'enabled';
  const kind=node.matches('.mobile-nav')?'nav':node.matches('.advanced-rest')?'rest':node.matches('.exercise-glass-frame,.exercise-jump-nav')?'jump':node.matches('.sidebar nav')?'sidebar':'demo';
  const rail=node.querySelector(':scope>.exercise-jump-nav')||node;
  const entry={node,rail,surface,kind,light:null,lastSize:null,listeners:[],pressed:false,animation:null,selectionAnimation:null,indicator:null,selectionObserver:null};
  if(node.matches('.mobile-nav,.exercise-glass-frame,.exercise-jump-nav')){entry.indicator=document.createElement('span');entry.indicator.className='liquid-selection';entry.indicator.setAttribute('aria-hidden','true');rail.insertBefore(entry.indicator,rail===node?surface.nextSibling:rail.firstChild);entry.selectionObserver=new MutationObserver(()=>select(entry));entry.selectionObserver.observe(rail,{subtree:true,attributes:true,attributeFilter:['aria-current']});}
  const on=(type,fn,target=node)=>{target.addEventListener(type,fn,{passive:true});entry.listeners.push([target,type,fn]);};
  if(kind==='jump')on('scroll',()=>{entry.selectionAnimation?.cancel();entry.selectionAnimation=null;release(entry);},rail);
  on('pointerdown',event=>press(entry,event));on('pointermove',event=>{if(entry.pressed||event.pointerType==='mouse')lighting(entry,event);});for(const type of ['pointerup','pointercancel','pointerleave'])on(type,()=>release(entry));
  on('keydown',event=>{if(!event.repeat&&(event.key==='Enter'||event.key===' '))press(entry);});on('keyup',event=>{if(event.key==='Enter'||event.key===' ')release(entry);});
  entries.set(node,entry);select(entry);const impulse=impulses.get(kind);if(impulse&&performance.now()-impulse.at<430&&!motion.matches){if(impulse.light){surface.style.setProperty('--liquid-x',impulse.light.x);surface.style.setProperty('--liquid-y',impulse.light.y);}entry.animation=play(surface,[{transform:impulse.from},{transform:'scale(.996,1.014)',offset:.45},{transform:'scale(1)'}],{duration:Math.max(80,430-(performance.now()-impulse.at)),easing:'cubic-bezier(.15,.75,.25,1)'});}return entry;
 }
 function detach(entry){observer?.unobserve(entry.node);entry.animation?.cancel();entry.selectionAnimation?.cancel();entry.selectionObserver?.disconnect();for(const [target,type,fn]of entry.listeners)target.removeEventListener(type,fn);}
 const observer=globalThis.ResizeObserver?new ResizeObserver(items=>{for(const {target}of items)pending.add(target);if(frame!==null)return;frame=requestAnimationFrame(()=>{frame=null;for(const node of pending){optics(node);const entry=entries.get(node);if(entry?.indicator){const r=node.getBoundingClientRect();if(!entry.lastSize||Math.abs(entry.lastSize.width-r.width)>1||Math.abs(entry.lastSize.height-r.height)>1)select(entry,false);}}pending.clear();});}):null;
 function warnings(){for(const [selector,media]of [['[data-motion-warning]',motion],['[data-transparency-warning]',transparency]])for(const node of root.querySelectorAll(selector))node.hidden=!media.matches;}
 function sync(){
  if(stopped)return;warnings();const nodes=[...root.querySelectorAll(SELECTOR)].filter(node=>!node.matches('.exercise-glass-frame>.exercise-jump-nav'));for(const [node,entry]of entries)if(!nodes.includes(node)){detach(entry);entries.delete(node);}
  for(const node of nodes){node.dataset.liquidGlass=supported?'lens':'fluid-css';const entry=entries.get(node)||attach(node);observer?.observe(node);optics(node);if(entry.indicator&&!entry.selectionAnimation)select(entry);}
  if(cache.size>24){const active=new Set(nodes.map(n=>n.style.getPropertyValue('--glass-optics')));for(const [key,filter]of cache)if(cache.size>24&&![...active].some(v=>v.includes('#'+filter.id))){filter.remove();cache.delete(key);}}
 }
 function changed(){warnings();impulses.clear();for(const entry of entries.values()){entry.node.dataset.liquidMotion=motion.matches?'reduced':'enabled';entry.animation?.cancel();entry.selectionAnimation?.cancel();entry.pressed=false;delete entry.node.dataset.liquidPressed;entry.surface.style.removeProperty('--liquid-x');entry.surface.style.removeProperty('--liquid-y');select(entry,false);}}
 if(motion.addEventListener)motion.addEventListener('change',changed);else motion.addListener(changed);if(transparency.addEventListener)transparency.addEventListener('change',warnings);else transparency.addListener(warnings);
 function stop(){stopped=true;observer?.disconnect();if(frame!==null)cancelAnimationFrame(frame);for(const entry of entries.values())detach(entry);entries.clear();svg?.remove();cache.clear();pending.clear();selections.clear();impulses.clear();if(motion.removeEventListener)motion.removeEventListener('change',changed);else motion.removeListener(changed);if(transparency.removeEventListener)transparency.removeEventListener('change',warnings);else transparency.removeListener(warnings);}
 return {sync,stop};
}
