// marquee seamless dup
(()=>{const t=document.getElementById('track');if(t)t.innerHTML+=t.innerHTML;})();

function splitWords(el){
 const text=el.textContent;el.textContent='';
 text.split(/(\s+)/).forEach(tok=>{
  if(/^\s+$/.test(tok)){el.appendChild(document.createTextNode(' '));return;}
  const w=document.createElement('span');w.className='word';
  const inner=document.createElement('span');inner.textContent=tok;
  w.appendChild(inner);el.appendChild(w);
 });
 return el.querySelectorAll('.word>span');
}

window.addEventListener('load',()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let lenis;
 if(window.Lenis&&!reduce){lenis=new Lenis({lerp:.09});window.lenisInstance=lenis;function raf(t){lenis.raf(t);requestAnimationFrame(raf);}requestAnimationFrame(raf);}
 const hasGsap=window.gsap;
 if(hasGsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);if(lenis)lenis.on('scroll',ScrollTrigger.update);}

 // loader (homepage only)
 const loader=document.getElementById('loader');
 const lgw=document.getElementById('lgw');
 const heroLines=document.querySelectorAll('[data-hero] .line>span');
 const heroFades=document.querySelectorAll('.hero [data-fade]');
 if(hasGsap&&!reduce){gsap.set(heroLines,{yPercent:115});gsap.set(heroFades,{y:24,opacity:0});}
 function revealHero(){const tl=gsap.timeline();tl.to(heroLines,{yPercent:0,duration:1.05,ease:'power4.out',stagger:.11}).to(heroFades,{y:0,opacity:1,duration:.7,ease:'power3.out',stagger:.08},'-=.7');}

 if(loader){
  if(reduce||!hasGsap){loader.style.display='none';heroLines.forEach(s=>s.style.transform='none');heroFades.forEach(s=>{s.style.opacity=1;s.style.transform='none';});}
  else{
   const tl=gsap.timeline();
   tl.fromTo('#loader .lg img',{yPercent:110},{yPercent:0,duration:.9,ease:'power4.out',delay:.1},0)
     .fromTo('#bar',{width:'0%'},{width:'100%',duration:1,ease:'power2.inOut'},0)
     .to(loader,{yPercent:-100,duration:.9,ease:'power4.inOut'},'+=.15')
     .add(revealHero,'-=.4').set(loader,{display:'none'});
   // safety: if rAF stalls (tab backgrounded), force-clear loader
   setTimeout(()=>{if(loader&&getComputedStyle(loader).display!=='none'){gsap.set(loader,{display:'none'});gsap.set(heroLines,{yPercent:0});gsap.set(heroFades,{y:0,opacity:1});}},3500);
  }
 }
 // inner pages (no loader): reveal ihero title immediately
 if(!loader&&hasGsap&&!reduce&&heroLines.length){revealHero();}

 if(!hasGsap)return;

 document.querySelectorAll('[data-split]').forEach(el=>{
  const spans=splitWords(el);gsap.set(spans,{yPercent:115});
  ScrollTrigger.create({trigger:el,start:'top 85%',once:true,onEnter:()=>gsap.to(spans,{yPercent:0,duration:.9,ease:'power4.out',stagger:.06})});
 });
 gsap.utils.toArray('[data-fade]').forEach(el=>{
  if(el.closest('.hero'))return;
  gsap.set(el,{y:30,opacity:0});
  ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>gsap.to(el,{y:0,opacity:1,duration:.8,ease:'power3.out'})});
 });
 const px=document.getElementById('parallax');
 if(px)gsap.to(px,{yPercent:14,ease:'none',scrollTrigger:{trigger:px.parentElement,start:'top bottom',end:'bottom top',scrub:true}});

 // detail-page hero: reveal without loader
 if(!loader){
  const h=document.querySelector('.phero-in');
  if(h){gsap.from(h.children,{y:40,opacity:0,duration:.9,ease:'power3.out',stagger:.1,delay:.15});}
 }
 ScrollTrigger.refresh();
});

// lightbox (delegated; works regardless of gsap)
document.addEventListener('click',e=>{
 const lb=document.getElementById('lightbox');if(!lb)return;
 const t=e.target;
 if(t.matches('.galgrid img, .plan img')){const li=document.getElementById('lb-img');li.src=t.dataset.full||t.src;li.alt=t.alt||'';lb.classList.add('on');}
 else if(t.id==='lb-close'||t.id==='lightbox'){lb.classList.remove('on');}
});

// contact interest chips toggle
document.addEventListener('click',e=>{
 if(e.target.matches('[data-chips] span')){e.target.classList.toggle('sel');
  e.target.style.borderColor=e.target.classList.contains('sel')?'var(--brand)':'';
  e.target.style.background=e.target.classList.contains('sel')?'var(--brand)':'';
  e.target.style.color=e.target.classList.contains('sel')?'#fff':'';}
});
// projects filter
(()=>{
 const bar=document.querySelector('[data-filter]');if(!bar)return;
 bar.addEventListener('click',e=>{
  const b=e.target.closest('.chip');if(!b)return;
  bar.querySelectorAll('.chip').forEach(c=>{c.classList.remove('on');c.setAttribute('aria-pressed','false');});b.classList.add('on');b.setAttribute('aria-pressed','true');
  const f=b.dataset.f;
  document.querySelectorAll('#projgrid .pitem').forEach(it=>{
   const show=f==='all'||it.dataset.kind===f||it.dataset.type===f;
   it.style.display=show?'':'none';
  });
  if(window.ScrollTrigger)ScrollTrigger.refresh();
 });
 const pType = new URLSearchParams(window.location.search).get('type');
 if (pType) {
  const match = Array.from(bar.querySelectorAll('.chip')).find(c => c.dataset.f && c.dataset.f.toLowerCase() === pType.toLowerCase());
  if (match) match.click();
 }
})();

// ===== v4 interactions =====
// mobile drawer
(()=>{
 const b=document.getElementById('burger'),d=document.getElementById('drawer');if(!b||!d)return;
 const close=()=>{d.classList.remove('open');document.body.classList.remove('nav-open');b.classList.remove('x');b.setAttribute('aria-expanded','false');};
 b.setAttribute('aria-expanded','false');b.addEventListener('click',()=>{const o=d.classList.toggle('open');document.body.classList.toggle('nav-open',o);b.classList.toggle('x',o);b.setAttribute('aria-expanded',String(o));});
 d.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
})();
// scroll progress + back to top
(()=>{
 const p=document.getElementById('progress'),t=document.getElementById('totop');
 const upd=()=>{const h=document.documentElement.scrollHeight-innerHeight;const y=scrollY;if(p)p.style.width=(h>0?(y/h*100):0)+'%';if(t)t.classList.toggle('show',y>700);};
 addEventListener('scroll',upd,{passive:true});upd();
 if(t)t.addEventListener('click',()=>{if(window.lenisInstance)window.lenisInstance.scrollTo(0);else scrollTo({top:0,behavior:'smooth'});});
})();
// FAQ accordion
document.addEventListener('click',e=>{
 const q=e.target.closest('.faq-q');if(!q)return;
 const it=q.closest('.faq-item'),a=it.querySelector('.faq-a'),open=it.classList.contains('open');
 it.parentElement.querySelectorAll('.faq-item.open').forEach(o=>{if(o!==it){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;o.querySelector('.faq-q').setAttribute('aria-expanded','false');}});
 it.classList.toggle('open',!open);a.style.maxHeight=open?null:a.scrollHeight+'px';q.setAttribute('aria-expanded',String(!open));
});
// count-up stats: real value stays in the HTML; animates only once visible
window.addEventListener('load',()=>{
 if(!window.gsap||!window.ScrollTrigger)return;
 document.querySelectorAll('.metrics b').forEach(el=>{
  const raw=el.textContent.trim();const m=raw.match(/^(\d+)(.*)$/);if(!m)return;
  const end=parseInt(m[1],10);const suf=m[2]||'';const isYear=end>1900&&end<2100;
  ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>{
   const obj={v:isYear?end-40:0};
   gsap.to(obj,{v:end,duration:1.6,ease:'power2.out',onUpdate:()=>{el.textContent=Math.round(obj.v)+suf;}});
  }});
 });
});

// header turns solid after scrolling
(()=>{const h=document.querySelector('header');if(!h)return;
 const u=()=>h.classList.toggle('scrolled',scrollY>40);addEventListener('scroll',u,{passive:true});u();})();

// gallery category filter
(()=>{const bar=document.querySelector('[data-gfilter]');if(!bar)return;
 bar.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;
  bar.querySelectorAll('.chip').forEach(c=>{c.classList.remove('on');c.setAttribute('aria-pressed','false');});b.classList.add('on');b.setAttribute('aria-pressed','true');
  document.querySelectorAll('#galgrid img').forEach(i=>{i.hidden=!(b.dataset.f==='all'||i.dataset.cat===b.dataset.f);});
  if(window.ScrollTrigger)ScrollTrigger.refresh();});})();

// ===================== v9: audit fixes =====================

// Enquiry forms: validate, then hand the enquiry to WhatsApp (real delivery until enquiry.php exists).
(()=>{
 const WA='919829184872';
 const msgEl=f=>f.querySelector('.form-msg');
 function validate(f){
  let ok=true;
  f.querySelectorAll('.invalid').forEach(e=>e.classList.remove('invalid'));
  f.querySelectorAll('input,select,textarea').forEach(el=>{
   if(el.type==='checkbox'||el.type==='hidden'||el.type==='file')return;
   const badPhone=el.hasAttribute('data-phone')&&!/^\+?\d{10,13}$/.test(el.value.replace(/[\s()\-]/g,''));
   if(!el.checkValidity()||badPhone){el.classList.add('invalid');ok=false;}
  });
  const consent=f.querySelector('input[name=consent]');
  if(consent&&!consent.checked){ok=false;}
  return ok;
 }
 document.addEventListener('submit',e=>{
  const f=e.target;
  if(!f.matches('[data-enquiry],[data-career]'))return;
  e.preventDefault();
  const m=msgEl(f);
  if(!validate(f)){
   const c=f.querySelector('input[name=consent]');
   m.className='form-msg err';
   m.textContent=(c&&!c.checked&&f.querySelectorAll('.invalid').length===0)?'Please tick the consent box to continue.':'Please fill in your name and a valid phone number.';
   (f.querySelector('.invalid')||c).focus();
   return;
  }
  // Send to the server (saved in the database, visible in the admin panel).
  const btn=f.querySelector('button[type=submit]');
  btn.disabled=true;m.className='form-msg';m.textContent='Sending…';
  fetch(f.action,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'},credentials:'same-origin'})
   .then(r=>r.json().then(j=>({ok:r.ok,j})))
   .then(({ok,j})=>{
    m.className='form-msg '+(ok&&j.ok?'ok':'err');
    m.textContent=j.message||(ok?'Thank you!':'Something went wrong — please try again.');
    if(ok&&j.ok){f.reset();}
    else if(j.errors){Object.keys(j.errors).forEach(k=>{const el=f.querySelector(`[name="${k}"]`);if(el)el.classList.add('invalid');});}
   })
   .catch(()=>{
    // Network failure: never lose the lead — offer WhatsApp with the details filled in.
    const d=new FormData(f);
    const text=['Enquiry from the Kedia website','Name: '+d.get('name'),'Phone: '+d.get('phone'),d.get('project')?'Project: '+d.get('project'):'',d.get('message')||''].filter(Boolean).join('\n');
    m.className='form-msg err';m.textContent='';
    m.append('We could not send that right now. ');
    const a=document.createElement('a');a.href='https://wa.me/'+WA+'?text='+encodeURIComponent(text);a.target='_blank';a.rel='noopener';a.textContent='Send it on WhatsApp instead →';
    m.append(a);
   })
   .finally(()=>{btn.disabled=false;});
 });
 // clear the error state as the user types
 document.addEventListener('input',e=>{if(e.target.classList&&e.target.classList.contains('invalid')&&e.target.checkValidity())e.target.classList.remove('invalid');});
})();

// EMI calculator
(()=>{
 const f=document.querySelector('[data-emi]');if(!f)return;
 const out=f.querySelector('[data-emi-out]'),sum=f.querySelector('[data-emi-sum]');
 const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
 function calc(){
  const P=+f.querySelector('#emi-amt').value,r=+f.querySelector('#emi-rate').value/1200,n=+f.querySelector('#emi-yrs').value*12;
  if(!(P>0&&r>0&&n>0)){out.textContent='—';sum.textContent='';return;}
  const emi=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  out.textContent=inr(emi);
  sum.textContent=`Total interest ${inr(emi*n-P)} · Total payable ${inr(emi*n)}`;
 }
 f.addEventListener('input',calc);calc();
})();

// Map of all projects (Leaflet + OpenStreetMap), initialised when scrolled near
(()=>{
 const el=document.getElementById('allmap');if(!el)return;
 let done=false;
 function init(){
  if(done||!window.L)return;done=true;
  const pts=JSON.parse(el.dataset.points);
  const map=L.map(el,{scrollWheelZoom:false,attributionControl:true});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  const b=[];
  pts.forEach(p=>{
   const on=p.st==='Ongoing';
   const icon=L.divIcon({className:'',html:`<div class="kpin${on?' on':''}"></div>`,iconSize:[18,18],iconAnchor:[9,9]});
   L.marker([p.lat,p.lng],{icon,title:p.n}).addTo(map).bindPopup(`<b>${p.n}</b>${p.t} · ${p.st}<br><a href="${p.u}">View project →</a>`);
   b.push([p.lat,p.lng]);
  });
  map.fitBounds(b,{padding:[40,40]});
 }
 if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>{if(es.some(x=>x.isIntersecting)){const t=setInterval(()=>{if(window.L){clearInterval(t);init();}},100);io.disconnect();}},{rootMargin:'300px'});
  io.observe(el);
 }else{window.addEventListener('load',init);}
})();

// Cookie notice (remembered per browser)
(()=>{
 const c=document.getElementById('cookie');if(!c)return;
 let seen=false;try{seen=localStorage.getItem('kb-cookie')==='1';}catch(e){}
 if(!seen)c.classList.add('show');
 document.getElementById('cookie-ok').addEventListener('click',()=>{c.classList.remove('show');try{localStorage.setItem('kb-cookie','1');}catch(e){}});
})();
