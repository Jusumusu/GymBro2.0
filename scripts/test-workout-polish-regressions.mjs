// Run the existing real-browser regressions without overwriting past release evidence.
import {cp,lstat,mkdir,readFile,symlink,unlink,writeFile} from 'node:fs/promises';
import {createWriteStream} from 'node:fs';
import {spawn} from 'node:child_process';
import path from 'node:path';
const root=process.cwd(),target=path.join(root,'artifacts/workout-polish/regressions');
const suites=process.argv.length>2?process.argv.slice(2):['browser','browser-advanced-training','browser-training-refinement','browser-workout-ux','browser-refinement','browser-app-updates','browser-update'];
await mkdir(target,{recursive:true});const results=[];
async function run(name){
 const cwd=path.join(root,'work/workout-polish/suites',name),evidence=path.join(target,name);await mkdir(cwd,{recursive:true});await mkdir(evidence,{recursive:true});
 for(const name of ['scripts','src','tests','public','docs','package.json','review-site'])try{await symlink(path.join(root,name),path.join(cwd,name));}catch(e){if(e.code!=='EEXIST')throw e;}
 // Update suites intentionally stamp their copied builds. A symlink would let
 // fs.cp preserve the link and accidentally stamp a sibling suite's build.
 try{if((await lstat(path.join(cwd,'dist'))).isSymbolicLink())await unlink(path.join(cwd,'dist'));}catch(e){if(e.code!=='ENOENT')throw e;}
 await cp(path.join(root,'dist'),path.join(cwd,'dist'),{recursive:true});
 try{await symlink(evidence,path.join(cwd,'artifacts'));}catch(e){if(e.code!=='EEXIST')throw e;}
 const log=createWriteStream(path.join(evidence,'run.txt')),child=spawn(process.execPath,[path.join(root,'tests',name+'.mjs')],{cwd,env:process.env,stdio:['ignore','pipe','pipe']});child.stdout.pipe(log,{end:false});child.stderr.pipe(log,{end:false});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});await new Promise(r=>log.end(r));results.push({suite:name,exitCode:code});console.log(`${code===0?'PASS':'FAIL'} ${name}`);
}
for(let i=0;i<suites.length;i+=3){const settled=await Promise.allSettled(suites.slice(i,i+3).map(run));for(const result of settled)if(result.status==='rejected')throw result.reason;}
let prior=[];try{prior=JSON.parse(await readFile(path.join(target,'results.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
const combined=new Map(prior.map(r=>[r.suite,r]));for(const result of results)combined.set(result.suite,result);
await writeFile(path.join(target,'results.json'),JSON.stringify([...combined.values()],null,2)+'\n');if(results.some(r=>r.exitCode!==0))process.exitCode=1;
