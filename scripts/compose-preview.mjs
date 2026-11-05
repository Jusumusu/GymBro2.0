import {cp,mkdir,rm,readFile,readdir,stat} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
import {createHash} from 'node:crypto';
const [stableArg,previewArg,outputArg]=process.argv.slice(2);if(!stableArg||!previewArg||!outputArg)throw Error('Usage: node compose-preview.mjs <stable dist> <preview dist> <output>');
const stable=resolve(stableArg),preview=resolve(previewArg),output=resolve(outputArg);
if([stable,preview].some(p=>p===output||output.startsWith(p+'/')||p.startsWith(output+'/')))throw Error('Output must be separate from input builds.');
try{await stat(stable+'/preview');throw Error('Stable build already contains a preview path.');}catch(error){if(error.code!=='ENOENT')throw error;}
const html=await readFile(preview+'/index.html','utf8');if(!html.includes('name="gymbro-environment" content="preview"'))throw Error('Candidate must be built with --preview.');
const environment=await readFile(preview+'/src/environment.js','utf8'),storage=await readFile(preview+'/src/storage.js','utf8'),app=await readFile(preview+'/src/app.js','utf8');if(!environment.includes('gymbro-preview-v1')||!environment.includes('gymbro-preview-writer')||!storage.includes("from './environment.js'")||!app.includes("from './environment.js'"))throw Error('Preview storage/lock isolation contract is missing.');
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});await cp(stable,output,{recursive:true});await cp(preview,output+'/preview',{recursive:true});
async function files(root,dir=''){let result=[];for(const entry of await readdir(root+'/'+dir,{withFileTypes:true})){const p=dir?dir+'/'+entry.name:entry.name;result.push(...entry.isDirectory()?await files(root,p):[p]);}return result;}
for(const p of await files(stable)){const a=createHash('sha256').update(await readFile(stable+'/'+p)).digest('hex');const b=createHash('sha256').update(await readFile(output+'/'+p)).digest('hex');if(a!==b)throw Error('Stable production asset changed: '+p);}
console.log('Verified: stable production files are byte-identical; upgrade is isolated at /preview/.');
