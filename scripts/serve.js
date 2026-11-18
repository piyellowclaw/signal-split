import {resolve,extname} from 'node:path';
const root=resolve(process.argv.includes('--dist')?'dist':'.');
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png'};
const server=Bun.serve({hostname:'127.0.0.1',port:4173,async fetch(req){const path=decodeURIComponent(new URL(req.url).pathname);const file=resolve(root,'.'+(path==='/'?'/index.html':path));if(!file.startsWith(root+'/'))return new Response('Forbidden',{status:403});const f=Bun.file(file);if(!await f.exists())return new Response('Not found',{status:404});return new Response(f,{headers:{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'}});}});console.log('SIGNAL / SPLIT '+server.url);
