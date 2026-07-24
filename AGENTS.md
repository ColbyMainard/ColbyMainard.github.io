# AGENTS.md — Agent Guide

You are an AI agent editing Colby Mainard's personal website. Read this guide before changing anything; it captures the architecture, conventions, and guardrails. Whatever the task, your change must leave the site static-servable, working from both `file://` and `https://`, accessible, and SEO-intact. For project overview see [README.md](README.md); for the maintainer-facing instructions see [CLAUDE.md](CLAUDE.md).

## Orientation

- **What this is:** Colby Mainard's personal website — a static, **client-side-only** site.
- **Hosting:** GitHub Pages. There is **no server-side processing, no build server, and no runtime backend**. Everything must work as plain files served statically.
- **Audience:** potential colleagues, potential employers, and fellow technology enthusiasts. Keep content credible and professional.
- **Must work from both `file://` and `https://` origins.** Test patterns that browsers restrict on `file://` (see CORS below). Known caveat: `404.html` degrades at nested missing URLs (see repo map).
- **No build step is required to view the site.** The only compile step is SCSS → CSS (see Build & deploy).

## Repository map

| Path | What it holds |
| ---- | ------------- |
| `index.html` | Landing page (work history, education, projects, skills, certifications). One of two HTML files at repo root (see `404.html`). |
| `404.html` | Custom GitHub Pages error page. Its content is served at whatever missing URL was requested. It deliberately omits `cookie_consent.js`/`service_worker_register.js` (their relative-path logic breaks at arbitrary depths) — do not "normalize" that. Its other paths are deliberately relative like every page's (only the icon links and the footer PGP/privacy links are root-absolute), so it styles from `file://` and at top-level missing URLs but renders unstyled, with broken internal links, at nested missing URLs (e.g. `/dir/typo`) — an accepted tradeoff; do not convert it back to root-absolute unasked. |
| `assets/html/` | All non-index pages: `tech_takes.html`, `hobbies.html`, `tech_resources.html`, `guides.html`, `privacy.html`. |
| `assets/css/` | `default.scss` (single compile entry) + 7 per-page partials; compiled `default.css` (committed); `*.css.map` (gitignored). |
| `assets/js/` | Shared scripts, per-page `*_animations.js`, and page helpers. All client-side. |
| `assets/images/` | `favicon.png`, `sharecard.png` (1200×630 social/OG card wired into every page's meta tags), photography (`photographyHobby/`), `miscellaneous/`, and GIMP `.xcf` design sources. |
| `assets/markdown/` | Dated strategy/audit reports (SEO, accessibility, backlink, content, feature recommendations, code review, roadmap) and progress notes. |
| `assets/other/` | Misc supporting files (e.g. `pgp_email_key.asc`). |
| Root config | `manifest.json` (PWA), `service-worker.js` (offline precache), `robots.txt`, `sitemap.xml`, `llms.txt` (LLM crawler summary), `feed.xml` (hand-maintained Atom feed for the Technical Stances page), `press_mentions.csv`. |
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

- **`default.scss` is the single compile entry point.** It `@import`s the seven per-page partials (`index`, `hobbies`, `tech_takes`, `tech_resources`, `privacy_policy`, `guides`, `page_not_found`) and holds shared/global styles (header nav, body, footer, cookie banner, back-to-top button, code blocks).
- It compiles to **`default.css`, the one stylesheet every page links.**
- **Color palettes are SCSS variables.** Shared palettes (noir / smart / emerald_efficiency) sit near the top of `default.scss`; each per-page partial also defines its own palette (e.g. cyberpunk_dreams on index). Keep text/background pairs at **WCAG AA contrast (≥4.5:1 for body text)**.
- Layout must **scale for both mobile and desktop**; keep styling consistent across pages.

### JavaScript

- **Client-side only.** Every script must run with no server and tolerate a `file://` origin.
- **Minimal dependencies.** AnimeJS is the *only* external library, loaded from a CDN via an `importmap` plus a small module shim that exposes it as `window.anime`. The deferred `*_animations.js` files are **classic scripts** that consume that global, with `animation_helpers.js` providing shared animation utilities. Before adding any npm dependency, **confirm with the user**; prefer generic JS / NodeJS with few transitive deps.
- **Shared deferred scripts loaded on every page:** `cookie_consent.js`, `navbar.js`, `back_to_top.js`, `service_worker_register.js` — and on animated pages, `animation_helpers.js` + the page's own `*_animations.js`, plus occasional helpers (e.g. `tech_takes_engagement.js` reading-time).
- **Known exceptions — do not "normalize" them:** `privacy.html` loads no AnimeJS/animation scripts at all; `404.html` omits `cookie_consent.js`/`service_worker_register.js`, and its relative paths are intentional (see repo map).
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
- **`feed.xml` is a hand-maintained Atom feed** for the Technical Stances page (`tech_takes.html`), linked from its `<head>` via `<link rel="alternate" type="application/atom+xml">`. When a take is added or edited: mirror its `datePublished`/`dateModified` into the matching feed `<entry>` (RFC3339 `T00:00:00Z`), reset the feed-level `<updated>` to the newest entry, and bump `CACHE_VERSION`. Entry `<id>` tag URIs are permanent — never change them, even if page anchors are renamed (update only the entry `<link href>`). The feed's own header comment restates this workflow.

### CORS & `file://`

- Watch for Cross-Origin restrictions when adding or organizing files. The runtime-injected manifest (above) is the canonical example of working around a `file://` CORS limit — follow that pattern rather than hardcoding restricted resources.

## Task checklists

The steps that get missed are the cross-file ones — walk the matching list end-to-end.

**When you change styles:**

1. Edit `default.scss` or the right partial — never `default.css` directly.
2. Recompile (command above) and commit the regenerated `default.css` together with the SCSS.
3. Re-check WCAG AA contrast for any color pair you touched.
4. Bump `CACHE_VERSION` in `service-worker.js` — sub-resources are served **cache-first**, so returning visitors keep stale CSS until the version changes.

**When you add or rename a page:**

1. Start from an existing page's `<head>` and header: JSON-LD block(s), deferred shared scripts, consistent nav markup.
2. Add the page to the header nav on **all** pages.
3. Create its SCSS partial, `@import` it from `default.scss`, and recompile.
4. Register it in `sitemap.xml`, `llms.txt`, and `service-worker.js` `PRECACHE_URLS`; bump `CACHE_VERSION`.

**When you add, rename, or remove a script or asset:**

1. Keep JS/CSS in separate files imported from `<head>` — no inline code.
2. Mirror the change in `service-worker.js` `PRECACHE_URLS` and bump `CACHE_VERSION`.

**Before you finish (any change):**

- JSON-LD blocks on touched pages are intact and still valid.
- Nothing you added breaks on `file://` (no hardcoded manifest link, no fetches the origin forbids).
- `sitemap.xml` / `llms.txt` still describe the site accurately if pages or content changed.
- If you touched a Technical Stances entry, `feed.xml` mirrors its dates and feed-level `<updated>`, and `CACHE_VERSION` is bumped.

## Hard rules (do not)

- **Do not hand-edit `default.css`.** Change the SCSS and recompile.
- **Do not hardcode `<link rel="manifest">`** in HTML — it is injected by `service_worker_register.js`.
- **Do not remove or break the JSON-LD structured-data blocks.**
- **Do not load Google Analytics (or other tracking) before cookie consent.**
- **Do not add external dependencies** (npm or CDN) without confirming with the user; keep dependencies minimal.
- **Do not assume a backend** — no server-side code, env-based secrets, or API routes will run.

## Where to find things

- Dated audits and strategy docs (accessibility, SEO, backlinks, content, feature recommendations, code review, roadmap) live in `assets/markdown/` as `*-YYYY-MM-DD.md`. Check the most recent before re-auditing.
- Note: every file in `assets/js/` is referenced by at least one page. If you add a script, load it from a page **and** register it in `service-worker.js` `PRECACHE_URLS`; if a script stops being referenced, delete it rather than leaving it precached. (The legacy `current_time.js` was removed on 2026-07-23 under exactly that rule.)
