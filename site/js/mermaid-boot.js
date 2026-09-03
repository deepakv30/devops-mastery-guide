(function () {
  'use strict';

  function theme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'neutral';
  }

  function boot() {
    if (!window.mermaid) return;
    window.mermaid.initialize({
      startOnLoad: false,
      theme: theme(),
      securityLevel: 'strict',
      fontFamily: 'IBM Plex Mono, ui-monospace, monospace'
    });
    window.mermaid.run({ querySelector: '.mermaid' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
