(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
  var sections = links.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });

  // Navbar blur once the page scrolls
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);

    // Active section highlight
    var pos = window.scrollY + window.innerHeight * 0.35;
    var current = 0;
    sections.forEach(function (s, i) {
      if (s && s.offsetTop <= pos) current = i;
    });
    links.forEach(function (a, i) {
      a.classList.toggle('active', i === current);
      if (i === current) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Mobile menu
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });
  links.forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) setMenu(false);
  });

  // Scroll reveal (content stays visible if JS or IntersectionObserver is unavailable)
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    var items = document.querySelectorAll('.sec h2, .lead, .chips, .skills .card, .proj, .ct');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        el.classList.add('in');
        // hand hover transitions back to the element after the reveal
        setTimeout(function () {
          el.classList.remove('reveal', 'in');
          el.style.transitionDelay = '';
        }, 900);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      el.classList.add('reveal');
      var sib = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(sib % 4, 3) * 70 + 'ms';
      io.observe(el);
    });
  }
})();