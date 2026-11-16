// Curated static review export. No real app entry point, storage or updater code.
import {cp,mkdir,readFile,writeFile,readdir} from 'node:fs/promises';
import path from 'node:path';
const destination=process.argv[2];if(!destination||!path.isAbsolute(destination))throw Error('Pass an absolute isolated Site checkout path');
const target=path.join(destination,'dist');await mkdir(path.join(target,'docs/liquid-glass'),{recursive:true});
await cp('docs/liquid-glass',path.join(target,'docs/liquid-glass'),{recursive:true});
await mkdir(path.join(target,'src'),{recursive:true});await cp('src/ui.js',path.join(target,'src/ui.js'));
for(const file of ['manrope.woff','dm-sans.woff','font-licenses.txt','icon-192.png'])await cp('public/'+file,path.join(target,file));
await mkdir(path.join(target,'evidence'),{recursive:true});
for(const file of await readdir('artifacts/liquid-glass/review'))await cp('artifacts/liquid-glass/review/'+file,path.join(target,'evidence',file));
const index=await readFile('docs/liquid-glass/index.html','utf8');await writeFile(path.join(target,'index.html'),index.replace('<head>','<head><base href="./docs/liquid-glass/">'));
await writeFile(path.join(destination,'README.md'),'# Gym Bro visual review\n\nIsolated static prototypes exported from `Jusumusu/GymBro2.0`, branch `feature/liquid-glass-visual-redesign`. Released baseline: `f8b5d80d914c8d877d67d4155965be26170bed08`.\n\nBuildless HTML/JS. Source is the deployable `dist/` tree. No production app controller, journal storage or service worker is included. All data is fictional. Design approval remains pending.\n');
console.log('Packaged curated static review at '+target);
