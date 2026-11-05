import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve(process.argv[2]||'.');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json','.json':'application/json'};
const port=Number(process.env.PORT||5173);
let coachOrigin='';
if(process.env.COACH_CONNECT_ORIGIN){const url=new URL(process.env.COACH_CONNECT_ORIGIN);if(url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))throw Error('COACH_CONNECT_ORIGIN must use HTTPS or local HTTP.');coachOrigin=url.origin;}

createServer(async(req,res)=>{try{
 let pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);
 const file=resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
 if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
 if(!(await stat(file)).isFile())throw Error('Not a file');
 res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Content-Security-Policy':`default-src 'self'; img-src 'self' blob: data:; style-src 'self'; script-src 'self'; connect-src 'self' ${coachOrigin}; object-src 'none'; base-uri 'self'; frame-ancestors 'none'`});res.end(await readFile(file));
 }catch{res.writeHead(404);res.end('Not found');}}).listen(port,'0.0.0.0',()=>console.log(`Gym Bro server on port ${port}, root ${root}`));
