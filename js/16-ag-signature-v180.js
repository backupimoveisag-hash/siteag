(function(){
  function q(s,r=document){return r.querySelector(s)}
  function qa(s,r=document){return Array.from(r.querySelectorAll(s))}
  function boot(){
    document.documentElement.dataset.agExperience='signature-v180';

    // Mantém o catálogo como protagonista logo após a primeira dobra.
    const main=q('main#top');
    const hero=q('.concept-hero',main);
    const catalog=q('#properties',main);
    const strip=q('.ag-signature-strip');
    if(main&&hero&&catalog){
      if(strip){ strip.after(catalog); }
      else { hero.after(catalog); }
    }

    // Mensagem curta no resultado, sem interferir no valor calculado pelo app.
    const result=q('#resultCount');
    if(result){ result.setAttribute('aria-live','polite'); }

    // Melhora a leitura visual ao entrar na página sem tocar na lógica de filtros.
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('ag-signature-animate');obs.unobserve(e.target)}})
    },{threshold:.08,rootMargin:'0px 0px -40px 0px'});
    qa('.catalog-head,.property-card,.section-title-row,.intent-card,.location-card,.service-panel,.experience-band,.ag-editorial-inner,.faq-item').forEach(el=>obs.observe(el));

    // UX: clique no telefone do rodapé mantém ação direta e deixa o WhatsApp muito claro.
    const footerPhone=q('#footerPhone');
    if(footerPhone){footerPhone.title='Ligar para (47) 99123-7384'}

    // Identidade no botão flutuante secundário (caso ainda apareça o texto WA em algum navegador/cache).
    const floating=q('#floatingWa');
    if(floating){
      floating.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M19.11 17.21c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.34-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.45-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.82c.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.24.18 1.7.11.52-.08 1.61-.66 1.84-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32Z"/><path fill="currentColor" d="M16.03 5.33c-5.88 0-10.65 4.76-10.65 10.63 0 1.88.49 3.72 1.42 5.35L5.33 26.67l5.5-1.44a10.63 10.63 0 0 0 5.19 1.33h.01c5.86 0 10.64-4.77 10.64-10.64A10.61 10.61 0 0 0 16.03 5.33Zm0 19.43h-.01a8.86 8.86 0 0 1-4.52-1.24l-.32-.19-3.26.85.87-3.18-.21-.33a8.82 8.82 0 0 1-1.36-4.72c0-4.9 4-8.89 8.91-8.89a8.89 8.89 0 0 1 8.89 8.89c0 4.91-3.99 8.9-8.89 8.9Z"/></svg>';
      floating.title='Conversar no WhatsApp';
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
