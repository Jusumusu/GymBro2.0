import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
// Always exercise the real approved 0.2.4 files, never a synthetic old-version label.
export async function releasedBaseline(){
 if(process.env.MOBILE_UPDATE_BASELINE_DIST)return {root:process.env.MOBILE_UPDATE_BASELINE_DIST,close:async()=>{}};
 const root=await mkdtemp(tmpdir()+'/gymbro-released-024-');
 const run=(command,args,cwd=process.cwd())=>{const r=spawnSync(command,args,{cwd,stdio:'pipe'});if(r.status!==0)throw Error('Cannot prepare released 0.2.4 baseline; ensure Git history includes b2689eb. '+(r.stderr?.toString()||r.error||''));};
 try{run('git',['archive','--format=tar','--output='+root+'/source.tar','b2689eb0f2b1cec47747180d91ef381191a9d11a']);run('tar',['-xf',root+'/source.tar','-C',root]);run(process.execPath,['scripts/build.mjs'],root);return {root:root+'/dist',close:()=>rm(root,{recursive:true,force:true})};}catch(error){await rm(root,{recursive:true,force:true});throw error;}
}
