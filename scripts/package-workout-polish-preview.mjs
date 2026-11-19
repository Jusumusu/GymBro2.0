import assert from 'node:assert/strict';
import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const destination=process.argv[2];assert(destination&&path.isAbsolute(destination));
const hosting=JSON.parse(await readFile(path.join(destination,'.openai/hosting.json'),'utf8'));assert.equal(hosting.project_id,'appgprj_6afb13cac5348191bf97192174fa7bf8');
const release=JSON.parse(await readFile('review-site/preview/version.json','utf8'));assert.equal(release.environment,'preview');
const target=path.join(destination,'dist/preview');
for(const file of [...Object.keys(release.assets),'sw.js','update.html','update.js','update.css','version.json','docs/RESEARCH.md']){const output=path.join(target,file);await mkdir(path.dirname(output),{recursive:true});await cp(path.join('review-site/preview',file),output);}
await cp('docs/workout-polish',path.join(target,'docs/workout-polish'),{recursive:true});
await cp('artifacts/workout-polish/concepts',path.join(destination,'dist/evidence/workout-polish'),{recursive:true});
await writeFile(path.join(destination,'README.md'),'# Gym Bro design reviews\n\nCurrent source: Jusumusu/GymBro2.0, feature/workout-polish-exercise-library, draft PR #4. Production remains main 5fd52d1 / 0.5.0. No merge is authorized.\n\n/preview/docs/workout-polish/review/ contains three interactive RAM-only directions awaiting visual selection. /preview/ contains the isolated candidate app, whose final visual integration is pending selection. The original five-direction gallery is retained at the root for reference.\n\nPreview metadata, database, lock and worker/cache scope are preserved. No personal data is bundled. Existing Site identity and owner-only audience are retained.\n');
console.log(JSON.stringify({version:release.version,build:release.build,review:'/preview/docs/workout-polish/review/',audience:'preserve owner-only'}));
