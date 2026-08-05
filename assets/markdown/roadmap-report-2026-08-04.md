# Site Optimization Roadmap

**Last Updated:** 2026-08-04
**Synthesized from six reports written the same day:**

- `accessibility-auditor-report-2026-08-04.md`
- `content-polisher-report-2026-08-04.md`
- `seo-report-2026-08-04.md`
- `backlink-planner-report-2026-08-04.md`
- `feature-recommender-report-2026-08-04.md`
- `website-code-reviewer-report-2026-08-04.md`

## Executive summary

This site is in good health. Six independent audits looked for problems and mostly found things done correctly: skip links and focusable `<main>` on all seven pages, captions and scoped headers on all 14 data tables, reduced motion honored in two independent layers, unique hand-written titles and descriptions everywhere, structured data on every page, and a `feed.xml` whose dates match the page JSON-LD exactly. There is no crisis here and no rewrite to plan.

The highest-leverage move is a deletion. `service-worker.js` precaches six full-resolution photographs totaling roughly 22 MB, so every first-time visitor to any page downloads all of it in the background whether or not they ever open the hobbies page, and re-downloads it on every `CACHE_VERSION` bump. Removing six lines from `PRECACHE_URLS` recovers essentially all of that, because the existing runtime cache-first handler already caches the photos correctly for people who actually visit that page.

After that, the pattern across reports is that the site under-claims. Seven press mentions sit in a tracked CSV that no visitor can see. There is no way to leave with a resume. The strongest work history line gets one sentence. Meanwhile the weakest section on the site is a list of eighteen unsupported adjectives. The site's credibility problem is not that it lacks evidence; it is that the evidence is not on the page.

## Prioritized action table

| # | Action | Source skill | Impact | Effort | Phase | Depends on |
| - | ------ | ------------ | ------ | ------ | ----- | ---------- |
| 1 | Remove the six image entries from `PRECACHE_URLS`; bump `CACHE_VERSION` | SEO | H | L | Foundation | none |
| 2 | Mark the reading progress bar `aria-hidden`; drop its `role`/`aria-valuenow` | Accessibility + Code review | M | L | Foundation | none |
| 3 | Fix the AWS credential date in both the visible copy and the JSON-LD `expires` | Content + SEO | M | L | Foundation | none |
| 4 | Fix `revoke()` duplicate-ID bug in `cookie_consent.js` | Code review | L | L | Foundation | none |
| 5 | Move the cookie banner to the start of `<body>` | Accessibility | M | L | Foundation | 4 |
| 6 | Add `privacy.html` to `sitemap.xml` | SEO | L | L | Foundation | none |
| 7 | Replace `<language>`/`<copyright>` with `<rights>` in `feed.xml` | SEO | L | L | Foundation | none |
| 8 | Delete dead SVG animation steps and the two dead `> svg` selectors | Code review | L | L | Foundation | none |
| 9 | Rewrite the "Other Skills" section as three evidenced sentences | Content | H | L | Foundation | none |
| 10 | Tier the technical skills lists; drop Testing/Debugging/RegEx | Content | M | L | Foundation | none |
| 11 | Resize photography to web dimensions; add `srcset` | SEO + Accessibility + Feature | H | M | Foundation | 1 |
| 12 | Publish a press mentions section on the home page | Feature + Backlink | H | L | Discoverability | none |
| 13 | Audit whether the seven existing press mentions link back; record in CSV | Backlink | H | L | Discoverability | none |
| 14 | Add a resume PDF or a print stylesheet | Feature | H | L | Discoverability | 3, 9, 10 |
| 15 | Reorder the intro paragraphs; cut "proven ability"/"demonstrated impact" | Content | M | L | Discoverability | none |
| 16 | Decide `.takesIndex`: build the dated index or delete the dead CSS | Code review | M | M | Discoverability | none |
| 17 | Add `author` linkage to `tech_resources` and `hobbies` JSON-LD | SEO | L | L | Discoverability | none |
| 18 | Add a `<dialog>` image viewer for the gallery | Feature | L | L | Discoverability | 11 |
| 19 | Move the contact section into `<main>` | Accessibility | L | M | Discoverability | none |
| 20 | Request deep-link attribution on future expert-quote placements | Backlink | M | L | Reach | 13 |
| 21 | Outreach: Texas A&M CS orgs, awesome-lists, ML subreddits | Backlink | M | M | Reach | 11, 12 |
| 22 | Client-side search across guides and resources | Feature | M | M | Reach | 11 |
| 23 | Write 2-3 project case studies | Feature + Content | H | H | Reach | 14 |

## Phase notes

### Foundation (items 1-11)

Everything in this phase is either a defect or a credibility leak, and nine of the eleven items are under an hour each. The ordering principle is that there is no point driving traffic to pages that are slow, that misstate a credential, or that end on the weakest writing on the site.

Item 1 leads because it is the largest single win available and among the cheapest. It is a deletion, it needs no new tooling, and it benefits every page rather than one. Item 11, the actual image resizing, is deliberately separated from it and placed last in the phase: item 1 captures most of the value in minutes, while item 11 requires image tooling and a decision about derivative sizes. Do not let item 11 block item 1.

Item 3 is small but time-sensitive in a way the others are not. The AWS certification currently reads as expired in both the visible copy and the `expires` field of the structured data, so both a human reader and a search engine are being told the credential lapsed three months ago. Whatever the truth is, the page should say it deliberately.

Item 9 is the highest-impact content change on the site and takes about twenty minutes. Eighteen unsupported virtue words are the last thing a reader sees before the footer, immediately after two thousand lines of specific, quantified, verifiable claims. The contrast is the problem.

Item 5 depends on item 4 only because both touch `cookie_consent.js` and it is sensible to make one edit rather than two.

### Discoverability (items 12-19)

Only once the pages are fast and the copy is honest does it make sense to help people find and act on them. This phase is dominated by a single realization from the backlink report: the site already has external validation and does not display it.

Items 12 and 13 are the same underlying asset approached from two directions. Item 13 is diagnostic and should run first in wall-clock terms even though item 12 is the visible deliverable, because if it turns out that six of seven mentions are nofollowed name-drops with no link, that changes how much effort item 20 deserves. Both are cheap.

Item 14 depends on the content fixes because a resume exported from a page that still lists "Loyalty" and an expired certification inherits both problems. Fix the source, then export.

Item 16 is listed as a decision rather than a task on purpose. The `.takesIndex` styling is already written and compiled into `default.css`; it simply has no markup. Building it produces a dated index of all seven technical stances, which helps readers and crawlers both. Deleting it removes about 50 lines of unreachable CSS. Either is defensible. Leaving it in its current state is not, because its own comment is already stale.

### Reach (items 20-23)

Outreach comes last because a link is a promise about what a visitor will find. Items 21 and 22 depend on item 11 for exactly that reason: sending a Texas A&M student organization to a page that takes thirty seconds to load on campus wifi spends goodwill rather than building it.

Item 23 is the highest-value item in the entire roadmap on a long enough horizon, and it is last because it is the only one that requires sustained writing rather than an afternoon. Engineers are hired on how they think, and no bullet list demonstrates that. It is also the item most likely to be deferred indefinitely, so it is worth deciding now whether it is real. If it is, the MVP cost-savings work is the place to start, since it already has a number attached.

## Conflicts and dedupe log

**1. Reading progress bar, found twice with different remedies.** The accessibility audit and the code review independently identified that `reading_engagement.js:78` inserts the progress bar ahead of the skip link. They proposed different fixes: the code review suggested repositioning the bar after the skip link, the accessibility audit suggested marking it `aria-hidden="true"` and removing its ARIA value bookkeeping entirely.

*Reconciled in favor of the accessibility audit's remedy.* An `aria-hidden` element cannot be reached by a virtual cursor regardless of DOM position, so it fixes the ordering problem and additionally stops `aria-valuenow` being rewritten on every animation frame during scroll. The reposition fix addresses only the first of those. Counted once, as item 2.

**2. Photography weight, found three times from three angles.** The SEO report frames it as a Core Web Vitals and page-experience problem, the accessibility report as a barrier for metered and low-bandwidth visitors, and the feature report as a prerequisite for a click-to-enlarge viewer.

*Reconciled by splitting along the actual seam rather than the reporting seam.* The precache entries (item 1) and the image resizing (item 11) are genuinely separate pieces of work with very different costs, and the first captures most of the benefit. The three reports were describing one root cause, so it is counted once, but as two sequenced items. Item 18 depends on item 11 and is not double-counted.

**3. Apparent conflict on `PRECACHE_URLS` correctness.** The code review states that `PRECACHE_URLS` is "complete and accurate with no stale or missing entries." The SEO report calls the same list a critical problem.

*Not actually a conflict; both are correct.* The code review evaluated the list for correctness, meaning every path resolves to a real file, and it does. The SEO report evaluated it for weight. A list can be perfectly accurate and still be precaching the wrong class of asset. Recorded here because a reader moving between the two reports would otherwise see a contradiction. The code review's own scope note makes the same point.

**4. Apparent conflict on `sitemap.xml` freshness.** Every page in the repository was last committed on 2026-08-04, but sitemap `lastmod` values range from 2026-06-17 to 2026-08-04. This was checked during the SEO audit and deliberately not raised.

*Reconciled as correct behavior.* Google's guidance is that `lastmod` should reflect the last significant content change, not every commit, and the recent commits were formatting passes. Hand-maintaining these dates is more useful to crawlers than stamping every file on every push. Noted in both the SEO report and here specifically so a future audit does not "fix" it.

**5. Press mentions, found twice with different framings.** The feature report proposes a press mentions page as a credibility feature; the backlink report proposes it as a reciprocal-link surface and an E-E-A-T signal.

*Merged into a single item (12).* Same page, same effort, and the two rationales reinforce rather than compete. Both reports independently reached the same implementation constraint, that the CSV must be rendered as hand-written markup rather than fetched and parsed at runtime, because `fetch()` of a local file fails under `file://`. Both also independently flagged that the `Comments` column must not be published, since it contains candid assessments such as "Butchered the quote to the point of meaninglessness."

**6. Dead SVG references, extended during verification.** The code review flagged six dead `directChildren(el, "svg")` steps in `tech_resources_animations.js` and one dead `> svg` selector in `tech_resources.scss:60`. Verification confirmed both and found the same dead selector in `hobbies.scss:91`, which the original review did not cover. Item 8 covers all three locations. `index.scss:129` was checked and left alone: `index.html` has exactly 6 SVGs matching its 6 animation steps, so that selector is live.

**7. The contact section, one finding with two possible readings.** The accessibility report notes that `#contactMe` is a "page sections" nav target living inside `<footer>` rather than `<main>`, and offers two remedies: move the section into `<main>`, or relabel the nav entry. Item 19 assumes the first, because contact details are primary content on a portfolio site rather than site furniture. If that structural change is unwanted, the relabel is a valid and much cheaper substitute.

## What was checked and found already correct

Recorded so future audits do not re-litigate settled ground:

- Skip link plus `<main id="main" tabindex="-1">` on all seven pages, deliberately always-hidden rather than focus-revealed.
- Descriptive alt text on every image sitewide; no missing attributes.
- All 14 data tables carry a `visually-hidden` `<caption>` and `scope`-ed `<th>`; caption count matches table count on every page.
- `prefers-reduced-motion` honored in both the SCSS and the JavaScript, independently, so a mid-session toggle cannot strand content at `opacity: 0`.
- `navbar.js` implements the nav toggle as a correct disclosure widget: `aria-expanded` kept in sync, Escape closes, focus explicitly returned, `aria-current="page"` set.
- No `target="_blank"` anywhere on the site.
- Unique hand-written titles and meta descriptions on all seven pages; complete canonical, Open Graph, Twitter, and LinkedIn tags.
- `robots.txt` is thorough, deliberately separates AI-training crawlers from live-search and preview agents, and ends with a valid `Sitemap:` directive.
- `llms.txt` is a genuinely strong crawler summary with key facts, an FAQ, per-section deep links, and a citation policy.
- All seven `feed.xml` entry dates match the `Article` JSON-LD in `tech_takes.html` and the in-page "Last Updated" lines exactly.
- `PRECACHE_URLS` covers all 13 shipped JavaScript files with no stale or missing entries.
- The shared SCSS mixin library keeps seven palettes structurally consistent, with contrast ratios documented inline at each palette definition.

## Reminders that apply to most items above

Per the project checklists, several of these actions trigger cross-file follow-ups that are easy to miss:

- **Any SCSS edit** (items 8, 14, 16) requires recompiling `default.css` and committing it alongside the SCSS. Never hand-edit `default.css`.
- **Any asset or page added, renamed, or removed** (items 11, 12, 14) requires updating `PRECACHE_URLS` and bumping `CACHE_VERSION`.
- **Any change to CSS, JS, or metadata** requires a `CACHE_VERSION` bump, since sub-resources are served cache-first and returning visitors otherwise keep stale files.
- **Any new or edited page** requires checking `sitemap.xml` and `llms.txt` for accuracy.
- **Any Technical Stances edit** (item 16, if the index is built) requires mirroring dates into `feed.xml` and resetting the feed-level `<updated>`. Entry `<id>` tag URIs are permanent.
- **JSON-LD blocks must survive every content edit** (items 3, 9, 10, 15 all touch pages carrying structured data).
