import {cp,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
// Publish production and retain the isolated preview journal's entry point.
const scratch=await mkdtemp(join(tmpdir(),'gymbro-release-'));
const run=args=>{const result=spawnSync(process.execPath,args,{stdio:'inherit'});if(result.error)throw result.error;if(result.status!==0)throw Error('Site build failed: '+args.join(' '));};
try{
 run(['scripts/build.mjs']);await cp('dist',join(scratch,'production'),{recursive:true});
 run(['scripts/build.mjs','--preview']);await cp('dist',join(scratch,'preview'),{recursive:true});
 run(['scripts/compose-preview.mjs',join(scratch,'production'),join(scratch,'preview'),'dist']);
 console.log('Release site: production at / and separate journal at /preview/.');
}finally{await rm(scratch,{recursive:true,force:true});}
