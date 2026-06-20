# Project: Colby Mainard's Personal Website

## Description of the project

This site is designed as a semi-professional landing page to perform a variety of tasks. It is anticipated that the following groups would be the primary audience:

- Potential future coworkers/colleagues.
- Potential future employers.
- Fellow technology enthusiasts.

With this understanding, it is likely that future colleagues and employers would care mostly about things like competencies, skills, and held beliefs. Fellow technology enthusiasts would likely care about things like hobbies and technical resources.

## Code Style

### HTML

- When possible, JavaScript and CSS/SCSS implementations should be contained in separate files that can be imported in the head section.
- Each document should contain a header allowing to navigate to both other sections and other pages on this site. The responsive nav toggle is driven by `navbar.js`, and the header markup is kept consistent across pages.
- Pages embed `schema.org` structured data as one or more `<script type="application/ld+json">` blocks in the head for SEO; preserve these when editing page content.

### Sassy CSS

- `assets/css/default.scss` is the single compile entry point. It `@import`s the per-page partials (`index`, `hobbies`, `tech_takes`, `tech_resources`, `privacy_policy`, `guides`) and also holds the shared/global styles (header nav, body, footer, cookie banner, back-to-top button, code blocks, clipboard button).
- Compiling `default.scss` produces `assets/css/default.css`, the single stylesheet every page links. `default.css` is committed to the repo; only the `assets/css/*.css.map` glob is gitignored.
- Color palettes are defined as SCSS variables near the top of `default.scss` (noir / smart / emerald_efficiency).

### JavaScript

- All JavaScript should be capable of functioning in a client-side only environment.
- External libraries should be used sparingly to minimize overall load time. AnimeJS (<https://animejs.com/documentation/getting-started>) is the only external dependency; it is loaded per page from a CDN through an `importmap` plus a small module shim that exposes it as `window.anime`. The deferred `*_animations.js` scripts are classic scripts that consume that global.
- Each page loads a shared set of deferred scripts — `cookie_consent.js`, `navbar.js`, `back_to_top.js`, `clipboard.js`, `service_worker_register.js` — plus its own `<page>_animations.js` (and occasionally page-specific helpers such as `tech_takes_engagement.js` or `current_time.js`).
- `cookie_consent.js` gates Google Analytics: GA does not load until the visitor grants consent.
- `service_worker_register.js` registers `service-worker.js` (offline precache / PWA install) and injects the `manifest.json` link tag dynamically — only when the page is served over http(s), because browsers block manifest fetches from `file://` origins via CORS. Do not hardcode a `<link rel="manifest">` in the HTML.

## Commands

- `sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css`: Compile the SCSS to the production `default.css`. Drop `--sourcemap=none` for local dev if you want source maps; the `assets/css/*.css.map` glob is gitignored so dev maps won't be committed. The SCSS is the source of truth — edit it, then commit the regenerated `default.css`.

## Important Notes

- Changes to the compiled CSS (`default.css`) should be made in the corresponding SCSS and then compiled — never hand-edit `default.css`. NOTE: this sass command targets Ubuntu environments. Should it fail, you may be in a Windows/non-Debian environment; attempt a retry before reporting failure.
- Be mindful of best practices regarding Cross-Origin Request Security policies when creating and organizing new files. The dynamically injected manifest (above) is an example of working around a `file://` CORS restriction.
- Deployment: `.github/workflows/static.yml` publishes the entire repository to GitHub Pages on every push to `master` (and on manual `workflow_dispatch`). All CSS and JavaScript must work under GitHub's static serving — there is no server-side processing.
- Non-obvious root-level files: `manifest.json` (PWA manifest), `service-worker.js` (offline cache), `robots.txt`, `sitemap.xml`, `llms.txt` (site summary for LLM crawlers), and `press_mentions.csv` (log of external press mentions/quotes).

## Other Information

- See @README.md for project overview
- See @AGENTS.md for general agent information
