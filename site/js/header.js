(function () {
  'use strict';

  var KEY = 'dmg:theme';

  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  function current() {
    try {
      var stored = localStorage.getItem(KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (_) { /* ignore */ }
    return systemDark() ? 'dark' : 'light';
  }

  applyTheme(current());

  document.addEventListener('click', function (event) {
    var toggle = event.target.closest('[data-theme-toggle]');
    if (toggle) {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (_) { /* ignore */ }
      applyTheme(next);
      return;
    }
    var open = event.target.closest('[data-nav-open]');
    if (open) {
      document.body.classList.toggle('nav-open');
      return;
    }
    var close = event.target.closest('[data-nav-close]');
    if (close) {
      document.body.classList.remove('nav-open');
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') document.body.classList.remove('nav-open', 'sidebar-open');
  });

  document.addEventListener('click', function (event) {
    var side = event.target.closest('[data-sidebar-toggle]');
    if (side) document.body.classList.toggle('sidebar-open');
  });
}());
