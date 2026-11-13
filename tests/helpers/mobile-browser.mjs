import {spawn} from 'node:child_process';
import {mkdtemp,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
export const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export async function browser({root='dist',port=5202,debug=9272}={}){
 const profile=await mkdtemp(tmpdir()+'/gymbro-mobile-');
 const server=spawn(process.execPath,['scripts/serve.mjs',root],{env:{...process.env,PORT:String(port)},stdio:'ignore'});
 const chrome=spawn('/usr/bin/chromium',['--headless','--no-sandbox','--disable-dev-shm-usage','--no-first-run','--disable-background-networking','--user-data-dir='+profile,'--remote-debugging-port='+debug,'about:blank'],{stdio:'ignore'});
 let socket,id=0;const pending=new Map(),errors=[],navigations=[];
 for(let n=0;n<120;n++){try{const pages=await(await fetch(`http://127.0.0.1:${debug}/json/list`)).json();socket=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});break;}catch{await sleep(100);}}
 if(!socket)throw Error('Chromium unavailable');
 socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);else if(m.method==='Page.frameNavigated'&&!m.params.frame.parentId)navigations.push({at:Date.now(),url:m.params.frame.url});};
 const cdp=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});socket.send(JSON.stringify({id:n,method,params}));});
 const js=async expression=>{const r=await cdp('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
 const until=async(expression,attempts=200)=>{for(let n=0;n<attempts;n++){try{if(await js(expression))return;}catch(e){if(!/context.*destroyed|Cannot find context|Inspected target navigated|Failed to fetch dynamically/i.test(e.message))throw e;}await sleep(50);}throw Error('Timed out: '+expression);};
 const click=async selector=>{await until(`Boolean(document.querySelector(${JSON.stringify(selector)}))`);await js(`document.querySelector(${JSON.stringify(selector)}).click()`);await sleep(100);};
 const fill=async(selector,value)=>{await js(`{const e=document.querySelector(${JSON.stringify(selector)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}`);await sleep(80);};
 const submit=async selector=>{await js(`document.querySelector(${JSON.stringify(selector)}).requestSubmit()`);await sleep(180);};
 const route=async value=>{await js(`location.hash=${JSON.stringify(value)}`);await sleep(180);};
 const navigate=async(path='/')=>{await cdp('Page.navigate',{url:`http://127.0.0.1:${port}${path}`});};
 const data=()=>js(`(async()=>await (await import('./src/storage.js')).loadState())()`);
 const shot=async path=>{const r=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(path,Buffer.from(r.data,'base64'));};
 await cdp('Runtime.enable');await cdp('Page.enable');await cdp('Network.enable');await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});
 const close=async()=>{socket.close();chrome.kill();server.kill();await sleep(200);await rm(profile,{recursive:true,force:true,maxRetries:4,retryDelay:100});};
 return {cdp,js,until,click,fill,submit,route,navigate,data,shot,close,errors,navigations,profile};
}
