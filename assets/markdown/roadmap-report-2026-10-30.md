# Optimization Roadmap

Last Updated: 2026-10-30

Inputs, all dated 2026-10-30: `code-review-2026-10-30.md`, `accessibility-auditor-report-2026-10-30.md`, `content-polisher-report-2026-10-30.md`, `feature-recommender-report-2026-10-30.md`, `seo-report-2026-10-30.md`, `backlink-planner-report-2026-10-30.md`, and `web-authority-report-2026-10-30.md`.

## Executive summary

The site is technically sound. The code review found no Critical or High defects, and the structured data, script-order contracts, precache list, and consent gating all check out. The most severe problems are in the words rather than the code:

- one sentence on the privacy stance that reads as if Colby is "best known" for dark-web access;
- a handful of technical claims an expert reader would dispute;
- misspelled degree names in the credential headings recruiters read first.

The highest-leverage moves after those are the one Medium code defect (dead gallery buttons without JavaScript), replacing aggregator sources with primary citations, and linking the stances back to their guides. Outreach (the LLMday organizer and podcast pitches) should wait until the talk has an HTML summary worth linking to.

All six specialists produced a report. `accessibility-audit-runner` is a stub with no procedure, so its audit was carried out directly against WCAG 2.2 AA.

## Prioritized action table

Line numbers refer to commit `b7c1db0`. Uncommitted comment deletions in four SCSS files move action 4's `hobbies.scss:98` to line 96 in the current working tree. No HTML, JS, or root-file line number is affected.

The table is ranked by severity, most severe first, as requested. The Phase column and the execution order below it give the recommended working sequence.

| # | Severity | Action | File and line | Recommended fix | Source skill | Impact | Effort | Phase | Depends on |
| - | -------- | ------ | ------------- | --------------- | ------------ | ------ | ------ | ----- | ---------- |
| 1 | High | Fix the dangling modifier in the Tor recommendation | `assets/html/tech_takes.html:755` | Rewrite as "Tor is best known for reaching the dark web, but I also recommend it for everyday browsing on the clear web." | content-polisher | H | L | Foundation | none |
| 2 | High | Review claims an expert reader would dispute | `assets/html/guides.html:468`; `assets/html/tech_takes.html:426-430, 536-537, 547`; `assets/html/hobbies.html:241` | Keep, qualify, or correct each one (k-anonymity "adds noise", quantum and NP speedups, GPUs as ASICs, the unsourced "safe" crypto list, the "sabotage" etymology). | web-authority-helper, content-polisher | H | M | Foundation | none |
| 3 | High | Correct the degree names, and make `llms.txt` match | `index.html:326, 671`; `llms.txt` (Key facts, and the feed label in Pages) | "Master of Computer Science" and "Bachelor of Science in Computer Science". Mirror the wording in `llms.txt`, and rename its feed label to include the guides. | content-polisher, search-engine-optimization, web-authority-helper | H | L | Foundation | none |
| 4 | Medium | Hide the gallery controls when the gallery script has not run | `assets/css/hobbies.scss:98` (markup `assets/html/hobbies.html:192`) | Add `&[hidden] { display: none; }` to `.photoGallery-controls`. You recompile, then bump `CACHE_VERSION`. | code review (CR-1), accessibility-audit-runner (A-1) | M | L | Foundation | none |
| 5 | Medium | Replace aggregator sources with primary citations | `assets/html/tech_takes.html:785, 797, 1044`; `assets/html/guides.html:741` | Link each original (for example Sweeney 2000 for the 87% figure), or soften any claim that has no primary source. | web-authority-helper (W-2), search-engine-optimization (S-4) | M | L | Discoverability | none |
| 6 | Medium | Link each stance back to its guide or resource list | `assets/html/tech_takes.html`, section ends at lines 348, 517, 552, 695, 825, 954 | Add one "Related on this site" sentence or block per stance with descriptive anchors, using the mapping in backlink B-3. | web-authority-helper (W-1), backlink-strategy-planner (B-3), feature-recommender (1) | M | L | Discoverability | none |
| 7 | Medium | Publish the LLMday talk as HTML and deepen the data engineering guide with it | `index.html:2357-2381`; `assets/html/guides.html:416-448` | Add the talk's key points with slide thumbnails under the abstract, and fold two or three of its examples into "The Importance of Clean Data". | web-authority-helper (W-4), feature-recommender (4) | H | M | Foundation | none |
| 8 | Medium | Add a "Latest writing" block to the landing page | `index.html`, after line 228 | Write a hand-maintained three-item list of the newest stances and guides with dates, and add an update step to the `feed.xml` header workflow. | feature-recommender (2) | H | M | Foundation | none |
| 9 | Medium | Add a page-level `CollectionPage` node to the resources page | `assets/html/tech_resources.html`, JSON-LD in the head (between lines 62 and 222) | Copy `guides.html:81-94`, set `dateModified` to 2026-10-29, and set author/publisher to the `#person` `@id` plus `name`. | search-engine-optimization (S-1) | M | L | Discoverability | none |
| 10 | Medium | Add intro copy to the hobbies page | `assets/html/hobbies.html:128-129` | Under the `<h1>`, add one or two sentences in your own words naming the four hobbies and the CC BY photo license. | search-engine-optimization (S-2) | M | L | Discoverability | none |
| 11 | Medium | Retitle the stances page to name its newest topics | `assets/html/tech_takes.html:5` (and the og/twitter/linkedin titles in the same head) | "Technical Stances on AI, Vibe Coding &amp; Privacy \| Colby Mainard" | search-engine-optimization (S-3) | M | L | Discoverability | none |
| 12 | Medium | Correct the tool-name spellings | `index.html:1915, 1922, 2217, 2228, 2254, 2284` | NumPy, MLflow, SageMaker, Scrapy, Scapy, Robot Operating System. | content-polisher | M | L | Foundation | none |
| 13 | Medium | Request corrections for the misrepresented quotes, and log link status | `press_mentions.csv:4, 6` | Email the devx.com and fintechly.com editors (templates in backlink B-2), then add a `Linked` column to the CSV. | backlink-strategy-planner (B-2), web-authority-helper (W-5, W-6) | M | L | Reach | none |
| 14 | Medium | Apply the remaining copy edits | `assets/html/guides.html`, `tech_takes.html`, `hobbies.html`, `tech_resources.html`, `404.html` (line-by-line in the content report) | Accept or reject each before → after pair in `content-polisher-report-2026-10-30.md`. | content-polisher | M | M | Foundation | 2 |
| 15 | Medium | Ask LLMday to link the talk summary | `index.html:2357-2381` | Send the organizer template in backlink B-1 through <https://llmday.com>. | backlink-strategy-planner (B-1) | H | L | Reach | 7 |
| 16 | Medium | Pitch "Invisible Data" to three podcasts | `index.html#publicSpeakingDiv` | Pitch the Data Engineering Podcast, the MLOps Community, and Practical AI, using the template in backlink B-4. | backlink-strategy-planner (B-4) | H | M | Reach | 7 |
| 17 | Medium | Replace the YouTube iframe with a click-to-load facade | `assets/html/hobbies.html:141` | Use a button and thumbnail that insert the existing iframe on activation. Keep line 143 as the fallback, and update `privacy.html:193`. | code review (CR-4), feature-recommender (3) | M | M | Foundation | none |
| 18 | Low | Load the hobbies hero image eagerly | `assets/html/hobbies.html:129` | Remove `loading="lazy"` and add `fetchpriority="high"`. | code review (CR-2) | M | L | Foundation | none |
| 19 | Low | Serve resized gallery images | `assets/html/hobbies.html:163, 169, 175, 181, 187` | Export about 1600 px derivatives, use them through `src`/`srcset`, and link the originals. | code review (CR-3), web-authority-helper (W-8) | M | M | Foundation | none |
| 20 | Low | Spell out and mark up the league acronyms | `index.html:266`; `assets/html/tech_takes.html:843-849` | Write each league in full on first use, with the short form in `<abbr title>`. | code review (CR-5), accessibility-audit-runner (A-3), content-polisher | L | L | Foundation | none |
| 21 | Low | Correct the `<abbr>` counts in the agent guides | `CLAUDE.md:20`; `AGENTS.md:78` | Set `index.html` to 8 and the total to 82, or to the new totals after action 20. | code review (CR-6) | L | L | Foundation | 20 |
| 22 | Low | Make two link texts describe their destinations | `index.html:2378`; `assets/html/privacy.html:162` | Change to "Download the slides (PDF, 6.9 MB)", and point "Google Search Console" at Search Console itself. | accessibility-audit-runner (A-4, A-5), content-polisher | L | L | Foundation | none |
| 23 | Low | Give `navbar.js` the same start-up guard as the other scripts | `assets/js/navbar.js:147` | Move the handler into `init()` and call it through the `document.readyState === "loading"` guard. | code review (CR-7) | L | L | Foundation | none |
| 24 | Low | Mark the last nav entry current at the bottom of the page | `assets/js/navbar.js:98` (update function at line 54) | In `createCurrentMarker().update`, mark the last tracked entry when the window is scrolled to the bottom. | code review (CR-8), accessibility-audit-runner (A-2) | L | L | Foundation | none |
| 25 | Low | Remove the em dash from the app name | `manifest.json:2` | Change it to "Colby Mainard: Machine Learning Engineer", then bump `CACHE_VERSION`. | code review (CR-9) | L | L | Foundation | none |

### Recommended execution order

- **Foundation:** 1, 3, 4, 12, 22, 18, 20, 21, 23, 24, 25, 2, 14, 17, 7, 8, 19
- **Discoverability:** 6, 5, 9, 10, 11
- **Reach:** 13, 15, 16

Within each phase, high-impact and low-effort items come first. Action 13 can run at any time, because it touches no site file.

## Phase notes

**Foundation.** The credibility fixes (1, 2, 3, 12) come first. They are cheap, and the stances and credentials are what employers and engineers actually read. Sending more visitors to a page that misstates a technical claim would multiply the damage. The code defects follow: one Medium (4) and a run of quick Lows that share a single `CACHE_VERSION` bump. The two content-depth items (7, 8) close the phase, because they create the linkable asset that Reach depends on.

**Discoverability.** With the content trustworthy, internal linking (6) and primary citations (5) strengthen the clusters the web-authority report mapped, at almost no cost. The three SEO head and copy fixes (9, 10, 11) follow. All five are single-page markup edits.

**Reach.** Outreach goes last, because every target needs something worth linking to. The LLMday request (15) and the podcast pitches (16) both point at the talk summary from action 7. The correction requests (13) are the one exception: they need no site change.

## Conflicts and dedupe log

**Merged findings**

- CR-1 and A-1 are the same gallery defect, merged into action 4.
- CR-4 and feature 3 are merged into action 17. The code review rated it Low and the feature report rated it Medium. Medium was kept, because the iframe also widens the gap between the consent banner and the privacy page.
- CR-5, A-3, and the content row for `index.html:266` are merged into action 20.
- CR-2 and CR-3 stay separate (actions 18 and 19) because their effort differs. W-8 hands off to both, and is credited on 19.
- CR-8 and A-2 are merged into action 24.
- A-4, A-5, and their content-polisher duplicates are merged into action 22.

**Web-authority hand-offs**

- W-1 handed off to backlink B-3 and also matches feature 1. Merged into action 6. Feature 1 rated Impact H, while B-3 and W-1 rated M. M was kept, as two of three sources agree.
- W-2 handed off to SEO S-4. Merged into action 5.
- W-3 absorbs the content-polisher accuracy flags at `guides.html:468` and `hobbies.html:241`. Merged into action 2.
- W-4 handed off to feature 4, B-1, and B-4. The asset is action 7, and the outreach is actions 15 and 16. Feature 4 rated M/M and W-4 rated H/M. W-4's rating was kept, because the merged action also deepens the pillar guide.
- W-5 handed off to B-2 and is merged with W-6 into action 13.
- W-7 handed off to SEO S-13 and is merged into action 3, since both are `llms.txt` edits.

**Rating splits and assignments**

- Every web-authority Leverage field stated both Impact and Effort, so those halves were used directly.
- The content-polisher and code-review formats carry no Impact/Effort letters. Letters were assigned here against the shared anchors for actions 1, 3, 12, 14, 18, 21, 23, and 25. Action 4 took A-1's letters.

**Severity re-ratings**

- B-1 and B-4 (High in the backlink report) and W-1 and W-2 (High in the web-authority report) are rated Medium here. They are opportunities, not current harms, and the roadmap reserves High for things that mislead a reader today.

**Ordering**

- You asked for severity order, and the roadmap skill asks for phase sequencing. Both are kept: the table is in severity order, and the execution order above gives the sequence.

**Records**

- **Stale reports:** none were skipped. `assets/markdown/` held no dated reports before today. The two undated reference documents (`animations_report.md`, `architecture.md`) are not specialist reports and were not read as inputs.
- **Policy checks:** no report recommended unblocking the `robots.txt` training-bot stanza, or adding `privacy.html` or `404.html` to `sitemap.xml`, so nothing was dropped for those reasons.
- **Deferred past the 25-action limit:** A-6 (heading colons), A-7 (collapse the cybersecurity skills list), A-8 (all-caps "AFTER"), S-5, S-6, S-7, S-8, S-9, S-10 (streaming description in `tech_takes.html:199` and `feed.xml:40`), S-11, S-12 (insecure AutoDrive link), feature 5 (level filter), B-5 (dev.to syndication), B-6 (computer vision diagram), B-7 (Austin OWASP), B-8 (Wikimedia Commons), and W-9 (KAN benchmark).

## Open questions

- **Do the press mentions link back, and to which page?** Visit each URL in `press_mentions.csv`. Action 13 adds a column to record it.
- **Does LLMday keep speaker or recap pages?** Check <https://llmday.com>. If it does not, action 15 drops to Low.
- **Which pages earn search impressions?** Check Search Console under Performance, then Pages. If the guides outperform the stances, S-6 (question-form guide headings) should move into the table.
- **What is the site's real backlink profile?** Check Search Console's Links report. No report could measure it.
- **Is `http://autodrive.tamu.edu/autodrive-old/team.html` (`index.html:1836`) still live?** Open it in a browser before deciding S-12.
- **Does the "80% of cyberattacks" figure (`tech_takes.html:785`) have a primary source?** If not, action 5 becomes a rewrite rather than a relink.
