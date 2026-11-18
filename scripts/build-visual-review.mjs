// Scope released component geometry to isolated custom elements, not the app.
import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const baseline='f8b5d80d914c8d877d67d4155965be26170bed08';
const source=path=>{const r=spawnSync('git',['show',baseline+':'+path],{encoding:'utf8'});if(r.status)throw Error('Missing released source '+path);return r.stdout;};
const paths=[...source('index.html').matchAll(/rel="stylesheet" href="\.\/([^"?]+)"/g)].map(m=>m[1]);
let css=paths.map(path=>'/* Released component geometry: '+path+' */\n'+source(path)).join('\n');
css=css.replaceAll("url('../manrope.woff')","url('../../manrope.woff')").replaceAll("url('../dm-sans.woff')","url('../../dm-sans.woff')");
css=css.replaceAll('html[data-theme=dark]',':host([data-theme=dark])').replaceAll('html[data-theme=light]',':host([data-theme=light])').replaceAll('html[data-theme]',':host').replaceAll(':root',':host').replace(/(?<![-\w])html(?![-\w])/g,':host').replace(/(?<![-\w])body(?![-\w])/g,'.sample-frame');
css=css.replace(/@media\s*([^{}]+)\{/g,(all,condition)=>/(?:min|max)-width/.test(condition)?'@container app-frame '+condition+'{':all);
await writeFile('docs/liquid-glass/released-components.css',css);
console.log('Prepared '+paths.length+' released stylesheets for isolated review elements');
