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

Progress is stored in the browser (`localStorage` key `dmg:progress:v1`). Clearing the site data clears it. There is no account.

## GitHub Pages

Workflow: [`.github/workflows/pages.yml`](../.github/workflows/pages.yml). Set **Settings → Pages → Source** to GitHub Actions. `SITE_BASE` is `/devops-mastery-guide` so project Pages works.

## Do not

- Hand-edit `site/dist/`
- Put a new concept in HTML that is missing from a module or `docs/`
