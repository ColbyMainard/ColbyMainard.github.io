# AGENTS.md — Agent Guide

Operating guide for AI agents working in this repository. Read this first; it captures the architecture, conventions, and guardrails you need before editing. For project overview see [README.md](README.md); for the maintainer-facing instructions see [CLAUDE.md](CLAUDE.md).

## Orientation

- **What this is:** Colby Mainard's personal website — a static, **client-side-only** site.
- **Hosting:** GitHub Pages. There is **no server-side processing, no build server, and no runtime backend**. Everything must work as plain files served statically.
- **Audience:** potential colleagues, potential employers, and fellow technology enthusiasts. Keep content credible and professional.
- **Must work from both `file://` and `https://` origins.** Test patterns that browsers restrict on `file://` (see CORS below).
- **No build step is required to view the site.** The only compile step is SCSS → CSS (see Build).

## Repository map

| Path | What it holds |
| ---- | ------------- |
| `index.html` | Landing page (work history, education, projects, skills, certifications). The only HTML file at repo root. |
| `assets/html/` | All non-index pages: `tech_takes.html`, `hobbies.html`, `tech_resources.html`, `guides.html`, `privacy.html`. |
| `assets/css/` | `default.scss` (single compile entry) + 6 partials; compiled `default.css` (committed); `*.css.map` (gitignored). |
| `assets/js/` | Shared scripts, per-page `*_animations.js`, and page helpers. All client-side. |
| `assets/images/` | `favicon.png`, photography (`photographyHobby/`), misc images. |
| `assets/markdown/` | Dated strategy/audit reports (SEO, accessibility, backlink, content, roadmap) and progress notes. |
| `assets/other/` | Misc supporting files (e.g. `pgp_email_key.asc`). |
| Root config | `manifest.json` (PWA), `service-worker.js` (offline precache), `robots.txt`, `sitemap.xml`, `llms.txt` (LLM crawler summary), `press_mentions.csv`. |
| `.github/workflows/static.yml` | CI: deploys the **entire repo** to GitHub Pages on every push to `master` (and manual `workflow_dispatch`). |

## Build & deploy

- **Compile CSS (only build step):**

  ```bash
  sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css
  ```

  Edit the SCSS, then commit the regenerated `default.css`. Drop `--sourcemap=none` for local dev maps (they are gitignored).
  - This command targets Ubuntu/Debian. If it fails, you may be on Windows/non-Debian — **retry before reporting failure**.
- **Deploy:** push to `master` (or run the `static.yml` workflow). No other deploy action is needed.

## Conventions

### CSS / SCSS

- **`default.scss` is the single compile entry point.** It `@import`s the per-page partials (`index`, `hobbies`, `tech_takes`, `tech_resources`, `privacy_policy`, `guides`) and holds shared/global styles (header nav, body, footer, cookie banner, back-to-top button, code blocks, clipboard button).
- It compiles to **`default.css`, the one stylesheet every page links.**
- **Color palettes are SCSS variables.** Shared palettes (noir / smart / emerald_efficiency) sit near the top of `default.scss`; each per-page partial also defines its own palette (e.g. cyberpunk_dreams on index). Keep text/background pairs at **WCAG AA contrast (≥4.5:1 for body text)**.
- Layout must **scale for both mobile and desktop**; keep styling consistent across pages.

### JavaScript

- **Client-side only.** Every script must run with no server and tolerate a `file://` origin.
- **Minimal dependencies.** AnimeJS is the *only* external library, loaded per page from a CDN via an `importmap` plus a small module shim that exposes it as `window.anime`. The deferred `*_animations.js` files are **classic scripts** that consume that global. Before adding any npm dependency, **confirm with the user**; prefer generic JS / NodeJS with few transitive deps.
- **Shared deferred scripts loaded on every page:** `cookie_consent.js`, `navbar.js`, `back_to_top.js`, `clipboard.js`, `service_worker_register.js` — plus the page's own `*_animations.js` and occasional helpers (e.g. `tech_takes_engagement.js` reading-time).
- `cookie_consent.js` **gates Google Analytics** — GA does not load until the visitor grants consent. Do not load analytics before consent.
- `service_worker_register.js` registers `service-worker.js` and **injects the `<link rel="manifest">` at runtime**, only over `http(s)` (browsers block manifest fetches from `file://`).
- `navbar.js` drives the responsive nav toggle and shared header markup; keep the header consistent across pages.

### HTML & structure

- **Preserve indentation** for IDE-friendly maintenance.
- Every page shares a consistent **header** with navigation to other sections and other pages.
- JS and CSS live in **separate files imported in `<head>`** — avoid inline scripts/styles.
- Pages must be **easy to read and navigate**.

### Accessibility

- Markup must work well with **screen readers**. Organize elements in logical reading order.
- Existing patterns to keep: skip links are intentionally **screen-reader-only** (always hidden, not focus-reveal); data tables carry a `visually-hidden` `<caption>` and `scope`-ed `<th>`; decorative SVGs use `aria-hidden="true"`; **new** inline SVGs should use `role="img"` + `<title>`.
- Maintain visible focus indicators and sufficient color contrast.

### SEO & structured data

- Each page embeds **`schema.org` JSON-LD** (`<script type="application/ld+json">`) in `<head>` (Person/WebSite/ProfilePage, BreadcrumbList, HowTo, Article, ItemList, etc.). **Preserve these blocks when editing page content;** extend rather than remove.
- Keep `sitemap.xml`, `robots.txt`, and `llms.txt` accurate when pages or content change.

### CORS & `file://`

- Watch for Cross-Origin restrictions when adding or organizing files. The runtime-injected manifest (above) is the canonical example of working around a `file://` CORS limit — follow that pattern rather than hardcoding restricted resources.

## Hard rules (do not)

- **Do not hand-edit `default.css`.** Change the SCSS and recompile.
- **Do not hardcode `<link rel="manifest">`** in HTML — it is injected by `service_worker_register.js`.
- **Do not remove or break the JSON-LD structured-data blocks.**
- **Do not load Google Analytics (or other tracking) before cookie consent.**
- **Do not add external dependencies** (npm or CDN) without confirming with the user; keep dependencies minimal.
- **Do not assume a backend** — no server-side code, env-based secrets, or API routes will run.

## Where to find things

- Dated audits and strategy docs (accessibility, SEO, backlinks, content, roadmap) live in `assets/markdown/` as `*-YYYY-MM-DD.md`. Check the most recent before re-auditing.
- Note: `assets/js/current_time.js` exists and is precached by the service worker but is **not referenced by any page** (legacy/unused) — verify before relying on it.
