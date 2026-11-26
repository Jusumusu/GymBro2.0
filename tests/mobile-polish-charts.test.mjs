import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chart} from '../src/ui.js';
import {inspectionModel,nearestPoint} from '../src/chart-inspection.js';

test('real application charts expose exact source records to the shared pointer inspector',()=>{
 const points=[{date:'2026-11-01',value:71.25},{date:'2026-11-04',value:72.125},{date:'2026-11-25',value:70.875}],snapshot=structuredClone(points),html=chart(points,{label:'Recorded body weight',unit:'kg'});
 assert.match(html,/class="chart" data-inspector/);assert.match(html,/data-plot tabindex="0" role="slider"/);assert.match(html,/data-readout/);assert.match(html,/data-guide hidden/);assert.match(html,/data-chart-model/);assert.match(html,/71\.25/);assert.match(html,/72\.125/);assert.match(html,/70\.875/);assert.deepEqual(points,snapshot);
});
test('actual chart output handles sparse and missing records without NaN paths or invented values',()=>{
 const points=[{date:'2026-11-01',value:0},null,{date:'2026-11-03',value:NaN},{date:'2026-11-25',value:-4.25}],html=chart(points,{label:'Recorded change',unit:'kg'}),model=inspectionModel(points);
 assert.equal(model.records.length,2);assert.equal(model.series[0].segments.length,2);assert.equal(nearestPoint(model,0),0);assert.equal(nearestPoint(model,640),1);assert.ok(model.records.every(p=>p.y>=31&&p.y<=176));assert.ok(!html.includes('NaN'));assert.match(html,/2 recorded entries/);assert.ok(!chart([null,{date:'2026-11-01',value:NaN}]).includes('data-inspector'));
});
test('multiple same-date series retain labels and exact independent values in the app chart',()=>{
 const input=[{label:'Left arm',unit:'cm',points:[{date:'2026-11-25',value:31.125}]},{label:'Right arm',unit:'cm',points:[{date:'2026-11-25',value:32.875}]}],html=chart(input,{label:'Measurements'}),model=inspectionModel(input);
 assert.match(html,/<th scope="col">Series<\/th>/);assert.match(html,/Left arm/);assert.match(html,/Right arm/);assert.equal(nearestPoint(model,331,model.records[1].y),1);assert.match(html,/32\.875 cm/);
});
test('chart source payloads and accessible labels safely encode untrusted stored text',()=>{
 const html=chart([{date:'2026-11-25',value:5}],{label:'<img src=x onerror=alert(1)> & notes',unit:'<kg>'});assert.ok(!html.includes('<img'));assert.match(html,/\\u003cimg/);assert.match(html,/&lt;kg&gt;/);assert.ok(!html.includes('</template><script>'));
});
test('drawing a long history bounds actual SVG elements while retaining every inspectable source record',()=>{
 const points=Array.from({length:5000},(_,i)=>({date:'week '+i,value:i%100})),html=chart(points,{label:'Long history'});assert.ok((html.match(/<circle/g)||[]).length<650);assert.match(html,/5000 recorded entries/);assert.match(html,/"date":"week 4999"/);assert.equal(inspectionModel(points).records.length,5000);
});
