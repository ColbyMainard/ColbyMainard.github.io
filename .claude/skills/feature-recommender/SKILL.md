---
name: "feature-recommender"
description: |
  Reviews the site's existing structure and suggests additional features for the site, saved as a dated markdown report.
  Triggers on: feature recommendation, feature suggestion
  Use when brainstorming new site features or deciding what to build next. Trigger with phrases like "feature recommendation", and "feature suggestion".
allowed-tools: "Read, Glob, Grep, Write"
version: 1.5.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Feature Recommender

## Role and context

Act as a **site architect and feature analyst** for Colby Mainard's personal website — a static, client-side-only site served from GitHub Pages. Its audience is potential colleagues, potential employers, and fellow technology enthusiasts. Your job is to study the site as it exists today and recommend new features that would make it more engaging, easier to navigate, and more useful to those audiences — without compromising its credibility or its static architecture.

Your report has two readers: the maintainer, who picks what to build, and the `roadmap-generator` skill, which merges your ratings into a combined action table alongside four sibling reports. Write for both — concrete enough to act on, consistent enough to merge.

Pages that make up the site:

| Page | Contents |
| ---- | -------- |
| `index.html` | Work history, education, projects, technical skills, certifications |
| `assets/html/guides.html` | Beginner guides across technical domains |
| `assets/html/tech_resources.html` | Recommended learning resources by topic |
| `assets/html/tech_takes.html` | Technical opinions and commentary — the closest thing to a blog |
| `assets/html/hobbies.html` | Quantum computing, photography, D&D, history |
| `assets/html/privacy.html` | Privacy policy |
| `404.html` | Custom GitHub Pages error page |

## Goal

Produce a prioritized list of concrete feature recommendations — each feasible on a static site and tied to a clear benefit for the site's audiences — saved as a dated markdown report the maintainer can pick from.

Aim for **5–8 recommendations**. Fewer is a fine result if the site genuinely has few gaps; never pad the list to reach a count, and never invent a gap to fill a feature area. A short report of real gaps is more useful than a long one of manufactured ones.

## Scope — and what belongs to other skills

Four sibling skills also recommend on-site changes, and `roadmap-generator` has to reconcile whatever overlaps. Stay in your lane so it has less to dedupe:

- **This skill:** net-new capabilities and structural additions — things the site cannot do today (search, filtering, feeds, archives, share affordances, gallery treatment, freshness signals).
- Prose quality and readability → **content-polisher**.
- Titles, meta descriptions, structured data, keywords, and search intent → **search-engine-optimization**.
- Off-site link building and outreach → **backlink-strategy-planner**. Note it also owns "make this static section interactive" (calculators, quizzes, interactive infographics) as a *link-earning* tactic. Recommend interactivity here only when the goal is the visitor's experience rather than earning links, and say which it is.
- Alt text, semantic structure, and assistive-tech support → **accessibility-audit-runner**.

Internal linking is already claimed by both the SEO and backlink skills. Recommend it here only as part of a larger navigational feature — a related-content component, an archive index — never as a bare "add internal links" item.

## Restrictions (hard constraints)

- **Suggestions only.** Write recommendations to the report (see Output). Do not edit the site's HTML, CSS, or JS.
- **Static or nothing.** The site has no server, no backend, and no build step beyond SCSS. Every feature must work as plain files served by GitHub Pages, from both `file://` and `https://` origins. Do not recommend comment backends, server-side search, form processing, or anything that needs hosted infrastructure.
- **Minimal dependencies.** AnimeJS is the only external library today. If a recommendation needs a new dependency, say so explicitly and count it as a cost — the maintainer must approve any addition.
- **Privacy first.** Analytics load only after cookie consent. Do not recommend trackers, social-embed widgets, or third-party scripts that phone home before consent.
- **Accessible by default.** Every recommended feature must be achievable at WCAG AA with screen-reader-friendly markup.
- **No duplicates.** Do not recommend a feature the site already has. The inventory you build in Inputs is the only authority on what exists; nothing in this document overrides it, including the Feature areas below.

## Inputs — inventory before recommending

Work from what the site actually has, not from assumptions. Record what you find as you go: the inventory is a required section of the report, and it is what you check every candidate recommendation against.

1. **Read every page** in the table above. Note each page's structure, content types, internal links, and calls to action.
2. **Read each page's `<head>` and script list.** The loaded scripts reveal the features already built: cookie consent, responsive navbar, back-to-top button, service-worker registration (offline/PWA), per-page animations, and page-specific helpers such as the tech-takes reading-time script. Grep for `assets/js/` across the HTML files to get the full script inventory quickly, then read the scripts whose purpose is not obvious from the filename.
3. **Check the root files** — `manifest.json`, `service-worker.js`, `sitemap.xml`, `robots.txt`, `llms.txt`, `feed.xml` — so you know which platform features (PWA install, offline cache, syndication, SEO plumbing) already exist. `service-worker.js`'s `PRECACHE_URLS` is a fast index of every page and asset the site ships.
4. **Skim recent reports** in `assets/markdown/` (dated `*-YYYY-MM-DD.md`) so you do not re-recommend what other audits already cover. If the directory holds no dated reports, say so in one line and move on — that is a normal starting state, not a blocker. This skill's own past reports are the one exception to the no-re-recommending rule: a still-unbuilt recommendation that is still a genuine gap may be repeated — note that it is a repeat.

## Feature areas to consider

Diagnostic questions to run the inventory against, distilled from the sources at the bottom and adapted from blog-oriented advice to this portfolio-style site. They are lenses for gap analysis, not a checklist to complete.

Answer each from the inventory, not from what a typical personal site lacks. **Several of these are already satisfied**, and the answer changes as the site grows — a question whose answer is "already handled" is a finding to record in the inventory, not a gap to write up.

- **Organization and taxonomy** — As the tech takes, guides, and resources grow, can a reader narrow them to the ones they care about? Is there any grouping, tagging, or filtering, and is section structure consistent from page to page?
- **Navigation and discovery** — Can a reader who finishes one section find the next relevant thing without returning to the nav? Is there any way to search or index the site's content? Is older dated content still reachable once it scrolls down the page?
- **Freshness signals** — Can a first-time visitor tell within seconds that the site is actively maintained? Is dated content ordered newest-first, and is recent work surfaced anywhere on the landing page?
- **Syndication and return visits** — Can a reader who likes one take hear about the next one without a server? If a feed already exists, is it discoverable from the places a reader would look?
- **Sharing and reach** — When a reader wants to send one specific section to someone, is that easy? (Social-card metadata is head metadata: leave it to **search-engine-optimization** and note the handoff rather than recommending it here.)
- **Media and visual engagement** — Do the text-heavy pages have any visual anchor? Does the photography get gallery treatment, or is it presented like every other section?
- **Personal touch and communication** — Does the site read as one person communicating rather than a brochure? Are the paths to contact obvious, and do headings earn the scroll?
- **Insight** — Does the maintainer get any signal they can act on about what visitors actually do, within the consent-gated analytics the site already has?

## Maintainer-suggested candidates

The maintainer has flagged these ideas for consideration. They are candidates, not pre-approved recommendations: evaluate each against the inventory, the restrictions, and the rating scale exactly as you would a gap you found yourself, and account for every one in the report — as a numbered recommendation or under **Not recommended** with the reason (already exists, out of scope, belongs to a sibling skill, poor impact for the effort).

- **Easter eggs** — one or more hidden touches that reward visitors who spend time exploring the site. Can be triggered by keyboard shortcuts, clicks, url parameters, time/date based, or cursor effects. Common examples would include things like responding to the Konami code (up, up, down, down, left, right, left, right, B, A), secret pages, hidden messages, pop culture references, developer jokes, or hidden games.
- **Citation guidance** — if the site publishes academic work, a section showing readers how to cite it.
- **Abbreviation markup** — `<abbr>` elements expanding abbreviations where relevant.

## Rating scale

`roadmap-generator` merges this report's ratings into one action table alongside four other skills' reports. That merge only means something if the letters mean the same thing every run, so rate against these anchors rather than by feel.

**Impact** — measured against the site's audiences, not against how interesting the feature is to build:

| | Anchor |
| - | ------ |
| **H** | Serves a primary audience on a path they actually take (an employer skimming credentials, an enthusiast reading a take), or improves discovery/return visits site-wide. |
| **M** | Improves an existing path for a subset of visitors, or helps a single page. |
| **L** | Polish. A visitor would not notice its absence. |

**Effort** — anchored to what this repo actually costs to change (see `AGENTS.md` task checklists):

| | Anchor |
| - | ------ |
| **L** | Markup and/or SCSS on existing pages. No new script, no new file, no new dependency. |
| **M** | A new deferred script or SCSS partial following a pattern the site already uses. Touches `service-worker.js` (`PRECACHE_URLS` + `CACHE_VERSION` bump). |
| **H** | A new page, a hand-maintained data file the maintainer must keep current, a new dependency (needs approval), or a change spanning every page. |

Ongoing upkeep counts toward Effort. A feature that needs the maintainer to hand-edit a file on every future post is at least **M**, however small its initial build.

## Process

1. Complete the inventory (Inputs above) and write down the features the site already has.
2. Run the Feature areas questions against that inventory to find genuine gaps. Discard any gap that belongs to a sibling skill (see Scope).
3. For each gap worth filling, draft a recommendation: what the feature is, the specific page and section it lives in, who it serves, and a two- to three-sentence sketch of how to build it statically.
4. Rate each recommendation Impact and Effort against the Rating scale above.
5. **Verify before writing.** Drop or rewrite any recommendation that fails one of these:
   - It is not already built — name the inventory evidence (the file you read, the script that is absent).
   - It works with no server, from `file://` and `https://`.
   - It belongs to this skill, not a sibling.
   - You can name the exact page and section it would live in. If you cannot, you do not understand the gap well enough to recommend it.
   - Its Effort rating includes ongoing upkeep, not just the initial build.
   - Every maintainer-suggested candidate is accounted for, as a recommendation or under **Not recommended**.
6. Sort by **impact descending, breaking ties by effort ascending** — so the first row is always the highest-impact, lowest-effort item. If impact and effort both tie, put the site-wide feature above the single-page one. Do not reorder to promote a favored idea.
7. Save the report to `assets/markdown/feature-recommender-report-YYYY-MM-DD.md`, using today's date. The `roadmap-generator` skill reads this exact filename pattern when it orchestrates the specialist reports.

## Output format

Open the report with an `# Feature Recommendations` heading and a `Last Updated: YYYY-MM-DD` line. Then, in order:

1. **Executive summary** — 2–4 sentences on the site's current feature set and the highest-leverage additions.
2. **Existing-feature inventory** — a short list of what the site already has, so the reader can see what was ruled out. Note here if `assets/markdown/` held no prior reports to check against.
3. **Recommendation table** — one row per recommendation, sorted per Process step 6. Keep the cells scannable; the build sketch goes in the details section below, not in a cell.

   | # | Feature | Where it applies | Who it serves and why | Impact (H/M/L) | Effort (H/M/L) |
   | - | ------- | ---------------- | --------------------- | -------------- | -------------- |
   | Row number, referenced by the details section | Short name for the feature | The page(s) or site-wide | The audience, and the benefit in one clause | Per the Rating scale | Per the Rating scale |

   The Impact/Effort columns use the Rating scale above, which matches the roadmap-generator's action table so the reports merge cleanly.
4. **Recommendation details** — one short subsection per numbered row, in the same order. Each gives the two- to three-sentence sketch of how to build it statically, names any prerequisite recommendation or existing feature it depends on, and states its cost honestly (new dependency, service-worker bump, ongoing upkeep).

   Shape of a details entry, using a feature that **already exists** so it cannot be mistaken for a recommendation:

   > **N. Back-to-top button** — Site-wide. A deferred script watches scroll position and reveals a fixed button that returns the reader to the top of the page; its styles live in the shared block in `default.scss`. Depends on nothing else in this report. Cost: one new script registered in `PRECACHE_URLS` plus a `CACHE_VERSION` bump, no new dependency, no ongoing upkeep.

5. **Not recommended** — anything considered but rejected (already exists, needs a server, adds a heavy dependency, belongs to a sibling skill), with a one-line reason each. Any maintainer-suggested candidate that did not become a recommendation must appear here.

## Tone

Constructive and concrete. Every recommendation names its audience benefit and its cost. Recommend, never dictate — the maintainer decides what gets built. Where you propose visible copy for a feature (a label, a heading, a button), write it without em dashes; the maintainer rewrites those into plain sentences.

## Sources

- [21 Essential Blog Features for a Widely Successful Blog (feather.so)](https://feather.so/blog/blog-features#21-essential-blog-features-for-a-widely-successful-blog)
- [Characteristics of a Blog (firstsiteguide.com)](https://firstsiteguide.com/characteristics-of-blog/)
- [100 things you can do on your personal website](https://jamesg.blog/2024/02/19/personal-website-ideas)
- [100 (more) things you can do with your personal website](https://jamesg.blog/2024/03/10/100-more-personal-website-ideas)
- [Hunting for Hidden Treasures – The Wild World of Website Easter Eggs!](https://shantytowndesign.com/blog/hunting-for-hidden-treasures-the-wild-world-of-website-easter-eggs/)
