/**
 * quiz.json files that exist on disk are well-formed. Do not invent quizzes.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXPECTED = ['01-linux', '02-git', '03-docker', '04-kubernetes'];

test('quiz.json exists only for linux/git/docker/kubernetes and answers are in range', () => {
  const found = fs.readdirSync(ROOT).filter((name) => {
    const p = path.join(ROOT, name, 'quiz.json');
    return fs.existsSync(p) && fs.statSync(p).isFile();
  }).sort();
  assert.deepEqual(found, EXPECTED);

  for (const dir of found) {
    const quiz = JSON.parse(fs.readFileSync(path.join(ROOT, dir, 'quiz.json'), 'utf8'));
    assert.equal(quiz.module, dir);
    assert.ok(Array.isArray(quiz.questions) && quiz.questions.length >= 1, dir);
    for (const q of quiz.questions) {
      assert.ok(q.id, `${dir} question missing id`);
      assert.ok(q.prompt, `${q.id} missing prompt`);
      assert.ok(Array.isArray(q.choices) && q.choices.length >= 2, `${q.id} choices`);
      assert.equal(typeof q.answer, 'number', `${q.id} answer`);
      assert.ok(q.answer >= 0 && q.answer < q.choices.length, `${q.id} answer out of range`);
    }
  }
});
