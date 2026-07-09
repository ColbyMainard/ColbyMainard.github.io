# Project: Colby Mainard's Personal Website

## Description of the project

This site is Colby Mainard's semi-professional landing page — a static, client-side-only site deployed on GitHub Pages. The primary audiences, and what to emphasize for each when writing or editing content:

- Potential future coworkers/colleagues and employers — competencies, skills, and held beliefs.
- Fellow technology enthusiasts — hobbies and technical resources.

Keep content credible, professional, and plain-spoken. Every page must work with no server and from both `file://` and `https://` origins.

## Code Style

### HTML

- When possible, JavaScript and CSS/SCSS implementations should be contained in separate files that can be imported in the head section.
- Each document should contain a header allowing to navigate to both other sections and other pages on this site. The responsive nav toggle is driven by `navbar.js`, and the header markup is kept consistent across pages.
- Pages embed `schema.org` structured data as one or more `<script type="application/ld+json">` blocks in the head for SEO; preserve these when editing page content.

### Sassy CSS

- `assets/css/default.scss` is the single compile entry point. It `@import`s the per-page partials (`index`, `hobbies`, `tech_takes`, `tech_resources`, `privacy_policy`, `guides`, `page_not_found`) and also holds the shared/global styles (header nav, body, footer, cookie banner, back-to-top button, code blocks, clipboard button).
- Compiling `default.scss` produces `assets/css/default.css`, the single stylesheet every page links. `default.css` is committed to the repo; only the `assets/css/*.css.map` glob is gitignored. Never hand-edit `default.css` — edit the SCSS, then recompile.
- Color palettes are defined as SCSS variables near the top of `default.scss` (noir / smart / emerald_efficiency). Keep text/background pairs at WCAG AA contrast.

### JavaScript

- All JavaScript should be capable of functioning in a client-side only environment.
- External libraries should be used sparingly to minimize overall load time. AnimeJS (<https://animejs.com/documentation/getting-started>) is the only external dependency; it is loaded per page from a CDN through an `importmap` plus a small module shim that exposes it as `window.anime`. The deferred `*_animations.js` scripts are classic scripts that consume that global, with shared utilities in `animation_helpers.js`.
- Each page loads a shared set of deferred scripts — `cookie_consent.js`, `navbar.js`, `back_to_top.js`, `clipboard.js`, `service_worker_register.js` — and animated pages add `animation_helpers.js` plus their own `<page>_animations.js` (and occasionally page-specific helpers such as `tech_takes_engagement.js`). Two exceptions to preserve: `privacy.html` loads no AnimeJS/animation scripts, and `404.html` omits `cookie_consent.js` and `service_worker_register.js`, because GitHub Pages serves its content at arbitrary missing URLs where those scripts' relative-path logic breaks. `404.html` otherwise uses relative paths like every other page — a deliberate tradeoff that keeps it working from `file://` and at top-level missing URLs, accepting that it renders unstyled at nested missing URLs (e.g. `/dir/typo`).
- `cookie_consent.js` gates Google Analytics: GA does not load until the visitor grants consent.
- `service_worker_register.js` registers `service-worker.js` (offline precache / PWA install) and injects the `manifest.json` link tag dynamically — only when the page is served over http(s), because browsers block manifest fetches from `file://` origins via CORS. Do not hardcode a `<link rel="manifest">` in the HTML.

## Commands

- `sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css`: Compile the SCSS to the production `default.css`. Drop `--sourcemap=none` for local dev if you want source maps; the `assets/css/*.css.map` glob is gitignored so dev maps won't be committed. The SCSS is the source of truth — edit it, then commit the regenerated `default.css`. NOTE: this sass command targets Ubuntu environments. Should it fail, you may be in a Windows/non-Debian environment; attempt a retry before reporting failure.

## Definition of done

Before finishing any change, verify each point that applies:

- Edited SCSS → `default.css` recompiled and committed together with the SCSS.
- Added, renamed, or removed a page or asset → `service-worker.js` `PRECACHE_URLS` updated and `CACHE_VERSION` bumped (assets are served cache-first; without a bump, returning visitors keep stale files).
- Changed pages or content → `sitemap.xml` and `llms.txt` still accurate.
- JSON-LD structured-data blocks intact on every touched page.

## Important Notes

- Be mindful of best practices regarding Cross-Origin Request Security policies when creating and organizing new files. The dynamically injected manifest (above) is an example of working around a `file://` CORS restriction.
- Deployment: `.github/workflows/static.yml` publishes the entire repository to GitHub Pages on every push to `master` (and on manual `workflow_dispatch`). All CSS and JavaScript must work under GitHub's static serving — there is no server-side processing.
- Non-obvious root-level files: `manifest.json` (PWA manifest), `service-worker.js` (offline cache), `robots.txt`, `sitemap.xml`, `llms.txt` (site summary for LLM crawlers), and `press_mentions.csv` (log of external press mentions/quotes).
- `assets/js/current_time.js` is legacy: precached by the service worker but referenced by no page. Verify before relying on it.

## Other Information

- See @README.md for project overview
- See @AGENTS.md for general agent information
