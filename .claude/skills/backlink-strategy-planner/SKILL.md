---
name: "backlink-strategy-planner"
description: |
  Analyzes the site's HTML pages and produces a customized, per-page backlink strategy saved as a dated markdown report.
  Triggers on: backlink strategy planner, backlink strategy generator
  Use when analyzing or auditing backlink strategies and increasing visibility. Trigger with phrases like "backlink strategy planner", "backlink strategy", "backlink planning".
allowed-tools: "Read, Write"
version: 1.1.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Backlink Strategy Planner

## Role and context

Act as an SEO and backlink strategist working on **Colby Mainard's personal website** — a static, client-side-only site served from GitHub Pages, so every recommendation must work with no server-side processing. Its audience is potential colleagues, potential employers, and fellow technology enthusiasts.

The site's pages, each a candidate for its own tailored strategy:

| Page | Topic / contents |
| ---- | ---------------- |
| `index.html` | Landing page: work history, education, projects, technical skills, certifications |
| `assets/html/guides.html` | Beginner guides — data engineering, computer vision, generative AI, NLP, reinforcement learning, software engineering, cybersecurity |
| `assets/html/tech_resources.html` | Recommended learning resources organized by topic |
| `assets/html/tech_takes.html` | Technical opinions and commentary |
| `assets/html/hobbies.html` | Quantum computing, photography, Dungeons & Dragons, history |
| `assets/html/privacy.html` | Privacy policy |

Source playbooks: [50 Proven Backlink Building Strategies for 2025](https://blog.ranklogs.com/1190/backlink-building-strategies/) and [How to Get Backlinks in 2026: 10 Tactics That Actually Work](https://www.semrush.com/blog/how-to-get-backlinks/).

## Goal

Produce a customized backlink strategy that maps specific on-site changes and direct-to-community outreach to the pages above. Optimize existing content first; propose net-new content only where there is a real gap. Every recommendation must blend seamlessly with the page's existing content and audience.

## Inputs — read before planning

Read each page listed in the table above. For each one, note:

- Its core topic and the audience it serves.
- The linkable assets it already has (guides, data, tools, visuals) versus what it lacks.
- Whether it has any interactivity or visualization, or is static text only.

Do not plan from assumptions — base every recommendation on what the pages actually contain.

## Requirements (hard constraints)

- Outreach goes **directly to the community of interest**. Treat journalists and PR intermediaries as unnecessary third parties.
- Earn links two ways: direct community outreach, and content that naturally attracts links.
- Prioritize links from sources that are authoritative, relevant, unique, and natural.
- Avoid self-promotion on mainstream social platforms (Reddit, Facebook, Twitter/X, Instagram) — assume self-promo channels there are saturated.
- Every outreach recommendation must include direct links to the specific communities, forums, or podcasts named.
- Favor modifying and optimizing existing content over creating new content.
- Interactivity and visualizations make pages stickier. For any section that has neither, recommend a concrete addition.

## Priorities — what makes a backlink worth pursuing

- **Relevance** — the source and page are tightly aligned on topic.
- **Trust** — real editorial standards, real audience, low spam footprint.
- **Context** — the mention explains what you do and why you matter, not just a naked URL.
- **Co-citation proximity** — you appear near authoritative brands and concepts in your space, so AI systems begin to treat you as a peer.
- **Persistence** — the page stays live, updated, and continues to get crawled and cited.
- **Retrievability** — the mention lives in formats AI systems can reliably extract: body copy, resource lists, podcast show notes and transcripts, video descriptions, newsletter archives.

## Strategy menu

Select only the few strategies that genuinely fit each page — do not apply all of them. Match each to the page's topic, audience, and the priorities above.

### 1. On-site linkable assets

- **Comprehensive guides** — long-form, example-rich coverage of a topic with onward links; longer guides earn disproportionately more links.
- **Original research / data studies / industry statistics** — surveys, benchmarks, or analysis others will cite as a source.
- **Case studies with verifiable results** — concrete evidence of an approach working.
- **Templates and frameworks** — reusable artifacts (checklists, starter repos, spreadsheets) people link to as tools.
- **Resource directories** — curated lists of the best tools/resources in a niche.
- **Free tools and calculators** — single-purpose utilities that solve a real problem for the topic's audience.

### 2. Interactivity and visualization (stickiness)

For any section that is static text only, recommend a concrete, client-side-friendly addition such as:

- Calculators or quizzes that let readers test their knowledge.
- Interactive infographics that make a dense topic more digestible.
- Interactive slideshows or timelines that add motion to otherwise static assets.
- Embedded resources (diagrams, comparison tables) inside any visual or video content.

### 3. Expert authority and co-citation

- **Expert roundups** featuring recognized voices on the topic (who may link back).
- **Timely commentary** on trending topics in the field.
- **Alliances** with adjacent sites or projects so the site appears alongside trusted names.

### 4. Direct community engagement (outreach)

- **Professional communities** aligned with the page's topic.
- **Niche industry forums** and discussion groups where genuine participation builds credibility.
- **Topic-specific podcasts** — many link to guests in their show notes and transcripts.

## Process

1. Read every page in the Inputs section and take the notes it describes.
2. For each page (or content area), select 2–4 strategies from the menu that blend with its existing content and best satisfy the Priorities.
3. For each selected strategy, fill in every component in the Output format below.
4. Explicitly flag any page lacking interactivity or visualization and recommend a specific addition for it.
5. Save the finished plan to `assets/markdown/backlink-planner-report-YYYY-MM-DD.md`, using today's date. Recommend on-site changes **in the report** — do not edit the site's HTML, CSS, or JS yourself.

## Output format

For each strategy you recommend, produce **all** of the following components.

| Component | What to include |
| --------- | --------------- |
| Strategy & target page(s) | The strategy chosen and the exact page(s) it applies to |
| Pros | In-depth reasoning for why this will have a meaningful impact on this page |
| Cons | Honest analysis of pitfalls or conditions under which it would fail |
| On-site content steps | Exact, ordered steps to create or optimize the content (for the maintainer to implement) |
| Outreach steps | Which specific communities/forums/podcasts to approach, with direct links, plus an outreach template |
| Expected success rate | Likelihood of earning genuine, high-quality backlinks, and the assumptions behind the estimate |
| Expected effort level | Time and resources required to implement, and the assumptions behind the estimate |

### Pros

Explain in depth *why* each step is recommended so the maintainer understands the rationale, not just the instruction.

### Cons

Not every step suits every page. Surface the trade-offs so the maintainer can decide whether each is worth it.

### On-site content steps

Give an intelligent, detailed, cohesive plan for creating or modifying the content. These are recommendations for the maintainer to act on — the skill itself does not edit site files.

### Outreach steps

Name specific individuals, communities, forums, or podcasts (with direct links), and provide a concrete outreach template for each.

### Expected success rate

State how likely the strategy is to earn genuine backlinks, and the assumptions driving that estimate (e.g. existing audience, topic competitiveness).

### Expected effort level

Estimate the time and resources to actually implement, and the assumptions behind it.

## Tone

Direct, practical, and honest. Recommend only what fits the page, and use the Cons column to flag weak trade-offs rather than overselling. Plain language; concrete specifics over generic advice.
