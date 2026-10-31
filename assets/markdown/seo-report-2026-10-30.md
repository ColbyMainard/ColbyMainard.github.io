# SEO Audit

Last Updated: 2026-10-30

Prior reports found in `assets/markdown/`: today's code review, accessibility, content, and feature reports. Overlaps with them are noted.

No ranking, impression, or traffic figure appears below, because this audit cannot reach Search Console or analytics. Where a real number would change a priority, the item is listed under Open questions.

**Severity scale:** High means the page is misrepresented to search or loses a primary query. Medium means a clear gap on one page. Low means polish.

## Findings (most severe first)

| # | Severity | Page and line | Element | Current | Suggested | Impact | Effort | Why |
| - | -------- | ------------- | ------- | ------- | --------- | ------ | ------ | --- |
| S-1 | Medium | `assets/html/tech_resources.html`, head (JSON-LD between lines 62 and 222) | Structured data | A `BreadcrumbList` and four `ItemList` blocks. Unlike `guides.html` (lines 81-94) and `tech_takes.html` (the `Blog` node), there is no page-level node naming the author or carrying `dateModified`. The visible "Last Updated" at line 268 has no machine-readable twin. | Add a `CollectionPage` block copied from `guides.html:81-94`, with `dateModified: "2026-10-29"` and `author`/`publisher` set to the `#person` `@id` plus `name`. Do not touch the 104 book-author `Person` nodes. | M | L | Ties the curated list to Colby as its author, which is the page's main E-E-A-T claim. It is also the only indexable page without a freshness date in its structured data. |
| S-2 | Medium | `assets/html/hobbies.html:128-129` | Intro copy | The `<h1>` is followed directly by an image. There is no text until the Quantum Computing section. | Add one or two sentences in your own words under the `<h1>`, naming the four hobbies and the CC BY photo license. | M | L | The meta description promises "historical oddities worth knowing about", but no text near the top supports that. Search engines and AI answer engines both weight the opening text. |
| S-3 | Medium | `assets/html/tech_takes.html:5` (mirrored in og/twitter/linkedin titles in the same head) | Title tag | "Technical Stances on AI, Quantum &amp; Privacy \| Colby Mainard" | "Technical Stances on AI, Vibe Coding &amp; Privacy \| Colby Mainard" (about 60 characters) | M | L | The two newest and most search-relevant pieces, vibe coding and physical media, are absent from the title. Quantum is still covered by the H1 and the description. |
| S-4 | Medium | `assets/html/tech_takes.html:785, 797`; `assets/html/guides.html:741` | E-E-A-T citations | Statistics and quotes are sourced to secondary aggregators: `nikolaroza.com` (the "80% unpatched" figure), `aboutmyinfo.org` (the "87% of the US population" figure), and a personal blog for the John Woods quote. | Link each claim to its primary source. The 87% figure comes from Latanya Sweeney's 2000 Carnegie Mellon study, "Simple Demographics Often Identify People Uniquely". | M | L | Primary citations are a trust signal to readers and to quality raters. This overlaps the web-authority report, so the roadmap should merge them. |
| S-5 | Low | `assets/html/guides.html:115-236` | Structured data | Seven `HowTo` blocks | Keep them, since they are valid, but do not add more expecting rich results: Google stopped showing HowTo rich results in 2023. Put that effort into question-form `<h3>` headings (see S-6). | L | L | Prevents effort on markup that no longer produces a search feature. |
| S-6 | Low | `assets/html/guides.html:470, 476, 541, 547` | Headings | "Data Velocity", "Batch vs Real-time", "Choosing Models", "Data Normalization Considerations" | Question form with a one-sentence direct answer underneath, for example "How much infrastructure does a data pipeline need?" | M | M | Question headings match "how do I" searches and give AI answer engines a self-contained passage to quote. None of these `<h3>` headings are mirrored in the feed. |
| S-7 | Low | `assets/html/guides.html:493, 569, 604, 647, 709` | Internal links | Five guides link to the same `#artificialIntelligenceResourcesDiv` with almost the same anchor ("my list of AI resources"). | Make each anchor topic-specific, for example "AI books that cover reinforcement learning". | L | L | Repeated identical anchors carry less context. This is minor, and the targets themselves are correct. |
| S-8 | Low | `index.html:8` (and lines 25, 33, 37) | Meta description | About 160 characters. Ends with "...fintech, and medical imaging. M.S. in CS, Texas A&amp;M." | "Machine learning engineer specializing in computer vision, anti-money-laundering ML, and sports analytics. M.S. in Computer Science, Texas A&amp;M." | L | L | Leads with the current role (AML at RiskScout) rather than a 2020 class project, and stays under the truncation length. |
| S-9 | Low | `index.html:152-182` | Structured data | The `Event` node has no `image` or `eventStatus`. | Add `"eventStatus": "https://schema.org/EventScheduled"` and an `image` (the sharecard, or a slide thumbnail if feature 4 ships). | L | L | Both are recommended properties for Event results. |
| S-10 | Low | `assets/html/tech_takes.html:199` (mirrored at `feed.xml:40`) | Article description | "...a series of unforced errors that is slowly cannibalizing itself." | "...how a series of unforced errors is slowly cannibalizing streaming." | L | L | Fixes the agreement error in text that search engines and feed readers show directly. The feed `<updated>` and `CACHE_VERSION` follow the usual workflow. |
| S-11 | Low | `assets/html/tech_resources.html:104-165` | Structured data | The 65 `Book` items carry only `name` and `author`. | Add `isbn` to each `Book` node, starting with the most-recommended titles. | L | M | Disambiguates editions and lets search engines connect the list to the books themselves. |
| S-12 | Low | `index.html:1836` | Outbound link | `http://autodrive.tamu.edu/autodrive-old/team.html` | Check that the page still exists, then switch to `https://` or to the team's current page. | L | L | An insecure, possibly stale link on the landing page is a small quality signal. |
| S-13 | Low | `llms.txt` (the Pages list and the Key facts list) | Machine-readable summary | The "Technical Stances Atom feed" label omits the guides, which the feed also carries. The education line says "Masters in Computer Science". | Rename the label to "Technical Stances and Guides Atom feed", and match the degree wording to `index.html` once content suggestion 1 lands. | L | L | `llms.txt` is described as the authoritative summary for AI crawlers, so it should match the page exactly. |

## Site-wide technical checklist

| Item | Status | Action |
| ---- | ------ | ------ |
| Sitemap accuracy | OK | Five indexable pages are listed, and each `lastmod` matches its page. `privacy.html` and `404.html` are correctly absent because they are `noindex`. |
| Canonical tags | OK | All five indexable pages declare a canonical URL. |
| Crawlability | OK | The `robots.txt` blocked training-bot stanza is deliberate policy and stays. `Disallow: /assets/markdown/` stays. |
| Structured-data validity | OK, with gaps | All blocks parse. The `#person` `@id` holds on all 46 nodes, and the `tech_resources.html` authors are correctly left without it. Gaps: S-1, S-9, S-11. |
| Page speed | Needs work on one page | `hobbies.html` lazy-loads its hero image and serves 3.5 to 5 MB originals. Handed off to code review CR-2 and CR-3. |
| Manifest | OK | Injected at runtime, not hardcoded. |

## Open questions

- Which pages and queries actually earn impressions? Check Search Console under Performance, then Pages. If the guides earn more than the stances, S-6 should move up.
- Does Google index the section fragments (`#...Div`) as separate results? Check Search Console under URL Inspection on a stance URL.
