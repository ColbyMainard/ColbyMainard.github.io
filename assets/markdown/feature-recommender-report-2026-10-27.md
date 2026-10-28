# Feature Recommendations

Last Updated: 2026-10-27

## Executive summary

The site already has most of the platform features a static portfolio can offer: offline caching and PWA install, an Atom feed, per-section permalinks, reading-time and progress bars, a manual photo gallery, consent-gated analytics, and an easter egg. The real gaps are about the paths employers and returning readers actually take. The landing page gives no sign of recent writing. The résumé content cannot be printed cleanly. The long resources page has no way to narrow 100-plus entries. The highest-leverage additions are a "Latest writing" block on `index.html` and a print stylesheet. Both are markup and SCSS only.

## Existing-feature inventory

Checked against every page's `<head>` and script list, the root files, and `service-worker.js` `PRECACHE_URLS`.

- **Navigation:** sticky responsive header with a site menu and a per-page section menu (`navbar.js`), `aria-current` section tracking, skip links, and a back-to-top button (`back_to_top.js`).
- **Reading aids:** reading time and a progress bar on `tech_takes.html` and `guides.html` (`reading_engagement.js`), and a visible "Last Updated" date on every stance and guide.
- **Sharing:** a "Copy link" button at the end of every section card on `tech_takes.html`, `guides.html`, and `tech_resources.html` (`section_permalinks.js`). Social-card meta tags are on every page.
- **Syndication:** a hand-maintained Atom feed (`feed.xml`) covering stances and guides. It is linked in the `<head>` and as a visible "Subscribe (Atom)" link on those two pages only.
- **Media:** a one-at-a-time photo viewer on `hobbies.html` (`photo_gallery.js`) and a privacy-enhanced YouTube embed.
- **Platform:** offline precache and PWA install (`service-worker.js`, `manifest.json`, injected by `service_worker_register.js`), `sitemap.xml`, `robots.txt`, and `llms.txt`.
- **Privacy:** a cookie-consent banner that gates Google Analytics (`cookie_consent.js`), with preference controls on `privacy.html`.
- **Delight:** a Konami-code easter egg with rotating developer jokes on all seven pages (`easter_egg.js`).
- **Animation:** AnimeJS section reveals, gated for reduced motion.
- **Absent:** a print stylesheet (no `@media print` in any SCSS file), any search or filtering, a downloadable résumé, any on-page link from `index.html` to recent writing (only the nav links), and a feed link anywhere outside the two content pages.

The dated reports already in `assets/markdown/` today are `code-review-2026-10-27.md`, `accessibility-auditor-report-2026-10-27.md`, and `content-polisher-report-2026-10-27.md`. None of them recommends a new feature, so nothing below repeats them. There are no earlier feature-recommender reports.

## Recommendation table

| # | Feature | Where it applies | Who it serves and why | Impact (H/M/L) | Effort (H/M/L) |
| - | ------- | ---------------- | --------------------- | -------------- | -------------- |
| 1 | Print stylesheet | Site-wide: `assets/css/default.scss:310` (start of the shared chrome block), mainly for `index.html` | Employers and recruiters who print or save the profile as a PDF get a clean, light-on-white document | H | L |
| 2 | "Latest writing" block with feed link | `index.html:226`, between the intro (`#introSectionDiv`, line 214) and Work History (line 227) | Employers and enthusiasts landing on the home page see within seconds that the site is active, and get a path to the newest stance or guide | H | M |
| 3 | Stance index sorted newest first | `assets/html/tech_takes.html:269`, after the intro disclaimer and before `#KANDiv` (line 275) | Returning readers find what is new without scanning eight long sections in a non-chronological order | M | M |
| 4 | Client-side filter for resource tables | `assets/html/tech_resources.html:266`, after the intro and before `#cybersecurityResourcesDiv` (line 270) | Enthusiasts narrow 10 tables and 100-plus books, courses, and certifications to a keyword | M | M |
| 5 | Unmarked acronyms: MLOps and NSPE | `index.html:221` (MLOps), `index.html:1767` (NSPE), `assets/html/tech_resources.html:1081` (MLOps) | Non-specialist readers get these terms spelled out | L | L |
| 6 | Downloadable résumé PDF | `index.html:227`, top of Work History | Recruiters who need a file for an applicant system get one without retyping | H | H |

## Recommendation details

**1. Print stylesheet.** Site-wide, through the shared block in `default.scss`. Add one `@media print` block after the shared-chrome comment at line 310. It holds three rules:

- `* { background: transparent !important; color: #000 !important; box-shadow: none !important; }`, plus `body { background: #fff !important; }`. This replaces every palette with black text on white.
- `header, .cookieConsent, .floatingBackToTop, .easterEggCard, .sectionPermalinkWrap, #reading-progress { display: none !important; }`. This hides the screen-only chrome.
- `main a[href^="http"]::after { content: " (" attr(href) ")"; }`. This prints each external URL after its link.

`index.html` is in effect a résumé, and its dark background prints poorly today. Depends on nothing. Cost: SCSS only, all seven stylesheets recompiled, and a `CACHE_VERSION` bump. No new script, no upkeep. CSS cannot open a collapsed `<details>` element, so the 44 coursework panels on `index.html` still print closed. To print them open, add a `beforeprint` listener to `navbar.js` that sets `open` on every `details` element. That raises the effort to M.

**2. "Latest writing" block with feed link.** `index.html:226`, a new section between `#introSectionDiv` and `#workHistoryDiv`. List the three entries in `feed.xml` with the newest `<updated>` date. Today these are the Data Engineering Guide (2026-10-16), the Reinforcement Learning Guide (2026-10-10), and "Vibe Coding is a Scourge to the Internet" (2026-09-06). Give each one's title, its date, and a link to the entry's `<link href>` anchor. End with a "Subscribe (Atom)" link to `feed.xml`. Suggested heading: "Latest writing". This is the only freshness signal an employer who never leaves the home page would see. It also makes the feed discoverable outside the two content pages. Depends on nothing, but stays accurate only if the maintainer updates it together with `feed.xml`. Cost: markup plus a small SCSS rule in `index.scss`. Ongoing upkeep on every new post, so add a line to the AGENTS.md "Added or edited a Technical Stances entry" checklist.

**3. Stance index sorted newest first.** `tech_takes.html`, in the intro after the disclaimer. The page orders stances by topic, and their `datePublished` values run 2025-10-07, 2025-11-29, 2025-10-18, and so on, so a returning reader cannot tell what is new. Add a compact table (Stance, Published, Last Updated) sorted newest first and linking to each section. It reuses the `dataTable` mixin the page already includes. Cost: markup only, with upkeep on every new or edited stance. The dates must match the `Article` JSON-LD and `feed.xml`. The guides page could take the same treatment later if it grows past seven entries.

**4. Client-side filter for resource tables.** `tech_resources.html`, above the first topic section. Add a labelled text input. A new deferred script, `resource_filter.js`, hides each table row whose text does not contain the query, hides any table left empty, and reports the match count through a `role="status"` paragraph, following the static-status pattern of `#photoGalleryStatus`. Gate it behind a `.js-filter` class, the way `photo_gallery.js` uses `.js-gallery`, so the input is hidden with scripting off. This is for the visitor's experience, not for earning links. Cost: one new script registered in `PRECACHE_URLS`, a `CACHE_VERSION` bump, and a `tech_resources.scss` rule. No dependency and no upkeep, because it reads the rows already in the page.

**5. Unmarked acronyms: MLOps and NSPE.** This is the maintainer-suggested abbreviation candidate, narrowed to terms that are actually unmarked. "MLOps" first appears unmarked in the `index.html` profile (line 221) and the MLOps book blurb (`tech_resources.html:1081`). The skills list at `index.html:2151` already spells it out in prose. "NSPE" at `index.html:1767` is also unmarked. Wrap `index.html:221` and `tech_resources.html:1081` as `<abbr title="Machine Learning Operations">MLOps</abbr>`. Rewrite `index.html:1767` as "Know the National Society of Professional Engineers (<abbr title="National Society of Professional Engineers">NSPE</abbr>) code, ...". The `title` is unreachable by keyboard and touch, so the NSPE line spells the name out in prose as well. Cost: markup only, no upkeep. This adds three `<abbr>` elements, so update the counts in CLAUDE.md and AGENTS.md: index 8 → 10, tech_resources 8 → 9, total 70 → 73.

**6. Downloadable résumé PDF.** `index.html`, at the top of Work History or beside the contact links. A one-to-two-page PDF in `assets/pdf/` gives recruiters the file their applicant-tracking systems ask for. Keep it out of `PRECACHE_URLS` as with the slides. Cost: a new hand-maintained file that must be re-exported whenever the page's work history changes, plus a decision about how much personal detail to publish. That upkeep is why this is rated H effort. Whether to publish one at all is the maintainer's call.

## Not recommended

- **Easter eggs (maintainer candidate):** already built. `assets/js/easter_egg.js` loads on all seven pages and shows a Konami-code card with rotating jokes. Note code-review CR-3 about one of its jokes.
- **Citation guidance (maintainer candidate):** already covered by `section_permalinks.js`, which gives every section on the three content pages a stable, copyable URL. Per-section citation lines were removed on purpose on 2026-09-06 and are not restored here.
- **Abbreviation markup in general (maintainer candidate):** 70 `<abbr>` elements already exist across six pages. Only the genuinely unmarked terms became recommendation 5.
- **Site-wide search:** this needs a hand-maintained JSON index or a new dependency such as Lunr or Pagefind, for a site of seven pages where browser find-in-page already works. Recommendation 4 covers the one page large enough to need it.
- **Tags or category filtering on stances and guides:** with eight stances and seven guides, each page's section menu already lists everything. Revisit when either page passes about fifteen entries.
- **Comments or a contact form:** these need a server or a third-party service that would load before consent.
- **Social share buttons:** third-party widgets would phone home before consent, and "Copy link" already covers the sharing use.
- **Custom analytics events:** possible within the consent gate, but no measured gap justifies extra tracking. Any change here would be the maintainer's call.
- **Social-card and meta improvements:** owned by `search-engine-optimization`.
- **Interactive calculators or quizzes:** owned by `backlink-strategy-planner` as a link-earning tactic.
- **A "Now" or "Uses" page:** this would be a new page with ongoing upkeep, for audience value the site's Hobbies and Technical Skills sections already partly cover. It is low priority next to the items above.
