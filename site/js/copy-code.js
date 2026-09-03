(function () {
  'use strict';

  function enhance() {
    document.querySelectorAll('.prose pre').forEach(function (pre) {
      if (pre.closest('.mermaid-wrap')) return;
      if (pre.parentElement && pre.parentElement.classList.contains('code-block')) return;
      var wrap = document.createElement('div');
      wrap.className = 'code-block';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy';
      btn.textContent = 'Copy';
      btn.addEventListener('click', function () {
        var text = pre.textContent || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = 'Copied';
            setTimeout(function () { btn.textContent = 'Copy'; }, 1400);
          }).catch(function () {
            btn.textContent = 'Copy failed';
          });
        }
      });
      wrap.appendChild(btn);
    });

    if (window.hljs) {
      document.querySelectorAll('.prose pre code').forEach(function (el) {
        if (el.classList.contains('language-mermaid')) return;
        window.hljs.highlightElement(el);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }
}());
