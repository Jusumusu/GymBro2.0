// Shared exact-point inspector. The model is immutable; pointer moves only update an overlay.
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const pointValue=(value,unit='')=>`${String(value)}${unit?' '+unit:''}`;
const time=date=>/^\d{4}-\d{2}-\d{2}$/.test(date)?Date.parse(date+'T12:00:00Z'):NaN;
export function inspectionModel(input,{label='Progress',unit=''}={}){
 const series=Array.isArray(input[0]?.points)?input:[{label,unit,points:input}];
 const records=[];let min=Infinity,max=-Infinity,minTime=Infinity,maxTime=-Infinity;
 for(const [seriesIndex,s]of series.entries())for(const [sourceIndex,p]of s.points.entries()){
  if(!p||typeof p.value!=='number'||!Number.isFinite(p.value)||typeof p.date!=='string')continue;
  const at=time(p.date);min=Math.min(min,p.value);max=Math.max(max,p.value);if(Number.isFinite(at)){minTime=Math.min(minTime,at);maxTime=Math.max(maxTime,at);}
  records.push({date:p.date,value:p.value,label:s.label||label,unit:s.unit??unit,seriesIndex,sourceIndex,at});
 }
 if(!records.length)return {label,records:[],series:[],min:null,max:null};
 const pad=Math.max((max-min)*.2,Math.abs(max)*.02,1),lo=min>=0?Math.max(0,min-pad):min-pad,hi=max+pad;
 const dated=records.every(p=>Number.isFinite(p.at));
 for(const p of records){p.x=dated?(maxTime===minTime?331:46+(p.at-minTime)/(maxTime-minTime)*570):46+p.sourceIndex/Math.max(1,series[p.seriesIndex].points.length-1)*570;p.y=176-(p.value-lo)/(hi-lo)*145;}
 records.sort((a,b)=>a.x-b.x||a.seriesIndex-b.seriesIndex||a.sourceIndex-b.sourceIndex);
 const paths=series.map((s,seriesIndex)=>{
  const points=records.filter(p=>p.seriesIndex===seriesIndex).sort((a,b)=>a.sourceIndex-b.sourceIndex),segments=[];let segment=[];
  for(const p of points){if(segment.length&&p.sourceIndex!==segment.at(-1).sourceIndex+1){segments.push(segment);segment=[];}segment.push(p);}if(segment.length)segments.push(segment);
  return {label:s.label||label,unit:s.unit??unit,segments};
 });
 return {label,records,series:paths,min,max,lo,hi};
}
// Binary search narrows to the nearest x coordinate; same-date series are selected by y.
export function nearestPoint(model,x,y=NaN){
 const a=model.records;if(!a.length)return -1;let lo=0,hi=a.length;
 while(lo<hi){const mid=(lo+hi)>>>1;if(a[mid].x<x)lo=mid+1;else hi=mid;}
 let index=Math.min(lo,a.length-1);if(lo>0&&Math.abs(a[lo-1].x-x)<=Math.abs(a[index].x-x))index=lo-1;
 const at=a[index].x;while(index>0&&a[index-1].x===at)index--;
 if(Number.isFinite(y)){let distance=Math.abs(a[index].y-y);for(let i=index+1;i<a.length&&a[i].x===at;i++)if(Math.abs(a[i].y-y)<distance){index=i;distance=Math.abs(a[i].y-y);}}
 return index;
}
// Min/max buckets bound drawing work while inspection retains every original record.
export function drawPoints(points,budget=640){
 if(points.length<=budget)return points;const result=[points[0]],size=Math.ceil((points.length-2)/Math.max(1,Math.floor((budget-2)/2)));
 for(let i=1;i<points.length-1;i+=size){const end=Math.min(points.length-1,i+size);let min=i,max=i;for(let j=i+1;j<end;j++){if(points[j].y<points[min].y)min=j;if(points[j].y>points[max].y)max=j;}for(const j of [...new Set([min,max])].sort((a,b)=>a-b))result.push(points[j]);}
 result.push(points.at(-1));return result;
}
export function inspectionFigure(input,options={}){
 const model=inspectionModel(input,options),variant=options.variant||'a';
 if(!model.records.length)return '<div class="inspection-empty" role="status">No recorded values in this period.</div>';
 const latest=model.records.at(-1),payload=JSON.stringify({input,options}).replace(/[<&]/g,c=>c==='<'?'\\u003c':'\\u0026');
 return `<figure class="inspection-chart" data-inspector data-variant="${escape(variant)}"><figcaption>${escape(model.label)}</figcaption><div class="inspection-readout" data-readout aria-hidden="true"><span data-point-date>${escape(latest.date)}</span><strong data-point-value>${escape(pointValue(latest.value,latest.unit))}</strong><small data-point-series>${escape(latest.label)}</small></div><div class="inspection-plot" data-plot tabindex="0" role="slider" aria-label="Inspect ${escape(model.label)} recorded points" aria-valuemin="1" aria-valuemax="${model.records.length}" aria-valuenow="${model.records.length}" aria-valuetext="${escape(latest.date+' · '+pointValue(latest.value,latest.unit)+' · '+latest.label)}"><svg viewBox="0 0 640 224" aria-hidden="true">${[0,1,2].map(i=>`<path class="inspection-grid" d="M46 ${31+i*72.5}H616"/><text x="2" y="${35+i*72.5}">${escape(Number((model.hi-i*(model.hi-model.lo)/2).toFixed(1)))}</text>`).join('')}${model.series.map((s,i)=>s.segments.map(segment=>`<path class="inspection-series" data-series="${i}" d="M${drawPoints(segment).map(p=>p.x+','+p.y).join(' L')}"/>${segment.length===1?`<circle class="inspection-dot" cx="${segment[0].x}" cy="${segment[0].y}" r="4"/>`:''}`).join('')).join('')}<text x="46" y="213">${escape(model.records[0].date)}</text><text x="616" y="213" text-anchor="end">${escape(latest.date)}</text><g data-guide hidden><path class="inspection-guide"/><circle class="inspection-dot" r="5"/></g></svg></div><p class="inspection-help">Drag to inspect · Use arrow keys when focused</p><template data-chart-model>${payload}</template><details class="inspection-table"><summary>Recorded values${model.records.length>12?' · latest 12':''}</summary><table><thead><tr><th>Date</th><th>Series</th><th>Value</th></tr></thead><tbody>${model.records.slice(-12).map(p=>`<tr><td>${escape(p.date)}</td><td>${escape(p.label)}</td><td>${escape(pointValue(p.value,p.unit))}</td></tr>`).join('')}</tbody></table></details></figure>`;
}
const instances=new WeakMap();
export function hydrateInspector(figure){
 if(instances.has(figure))return instances.get(figure);
 const {input,options}=JSON.parse(figure.querySelector('[data-chart-model]').content.textContent),model=inspectionModel(input,options),plot=figure.querySelector('[data-plot]'),svg=plot.querySelector('svg'),guide=plot.querySelector('[data-guide]'),readout=figure.querySelector('[data-readout]'),abort=new AbortController(),events={signal:abort.signal};
 let current=model.records.length-1,down=null,frame=0,pending=null;
 function show(index){
  current=Math.max(0,Math.min(model.records.length-1,index));const p=model.records[current];figure.dataset.inspecting='true';guide.hidden=false;guide.removeAttribute('hidden');guide.querySelector('path').setAttribute('d',`M${p.x} 26V181`);const dot=guide.querySelector('circle');dot.setAttribute('cx',p.x);dot.setAttribute('cy',p.y);
  readout.querySelector('[data-point-date]').textContent=p.date;readout.querySelector('[data-point-value]').textContent=pointValue(p.value,p.unit);readout.querySelector('[data-point-series]').textContent=p.label;
  plot.setAttribute('aria-valuenow',current+1);plot.setAttribute('aria-valuetext',`${p.date} · ${pointValue(p.value,p.unit)} · ${p.label}`);
  if(figure.dataset.variant==='a'){const r=plot.getBoundingClientRect(),w=readout.getBoundingClientRect().width;readout.style.left=Math.max(8,Math.min(r.width-w-8,p.x/640*r.width-w/2))+'px';}
 }
 function point(event){const r=svg.getBoundingClientRect();return nearestPoint(model,(event.clientX-r.left)/r.width*640,(event.clientY-r.top)/r.height*224);}
 function request(event){pending=point(event);if(!frame)frame=requestAnimationFrame(()=>{frame=0;show(pending);});}
 function end(event){if(down&&plot.hasPointerCapture?.(down.id))plot.releasePointerCapture(down.id);down=null;if(event?.type==='pointercancel'){if(frame)cancelAnimationFrame(frame);frame=0;figure.dataset.inspecting='false';guide.setAttribute('hidden','');}}
 plot.addEventListener('pointerdown',event=>{if(!event.isPrimary||event.button>0)return;down={id:event.pointerId,x:event.clientX,y:event.clientY,drag:false};show(point(event));if(event.pointerType==='mouse')plot.focus({preventScroll:true});},events);
 plot.addEventListener('pointermove',event=>{
  if(event.pointerType==='mouse'&&!down){request(event);return;}if(!down||event.pointerId!==down.id)return;
  const dx=Math.abs(event.clientX-down.x),dy=Math.abs(event.clientY-down.y);if(!down.drag){if(dy>8&&dy>dx){end({type:'pointercancel'});return;}if(dx<6||dx<dy)return;down.drag=true;plot.setPointerCapture(event.pointerId);}
  request(event);
 },events);
 for(const type of ['pointerup','pointercancel','lostpointercapture'])plot.addEventListener(type,end,events);
 plot.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&!down){figure.dataset.inspecting='false';guide.setAttribute('hidden','');}},events);
 plot.addEventListener('keydown',event=>{const next={ArrowLeft:current-1,ArrowDown:current-1,ArrowRight:current+1,ArrowUp:current+1,Home:0,End:model.records.length-1,PageDown:current-10,PageUp:current+10}[event.key];if(next===undefined)return;event.preventDefault();show(next);},events);
 plot.addEventListener('focus',()=>show(current),events);
 const resize=new ResizeObserver(()=>{if(figure.dataset.inspecting==='true')show(current);});resize.observe(plot);
 const api={model,select:show,destroy(){abort.abort();resize.disconnect();if(frame)cancelAnimationFrame(frame);instances.delete(figure);}};instances.set(figure,api);return api;
}
