# SEO Optimization Plan — colbymainard.github.io

## Context

The site already has a strong SEO foundation: every page carries a unique title/description/canonical/OG/LinkedIn block, JSON-LD schemas (Person, WebSite, ProfilePage, BreadcrumbList, six per-take Article schemas), a sitemap, a deliberately-curated robots.txt that blocks ~100 AI training bots while allowing live-search assistants, a manifest, and a service worker. So this isn't a "fix broken SEO" plan — it's an "extend a good baseline" plan.

The remaining gaps fall into three buckets:

1. **Technical hygiene** — 3.5–5 MB JPGs served unscaled to mobile (single biggest Core Web Vitals lever), unminified CSS, no CI for the SCSS build, missing Twitter Cards, no custom 404, several schema opportunities not taken (FAQPage, VideoObject, ImageGallery), no SRI on the AnimeJS CDN load, no RSS feed.
2. **Content depth** — `tech_takes.html` is 767 lines hosting 6 articles competing for one canonical URL; the Projects section in `index.html` is bullet lists with no case studies; Photography is 5 unannotated images; History is podcast links. Thin content limits what existing schemas can rank for.
3. **Linkbait** — the owner's voice is sharp on niche topics (KANs, quantum, anti-training-bot stance, sports CV, AML) but no piece is presented in a format optimized for sharing (interactive demo, sortable artifact, original dataset).

The intended outcome is to move from "this site is well-optimized given its content" to "this site has content worth optimizing." Preserve the anti-AI-training robots.txt stance throughout; minimize new dependencies; stay within GitHub Pages static-hosting constraints.

---

## Phase 1 — Technical hygiene

Done first because (a) image weight is the single biggest lever, (b) CI removes a deploy-time foot-gun before content scaling makes it worse, (c) most of these are short, mechanical, and cumulatively raise Lighthouse mobile from "fine" to "great."

### 1.1 Responsive image pipeline (HIGH impact, ~3h)

**Problem:** `assets/images/photographyHobby/*.jpg` are 3000×2000 at 3.5–5 MB each; `DEFCON33.jpeg` is 2.1 MB. Mobile users download full-res. LCP suffers.

**Files to touch:**
- `assets/html/hobbies.html` — Photography section img tags
- `index.html` — any raster images
- `service-worker.js` — precache list (drop full-res, cache 960w webp instead)

**Files to create:**
- `assets/images/photographyHobby/<name>-{480,960,1600}.{webp,avif}` for each of the 5 photos
- `assets/images/miscellaneous/DEFCON33-{480,960,1600}.{webp,avif}`

**Approach:** Generate offline with `sharp` CLI or `cwebp`/`avifenc`. Replace each `<img>` with `<picture><source type="image/avif" srcset="…480.avif 480w, …960.avif 960w, …1600.avif 1600w" sizes="(max-width: 768px) 100vw, 800px"><source type="image/webp" …><img src="fallback.jpg" loading="lazy" decoding="async" width="…" height="…" alt="…"></picture>`. Preserve existing `width`/`height`/`alt` (already correct).

**Verify:** Lighthouse mobile ≥90 on `hobbies.html`; LCP <2.5s on Slow 4G throttle; smallest webp ≤80 KB.

### 1.2 GitHub Actions for SCSS + minification (HIGH impact, ~2h)

**Problem:** `default.css` (2,445 lines) must be hand-compiled and committed; no minification step.

**Files to touch:** `.github/workflows/static.yml`

Insert before `upload-pages-artifact`:
- `actions/setup-node`
- `npm i -g sass html-minifier-terser terser`
- `sass --no-source-map --style=compressed assets/css/default.scss assets/css/default.css`
- `html-minifier-terser` over the 5 HTML files in place
- `terser` over `assets/js/*.js`

Optionally add `assets/css/default.css` to `.gitignore` after a one-time clean cutover (or keep the committed copy as a local-dev fallback).

**Verify:** push an SCSS-only change, confirm deployed CSS is minified single-line; site renders identically; `curl -I` shows reduced Content-Length.

### 1.3 Twitter Cards + missing meta (HIGH impact, ~30m)

**Files to touch:** all 5 HTML files (`index.html`, `assets/html/tech_takes.html`, `assets/html/tech_resources.html`, `assets/html/hobbies.html`, `assets/html/privacy.html`).

Add per page:
- `<meta name="twitter:card" content="summary_large_image">` (and `summary` for privacy)
- `twitter:title`, `twitter:description`, `twitter:image` (mirror og:* values)
- `<meta property="og:image:width" content="…">`, `og:image:height`, `og:image:type`
- Explicit `<meta name="robots" content="index, follow">` on the four indexable pages (privacy already correctly has `noindex, follow`)

**Verify:** Twitter Card validator, opengraph.xyz, Search Console URL Inspection.

### 1.4 Schema completion (MEDIUM impact, ~2h)

**Files to touch:**
- `index.html` — add `Organization` schema for RiskScout, `ItemList` wrapping the projects, `WebPage` with `speakable` property
- `assets/html/hobbies.html` — `VideoObject` for the embedded `youtube-nocookie.com/embed/RQWpF2Gb-gU`; `ImageGallery` + `ImageObject[]` for the 5 photographs (creator, contentUrl, license)
- `assets/html/tech_takes.html` — `FAQPage` for each "What are KANs?" / "What is quantum computing?" / "What are cryptocurrencies?" Q-style H3 block (these are already perfect FAQ candidates); extend each existing Article schema with `articleBody` excerpt, `wordCount`, `keywords`
- `assets/html/tech_resources.html` — wrap each table in `ItemList` of `Book` / `Course` / `HowTo` items

**Verify:** Schema.org validator + Google Rich Results Test on every page.

### 1.5 Critical CSS + AnimeJS SRI (MEDIUM impact, ~3h)

**Files to touch:** all four indexable HTML `<head>` blocks.

- Inline ~3-5 KB of above-the-fold CSS (header, nav, hero) in a `<style>` tag
- Convert `<link rel="stylesheet" href="default.css">` to non-blocking: `media="print" onload="this.media='all'"` with `<noscript>` fallback
- Pin the AnimeJS importmap to a hashable URL and add SRI: `<link rel="modulepreload" href="https://cdn.jsdelivr.net/npm/animejs@4.3.5/+esm" integrity="sha384-…" crossorigin="anonymous">`

**Verify:** Lighthouse "Eliminate render-blocking resources" passes; integrity check passes in DevTools Network tab.

### 1.6 Custom 404 + heading hierarchy + sitemap refresh (MEDIUM impact, ~2h)

**Files to create:** `404.html` at repo root (GitHub Pages serves automatically). Include nav + suggestion links to all four pages, `<meta name="robots" content="noindex, follow">`, JSON-LD `WebPage`.

**Files to touch:**
- `assets/html/tech_takes.html` (lines ~173–732) — audit so each of the 6 articles is a single `<h2>` with consistent `<h3>` subsections; demote stray `<h4>`s under proper `<h3>` parents
- `sitemap.xml` — add new URLs from Phase 2 as they ship

**Verify:** `curl https://colbymainard.github.io/missing-page` returns 404 + custom page; W3C HTML validator on hierarchy; resubmit sitemap to Search Console.

### 1.7 RSS/Atom feed (MEDIUM impact, ~1h)

**Files to create:** `feed.xml` at repo root — Atom format covering the 6 current tech_takes Articles. Manual XML is fine at this scale.

**Files to touch:** all HTML `<head>` blocks add `<link rel="alternate" type="application/atom+xml" title="Colby Mainard — Tech Takes" href="/feed.xml">`.

**Verify:** W3C feed validator; subscribe in Feedly.

### 1.8 Service worker auto-precache (LOW impact, ~1h)

CI step that emits `PRECACHE_URLS` from a glob and bumps `CACHE_VERSION` if the list changes. Optional — skip if 1.2 is already enough CI scope.

---

## Phase 2 — Content additions

Each new page must include: full meta block, canonical, OG/Twitter, breadcrumbs, page-specific schema, sitemap entry, feed entry where applicable.

### 2.1 Split `tech_takes.html` into per-article pages (HIGH impact, ~4h)

**Why:** 6 articles competing for one canonical URL — Google can't rank the page for six different queries equally.

**Files to create:**
- `assets/html/takes/kans.html`
- `assets/html/takes/cryptocurrency.html`
- `assets/html/takes/quantum-future.html`
- `assets/html/takes/agi-hype.html`
- `assets/html/takes/post-internet-privacy.html`
- `assets/html/takes/sports-product-placement.html`

**Files to touch:** `assets/html/tech_takes.html` becomes an index/`CollectionPage` with excerpts; `sitemap.xml` (add 6 URLs); `service-worker.js` precache; navbar links; `feed.xml`.

**Per-page schemas:** `Article` + `BreadcrumbList` + `FAQPage` (where Q-style H3s exist) + `WebPage` with `speakable`.

### 2.2 Project case-study pages (HIGH impact, ~6h)

**Why:** Projects in `index.html:1593-1635` are 2-3 bullets each. Recruiters can't validate claims; Google has nothing keyword-rich to rank.

**Files to create:**
- `assets/html/projects/covid-xray-classifier.html` (~1500-2000 words: dataset, Keras architecture as inline SVG, hyperopt search space, 94% accuracy with confusion matrix)
- `assets/html/projects/autodrive-hdlm-pipeline.html` (HD LiveMap → Unreal Engine pipeline, simulation methodology)
- `assets/html/projects/sudoku-steganography.html` (algorithm, why Sudoku grids work for hiding data)

**Files to touch:** `index.html` Projects section — replace bullets with linked cards; `sitemap.xml`; `feed.xml`.

**Schemas:** `TechArticle` + `SoftwareSourceCode` + `BreadcrumbList` + `ImageObject` for diagrams.

### 2.3 Photography "behind the shot" pages (MEDIUM impact, ~3h)

**Files to create:**
- `assets/html/photography/index.html` — gallery hub using the responsive variants from 1.1
- One short page per photo: `assets/html/photography/<slug>.html` (300-500 words: gear, settings, location/time, post-processing)

**Files to touch:** `assets/html/hobbies.html` Photography section — link out to gallery hub instead of inlining; `sitemap.xml`.

**Schemas:** `ImageGallery` on hub; `Photograph` + `ImageObject` (with `exifData`, `creator`, `contentUrl`, `license`) per post.

### 2.4 History essays (MEDIUM impact, ~4h)

**Why:** Hobbies History section is podcast links + a few bullets. The owner already references unusual-history themes (Luddites, Casket Girls, wheels-after-moon-landing) — these are essay seeds.

**Files to create:**
- `assets/html/history/luddites-and-modern-ai.html` (~1500 words; comparison essay relevant to AI audience)
- `assets/html/history/<second-essay>.html` (Casket Girls historiography or anachronism timeline)

**Schemas:** `Article` + `BreadcrumbList`.

### 2.5 `now.html` page (LOW impact but high freshness signal, ~1h)

**Files to create:** `now.html` at root — "what I'm working on / reading / learning this month." Update monthly.

**Files to touch:** footer link on every page.

**Schemas:** `WebPage` with explicit `dateModified`.

### 2.6 `llms.txt` expansion (LOW impact, ~30m)

**Files to touch:** `llms.txt` — add new pages from 2.1–2.5 with one-line descriptions for live-search bots.

---

## Phase 3 — Linkbait pieces

Cadence: 1/month. Each is a specific concept, not "write more." All interactive widgets are vanilla JS + SVG to honor the project's "minimal dependencies" rule (AnimeJS already present is fine for transitions; no D3/p5/three.js).

1. **"I Built the Avalanche Effect: Watch SHA-256 Break When You Touch One Bit"** (~2,000w) — interactive widget where users type and see the hash flip; live histogram of bit changes. Embedded in `takes/cryptocurrency.html`. Audience: Hacker News, /r/crypto.

2. **"KANs vs MLPs in 60 Lines of Code: Side-by-Side Activation Visualizer"** (~2,500w) — interactive SVG where you drag B-spline knots and watch the function change vs a fixed MLP plot. Embedded in `takes/kans.html`. Audience: ML Twitter, /r/MachineLearning.

3. **"The Quantum Computer in Your Browser: Bloch Sphere with Real Hadamard/CNOT Gates"** (~2,000w) — pure SVG/JS Bloch sphere; click gates to apply; show probability amplitudes. Embedded in `takes/quantum-future.html`.

4. **"What 100 Anti-Training Bot User-Agents Tells You About the Web in 2026"** (~1,800w) — turn the curated `robots.txt` into a story: name every bot, who runs it, when it appeared, what it scrapes. Sortable HTML table at `assets/html/posts/anti-training-bot-census.html`. Hacker News bait.

5. **"The Computer Vision Stack Behind NFL Down-and-Distance Graphics"** (~2,500w) — combine prior MVP Sports experience with the existing "Product Placement in Sports Marketing" angle. Audience: sports analytics + CV practitioners.

6. **"AML Pipelines Are Just CV Pipelines With Worse Pixels: Lessons From Both"** (~1,800w) — cross-domain post drawing on RiskScout (AML) + prior CV work. Paired diagrams. Audience: FinTech engineering blogs.

7. **"The Suitcases-After-Moon-Landing Index: What Else Did We Get Wrong?"** (~1,500w) — curated anachronism list with sources + sortable timeline. Audience: r/todayilearned, history Twitter.

8. **"Steganography in Sudoku Grids: A 2019 Project, Replicated in 2026"** (~2,000w) — case study with runnable code + JS demo that hides a string in a Sudoku grid in-browser. Lifts the project bullet into a full piece.

9. **"Why I Block Applebot But Allow Claude-User: A Field Guide to AI Bot Etiquette"** (~1,500w) — original analysis of the training-vs-search-bot distinction the site already enforces. Audience: site-operator community, indie-web.

10. **"Six Months With KANs in Production"** *(hold for Q4 2026)* — write only after lived experience; converting the theoretical KAN take into "I shipped this" gives unique data hard to replicate.

---

## Critical files

- `index.html` — meta block, Projects section (~1593-1635), schema additions
- `assets/html/tech_takes.html` — split into 6 pages, become CollectionPage; heading hierarchy fix
- `assets/html/hobbies.html` — Photography section restructure, VideoObject schema
- `assets/html/tech_resources.html` — ItemList schemas
- `assets/html/privacy.html` — Twitter Cards
- `sitemap.xml` — add new URLs each phase
- `robots.txt` — preserve as-is; do NOT loosen anti-training stance
- `manifest.json` — already complete; consider adding multi-size icons later
- `service-worker.js` — precache list maintenance
- `.github/workflows/static.yml` — add SCSS compile + minify steps
- `feed.xml` (new) — Atom feed at root
- `404.html` (new) — custom 404 at root
- `now.html` (new) — freshness page at root
- `llms.txt` — extend with new pages

## Verification

**Phase 1:** Lighthouse mobile/desktop ≥90 on every page; PageSpeed Insights LCP <2.5s on Slow 4G; Schema.org validator + Google Rich Results Test pass on every page; Twitter Card validator + LinkedIn Post Inspector pass; `curl /missing` returns custom 404; W3C HTML validator clean; W3C feed validator clean; Search Console "Indexed pages" rising over 2-4 weeks post-deploy.

**Phase 2:** Each new page passes the same Phase 1 checks before merge; Search Console URL Inspection shows "Indexable"; sitemap re-fetched in Search Console; orphan-page audit (`wget --spider --recursive https://colbymainard.github.io/`) shows zero unlinked pages.

**Phase 3:** Track per article via Search Console (impressions/clicks), GA4 referrers, manual share-tracking on HN/Reddit/Twitter. Linkbait success is external — measure inbound links via Search Console "Links" report and `ahrefs`/`linkresearchtools` free tiers.

## Effort summary

| Phase | Items | Total effort | Cadence |
|---|---|---|---|
| 1 | 8 items | ~15h | One weekend |
| 2 | 6 items | ~18h | 2-3 weekends |
| 3 | 10 pieces | ongoing | 1/month |
