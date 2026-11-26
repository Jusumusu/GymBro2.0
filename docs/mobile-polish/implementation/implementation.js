const current=new URL('../../../',document.baseURI),base=current.pathname.split('/').includes('preview')?current:new URL('preview/',current);
for(const link of document.querySelectorAll('[data-preview-update]'))link.href=new URL('update.html?latest=0.9.0',base).href;
try{const release=await(await fetch(new URL('version.json',base),{cache:'no-store'})).json();if(release.environment==='preview'&&/^\d+\.\d+\.\d+$/.test(release.version)&&/^[a-f0-9]{12}$/.test(release.build)){const update=new URL('update.html',base);update.searchParams.set('latest',release.version);update.searchParams.set('refresh',release.build);for(const link of document.querySelectorAll('[data-preview-update]'))link.href=update.href;document.querySelector('[data-build]').textContent=`Preview ${release.version} · ${release.build} · saved records and photos are kept.`;}}catch{}

window.mobileImplementationReady=true;
