#!/usr/bin/env node
/**
 * Fill marked tables in learner markdown from curriculum.json and learning-paths/.
 * Teaching prose around the markers is left alone.
 *
 *   node scripts/sync-indexes.mjs           # write
 *   node scripts/sync-indexes.mjs --check   # fail if drift
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function write(rel, text) {
  fs.writeFileSync(path.join(ROOT, rel), text);
}

const curriculum = JSON.parse(read('curriculum.json'));
const pathFiles = fs.readdirSync(path.join(ROOT, 'learning-paths'))
  .filter((f) => f.endsWith('.json'))
  .sort();
const learningPaths = pathFiles.map((f) => JSON.parse(read(path.join('learning-paths', f))))
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || String(a.id).localeCompare(String(b.id)));
const byId = Object.fromEntries(curriculum.modules.map((m) => [m.id, m]));

function replaceRegion(text, name, inner) {
  const start = `<!-- ${name}:start -->`;
  const end = `<!-- ${name}:end -->`;
  if (!text.includes(start) || !text.includes(end)) {
    throw new Error(`${name}: missing start/end markers`);
  }
  const re = new RegExp(
    `${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
  );
  const block = `${start}\n${inner.trim()}\n${end}`;
  return text.replace(re, block);
}

function moduleTable() {
  const rows = curriculum.modules.map((m) =>
    `| ${m.number} | [${m.title}](./${m.dir}/README.md) | ${m.job} | Beginner → Production |`).join('\n');
  return `| # | Module | Job in one sentence | Levels |\n|---|---|---|---|\n${rows}`;
}

function pathTable() {
  const rows = learningPaths.map((lp) => {
    const entry = byId[lp.entry] || curriculum.projects.find((p) => p.id === lp.entry);
    if (!entry) throw new Error(`path ${lp.id} entry ${lp.entry} is not in curriculum`);
    const start = entry.number
      ? `[${entry.number}. ${entry.title}](./${entry.dir}/README.md)`
      : `[${entry.title}](./${entry.dir}/README.md)`;
    return `| ${lp.title} | ${start} | [${lp.id}](./learning-paths/${lp.id}.json) |`;
  });
  rows.push('| Combine the tools | [Capstones](./projects/README.md) | — |');
  rows.push('| Look up one tool | [Module table](#modules) or [concept map](./docs/CONCEPT_MAP.md) | — |');
  return `| Your goal | Start here | Path file |\n|---|---|---|\n${rows.join('\n')}`;
}

function installTable() {
  const rows = curriculum.modules.map((m) =>
    `| ${m.number} ${m.title} | ${m.install} |`).join('\n');
  return `| You are opening… | Have this ready |\n|---|---|\n${rows}`;
}

function orderList() {
  const lines = learningPaths.map((lp) => {
    const nums = (lp.steps || [])
      .filter((s) => s.required)
      .map((s) => {
        const mod = byId[s.module];
        return mod ? mod.number : null;
      })
      .filter(Boolean);
    return `- **${lp.title}:** **${nums.join(' → ')}**.`;
  });
  lines.push('- Capstones: only after the modules listed on [projects/README.md](../projects/README.md).');
  lines.push('');
  lines.push('Folder numbers follow the default (apps) study order. Other paths skip modules. JSON for the same routes: [learning-paths/](../learning-paths/).');
  return lines.join('\n');
}

function apply(rel, replacements) {
  let text = read(rel);
  const original = text;
  for (const [name, inner] of replacements) {
    text = replaceRegion(text, name, inner);
  }
  if (CHECK) {
    if (text !== original) {
      console.error(`sync-indexes: ${rel} is out of date. Run: npm run sync`);
      process.exitCode = 1;
      return;
    }
    console.log(`sync-indexes: ${rel} ok`);
    return;
  }
  if (text !== original) {
    write(rel, text);
    console.log(`sync-indexes: wrote ${rel}`);
  } else {
    console.log(`sync-indexes: ${rel} unchanged`);
  }
}

apply('README.md', [
  ['curriculum:paths', pathTable()],
  ['curriculum:modules', moduleTable()],
]);

apply('docs/HOW_TO_LEARN.md', [
  ['curriculum:install', installTable()],
  ['curriculum:order', orderList()],
]);

if (CHECK && process.exitCode) {
  process.exit(process.exitCode);
}
