(function(){
  'use strict';
  var header=document.querySelector('.site-header');
  var toggle=document.getElementById('menuToggle');
  var nav=document.getElementById('siteNav');
  function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
  toggle.addEventListener('click',function(){
    var open=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    nav.classList.toggle('open',open);
  });
  nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeMenu);});
  document.addEventListener('keydown',function(event){if(event.key==='Escape')closeMenu();});
  window.addEventListener('resize',function(){if(window.innerWidth>680)closeMenu();});
  function onScroll(){header.classList.toggle('scrolled',window.scrollY>18);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
    },{threshold:.12});
    document.querySelectorAll('.section-label,.about-grid h2,.about-copy,.tool-card,.work-card,.timeline-item,.contact-inner h2').forEach(function(el){el.classList.add('reveal');observer.observe(el);});
  }
})();