import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
await rm('dist', {recursive:true, force:true});
await mkdir('dist', {recursive:true});
await cp('src', 'dist/src', {recursive:true});
await cp('public', 'dist', {recursive:true});
const version=JSON.parse(await readFile('package.json','utf8')).version;
await writeFile('dist/update.html',(await readFile('public/update.html','utf8')).replaceAll('__APP_VERSION__',version));
await writeFile('dist/index.html', (await readFile('index.html','utf8')).replace('<head>','<head><meta name="production" content="true">'));
await cp('docs','dist/docs',{recursive:true});
const { createHash } = await import('node:crypto');
const { readdir } = await import('node:fs/promises');
const files = ['index.html', ...(await readdir('src')).map(f=>'src/'+f), ...(await readdir('public')).filter(f=>!['sw.js','update.html','update.js','update.css'].includes(f))];
const hash = createHash('sha256');
for (const f of files) hash.update(await readFile(f.startsWith('src/')||f==='index.html'?f:'public/'+f));
let sw = await readFile('public/sw.js','utf8');
sw = sw.replace('__VERSION__',hash.digest('hex').slice(0,12)).replace('__ASSETS__',JSON.stringify(files.map(f=>'./'+f)));
await writeFile('dist/sw.js', sw);
console.log('Built static PWA in dist/ (relative asset paths).');

if(process.argv.includes('--preview')){
 const html=(await readFile('dist/index.html','utf8')).replace('<head>','<head><meta name="gymbro-environment" content="preview">');
 await writeFile('dist/index.html',html);
 const manifest=JSON.parse(await readFile('dist/manifest.webmanifest','utf8'));manifest.name='Gym Bro Preview';manifest.short_name='GB Preview';await writeFile('dist/manifest.webmanifest',JSON.stringify(manifest));
 console.log('Preview build: isolated browser database and lock, deploy under /preview/.');
}
