import {writeFile,mkdir} from 'node:fs/promises';
import {EXERCISES} from '../src/exercises.js';
import {CONTRIBUTION_MUSCLES,discoverableMuscles,validateContributions} from '../src/muscle-contributions.js';
const count=key=>Object.fromEntries([...new Set(EXERCISES.map(e=>e[key]))].sort().map(k=>[k,EXERCISES.filter(e=>e[key]===k).length]));
for(const e of EXERCISES)validateContributions(e.contributions);
const audit={baseline:'5fd52d1703f7cabb81e54218f5ddbae80c79f4d2 / 0.5.0',total:EXERCISES.length,primary:Object.fromEntries(CONTRIBUTION_MUSCLES.map(m=>[m,EXERCISES.filter(e=>e.muscle===m).length])),discoverable:Object.fromEntries(CONTRIBUTION_MUSCLES.map(m=>[m,EXERCISES.filter(e=>discoverableMuscles(e).includes(m)).length])),equipment:count('equipment'),patterns:count('pattern'),withAliases:EXERCISES.filter(e=>e.aliases?.length).length,trackingTypes:[...new Set(EXERCISES.map(e=>e.trackingType||'reps'))]};
await mkdir('docs/workout-polish',{recursive:true});await writeFile('docs/workout-polish/catalog-baseline.json',JSON.stringify({audit,exercises:EXERCISES},null,2)+'\n');console.log(JSON.stringify(audit,null,2));
