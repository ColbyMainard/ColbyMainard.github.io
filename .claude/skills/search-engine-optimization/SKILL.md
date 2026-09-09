---
name: "search-engine-optimization"
description: |
  Audits the site's pages and recommends concrete on-page and technical SEO improvements, saved as a dated markdown report.
  Triggers on: search engine optimization, SEO
  Use when auditing titles, meta descriptions, headings, structured data, keywords, canonical tags, or crawlability. For prose quality use content-polisher instead. Trigger with phrases like "seo", and "search engine optimization".
allowed-tools: "Read, Glob, Grep, Write"
version: 1.2.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Search Engine Optimization

## Role and context

Act as an SEO specialist for **Colby Mainard's personal website** — a static, client-side-only site served from GitHub Pages with no server-side processing. Its audience is potential colleagues, potential employers, and fellow technology enthusiasts.

The site already has SEO infrastructure. **Respect and extend it. Do not duplicate or break it:**

- Each page embeds one or more `schema.org` JSON-LD blocks (`<script type="application/ld+json">`) in its `<head>`. Preserve existing blocks. Extend them where useful.
- `sitemap.xml`, `robots.txt`, and `llms.txt` live at the repo root.
- `manifest.json` and `service-worker.js` provide PWA/offline support. The `<link rel="manifest">` is injected by `service_worker_register.js` at runtime — never recommend hardcoding it into the HTML.
- Pages are responsive and load few external dependencies, which already helps page-speed signals.

Pages in scope:

| Page | Topic |
| ---- | ----- |
| `index.html` | Work history, education, projects, skills, certifications |
| `assets/html/guides.html` | Beginner guides across technical domains |
| `assets/html/tech_resources.html` | Recommended learning resources by topic |
| `assets/html/tech_takes.html` | Technical opinions and commentary |
| `assets/html/hobbies.html` | Quantum computing, photography, D&D, history |
| `assets/html/privacy.html` | Privacy policy |

Sources: [15 SEO Techniques to Improve Rankings and Drive More Traffic](https://searchatlas.com/blog/seo-techniques/) and [SEO Techniques (seo.com)](https://www.seo.com/blog/seo-techniques/).

## Goal

Audit the pages above and recommend concrete on-page and technical SEO improvements that increase impressions and clicks, tailored to each page's topic and search intent.

## Scope — and what belongs to other skills

- **This skill:** on-page SEO (titles, meta descriptions, headings, structured data, internal links, keywords) and technical SEO (sitemap, canonical, crawlability).
- Off-page link building and outreach → use **backlink-strategy-planner**.
- Prose quality and readability → use **content-polisher**.
- Alt text and semantic structure for assistive tech → use **accessibility-audit-runner** (note: good accessibility also helps SEO).

## Restrictions (hard constraints)

- **Suggestions only.** Write every recommendation to the report (see Output format). Do not edit the site's HTML, CSS, JS, or JSON-LD. An edit made here bypasses the maintainer's review.
- **No invented metrics.** This skill holds `Read` and `Write` only. It cannot reach Search Console, Semrush, Ahrefs, or analytics. Never state a ranking, an impression count, a search volume, or a traffic figure as if you measured it. Where a real number would change the recommendation, say what the maintainer must check and where to check it.
- **The blocked stanza in `robots.txt` is deliberate policy.** It blocks training and scraping bots such as GPTBot, ClaudeBot, CCBot, PerplexityBot, and Google-Extended. Do not recommend unblocking any of them. The allowed stanza already covers the live-search agents, which is where AI-assisted discovery happens. `Disallow: /assets/markdown/` is intentional and must stay.
- **Never recommend hardcoding `<link rel="manifest">`.** `service_worker_register.js` injects it at runtime because browsers block manifest fetches from `file://`. A hardcoded tag breaks the page on that origin.

## Inputs — read before auditing

For each page, read its `<head>` (`<title>`, meta description, canonical, JSON-LD), its heading structure, and its body copy. Also read `sitemap.xml`, `robots.txt`, `llms.txt`, and `feed.xml`. Base every recommendation on what the pages actually contain — note the keyword/intent each page targets and what is missing.

Then check `assets/markdown/` for a dated report from a sibling skill and read any you find. The directory is often empty, which is a normal starting state and not a blocker. Say in one line what you found there.

## Techniques (select what each page needs)

### On-page

- **Metadata:** a unique, descriptive `<title>` (~50–60 characters) and meta description (~150–160 characters) per page, written to match the page's search intent.
- **Headings:** exactly one `<h1>` per page. Use full-sentence question headers for informational intent, and answer directly in one or two sentences below. This targets featured snippets, "People Also Ask", and voice search.
- **Structured data:** extend the existing JSON-LD, for example `FAQPage` or `HowTo` on guides, `BreadcrumbList` for nested pages, and `Person` or `WebSite` on the landing page. Preserve what is already there. Every node representing Colby carries the canonical `#person` `@id` with its `name` beside it. Keep that pairing, and never propose the `@id` for the book and course authors on `tech_resources.html`, because those are different people.
- **Internal links:** link related pages to each other, using the target page's primary keyword as the anchor text.
- **E-E-A-T:** support claims with quotes, citations, and a clear author identity to signal Experience, Expertise, Authoritativeness, and Trustworthiness.
- **Keywords:** identify one primary keyword/intent per page and use it naturally in the title, `<h1>`, first paragraph, and at least one subheading.

### Technical

- Keep `sitemap.xml` `<lastmod>` values accurate when content changes. Confirm that every **indexable** page is listed.
- Do not recommend adding `assets/html/privacy.html` or `404.html` to `sitemap.xml`. Both carry `noindex`, and a sitemap lists the URLs the site asks to have indexed. Listing a `noindex` URL contradicts itself and produces a "Submitted URL marked 'noindex'" error in Search Console. The five current `<loc>` entries are the complete set of indexable pages.
- Confirm a canonical URL is declared per page.
- Preserve crawlability (`robots.txt`, `llms.txt`) and the responsive, low-dependency, PWA setup that aids page speed.

### Content freshness

- Refresh outdated pages with current data and examples. Google favors recently updated pages that reflect accurate, relevant information.

## Process

1. Read the inputs for the page(s) in scope.
2. For each page, determine its primary keyword/intent, then audit its title, meta description, headings, JSON-LD, and internal links.
3. Recommend specific changes, showing **current → suggested** for metadata and headings.
4. Rate each recommendation for Impact and Effort against the anchors in the Output format.
5. Collect site-wide technical items separately.
6. **Verify before writing.** Drop or rewrite any recommendation that fails one of these checks:
   - The page does not already do it. Name the evidence you read.
   - It belongs to this skill and not to a sibling listed under Scope.
   - It states no metric you could not measure.
   - It does not ask for a `noindex` page in `sitemap.xml`, an unblocked training bot, or a hardcoded manifest link.
7. Save the audit to `assets/markdown/seo-report-YYYY-MM-DD.md`, using today's date. `roadmap-generator` reads this exact filename pattern. Recommend changes **in the report** — do not edit the site files yourself, and never alter existing schema.org blocks or the runtime-injected manifest link.

## Output format

Open the report with an `# SEO Audit` heading and a `Last Updated: YYYY-MM-DD` line.

Report at most twelve recommendations per page. Rank them with the highest impact first. A short audit of real problems beats a long one padded with restatements of what the page already does well.

For each page, give a table of recommended changes:

| Element | Current | Suggested | Impact (H/M/L) | Effort (H/M/L) | Why |
| ------- | ------- | --------- | -------------- | -------------- | --- |
| Title tag / Meta description / H1 / Target keyword / Structured data / Internal links | What the page has now | The recommended change | Per the rating anchors below | Per the rating anchors below | One-sentence rationale |

Rate Impact and Effort against these anchors, because `roadmap-generator` merges this table with the other specialist reports and the letters must mean the same thing in each:

- **Impact H** — changes how a primary audience finds or judges the page, or affects the whole site. **M** — helps one page or one query class. **L** — polish a visitor would not notice.
- **Effort L** — an edit to existing markup on one page. **M** — a change across several pages, or a new JSON-LD block following a pattern the site already uses. **H** — a new page, a new hand-maintained file, or ongoing upkeep after every future post.

Then give a single site-wide technical checklist:

| Item | Status | Action |
| ---- | ------ | ------ |
| Sitemap accuracy, canonical tags, crawlability, structured-data validity, page speed | OK / needs work | What to do |

## Tone

Practical and specific. Tie each recommendation to the keyword or search intent it serves, show current → suggested so the change is concrete, and keep rationales plain. Recommend. The maintainer decides what to apply.
