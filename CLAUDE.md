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
- One hand-maintained Atom feed (`feed.xml`) covers both the Technical Stances page (`tech_takes.html`) and the Guides page (`guides.html`); it carries one entry per stance and one per guide. Each page should link it from its head via `<link rel="alternate" type="application/atom+xml">`, and `tech_takes.html` additionally carries a visible "Subscribe (Atom)" link in the body. No other page links the feed. **Known gap:** `guides.html` currently has no head link, so the seven guide entries in the feed are undiscoverable from the page they describe — see Known gaps below.

### Sassy CSS

- `assets/css/default.scss` is the single compile entry point. It `@import`s the per-page partials (`index`, `hobbies`, `tech_takes`, `tech_resources`, `privacy_policy`, `guides`, `page_not_found`) and also holds the shared/global styles (header nav, body, footer, cookie banner, back-to-top button, code blocks).
- Compiling `default.scss` produces `assets/css/default.css`, the single stylesheet every page links. `default.css` is committed to the repo; only the `assets/css/*.css.map` glob is gitignored. Never hand-edit `default.css` — edit the SCSS, then recompile.
- Color palettes are defined as SCSS variables near the top of `default.scss` (noir / smart / emerald_efficiency). Keep text/background pairs at WCAG AA contrast.
- `default.scss` also holds the shared section mixins every partial calls with its own palette: `sectionShell`, `headingRamp`, `bodyText`, `listText`, `blockQuote`, `proseLinks`, `dataTable`, and `animationGate`. Structural changes (a border style, a newly animated element type) belong in the mixin, not copied into each partial; only genuinely page-specific rules stay at the call site.
- Heading sizes come from the shared `$heading_size_1..4` ladder, which uses `clamp()` so headings shrink on narrow viewports and under zoom (WCAG 1.4.10 Reflow) while keeping the old desktop sizes as their maximum. Do not reintroduce fixed percentage font sizes.
- Comments inside the mixin block are silent (`//`) so they stay out of the compiled CSS; the `/* */` contrast notes inside the partials are meant to ship. Keep each style of comment where it is.

### JavaScript

- All JavaScript should be capable of functioning in a client-side only environment.
- External libraries should be used sparingly to minimize overall load time. AnimeJS (<https://animejs.com/documentation/getting-started>) is the only external dependency; it is loaded per page from a CDN through an `importmap` plus a small module shim that exposes it as `window.anime`. The deferred `*_animations.js` scripts are classic scripts that consume that global, with shared utilities in `animation_helpers.js`.
- Each page loads a shared set of deferred scripts — `path_helpers.js`, `cookie_consent.js`, `navbar.js`, `back_to_top.js`, `easter_egg.js`, `service_worker_register.js` — and animated pages add `animation_helpers.js` plus their own `<page>_animations.js`, plus any page-specific helper (`reading_engagement.js` on `tech_takes.html` and `guides.html`; `photo_gallery.js` on `hobbies.html`). `easter_egg.js` is the one shared script with no exceptions: it loads on all seven pages, including `privacy.html` and `404.html`, and its file header explains why that is safe there. Two exceptions to preserve: `privacy.html` loads no AnimeJS/animation scripts, and `404.html` omits `cookie_consent.js` and `service_worker_register.js`, because GitHub Pages serves its content at arbitrary missing URLs where those scripts' relative-path logic breaks. `404.html` otherwise uses relative paths like every other page — a deliberate tradeoff that keeps it working from `file://` and at top-level missing URLs, accepting that it renders unstyled at nested missing URLs (e.g. `/dir/typo`).
- `path_helpers.js` is the one place that knows how deep the current page sits (`window.PathHelpers = { isNested, rootPrefix, toRoot }`). `cookie_consent.js` uses it for the banner's privacy-policy link; `service_worker_register.js` uses it for the `manifest.json` and `service-worker.js` URLs. It is a classic deferred script, so **it must be listed above `cookie_consent.js` in each `<head>`** — deferred classic scripts execute in document order, and that ordering is the entire contract. Both consumers bail silently when the global is missing, so a wrong order or a missing tag produces no console error and no visual break. `404.html` deliberately loads neither consumer and therefore does not load this file either. **Known gap:** no page currently loads it — see Known gaps below.
- `cookie_consent.js` gates Google Analytics: GA does not load until the visitor grants consent. The banner is built as a non-modal `role="dialog"` labelled by its own message and is inserted right after the skip link, so the consent choice is the second tab stop instead of the last (WCAG 2.4.3). It is positioned at the bottom of the viewport by CSS, so that DOM placement does not affect where it draws. Do not change it back to `document.body.appendChild`, and do not move focus into it on load.
- `photo_gallery.js` turns the stacked photograph list on `hobbies.html` into a manual one-at-a-time viewer. It is progressive enhancement gated behind a `.js-gallery` class the script adds, so with scripting off all photographs render stacked and the controls stay hidden. It never auto-advances (WCAG 2.2.2) and never moves focus on navigation.
- `service_worker_register.js` registers `service-worker.js` (offline precache / PWA install) and injects the `manifest.json` link tag dynamically — only when the page is served over http(s), because browsers block manifest fetches from `file://` origins via CORS. Do not hardcode a `<link rel="manifest">` in the HTML.

## Commands

- `sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css`: Compile the SCSS to the production `default.css`. Drop `--sourcemap=none` for local dev if you want source maps; the `assets/css/*.css.map` glob is gitignored so dev maps won't be committed. The SCSS is the source of truth — edit it, then commit the regenerated `default.css`. NOTE: this sass command targets Ubuntu environments. Should it fail, you may be in a Windows/non-Debian environment; attempt a retry before reporting failure.

## Definition of done

Before finishing any change, verify each point that applies:

- Edited SCSS → `default.css` recompiled and committed together with the SCSS.
- Added, renamed, or removed a page or asset → `service-worker.js` `PRECACHE_URLS` updated and `CACHE_VERSION` bumped (assets are served cache-first; without a bump, returning visitors keep stale files). Large media is the exception: the multi-megabyte photographs in `assets/images/photographyHobby/` and `assets/images/miscellaneous/DEFCON33.jpeg` are deliberately left out of `PRECACHE_URLS` so a first visit to any page does not pull roughly 22 MB in the background. The fetch handler still caches them on first real request. Do not re-add them without shrinking them first.
- Changed pages or content → `sitemap.xml` and `llms.txt` still accurate.
- Added or edited a Technical Stances entry → mirror its `datePublished`/`dateModified` into `feed.xml` (as RFC3339 `T00:00:00Z`), reset the feed-level `<updated>` to the newest entry, and bump `CACHE_VERSION`. Entry `<id>` tag URIs are permanent — never change them. The feed's own header comment documents this workflow.
- Added or edited a Guides entry → same workflow, but mirror from that guide's `TechArticle` JSON-LD (`datePublished`/`dateModified`, headline, description) rather than a `tech_takes.html` `Article` block, and update the `dateModified` on the page-level `CollectionPage` if it was the most recent guide.
- JSON-LD structured-data blocks intact on every touched page.

## Important Notes

- Be mindful of best practices regarding Cross-Origin Request Security policies when creating and organizing new files. The dynamically injected manifest (above) is an example of working around a `file://` CORS restriction.
- Deployment: `.github/workflows/static.yml` publishes the entire repository to GitHub Pages on every push to `master` (and on manual `workflow_dispatch`). All CSS and JavaScript must work under GitHub's static serving — there is no server-side processing.
- Non-obvious root-level files: `manifest.json` (PWA manifest), `service-worker.js` (offline cache), `robots.txt`, `sitemap.xml`, `llms.txt` (site summary for LLM crawlers), `feed.xml` (hand-maintained Atom feed covering both the Technical Stances page and the Guides page), and `press_mentions.csv` (log of external press mentions/quotes).
- The social share card is `assets/images/sharecard.png` (1200×630); it is referenced by the Open Graph / Twitter / LinkedIn `<meta>` image tags on every page. `assets/images/` also keeps GIMP `.xcf` design sources (`favicon.xcf`, `sharecard.xcf`) alongside the exported PNGs.
- Every file in `assets/js/` should be referenced by at least one page. Keep it that way: a script that no page loads should be deleted rather than left precached (the legacy `current_time.js` was removed on 2026-07-23 for exactly this reason). The one current violation is `path_helpers.js`, which is precached and depended on but loaded nowhere — that is a bug to fix, not a script to delete. See Known gaps.

## Known gaps

Confirmed defects in the repo as of 2026-08-26. These are *not* conventions to preserve. The dated audit reports that originally described them have since been deleted from `assets/markdown/` per the disposable-reports rule, so this list is now the record — re-derive detail from the source files, not from a report.

- **`path_helpers.js` is loaded by no page.** `grep -rn 'path_helpers' --include=*.html .` returns nothing. `service_worker_register.js` returns early without the global, so the service worker is never registered and `<link rel="manifest">` is never injected — the site has no offline support and is not installable, despite `service-worker.js` and `manifest.json` both being correct. `cookie_consent.js` falls back to a banner with no privacy-policy link. Both failures are silent. Fix: add the tag above `cookie_consent.js` on all six non-404 pages (`./assets/js/path_helpers.js` at root, `../js/path_helpers.js` under `assets/html/`), then verify by observation over `http://localhost` rather than by inspection.
- **`guides.html` has no Atom `<link rel="alternate">`** in its head, though `feed.xml` carries seven guide entries.
- **A stale `.takesIndex` comment survives the feature's removal.** The dated-index component is gone from the markup, `tech_takes.scss`, and `default.css`, and its animation step and `animationGate` include are gone from `tech_takes_animations.js` and the SCSS. What remains is the doc comment above `animateIntro` at `tech_takes_animations.js:37-50`, which still explains that the function is written locally "because the `.takesIndex` `<nav>` carries its own animation gate (see the comment at `tech_takes.scss:145`)" — a gate and a comment that no longer exist. Rewrite or delete that comment; if the local `animateIntro` no longer earns its place over `AnimationHelpers.animateIntro`, collapse it too.
- **`.relatedStances` is a reserved name, not dead code.** It survives in the word-count exclusion at `reading_engagement.js:36`, anticipating a per-take related-links component that has not been built. The SCSS comment that explained the name went out with the `.takesIndex` block, so this list is now the only place it is documented. Keep the name if you build it; the reading-time calculation already excludes it.
- **~22 MB of unoptimized imagery.** The five `photographyHobby/` originals (3.5–5.0 MB each) plus `miscellaneous/DEFCON33.jpeg` (2.1 MB) are camera originals served unmodified. `DEFCON33.jpeg` is the LCP element on `hobbies.html` and carries `loading="lazy"`, which delays the paint it is measured on. This is what forced the precache exception documented above; shrinking them removes the constraint.
- **Entity graph is not consolidated.** `index.html` declares a canonical `Person` with `"@id": "https://colbymainard.github.io/#person"`, but no subpage references it — `grep -rn '#person' --include=*.html assets/html/` returns nothing. Instead, roughly forty-four author/publisher nodes across `guides.html`, `tech_takes.html`, and `hobbies.html` re-declare Colby as a fresh anonymous `Person`. Replace each with `{"@id": "https://colbymainard.github.io/#person"}`. The many `Person` nodes in `tech_resources.html` are different people (book and course authors) and must be left alone.

## Other Information

- See @README.md for project overview
- See @AGENTS.md for general agent information
