import {performance} from 'node:perf_hooks';
import {writeFile,mkdir,readdir,stat} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {refinementFixture} from '../tests/fixtures/refinement.mjs';
import {today,validateState} from '../src/model.js';
import {addDays} from '../src/calendar.js';
import {muscleMapView} from '../src/muscle-map.js';
const {muscleMapView:before}=await import(pathToFileURL(resolve(process.env.MOBILE_BASELINE_SRC||'/tmp/gymbro-024-mobile-baseline/src/muscle-map.js')));
const s=refinementFixture(today()),template=s.sessions[0];s.photos=[];s.draft=null;
s.sessions=Array.from({length:1500},(_,i)=>{const date=addDays(today(),-i*2);return {...structuredClone(template),id:'synthetic-'+i,date,startedAt:Date.parse(date+'T12:00:00Z'),finishedAt:Date.parse(date+'T13:00:00Z')};});validateState(s);
const muscles=['Chest','Back','Shoulders','Biceps','Triceps','Forearms','Core','Obliques','Quads','Adductors','Hamstrings','Calves','Glutes','Spinal erectors'];
function measure(fn){const times=[];for(let i=0;i<5;i++){const at=performance.now();fn();times.push(performance.now()-at);}return {medianMs:+times.sort((a,b)=>a-b)[2].toFixed(2),maxMs:+Math.max(...times).toFixed(2)};}
const baseline=measure(()=>{for(const muscle of muscles)before(s,muscle);});
const firstRender=measure(()=>muscleMapView(structuredClone(s),null));
muscleMapView(s,null);const repeatedSelections=measure(()=>{for(const muscle of muscles)muscleMapView(s,muscle);});
let sourceBytes=0;for(const f of await readdir('src'))sourceBytes+=(await stat('src/'+f)).size;
const result={runtime:process.version,sessions:s.sessions.length,sets:s.sessions.length*template.exercises.reduce((n,e)=>n+e.entries.length,0),baselineRepeatedSelections:baseline,candidateFirstRenderIncludingClone:firstRender,candidateRepeatedSelections:repeatedSelections,sourceBytes,optimization:'Cache derived weekly/recent map facts by immutable saved-state identity and local date; resolve exercise definitions once instead of repeated history lookups. WeakMap releases old state caches.',scope:'Cloud Node CPU/string-render measurements, not phone frame rates or physical-device startup guarantees. Same synthetic history and 14 canonical selections in each comparison.'};
await mkdir('artifacts/mobile-refinement',{recursive:true});await writeFile('artifacts/mobile-refinement/performance.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
