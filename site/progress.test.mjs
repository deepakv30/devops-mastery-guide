/**
 * Unit tests for browser progress (no DOM). Node's built-in runner: `npm test`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = fs.readFileSync(path.join(__dirname, 'js/progress.js'), 'utf8');
const THEME_KEY = 'dmg:theme';
const PROGRESS_KEY = 'dmg:progress:v1';

function loadProgress(initial = {}) {
  const store = { ...initial };
  const sandbox = {
    window: {},
    localStorage: {
      getItem(k) {
        return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
      },
      setItem(k, v) {
        store[k] = String(v);
      },
      removeItem(k) {
        delete store[k];
      },
    },
    Date,
    JSON,
    Object,
    Number,
  };
  vm.runInNewContext(SOURCE, sandbox);
  return { progress: sandbox.window.DMGProgress, store };
}

test('reset clears module bands, checkpoints, and the storage key', () => {
  const { progress, store } = loadProgress();
  progress.setBand('01-linux', 'beginner', true);
  progress.setCheckpoint('01-linux', 'read', true);
  progress.recordVisit('01-linux');
  assert.equal(progress.isBeginnerDone('01-linux'), true);
  assert.ok(store[PROGRESS_KEY]);

  progress.reset();

  assert.equal(progress.isBeginnerDone('01-linux'), false);
  assert.equal(progress.get('01-linux').visitedAt, 0);
  assert.equal(progress.get('01-linux').checkpoints.readAt, null);
  assert.equal(progress.getPath(), '');
  assert.equal(store[PROGRESS_KEY], undefined);
});

test('reset does not clear theme preference', () => {
  const { progress, store } = loadProgress({ [THEME_KEY]: 'dark' });
  progress.setBand('01-linux', 'beginner', true);
  progress.reset();
  assert.equal(store[THEME_KEY], 'dark');
  assert.equal(store[PROGRESS_KEY], undefined);
});

test('reset notifies existing listeners with empty state', () => {
  const { progress } = loadProgress();
  progress.setBand('01-linux', 'beginner', true);
  let seen = null;
  progress.onChange((state) => {
    seen = state;
  });
  progress.reset();
  assert.ok(seen);
  assert.equal(Object.keys(seen.modules).length, 0);
  assert.equal(progress.isBeginnerDone('01-linux'), false);
});

test('listeners registered during notify are not called in the same reset', { timeout: 1000 }, () => {
  const { progress } = loadProgress();
  let calls = 0;
  progress.onChange(function () {
    calls += 1;
    progress.onChange(function () {
      calls += 1;
    });
  });
  progress.reset();
  assert.equal(calls, 1);
});
