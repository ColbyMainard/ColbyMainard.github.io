# Feature Recommendations

Last Updated: 2026-07-23

## Executive summary

This site already ships most of the platform features a static personal site needs: an offline service worker and PWA manifest, a hand-maintained Atom feed, consent-gated analytics, a responsive nav, a back-to-top button, per-section reading times, and a reading progress bar. The gaps left are about **what a reader does after they finish something**. Every content page is a single long scroll that dead-ends at the footer, with no path from one take to a related take, no way to find a topic by name, and nothing on the landing page telling a first-time visitor that anything has changed recently.

The three highest-leverage additions are a related-content component at the end of each technical stance, a short "recently updated" block on the home page, and a client-side search index. The first of those is partly designed already: `tech_takes_engagement.js` excludes a `.relatedStances` selector from its word count, but no such element exists anywhere in the HTML or SCSS, which means the component was planned and never built.

## Existing-feature inventory

Read: all seven HTML pages, every file in `assets/js/`, `service-worker.js`, `manifest.json`, `sitemap.xml`, `robots.txt`, `llms.txt`, `feed.xml`, `press_mentions.csv`.

**`assets/markdown/` held no prior dated reports at the start of this run** (only `animations_report.md`), so there was no earlier audit to check against for duplicate recommendations.

Already built, and therefore ruled out:

- **Offline cache and PWA install** — `service-worker.js` (v43) precaches 34 URLs; `service_worker_register.js` injects the manifest link only over http(s).
- **Atom syndication** — `feed.xml`, hand-maintained, with six entries. Linked from `tech_takes.html` via `<link rel="alternate">` in the head *and* a visible "Subscribe (Atom)" link in the body at line 213. Discoverability is handled on the page that has the feed.
- **Consent-gated analytics** — `cookie_consent.js` plus a full preference panel (accept / reject / reset) on `privacy.html` with a `role="status"` live region.
- **Responsive navigation** — `navbar.js` drives a hamburger toggle with `aria-expanded` and `aria-controls`; every page carries both a primary nav and a per-page section nav.
- **Back-to-top button** — `back_to_top.js`, reduced-motion aware, reuses AnimeJS when present.
- **Reading time per section** — `tech_takes_engagement.js` renders "X min read" into every `[data-reading-time]` span on `tech_takes.html`.
- **Reading progress bar** — same script, `role="progressbar"` with live `aria-valuenow`.
- **Scroll-triggered animations** — `animation_helpers.js` plus six per-page `*_animations.js` files, all gated on `prefers-reduced-motion`.
- **Custom 404 with full onward navigation** — `404.html` lists every page with a one-line description.
- **Citation guidance on guides** — all seven guides on `guides.html` carry a "Cite this guide:" line with a canonical anchor URL. `llms.txt` also carries a Citation policy section for crawlers.
- **Dated freshness stamps** — every technical stance, every guide, `tech_resources.html`, and `privacy.html` carry a "Last Updated:" line.
- **Press mention log** — `press_mentions.csv` tracks eight external quotes, but it is a repo file only and is not surfaced anywhere on the site.
- **Social card metadata** — Open Graph / Twitter / LinkedIn tags on all seven pages. Head metadata belongs to **search-engine-optimization**; noted here only so it is not mistaken for a gap.

## Recommendation table

| # | Feature | Where it applies | Who it serves and why | Impact | Effort |
| - | ------- | ---------------- | --------------------- | ------ | ------ |
| 1 | Related-content component ("Read next") | `tech_takes.html`, `guides.html` | Enthusiasts, who currently hit a dead end at the bottom of every section | H | M |
| 2 | "Recently updated" block on the landing page | `index.html` intro section | All audiences, who cannot currently tell the site is actively maintained | H | M |
| 3 | Client-side search | Site-wide, via a new `search.html` | Employers and enthusiasts looking for one specific thing | H | H |
| 4 | Extend `<abbr>` coverage beyond the home page | `guides.html`, `tech_resources.html`, `tech_takes.html` | Newcomers, who hit undefined acronyms in the beginner-facing pages | M | L |
| 5 | Citation block per technical stance | `tech_takes.html` | Anyone quoting a take, and the author's own press-mention tracking | M | L |
| 6 | Per-section copy-link affordance | `tech_takes.html`, `guides.html` | Readers sharing one specific section rather than a whole page | M | M |
| 7 | Gallery treatment for the photography section | `hobbies.html` photography section | Visitors browsing the most visual part of the site | M | M |
| 8 | Easter eggs | Site-wide, one shared script | Technology enthusiasts who explore rather than skim | L | M |

## Recommendation details

**1. Related-content component ("Read next")** — `tech_takes.html` and `guides.html`. Add a short `<nav class="relatedStances" aria-label="Related reading">` block at the end of each `<section>`, listing two or three hand-picked links to other takes, guides, or resource sections. The class name is already reserved: `tech_takes_engagement.js` line 30 strips `.relatedStances` from its word count before computing reading time, so the reading-time estimates will stay correct the moment this ships. Several natural pairings already exist as one-way links, for example the Quantum Computing hobby section already points at the Future of Quantum take, but no take points back. Depends on nothing else in this report. Cost: markup plus one SCSS block, no new script, no new dependency; ongoing upkeep is one link list to revisit whenever a new take is added, which is what pushes this to Effort M.

**2. "Recently updated" block on the landing page** — `index.html`, immediately below the `introSectionDiv` paragraphs. A short list of the three or four most recently updated sections across the site, each with its date and a deep link, for example "Technical Resources, updated July 20, 2026". Today a first-time visitor sees a resume with no timestamp anywhere above the fold, while the site actually has six dated takes and seven dated guides sitting one click away. Depends on nothing else. Cost: markup plus SCSS only, but the list is hand-maintained and must be re-sorted whenever anything is updated, which sets Effort at M.

**3. Client-side search** — a new `search.html` reachable from the primary nav on all seven pages. Ship a hand-maintained `search-index.json` of section titles, anchor URLs, and one-line summaries (roughly 40 entries covering every `<section>` on the site), and a deferred script that filters it on keystroke and renders results as a plain `<ul>` of links. Keep it to substring matching over titles and summaries so no fuzzy-search dependency is needed. Note that the current `WebSite` JSON-LD on `index.html` carries a comment explicitly saying no `SearchAction` is declared until a real search ships, so that block should be extended at the same time (hand off the schema edit to **search-engine-optimization**). Depends on nothing else, but it is the largest item here. Cost: a new page, a new script, a new hand-maintained data file, seven nav edits, a `PRECACHE_URLS` addition, and a `CACHE_VERSION` bump. No new dependency. Ongoing upkeep on every content change.

**4. Extend `<abbr>` coverage beyond the home page** — `guides.html`, `tech_resources.html`, and `tech_takes.html`. `<abbr title>` is used well on `index.html` (six instances) but appears exactly once on `guides.html` and once on `tech_takes.html`, and not at all on `tech_resources.html`. That is backwards: the home page is read by people who already know what PII means, while the beginner guides throw PPO, DQN, VLM, GAN, and GRC at readers who by definition do not, and the cybersecurity certifications table lists CISSP, CISA, CEH, and CISM with no expansion anywhere. Expand each acronym on first use per section. Depends on nothing. Cost: markup only, no script, no service-worker change, no upkeep beyond remembering the pattern for new content.

**5. Citation block per technical stance** — `tech_takes.html`, one line per section next to the existing "Last Updated:" line. Mirror the "Cite this guide:" pattern already used on all seven guides, giving the canonical anchor URL plus author and date. The technical stances are the pages most likely to be quoted externally, and `press_mentions.csv` records that three of eight existing press quotes were either misunderstood or, in one case, "butchered to the point of meaninglessness". Giving journalists a copyable citation is the cheapest available defense against that. Depends on nothing. Cost: six markup additions, no script, no upkeep beyond adding one line per new take. Overlaps with a cross-cutting note in the content-polisher report; treat that note as advisory and this row as the buildable item.

**6. Per-section copy-link affordance** — `tech_takes.html` and `guides.html`. A small button next to each `<h2>` that copies the section's canonical anchor URL to the clipboard via `navigator.clipboard.writeText`, with a `role="status"` confirmation so the action is announced. Every section already has a stable id and is already linked from the section nav, so the URLs exist; there is just no way to grab one without hand-editing the address bar. Falls back gracefully: if the Clipboard API is unavailable (which includes some `file://` contexts), leave the button out entirely rather than shipping a broken control. This serves the visitor's own sharing, not link earning, so it sits here rather than with **backlink-strategy-planner**. Depends on nothing. Cost: one new deferred script plus SCSS, a `PRECACHE_URLS` entry, and a `CACHE_VERSION` bump. No new dependency, no upkeep.

**7. Gallery treatment for the photography section** — `hobbies.html`, the `photographyDiv` section. Five landscape photographs are currently stacked as bare `<img>` elements identical in presentation to every other block on the site. Lay them out in a CSS grid and add a lightweight click-to-enlarge overlay built from a native `<dialog>` element, with focus trapping handled by `<dialog>`'s own modal behavior and Escape closing it for free. Add a short visible caption under each image describing the scene or location; the existing alt text is excellent and should stay as-is rather than being duplicated into the caption. Pairs naturally with the image-resizing recommendation in the accessibility report, since both touch the same five files. Depends on nothing. Cost: SCSS plus one small deferred script, a `PRECACHE_URLS` entry, and a `CACHE_VERSION` bump. No new dependency.

**8. Easter eggs** — site-wide, one shared deferred script. Two that fit this site without undermining its professional register: a Konami-code listener that briefly runs one of the existing AnimeJS timelines in an unusual configuration, and a `console.log` greeting with a short note and the contact email, which is the one easter egg guaranteed to be found only by the technically curious. Both must be inert for anyone who does not go looking, must not shift layout, and must respect `prefers-reduced-motion` for the animated one. Recommend against a hidden page or a hidden game: a recruiter who stumbles into either while skimming credentials reads it as a lack of judgment, and a hidden page also has to be excluded from `sitemap.xml` and `robots.txt` to stay hidden, which is upkeep for a joke. Depends on nothing. Cost: one new deferred script, a `PRECACHE_URLS` entry, and a `CACHE_VERSION` bump. No new dependency, no upkeep.

## Not recommended

- **Tag or category filtering on the takes, guides, and resources** — there are six takes, seven guides, and six resource topics. Filtering fewer than ten items costs the reader more interaction than it saves. Revisit if the takes pass roughly fifteen entries.
- **Comment system** — every option (Disqus, Utterances, Giscus) requires either a hosted backend or a third-party script that phones home before consent. Rules this out on both the static-only and privacy-first constraints.
- **Email newsletter signup** — needs a server or a third-party form processor. The Atom feed already covers return visits without either.
- **Social-media embed widgets** — third-party scripts that load trackers before consent.
- **View counters or "most popular" ranking** — needs server-side state, and the consent-gated analytics deliberately do not expose per-visitor data to the page.
- **Light/dark theme toggle** — plausible and static-friendly, but every one of the seven SCSS partials defines its own palette with contrast ratios computed by hand in the comments. A second theme means recomputing and maintaining all of them, which is a High-effort change for Medium impact on a site whose dark aesthetic is deliberate.
- **Surfacing `press_mentions.csv` as a "Press" section** — considered and set aside for this skill. The file exists and three of its eight rows record quotes the outlet got wrong, so publishing it as-is would advertise the misquotes. Whether to build a curated version of it is a positioning question that belongs to **backlink-strategy-planner**, which owns off-site references.
- **Citation guidance for academic work** (maintainer candidate) — partly built and partly not applicable. The guides already carry citation lines, so that half exists; the technical stances do not, which is recommendation 5 above. There is no published academic work on the site to cite beyond the linked Steganography research description, so a formal academic citation section would have nothing to point at.
- **Alt text, semantic structure, `<thead>` grouping, and heading hierarchy** — belongs to **accessibility-audit-runner**, which covers all of these in its own report.
- **Titles, meta descriptions, JSON-LD, and keyword targeting** — belongs to **search-engine-optimization**. The one exception is the `SearchAction` schema noted under recommendation 3, which only becomes relevant if search is built.
