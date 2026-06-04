/* ui.js — Muôn Nơi shared UI
   Single source: theme · lang · active nav · mobile menu
   No external libs. No trackers. */
(function () {
  "use strict";

  var html = document.documentElement;

  /* ── THEME ─────────────────────────────────────────── */
  var THEME_KEY = "mn-theme";

  function applyTheme(t) {
    var v = t === "light" ? "light" : "dark";
    html.setAttribute("data-theme", v);
    var icon = document.getElementById("themeIcon");
    if (icon) icon.textContent = v === "dark" ? "◑" : "◐";
    try { localStorage.setItem(THEME_KEY, v); } catch (_) {}
  }

  (function () {
    var saved = "dark";
    try { saved = localStorage.getItem(THEME_KEY) || "dark"; } catch (_) {}
    applyTheme(saved);
  })();

  var btnTheme = document.getElementById("btnTheme");
  if (btnTheme) {
    btnTheme.addEventListener("click", function () {
      applyTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ── LANG ──────────────────────────────────────────── */
  var LANG_KEY = "mn-lang";
  var LABEL_VI = "Tiếng Việt";
  var LABEL_EN = "English";

  function applyLang(l) {
    var v = l === "en" ? "en" : "vi";
    html.setAttribute("lang", v);
    var lbl = document.getElementById("langLabel");
    if (lbl) lbl.textContent = v === "en" ? LABEL_EN : LABEL_VI;
    try { localStorage.setItem(LANG_KEY, v); } catch (_) {}
  }

  (function () {
    var saved = "vi";
    try { saved = localStorage.getItem(LANG_KEY) || "vi"; } catch (_) {}
    applyLang(saved);
  })();

  var btnLang = document.getElementById("btnLang");
  if (btnLang) {
    btnLang.addEventListener("click", function () {
      var cur = html.getAttribute("lang") === "en" ? "en" : "vi";
      applyLang(cur === "en" ? "vi" : "en");
    });
  }

  /* ── ACTIVE NAV ─────────────────────────────────────── */
  (function () {
    var path = location.pathname.replace(/\/+$/, "") || "/";
    document.querySelectorAll("[data-route]").forEach(function (a) {
      var r = (a.getAttribute("data-route") || "").replace(/\/+$/, "") || "/";
      var active = r === "/" ? path === "/" : (path === r || path.startsWith(r + "/"));
      a.classList.toggle("is-active", active);
    });
  })();

  /* ── MOBILE MENU ────────────────────────────────────── */
  var burger = document.getElementById("mnBurger");
  var menu   = document.getElementById("mnMobileMenu");

  function closeMenu() {
    if (!menu) return;
    menu.hidden = true;
    if (burger) burger.setAttribute("aria-expanded", "false");
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
    });
    document.addEventListener("click", function (e) {
      if (!menu.hidden && !burger.contains(e.target) && !menu.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ── YEAR ───────────────────────────────────────────── */
  document.querySelectorAll(".mn-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ── GLOBAL LINK CONSISTENCY ───────────────────────── */
  (function () {
    var footerRight = document.querySelector(".mn-footer__right");
    if (!footerRight) return;

    var required = [
      { href: "/about/", label: "Giới thiệu" },
      { href: "/manifesto/", label: "Tuyên ngôn" },
      { href: "/press/", label: "Báo chí" },
      { href: "/newsletter/", label: "Bản tin" }
    ];

    required.forEach(function (item) {
      var exists = footerRight.querySelector('a[href="' + item.href + '"]');
      if (exists) return;

      var a = document.createElement("a");
      a.className = "mn-footer__link";
      a.setAttribute("href", item.href);
      a.setAttribute("data-route", item.href);
      a.textContent = item.label;
      footerRight.appendChild(a);
    });
  })();

})();
