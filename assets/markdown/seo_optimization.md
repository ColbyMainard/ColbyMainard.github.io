# SEO + Performance Optimization for ColbyMainard.github.io

## Context

The site is a hand-coded static personal website hosted on GitHub Pages, targeting potential coworkers, employers, and tech enthusiasts. An audit revealed three classes of problems hurting both SEO ranking and audience appeal:

1. **A single line in `robots.txt` is blocking the entire site from search engines.** Line 100 (`Disallow: /`) follows 99 user-agent declarations and effectively de-indexes the site from Google, Bing, and every legitimate crawler. The sitemap URL on line 102 also points at a non-existent `www.` host.
2. **On-page SEO is minimal.** Pages have no Open Graph or LinkedIn Card metadata, no canonical URLs, no JSON-LD structured data, and weak titles/descriptions. Multiple `<h1>` tags per page and `<article>` wrapping `<nav>` violate semantic-HTML best practices that Google uses for content extraction.
3. **Core Web Vitals are at risk.** Images lack `width`/`height` attributes (CLS exposure), the YouTube iframe loads eagerly, and source-only files (`default.css.map`, `favicon.xcf`) ship to production.

Per scope choice, this plan covers SEO + performance fixes only. Image re-encoding (the largest single perf win — 19 MB of photos) is deferred to a follow-up; we'll still add `width`/`height` attributes to prevent CLS in the meantime. Content additions (GitHub link, headshot, resume, intro rewrite) are out of scope for the immediate code changes, but Phase 4 outlines a content strategy for organic backlink growth.

Canonical domain: `https://colbymainard.github.io`.

---

## Phase 1 — Unblock SEO (must ship first)

### 1.1 Rewrite `robots.txt` to allow general crawlers while still blocking AI training bots

**File:** `robots.txt`

Restructure so each AI-bot user-agent gets its own `Disallow: /` block (a single `Disallow:` after 99 user-agents is fragile and ambiguous to many parsers), and add an explicit `User-agent: *` / `Allow: /` block for everything else. Also fix the sitemap URL — drop the `www.` since GitHub Pages user sites don't serve that subdomain.

Pattern:
```
# AI/training bots — blocked
User-agent: AddSearchBot
Disallow: /

User-agent: AI2Bot
Disallow: /

# ... repeat for each of the 99 named bots ...

# All other crawlers allowed
User-agent: *
Allow: /

Sitemap: https://colbymainard.github.io/sitemap.xml
```

**Why:** This is the single most impactful change in the plan. Until it lands, the site is invisible to search engines regardless of what else changes.

### 1.2 Resubmit to Search Console after deploy

Not a code change. After 1.1 deploys, request re-indexing in Google Search Console (verification meta already on `index.html` line 30) and Bing Webmaster Tools (`index.html` line 31). Without resubmission, recovery from the disallow can take weeks.

---

## Phase 2 — On-page SEO essentials

All four HTML files (`index.html`, `assets/html/hobbies.html`, `assets/html/tech_takes.html`, `assets/html/tech_resources.html`) need head edits. Items 2.1–2.6 are independent and can be applied in a single head rewrite per file.

### 2.1 Strengthen titles and meta descriptions

Replace the weak existing titles and one-word descriptions.

| File | New title | New description |
|------|-----------|-----------------|
| `index.html` | `Colby Mainard — Machine Learning Engineer | AI, Computer Vision, Deep Learning` | `Colby Mainard is a Machine Learning Engineer specializing in computer vision, deep learning, and AI for sports analytics, cybersecurity, and medical imaging. M.S. Computer Science, Texas A&M.` |
| `assets/html/tech_takes.html` | `Technical Stances — Colby Mainard | Opinions on AI, Quantum, Privacy` | `In-depth technical opinions on Kolmogorov-Arnold Networks, cryptocurrency security, quantum computing, AGI hype, post-internet privacy, and product placement in sports marketing.` |
| `assets/html/hobbies.html` | `Hobbies — Colby Mainard | Photography, Quantum Computing, D&D, History` | `Colby Mainard's hobbies: landscape photography, self-taught quantum computing, Dungeons & Dragons in Austin, and history.` |
| `assets/html/tech_resources.html` | `Technical Resources — Colby Mainard | Curated AI, Cybersecurity, Programming` | `A curated list of certifications, books, and online resources for cybersecurity, AI/ML, C/C++, Python, scripting, and operating systems — recommended by ML engineer Colby Mainard.` |

**Why:** Title tag is the highest-weight on-page ranking signal. Current titles ("Hobbies", "Tech Resources") have no name/keyword association. Description appears in SERP snippets and drives click-through.

### 2.2 Fix the malformed `<add>` tag and duplicate `author` meta

- `index.html` line 34, `assets/html/tech_takes.html` line 17, `assets/html/tech_resources.html` line 18: replace `<add name="X-Frame-Options" value="SAMEORIGIN"/>` with `<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self'">`. (X-Frame-Options is an HTTP header, not a meta tag — CSP frame-ancestors is the static-HTML-friendly equivalent.)
- All three subpages declare `<meta name="author" content="Colby Mainard">` twice — remove the duplicate.

### 2.3 Add canonical URLs and Open Graph + LinkedIn Card on every page

Insert under `<meta name="viewport">` in each `<head>`. Pattern (example for index.html):
```html
<link rel="canonical" href="https://colbymainard.github.io/">
<meta property="og:type" content="website">
<meta property="og:url" content="https://colbymainard.github.io/">
<meta property="og:title" content="Colby Mainard — Machine Learning Engineer">
<meta property="og:description" content="...same as meta description...">
<meta property="og:image" content="https://colbymainard.github.io/assets/images/favicon.png">
<meta property="og:site_name" content="Colby Mainard">
<meta name="linkedin:card" content="summary">
<meta name="linkedin:title" content="Colby Mainard — Machine Learning Engineer">
<meta name="linkedin:description" content="...">
<meta name="linkedin:image" content="https://colbymainard.github.io/assets/images/favicon.png">
```
Repeat with page-specific URL/title/description for each subpage. For `assets/html/tech_takes.html`, use `og:type="article"`. Use `linkedin:card="summary"` (small icon) since no dedicated 1200×630 OG image exists yet — it can be upgraded to `summary_large_image` later when an OG card is created.

**Why:** Canonical prevents duplicate-content penalties between `/` and `/index.html`. OG/Linkedin cards drive shareable previews on LinkedIn, X, Slack, Mastodon — directly relevant for the employer and tech-enthusiast audiences.

### 2.4 Add favicon/touch-icon/theme-color set

Insert in each `<head>`:
```html
<link rel="apple-touch-icon" href="/assets/images/favicon.png">
<meta name="theme-color" content="#000000">
```
Reuse the existing 256×256 `assets/images/favicon.png` — Apple touch icons accept any reasonable size, and the existing image is large enough.

### 2.5 Update `manifest.json`

**File:** `manifest.json`

Add `theme_color` and an additional icon `purpose`:
```json
{
    "name": "Colby Mainard — Machine Learning Engineer",
    "short_name": "Colby Mainard",
    "start_url": ".",
    "display": "standalone",
    "background_color": "#000000",
    "theme_color": "#000000",
    "description": "Personal website of Colby Mainard, ML engineer specializing in computer vision and AI.",
    "icons": [
        {"src": "./assets/images/favicon.png", "sizes": "256x256", "type": "image/png", "purpose": "any maskable"}
    ]
}
```

### 2.6 Add JSON-LD structured data

**`index.html` — Person schema** (insert at end of `<head>`):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Colby Mainard",
  "url": "https://colbymainard.github.io/",
  "jobTitle": "AI/ML Engineer",
  "worksFor": {"@type": "Organization", "name": "RiskScout"},
  "alumniOf": [{"@type": "CollegeOrUniversity", "name": "Texas A&M University", "sameAs": "https://www.tamu.edu/"}],
  "knowsAbout": [
    "Machine Learning", "Computer Vision", "Deep Learning",
    "Natural Language Processing", "Generative Adversarial Networks",
    "Variational Autoencoders", "Cybersecurity", "Anti-Money Laundering"
  ],
  "sameAs": ["https://www.linkedin.com/in/colby-mainard/"],
  "email": "mailto:colby.mainard@proton.me",
  "description": "Machine Learning Engineer specializing in computer vision and AI, with experience in sports analytics, cybersecurity, and medical imaging."
}
</script>
```

**`assets/html/tech_takes.html` — six Article schemas** (one per opinion). Use the existing "Last Updated" dates already in the page. Section ID → headline → date mapping:
- `KANDiv` → "Kolmogorov-Arnold Networks (KANs)" → 2025-10-07
- `CryptocurrencyDiv` → "Staying Safe with Cryptocurrency" → 2025-11-29
- `FutureOfQuantumDiv` → "Future of Quantum Computing" → 2025-10-18
- `AGIDiv` → "Artificial General Intelligence: More Buzzword Than Threat" → 2025-10-28
- `PrivacyDiv` → "Post-Internet Privacy" → 2026-01-20
- `productPlacementDiv` → "Product Placement in Sports Marketing" → 2026-04-23

Pattern (per section):
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "author": {"@type": "Person", "name": "Colby Mainard", "url": "https://colbymainard.github.io/"},
  "publisher": {"@type": "Person", "name": "Colby Mainard"},
  "mainEntityOfPage": "https://colbymainard.github.io/assets/html/tech_takes.html#<section-id>",
  "url": "https://colbymainard.github.io/assets/html/tech_takes.html#<section-id>"
}
```

**All three subpages — BreadcrumbList**:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://colbymainard.github.io/"},
    {"@type": "ListItem", "position": 2, "name": "<page name>", "item": "<page url>"}
  ]
}
```

**Why:** Person schema enables Google Knowledge Panel for searches like "Colby Mainard" — top win for the recruiter audience that name-searches candidates. Article schema makes Tech Takes eligible for rich snippets and Google Discover. BreadcrumbList shows breadcrumbs in SERP results, improving CTR.

### 2.7 Fix heading hierarchy: one `<h1>` per page

All four HTML files currently have a section-level `<h1>` for every section (e.g., `index.html` line 73 has `<h1>Colby Mainard</h1>` followed by `<h1>Work History</h1>`, `<h1>Education</h1>`, etc.). Demote all section `<h1>`s to `<h2>`, and existing `<h2>`s to `<h3>` (etc.) within each section. Keep one true `<h1>` per page identifying the page topic.

**Why:** Google uses heading hierarchy to determine page topicality. Multiple `<h1>` confuses content extraction. Also a Lighthouse a11y signal.

### 2.8 Remove `<article>` wrappers around `<nav>` blocks

`index.html` lines 50–69, `assets/html/hobbies.html` lines 30–48, and the equivalent blocks in tech_takes.html and tech_resources.html wrap `<nav>` in `<article>`. The `<article>` element is for self-contained syndicatable content, not navigation. Replace with `<div>` (the inner `<nav>` already provides the landmark role):
```html
<header>
    <div class="pageMenu" id="pageMenu">
        <span class="nav-brand">Colby Mainard</span>
        <button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
        <nav aria-label="Site navigation">...</nav>
    </div>
    <div class="siteMenu" id="siteMenu">
        <nav aria-label="Page sections">...</nav>
    </div>
</header>
```
Add `aria-label` on each `<nav>` while you're there (currently no nav labels exist).

### 2.9 Update `sitemap.xml`

**File:** `sitemap.xml`

- Remove the duplicate `<url>` entry for `https://colbymainard.github.io/index.html` (lines 7–10) — it's the same page as the bare `/` and creates a soft-duplicate signal. Keep the canonical-link tag from 2.3 to enforce.
- Add `<priority>` and `<changefreq>` to the remaining four URLs:
  - `/` → priority 1.0, changefreq monthly
  - `/assets/html/tech_takes.html` → priority 0.8, changefreq monthly
  - `/assets/html/tech_resources.html` → priority 0.7, changefreq monthly
  - `/assets/html/hobbies.html` → priority 0.6, changefreq quarterly

---

## Phase 3 — Performance / Core Web Vitals (no image re-encoding)

Independent of Phase 2 — can run in parallel.

### 3.1 Add `width` and `height` attributes to all images (CLS fix)

**File:** `assets/html/hobbies.html`, the six `<img>` tags around lines 54, 83, 85, 87, 89, 91.

Read the intrinsic dimensions of each image and add explicit `width="X" height="Y"` attributes. The browser uses the ratio to reserve layout space, eliminating Cumulative Layout Shift when lazy-loaded images arrive.

```html
<img src="../images/photographyHobby/DSC_0004.JPG"
     alt="Up-close flower"
     width="6000" height="4000"
     loading="lazy" decoding="async">
```

(Exact dimensions to be read from the actual files during implementation. Even when the image is rendered smaller via CSS, the attributes only need to express the *aspect ratio*.)

**Why:** CLS is one of three Core Web Vitals weighted in Google's ranking algorithm. The current lazy-load-without-dimensions pattern guarantees a CLS hit on every photo entry.

### 3.2 Lazy-load the YouTube iframe

**File:** `assets/html/hobbies.html`, the YouTube `<iframe>` around line 64.

Add `loading="lazy"` to the iframe element. Native iframe lazy-loading is supported in all modern browsers and defers the YouTube embed's ~500 KB of JS/initial frame until scroll-near.

```html
<iframe src="https://www.youtube-nocookie.com/embed/..." 
        width="560" height="315"
        loading="lazy"
        title="..."></iframe>
```

Add explicit `width` and `height` here too (same CLS reason as 3.1).

### 3.3 Deployment hygiene — exclude source-only files

The repo currently ships several files that should not be in the deployed artifact:
- `assets/css/default.css.map` (32 KB SCSS source map — useful in dev, not prod)

Two paths to resolve:
- **If GitHub Pages serves the repo root directly** (most likely — check `.github/workflows/static.yml` if it exists): add a `.nojekyll` if not present, then either `git rm` these files from version control, or re-run `sass` without `--source-map` (sass writes the map by default; pass `--no-source-map`).
- **If a build pipeline exists**: exclude these in the workflow's upload step.

Update the `sass` command in `CLAUDE.md` and any developer notes to use `sass --no-source-map ./assets/css/default.scss ./assets/css/default.css` for production builds (keep source maps for local dev).

### 3.4 Update `service-worker.js` precache list

**File:** `service-worker.js`

The service worker precaches a fixed list of URLs at install. After Phase 2 head-edit changes, the cache version should be bumped to invalidate stale precaches:
```js
const CACHE_VERSION = "v2";  // bump from "v1"
```
Otherwise existing visitors will continue serving the old HTML from cache for up to a week. Also remove any references in the precache list to non-existent files (`print_resume.js`, `skill_project_link.js` — both are referenced but don't exist on disk).

---

## Phase 4 — Linkbait content strategy (off-page SEO)

Phases 1–3 fix the **on-page** SEO foundation so the site is *eligible* to rank. But Google's ranking algorithm weights **backlinks from authoritative sites** as one of the strongest signals. A new personal site has near-zero domain authority; the only way to build it organically is to publish content other people *want* to link to. This phase is a content roadmap, not an immediate code change list — it's what to write and how to format it for maximum linkability.

The site already has a strong foundation for this: 6 substantive Technical Stances opinions (~5,500 words) and a curated Technical Resources bibliography. The strategy is to (a) upgrade existing content into reference-grade pieces and (b) publish 2–4 new pieces per year that target specific link-attracting niches drawn from real experience.

### 4.1 Linkbait formats ranked by realistic ROI for this site

Based on the audit-confirmed strengths (production CV pipelines for 6 sports leagues, ML for medical diagnostics, $1M MLOps cost-savings, ML-driven cybersecurity at Vectra, M.S. AI/ML, self-taught quantum), the formats most likely to attract organic backlinks are:

**1. Real-world case studies with specific numbers (highest ROI).** Most ML blog content is generic tutorial recycling. First-person stories with real architecture and real numbers stand out and get linked from ML newsletters (TheSequence, Import AI, Last Week in AI), aggregator subreddits (/r/MachineLearning, /r/computervision), and Hacker News.

  Concrete candidates:
  - **"How we cut $1M from our ML inference bill: a YOLO+ResNet pipeline retrospective"** — Expand the MVP work history bullet (currently 1 line on `index.html`) into a 2,000–3,000-word case study. Specifics: what the original pipeline cost, where the waste was, what changed, what the new cost was, what didn't work. Becomes a new section on tech_takes.html or a new page `assets/html/case_studies/mlops_cost_savings.html`.
  - **"Computer vision for sports broadcasts: lessons from 6 leagues"** — A 500-word teaser on this already exists in tech_takes.html (`productPlacementDiv`). Expand it into the canonical resource: motion blur handling, occlusion, league-specific camera setups, ground-truth labeling at scale, latency targets for live broadcast vs. post-production. There is no equivalent public write-up by anyone with this specific cross-league experience.
  - **"What facial-tracking research at Shiseido actually looked like in 2020"** — Niche but interesting; cosmetics + CV is unusual.

**2. Definitive "no-nonsense" guides on hot/contrarian topics.** Long-form, opinionated, well-argued posts on topics where the public conversation is shallow. These get linked when journalists, bloggers, and forum posters need a citation for a specific argument.

  Concrete candidates:
  - **"AGI is a buzzword: a probabilistic timeline for when it actually matters"** — Expand `AGIDiv` from 2,000 words to 4,000–5,000 with explicit predictions, citations to the literature already read, a falsifiability section. The current piece is good; with 2× the depth and a clear "predictions table", it becomes the kind of post HN front-pages.
  - **"KANs vs MLPs: a benchmarking guide for practitioners"** — Expand `KANDiv` with a hands-on benchmark (small toy dataset, both architectures, training curves, parameter counts, inference latency). Code repo on GitHub. ML researchers and KAN-curious engineers will cite a working benchmark.
  - **"Differential privacy in practice: a 2026 survey"** — Expand `PrivacyDiv` into a survey-style post with concrete library recommendations (Opacus, TF Privacy), a table of techniques with their epsilon-delta tradeoffs, and a small worked example. Privacy researchers actively look for accessible explainers to link from their papers.

**3. Reference-grade reading lists with personal annotations.** The existing `assets/html/tech_resources.html` is a curated bibliography (~35 books, ~10 podcasts) that's already linkable — but currently passive (titles + authors only). Upgrade with one paragraph per top entry: "Why I recommend it / what level of reader / what to skip". This converts it from an SEO-thin link list into the kind of "I've read this and here's what I learned" page that ML/cybersecurity instructors will link to as required reading.

  Specific upgrade: add a `<th>Why I recommend it</th>` column to the existing tables and populate the top 3–5 entries per category. ~20 short paragraphs total. Existing structure is reused; no new pages.

**4. Original visualizations / interactive demos.** A working demo embeds extremely well on social platforms and gets re-shared. Even a 100-line vanilla-JS demo is a backlink magnet because nothing else like it exists.

  Concrete candidates (deliverable as a small `<canvas>` block within an existing tech_takes section, no framework needed):
  - **A working VAE latent-space slider** — train a tiny VAE on MNIST offline, ship the decoder weights as JSON, build a 2-slider UI that morphs through latent space. Sits alongside the AI sections.
  - **A "how does product-placement detection work" annotated demo** — overlay a sports broadcast still with bounding-box annotations and confidence scores. Visual, specific, novel.
  - **A KAN vs MLP function-fitter** — input a function, watch both architectures fit it. Embeddable in the KAN tech-take.

**5. Lightweight open-source releases.** A small, well-documented GitHub repo earns links from anyone who uses it. Even ~100-line utilities work. Each repo's README links back here; each user who blogs about the tool links back here.

  Concrete candidates (low-stakes given the CV experience):
  - **A CLI for batch CV pipeline benchmarking** — wrap common YOLO/ResNet timing into a one-command tool. README links to a tech_takes case-study page on this site.
  - **A "reproduce the KAN paper" notebook** — papers-with-code-style.

### 4.2 Make every published piece structurally linkable

Format choices that materially affect whether content gets linked:

- **Stable, descriptive permalinks.** Each major opinion currently shares the same page (`tech_takes.html#KANDiv`). For pieces over ~2,500 words, give them their own page (`assets/html/case_studies/mlops_cost_savings.html`). Single-page URLs are 3–5× more linkable than fragment URLs.
- **A clear "publication date" displayed at the top** of each piece. (Existing "Last Updated" lines are good — keep them.)
- **A canonical citation block at the end** ("Cite this as: Mainard, C. (2026). 'How we cut $1M...'. https://...") — academics, journalists, and other bloggers will paste this verbatim. Massively increases link rate from research contexts.
- **Source code links inline** for any technical claim. A post that says "we benchmarked X" with no repo gets ignored; one with a GitHub link gets shared.
- **Pre-written tweet/LinkedIn share text** in HTML comments — internal shareability ~doubles.
- **JSON-LD `Article` schema (already in Phase 2.6)** — required for Google Discover eligibility, which drives passive distribution.
- **An OG card per article** (deferred from current scope, but worth revisiting per piece). Generic site-wide OG card → click-through ~1–2%; piece-specific card with the headline → 5–8%.

### 4.3 Distribution: publishing isn't enough

Even great content doesn't earn links from a zero-DA site without a push. The minimum-effort distribution checklist for each new piece:

- **Hacker News submission** at peak time (Tue–Thu 8–10am ET) for technical case studies and contrarian pieces. The AGI and CV-pipeline pieces are the strongest HN candidates.
- **/r/MachineLearning, /r/computervision, /r/cybersecurity** for technical pieces — must follow each subreddit's self-promo rules (typically: post the content directly, comment substantively on others' posts).
- **LinkedIn post** with the case-study summary — the recruiter audience overlap is exactly where this earns repeat exposure.
- **Mastodon (mathstodon.xyz, fosstodon.org) and X** for visualizations and demos — these formats travel best on visual platforms.
- **Email outreach to one or two bloggers** in the same niche per piece — not begging for links, just a "thought you might be interested given your post on Y" with a permalink. ~5% reply rate, but the reply is often a backlink.

### 4.4 Cadence and prioritization

Realistic content cadence: **1 expansion of an existing piece per quarter, plus 1 new case study per year.** The Technical Stances cadence (one new piece every 1–3 months) is already roughly this rhythm — the proposed change is to make each piece longer, more rigorous, and more linkable rather than to publish more.

Recommended first-three pieces (highest expected ROI):

1. **Expand `productPlacementDiv` into a full sports-CV case study** — the single most defensible expertise; nothing else like it exists publicly.
2. **MLOps cost-savings retrospective** — concrete numbers, big audience (every ML team has a cost story), high HN potential.
3. **Tech Resources annotation pass** — lowest effort, immediate value, enables the page to rank for "best ML books 2026"-style queries.

### 4.5 Tracking what works

Set up a simple referral-tracking habit (no code change needed):
- Use Google Analytics 4 (already on the site) **Referral acquisition report** weekly: which external domains are sending traffic? Each new referrer is a backlink to log.
- Use [ahrefs.com/backlink-checker](https://ahrefs.com/backlink-checker) (free tier, 100 backlinks visible) monthly to track backlink count and domain ratings.
- Track which Technical Stances pieces drive the most return visits — those are the linkbait formats this specific audience responds to. Double down.

---

## Phase 5 — Additional considerations

These items surfaced during planning but weren't part of the original four-phase scope. Some are worth folding in if scope expands; others are long-term strategic notes.

### 5.1 Trust & E-E-A-T signals (Google quality rater framework)

Google's quality rater guidelines weight Experience, Expertise, Authoritativeness, and Trustworthiness as central ranking signals.

- **Privacy policy page** — Google Analytics is loaded on every page with no disclosure. A privacy policy is required by Google Analytics' own ToS, by GDPR for any EU traffic, and by CCPA for California traffic. Add `assets/html/privacy.html` linked from the footer; cover what GA collects, the Microsoft/Google verification meta tags, and the email contact method.
- **Visible "Last reviewed" dates** on technical claims, not just "Last updated" — signals factual maintenance to both Google and readers. Existing Tech Takes lastmod dates work; consider explicit "Reviewed: YYYY-MM-DD" lines for older pieces (KAN piece is from October 2025 and the field has moved since).
- **Citations to peer-reviewed sources** inline within Tech Takes pieces — converts opinion into authoritative reference. Each piece should cite at least one primary source (paper, RFC, official documentation) using `<a href>` with descriptive anchor text.
- **Custom 404 page** — GitHub Pages serves a generic 404 by default. Add `404.html` at the repo root, styled to match the site (reuses `default.css`), with site navigation and a search-friendly suggestions list. Reduces bounce rate on broken inbound links.

### 5.2 AI-assistant discoverability

The current `robots.txt` blocks every AI-related user-agent indiscriminately. There's a meaningful operational distinction worth exploiting:

- **Training bots** (GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, ChatGPT Agent, CCBot) — scrape pages to train future models. Blocking is reasonable; you receive no direct traffic from them.
- **Live-search bots** (ChatGPT-User, Claude-User, Perplexity-User, OAI-SearchBot, Claude-SearchBot) — fetch pages on demand to answer real-time user queries in tools like ChatGPT search and Perplexity. **Blocking these removes the site from AI search results**, where recruiter and tech-enthusiast audiences increasingly begin their queries.

Consider allowing live-search agents while continuing to block training crawlers. This is a per-bot edit during Phase 1.1 — split the existing list into two stanzas.

Additionally, consider an `llms.txt` file at the repo root: an emerging convention summarizing the site in plain markdown for LLM consumption. Low cost, low risk, modest upside as the standard solidifies.

### 5.3 Engagement / dwell-time signals (Chrome UX Report inputs)

Google increasingly weights real-world engagement metrics surfaced through CrUX. Content-side levers:

- **Estimated reading time** at the top of each Tech Takes piece (e.g., "12 min read"). A ~5-line vanilla-JS snippet computing word-count / 200 wpm; no new dependency.
- **Table of contents** at the top of long pieces — anchor links inside the page. Also enables Google's SERP "Jump to" links.
- **"Related posts" footer** on each Tech Take linking the other five — short blurb + section ID. Increases pages-per-session.
- **Code blocks with syntax highlighting** for any code examples — Prism.js or highlight.js (~10 KB). Visual signal of technical content; engagement uplift on technical pieces.

### 5.4 Schema.org refinements beyond Phase 2.6

The Phase 2.6 schemas (Person, Article, BreadcrumbList) cover the highest-impact rich-result eligibility. Additional schemas worth considering:

- **`WebSite` schema with `SearchAction`** on `index.html` — makes the site eligible for the SERP sitelinks search box (the in-result search field under top results for branded queries).
- **`Course` schema entries** for the M.S. AI/ML coursework already listed on `index.html` — surfaces the page in education-related searches.
- **`SoftwareSourceCode` schema** per project, once GitHub repo links are added (Phase 4 dependency).
- **`ProfilePage` schema** as a complement to `Person` — explicitly types `index.html` as a profile page, improving entity disambiguation.

### 5.5 Topic architecture (pillar-and-spoke clustering)

The current 4-page flat structure limits topical authority signals. Topic clusters concentrate internal-link equity on a single hub page that becomes the canonical authority for a topic:

- A pillar page like "AI Engineering Notes" linking to each Tech Take as a spoke (KAN, AGI, sports CV, etc.).
- Each spoke links back to the pillar with descriptive anchor text.
- Pillar pages outrank standalone posts because they accumulate internal-link equity from every spoke.
- The same model could work for Cybersecurity (resources page as pillar, individual takes as spokes) and Quantum.

This is a 3–6 month evolution, not an immediate change. Worth designing intentionally as Phase 4 content is added rather than retrofitting later.

### 5.6 Backlink tactics beyond Phase 4.3

- **Cross-post Tech Takes to dev.to or Hashnode** with `<link rel="canonical">` pointing back here. Gets the post seen by external audiences without splitting SEO authority — Google honors the canonical and credits the original.
- **HARO (Help A Reporter Out) / Qwoted responses** on ML/CV topics — journalists cite sources, often with high-DA backlinks. Time investment is ~30 min per query response.
- **Wikipedia citations** where genuinely qualified. High-DA, durable, hard to earn. Realistic angles: editing pages on KAN, sports analytics, or ML-driven cybersecurity to cite a primary source you've written. Avoid linking your own opinion pieces — Wikipedia rejects those.
- **Podcast guest appearances** — pitching with a specific case-study angle. The sports CV pipeline retrospective is the strongest hook. The existing Tech Resources page already enumerates podcasts you listen to; that's the natural target list.

### 5.7 Privacy / regional compliance

Only material if Google Analytics shows meaningful EU or California traffic.

- **Cookie consent banner** — Google Analytics sets cookies, creating GDPR exposure for EU traffic. A simple one-time banner (e.g., Cookie Consent by Osano, ~5 KB) handles the legal requirement without dragging in a full CMP.
- **Privacy policy** (also referenced in 5.1) — required by Google Analytics' own ToS regardless of jurisdiction.

These can be deferred until the GA "Geographic" report shows measurable EU/CA presence; act on them once it does.

---

## Out of scope (deferred per scope choice)

These items came out of the audit but are not in the immediate change set:
- **Image re-encoding** (19 MB → ~2 MB potential via WebP+srcset). Only the CLS fix in 3.1 is included; full optimization is a future task.
- **Content additions** — GitHub link, professional headshot, resume PDF download, OG share card image, intro-copy rewrite, "Featured Skills" curation, project repo links, blog index page, contextual cross-linking. These were audited as gaps but require new assets / content decisions. (Note: Phase 4's linkbait strategy is a content *roadmap*, not an immediate edit — it's what to write going forward, not assets requested now.)

---

## Critical files

- `robots.txt` — Phase 1
- `sitemap.xml` — Phase 2.9
- `manifest.json` — Phase 2.5
- `index.html` — Phases 2.1–2.8
- `assets/html/tech_takes.html` — Phases 2.1–2.8 (plus 6 Article schemas)
- `assets/html/hobbies.html` — Phases 2.1–2.8, 3.1, 3.2
- `assets/html/tech_resources.html` — Phases 2.1–2.8
- `service-worker.js` — Phase 3.4
- `CLAUDE.md` — sass command note in Phase 3.3

---

## Verification

After deploying, end-to-end verification:

1. **robots.txt** — fetch `https://colbymainard.github.io/robots.txt` and confirm the `User-agent: *` / `Allow: /` block is present and the sitemap URL has no `www.`.
2. **Search Console resubmission** — request re-indexing for the four canonical URLs in Google Search Console; check the URL Inspection tool for each to confirm "URL is on Google" status changes.
3. **Structured data** — paste each page URL into Google's [Rich Results Test](https://search.google.com/test/rich-results); confirm Person, Article, and BreadcrumbList schemas validate without errors.
4. **OG/LinkedIn cards** — paste each URL into [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and LinkedIn's Card Validator; confirm preview renders correctly.
5. **Sitemap** — fetch `https://colbymainard.github.io/sitemap.xml`; confirm only 4 URLs (no duplicate `/index.html`), priorities/changefreq present, validates against the schema URL in line 2.
6. **Core Web Vitals** — run [PageSpeed Insights](https://pagespeed.web.dev/) on each of the four pages. Targets: CLS < 0.1 (was at risk; should be near zero after 3.1/3.2), LCP < 2.5s (will still be high on hobbies.html until images are optimized — expected), FID/INP < 200ms (already good given deferred scripts).
7. **Lighthouse SEO score** — run Lighthouse in Chrome DevTools for each page; aim for SEO ≥ 95 (was likely ~70-80 due to missing canonical, weak description, malformed tag).
8. **Manual checks** — view-source on each page to confirm: one `<h1>` only, no `<add>` tag, no duplicate `<meta name="author">`, JSON-LD blocks present, canonical link present, OG/LinkedIn tags present.
9. **Service worker bump** — DevTools → Application → Service Workers; confirm new version (`v2`) registers and old caches are evicted on next load.
