// Clear optical rim. No page capture, duplicate content, journal access or animation loop.
const SELECTOR='.mobile-nav,.exercise-jump-nav,.advanced-rest,.sidebar nav,.optical-demo-lens';
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
 const safari=/Safari/.test(navigator.userAgent)&&!/Chrome|Chromium|Edg|OPR/.test(navigator.userAgent);
 const supported=!safari&&/Chrome|Chromium|Edg|OPR/.test(navigator.userAgent)&&globalThis.CSS?.supports('backdrop-filter','url("#glass-test")')&&globalThis.ResizeObserver;
 const observed=new Set(),cache=new Map(),pending=new Set();let svg=null,defs=null,frame=null,stopped=false;
 const element=(name,attrs)=>{const e=document.createElementNS(NS,name);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;};
 function optics(node){
  if(stopped||!node.isConnected)return;const bounds=node.getBoundingClientRect();if(bounds.width<1||bounds.height<1)return;
  const width=Math.min(1600,Math.ceil(bounds.width)),height=Math.min(800,Math.ceil(bounds.height)),radius=Math.min(parseFloat(getComputedStyle(node).borderTopLeftRadius)||0,width/2,height/2),key=width+':'+height+':'+radius;
  let filter=cache.get(key);if(!filter){
   const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const context=canvas.getContext('2d');if(!context)return;
   context.putImageData(new ImageData(lensMap(width,height,radius),width,height),0,0);
   if(!svg){svg=element('svg',{width:0,height:0,'aria-hidden':'true',focusable:'false','data-glass-optics':'true'});svg.style.position='absolute';defs=element('defs',{});svg.append(defs);document.body.append(svg);}
   const id='gymbro-glass-'+(++nextId);filter=element('filter',{id,filterUnits:'userSpaceOnUse',x:0,y:0,width:bounds.width,height:bounds.height,'color-interpolation-filters':'sRGB'});
   filter.append(element('feImage',{href:canvas.toDataURL(),x:0,y:0,width:bounds.width,height:bounds.height,preserveAspectRatio:'none',result:'rim'}),element('feDisplacementMap',{in:'SourceGraphic',in2:'rim',scale:14,xChannelSelector:'R',yChannelSelector:'G'}));defs.append(filter);cache.set(key,filter);
  }
  const reference=new URL(location.href);reference.hash=filter.id;node.style.setProperty('--glass-optics',`url("${reference.href}") saturate(1.03)`);node.dataset.liquidGlass='lens';
 }
 const observer=supported?new ResizeObserver(entries=>{for(const {target}of entries)pending.add(target);if(frame!==null)return;frame=requestAnimationFrame(()=>{frame=null;for(const target of pending)optics(target);pending.clear();});}):null;
 function sync(){
  if(stopped)return;const nodes=[...root.querySelectorAll(SELECTOR)];
  for(const node of observed)if(!nodes.includes(node)){observer?.unobserve(node);observed.delete(node);}
  for(const node of nodes){node.dataset.liquidGlass=supported?'lens':'clear-css';if(!supported)continue;if(!observed.has(node)){observed.add(node);observer.observe(node);}optics(node);}
  // Keep a small geometry cache; active references are never evicted.
  if(cache.size>24){const active=new Set(nodes.map(n=>n.style.getPropertyValue('--glass-optics')));for(const [key,filter]of cache)if(cache.size>24&&![...active].some(v=>v.includes('#'+filter.id))){filter.remove();cache.delete(key);}}
 }
 function stop(){stopped=true;observer?.disconnect();if(frame!==null)cancelAnimationFrame(frame);svg?.remove();cache.clear();observed.clear();pending.clear();}
 return {sync,stop};
}
