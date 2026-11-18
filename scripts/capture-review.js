// Loopback-only evidence viewer, expires after 60 seconds. No external publication.
import {resolve,extname} from 'node:path';
const root=resolve(import.meta.dir,'../evidence/demo-final');
const server=Bun.serve({hostname:'127.0.0.1',port:4175,fetch(req){const path=decodeURIComponent(new URL(req.url).pathname);if(path==='/favicon.ico')return new Response(null,{status:204});const file=resolve(root,'.'+(path==='/'?'/decoded-contact-sheet.html':path));if(!file.startsWith(root+'/'))return new Response('',{status:403});return new Response(Bun.file(file),{headers:{'Content-Type':({'.html':'text/html','.png':'image/png','.webm':'video/webm'})[extname(file)]||'application/octet-stream'}});}});console.log('Evidence review http://127.0.0.1:4175 (60 seconds)');setTimeout(()=>server.stop(),60000);
