document.addEventListener('DOMContentLoaded',()=>{
  const purpose=document.getElementById('purpose');
  const tabs=[...document.querySelectorAll('[data-concept-purpose]')];
  const syncTabs=(value)=>tabs.forEach(b=>b.classList.toggle('active',b.dataset.conceptPurpose===value));
  tabs.forEach(btn=>btn.addEventListener('click',()=>{
    if(!purpose) return;
    purpose.value=btn.dataset.conceptPurpose;
    syncTabs(purpose.value);
    purpose.dispatchEvent(new Event('change',{bubbles:true}));
  }));
  if(purpose){purpose.value=purpose.value||'Venda';syncTabs(purpose.value);}

  const wrap=document.getElementById('searchDock');
  const toggle=document.getElementById('advancedLocationToggle');
  if(wrap&&toggle){
    const setFiltersOpen=(open)=>{
      wrap.classList.toggle('advanced-open',open);
      toggle.setAttribute('aria-expanded',String(open));
      toggle.textContent=open?'− Fechar filtros':'+ Mais filtros';
    };
    toggle.addEventListener('click',()=>setFiltersOpen(!wrap.classList.contains('advanced-open')));
    document.addEventListener('click',(ev)=>{
      if(wrap.classList.contains('advanced-open')&&!wrap.contains(ev.target)) setFiltersOpen(false);
    });
    document.addEventListener('keydown',(ev)=>{
      if(ev.key==='Escape'&&wrap.classList.contains('advanced-open')){
        setFiltersOpen(false);
        toggle.focus();
      }
    });
  }

  const price=document.getElementById('priceRange');
  const priceAdv=document.getElementById('priceRangeAdvanced');
  if(price&&priceAdv){priceAdv.value=price.value;priceAdv.addEventListener('change',()=>{price.value=priceAdv.value;price.dispatchEvent(new Event('change',{bubbles:true}));});price.addEventListener('change',()=>{priceAdv.value=price.value;});}
});
