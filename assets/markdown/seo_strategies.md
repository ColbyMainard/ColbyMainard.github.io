# SEO Strategy Plan — colbymainard.github.io

**Audience:** Someone relatively new to SEO  
**Scope:** Personal portfolio/professional website hosted on GitHub Pages  
**Date:** 2026-05-20

---

## What Is SEO and Why Does It Matter Here?

Search Engine Optimization (SEO) is the practice of making your website more discoverable through both search engines (Google, Bing, DuckDuckGo) and, increasingly, AI assistants (ChatGPT Search, Perplexity, Claude). For a personal professional site, good SEO means the right people — recruiters, potential collaborators, fellow engineers — find you when they search for terms relevant to your background.

SEO falls into two broad camps:

- **Traditional SEO**: Optimizing for search engine crawlers that index pages and rank them in search results.
- **AI-Based Optimization (AEO / GEO)**: Optimizing for AI assistants that read your pages to answer user queries directly. This is sometimes called Answer Engine Optimization (AEO) or Generative Engine Optimization (GEO).

Both matter and they often overlap. What follows is a strategy-by-strategy breakdown.

---

## Current State Summary

Before diving into strategies, here is a quick audit of what is already done well on this site:

**Strengths already in place:**
- Descriptive `<title>` tag and `<meta name="description">` on `index.html`
- Canonical URL tag (`<link rel="canonical">`)
- Open Graph (`og:`) tags for social/link previews
- `sitemap.xml` with all pages listed
- `robots.txt` that deliberately allows live-search AI bots while blocking training scrapers
- `llms.txt` providing a structured plain-text summary for AI assistants
- Google Search Console and Bing Webmaster Tools verification tags in the HTML
- JSON-LD structured data blocks (Person, WebSite, WebPage schemas)
- Mobile viewport meta tag

**Gaps to address:**
- Sub-pages (`tech_takes.html`, `tech_resources.html`, `hobbies.html`) have minimal or inconsistent meta tags
- No Twitter/X Card meta tags
- Page load performance and Core Web Vitals are unmeasured
- Internal linking strategy is informal
- No structured data for individual content sections (articles, how-to, FAQ)
- Image `alt` attributes may be incomplete
- No backlink or off-site presence strategy

---

## Strategy 1: On-Page Meta Tags (Traditional SEO)

### What This Is

Every HTML page should tell search engines what it is about through `<meta>` tags in the `<head>`. The most important are the `<title>` (shown as the blue link in Google results) and `<meta name="description">` (shown as the gray text below it). Sub-pages on this site are currently underserving this.

### Changes to Make

1. Open each sub-page HTML file (`tech_takes.html`, `tech_resources.html`, `hobbies.html`, `privacy.html`).
2. Verify or add a unique `<title>` tag for each — aim for 50–60 characters, include your name and the page topic. Example:
   ```html
   <title>Technical Opinions — AI, Crypto, Quantum | Colby Mainard</title>
   ```
3. Add or improve `<meta name="description">` for each page — aim for 120–155 characters, summarize the page content using natural language that a recruiter or peer might search. Example:
   ```html
   <meta name="description" content="Colby Mainard's technical stances on Kolmogorov-Arnold Networks, cryptocurrency, quantum computing, AGI, and privacy — an ML Engineer's perspective.">
   ```
4. Add `<link rel="canonical" href="https://colbymainard.github.io/assets/html/PAGE.html">` to each sub-page.
5. Add Open Graph tags to each sub-page (copy the pattern from `index.html` and update the URL, title, and description values).
6. Add Twitter/X Card meta tags to every page:
   ```html
   <meta name="twitter:card" content="summary">
   <meta name="twitter:title" content="PAGE TITLE">
   <meta name="twitter:description" content="PAGE DESCRIPTION">
   <meta name="twitter:image" content="https://colbymainard.github.io/assets/images/favicon.png">
   ```

### Pros
- Free to implement; requires only HTML editing.
- Direct impact on click-through rate from search results.
- Fixes a gap that most personal sites ignore, giving a competitive edge.
- Social media link previews become usable, which helps when sharing links with recruiters.

### Cons
- Entirely manual — requires keeping descriptions updated whenever page content changes.
- Results take days to weeks to appear as Google re-crawls the pages.
- Cannot guarantee which description Google will actually display; it sometimes writes its own.

---

## Strategy 2: Structured Data / JSON-LD (Traditional + AI SEO)

### What This Is

Structured data is machine-readable markup embedded in your HTML that describes entities on the page — a Person, an Article, a HowTo, a FAQ. Google uses it for "rich results" (enhanced search listings with ratings, images, etc.). AI assistants use it to confidently extract facts about you without having to guess from prose.

The `index.html` already has a Person schema and a WebSite schema. The sub-pages and some content sections on the main page need expansion.

### Changes to Make

1. **`tech_takes.html`**: Add an `Article` schema for each opinion piece, or at minimum a `Blog` schema:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "Blog",
     "name": "Technical Opinions — Colby Mainard",
     "url": "https://colbymainard.github.io/assets/html/tech_takes.html",
     "author": { "@type": "Person", "name": "Colby Mainard" },
     "description": "Long-form technical opinions on KANs, AGI, quantum computing, and more."
   }
   </script>
   ```
2. **`tech_resources.html`**: Add an `ItemList` schema that names and links each resource category (Cybersecurity, AI/ML, Python, etc.).
3. **`index.html` — Education**: Add `Course` schemas for each listed graduate course to make them machine-readable.
4. **`index.html` — Skills**: Add a `DefinedTermSet` or supplement the existing Person schema with a `knowsAbout` array listing your key technologies.
5. **All pages**: Add a `BreadcrumbList` schema to clarify the site hierarchy to crawlers.

### Pros
- Eligible for Google Rich Results (can appear with enhanced visual formatting in search).
- Strong signal to AI assistants — structured data is the most reliable way for them to extract accurate facts about you.
- Once templates are written, adding new content is just copying and updating a JSON block.
- Completely free.

### Cons
- JSON-LD can be verbose and introduces a maintenance burden — if your content changes but the schema does not, the data becomes stale and misleading.
- Not all schema types produce visible rich results; some only help with indexing quality.
- Mistakes in schema markup (a missing comma, a wrong type name) can silently fail — use Google's Rich Results Test tool to validate.

---

## Strategy 3: Core Web Vitals and Page Performance (Traditional SEO)

### What This Is

Google's ranking algorithm includes "Core Web Vitals" — three measurements of page loading and interaction experience:
- **LCP (Largest Contentful Paint)**: How long until the main content is visible. Target: under 2.5 seconds.
- **CLS (Cumulative Layout Shift)**: How much the page jumps around while loading. Target: under 0.1.
- **INP (Interaction to Next Paint)**: How quickly the page responds to clicks/taps. Target: under 200ms.

A slow or jittery page is penalized in rankings. For a static GitHub Pages site, scores are usually good but worth verifying.

### Changes to Make

1. **Measure first**: Run the site through [PageSpeed Insights](https://pagespeed.web.dev/) (Google's free tool — paste the URL and click Analyze). Note the scores for both Mobile and Desktop.
2. **Image optimization**: Ensure all images in `assets/images/` are compressed (use tools like `squoosh.app` or `imagemagick`). Convert large images to WebP format where possible for ~30% smaller file sizes.
3. **Add `width` and `height` attributes** to every `<img>` tag in the HTML. This prevents layout shift (CLS) because the browser reserves space before the image loads.
4. **Audit JavaScript**: Any `<script>` tags that block rendering should use `defer` or `async` attributes:
   ```html
   <script src="assets/js/animations.js" defer></script>
   ```
5. **Font loading**: If using web fonts, add `font-display: swap` in the CSS to prevent invisible text during font loading.
6. **Re-measure**: Run PageSpeed Insights again after changes to confirm improvement.

### Pros
- Faster pages rank higher and also improve user experience — a real win-win.
- Mobile performance matters especially since many recruiters browse on phones.
- Fixes accumulate permanently; you generally do not need to redo this work.

### Cons
- Investigating and fixing performance issues can require significant effort, especially for JavaScript-heavy pages.
- GitHub Pages CDN performance varies by region and is outside your control.
- Core Web Vitals are only one ranking factor among hundreds — improvements here may not produce noticeable ranking changes on a low-traffic personal site.

---

## Strategy 4: Internal Linking and Site Architecture (Traditional SEO)

### What This Is

Internal links are links from one page on your site to another. Search engines follow these links to discover content and use them to understand which pages are most important. A site where every page is reachable from the home page and from other relevant pages gets crawled more thoroughly than one where some pages are "orphans."

### Changes to Make

1. **Audit orphan pages**: Confirm that `tech_takes.html`, `tech_resources.html`, and `hobbies.html` are all linked from `index.html` (the navigation header). They should already be — verify each link is a standard `<a href="...">` tag (not JavaScript-generated, which some crawlers miss).
2. **Add contextual cross-links**: Within the body text of pages, add relevant cross-links. For example:
   - On `hobbies.html`, mention "quantum computing" and link to the quantum computing section of `tech_takes.html`.
   - On `tech_resources.html`, link to relevant content in `tech_takes.html` where topics overlap.
3. **Descriptive anchor text**: When linking, use descriptive text instead of "click here." Example: `<a href="tech_resources.html">curated AI/ML reading list</a>` — the anchor text tells search engines what the linked page is about.
4. **Link from the resume to projects**: If project descriptions in `index.html` can link to more detail (even if just the resources page), add those links.
5. **Update `sitemap.xml`**: Whenever a new page is added, add it to `sitemap.xml` with an accurate `<lastmod>` date.

### Pros
- Entirely free and low-effort once understood.
- Helps search engines discover and re-discover all your content.
- Meaningful anchor text is a direct ranking signal for the linked page.
- Improves human navigation too — users who land on one page can easily find related content.

### Cons
- Over-linking (adding links purely for SEO with no value to readers) is a spam signal and can backfire.
- The benefit is most visible on larger sites; a five-page portfolio sees more modest gains.
- Requires manual updates as content evolves.

---

## Strategy 5: Keyword Research and Content Alignment (Traditional SEO)

### What This Is

Keywords are the terms people type into search engines. "Keyword research" means figuring out what terms your target audience actually uses, and then making sure your pages use those terms naturally. For a professional portfolio, the goal is to appear when recruiters or collaborators search for your specializations.

### Changes to Make

1. **Define your target queries** — what would you want someone to find you by? Examples relevant to this site:
   - `machine learning engineer portfolio`
   - `computer vision engineer Texas A&M`
   - `AI engineer sports analytics`
   - `deep learning engineer resume`
   - `Kolmogorov-Arnold Networks explained`
2. **Use free tools** to validate search volume: Google Search Console (shows queries that already bring traffic to your site), and Google Trends for topic comparisons.
3. **Audit page content for natural keyword usage**:
   - The `<h1>` on each page should reflect the most important term for that page.
   - The first paragraph of body content on each page should naturally include 1–2 of the target terms.
   - Avoid "keyword stuffing" — if it reads awkwardly, it will hurt rankings.
4. **The `<meta name="keywords">` tag**: Note that this tag (`index.html` has one) is effectively ignored by Google and Bing as a ranking signal. It can be kept for documentary purposes but should not be relied upon.
5. **Long-tail keywords for opinion pieces**: Articles on `tech_takes.html` are an opportunity to rank for specific queries like "are KANs better than MLPs" or "quantum computing timeline prediction." Use the article titles and first paragraphs to include the natural phrasing someone might search.

### Pros
- Aligning your actual content with how your audience searches is the foundation of all effective SEO.
- The `tech_takes.html` opinion pieces have high potential — long-form, original content on specific topics often ranks well.
- Google Search Console is free and provides real data about your current performance.

### Cons
- Keyword trends change over time — "machine learning" and "AI" have shifted significantly in the past three years.
- A personal site competes with high-authority sites (LinkedIn, GitHub, university pages) for most professional terms; ranking on page 1 for competitive terms is difficult.
- Requires periodic revisiting, not a one-time fix.

---

## Strategy 6: Image Alt Text and Accessibility (Traditional SEO + Accessibility)

### What This Is

Every `<img>` tag should have an `alt` attribute that describes what the image shows. Search engines cannot "see" images — they rely on `alt` text to understand what an image depicts. Google Images search is also driven entirely by `alt` text and surrounding context. Additionally, screen readers for visually impaired users read `alt` text aloud.

### Changes to Make

1. Locate all `<img>` tags across all HTML files:
   ```bash
   grep -n '<img' assets/html/*.html index.html
   ```
2. For every image that conveys meaningful content, write a descriptive `alt` attribute:
   ```html
   <img src="assets/images/headshot.jpg" alt="Colby Mainard, Machine Learning Engineer">
   ```
3. For purely decorative images (dividers, backgrounds), use an empty `alt=""` — this tells screen readers to skip it:
   ```html
   <img src="assets/images/divider.png" alt="">
   ```
4. Include relevant keywords in `alt` text where natural, but describe the image first and optimize second.

### Pros
- Directly improves Google Images visibility.
- Makes the site compliant with WCAG accessibility guidelines — this also matters for the professional image the site projects.
- A quick win: each image takes about 30 seconds to fix.

### Cons
- Impact on general search rankings is modest unless the site has many images.
- Cannot be automatically validated without a manual pass through each page.

---

## Strategy 7: llms.txt and AI Discoverability (AI-Based SEO)

### What This Is

`llms.txt` is an emerging standard (proposed 2024) for helping AI assistants understand your site. It is a plain-text file placed at the root of your site that gives AI systems a structured summary of who you are, what the site contains, and where to find information — analogous to `robots.txt` but for AI comprehension rather than crawl permissions.

This site already has an `llms.txt` at the root. The strategy here is to maintain and expand it over time.

### Changes to Make

1. **Keep `llms.txt` current**: Every time a new page is added, a major section is updated, or a new job/project is added to the resume, update the corresponding section in `llms.txt`.
2. **Add section anchors**: For each page entry, consider adding direct anchor links to major sections (e.g., `#work-history`, `#education`) so AI assistants can send users to the right location on a page, not just the page itself.
3. **Add a "Last updated" date** near the top of `llms.txt` so AI assistants and crawlers know how fresh the information is.
4. **Consider a `llms-full.txt`**: Some sites offer a `llms.txt` (summary/index) and a `llms-full.txt` (complete prose version of the site content). A full version lets AI assistants answer detailed questions without needing to fetch individual pages. Especially useful for the resume content on `index.html`.
5. **Verify the `robots.txt` live-search allowlist** remains accurate: confirm that any new legitimate AI search bots (as the landscape evolves) are added to the allowed list.

### Pros
- Directly targets the growing share of information queries that start with an AI assistant rather than a search engine.
- Recruiters and technical audiences increasingly use Perplexity, ChatGPT Search, and similar tools — being well-represented there is high-value.
- The site already has foundational pieces in place; this is an incremental maintenance task.
- The `llms.txt` standard is gaining traction and being recognized by major AI platforms.

### Cons
- The standard is not yet universally adopted — some AI systems ignore it entirely.
- There is no equivalent to Google Search Console for AI-sourced traffic; it is hard to measure the impact.
- Keeping two sets of content (the HTML pages and the `llms.txt` descriptions) in sync requires discipline.

---

## Strategy 8: Off-Site Presence and Backlinks (Traditional SEO)

### What This Is

Search engines use "backlinks" (other websites linking to yours) as a major trust signal. A link from a reputable site (GitHub, a university page, a published paper) tells Google your site is credible. For a personal portfolio, this is about ensuring your professional profiles link to your site and that your published work is findable.

### Changes to Make

1. **LinkedIn profile**: Ensure `https://colbymainard.github.io` is listed in the "Website" field of your LinkedIn profile. LinkedIn has high domain authority; a link from there is a meaningful signal.
2. **GitHub profile README**: Add a link to the portfolio site in your GitHub `README.md` (the profile page, not just individual repos). GitHub is indexed by Google and is high-authority.
3. **Published work or contributions**: If any past work, papers, or open-source contributions can reference the personal site, add that link where permissible.
4. **Email signature**: Including the portfolio URL in professional emails is low-key but keeps the link in circulation.
5. **Texas A&M alumni or departmental pages**: If the university maintains alumni directories or project pages, see if your profile can link to the site.

### Pros
- Backlinks from authoritative domains (GitHub, LinkedIn, .edu) are among the strongest ranking signals in Google's algorithm.
- Many of these are a one-time setup with lasting benefit.
- Helps establish the site as the canonical representation of your professional identity online.

### Cons
- You cannot directly control whether others link to you.
- For a personal portfolio, link-building campaigns used by commercial sites are overkill and inappropriate.
- Impact grows slowly over time as Google recrawls linking pages.
- Link schemes (e.g., buying links or trading links artificially) violate Google's guidelines and can result in penalties.

---

## Strategy 9: Content Freshness and Regular Updates (Traditional + AI SEO)

### What This Is

Search engines favor sites that are updated regularly. This signals that the content is maintained and current. For a portfolio site, this means keeping work history, projects, and opinion content up to date — not adding filler content just for the sake of it.

### Changes to Make

1. **Update `sitemap.xml` `<lastmod>` dates** whenever a page is substantively changed. Currently some dates may be stale.
2. **Work history and projects**: When you change jobs, add projects, or earn certifications, update `index.html` promptly. These are the most likely sections for a recruiter to land on.
3. **Technical opinions**: The `tech_takes.html` pieces are the highest-value content for search discovery. Adding one new piece per quarter — even 500 words on a topic you have a genuine opinion on — keeps the page fresh and creates new opportunities to rank for specific queries.
4. **`llms.txt` update date**: Add and maintain a `Last updated:` line at the top.
5. **Review `changefreq` in `sitemap.xml`**: Currently `index.html` is set to `monthly` and `hobbies.html` to `quarterly`. Adjust these to honestly reflect how often each page is actually updated. Inaccurate values train crawlers to ignore the `changefreq` signal.

### Pros
- Fresh content is a consistent ranking signal across all search engines.
- Adding new opinion pieces creates compounding SEO value — each article is a new entry point into the site.
- Reflects well professionally: a portfolio that shows recent activity looks more active than one last updated two years ago.

### Cons
- Requires consistent investment of time; a blog that goes 18 months without updates can hurt as much as it helps.
- "Content for SEO's sake" is easy to spot and produces poor user experience — focus on genuine updates.
- On a static site, adding structured content (like a proper blog with pagination and feeds) would require more infrastructure than simple HTML files.

---

## Strategy 10: Technical SEO Hygiene (Traditional SEO)

### What This Is

A catch-all for smaller technical correctness items that collectively matter for how well search engines can crawl, index, and rank the site.

### Changes to Make

1. **Check for broken links**: Periodically run a link checker (e.g., the free `linkchecker` CLI tool: `linkchecker https://colbymainard.github.io`) to find any `<a href>` links that return 404.
2. **Verify HTTPS**: GitHub Pages serves over HTTPS by default. Confirm all internal links use `https://` and not `http://` to avoid mixed-content warnings.
3. **Validate HTML**: Use the W3C Markup Validator (`validator.w3.org`) to check for structural HTML errors that might confuse crawlers.
4. **Check robots.txt is not accidentally blocking anything**: Run `https://colbymainard.github.io/robots.txt` through Google Search Console's robots.txt tester to confirm no unintended blocks.
5. **Verify Google Search Console is active**: The verification meta tag is already in `index.html`. Log into Google Search Console, confirm the property is verified, review the Coverage report for any crawl errors, and submit the sitemap URL if not already done.
6. **Bing Webmaster Tools**: The Bing verification tag is also in `index.html`. Verify the property in Bing Webmaster Tools and submit the sitemap there as well — Bing powers many AI search features and DuckDuckGo.

### Pros
- Prevents invisible technical issues from silently suppressing rankings.
- Search Console and Bing Webmaster Tools are free and provide direct data about how search engines see your site.
- Most of these are one-time setup tasks with minimal ongoing cost.

### Cons
- The payoff is mostly preventative — fixing these does not usually cause a sudden ranking improvement, but neglecting them can cause ranking drops.
- `linkchecker` can produce false positives for pages that block bots (it makes real HTTP requests).

---

## Priority Ordering for Implementation

If you are new to SEO and want to know where to start, here is a suggested order from highest-to-lowest priority:

| Priority | Strategy | Effort | Expected Impact |
|---|---|---|---|
| 1 | Meta tags on sub-pages (Strategy 1) | Low | Medium — fixes a clear gap |
| 2 | Verify Google Search Console + submit sitemap (Strategy 10) | Very low | High — enables all other measurement |
| 3 | Image alt text audit (Strategy 6) | Low | Low-Medium + accessibility |
| 4 | LinkedIn + GitHub backlinks (Strategy 8) | Very low | Medium — one-time setup |
| 5 | Structured data on sub-pages (Strategy 2) | Medium | Medium for AI SEO |
| 6 | `llms.txt` maintenance habit (Strategy 7) | Low (ongoing) | Medium-High for AI SEO |
| 7 | Internal linking audit (Strategy 4) | Low | Low-Medium |
| 8 | PageSpeed / Core Web Vitals (Strategy 3) | Medium | Low-Medium for this site size |
| 9 | Keyword alignment audit (Strategy 5) | Medium | Medium — longer term |
| 10 | Regular content updates (Strategy 9) | High (ongoing) | High — compounds over time |

---

## Glossary for SEO Newcomers

- **Backlink**: A link from another website to yours. High-quality backlinks are one of the strongest ranking signals.
- **Canonical URL**: The definitive URL for a page, declared with `<link rel="canonical">` to prevent duplicate content penalties.
- **Core Web Vitals**: Google's measurements of page loading speed, visual stability, and interactivity.
- **Crawl**: The process by which search engine bots visit and read web pages to add them to their index.
- **Index**: The database a search engine maintains of all the pages it has crawled.
- **JSON-LD**: A format for embedding structured data in HTML using a `<script type="application/ld+json">` tag.
- **Keyword**: A word or phrase that users type into a search engine.
- **Rich Results**: Enhanced search listings that include images, ratings, or other visual elements, enabled by structured data.
- **Schema.org**: The shared vocabulary used to write structured data that search engines and AI assistants understand.
- **Sitemap**: An XML file listing all pages on a site, helping search engines discover and index them.
- **AEO/GEO**: Answer Engine Optimization / Generative Engine Optimization — newer terms for optimizing content to appear in AI assistant responses.
- **llms.txt**: An emerging standard for providing AI-readable summaries of a website's content and structure.
