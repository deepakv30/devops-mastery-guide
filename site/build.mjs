#!/usr/bin/env node
/**
 * Render repo markdown into site/dist. Teaching text stays in the markdown files.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import GithubSlugger from 'github-slugger';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(__dirname, 'dist');
const SITE_BASE = (process.env.SITE_BASE || '').replace(/\/$/, '');
const GITHUB_REPO = process.env.GITHUB_REPO || 'https://github.com/deepakv30/devops-mastery-guide';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function posixRel(abs) {
  return path.relative(ROOT, abs).split(path.sep).join('/');
}

function urlPath(p) {
  const clean = p.startsWith('/') ? p : `/${p}`;
  return `${SITE_BASE}${clean}`;
}

function asset(p) {
  return urlPath(p);
}

function githubBlob(rel) {
  return `${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${rel}`;
}

function slugTitle(text) {
  return String(text || '').replace(/<[^>]+>/g, '').trim();
}

const curriculum = JSON.parse(read('curriculum.json'));
const pathFiles = fs.readdirSync(path.join(ROOT, 'learning-paths'))
  .filter((f) => f.endsWith('.json'))
  .sort();
const learningPaths = pathFiles.map((f) => JSON.parse(read(path.join('learning-paths', f))))
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || String(a.id).localeCompare(String(b.id)));

function fail(msg) {
  console.error(`build: ${msg}`);
  process.exit(1);
}

for (const lp of learningPaths) {
  if (!lp.id || !Array.isArray(lp.steps)) fail(`learning path ${lp.id || '?'} is missing id/steps`);
  for (const step of lp.steps) {
    const id = step.module;
    const isModule = curriculum.modules.some((m) => m.id === id);
    const isProject = curriculum.projects.some((p) => p.id === id);
    if (!isModule && !isProject) fail(`learning path ${lp.id} references missing ${id}`);
    const dir = isModule
      ? curriculum.modules.find((m) => m.id === id).dir
      : curriculum.projects.find((p) => p.id === id).dir;
    if (!fs.existsSync(path.join(ROOT, dir))) fail(`directory missing for ${id}: ${dir}`);
  }
}

/** @type {Map<string, {url: string, title: string, kind: string, moduleId?: string, source: string}>} */
const pageMap = new Map();

function addPage(source, url, title, kind, moduleId) {
  const rel = source.split(path.sep).join('/');
  pageMap.set(rel, { url, title, kind, moduleId, source: rel });
}

function pageUrlForFile(name, dir) {
  if (name === 'README.md') return `/${dir}/`;
  const stem = name.replace(/\.md$/, '');
  return `/${dir}/${stem}/`;
}

for (const mod of curriculum.modules) {
  const files = ['README.md', 'beginner.md', 'intermediate.md', 'advanced.md', 'cheatsheet.md'];
  for (const name of files) {
    const rel = `${mod.dir}/${name}`;
    if (!fs.existsSync(path.join(ROOT, rel))) continue;
    const title = name === 'README.md' ? mod.title : `${mod.title} — ${name.replace(/\.md$/, '')}`;
    addPage(rel, pageUrlForFile(name, mod.dir), title, name === 'README.md' ? 'module' : 'module-page', mod.id);
  }
  const exDir = path.join(ROOT, mod.dir, 'exercises');
  if (fs.existsSync(exDir)) {
    for (const name of fs.readdirSync(exDir).filter((f) => f.endsWith('.md')).sort()) {
      const rel = `${mod.dir}/exercises/${name}`;
      addPage(rel, `/${mod.dir}/exercises/${name.replace(/\.md$/, '')}/`, `${mod.title} exercise`, 'exercise', mod.id);
    }
  }
}

function firstHeading(rel, fallback) {
  const m = read(rel).match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function mermaidFromReadme() {
  const src = read('README.md');
  const m = src.match(/```mermaid\r?\n([\s\S]*?)```/);
  if (!m) fail('README.md has no mermaid fence for the home diagram');
  return m[1].replace(/\s+$/, '');
}

function dirFor(id) {
  const mod = curriculum.modules.find((x) => x.id === id);
  if (mod) return mod.dir;
  const proj = curriculum.projects.find((x) => x.id === id);
  if (proj) return proj.dir;
  fail(`unknown curriculum id ${id}`);
}

addPage('docs/HOW_TO_LEARN.md', '/how-to-learn/', 'How to learn', 'doc');
addPage('docs/CONCEPT_MAP.md', '/concept-map/', 'Concept map', 'doc');
addPage('docs/GLOSSARY.md', '/glossary/', 'Glossary', 'doc');
addPage('README.md', '/', 'Home', 'home');
addPage('projects/README.md', '/projects/', 'Capstone projects', 'project');
for (const p of curriculum.projects) {
  const rel = `${p.dir}/README.md`;
  if (!fs.existsSync(path.join(ROOT, rel))) fail(`project README missing: ${rel}`);
  addPage(rel, `/${p.dir}/`, p.title, 'project');
}
const projectsRoot = path.join(ROOT, 'projects');
for (const name of fs.readdirSync(projectsRoot).filter((n) => n.endsWith('.md')).sort()) {
  const rel = `projects/${name}`;
  if (pageMap.has(rel)) continue;
  addPage(rel, `/${rel.replace(/\.md$/, '')}/`, firstHeading(rel, name.replace(/\.md$/, '')), 'doc');
}
addPage('ROADMAP.md', '/roadmap/', 'Roadmap', 'doc');

let currentSource = 'README.md';
const slugger = new GithubSlugger();

function rewriteHref(href) {
  if (!href) return href;
  const trimmed = href.trim();
  if (/^(https?:|mailto:|data:)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('#')) return trimmed;
  const [filePart, hashPart] = trimmed.split('#');
  const hash = hashPart ? `#${hashPart}` : '';
  if (!filePart) return trimmed;
  const fromDir = path.dirname(path.join(ROOT, currentSource));
  const resolved = path.resolve(fromDir, filePart);
  if (!resolved.startsWith(ROOT)) fail(`link escaped repo in ${currentSource}: ${href}`);
  const rel = posixRel(resolved);
  const page = pageMap.get(rel);
  if (page) return urlPath(page.url) + hash;
  if (fs.existsSync(resolved)) {
    const st = fs.statSync(resolved);
    if (st.isFile()) return githubBlob(rel) + hash;
    if (st.isDirectory()) {
      return `${GITHUB_REPO}/tree/${GITHUB_BRANCH}/${rel}` + hash;
    }
  }
  fail(`broken link in ${currentSource}: ${href} (resolved ${rel})`);
  return trimmed;
}

const renderer = {
  heading({ tokens, depth, text }) {
    const html = this.parser.parseInline(tokens);
    const id = slugger.slug(slugTitle(text));
    return `<h${depth} id="${escapeAttr(id)}">${html}</h${depth}>\n`;
  },
  code({ text, lang }) {
    const language = (lang || '').trim();
    if (language === 'mermaid') {
      return `<div class="mermaid-wrap"><pre class="mermaid">${escapeHtml(text)}</pre></div>\n`;
    }
    const cls = language ? ` class="language-${escapeAttr(language)}"` : '';
    return `<pre><code${cls}>${escapeHtml(text)}</code></pre>\n`;
  },
};

marked.use({ gfm: true, renderer, walkTokens(token) {
  if ((token.type === 'link' || token.type === 'image') && token.href) {
    token.href = rewriteHref(token.href);
  }
} });

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, '&#39;');
}

function parseMarkdown(sourceRel) {
  currentSource = sourceRel;
  slugger.reset();
  const md = read(sourceRel);
  let html = marked.parse(md, { async: false });
  html = wrapFirstSuccess(html);
  if (sourceRel === 'docs/GLOSSARY.md') html = wrapGlossary(html);
  return { html, title: titleFromMarkdown(md, sourceRel), headings: headingsFromHtml(html) };
}

function titleFromMarkdown(md, sourceRel) {
  const m = md.match(/^#\s+(.+)$/m);
  if (m) return slugTitle(m[1]);
  const page = pageMap.get(sourceRel);
  return page ? page.title : sourceRel;
}

function headingsFromHtml(html) {
  const out = [];
  const re = /<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g;
  let m;
  while ((m = re.exec(html))) {
    out.push({ depth: Number(m[1]), id: m[2], text: slugTitle(m[3]) });
  }
  return out;
}

function wrapFirstSuccess(html) {
  return html.replace(
    /(<h2 id="beginner-first-success">[\s\S]*?<\/h2>)([\s\S]*?)(?=<h2\b|$)/i,
    '<section class="first-success">$1$2</section>',
  );
}

function wrapGlossary(html) {
  return html.replace(/<li>([\s\S]*?)<\/li>/g, (all, inner) => {
    const key = slugTitle(inner).slice(0, 180);
    return `<li data-glossary-item="${escapeAttr(key.toLowerCase())}">${inner}</li>`;
  });
}

function navItems(currentUrl) {
  const items = [
    { href: urlPath('/'), label: 'Home' },
    { href: urlPath('/catalog/'), label: 'Catalog' },
    { href: urlPath('/how-to-learn/'), label: 'How to learn' },
    { href: urlPath('/glossary/'), label: 'Glossary' },
    { href: urlPath('/concept-map/'), label: 'Concept map' },
    { href: `${GITHUB_REPO}`, label: 'GitHub', external: true },
  ];
  return items.map((item) => {
    const current = !item.external && item.href === urlPath(currentUrl);
    return `<a href="${item.href}"${current ? ' aria-current="page"' : ''}${item.external ? ' rel="noopener"' : ''}>${item.label}</a>`;
  }).join('');
}

function layout({ title, description, url, body, sidebar = '', toc = '', moduleId = '', extraHead = '' }) {
  const canonical = curriculum.pagesUrl.replace(/\/$/, '') + url;
  const fullTitle = title === 'DevOps Mastery Guide' ? title : `${title} · DevOps Mastery Guide`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeAttr(description)}">
  <link rel="canonical" href="${escapeAttr(canonical)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,650;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css">
  <link rel="stylesheet" href="${asset('/css/app.css')}">
  ${extraHead}
</head>
<body${moduleId ? ` data-module-id="${escapeAttr(moduleId)}"` : ''}>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="${urlPath('/')}">DevOps Mastery Guide</a>
    <button class="icon-btn nav-toggle" type="button" data-nav-open aria-label="Open menu">Menu</button>
    <nav class="nav">${navItems(url)}
      <button class="icon-btn" type="button" data-theme-toggle>Theme</button>
    </nav>
  </header>
  ${body}
  <footer class="site-footer">
    <div class="wrap">Markdown in the repo is canonical. Progress is stored in this browser only. <a href="${GITHUB_REPO}">GitHub</a> · <a href="${urlPath('/how-to-learn/')}">How to learn</a></div>
  </footer>
  <script src="${asset('/js/data.js')}"></script>
  <script src="${asset('/js/progress.js')}"></script>
  <script src="${asset('/js/header.js')}"></script>
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"></script>
  <script src="${asset('/js/copy-code.js')}"></script>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
  <script src="${asset('/js/mermaid-boot.js')}"></script>
  <script src="${asset('/js/app.js')}"></script>
</body>
</html>`;
}

function tocHtml(headings) {
  if (!headings.length) return '';
  const items = headings.map((h) =>
    `<li class="toc-h${h.depth}"><a href="#${escapeAttr(h.id)}">${escapeHtml(h.text)}</a></li>`).join('');
  return `<aside class="toc" aria-label="On this page"><div class="toc-header">On this page</div><ol class="toc-nav">${items}</ol></aside>`;
}

function moduleSidebar(activeId) {
  const links = curriculum.modules.map((m) => {
    const href = urlPath(`/${m.dir}/`);
    const cls = m.id === activeId ? 'sidebar-link active' : 'sidebar-link';
    return `<a class="${cls}" href="${href}" data-sidebar-module="${m.id}"><span class="dot" data-mod-dot="${m.id}"></span>${escapeHtml(m.number)}. ${escapeHtml(m.title)}</a>`;
  }).join('');
  const projects = curriculum.projects.map((p) => {
    const href = urlPath(`/${p.dir}/`);
    return `<a class="sidebar-link" href="${href}" data-sidebar-module="${p.id}">${escapeHtml(p.title)}</a>`;
  }).join('');
  return `<aside class="lesson-sidebar" aria-label="Modules">
    <div class="sidebar-kicker">Modules</div>
    ${links}
    <div class="sidebar-kicker">Capstones</div>
    ${projects}
    <div class="sidebar-kicker">Docs</div>
    <a class="sidebar-link" href="${urlPath('/how-to-learn/')}">How to learn</a>
    <a class="sidebar-link" href="${urlPath('/glossary/')}">Glossary</a>
    <a class="sidebar-link" href="${urlPath('/concept-map/')}">Concept map</a>
  </aside>
  <button class="sidebar-toggle" type="button" data-sidebar-toggle>Modules</button>`;
}

function bandTabs(mod, currentRel) {
  if (!mod) return '';
  const candidates = [
    { file: `${mod.dir}/README.md`, label: 'Overview' },
    { file: `${mod.dir}/beginner.md`, label: 'Beginner' },
    { file: `${mod.dir}/intermediate.md`, label: 'Intermediate' },
    { file: `${mod.dir}/advanced.md`, label: 'Production' },
    { file: `${mod.dir}/cheatsheet.md`, label: 'Cheatsheet' },
  ].filter((c) => pageMap.has(c.file));
  if (candidates.length <= 1) {
    return `<nav class="band-tabs" aria-label="Bands">
      <a href="#beginner-core-concepts">Beginner</a>
      <a href="#intermediate-go-deeper">Intermediate</a>
      <a href="#production">Production</a>
      <a href="#practice">Practice</a>
      ${pageMap.has(`${mod.dir}/cheatsheet.md`) ? `<a href="${urlPath(pageMap.get(`${mod.dir}/cheatsheet.md`).url)}">Cheatsheet</a>` : ''}
    </nav>`;
  }
  return `<nav class="band-tabs" aria-label="Module pages">${candidates.map((c) => {
    const page = pageMap.get(c.file);
    const cls = c.file === currentRel ? 'active' : '';
    return `<a class="${cls}" href="${urlPath(page.url)}">${c.label}</a>`;
  }).join('')}</nav>`;
}

function studyChrome(mod) {
  if (!mod) return '';
  return `<aside class="study-chrome" data-study-chrome data-module="${mod.id}">
    <h2>This session</h2>
    <p class="lab-prereq"><strong>Need:</strong> ${escapeHtml(mod.install)}</p>
    <div class="checks">
      <label><input type="checkbox" data-checkpoint="read"> Read the overview and mental model</label>
      <label><input type="checkbox" data-checkpoint="firstSuccess"> Ran first success</label>
      <label><input type="checkbox" data-checkpoint="exercises"> Did a basic exercise</label>
      <label><input type="checkbox" data-band="beginner"> Mark beginner done</label>
    </div>
    <p class="note">Stored in this browser only.</p>
  </aside>`;
}

function pager() {
  return `<nav class="pager" aria-label="Path">
    <a hidden data-path-prev href="#"><span class="kicker">Previous on path</span><span data-path-prev-title></span></a>
    <a hidden class="next" data-path-next href="#"><span class="kicker">Next on path</span><span data-path-next-title></span></a>
  </nav>`;
}

function writePage(url, html) {
  const rel = url === '/' ? 'index.html' : `${url.replace(/^\//, '').replace(/\/$/, '')}/index.html`;
  const out = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

/** Old numbered dirs → current dirs. GitHub Pages has no server rewrite. */
const DIR_REDIRECTS = {
  '09-git': '02-git',
  '08-github-actions': '05-github-actions',
  '02-ansible': '08-ansible',
  '05-terraform': '09-terraform',
};

function writeRedirect(fromUrl, toUrl) {
  const dest = urlPath(toUrl);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${escapeAttr(dest)}">
  <link rel="canonical" href="${escapeAttr(curriculum.pagesUrl.replace(/\/$/, '') + dest)}">
  <title>Moved</title>
  <script>location.replace(${JSON.stringify(dest)});</script>
</head>
<body>
  <p>This page moved to <a href="${escapeAttr(dest)}">${escapeHtml(dest)}</a>.</p>
</body>
</html>`;
  writePage(fromUrl, html);
}

function writeDirRedirects() {
  const pages = [...pageMap.values()];
  for (const [oldDir, newDir] of Object.entries(DIR_REDIRECTS)) {
    writeRedirect(`/${oldDir}/`, `/${newDir}/`);
    for (const page of pages) {
      if (page.url === `/${newDir}/` || page.url.startsWith(`/${newDir}/`)) {
        const from = `/${oldDir}/${page.url.slice(`/${newDir}/`.length)}`;
        if (from !== page.url) writeRedirect(from, page.url);
      }
    }
  }
}

function docPage(sourceRel) {
  const meta = pageMap.get(sourceRel);
  const parsed = parseMarkdown(sourceRel);
  const search = sourceRel === 'docs/GLOSSARY.md'
    ? `<div class="search-row"><label for="glossary-q">Search terms</label><br>
       <input id="glossary-q" type="search" data-glossary-search placeholder="ClusterIP, scrape, state file…"></div>`
    : '';
  const body = `<div class="lesson-layout">
    ${moduleSidebar('')}
    <main class="lesson-main" id="main">
      <div class="lesson-content">
        <p class="crumb"><a href="${urlPath('/')}">Home</a> / ${escapeHtml(parsed.title)}</p>
        ${search}
        <article class="prose">${parsed.html}</article>
      </div>
    </main>
    ${tocHtml(parsed.headings)}
  </div>`;
  return layout({
    title: parsed.title,
    description: parsed.title,
    url: meta.url,
    body,
  });
}

function modulePage(sourceRel) {
  const meta = pageMap.get(sourceRel);
  const mod = curriculum.modules.find((m) => m.id === meta.moduleId);
  const parsed = parseMarkdown(sourceRel);
  const github = githubBlob(sourceRel);
  const body = `<div class="lesson-layout">
    ${moduleSidebar(mod ? mod.id : '')}
    <main class="lesson-main" id="main">
      <div class="lesson-content">
        <p class="crumb"><a href="${urlPath('/')}">Home</a> / ${escapeHtml(mod ? mod.title : parsed.title)}
          · <a href="${github}">Edit on GitHub</a>
          <span hidden data-path-label></span>
        </p>
        ${mod ? bandTabs(mod, sourceRel) : ''}
        ${mod && sourceRel.endsWith('README.md') ? studyChrome(mod) : ''}
        <article class="prose">${parsed.html}</article>
        ${pager()}
      </div>
    </main>
    ${tocHtml(parsed.headings)}
  </div>`;
  return layout({
    title: parsed.title,
    description: mod ? mod.job : parsed.title,
    url: meta.url,
    body,
    moduleId: mod ? mod.id : '',
  });
}

function homePage() {
  const mermaidSrc = mermaidFromReadme();
  const nCap = curriculum.projects.length;

  const pathCards = learningPaths.map((lp) => {
    const href = urlPath(`/${dirFor(lp.entry)}/`) + `?path=${encodeURIComponent(lp.id)}`;
    return `<a class="card" href="${href}">
      <h2>${escapeHtml(lp.title)}</h2>
      <p>${escapeHtml(lp.summary)}</p>
      <span class="meta">${escapeHtml(lp.id)} · Open on site</span>
    </a>`;
  }).join('');

  const rows = curriculum.modules.map((m) => `<tr>
    <td><span class="dot" data-mod-dot="${m.id}"></span><a href="${urlPath('/' + m.dir + '/')}">${m.number}. ${escapeHtml(m.title)}</a></td>
    <td>${escapeHtml(m.job)}</td>
    <td>${m.beginnerMinutes} min beginner</td>
    <td><a href="${githubBlob(m.dir + '/README.md')}">GitHub</a></td>
  </tr>`).join('');

  const body = `<main class="wrap" id="main">
    <section class="hero">
      <p class="section-label">${curriculum.modules.length} tools · ${nCap} capstones</p>
      <h1>From a Linux shell to shipping and watching an app.</h1>
      <p class="lede">Each module is a mental model, a 15-minute first success, then Intermediate and Production you can skip. The markdown on GitHub is the same text as this reader.</p>
    </section>
    <div class="progress-panel">
      <div class="progress-row">
        <span data-progress-summary>0 / ${curriculum.modules.length} modules · beginner marked done</span>
        <button class="text-btn" type="button" data-reset-progress>Reset progress</button>
      </div>
      <div class="progress-track"><div class="progress-fill" data-progress-fill></div></div>
      <p class="note">Progress stays in this browser. Clearing site data clears it.</p>
    </div>
    <p class="section-label">Choose a path</p>
    <div class="card-grid">${pathCards}
      <a class="card" href="${urlPath('/projects/')}">
        <h2>Capstones</h2>
        <p>Combine modules after the beginner bands they name. Stubs stay labeled stubs.</p>
        <span class="meta">projects/</span>
      </a>
      <a class="card" href="${urlPath('/catalog/')}">
        <h2>I already know one tool</h2>
        <p>Jump to a module, cheatsheet, or glossary term.</p>
        <span class="meta">catalog</span>
      </a>
    </div>
    <p class="section-label">How the tools fit</p>
    <div class="mermaid-wrap"><pre class="mermaid">${escapeHtml(mermaidSrc)}</pre></div>
    <p class="section-label">Modules</p>
    <table class="module-table">
      <thead><tr><th>Module</th><th>Job</th><th>Time</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="section-label">Clone and prove it</p>
    <pre class="clone">git clone ${GITHUB_REPO}.git
cd devops-mastery-guide
./scripts/preflight.sh</pre>
    <p class="note"><a href="${urlPath('/how-to-learn/')}">How to learn</a> · <a href="${urlPath('/glossary/')}">Glossary</a> · <a href="${GITHUB_REPO}">GitHub source</a></p>
  </main>`;

  return layout({
    title: 'DevOps Mastery Guide',
    description: 'Hands-on path from first Linux commands to shipping and observing applications.',
    url: '/',
    body,
  });
}

function catalogPage() {
  const cards = curriculum.modules.map((m) => `<a class="card" href="${urlPath('/' + m.dir + '/')}">
    <h2>${m.number}. ${escapeHtml(m.title)}</h2>
    <p>${escapeHtml(m.job)}</p>
    <span class="meta">${m.beginnerMinutes} min beginner · ${m.fullHours}h full</span>
  </a>`).join('');
  const body = `<main class="wrap" id="main">
    <p class="section-label">Catalog</p>
    <h1 class="page-title">${curriculum.modules.length} modules</h1>
    <p class="lede">Beginner first success is the door. Production is never the first install.</p>
    <div class="card-grid">${cards}</div>
    <p class="section-label">Capstones</p>
    <div class="card-grid">${curriculum.projects.map((p) => `<a class="card" href="${urlPath('/' + p.dir + '/')}">
      <h2>${escapeHtml(p.title)}</h2>
      <p>${escapeHtml(p.job)}</p>
      <span class="meta">${escapeHtml(p.startWhen)}</span>
    </a>`).join('')}</div>
  </main>`;
  return layout({
    title: 'Catalog',
    description: `All ${curriculum.modules.length} modules and ${curriculum.projects.length} capstones.`,
    url: '/catalog/',
    body,
  });
}

function copyStatic() {
  const cssDir = path.join(DIST, 'css');
  const jsDir = path.join(DIST, 'js');
  fs.mkdirSync(cssDir, { recursive: true });
  fs.mkdirSync(jsDir, { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'css/app.css'), path.join(cssDir, 'app.css'));
  for (const name of ['progress.js', 'header.js', 'copy-code.js', 'mermaid-boot.js', 'app.js']) {
    fs.copyFileSync(path.join(__dirname, 'js', name), path.join(jsDir, name));
  }
  fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
}

function writeDataJs() {
  const moduleUrls = {};
  for (const m of curriculum.modules) moduleUrls[m.id] = `/${m.dir}/`;
  for (const p of curriculum.projects) moduleUrls[p.id] = `/${p.dir}/`;
  const payload = {
    base: SITE_BASE,
    repo: GITHUB_REPO,
    modules: curriculum.modules,
    projects: curriculum.projects,
    paths: learningPaths,
    moduleUrls,
  };
  const js = `window.DMG_DATA = ${JSON.stringify(payload)};\n`;
  fs.writeFileSync(path.join(DIST, 'js/data.js'), js);
}

function fourOhFour() {
  const body = `<main class="wrap" id="main">
    <h1 class="page-title">Page not found</h1>
    <p class="lede">That URL is not a page in this build. Start at <a href="${urlPath('/')}">home</a> or the <a href="${urlPath('/catalog/')}">catalog</a>.</p>
  </main>`;
  return layout({ title: 'Not found', description: 'Not found', url: '/404.html', body });
}

if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
copyStatic();
writeDataJs();

writePage('/', homePage());
writePage('/catalog/', catalogPage());

for (const [rel, meta] of pageMap) {
  if (meta.kind === 'home') continue;
  if (meta.kind === 'doc') {
    writePage(meta.url, docPage(rel));
    continue;
  }
  if (meta.kind === 'module' || meta.kind === 'module-page' || meta.kind === 'exercise' || meta.kind === 'project') {
    writePage(meta.url, modulePage(rel));
  }
}

fs.writeFileSync(path.join(DIST, '404.html'), fourOhFour());
writeDirRedirects();

console.log(`build: wrote ${DIST} (${pageMap.size} mapped pages, base=${SITE_BASE || '/'})`);
