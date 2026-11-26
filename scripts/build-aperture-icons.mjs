// Rasterize the approved original vector at exact PWA sizes using Chromium.
import {mkdir,readFile,writeFile,cp} from 'node:fs/promises';
import {browser} from '../tests/helpers/mobile-browser.mjs';
for(const theme of ['light','dark']){
 const source=await readFile(`docs/mobile-polish/review/logos/d-${theme}.svg`,'utf8');
 const svg=source.replace('<svg ','<svg data-identity="aperture-'+theme+'" ');
 await writeFile(`public/aperture-${theme}.svg`,svg);
}
await cp('public/aperture-light.svg','public/icon.svg');
const b=await browser({root:'public',port:5367,debug:9437});
try{
 await b.cdp('Emulation.setDefaultBackgroundColorOverride',{color:{r:0,g:0,b:0,a:0}}).catch(()=>b.cdp('Page.setDefaultBackgroundColorOverride',{color:{r:0,g:0,b:0,a:0}}));
 for(const theme of ['light','dark'])for(const size of [192,512]){
  await b.cdp('Emulation.setDeviceMetricsOverride',{width:size,height:size,deviceScaleFactor:1,mobile:false});
  await b.js('window.__oldIconDocument=true');await b.navigate(`/aperture-${theme}.svg?size=${size}`);
  await b.until(`!window.__oldIconDocument&&document.documentElement.dataset.identity==='aperture-${theme}'`);
  await b.js('document.documentElement.setAttribute("width","100%");document.documentElement.setAttribute("height","100%")');
  await b.js('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
  const png=await b.cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false,clip:{x:0,y:0,width:size,height:size,scale:1}});
  await writeFile(`public/aperture-${theme}-${size}.png`,Buffer.from(png.data,'base64'));
 }
}finally{await b.close();}
for(const size of [192,512])await cp(`public/aperture-dark-${size}.png`,`public/icon-${size}.png`);
for(const [name,theme]of [['manifest.webmanifest','dark'],['manifest-light.webmanifest','light']]){
 const p='public/'+name,m=JSON.parse(await readFile(p,'utf8'));
 for(const icon of m.icons){const size=icon.sizes.split('x')[0];icon.src=`aperture-${theme}-${size}.png`;}
 await writeFile(p,JSON.stringify(m)+'\n');
}
console.log('Approved Aperture light/dark SVGs, 192/512px PNGs and existing manifest identities prepared.');
