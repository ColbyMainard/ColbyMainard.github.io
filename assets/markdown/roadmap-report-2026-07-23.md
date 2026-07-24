# Site Optimization Roadmap

**Date:** 2026-07-23
**Synthesized from six specialist reports, all dated 2026-07-23:**

| Report | File |
| ------ | ---- |
| Accessibility audit | [accessibility-auditor-report-2026-07-23.md](assets/markdown/accessibility-auditor-report-2026-07-23.md) |
| Content polish | [content-polisher-report-2026-07-23.md](assets/markdown/content-polisher-report-2026-07-23.md) |
| Feature recommendations | [feature-recommender-report-2026-07-23.md](assets/markdown/feature-recommender-report-2026-07-23.md) |
| SEO audit | [seo-report-2026-07-23.md](assets/markdown/seo-report-2026-07-23.md) |
| Backlink strategy | [backlink-planner-report-2026-07-23.md](assets/markdown/backlink-planner-report-2026-07-23.md) |
| Code review | [website-code-reviewer-report-2026-07-23.md](assets/markdown/website-code-reviewer-report-2026-07-23.md) |

The code review is a sixth input beyond the roadmap skill's standard five. Its findings are maintenance-track items that run parallel to the visitor-facing work rather than blocking it, and they are marked as such in the table.

---

## Executive summary

This site is in unusually good shape for a personal portfolio, and every specialist report says so independently: contrast ratios were computed by hand and documented in the SCSS, accessibility patterns are applied consistently, structured data is present and valid on every page, the `robots.txt` reasoning about training scrapers versus live-search crawlers is genuinely considered, and the CORS workarounds are explained rather than merely applied. There is very little here that is broken.

What holds the site back is that its best content is unreachable. The technical stances are the strongest writing on the site and receive exactly one internal link from the entire site while emitting none; `index.html` runs 2,317 lines and never links to Guides, Stances, or Resources anywhere in its body; and `tech_resources.html` receives seven inbound links and sends nothing back. The single highest-leverage move available costs nothing but markup: connect the guide, resource, and opinion pages to each other, and give the home page a reason to point inward.

Beyond that, three things matter in order. First, the home page has grown past the point where its heading outline can be navigated, and splitting coursework onto its own page fixes an accessibility problem, a readability problem, and an SEO problem at once. Second, the guides already contain the answers to the questions people search for but phrase every heading as a noun rather than a question, which forfeits the featured-snippet and voice-search traffic the page is otherwise built to win. Third, the Product Placement stance contains first-hand knowledge of computer-vision-based sponsorship valuation that essentially does not exist elsewhere publicly, and it is the only asset on the site with a durable claim to being the best reference on its topic.

One caution runs through the whole plan: several items add a page or a hand-maintained data file. The `service-worker.js` `PRECACHE_URLS` and `CACHE_VERSION` discipline in `AGENTS.md` is not optional for any of them, and ongoing upkeep is counted in every Effort rating below.

---

## Prioritized action table

Impact and Effort use the anchors defined in the feature-recommender report, applied uniformly across all six sources. **Impact:** H = serves a primary audience on a path they actually take, or improves discovery site-wide; M = improves an existing path for a subset, or helps one page; L = polish. **Effort:** L = markup and/or SCSS only; M = a new script or partial, or a service-worker bump; H = a new page, a hand-maintained data file, a new dependency, or a change spanning every page. Ongoing upkeep counts toward Effort.

| # | Action | Source skill | Impact | Effort | Phase | Depends on |
| - | ------ | ------------ | ------ | ------ | ----- | ---------- |
| 1 | Add `aria-current="page"` to the self-referential nav link on all seven pages, with matching visual state in SCSS | Accessibility (A-1) | H | L | Foundation | — |
| 2 | Stop using headings for dates in the Projects section of `index.html` | Accessibility (A-2) | H | L | Foundation | — |
| 3 | Wrap header rows in `<thead>` and data rows in `<tbody>` on every table site-wide | Accessibility (A-5), Code review (F-9) | M | L | Foundation | — |
| 4 | Expand `<abbr title>` coverage on `guides.html`, `tech_resources.html`, and `tech_takes.html` | Features (#4) | M | L | Foundation | — |
| 5 | Apply the accepted copy edits, page by page | Content polish | M | L | Foundation | — |
| 6 | Drop the trailing colon from `<h2>Contact:</h2>` on all seven pages | Accessibility (A-9) | L | L | Foundation | — |
| 7 | Housekeeping sweep: remove unused `class`/`id` pairs, archive commented-out palettes, normalize the two odd `<div>` formattings | Code review (F-3, F-10, F-12) | L | L | Foundation (maintenance) | — |
| 8 | Add 192x192 and 512x512 icons to `manifest.json` | Code review (F-11) | L | L | Foundation (maintenance) | — |
| 9 | Delete `current_time.js` and its `PRECACHE_URLS` entry | Code review (F-15) | L | L | Foundation (maintenance) | — |
| 10 | Single SVG pass: resolve the `aria-hidden` / `<desc>` contradiction and move inline `style` attributes into SCSS | Accessibility (A-4), Code review (F-1) | M | M | Foundation | — |
| 11 | Give each `<section>` an `aria-labelledby` pointing at its own `<h2>` | Accessibility (A-7) | M | M | Foundation | — |
| 12 | Single image pass: export width-capped derivatives, rename to descriptive filenames, add gallery layout and captions | Accessibility (A-10), SEO, Features (#7) | M | M | Foundation | — |
| 13 | Extract shared SCSS section/table/animation boilerplate into parameterized mixins | Code review (F-2) | M | M | Foundation (maintenance) | — |
| 14 | Extract the duplicated `isHttp`/`isNested` logic into a shared script | Code review (F-4) | L | M | Foundation (maintenance) | — |
| 15 | Split the oversized functions: `run()`, `createBanner()`, the service-worker `fetch` handler, and `addStep`'s signature | Code review (F-5 to F-8) | L | M | Foundation (maintenance) | — |
| 16 | Split coursework off `index.html` onto its own page; subgroup the 120-item cybersecurity skills list under `<h4>` headings | Accessibility (A-3) | H | H | Foundation | 1 (nav change batches with it) |
| 17 | Internal linking pass across `index`, `guides`, `tech_resources`, `tech_takes`, and `hobbies`, with varied descriptive anchors | SEO, Backlinks (S-1) | H | L | Discoverability | 5 |
| 18 | Remove `keywords` and `linkedin:*` meta tags from all seven pages; add `og:locale` | SEO, Code review (F-14) | M | L | Discoverability | — |
| 19 | Add citation blocks to each of the six technical stances, mirroring the guides' pattern | Features (#5), Backlinks (S-3), Content polish | M | L | Discoverability | — |
| 20 | Fix `sitemap.xml`: reconcile the `guides.html` `lastmod` with its JSON-LD dates, and the `hobbies.html` `changefreq` with its `lastmod` | SEO | M | L | Discoverability | — |
| 21 | Rewrite the `tech_resources.html` and `guides.html` titles and descriptions toward real query shapes; fix the `hobbies.html` separator | SEO | M | L | Discoverability | — |
| 22 | Add ids to every `<h3>` on `tech_resources.html`; add the missing `<h3>Books</h3>` to Scripting and Operating Systems | SEO, Backlinks (S-4), Content polish | M | L | Discoverability | — |
| 23 | Add `<link rel="alternate" type="application/atom+xml">` to the `index.html` head | SEO | L | L | Discoverability | — |
| 24 | Convert guide subheadings to question form with a direct one- or two-sentence answer beneath each | SEO | H | M | Discoverability | 5 |
| 25 | Add a visible FAQ section plus `FAQPage` schema to `index.html`, built from the Q&A already in `llms.txt` | SEO | H | M | Discoverability | — |
| 26 | Add a "Recently updated" block to the `index.html` intro | Features (#2) | H | M | Discoverability | 20 |
| 27 | Build the related-content ("Read next") component on `tech_takes.html` and `guides.html` | Features (#1), Backlinks (S-1) | H | M | Discoverability | 17 |
| 28 | Enrich existing JSON-LD: `ProfilePage` dates, `Article` `inLanguage` and `keywords`, `ItemList` `dateModified`, `Book` entries, and reconcile the expired AWS credential | SEO | M | M | Discoverability | — |
| 29 | Add `FAQPage` schema to `guides.html` mirroring the new question headings | SEO | M | M | Discoverability | 24 |
| 30 | Add a per-section copy-link affordance to `tech_takes.html` and `guides.html` | Features (#6) | M | M | Discoverability | — |
| 31 | Build client-side search (`search.html` plus a hand-maintained index), then add `SearchAction` to the `WebSite` schema | Features (#3), SEO | H | H | Discoverability | 16, 22 |
| 32 | Expand the Product Placement stance into a full original-research framework, with a schematic SVG diagram | Backlinks (S-3, S-2) | H | H | Reach | 19, 24 |
| 33 | Submit `tech_resources.html` to curated "awesome" resource directories | Backlinks (S-4) | M | L | Reach | 22 |
| 34 | Syndicate the KAN stance and the Computer Vision guide to dev.to and Hashnode with canonical links back | Backlinks (S-6) | M | L | Reach | 19, 24 |
| 35 | Add sourced expert quotes to the KAN and Privacy stances; fix the disputed Twain attribution; notify those quoted | Backlinks (S-8), Content polish | L | L | Reach | 5 |
| 36 | Build the computer vision problem-class picker inside the Computer Vision guide | Backlinks (S-2) | M | M | Reach | 24 |
| 37 | Build the certification comparison filter inside the `tech_resources.html` cybersecurity section | Backlinks (S-2) | M | M | Reach | 22 |
| 38 | Sustained participation in the named ML, CV, quantum, and security communities | Backlinks (S-5) | M | H | Reach | 24, 27 |
| 39 | Build the applied computer vision pillar page | Backlinks (S-7) | M | H | Reach | 32 |
| 40 | Add the two tasteful easter eggs (Konami-code animation, console greeting) | Features (#8) | L | M | Reach | — |

---

## Phase notes

### Foundation (actions 1 to 16)

Fix the reading experience before driving anyone toward it. Two problems here are load-bearing for everything downstream. The first is that no nav link identifies the current page, which means a visitor arriving from any external link has no orientation cue; that is action 1, and it is the cheapest high-impact item in the whole plan. The second is action 16, splitting coursework off the home page. That one is rated High effort and sits last in the phase because it is genuinely disruptive, but it resolves an accessibility problem (a heading outline too long to navigate), a content problem (roughly forty collapsible course breakdowns burying the certifications and skills a recruiter came for), and an SEO problem (a home page whose keyword focus is diluted across four hundred course topics) in one change. Do it before the discoverability work, because otherwise the SEO items are optimizing a page that is about to be restructured.

Everything else in this phase is deliberately Low effort and independent, which makes it good batching material. Actions 1 through 9 can all ship in a single session with one `CACHE_VERSION` bump between them.

The maintenance track (actions 7 to 9 and 13 to 15) is separated because it changes nothing a visitor perceives. None of it blocks any other item. Action 13, the SCSS mixin extraction, is the exception worth prioritizing on its own merits: it currently multiplies every future styling change by six, so doing it early makes every later SCSS edit in this roadmap cheaper. Actions 14 and 15 are best folded into whatever future edit touches those files anyway, rather than run as a dedicated pass.

### Discoverability (actions 17 to 31)

Now make the improved pages findable. Action 17 leads the phase because it is Low effort, High impact, and depends on nothing but the copy edits: the site's internal link graph is currently one-directional in a way that strands its best content, and fixing it costs a couple of hours of markup. Every specialist report reached this conclusion independently from a different angle, which is the strongest signal in this document.

Actions 24 and 25 are the two highest-value non-branded traffic plays. The guides already contain the answers people search for; converting noun-phrase headings to questions with direct answers underneath is what makes those answers eligible for People Also Ask, featured snippets, and AI answer engines. Action 25 is nearly free content-wise, since the five Q&A pairs already exist in `llms.txt` and are already public; they are simply being served to LLM crawlers and withheld from search engines.

Actions 26, 27, and 31 add features rather than metadata, and each carries ongoing upkeep. Take them in that order: the "Recently updated" block is one hand-maintained list, the related-content component is one link list per section, and search is a hand-maintained index of roughly forty entries that must be touched on every content change. If upkeep capacity is limited, build the first two and defer search. Note that action 31 must come after action 16, since restructuring the home page changes what the index needs to contain.

### Reach (actions 32 to 40)

Pursue links only once the pages are worth linking to. The ordering here is deliberate: action 32 comes first because the expanded Product Placement research is the only asset on this site with a genuine claim to being the best public reference on its topic, and it is what every other Reach item points at. Computer-vision-based sponsorship valuation is a commercial field where methodology is a trade secret, and the author has the rare combination of first-hand production experience across seven leagues and a willingness to write it down. That combination will not be matched by a competitor writing from research.

Actions 33 through 35 are the low-effort follow-ons and can run in parallel with 32. The awesome-list submissions depend on action 22 only because a directory listing needs a precise deep-link URL, and half the `<h3>` headings on the resources page are currently unlinkable.

Action 38 deserves a specific warning. Sustained community participation is the most effective item in this phase and the most likely to be abandoned halfway, and abandoning it badly is worse than never starting: communities remember drive-by link dropping. Commit to a few hours a month indefinitely or skip it. Action 39, the pillar page, is listed last and should be treated as optional, because a pillar page over thin content is a doorway page that earns nothing. Build it only if action 32 proves the material has an audience, and be aware it adds a seventh item to a nav bar that already holds five.

---

## Conflicts and dedupe log

### Deduplicated: the same recommendation from multiple reports

| Merged into | Sources that raised it | How it was reconciled |
| ----------- | ---------------------- | --------------------- |
| Action 3 (`<thead>`/`<tbody>`) | Accessibility A-5, Code review F-9 | Identical finding reached independently from the assistive-technology angle and the standards-compliance angle. Merged as one mechanical sweep; both note no visual change is expected. |
| Action 10 (SVG pass) | Accessibility A-4, Code review F-1 | Different defects on the same six elements: A-4 flags `<desc>` inside `aria-hidden` (a contradiction), F-1 flags inline `style` attributes (a project-rule violation). Merged into one pass because touching those SVGs twice is wasted work. |
| Action 12 (image pass) | Accessibility A-10, SEO, Features #7 | Three angles on the same five files: resolution (accessibility), descriptive filenames (SEO image search), gallery layout and captions (features). All three require a `PRECACHE_URLS` update and a `CACHE_VERSION` bump, so they are one change. Note the alt text is already excellent and should be preserved, not duplicated into the new captions. |
| Action 17 (internal linking) | SEO, Backlinks S-1 | Both reports identified the identical lopsided link graph. The SEO report frames it as authority flow, the backlink report as reader discovery. Same edits, one action. |
| Action 18 (meta cleanup) | SEO, Code review F-14 | Both flagged the `keywords` meta tag. SEO additionally found the `linkedin:*` tags, which LinkedIn does not read (it consumes Open Graph), amounting to roughly 28 lines of dead markup site-wide. Merged since both are head edits across the same seven files. |
| Action 19 (citation blocks) | Features #5, Backlinks S-3 step 4, Content polish cross-cutting note | Three reports independently noticed that `guides.html` has "Cite this guide" lines and `tech_takes.html` does not. The backlink report supplies the strongest justification: `press_mentions.csv` records that three of eight external quotes were garbled, one severely. |
| Action 22 (`<h3>` ids and missing headings) | SEO, Backlinks S-4, Content polish | Raised as a crawlability gap, a deep-link prerequisite for directory submissions, and a structural inconsistency. One fix, three beneficiaries. |
| Action 27 (related-content component) | Features #1, Backlinks S-1 step 4 | Both proposed the same component. The feature report supplies the decisive evidence: `tech_takes_engagement.js` already excludes a `.relatedStances` selector from its word count, but that class exists nowhere in the HTML or SCSS. The component was designed and never built. |
| Action 31 (search) | Features #3, SEO | The feature report proposes the search page; the SEO report notes the `index.html` comment stating no `SearchAction` schema will be declared until real search ships. Sequenced as one action so the schema is not added prematurely. |
| Setting aside `press_mentions.csv` as a public press page | Features (Not recommended), Backlinks (What was considered) | Both reached the same conclusion for the same reason: three of the eight rows record misquotes, so publishing the list as-is advertises them. Neither recommends it; both point at citation blocks (action 19) as the better response. Recorded here so a future audit does not re-propose it. |

### Conflicts resolved

**1. Filtering: rejected in one report, recommended in another.**
The feature-recommender report explicitly rules out tag and category filtering, on the grounds that filtering fewer than ten items costs the reader more interaction than it saves. The backlink report recommends a certification comparison filter on `tech_resources.html`. *Resolved:* these are different things and both stand. The rejected item is site-wide taxonomy filtering across six takes and seven guides, where the interaction cost exceeds the benefit. The accepted item (action 37) filters table rows by attributes already present in the data (experience required, target role), which is a different interaction serving a different need. Kept action 37; did not add site-wide tag filtering.

**2. Removal urgency of the `keywords` meta tag.**
The SEO report treats it as a live "needs work" item; the code review explicitly recommends handling it opportunistically rather than as a dedicated pass. *Resolved in favor of a middle position:* batched into action 18 alongside the `linkedin:*` removal and the `og:locale` addition, because those three are the same edit to the same seven `<head>` blocks. As a standalone task the code review is right that it is not worth a pass; bundled, it is nearly free.

**3. Two reports each propose a new page, and both require the same seven-page nav edit.**
Accessibility A-3 proposes a coursework page; backlink S-7 proposes a computer vision pillar page. *Resolved by sequencing and a caution:* the nav bar already carries five items, and adding two more is a real mobile usability cost. Action 16 (coursework) is prioritized because it fixes three problems at once and is a straight subtraction from an overloaded page. Action 39 (pillar page) is placed last and marked optional. If both ship, the coursework page need not appear in the primary nav at all: linking it from the Education section alone is sufficient, which keeps the nav at six items rather than seven.

**4. Content-polisher suggestions that change meaning rather than wording.**
Three suggested revisions add or clarify facts rather than smooth prose: the "top 2 out of 20" clarification on the COVID-19 project, the Casket Girls date and origin detail on `hobbies.html`, and the disputed Twain attribution. *Resolved:* the content-polisher report flags each of these itself and asks the author to confirm before accepting. Action 5 carries that constraint forward. The Twain item is separated into action 35 because it is a sourcing correction rather than a copy edit, and because the article currently cited as the attribution is itself about the quote being misattributed.

**5. A schema block that contradicts the page it sits on.**
The SEO report found that `Person.hasCredential` in `index.html` advertises the AWS Certified Cloud Practitioner with `"expires": "2026-05"`, a date now in the past, while the body copy at line 2245 already says "(expired)". *Resolved:* folded into action 28. This is the only outright factual inconsistency any report surfaced, and it is worth fixing ahead of the other schema enrichments in that action, since stale credential markup is a trust signal working in reverse.

**6. Interactivity ownership between two skills.**
The feature-recommender skill owns interactivity aimed at visitor experience; the backlink skill owns it as a link-earning tactic. Both reports proposed interactive additions. *Resolved by the reports themselves, and verified here:* the feature report's copy-link affordance (action 30) is explicitly framed as visitor sharing, and the backlink report's picker and filter (actions 36 and 37) are explicitly framed as link targets. No overlap, no double-counting. The one item that touches both, the schematic SVG for the Product Placement stance, is counted once inside action 32.

### Noted, not actioned

- **Skip links are always hidden rather than focus-revealed**, `404.html` omits the consent and service-worker scripts, and `privacy.html` loads no animations. All three are documented project decisions. The accessibility report reviewed each and explicitly declined to flag them. Recorded here so no future audit re-raises them.
- **`index.html` is deliberately excluded from every outreach strategy.** The backlink report is blunt that nobody links to a resume. The home page should receive internal links (action 17) and profile links, not be the subject of outreach. This is a positioning decision worth preserving.
- **A light/dark theme toggle** was considered and set aside by the feature report: every one of the seven SCSS partials defines its own palette with contrast ratios computed by hand in the comments, so a second theme means recomputing and maintaining all of them. High effort, Medium impact, and the dark aesthetic is deliberate.
