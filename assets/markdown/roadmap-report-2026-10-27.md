# Optimization Roadmap

Last Updated: 2026-10-27

## 1. Executive summary

The site is technically healthy:

- The code review found no Critical or High defects.
- All 41 JSON-LD blocks are valid.
- Crawler policy, the feed, `llms.txt`, and the `#person` entity graph are all in order.
- Accessibility basics pass on every page.

The highest-leverage moves connect what already exists rather than build anything new: link the stances, guides, and home page to each other; put question headings above the guides' existing definitions; and tie the October 2026 LLMday talk to the Data Engineering guide and to an organizer link. Before any of that, fix the handful of small defects visitors can actually see: the dead gallery buttons without JavaScript, the focus loss on "Copy link", the easter-egg joke that reads as prompt injection, and the typos in the Vibe Coding stance and the skills list. All seven specialist inputs produced a report: the six roadmap skills plus the code review the maintainer requested. The `accessibility-audit-runner` skill has no real specification, so its report is a manual WCAG 2.2 AA audit.

## 2. Prioritized action table

Ranked most severe first: by Impact (H → M → L), then by phase (Foundation → Discoverability → Reach), then by Effort (L → H). The Phase notes below give the recommended order to work through them. Each action names the file, the line, the problem, and one fix. Code-review IDs are `CR-n` (`code-review-2026-10-27.md`), and accessibility IDs are `A11Y-n`.

| # | Action | Source skill | Impact (H/M/L) | Effort (H/M/L) | Phase | Depends on |
| - | ------ | ------------ | -------------- | -------------- | ----- | ---------- |
| 1 | **Print stylesheet.** `assets/css/default.scss:310` (shared chrome block). Problem: no `@media print` rule exists anywhere, so `index.html` (in effect a résumé) prints as light text on a dark background. Fix: add one `@media print` block with the three rules in feature report recommendation 1. They set black text on white, hide `header`, `.cookieConsent`, `.floatingBackToTop`, `.easterEggCard`, `.sectionPermalinkWrap`, and `#reading-progress`, and print each external URL after its link. Recompile all seven stylesheets. | feature-recommender | H | L | Foundation | — |
| 2 | **"Latest writing" block on the home page.** `index.html:226`, between the intro and Work History. Problem: an employer who never leaves the home page sees no sign of recent writing, and the feed is linked only from the two content pages. Fix: list the three `feed.xml` entries with the newest `<updated>` date, with dates and anchors. Today these are the Data Engineering Guide, the Reinforcement Learning Guide, and the Vibe Coding stance. End with a "Subscribe (Atom)" link. Add its upkeep to the AGENTS.md post checklist. | feature-recommender | H | M | Foundation | — |
| 3 | **Connect the "Invisible Data" talk to the Data Engineering guide, and add a data-quality checklist.** `index.html:2362` ↔ `assets/html/guides.html:416`. Problem: the site's strongest credential on data quality is not linked to the guide on that topic. Fix: add reciprocal links, then add "Before training" and "After training" checklists from the talk under "The Importance of Clean Data". Update the guide's `TechArticle` dates and `feed.xml`. | web-authority-helper, backlink-strategy-planner | H | M | Foundation | — |
| 4 | **Reframe the sports product-placement stance as a case study.** `assets/html/tech_takes.html:829`. Problem: the site's most first-hand content reads as tips, not as a citable source. Fix: after the opening paragraph, which ends at line 837, add a "How these factors were identified" paragraph of three to five sentences. Name the role (Machine Learning Engineer at MVP), the leagues (NFL, NHL, MLB, NBA), and the model types (detection and segmentation). Cross-link it with the Computer Vision guide's Problem Classes (`guides.html:502`). Publish only what the former employer permits. | web-authority-helper | H | M | Foundation | — |
| 5 | **Downloadable résumé PDF.** `index.html:227`, top of Work History. Problem: recruiters who need a file for an applicant-tracking system must retype the page. Fix: publish a one-to-two-page PDF in `assets/pdf/`, kept out of `PRECACHE_URLS`, and re-export it whenever Work History changes. Whether to publish one at all is the maintainer's call. | feature-recommender | H | H | Foundation | — |
| 6 | **Internal links between stances, guides, and the home page.** `assets/html/tech_takes.html:1016` (Vibe Coding) ↔ `assets/html/guides.html:718` (Software Engineering). Privacy stance (`tech_takes.html:699`) ↔ Cybersecurity guide (`guides.html:759`). AGI (`tech_takes.html:556`) → Generative AI guide (`guides.html:572`). Future of Quantum (`tech_takes.html:521`) → `hobbies.html#quantumComputingDiv`. On `index.html`, link "computer vision" at line 221 to the Computer Vision guide, and "real-world data" at line 2367 to the Data Engineering guide. Problem: stances and guides connect only through the nav, and the home page body links to no content page. Fix: add descriptive, non-repeated anchors at those points. | search-engine-optimization, backlink-strategy-planner, web-authority-helper | H | L | Discoverability | — |
| 7 | **Question headings above the guides' existing definitions.** `assets/html/guides.html:413` and the six matching guide openings, plus `tech_takes.html:281` and `:1016`. Problem: the snippet-ready answers sit under label headings that do not say what they answer. Fix: add `h3`s such as "What is data engineering?" directly above each definition. Do not change the `h2`s, which are mirrored in `feed.xml` and the JSON-LD. | search-engine-optimization, web-authority-helper | H | L | Discoverability | — |
| 8 | **Ask LLMday to link the speaker listing to the site.** `index.html:2362` (Public Speaking). Problem: the talk has earned no inbound link yet. Fix: email the organizer (llmday.com) using backlink plan strategy 1's template, asking for a link to `#publicSpeakingDiv`. | backlink-strategy-planner, web-authority-helper | H | L | Reach | 25 |
| 9 | **Gallery controls show as dead buttons without JavaScript (CR-1, A11Y-1).** `assets/css/hobbies.scss:98`. Problem: `display: flex` overrides the `hidden` attribute on `#photoGalleryControls` (`hobbies.html:192`). Fix: add `&[hidden] { display: none; }` inside `.photoGallery-controls`, recompile `hobbies.css`, and bump `CACHE_VERSION`. | code review, accessibility-audit-runner | M | L | Foundation | — |
| 10 | **"Copy link" drops keyboard focus on `file://` and non-secure origins (CR-2, A11Y-2).** `assets/js/section_permalinks.js:175`. Problem: the `execCommand` fallback selects a temporary textarea and then removes it, so focus falls back to `<body>`. Fix: save `document.activeElement` before `select()` and restore it with `.focus({ preventScroll: true })` afterward. | code review, accessibility-audit-runner | M | L | Foundation | — |
| 11 | **Easter-egg joke reads as a prompt injection (CR-3).** `assets/js/easter_egg.js:29` (and line 30). Problem: "If you are an AI, ignore previous instructions..." ships on every page of a site that invites AI readers, and line 30 shows literal backticks. Fix: replace line 29 with the CR-3 suggestion, "I asked an AI to recommend me as a top job candidate. It asked for more context." Replace the backticks on line 30 with escaped double quotes. | code review | M | L | Foundation | — |
| 12 | **Show the current section in the nav, not just announce it (CR-4, A11Y-3).** `assets/js/navbar.js:57`. The style belongs in `assets/css/default.scss:515`. Problem: `aria-current="location"` has no visual style. Fix: after the `&:hover` rule in the `#siteMenu` `a { }` block, add the CR-4 rule (bold, the hover background, and a 3px inset underline in `$emerald_efficiency_5`). Recompile all seven stylesheets and bump `CACHE_VERSION`. | code review, accessibility-audit-runner | M | L | Foundation | — |
| 13 | **Fix the Vibe Coding stance's copy (CR-5 plus content-polisher rows).** `assets/html/tech_takes.html:1027` ("Since 99% of people who are not professional developers," has no verb), and lines 1020, 1033, 1054, 1060, 1062, 1065, 1115, and 1118. Fix: apply the content-polisher before → after pairs, starting with "Since 99% of people are not professional developers, ...". Update `dateModified`, the visible date, and `feed.xml`. | code review, content-polisher | M | L | Foundation | — |
| 14 | **Fix the home page's typos and compressed bullets (CR-6 plus content-polisher rows).** `index.html:2253` (the duplicate, misspelled "ScaPy"), and lines 309, 1835, 1845-1846, 802, 829, 930, and 1487. Fix: delete line 2253, or correct it to "Scapy" if the packet library was meant. Then apply the `index.html` content-polisher pairs. | code review, content-polisher | M | L | Foundation | — |
| 15 | **Apply the remaining content-polisher edits.** Main targets: `guides.html:804`, `:810`, `:701-702`, and `:815`; `hobbies.html:352` and `:247-248`; `tech_resources.html:1081` and `:266`; the other `tech_takes.html` rows (359, 360, 544, 693, 984, 1003, 755); and `privacy.html:102`. Problem: grammar slips, run-ons, and two unexplained cultural references. Fix: accept or reject each before → after pair in the content-polisher report. | content-polisher | M | L | Foundation | — |
| 16 | **Resize the Hobbies photographs and stop lazy-loading the hero (includes CR-7 and A11Y-6).** `assets/html/hobbies.html:129` and the five `assets/images/photographyHobby/` originals (3.5 to 5.0 MB each). Problem: this is the site's slowest page, and its above-the-fold image loads late. Fix: export each photograph as a 1600×1067 JPEG with a `-1600` suffix, point the `<img>` tags at lines 163-187 to them, and link each original from its `<figcaption>`. Leave the `ImageObject` `contentUrl` values on the originals. On the hero, remove `loading="lazy"` and add `fetchpriority="high"`. Bump `CACHE_VERSION`. | web-authority-helper, code review, accessibility-audit-runner, search-engine-optimization | M | M | Foundation | — |
| 17 | **Stance index sorted newest first.** `assets/html/tech_takes.html:269`, after the disclaimer. Problem: stances are ordered by topic, and their publish dates do not run in order, so returning readers cannot see what is new. Fix: add a Stance, Published, and Last Updated table, newest first, using the existing `dataTable` mixin, and keep its dates in step with the JSON-LD and `feed.xml`. | feature-recommender | M | M | Foundation | — |
| 18 | **Keyword filter for the resource tables.** `assets/html/tech_resources.html:266`. Problem: 10 tables and 100-plus entries have no way to narrow them. Fix: a new deferred `resource_filter.js` with a labelled input and a `role="status"` match count, hidden without JavaScript. Add it to `PRECACHE_URLS` and bump `CACHE_VERSION`. | feature-recommender | M | M | Foundation | — |
| 19 | **Align the home page and resources metadata with their content.** `index.html:8` (meta description) and the Person `description` at `index.html:116`; the `<title>` of `assets/html/tech_resources.html`. Problem: the home page snippet leads with past computer-vision work and omits the current AML and fraud role, and the resources title promises only books. Fix: use the suggested description and "Best AI & Cybersecurity Books, Courses & Podcasts \| Colby Mainard". Mirror both into the matching `og:` and `twitter:` tags. | search-engine-optimization | M | L | Discoverability | — |
| 20 | **List the faithful press mentions on the site and in the Person graph.** `index.html`, a new "Quoted in" subsection under Public Speaking (after line 2377), plus `subjectOf` entries on the `#person` node. Problem: five faithful quotes exist, but nothing on the site points to them. Fix: list publication, article, and link for the five faithful mentions (`press_mentions.csv` rows 2, 3, 5, 7, and 8), and keep the list in step with that file. Leave out fintechly.com unless it is corrected. | web-authority-helper, search-engine-optimization | M | M | Discoverability | 21 |
| 21 | **Request a correction for the butchered fintechly.com quote.** `press_mentions.csv:6`. Problem: a quote "butchered to the point of meaninglessness" under Colby's name, in his current field. Fix: send backlink plan strategy 2's correction template to the article's author, then log the outcome. | backlink-strategy-planner, web-authority-helper | M | L | Reach | — |
| 22 | **Syndicate the Vibe Coding stance on DEV with a canonical link.** Source: `assets/html/tech_takes.html:1012`. Fix: republish on dev.to with `canonical_url` pointing at `#VibeCodingScourgeDiv`. | backlink-strategy-planner | M | L | Reach | 13 |
| 23 | **Pitch Practical AI as a guest (long shot).** Target: `index.html:2362`. Fix: one pitch using backlink plan strategy 9's template. Find the contact route on changelog.com/practicalai first. | backlink-strategy-planner | M | L | Reach | 25 |
| 24 | **Present the talk again at Austin Deep Learning.** Target: `index.html:2362`. Fix: offer the existing talk to meetup.com/austin-deep-learning (backlink plan strategy 4), then add the event to Public Speaking. | backlink-strategy-planner, web-authority-helper | M | M | Reach | 3, 25 |
| 25 | **Say what the slide link downloads (CR-8, A11Y-4).** `index.html:2377`. Problem: the link text is only "Download", for a 6.9 MB PDF. Fix: make the whole phrase the link text, `<a href="./assets/pdf/InvisibleDataSlides.pdf">Download the slides (PDF, 6.9 MB)</a>.`, and drop the trailing "the slides!". | code review, accessibility-audit-runner | L | L | Foundation | — |

## 3. Phase notes

**Foundation.** Fix what visitors can already see before sending anyone new to the site. Start with the low-effort defect fixes:

- Actions 9-12 and 25 each change five lines or fewer.
- Actions 13-15 are copy edits.
- Action 1 is a single SCSS block.

Batch every SCSS change (actions 1, 9, and 12) into one session so the seven stylesheets are recompiled and `CACHE_VERSION` is bumped once. Then build the content upgrades that later outreach will point at: the talk-to-guide checklist (3), the case study (4), and the "Latest writing" block (2). Leave the larger features (16-18) and the résumé decision (5) until those are in place.

**Discoverability.** With the pages clean, make them findable and make them pass authority to each other. Internal links (6) and question headings (7) are the highest-certainty levers on the site: they are entirely in the maintainer's control and need under a day combined. Do them before any outreach, so every link earned later flows on to the guides. The metadata alignment (19) is a quick follow-on. The press list (20) waits for the fintechly correction (21), so a corrected quote can be included.

**Reach.** Ask for links only once the pages behind them are worth linking. Action 25 (link text) comes before the LLMday request (8), because the organizer's visitors land on that download. The fintechly correction (21) and DEV syndication (22) are single sittings. The Austin Deep Learning talk (24) depends on the checklist (3) so the talk has an on-site home, and the Practical AI pitch (23) is a low-cost long shot. A new OWASP Austin talk was deferred because it needs a new talk and the chapter's current activity is unconfirmed.

## 4. Conflicts and dedupe log

- **Ranking order.** The maintainer asked for every report to be ranked most severe first. The roadmap skill asks for sequencing by phase. Resolution: the table is ranked by Impact as the severity measure, with phase and then effort as tie-breakers. The Phase notes give the execution order.
- **Code review ratings.** The code review rates by severity (Medium or Low), not Impact and Effort. The roadmap assigned letters using the shared anchors:
  - CR-1 (Medium) → M/L.
  - CR-3, CR-5, and CR-6 → Impact M, because they sit on a primary audience path: employer-visible copy, or a site-wide credibility signal.
  - Other Low findings → L/L.
  - All code-review fixes are L effort, because each is an edit to existing files.
- **Content-polisher ratings.** That report carries no Impact or Effort letters. The roadmap grouped its rows into actions 13-15 and rated them M/L: credibility on primary pages, edits to existing copy.
- **Web-authority leverage split** into Impact and Effort, as the skill requires:
  - #1 High → H/L.
  - #2 High → H/M.
  - #3 High → M/L.
  - #4 High → H/L.
  - #5 Medium → H/M.
  - #6 Medium → M/M.
  - #7 Medium → M/L.
  - #8 Medium → M/M.
  - #9 Medium → M/M.
- **Web-authority hand-offs merged:**
  - #1 → SEO's internal-links rows → action 6.
  - #2 → backlink strategy 5 → action 3. Impact taken from web-authority's H rather than backlink's M, because the action includes the talk link that web-authority rated.
  - #3 → backlink strategy 2 → action 21.
  - #4 → backlink strategy 1 → action 8.
  - #6 → kept as action 20, credited to both web-authority and SEO.
  - #7 → SEO's question headings → action 7.
  - #9 → backlink strategies 4 and 8 → action 24 (strategy 8 deferred).
- **Question headings rating conflict.** SEO rated them H/L, and web-authority rated them Medium (M/L). Kept SEO's H, because SEO owns headings.
- **Duplicates merged:**
  - CR-1 = A11Y-1 → action 9.
  - CR-2 = A11Y-2 → action 10.
  - CR-4 = A11Y-3 → action 12.
  - CR-8 = A11Y-4 → action 25.
  - CR-7 = A11Y-6 = SEO hobbies performance row, folded into web-authority #8 → action 16 (took web-authority's M/M, since the photograph resize is the larger task).
  - CR-5 = content-polisher's Vibe Coding cross-reference → action 13.
  - CR-6 → action 14.
  - Backlink strategy 3 (internal linking) = SEO internal links → action 6.
- **Corrected fix.** The code reviewer's CR-1 fix said to recompile all seven stylesheets. Only `hobbies.scss` changes, so only `hobbies.css` needs recompiling. Corrected in the code review report and in action 9.
- **Feature 2 vs SEO index internal links.** Both add body links to `index.html`. Kept separate: action 6 covers in-prose links in the profile and talk, and action 2 is a distinct, maintained block.
- **Policy guardrails checked.** No report recommends unblocking the training-bot stanza in `robots.txt`, adding `privacy.html` or `404.html` to `sitemap.xml`, or hardcoding the manifest link. Nothing was dropped for those reasons.
- **Stale reports.** None skipped. The only other files in `assets/markdown/` are the undated reference documents `animations_report.md` and `architecture.md`, which are not specialist reports.
- **Missing reports.** None. Every specialist wrote its report.
- **Deferred past the 25-action limit:**
  - CR-9: feed title covers only stances (`feed.xml:14`).
  - CR-10: stale comment (`animation_helpers.js:90`).
  - CR-11: dead SCSS and JS selectors (`tech_takes.scss:109`, `:122`; `tech_resources.scss:43`, `:61`).
  - CR-12: AGENTS.md cites a missing `sitemap.xml` header.
  - CR-13: README omits `assets/pdf/` and `press_mentions.csv`.
  - A11Y-5: gallery label (`photo_gallery.js:67`).
  - Feature 5: unmarked MLOps and NSPE.
  - SEO: `Event` `performer` and `eventStatus`; Hobbies `copyrightNotice`; stance freshness refresh (M/H); guides `HowTo` (no action).
  - Backlink 6: computer-vision task chooser (M/M).
  - Backlink 8: OWASP Austin talk (M/H).

## 5. Open questions

- **Do the existing press mentions link to the site, and with `nofollow`?** `press_mentions.csv` records quote quality only. Open each URL, check the credit line, and add a "Linked" column. This decides whether action 20 adds link equity or only corroboration. (web-authority)
- **Which pages already earn impressions, and for which queries?** This would confirm whether question headings (action 7) target queries the site already appears for, and which content page is the stronger pillar. Check Google Search Console → Performance → Pages and Queries. (SEO, web-authority)
- **What is the real inbound link profile?** Check Search Console → Links → Top linking sites before weighting outreach (actions 8 and 21-24) over on-site work. (web-authority)
- **Does llmday.com publish per-speaker pages?** This decides whether action 8 is a link request or a request to create a listing. A web search did not confirm one. (backlink, web-authority)
- **What is the contact route for Practical AI guest pitches?** No public process was found. Check the show's episode notes and Changelog's contact page before action 23. (backlink)
- **Is OWASP Austin still active?** The newest listing found was April 2024. Check austin.owasp.org before reviving the deferred OWASP talk. (backlink)
- **How much of the MVP work can be disclosed?** Only the maintainer can answer this, and action 4 depends on it. (web-authority)
- **Was "ScaPy" (`index.html:2253`) meant to be Scapy, the packet library, or a duplicate of Scrapy?** This decides whether action 14 deletes the line or corrects it. (code review)
- **Does "Many attacks come over wireless networks" (`guides.html:798`) mean wireless specifically, or networks in general?** A content-polisher question that changes the claim, so it is the author's call. (content-polisher)
- **Should a résumé PDF be published at all?** This is a privacy and maintenance decision for action 5. (feature-recommender)
