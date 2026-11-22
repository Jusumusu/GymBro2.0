import {readFile,writeFile} from 'node:fs/promises';
import {buildWeeklyReview} from '../src/weekly-review.js';
const {fixture}=JSON.parse(await readFile('docs/weekly-review-progression-search/baseline.json','utf8'));fixture.profile.name='Alex';fixture.profile.goal='strength';fixture.profile.secondaryGoals=['hypertrophy'];
const body=structuredClone(fixture);fixture.weights=[];fixture.measurements=[];fixture.upgrade.goals=fixture.upgrade.goals.filter(g=>g.type!=='body');fixture.profile.targetWeight=null;
const reports={strength:buildWeeklyReview(fixture,{date:'2026-11-19',asOf:'2026-11-19'})};
body.profile.goal='fatloss';body.weights=['2026-11-09','2026-11-11','2026-11-12','2026-11-16','2026-11-18','2026-11-19'].map((date,i)=>({date,kg:i<3?89.5:89}));reports.body=buildWeeklyReview(body,{date:'2026-11-19',asOf:'2026-11-19'});
const beginner=structuredClone(fixture);beginner.sessions=[];beginner.weights=[];beginner.measurements=[];beginner.upgrade.goals=[];beginner.profile.targetWeight=null;reports.beginner=buildWeeklyReview(beginner,{date:'2026-11-19',asOf:'2026-11-19'});
await writeFile('docs/weekly-review-progression-search/review/reports.json',JSON.stringify(reports,null,2)+'\n');
