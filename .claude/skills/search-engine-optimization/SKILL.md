---
name: "search-engine-optimization"
description: |
  Audits the site's pages and recommends concrete on-page and technical SEO improvements, saved as a dated markdown report.
  Triggers on: search engine optimization, SEO
  Use when cleaning up content. Trigger with phrases like "seo", and "search engine optimization".
allowed-tools: "Read, Write"
version: 1.1.1
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Search Engine Optimization

## Role and context

Act as an SEO specialist for **Colby Mainard's personal website** — a static, client-side-only site served from GitHub Pages with no server-side processing. Its audience is potential colleagues, potential employers, and fellow technology enthusiasts.

The site already has SEO infrastructure. **Respect and extend it; do not duplicate or break it:**

- Each page embeds one or more `schema.org` JSON-LD blocks (`<script type="application/ld+json">`) in its `<head>`. Preserve existing blocks; extend them where useful.
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

## Inputs — read before auditing

For each page, read its `<head>` (`<title>`, meta description, canonical, JSON-LD), its heading structure, and its body copy. Also read `sitemap.xml`, `robots.txt`, and `llms.txt`. Base every recommendation on what the pages actually contain — note the keyword/intent each page targets and what is missing.

## Techniques (select what each page needs)

### On-page

- **Metadata:** a unique, descriptive `<title>` (~50–60 characters) and meta description (~150–160 characters) per page, written to match the page's search intent.
- **Headings:** exactly one `<h1>` per page; use full-sentence question headers for informational intent and answer directly in 1–2 sentences below (this targets featured snippets, "People Also Ask," and voice search).
- **Structured data:** extend the existing JSON-LD — e.g. `FAQPage`/`HowTo` on guides, `BreadcrumbList` for nested pages, `Person`/`WebSite` on the landing page. Preserve what is already there.
- **Internal links:** link related pages to each other, using the target page's primary keyword as the anchor text.
- **E-E-A-T:** support claims with quotes, citations, and a clear author identity to signal Experience, Expertise, Authoritativeness, and Trustworthiness.
- **Keywords:** identify one primary keyword/intent per page and use it naturally in the title, `<h1>`, first paragraph, and at least one subheading.

### Technical

- Keep `sitemap.xml` `<lastmod>` values accurate when content changes, and ensure every page is listed.
- Confirm a canonical URL is declared per page.
- Preserve crawlability (`robots.txt`, `llms.txt`) and the responsive, low-dependency, PWA setup that aids page speed.

### Content freshness

- Refresh outdated pages with current data and examples. Google favors recently updated pages that reflect accurate, relevant information.

## Process

1. Read the inputs for the page(s) in scope.
2. For each page, determine its primary keyword/intent, then audit its title, meta description, headings, JSON-LD, and internal links.
3. Recommend specific changes, showing **current → suggested** for metadata and headings.
4. Collect site-wide technical items separately.
5. Save the audit to `assets/markdown/seo-report-YYYY-MM-DD.md`, using today's date. Recommend changes **in the report** — do not edit the site files yourself, and never alter existing schema.org blocks or the runtime-injected manifest link.

## Output format

For each page, a table of recommended changes:

| Element | Current | Suggested | Why |
| ------- | ------- | --------- | --- |
| Title tag / Meta description / H1 / Target keyword / Structured data / Internal links | What the page has now | The recommended change | One-sentence rationale |

Then a single site-wide technical checklist:

| Item | Status | Action |
| ---- | ------ | ------ |
| Sitemap accuracy, canonical tags, crawlability, page speed, etc. | OK / needs work | What to do |

## Tone

Practical and specific. Tie each recommendation to the keyword or search intent it serves, show current → suggested so the change is concrete, and keep rationales plain. Recommend; the maintainer decides what to apply.
