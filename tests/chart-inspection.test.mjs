import {test} from 'node:test';
import assert from 'node:assert/strict';
import {inspectionModel,nearestPoint,inspectionFigure,drawPoints,pointValue} from '../src/chart-inspection.js';
test('point inspection preserves exact source values, dates and units without interpolation',()=>{
 const points=[{date:'2026-01-01',value:71.25},{date:'2026-01-04',value:72.125},{date:'2026-02-01',value:70}],snapshot=structuredClone(points),m=inspectionModel(points,{label:'Body weight',unit:'kg'});
 assert.deepEqual(points,snapshot);assert.equal(m.records[1].value,72.125);assert.equal(pointValue(m.records[1].value,'kg'),'72.125 kg');
 assert.equal(nearestPoint(m,0),0);assert.equal(nearestPoint(m,1000),2);assert.equal(nearestPoint(m,m.records[1].x+1),1);assert.ok(m.records[1].x<150,'dates are spaced by elapsed time');
});
test('empty, missing and single-point series are safe; missing measurements stay gaps',()=>{
 assert.equal(nearestPoint(inspectionModel([]),0),-1);assert.match(inspectionFigure([]),/No recorded values/);
 const m=inspectionModel([{date:'2026-01-01',value:10},null,{date:'2026-01-03',value:NaN},{date:'2026-01-04',value:20}]);assert.equal(m.records.length,2);assert.equal(m.series[0].segments.length,2);
 const one=inspectionModel([{date:'2026-01-01',value:0}]);assert.equal(one.records[0].x,331);assert.equal(nearestPoint(one,500),0);assert.ok(Number.isFinite(one.records[0].y));
});
test('same-date series and duplicate dates remain individually inspectable',()=>{
 const m=inspectionModel([{label:'Left arm',unit:'cm',points:[{date:'2026-01-01',value:31}]},{label:'Right arm',unit:'cm',points:[{date:'2026-01-01',value:32.5}]}]);assert.equal(nearestPoint(m,331,m.records[1].y),1);assert.equal(m.records[1].label,'Right arm');assert.equal(m.records[1].unit,'cm');assert.equal(m.records[1].value,32.5);
});
test('drawing large histories is bounded and retains extrema while every point remains inspectable',()=>{
 const points=Array.from({length:50000},(_,i)=>({date:'week '+i,value:i===12345?99999:i%17})),m=inspectionModel(points),drawn=drawPoints(m.series[0].segments[0]);
 assert.equal(m.records.length,50000);assert.ok(drawn.length<=642);assert.ok(drawn.some(p=>p.value===99999));assert.equal(nearestPoint(m,m.records[12345].x),12345);
});
test('embedded chart data and labels cannot become markup',()=>{
 const html=inspectionFigure([{date:'2026-01-01',value:5}],{label:'<img onerror=alert(1)> &amp;'});assert.ok(!html.includes('<img'));assert.match(html,/\\u003cimg/);assert.match(html,/\\u0026amp/);
});
