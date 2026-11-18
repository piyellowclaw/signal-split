// Optional local browser DevTools snippet. Run on the live game page; it records
// the actual arena canvas, not a synthetic animation. Does not automate gameplay.
// DOM start/end/scoreboard are not in this canvas recording: for full submission
// use browser/tab capture or screen recording and follow docs/DEMO.md.
(async()=>{
 const canvas=document.getElementById('canvas');
 if(!canvas?.captureStream||!window.MediaRecorder)throw new Error('Canvas recording unavailable');
 const mime=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(x=>MediaRecorder.isTypeSupported(x));
 const stream=canvas.captureStream(30), chunks=[];
 const recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:5000000});
 recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
 recorder.onstop=()=>{const blob=new Blob(chunks,{type:mime}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='signal-split-real-arena.webm';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);stream.getTracks().forEach(t=>t.stop());};
 recorder.start(1000);window.stopSignalRecording=()=>{if(recorder.state==='recording')recorder.stop();};
 setTimeout(window.stopSignalRecording,90000);
 console.log('Recording real arena for up to 90s. stopSignalRecording() ends early. DOM UI/audio excluded.');
})();
