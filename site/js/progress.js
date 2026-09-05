/**
 * Browser-only progress. No account, no network.
 *
 * dmg:progress:v1 = {
 *   schemaVersion: 1,
 *   pathId: string,
 *   modules: {
 *     "<id>": {
 *       visitedAt, quizPassedAt,
 *       checkpoints: { readAt, firstSuccessAt, exercisesAt },
 *       bands: { beginnerAt, intermediateAt, productionAt }
 *     }
 *   },
 *   updatedAt
 * }
 */
(function () {
  'use strict';

  var KEY = 'dmg:progress:v1';
  var listeners = [];
  var ID_ALIASES = {
    '09-git': '02-git',
    '08-github-actions': '05-github-actions',
    '02-ansible': '08-ansible',
    '05-terraform': '09-terraform'
  };

  function emptyModule() {
    return {
      visitedAt: 0,
      quizPassedAt: null,
      checkpoints: { readAt: null, firstSuccessAt: null, exercisesAt: null },
      bands: { beginnerAt: null, intermediateAt: null, productionAt: null }
    };
  }

  function emptyState() {
    return { schemaVersion: 1, pathId: '', modules: {}, updatedAt: 0 };
  }

  function ts(v) {
    var n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  function normalizeModule(raw) {
    raw = raw && typeof raw === 'object' ? raw : {};
    var c = raw.checkpoints && typeof raw.checkpoints === 'object' ? raw.checkpoints : {};
    var b = raw.bands && typeof raw.bands === 'object' ? raw.bands : {};
    return {
      visitedAt: ts(raw.visitedAt) || 0,
      quizPassedAt: ts(raw.quizPassedAt),
      checkpoints: {
        readAt: ts(c.readAt),
        firstSuccessAt: ts(c.firstSuccessAt),
        exercisesAt: ts(c.exercisesAt)
      },
      bands: {
        beginnerAt: ts(b.beginnerAt),
        intermediateAt: ts(b.intermediateAt),
        productionAt: ts(b.productionAt)
      }
    };
  }

  function read() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!raw || typeof raw !== 'object') return emptyState();
      var state = emptyState();
      state.pathId = typeof raw.pathId === 'string' ? raw.pathId : '';
      if (raw.modules && typeof raw.modules === 'object') {
        Object.keys(raw.modules).forEach(function (id) {
          if (ID_ALIASES[id]) return;
          state.modules[id] = normalizeModule(raw.modules[id]);
        });
        Object.keys(raw.modules).forEach(function (id) {
          var next = ID_ALIASES[id];
          if (!next || state.modules[next]) return;
          state.modules[next] = normalizeModule(raw.modules[id]);
        });
      }
      state.updatedAt = ts(raw.updatedAt) || 0;
      return state;
    } catch (_) {
      return emptyState();
    }
  }

  function write(state) {
    state.schemaVersion = 1;
    state.updatedAt = Date.now();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (_) { /* quota / private mode */ }
    listeners.forEach(function (fn) {
      try { fn(state); } catch (_) { /* listener */ }
    });
  }

  function ensure(state, id) {
    if (!state.modules[id]) state.modules[id] = emptyModule();
    return state.modules[id];
  }

  window.DMGProgress = {
    read: read,
    get: function (id) {
      if (!id) return emptyModule();
      var m = read().modules[id];
      return m ? normalizeModule(m) : emptyModule();
    },
    recordVisit: function (id) {
      if (!id) return;
      var state = read();
      ensure(state, id).visitedAt = Date.now();
      write(state);
    },
    setCheckpoint: function (id, name, complete) {
      var field = name + 'At';
      var state = read();
      var mod = ensure(state, id);
      if (!Object.prototype.hasOwnProperty.call(mod.checkpoints, field)) return;
      mod.checkpoints[field] = complete === false ? null : Date.now();
      write(state);
    },
    toggleCheckpoint: function (id, name) {
      var cur = this.get(id);
      var on = !!(cur.checkpoints && cur.checkpoints[name + 'At']);
      this.setCheckpoint(id, name, !on);
    },
    setBand: function (id, band, complete) {
      var field = band + 'At';
      var state = read();
      var mod = ensure(state, id);
      if (!Object.prototype.hasOwnProperty.call(mod.bands, field)) return;
      mod.bands[field] = complete === false ? null : Date.now();
      write(state);
    },
    toggleBand: function (id, band) {
      var cur = this.get(id);
      var on = !!(cur.bands && cur.bands[band + 'At']);
      this.setBand(id, band, !on);
    },
    isBeginnerDone: function (id) {
      var m = this.get(id);
      return !!(m.bands && m.bands.beginnerAt);
    },
    setPath: function (pathId) {
      var state = read();
      state.pathId = String(pathId || '');
      write(state);
    },
    getPath: function () {
      return read().pathId || '';
    },
    reset: function () {
      try { localStorage.removeItem(KEY); } catch (_) { /* ignore */ }
      var empty = emptyState();
      listeners.forEach(function (fn) {
        try { fn(empty); } catch (_) { /* listener */ }
      });
    },
    onChange: function (fn) {
      if (typeof fn !== 'function') return function () {};
      listeners.push(fn);
      return function () {
        var i = listeners.indexOf(fn);
        if (i >= 0) listeners.splice(i, 1);
      };
    }
  };
}());
