import {cp,mkdir,rm,readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const preview=process.argv.includes('--preview');
const version=JSON.parse(await readFile('package.json','utf8')).version;
const excluded=['sw.js','update.html','update.js','update.css','version.json'];
const files=['index.html',...(await readdir('src')).sort().map(f=>'src/'+f),...(await readdir('public')).sort().filter(f=>!excluded.includes(f))];
const hash=createHash('sha256').update(version).update(preview?'preview':'production');
for(const f of files)hash.update(await readFile(f.startsWith('src/')||f==='index.html'?f:'public/'+f));
// Worker/helper changes also identify a distinct release, even at the same version.
for(const f of excluded.filter(f=>f!=='version.json'))hash.update(await readFile('public/'+f));
const build=hash.digest('hex').slice(0,12);
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
await cp('src','dist/src',{recursive:true});await cp('public','dist',{recursive:true});await cp('docs','dist/docs',{recursive:true});
const meta=`<head><meta name="production" content="true"><meta name="gymbro-build" content="${build}"><meta name="gymbro-version" content="${version}">${preview?'<meta name="gymbro-environment" content="preview">':''}`;
await writeFile('dist/index.html',(await readFile('index.html','utf8')).replace('<head>',meta));
await writeFile('dist/update.html',(await readFile('public/update.html','utf8')).replaceAll('__APP_VERSION__',version).replaceAll('__BUILD_ID__',build));
if(preview)for(const name of ['manifest.webmanifest','manifest-light.webmanifest']){const m=JSON.parse(await readFile('dist/'+name,'utf8'));m.name='Gym Bro Preview';m.short_name='GB Preview';await writeFile('dist/'+name,JSON.stringify(m));}
const assets={};for(const f of files)assets[f]=createHash('sha256').update(await readFile('dist/'+f)).digest('hex');
const releaseNotes=JSON.parse(await readFile('public/release-notes.json','utf8'));if(releaseNotes.version!==version||!Array.isArray(releaseNotes.notes)||releaseNotes.notes.some(n=>typeof n!=='string'||n.length>300))throw Error('Release notes must match package version and contain short text entries.');
const release={schema:1,version,notes:releaseNotes.notes,build,environment:preview?'preview':'production',assets};
await writeFile('dist/version.json',JSON.stringify(release));
const worker=(await readFile('public/sw.js','utf8')).replace('__VERSION__',build).replace('__ASSETS__',JSON.stringify(files.map(f=>'./'+f))).replace('__RELEASE__',JSON.stringify(release));
await writeFile('dist/sw.js',worker);
console.log(`Built ${version} (${build}) in dist/ with a verified offline shell.`);
if(preview)console.log('Preview build: isolated browser database and lock, deploy under /preview/.');
