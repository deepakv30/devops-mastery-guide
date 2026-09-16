# Learning site

Static reader for the same markdown as GitHub. Teaching text does not live here. See [AGENTS.md](../AGENTS.md).

## Run locally

From the repository root (Node 20+):

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4173/](http://127.0.0.1:4173/). `npm run build` writes `site/dist/`.

## What it renders

| URL | Source |
|---|---|
| `/` | `curriculum.json` + `learning-paths/*.json` + mermaid from `README.md` |
| `/how-to-learn/` | `docs/HOW_TO_LEARN.md` |
| `/concept-map/` | `docs/CONCEPT_MAP.md` |
| `/glossary/` | `docs/GLOSSARY.md` |
| `/catalog/` | module index |
| `/01-linux/` … | each module `README.md` and split files. Old numbered URLs (`/09-git/`, `/08-github-actions/`, `/02-ansible/`, `/05-terraform/`) redirect. |
| `/projects/` | `projects/README.md` and capstone READMEs |

Progress is stored in the browser (`localStorage` key `dmg:progress:v1`). **Reset progress** on home clears that key (not the theme). Clearing site data also clears it. There is no account.

Legacy numbered URLs write `rel=canonical` from `curriculum.pagesUrl` plus the destination path. Do not prefix `urlPath()` there — `pagesUrl` already includes `/devops-mastery-guide`. The build rejects HTML that contains a doubled base path.

## GitHub Pages

Workflow: [`.github/workflows/pages.yml`](../.github/workflows/pages.yml). Set **Settings → Pages → Source** to GitHub Actions. `SITE_BASE` is `/devops-mastery-guide` so project Pages works.

Each page gets a unique meta description (module `job` plus band/exercise title, or the first prose paragraph for docs). The shared layout also emits Open Graph / Twitter Card tags, `theme-color`, favicon, and apple-touch-icon. The share image is `site/img/og-cover.png` (1200×630).

## Do not

- Hand-edit `site/dist/`
- Put a new concept in HTML that is missing from a module or `docs/`
