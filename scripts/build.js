import {mkdir,cp,rm} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const path of ['index.html','style.css','src','LICENSE'])await cp(path,'dist/'+path,{recursive:true});
console.log('Static build ready: dist/ — no dependencies, no network runtime.');
