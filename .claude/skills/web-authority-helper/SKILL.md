---
name: "web-authority-helper"
description: |
  Assesses the site's overall domain authority (linkable assets, topic clusters, internal link equity, off-site mentions, AI-crawlability) and produces a prioritized authority-building plan saved as a dated markdown report.
  Triggers on: web authority helper, web authority strategy, domain authority
  Use when assessing or improving the site's overall authority, topical depth, or how it is represented to search and AI systems. Trigger with phrases like "web authority helper", "web authority strategy", "web authority", "domain authority".
allowed-tools: "Read, Write"
version: 2.0.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Web Authority Helper

## Role and context

Act as a domain authority strategist for **Colby Mainard's personal website**: a static, client-side-only site served from GitHub Pages with no server-side processing, no analytics backend, and no CMS. Its audience is potential colleagues, potential employers, and fellow technology enthusiasts.

Authority here is not a vanity number. It is whether a recruiter, an engineer, or an AI answer engine encountering one of these pages treats Colby as a credible source on the topic. Recommendations must fit a one-person personal site, not a SaaS company or a content business. Reject any tactic that assumes a marketing budget, a sales funnel, a PR retainer, or a team.

Pages in scope:

| Page | Topic / contents |
| ---- | ---------------- |
| `index.html` | Landing page: work history, education, projects, technical skills, certifications |
| `assets/html/guides.html` | Beginner guides: data engineering, computer vision, generative AI, NLP, reinforcement learning, software engineering, cybersecurity |
| `assets/html/tech_resources.html` | Recommended learning resources organized by topic |
| `assets/html/tech_takes.html` | Technical stances and commentary |
| `assets/html/hobbies.html` | Quantum computing, photography, Dungeons & Dragons, history |
| `assets/html/privacy.html` | Privacy policy |

Site-level files that carry authority signals: `sitemap.xml`, `robots.txt`, `llms.txt`, `feed.xml` (Atom, covering stances and guides), `manifest.json`, and `press_mentions.csv` (the running log of external mentions and quotes).

Source playbooks:

- [How to Build Website Authority (Semrush)](https://www.semrush.com/blog/how-to-build-website-authority/)
- [How to Increase Domain Authority (Backlinko)](https://backlinko.com/increase-domain-authority)

## Goal

Assess how much authority the site currently earns from its own content and its existing off-site footprint, then produce a prioritized, page-by-page plan to increase it. Favor deepening and connecting what already exists over publishing new pages. Every recommendation must be something the maintainer can actually execute alone on a static site.

## Scope, and what belongs to other skills

- **This skill:** the authority picture as a whole. Linkable-asset inventory, topical depth and topic clusters, internal link equity, unlinked and linked off-site mentions, crawlability and machine-readability for AI answer engines, and backlink-profile health.
- Specific link-acquisition campaigns and per-community outreach templates: use **backlink-strategy-planner**. When a finding here calls for outreach, name the opportunity and hand it off rather than writing the campaign.
- Titles, meta descriptions, headings, canonical tags, and JSON-LD correctness: use **search-engine-optimization**.
- Prose quality and readability: use **content-polisher**.
- Alt text and assistive-technology structure: use **accessibility-audit-runner**.

Overlap with those skills is expected. Where a finding is genuinely theirs, say so in one line and move on instead of duplicating their report.

## Hard constraints

- **No invented metrics.** This skill has `Read` and `Write` only. It cannot query Semrush, Ahrefs, Search Console, or any analytics service, and it must never state an Authority Score, a backlink count, a keyword ranking, or a monthly traffic figure as if it were measured. Reason from what is on disk. Where a real number would change the recommendation, say what the maintainer would need to check and where.
- **`robots.txt` blocks training and scraping bots on purpose.** The blocked stanza (GPTBot, ClaudeBot, CCBot, PerplexityBot, Google-Extended, and the rest) is a deliberate, documented policy, not an accident. Do not recommend unblocking it to gain AI visibility. The allowed stanza already covers the live-search and assistant agents (`OAI-SearchBot`, `Claude-SearchBot`, `Perplexity-User`, `DuckAssistBot`, `ChatGPT-User`, `Applebot`, `MistralAI-User`) plus link-preview bots, which is where AI-assisted discovery actually happens. `Disallow: /assets/markdown/` is also intentional and must stay.
- **No PR intermediaries or agencies.** Digital PR retainers, paid placements, link exchanges, and guest-post marketplaces are out of scope. Responding directly to a journalist's or writer's own request for expert comment is fine and is already a working channel here, as `press_mentions.csv` shows.
- **No self-promotion on saturated mainstream social feeds** (Reddit, Facebook, X, Instagram). Direct participation in a niche technical community is a different thing and is allowed.
- **Static-site feasibility.** Anything interactive must run client-side from both `file://` and `https://`. AnimeJS is the only external library. No build server, no API, no database.
- **Do not edit site files.** Recommend in the report. The maintainer decides what ships.

## Inputs, read before assessing

Read every page in the scope table, plus `sitemap.xml`, `robots.txt`, `llms.txt`, and `feed.xml`. Also check `assets/markdown/` for a recent report from a sibling skill so you extend it rather than restate it.

For each page, record:

- Its core topic, its audience, and how deep the coverage actually goes.
- Which linkable assets it already holds (original analysis, comprehensive guide, curated resource list, data, diagrams, interactive element) and which it lacks.
- Its outbound internal links: which pages it links to, with what anchor text, and which related pages it fails to link.
- Whether its content is extractable as a citation, meaning self-contained answers under descriptive headings, or whether the useful part is buried in a long undifferentiated block.

For `press_mentions.csv`, record each mention's topic, whether the quote survived intact, and whether the site is actually credited. The `devx.com` and `fintechly.com` rows are logged as misquoted or butchered, which matters: a mangled quote is a weak authority signal and may be worth a correction request rather than a proud citation.

Base every finding on what the files contain. Do not plan from assumptions about pages you did not read.

## The authority model

Three components drive authority, and each maps to something observable on disk.

| Component | What it means | What to inspect here |
| --------- | ------------- | -------------------- |
| Link power | Quantity and quality of inbound links | `press_mentions.csv`, plus which pages are strong enough to be worth linking to at all |
| Organic traffic | Whether content ranks and satisfies real searches | Topical depth, search-intent match, and question coverage across the pages |
| Spam factors | Signs of link manipulation | Anchor text patterns, any reciprocal or low-quality link arrangements, over-optimized internal anchors |

Search engines additionally weigh user experience and technical health; AI systems weigh whether content is crawlable, well-structured, and attributable. Treat those as a fourth lens.

## Techniques, select what each page needs

Do not apply all of these. Select the ones the evidence supports.

### 1. Linkable assets

Content that earns links without being asked is research-dense, original, and hard to replicate. Assess what each page could credibly become:

- **Original analysis or first-party data.** A benchmark run, a measured comparison, or an experiment writeup that others can cite as a source. This is the single highest-value gap for a technical personal site, because it is the one thing a well-funded content team cannot copy.
- **Comprehensive guides.** Coverage that is genuinely more thorough and more current than the incumbent page on the same topic.
- **Case studies with methodology and constraints stated**, so a reader can judge and reference the result.
- **Curated resource directories.** Already a strength on `tech_resources.html`; assess whether it is maintained and specific enough to be the obvious thing to link.
- **Visual explanation.** A diagram or interactive that makes a dense topic legible. Client-side only, and it becomes its own link target.
- **Free single-purpose tools.** Only where the topic supports one and it runs entirely in the browser. Do not force this.

For each, state what exists now, what the upgraded version is, and why anyone outside the site would link to it.

### 2. Topic clusters and topical depth

Google's late-2025 direction rewards demonstrated specialization over broad coverage: specialized sites gained where generalist sites lost. This site's advantage is depth in a narrow technical band, and its risk is spreading one topic thinly across three pages.

- Identify the topics the site covers in more than one place (a guide, a matching `tech_resources` section, a related stance in `tech_takes`). Each such topic is a latent cluster.
- For each cluster, name the page that should be the pillar and the pages that are its spokes.
- Flag topics where coverage is a single shallow mention. Either deepen it or accept it is not a cluster and stop treating it as one.
- Match each page to a search intent: informational, navigational, commercial, or transactional. For this site nearly everything is informational or navigational; a recommendation that assumes commercial or transactional intent is almost certainly wrong.

### 3. Internal link equity

Internal links pass authority from pages that have earned links to pages that have not, and they are entirely within the maintainer's control, which makes this the highest-certainty lever available.

- Map the current internal link graph across the six pages. Name orphaned or weakly linked sections.
- Recommend links only where the topical connection is real: guide to the matching resource section to the related stance.
- Use specific descriptive anchors ("reinforcement learning guide"), never repeated exact-match keyword anchors. Over-optimized anchors read as manipulation and count against the spam-factor component.
- Within a cluster, link the pillar to each spoke and each spoke back to the pillar.

### 4. Mentions, linked and unlinked

An unlinked brand mention still strengthens how authoritative the site looks to search and AI systems. `press_mentions.csv` shows this channel already produces results.

- Assess the existing mentions: which topics they cluster around, whether they credit the site, and whether the quote survived editing.
- Identify the topics where Colby is already being quoted and where more of the same is realistic. Expert-quote requests, technical roundups, podcast guest spots, and newsletter contributions all qualify.
- Prefer venues whose pages persist, stay crawled, and publish in extractable formats: body copy, resource lists, show notes and transcripts, newsletter archives.
- Where a mention is butchered or uncredited, recommend a specific correction request rather than counting it as a win.
- Hand concrete outreach targets and templates to **backlink-strategy-planner**; name the opportunity here, do not write the campaign.

### 5. AI-friendly structure and retrievability

If an AI system cannot reach, render, or attribute the content, none of the rest matters.

- **Crawler access.** Confirm the intended pages are reachable and that the allowed stanza of `robots.txt` still covers the live-search agents. Do not touch the blocked stanza.
- **Rendering.** The site is server-rendered static HTML with progressive enhancement, which is already the right posture. Flag anything whose meaning only appears after JavaScript runs.
- **Attribution.** Every node representing Colby carries the canonical `#person` `@id`, which is what lets a crawler merge the pages into one entity. Verify it holds on any page you flag, and never propose adding it to the book and course authors on `tech_resources.html`.
- **Extractability.** Recommend self-contained answers under descriptive headings so a passage can be quoted whole. Confirm `llms.txt` and `feed.xml` still describe the site accurately, since both are read directly by machines.

### 6. Backlink profile health

- Look for anything that would read as manipulation: reciprocal link arrangements, keyword-stuffed anchors, links from irrelevant or low-quality sources logged in `press_mentions.csv`.
- The goal is links from real, relevant, authoritative sites that would plausibly send a human visitor. Volume without relevance is a liability, not an asset.
- If nothing problematic is present, say so in one line. Do not manufacture a finding.

### 7. User experience as an authority signal

Easy navigation, fast loads, and stable layout increase dwell time and make a page more likely to be linked. Keep this brief and defer detail to the sibling skills, with one exception worth naming: the roughly 22 MB of unoptimized imagery is a real load-time drag on `hobbies.html` and is fair to cite as an authority cost.

## Process

1. Read every input listed above and take the notes that section describes.
2. Score each of the three authority components against what you actually found, in words rather than numbers, and state the evidence behind each judgment.
3. Identify the topic clusters that already exist in the content and name the pillar for each.
4. For each page, select the two to four techniques the evidence supports. Do not fill in every technique for every page.
5. Rank all recommendations across the whole site by leverage, meaning impact divided by effort. Internal linking and structure fixes usually rank above new content; new content usually ranks above outreach.
6. State what you could not determine without live metrics, and what the maintainer would need to check to close each gap.
7. Save the report to `assets/markdown/web-authority-report-YYYY-MM-DD.md` using today's date. Recommend in the report; do not edit site files.

## Output format

The report has four sections in this order.

**1. Authority baseline.** One table, filled from evidence on disk:

| Component | Current state | Evidence | Biggest gap |
| --------- | ------------- | -------- | ----------- |
| Link power / Organic traffic potential / Spam factors / AI retrievability | Assessment in plain words | The files and specifics that support it | The one thing most worth fixing |

**2. Topic clusters.** One table:

| Topic | Pillar page | Spoke pages | Cluster health | Action |
| ----- | ----------- | ----------- | -------------- | ------ |

**3. Recommendations.** One entry per recommendation, each carrying all of:

| Component | What to include |
| --------- | --------------- |
| Recommendation and target page(s) | The technique chosen and the exact page(s) it applies to |
| Authority component | Which of link power, organic traffic, spam factors, or AI retrievability it moves |
| Why it works here | Reasoning tied to what this page actually contains, not generic advice |
| Trade-offs and failure modes | Honest conditions under which it would not pay off |
| Steps | Ordered, concrete steps the maintainer can execute alone on a static site |
| Leverage | High, medium, or low, with the impact-versus-effort reasoning stated |
| Effort | Rough time and what it assumes |
| Hand-off | The sibling skill that owns the follow-up, or "none" |

**4. Open questions.** What could not be assessed without live data, and where to look. Keep this honest and short.

## Tone

Direct, practical, and honest. Plain language, concrete specifics over generic marketing advice. Recommend only what fits a one-person static site, use the trade-offs field to flag weak ideas rather than overselling them, and say plainly when a page is already in good shape. A short report of real findings beats a long one padded with technique names.
