import assert from 'node:assert/strict';
import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const destination=process.argv[2];assert(destination&&path.isAbsolute(destination));const hosting=JSON.parse(await readFile(path.join(destination,'.openai/hosting.json')));assert.equal(hosting.project_id,'appgprj_6afb13cac5348191bf97192174fa7bf8');
const release=JSON.parse(await readFile('review-site/preview/version.json'));assert.equal(release.environment,'preview');assert.equal(release.version,'0.9.0');
const target=path.join(destination,'dist/preview');
for(const file of [...Object.keys(release.assets),'sw.js','update.html','update.js','update.css','version.json','docs/RESEARCH.md']){const input=path.join('review-site/preview',file),output=path.join(target,file);if(release.assets[file])assert.equal(createHash('sha256').update(await readFile(input)).digest('hex'),release.assets[file],file);await mkdir(path.dirname(output),{recursive:true});await cp(input,output);}
await cp('docs/mobile-polish',path.join(target,'docs/mobile-polish'),{recursive:true});
const landing=(await readFile('docs/mobile-polish/review/index.html','utf8')).replace('<head>','<head><base href="./preview/docs/mobile-polish/review/">');await writeFile(path.join(destination,'dist/index.html'),landing);
await writeFile(path.join(destination,'README.md'),'# Gym Bro mobile polish review\n\n0.9.0 isolated development preview from Jusumusu/GymBro2.0 feature/mobile-polish-muscle-map-refresh. Main remains released 0.8.0. No main merge is authorized.\n\nThe root opens the unified review: three Weekly layouts, four original SVG muscle-map models, five original logo concepts and three Settings concepts. Meaningful visual changes await the user’s selection. The actual repaired app is /preview/. Review controls use fictional in-memory data and do not record approval. The functional preview preserves its separate journal, lock, worker and cache scope. The existing Site identity and owner-private audience are preserved. Prior documentation studies stay at their original paths.\n');
console.log(JSON.stringify({version:release.version,build:release.build,verifiedAssets:Object.keys(release.assets).length,audience:'existing owner-private preserved'}));
