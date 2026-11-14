// Reproduce the branch deployment locally without checking out or changing main.
import {mkdtemp,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
const scratch=await mkdtemp(join(tmpdir(),'gymbro-review-')),root=process.cwd();
function run(command,args,cwd=root){const r=spawnSync(command,args,{cwd,stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw Error('Review build failed: '+command);}
try{
 await mkdir(join(scratch,'stable'));
 run('git',['archive','--format=tar','--output='+join(scratch,'main.tar'),process.env.GYMBRO_STABLE_REF||'origin/main']);
 run('tar',['-xf',join(scratch,'main.tar'),'-C',join(scratch,'stable')]);
 run(process.execPath,['scripts/build.mjs'],join(scratch,'stable'));
 run(process.execPath,['scripts/build.mjs','--preview']);
 run(process.execPath,['scripts/compose-preview.mjs',join(scratch,'stable/dist'),join(root,'dist'),join(root,'review-site')]);
 console.log('Local review: node scripts/serve.mjs review-site, then open /preview/ at the printed local address. Main was not checked out or changed.');
}finally{await rm(scratch,{recursive:true,force:true});}
