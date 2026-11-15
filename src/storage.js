import { initialState,validateState } from './model.js';
import {DATABASE_NAME} from './environment.js';
let db;
export function openDB(){return new Promise((resolve,reject)=>{const req=indexedDB.open(DATABASE_NAME,1);req.onupgradeneeded=()=>{req.result.createObjectStore('state');req.result.createObjectStore('media');};req.onsuccess=()=>{db=req.result;db.onversionchange=()=>db.close();resolve();};req.onerror=()=>reject(req.error);req.onblocked=()=>reject(Error('Close other Gym Bro tabs to finish opening storage.'));});}
function request(store,mode,operation){return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);const req=operation(tx.objectStore(store));let result;req.onsuccess=()=>{result=req.result;};tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Storage transaction was cancelled.'));});}
export async function loadState(){return validateState(await request('state','readonly',s=>s.get('current'))??initialState());}
export const saveState=state=>request('state','readwrite',s=>s.put(validateState(state),'current'));
export const getPhoto=id=>request('media','readonly',s=>s.get(id));
export const putPhoto=(id,blob)=>request('media','readwrite',s=>s.put(blob,id));
export const deletePhoto=id=>request('media','readwrite',s=>s.delete(id));
// Import state and its media atomically: a quota failure leaves both unchanged.
export function restoreState(state,photos){return new Promise((resolve,reject)=>{validateState(state);const tx=db.transaction(['state','media'],'readwrite');for(const p of photos)tx.objectStore('media').put(p.blob,p.id);tx.objectStore('state').put(state,'current');tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error||Error('Restore failed. Your previous records are intact.'));tx.onerror=()=>reject(tx.error);});}
export const getRecovery=()=>request('state','readonly',s=>s.get('restore-recovery'));
export function restoreWithRecovery(state,photos){
 validateState(state);
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(['state','media'],'readwrite'),states=tx.objectStore('state'),media=tx.objectStore('media');
  const read=states.get('current');
  read.onsuccess=()=>{const current=read.result??initialState(),originalPhotos=[];let pending=current.photos.length;
   const apply=()=>{states.put({version:1,at:Date.now(),state:current,photos:originalPhotos},'restore-recovery');for(const p of photos)media.put(p.blob,p.id);states.put(state,'current');};
   if(!pending){apply();return;}
   for(const p of current.photos){const req=media.get(p.id);req.onsuccess=()=>{if(!req.result){tx.abort();return;}originalPhotos.push({id:p.id,blob:req.result});if(!--pending)apply();};}
  };
  tx.oncomplete=()=>resolve();tx.onabort=()=>reject(tx.error||Error('Restore stopped. Your previous journal and photos are intact.'));tx.onerror=()=>reject(tx.error);
 });
}
