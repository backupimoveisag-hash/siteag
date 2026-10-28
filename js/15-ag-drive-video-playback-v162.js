/* AG Site V162 — reprodução direta de vídeo do Google Drive com fallback */
(function(){
  'use strict';
  const txt=v=>String(v??'');
  const html=v=>txt(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function did(value){const s=txt(value).trim();let m=s.match(/drive\.google\.com\/file\/d\/([^/?#]+)/i);if(m)return m[1];m=s.match(/[?&]id=([^&#]+)/i);return m?decodeURIComponent(m[1]):''}
  function dkey(value){try{return new URL(txt(value),location.href).searchParams.get('resourcekey')||''}catch(e){return ''}}
  function direct(id,key=''){return `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t${key?`&resourcekey=${encodeURIComponent(key)}`:''}`}
  function preview(id,key=''){return `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview${key?`?resourcekey=${encodeURIComponent(key)}`:''}`}
  function view(id,key=''){return `https://drive.google.com/file/d/${encodeURIComponent(id)}/view${key?`?resourcekey=${encodeURIComponent(key)}`:''}`}
  function yt(url){const m=txt(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/i);return m?m[1]:''}
  function vm(url){const m=txt(url).match(/vimeo\.com\/(?:video\/)?(\d+)/i);return m?m[1]:''}
  function note(text){const n=document.querySelector('#agVideoViewer .video-viewer-note');if(n)n.innerHTML=text||''}
  function fallback(frame,id,key,title){frame.innerHTML=`<iframe src="${html(preview(id,key))}" title="${html(title)}" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;note(`Seu navegador não abriu o arquivo original. Usando o player do Google Drive. <a href="${html(view(id,key))}" target="_blank" rel="noopener">Abrir vídeo no Drive</a>`)}
  function driveVideo(frame,id,key,title,video){
    frame.innerHTML='';
    const wrap=document.createElement('div');wrap.className='ag-site-drive-native';
    const loading=document.createElement('div');loading.className='ag-site-drive-loading';loading.innerHTML='<span></span><b>Carregando vídeo…</b><small>Abrindo o arquivo original do Google Drive.</small>';
    const player=document.createElement('video');player.controls=true;player.playsInline=true;player.preload='metadata';player.setAttribute('controlsList','nodownload');
    const thumb=video?.thumb||'';if(thumb)player.poster=thumb;
    const source=document.createElement('source');source.src=direct(id,key);if(/^video\//i.test(video?.mimeType||''))source.type=video.mimeType;player.appendChild(source);wrap.append(player,loading);frame.appendChild(wrap);
    let done=false;const ready=()=>{if(done)return;done=true;loading.remove();note(`Reprodução direta pelo Google Drive. <a href="${html(view(id,key))}" target="_blank" rel="noopener">Abrir no Drive</a>`)};const fail=()=>{if(done)return;done=true;fallback(frame,id,key,title)};
    player.addEventListener('loadedmetadata',ready,{once:true});player.addEventListener('canplay',ready,{once:true});player.addEventListener('error',fail,{once:true});source.addEventListener('error',fail,{once:true});setTimeout(()=>{if(!done&&player.readyState<1)fail()},9000);player.play().catch(()=>{});
  }
  window.openAgVideo=function(url,title='Vídeo do imóvel',video=null){
    const el=ensureAgVideoViewer(),frame=document.getElementById('agVideoViewerFrame');document.getElementById('agVideoViewerTitle').textContent=title;
    const id=video?.driveFileId||did(video?.drivePreviewUrl||url||video?.driveWebViewLink),key=video?.driveResourceKey||dkey(video?.drivePreviewUrl||video?.driveWebViewLink||url),y=yt(url),v=vm(url);
    if(id)driveVideo(frame,id,key,title,video);
    else if(y){frame.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(y)}?autoplay=1&rel=0" title="${html(title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;note('')}
    else if(v){frame.innerHTML=`<iframe src="https://player.vimeo.com/video/${encodeURIComponent(v)}?autoplay=1" title="${html(title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;note('')}
    else{frame.innerHTML=`<video controls autoplay playsinline preload="metadata" src="${html(url)}"></video>`;note('')}
    el.classList.add('show');
  };
})();
