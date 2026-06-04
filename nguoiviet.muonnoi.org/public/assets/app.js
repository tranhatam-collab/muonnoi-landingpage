/* Người Việt Muôn Nơi · app.js
 * Light interactions: theme toggle, lang toggle, mobile menu.
 * No tracking, no third-party.
 */
(function(){
  'use strict';
  var ls = (function(){ try { return window.localStorage; } catch(_) { return null; } })();
  var html = document.documentElement;

  // Theme
  var savedTheme = ls && ls.getItem('mn:theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  var themeBtn = document.getElementById('btnTheme');
  if (themeBtn) {
    themeBtn.addEventListener('click', function(){
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      if (ls) ls.setItem('mn:theme', next);
    });
  }

  // Lang
  var savedLang = ls && ls.getItem('mn:lang') || 'vi';
  html.setAttribute('data-lang', savedLang);
  var langBtn = document.getElementById('btnLang');
  if (langBtn) {
    var langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = savedLang === 'vi' ? 'Tiếng Việt' : 'English';
    langBtn.addEventListener('click', function(){
      var next = html.getAttribute('data-lang') === 'vi' ? 'en' : 'vi';
      html.setAttribute('data-lang', next);
      if (langLabel) langLabel.textContent = next === 'vi' ? 'Tiếng Việt' : 'English';
      if (ls) ls.setItem('mn:lang', next);
    });
  }

  // Mobile menu
  var burger = document.getElementById('mnBurger');
  var drawer = document.getElementById('mnMobile');
  if (burger && drawer) {
    burger.addEventListener('click', function(){
      drawer.classList.toggle('is-open');
      var expanded = drawer.classList.contains('is-open');
      burger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // Smooth anchor
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth',block:'start'});
  });

  // Close drawer on nav
  if (drawer) {
    drawer.addEventListener('click', function(e){
      if (e.target.closest('a')) drawer.classList.remove('is-open');
    });
  }
})();
