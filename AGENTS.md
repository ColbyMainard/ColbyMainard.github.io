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
| `assets/images/` | `favicon.png`, `sharecard.png` (1200×630 social/OG card wired into every page's meta tags), photography (`photographyHobby/`), `miscellaneous/`, and GIMP `.xcf` design sources. The five `photographyHobby/` originals (3.5–5.0 MB each) and `miscellaneous/DEFCON33.jpeg` (2.1 MB) are **not** precached — see the asset checklist. |
| `assets/markdown/` | Progress and design notes. Dated strategy/audit reports are also written here as `<topic>-YYYY-MM-DD.md`, but they are disposable — the 2026-08-04 set was deleted on 2026-08-05 and the 2026-08-26 set on 2026-08-26, in both cases once acted on. As of 2026-08-26 the directory holds only `animations_report.md`. Check what is actually on disk; do not assume an audit exists, and do not assume one does not. |
| `assets/other/` | Misc supporting files (e.g. `pgp_email_key.asc`). |
| Root config | `manifest.json` (PWA), `service-worker.js` (offline precache), `robots.txt`, `sitemap.xml`, `llms.txt` (LLM crawler summary), `feed.xml` (hand-maintained Atom feed covering both the Technical Stances page and the Guides page), `press_mentions.csv`. |
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
- **Shared structure lives in mixins, not in the partials.** `default.scss` defines `sectionShell`, `headingRamp`, `bodyText`, `listText`, `blockQuote`, `proseLinks`, `dataTable`, and `animationGate`; every partial `@include`s them with its own palette. Put a structural change (border style, spacing, a newly animated element type) in the mixin — hand-copying it into six partials is what the mixins exist to prevent. Only page-specific rules (the hobbies iframe and photo gallery, the tech-takes glossary, per-cell link colors) belong at the call site.
- **Heading sizes come from the shared `$heading_size_1..4` ladder**, which uses `clamp()` so headings scale down on narrow viewports and under zoom (WCAG 1.4.10 Reflow) while keeping the previous desktop sizes as their maximum. Do not go back to fixed percentages.
- **Comment style is load-bearing:** silent `//` comments in the mixin block stay out of the compiled CSS; the `/* */` contrast notes inside the partials ship on purpose and should stay next to the rule they document.
- Layout must **scale for both mobile and desktop**; keep styling consistent across pages.

### JavaScript

- **Client-side only.** Every script must run with no server and tolerate a `file://` origin.
- **Minimal dependencies.** AnimeJS is the *only* external library, loaded from a CDN via an `importmap` plus a small module shim that exposes it as `window.anime`. The deferred `*_animations.js` files are **classic scripts** that consume that global, with `animation_helpers.js` providing shared animation utilities. Before adding any npm dependency, **confirm with the user**; prefer generic JS / NodeJS with few transitive deps.
- **Shared deferred scripts loaded on every page:** `path_helpers.js`, `cookie_consent.js`, `navbar.js`, `back_to_top.js`, `easter_egg.js`, `service_worker_register.js` — and on animated pages, `animation_helpers.js` + the page's own `*_animations.js`, plus page-specific helpers (`reading_engagement.js` reading-time and progress bar on `tech_takes.html` and `guides.html`; `photo_gallery.js` on `hobbies.html`).
- `path_helpers.js` is **load-order-critical**. It exposes `window.PathHelpers = { isNested, rootPrefix, toRoot }`, the single source of truth for how deep a page sits, and both `cookie_consent.js` (privacy-policy link) and `service_worker_register.js` (manifest + worker URLs) read it. Deferred classic scripts run in document order, so it **must appear above `cookie_consent.js` in the `<head>`**. Both consumers bail silently when the global is absent — no console error, no visual break — so an ordering mistake is invisible unless you check for it. `404.html` loads neither consumer and correctly omits it. Everything it returns is a relative path on purpose, because a leading-slash path resolves to the filesystem root on `file://`. It is loaded on all six non-404 pages, first in the deferred run and directly above `cookie_consent.js`; the comment above each tag says why the position matters. Keep it there when you reorder anything in a `<head>`.
- **Known exceptions — do not "normalize" them:** `privacy.html` loads no AnimeJS/animation scripts at all; `404.html` omits `cookie_consent.js`/`service_worker_register.js`, and its relative paths are intentional (see repo map). `easter_egg.js` is not subject to either exception; it loads on all seven pages, and its file header documents why it is safe on `privacy.html` and `404.html`.
- `cookie_consent.js` **gates Google Analytics** — GA does not load until the visitor grants consent. Do not load analytics before consent. The banner is a non-modal `role="dialog"` labelled by its own message, inserted **immediately after the skip link** so consent is the second tab stop rather than the last (WCAG 2.4.3); CSS pins it to the bottom of the viewport regardless of DOM order. Do not revert it to `appendChild`, and do not move focus into it on load.
- `photo_gallery.js` (hobbies only) makes the photograph list a manual one-at-a-time viewer, gated behind a `.js-gallery` class it adds — with scripting off, all photographs render stacked and the controls stay `hidden`, so there are no dead buttons. It **never auto-advances** (WCAG 2.2.2 Pause, Stop, Hide) and never moves focus on navigation; keep both properties if you touch it.
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
- **Colby is one entity across the whole site.** `index.html` declares the canonical `Person` at `"@id": "https://colbymainard.github.io/#person"`. Every node representing Colby on another page carries that same `@id` alongside its `@type` and `name`, so crawlers merge them instead of inventing a fresh anonymous person per page. Forty-six such nodes exist today: `guides.html` (23), `tech_takes.html` (18), and `hobbies.html` (5), as `author`, `publisher`, and `creator`. When you add a node for Colby, copy an adjacent one rather than writing a bare `Person`. Keep the `name` next to the `@id`: Google validates `author.name` per page, so a reference carrying only `@id` would fail on pages that do not define the node locally. **`tech_resources.html` is exempt** — its 107 `Person` nodes are book and course authors, genuinely different people, and must never get this `@id`.
- Keep `sitemap.xml`, `robots.txt`, and `llms.txt` accurate when pages or content change.
- **`feed.xml` is a hand-maintained Atom feed** covering **both** the Technical Stances page (`tech_takes.html`) and the Guides page (`guides.html`) — one entry per stance and one per guide. Both pages link it from their `<head>` via `<link rel="alternate" type="application/atom+xml">`, and `tech_takes.html` additionally carries a visible "Subscribe (Atom)" link in the body that `guides.html` does not. The two head links point at the same `feed.xml` but carry different `title` text, each naming what that page's reader is subscribing to; that is deliberate, not drift. No other page links the feed. When a take is added or edited: mirror its `datePublished`/`dateModified` into the matching feed `<entry>` (RFC3339 `T00:00:00Z`), reset the feed-level `<updated>` to the newest entry, and bump `CACHE_VERSION`. Guide entries follow the same rule but mirror from that guide's `TechArticle` JSON-LD rather than a `tech_takes.html` `Article` block. Entry `<id>` tag URIs are permanent — never change them, even if page anchors are renamed (update only the entry `<link href>`). The feed's own header comment restates this workflow.

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
3. **Exception for large media:** the `photographyHobby/` originals and `miscellaneous/DEFCON33.jpeg` are deliberately absent from `PRECACHE_URLS` — together they were ~22 MB pulled in the background on a visitor's first load of *any* page, including people who never open `hobbies.html`. The fetch handler still caches each one the first time it is actually requested, so offline support for an already-viewed page is unchanged. Keep new multi-megabyte assets out too, and shrink them before considering a precache entry. The `service-worker.js` comment where the entries used to be documents this.

**Before you finish (any change):**

- JSON-LD blocks on touched pages are intact and still valid.
- Nothing you added breaks on `file://` (no hardcoded manifest link, no fetches the origin forbids).
- `sitemap.xml` / `llms.txt` still describe the site accurately if pages or content changed. This includes the **`**Last updated**` line in `llms.txt`**, which is the one date touchpoint no other file points at: `feed.xml`'s header comment covers the feed entries and `CACHE_VERSION`, `sitemap.xml`'s header covers `<lastmod>`, and nothing reminds you about this one. Editing page content without moving it leaves an LLM crawler reading a date that is quietly wrong.
- If you touched a Technical Stances entry or a Guide, `feed.xml` mirrors its dates, the feed-level `<updated>` is reset to the newest entry, and `CACHE_VERSION` is bumped. For a Guide, also check the page-level `CollectionPage` `dateModified` if it was the most recent one.

## Hard rules (do not)

- **Do not hand-edit `default.css`.** Change the SCSS and recompile.
- **Do not hardcode `<link rel="manifest">`** in HTML — it is injected by `service_worker_register.js`.
- **Do not remove or break the JSON-LD structured-data blocks.**
- **Do not load Google Analytics (or other tracking) before cookie consent.**
- **Do not add external dependencies** (npm or CDN) without confirming with the user; keep dependencies minimal.
- **Do not assume a backend** — no server-side code, env-based secrets, or API routes will run.

## Known gaps

Confirmed defects as of **2026-08-26**. These are bugs, **not** conventions to preserve — do not "match the existing pattern" on any of them. The dated audit reports that first described them have since been deleted from `assets/markdown/` under the disposable-reports rule, so **this list is the record** — confirm each against the source files rather than looking for a report.

1. **~22 MB of unoptimized imagery.** The five `photographyHobby/` originals (3.5–5.0 MB each) and `miscellaneous/DEFCON33.jpeg` (2.1 MB) are camera originals served unmodified. `DEFCON33.jpeg` is the LCP element on `hobbies.html` **and** carries `loading="lazy"` (`hobbies.html:144`), which delays the paint it is measured on. This is the constraint that forced the precache exception below; shrinking them removes it rather than working around it.

### Closed on 2026-08-26

Kept short so a future audit does not re-report them as new. Each is now described as a convention in the section named.

- **`path_helpers.js` wired into every page.** It had been loaded nowhere, so the service worker never registered, the manifest link was never injected, and the consent banner shipped without its privacy-policy link, all silently. The tag now sits above `cookie_consent.js` on all six non-404 pages. See the JavaScript conventions.
- **`guides.html` now links the Atom feed** from its `<head>`, so all fourteen entries are discoverable from both pages the feed covers. See SEO & structured data.
- **Entity graph consolidated.** All author/publisher/creator nodes for Colby now carry the canonical `#person` `@id`. See SEO & structured data.

## Where to find things

- Dated audits and strategy docs (accessibility, SEO, backlinks, content, feature recommendations, code review, roadmap) are written to `assets/markdown/` as `*-YYYY-MM-DD.md`. Check for a recent one before re-auditing, but expect the directory to be mostly empty — as of 2026-08-26 it holds only `animations_report.md`. Reports are deleted once their recommendations have been applied, so the site itself, plus the Known gaps list above, is the long-term record of what was found and what was done.
- Note: every file in `assets/js/` should be referenced by at least one page. If you add a script, load it from a page **and** register it in `service-worker.js` `PRECACHE_URLS`; if a script stops being referenced, delete it rather than leaving it precached. (The legacy `current_time.js` was removed on 2026-07-23 under exactly that rule.) As of 2026-08-26 every one of the fifteen files is referenced by at least one page, so any unreferenced script you find is new and worth questioning.
