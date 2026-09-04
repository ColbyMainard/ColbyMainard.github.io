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
- Colby is one entity site-wide. `index.html` declares the canonical `Person` at `"@id": "https://colbymainard.github.io/#person"`, and every node representing him elsewhere repeats that `@id` next to its `@type` and `name` so crawlers merge them rather than inventing a person per page. Forty-six such nodes exist: `guides.html` (23), `tech_takes.html` (18), `hobbies.html` (5). Copy an adjacent node when adding one, and keep the `name` alongside the `@id`, because Google validates `author.name` per page. The 107 `Person` nodes in `tech_resources.html` are book and course authors and must never carry this `@id`.
- Abbreviations and acronyms are marked up with `<abbr title="...">` on first use in a section, spelling the term out in the `title`. Seventy-two such elements exist across six pages: `guides.html` (23), `tech_takes.html` (22), `privacy.html` (9), `index.html` (8), `tech_resources.html` (8), `hobbies.html` (2). One rule targets `abbr`: `abbr[title] { text-decoration: underline dotted; cursor: help; }` in `default.scss`, added on 2026-09-03 so the expansions have a visual affordance. It sets no color, because `text-decoration` draws in `currentColor` and therefore inherits each section's already-AA text tone. This replaced the previous "no CSS targets `abbr`" convention deliberately; do not revert it as drift. Note it is only half a fix: the `title` remains unreachable by keyboard (`abbr` is not focusable) and by touch, so spell a term out in prose where it genuinely matters. Follow the pattern when introducing a new acronym.
- One hand-maintained Atom feed (`feed.xml`) covers both the Technical Stances page (`tech_takes.html`) and the Guides page (`guides.html`); it carries one entry per stance and one per guide. Both pages link it from their head via `<link rel="alternate" type="application/atom+xml">`, and both now carry a visible "Subscribe (Atom)" link in the body intro as well (`p.feedSubscribe`, added to `guides.html` on 2026-09-03). The `.feedSubscribe` rule lives in `tech_takes.scss` and is deliberately left unscoped, because both intros sit on the same global `$noir_2` body background and the documented contrast ratios hold on each. The two head links share one `feed.xml` but carry different `title` text naming what that page's reader gets; that is deliberate. No other page links the feed.

### Sassy CSS

- `assets/css/default.scss` is the single compile entry point. It `@import`s the per-page partials (`index`, `hobbies`, `tech_takes`, `tech_resources`, `privacy_policy`, `guides`, `page_not_found`) and also holds the shared/global styles (header nav, body, footer, cookie banner, back-to-top button, code blocks).
- Compiling `default.scss` produces `assets/css/default.css`, the single stylesheet every page links. `default.css` is committed to the repo; only the `assets/css/*.css.map` glob is gitignored. Never hand-edit `default.css` — edit the SCSS, then recompile.
- Color palettes are defined as SCSS variables near the top of `default.scss` (noir / smart / emerald_efficiency). Keep text/background pairs at WCAG AA contrast.
- `default.scss` also holds the shared section mixins every partial calls with its own palette: `sectionShell`, `headingRamp`, `bodyText`, `unorderedListText`, `orderedListText`, `blockQuote`, `proseLinks`, `dataTable`, `sectionPermalink`, and `animationGate`. Not every partial calls every mixin; `sectionPermalink` is called by exactly two (`tech_takes.scss` and `guides.scss`), the two pages that load `section_permalinks.js`. Unordered and ordered list text are two separate mixins, not one `listText`; all seven partials include the unordered one and exactly one (`tech_takes.scss:154`, in the `#VibeCodingScourge` block) includes the ordered one. `animationGate` is included by six of the seven partials; `privacy_policy.scss` omits it because `privacy.html` deliberately loads no AnimeJS or animation scripts, and gating it would leave the page at `opacity: 0` with nothing to reveal it. Do not "fix" that omission. Structural changes (a border style, a newly animated element type) belong in the mixin, not copied into each partial; only genuinely page-specific rules stay at the call site.
- Heading sizes come from the shared `$heading_size_1..4` ladder, which uses `clamp()` so headings shrink on narrow viewports and under zoom (WCAG 1.4.10 Reflow) while keeping the old desktop sizes as their maximum. Do not reintroduce fixed percentage font sizes.
- Comments inside the mixin block are silent (`//`) so they stay out of the compiled CSS; the `/* */` contrast notes inside the partials are meant to ship. Keep each style of comment where it is.

### JavaScript

- All JavaScript should be capable of functioning in a client-side only environment.
- External libraries should be used sparingly to minimize overall load time. AnimeJS (<https://animejs.com/documentation/getting-started>) is the only external dependency; it is loaded per page from a CDN through an `importmap` plus a small module shim that exposes it as `window.anime`. The deferred `*_animations.js` scripts are classic scripts that consume that global, with shared utilities in `animation_helpers.js`.
- Each page loads a shared set of deferred scripts — `path_helpers.js`, `cookie_consent.js`, `navbar.js`, `back_to_top.js`, `easter_egg.js`, `service_worker_register.js` — and animated pages add `animation_helpers.js` plus their own `<page>_animations.js`, plus any page-specific helper (`reading_engagement.js` and `section_permalinks.js` on `tech_takes.html` and `guides.html`; `photo_gallery.js` on `hobbies.html`). `section_permalinks.js` must stay below `reading_engagement.js` in the `<head>`: both defer their work to `DOMContentLoaded` and handlers run in registration order, which is what keeps the "Copy link" button labels out of the per-section word counts. `easter_egg.js` is the one shared script with no exceptions: it loads on all seven pages, including `privacy.html` and `404.html`, and its file header explains why that is safe there. Two exceptions to preserve: `privacy.html` loads no AnimeJS/animation scripts, and `404.html` omits `cookie_consent.js` and `service_worker_register.js`, because GitHub Pages serves its content at arbitrary missing URLs where those scripts' relative-path logic breaks. `404.html` otherwise uses relative paths like every other page — a deliberate tradeoff that keeps it working from `file://` and at top-level missing URLs, accepting that it renders unstyled at nested missing URLs (e.g. `/dir/typo`).
- `path_helpers.js` is the one place that knows how deep the current page sits (`window.PathHelpers = { isNested, rootPrefix, toRoot }`). `cookie_consent.js` uses it for the banner's privacy-policy link; `service_worker_register.js` uses it for the `manifest.json` and `service-worker.js` URLs. It is a classic deferred script, so **it must be listed above `cookie_consent.js` in each `<head>`** — deferred classic scripts execute in document order, and that ordering is the entire contract. Both consumers bail silently when the global is missing, so a wrong order or a missing tag produces no console error and no visual break. `404.html` deliberately loads neither consumer and therefore does not load this file either. All six non-404 pages load it first in their deferred run, directly above `cookie_consent.js`, with a comment above each tag explaining why the position matters. Keep it there when reordering a `<head>`.
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
- Added or edited a Technical Stances entry → mirror its `datePublished`/`dateModified` into `feed.xml` (as RFC3339 `T00:00:00Z`), reset the feed-level `<updated>` to the newest entry, and bump `CACHE_VERSION`. Entry `<id>` tag URIs are permanent — never change them. The feed's own header comment documents this workflow. Two prose lists also name every stance and go stale silently: the Technical Stances line in `llms.txt` (newest first) and the Technical Stances list in `README.md` (page order). Update both.
- Added or edited a Guides entry → same workflow, but mirror from that guide's `TechArticle` JSON-LD (`datePublished`/`dateModified`, headline, description) rather than a `tech_takes.html` `Article` block, and update the `dateModified` on the page-level `CollectionPage` if it was the most recent guide.
- JSON-LD structured-data blocks intact on every touched page.

## Important Notes

- Be mindful of best practices regarding Cross-Origin Request Security policies when creating and organizing new files. The dynamically injected manifest (above) is an example of working around a `file://` CORS restriction.
- Deployment: `.github/workflows/static.yml` publishes the entire repository to GitHub Pages on every push to `master` (and on manual `workflow_dispatch`). All CSS and JavaScript must work under GitHub's static serving — there is no server-side processing.
- Non-obvious root-level files: `manifest.json` (PWA manifest), `service-worker.js` (offline cache), `robots.txt`, `sitemap.xml`, `llms.txt` (site summary for LLM crawlers), `feed.xml` (hand-maintained Atom feed covering both the Technical Stances page and the Guides page), and `press_mentions.csv` (log of external press mentions/quotes).
- The social share card is `assets/images/sharecard.png` (1200×630); it is referenced by the Open Graph / Twitter / LinkedIn `<meta>` image tags on every page. `assets/images/` also keeps GIMP `.xcf` design sources (`favicon.xcf`, `sharecard.xcf`) alongside the exported PNGs.
- Every file in `assets/js/` should be referenced by at least one page. Keep it that way: a script that no page loads should be deleted rather than left precached (the legacy `current_time.js` was removed on 2026-07-23 for exactly this reason). As of 2026-09-03 all sixteen files are referenced and all sixteen are listed in `PRECACHE_URLS`, so an unreferenced script is a new problem rather than a known one.

## Known gaps

Confirmed defects in the repo as of 2026-08-27. These are *not* conventions to preserve. The dated audit reports that originally described them have since been deleted from `assets/markdown/` per the disposable-reports rule, so this list is now the record — re-derive detail from the source files, not from a report.

- **~22 MB of unoptimized imagery.** The five `photographyHobby/` originals (3.5–5.0 MB each) plus `miscellaneous/DEFCON33.jpeg` (2.1 MB) are camera originals served unmodified. `DEFCON33.jpeg` is the LCP element on `hobbies.html` and carries `loading="lazy"`, which delays the paint it is measured on. This is what forced the precache exception documented above; shrinking them removes the constraint.

Settled on 2026-09-01, and previously listed here as a gap: **`sitemap.xml` omitting `privacy.html` is correct and deliberate. Do not add it.** That page carries `<meta name="robots" content="noindex, follow">` (`privacy.html:47`), and listing a `noindex` URL in a sitemap contradicts itself and produces a "Submitted URL marked 'noindex'" error in Search Console. `404.html` is left out for the same reason. The five `<loc>` entries (`/`, `tech_takes.html`, `tech_resources.html`, `guides.html`, `hobbies.html`) are every indexable page; the add-a-page checklist covers indexable pages, and a `noindex` page is listed in `llms.txt` instead.

Closed on 2026-08-27: `llms.txt` and `README.md` now list all eight Technical Stances. Both had been left at seven when "Vibe Coding is a Scourge to the Internet" was added, and `llms.txt` had its `**Last updated**` line moved to 2026-08-27 in that same commit, so the staleness was invisible from the date alone. When adding a stance, re-read the page's `Article` headlines and update the prose summaries in both files, not just the date.

Closed on 2026-08-26, listed so a future audit does not re-report them as new. Each is now a convention documented above: `path_helpers.js` is loaded on all six non-404 pages, `guides.html` links the Atom feed from its head, and all author/publisher/creator nodes for Colby carry the canonical `#person` `@id`.

## Other Information

- See @README.md for project overview
- See @AGENTS.md for general agent information
