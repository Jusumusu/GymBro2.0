// Extend the existing private gallery with the actual isolated candidate app.
import assert from 'node:assert/strict';
import {cp,mkdir,readFile,readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const destination=process.argv[2];assert(destination&&path.isAbsolute(destination),'Pass the absolute existing Site checkout');
const hosting=JSON.parse(await readFile(path.join(destination,'.openai/hosting.json'),'utf8'));assert(hosting.project_id,'Reuse the selected Site identity');
const release=JSON.parse(await readFile('review-site/preview/version.json','utf8'));assert.equal(release.environment,'preview');assert.equal(release.version,'0.5.0');
const gallery=spawnSync(process.execPath,['scripts/package-visual-review.mjs',destination],{stdio:'inherit'});assert.equal(gallery.status,0);
const target=path.join(destination,'dist'),app=path.join(target,'preview');
// Preserve every verified offline asset and recovery entry point. Historical
// concept galleries are retained at the root, rather than duplicated in the app.
for(const file of [...Object.keys(release.assets),'sw.js','update.html','update.js','update.css','version.json','docs/RESEARCH.md']){
 const output=path.join(app,file);await mkdir(path.dirname(output),{recursive:true});await cp(path.join('review-site/preview',file),output);
}
const evidence=path.join(target,'evidence/aero');await mkdir(evidence,{recursive:true});
for(const file of await readdir('artifacts/liquid-glass/implementation'))if(file.endsWith('.png')||file.endsWith('.json'))await cp('artifacts/liquid-glass/implementation/'+file,path.join(evidence,file));
for(const folder of ['performance','upgrade'])await cp('artifacts/liquid-glass/implementation/'+folder,path.join(evidence,folder),{recursive:true});
for(const file of ['index.html','docs/liquid-glass/index.html']){const targetPath=path.join(target,file),html=await readFile(targetPath,'utf8');await writeFile(targetPath,html.replace('<section class="review-intro">','<section class="review-intro"><p class="overline">AERO SELECTED · <a href="../../preview/">OPEN THE WORKING APP ↗</a> · <a href="aero.html">IMPLEMENTATION REVIEW ↗</a></p>'));}
await writeFile(path.join(destination,'README.md'),'# Gym Bro / Aero implementation preview\n\nSource: `Jusumusu/GymBro2.0`, branch `feature/liquid-glass-visual-redesign`. Stable production remains `f8b5d80` / 0.4.0 on GitHub Pages.\n\nThe root retains the five-direction RAM-only design gallery. `/preview/` contains the actual 0.5.0 Aero candidate, built with preview metadata, database/writer-lock namespace, worker/cache scope and a visible environment label. It opens its own journal. No personal data is bundled.\n\nBuildless static hosting; the deployable source is `dist/`. The existing Site identity and owner-only audience are retained. The real app is implemented, but merging to Gym Bro main still needs explicit release approval.\n');
console.log('Prepared actual isolated Aero preview '+release.version+' ('+release.build+') alongside the original gallery.');
