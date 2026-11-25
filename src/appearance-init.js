/* Classic, synchronous head script: resolve the theme before styles can paint. */
(function(){
 const root=document.documentElement;
 const preview=location.pathname.split('/').includes('preview')||document.querySelector('meta[name="gymbro-environment"]')?.content==='preview';
 const key=preview?'gymbro-appearance-preview':'gymbro-appearance-production';
 const media=window.matchMedia('(prefers-color-scheme: dark)');
 let preference='dark';
 try{const saved=localStorage.getItem(key);if(['dark','light','system'].includes(saved))preference=saved;}catch{}
 function apply(value,{remember=true}={}){
  if(!['dark','light','system'].includes(value))value='dark';
  preference=value;const resolved=value==='system'?(media.matches?'dark':'light'):value;
  if(root.dataset.theme!==resolved){root.dataset.themeTransition='off';window.requestAnimationFrame?.(()=>window.requestAnimationFrame(()=>{delete root.dataset.themeTransition;}));}
  root.dataset.theme=resolved;
  const identity='./aperture-'+resolved;
  document.querySelector('link[rel=icon]')?.setAttribute('href',identity+'.svg');
  document.querySelector('link[rel=apple-touch-icon]')?.setAttribute('href',identity+'-192.png');
  for(const image of document.querySelectorAll('img.brand-icon'))image.setAttribute('src',identity+'.svg');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',resolved==='dark'?'#14191c':'#f4f6f7');
  document.querySelector('link[rel=manifest]')?.setAttribute('href',resolved==='light'?'./manifest-light.webmanifest':'./manifest.webmanifest');
  if(remember)try{localStorage.setItem(key,value);}catch{}
  return resolved;
 }
 window.GymBroAppearance=Object.freeze({apply,get preference(){return preference;}});
 const followSystem=()=>{if(preference==='system')apply('system',{remember:false});};
 if(media.addEventListener)media.addEventListener('change',followSystem);else media.addListener?.(followSystem);
 apply(preference,{remember:false});
})();
