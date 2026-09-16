(function () {
  'use strict';

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function pathFromQuery() {
    var params = new URLSearchParams(window.location.search);
    return params.get('path') || '';
  }

  function bindStudyChrome() {
    var chrome = $('[data-study-chrome]');
    if (!chrome || !window.DMGProgress) return;
    var id = chrome.getAttribute('data-module');
    if (!id) return;

    window.DMGProgress.recordVisit(id);

    function sync() {
      var prog = window.DMGProgress.get(id);
      $all('[data-checkpoint]', chrome).forEach(function (input) {
        var name = input.getAttribute('data-checkpoint');
        input.checked = !!(prog.checkpoints && prog.checkpoints[name + 'At']);
      });
      $all('[data-band]', chrome).forEach(function (input) {
        var band = input.getAttribute('data-band');
        input.checked = !!(prog.bands && prog.bands[band + 'At']);
      });
      var quizStatus = $('[data-quiz-status]', chrome);
      if (quizStatus) {
        quizStatus.textContent = prog.quizPassedAt ? '· passed' : '';
      }
    }

    chrome.addEventListener('change', function (event) {
      var t = event.target;
      if (t.matches('[data-checkpoint]')) {
        window.DMGProgress.setCheckpoint(id, t.getAttribute('data-checkpoint'), t.checked);
      }
      if (t.matches('[data-band]')) {
        window.DMGProgress.setBand(id, t.getAttribute('data-band'), t.checked);
      }
    });

    window.DMGProgress.onChange(sync);
    sync();
  }

  function bindPathPicker() {
    var q = pathFromQuery();
    if (q && window.DMGProgress) window.DMGProgress.setPath(q);
    var pathId = q || (window.DMGProgress ? window.DMGProgress.getPath() : '');
    if (!pathId || !window.DMG_DATA) return;

    var path = (window.DMG_DATA.paths || []).filter(function (p) { return p.id === pathId; })[0];
    if (!path) return;

    $all('[data-path-label]').forEach(function (el) {
      el.textContent = path.title;
      el.hidden = false;
    });

    var steps = path.steps || [];
    $all('[data-sidebar-module]').forEach(function (el) {
      var id = el.getAttribute('data-sidebar-module');
      var idx = -1;
      steps.forEach(function (s, i) { if (s.module === id) idx = i; });
      if (idx < 0) return;
      el.classList.add('on-path');
    });

    var here = document.body.getAttribute('data-module-id');
    if (!here) return;
    var order = steps.map(function (s) { return s.module; });
    var i = order.indexOf(here);
    if (i < 0) return;
    var prev = order[i - 1];
    var next = order[i + 1];
    var prevA = $('[data-path-prev]');
    var nextA = $('[data-path-next]');
    var base = window.DMG_DATA.base || '';
    function hrefFor(id) {
      var page = (window.DMG_DATA.moduleUrls || {})[id];
      return page ? base + page + (pathId ? ('?path=' + encodeURIComponent(pathId)) : '') : '';
    }
    if (prevA && prev) {
      prevA.href = hrefFor(prev);
      prevA.hidden = false;
      var prevMeta = (window.DMG_DATA.modules || []).filter(function (m) { return m.id === prev; })[0];
      $('[data-path-prev-title]', prevA).textContent = prevMeta ? prevMeta.title : prev;
    }
    if (nextA && next) {
      nextA.href = hrefFor(next);
      nextA.hidden = false;
      var nextMeta = (window.DMG_DATA.modules || []).filter(function (m) { return m.id === next; })[0];
      $('[data-path-next-title]', nextA).textContent = nextMeta ? nextMeta.title : next;
    }
  }

  function paintHomeProgress() {
    if (!window.DMGProgress || !window.DMG_DATA) return;
    var mods = window.DMG_DATA.modules || [];
    var done = 0;
    mods.forEach(function (m) {
      if (window.DMGProgress.isBeginnerDone(m.id)) done += 1;
      $all('[data-mod-dot="' + m.id + '"]').forEach(function (el) {
        var p = window.DMGProgress.get(m.id);
        el.classList.toggle('is-done', !!(p.bands && p.bands.beginnerAt));
        el.classList.toggle('is-seen', !!(p.visitedAt && !(p.bands && p.bands.beginnerAt)));
      });
    });
    var label = $('[data-progress-summary]');
    if (label) {
      label.textContent = done + ' / ' + mods.length + ' modules · beginner marked done';
    }
    var fill = $('[data-progress-fill]');
    if (fill && mods.length) {
      fill.style.transform = 'scaleX(' + (done / mods.length) + ')';
    }
  }

  function bindHomeProgress() {
    if (!window.DMGProgress) return;
    var reset = $('[data-reset-progress]');
    if (reset) {
      reset.addEventListener('click', function () {
        if (window.confirm('Clear progress stored in this browser?')) window.DMGProgress.reset();
      });
    }
    window.DMGProgress.onChange(paintHomeProgress);
    paintHomeProgress();
  }

  function glossarySearch() {
    var input = $('[data-glossary-search]');
    if (!input) return;
    var items = $all('[data-glossary-item]');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      items.forEach(function (el) {
        var hay = (el.getAttribute('data-glossary-item') || '') + ' ' + (el.textContent || '');
        el.hidden = q !== '' && hay.toLowerCase().indexOf(q) === -1;
      });
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function reviewHref(review) {
    if (!review) return '';
    var base = (window.DMG_DATA && window.DMG_DATA.base) || '';
    var m = String(review).match(/^([^/#]+)\/README\.md(?:#(.*))?$/);
    if (m) return base + '/' + m[1] + '/' + (m[2] ? '#' + m[2] : '');
    if (review.charAt(0) === '/') return base + review;
    return review;
  }

  function renderQuiz(root, quiz, moduleId) {
    var questions = quiz.questions || [];
    var fields = questions.map(function (q, i) {
      var choices = (q.choices || []).map(function (choice, ci) {
        var id = 'quiz-' + q.id + '-' + ci;
        return '<label for="' + escapeHtml(id) + '"><input id="' + escapeHtml(id) + '" type="radio" name="' + escapeHtml(q.id) + '" value="' + ci + '"> ' + escapeHtml(choice) + '</label>';
      }).join('');
      return '<fieldset class="quiz-q" data-qid="' + escapeHtml(q.id) + '">' +
        '<legend>' + (i + 1) + '. ' + escapeHtml(q.prompt) + '</legend>' +
        choices +
        '<p class="quiz-why" hidden></p>' +
        '</fieldset>';
    }).join('');
    root.innerHTML = '<form data-quiz-form>' + fields +
      '<div class="quiz-actions"><button class="quiz-submit" type="submit">Check answers</button>' +
      '<p class="note" data-quiz-result></p></div></form>';

    var form = $('[data-quiz-form]', root);
    var result = $('[data-quiz-result]', root);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var correct = 0;
      questions.forEach(function (q) {
        var field = $('[data-qid="' + q.id + '"]', form);
        var picked = data.get(q.id);
        var why = $('.quiz-why', field);
        var ok = picked !== null && Number(picked) === Number(q.answer);
        if (ok) correct += 1;
        field.classList.toggle('is-right', ok);
        field.classList.toggle('is-wrong', !ok);
        if (why) {
          why.hidden = false;
          var review = q.review ? ' <a href="' + escapeHtml(reviewHref(q.review)) + '">Review</a>' : '';
          why.innerHTML = (ok ? 'Correct. ' : 'Not quite. ') + escapeHtml(q.why || '') + review;
        }
      });
      var passed = questions.length > 0 && correct === questions.length;
      if (result) {
        result.textContent = passed
          ? 'All ' + questions.length + ' correct. Marked passed in this browser.'
          : correct + ' / ' + questions.length + ' correct. Retry after a look at the review links.';
      }
      if (passed && window.DMGProgress) window.DMGProgress.setQuizPassed(moduleId, true);
    });
  }

  function bindQuiz() {
    var mount = $('[data-quiz]');
    if (!mount) return;
    var moduleId = mount.getAttribute('data-quiz');
    var root = $('[data-quiz-root]', mount);
    if (!root) return;
    var quizPath = (window.DMG_DATA && window.DMG_DATA.quizzes && window.DMG_DATA.quizzes[moduleId]) || 'quiz.json';
    var base = (window.DMG_DATA && window.DMG_DATA.base) || '';
    var href = quizPath.charAt(0) === '/' ? base + quizPath : quizPath;
    fetch(href)
      .then(function (res) {
        if (!res.ok) throw new Error('quiz ' + res.status);
        return res.json();
      })
      .then(function (quiz) {
        if (!quiz || !Array.isArray(quiz.questions) || !quiz.questions.length) {
          root.textContent = 'No questions in this quiz file.';
          return;
        }
        renderQuiz(root, quiz, moduleId);
      })
      .catch(function () {
        root.textContent = 'Quiz failed to load. The questions live in this module’s quiz.json on GitHub.';
      });
  }

  function tocSpy() {
    var links = $all('.toc-nav a');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) {
      var id = decodeURIComponent((a.getAttribute('href') || '').replace(/^#/, ''));
      if (id) map[id] = a;
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = map[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          a.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindStudyChrome();
    bindPathPicker();
    bindHomeProgress();
    bindQuiz();
    glossarySearch();
    tocSpy();
  });
}());
