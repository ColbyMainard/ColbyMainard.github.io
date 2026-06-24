---
name: "backlink-strategy-planner"
description: |
  Analyzes the site's HTML pages and produces a customized, per-page backlink strategy saved as a dated markdown report.
  Triggers on: backlink strategy planner, backlink strategy generator
  Use when analyzing or auditing backlink strategies and increasing visibility. Trigger with phrases like "backlink strategy planner", "backlink strategy", "backlink planning".
allowed-tools: "Read, Write"
version: 1.2.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Backlink Strategy Planner

## Role and context

Act as an SEO and backlink strategist working on **Colby Mainard's personal website** — a static, client-side-only site served from GitHub Pages, so every recommendation must work with no server-side processing. Its audience is potential colleagues, potential employers, and fellow technology enthusiasts. When choosing strategies, pick only relevant techniques - not all techniques are equally valuable for all pages.

The site's pages, each a candidate for its own tailored strategy:

| Page | Topic / contents |
| ---- | ---------------- |
| `index.html` | Landing page: work history, education, projects, technical skills, certifications |
| `assets/html/guides.html` | Beginner guides — data engineering, computer vision, generative AI, NLP, reinforcement learning, software engineering, cybersecurity |
| `assets/html/tech_resources.html` | Recommended learning resources organized by topic |
| `assets/html/tech_takes.html` | Technical opinions and commentary |
| `assets/html/hobbies.html` | Quantum computing, photography, Dungeons & Dragons, history |
| `assets/html/privacy.html` | Privacy policy |

Source playbooks:

- [50 Proven Backlink Building Strategies for 2025](https://blog.ranklogs.com/1190/backlink-building-strategies/)
- [How to Get Backlinks in 2026: 10 Tactics That Actually Work](https://www.semrush.com/blog/how-to-get-backlinks/)
- [Best 20 Backlink Strategies to boost SEO & Branding](https://www.manuelawillbold.com/top-backlink-strategies-for-seo/)
- [Link-Building Strategies](https://nowthisdigital.com/link-building-strategies/)

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

Keep any such addition intuitive and dependency-light so it runs from both `file://` and `https://` (the site's only external library is AnimeJS). Interactive assets raise dwell time and are themselves linkable — once one is live, it becomes a target for the outreach steps below.

### 3. Expert authority and co-citation

- **Expert roundups** featuring recognized voices on the topic (who may link back).
- **Timely commentary** on trending topics in the field.
- **Alliances** with adjacent sites or projects so the site appears alongside trusted names.

### 4. Direct community engagement (outreach)

- **Professional communities** aligned with the page's topic.
- **Niche industry forums** and discussion groups where genuine participation builds credibility.
- **Topic-specific podcasts** — many link to guests in their show notes and transcripts.

### 5. Skyscraper technique

Find an existing page on the same topic that already attracts quality backlinks, publish something clearly more thorough and current, then ask the sites linking to the weaker page to link to the better one instead. Best suited to topics where the maintainer has the depth to genuinely out-research the incumbent.

- Identify a well-linked competitor page, using the page's own subject as the seed.
- Build a markedly better version on-site: deeper coverage, current examples, original diagrams or data.
- Reach out directly to the specific sites linking to the weaker page (name concrete targets and supply a template in the Output format). The aim is citations and referral traffic from peers and educators — not sales leads.

### 6. Internal linking

A supporting on-site tactic: link related pages to one another with descriptive anchor text so authority and context flow between them and readers discover more of the site. This page set is small and thematically connected — a guide, its matching `tech_resources` section, and a related `tech_takes` opinion naturally reference one another.

- Add a link only where the connection is real (guide → resource list for the same topic → relevant opinion piece), never as filler.
- Use specific, descriptive anchors ("reinforcement learning guide"), not repeated exact-match keywords — keyword-stuffed anchors read as manipulation.
- This tactic is on-site only; its **Outreach steps** entry in the Output format is "N/A — internal."

### 7. Content syndication

Republish a full piece (a guide or opinion) on a developer-publishing platform that honors a canonical link — Medium, dev.to, or Hashnode — with the canonical URL pointing back to the GitHub Pages original. This reaches a second audience and earns a contextual link without a duplicate-content penalty. It is distinct from the social self-promotion ruled out in Requirements: syndication republishes the whole article under a canonical tag rather than dropping promo links into a feed. LinkedIn's article feature is a reasonable professional-network option for the same purpose.

- Syndicate selectively — one or two pieces strong enough to stand alone, not the whole site.
- Set the canonical to the on-site URL so the original keeps its ranking authority.
- Because the site is static, the canonical lives in the syndication platform's own canonical field; there is no server redirect to manage.

### 8. Pillar pages and definitive-resource positioning

Consolidate scattered coverage of one core topic into a single comprehensive hub page that becomes the obvious thing to link to. Where the site currently spreads a topic across a guide, a resource list, and an opinion, a well-structured pillar page (linking out to those details) gives other sites one authoritative URL to cite instead of several thinner ones.

- Choose a topic the site covers in depth and that others in the field actively reference (e.g. one of the AI/ML or cybersecurity areas).
- Structure it as a definitive overview that links out to the site's existing detailed pages (pairs naturally with Internal linking).
- Keep it evergreen — revisit and update it so it stays the current best reference and keeps earning citations.

### 9. Question-targeted ("what is" / "how to") series

Add concise entries that answer the foundational "what is X" and "how do I do Y" questions in the site's topics, formatted to win question-based searches and to be quotable by AI answer engines. The guides page already embeds `HowTo` structured data — extend that pattern rather than inventing a new one.

- Target real questions a beginner in the topic asks; the guides' existing audience is the model.
- Answer each directly and self-containedly so the passage is extractable as a citation.
- Mark up new how-to entries with the same `HowTo`/`FAQ` JSON-LD the site already uses, keeping the structured data valid.

### 10. Sourced expert quotes in existing content

Strengthen an existing page by weaving in a short, properly attributed quote from a recognized voice on the topic, then letting that person know they are featured — many will share or link to the page. This differs from the expert roundup in #3: no new post is solicited; you cite a public statement already on record and add credibility to content that already exists.

- Quote real, attributable sources (a talk, paper, or post) and link to the original.
- Notify the person that the mention is live — briefly, and without a link request.
- Use sparingly, only where the quote genuinely supports the point; decorative quotes add nothing.

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

Name specific individuals, communities, forums, or podcasts (with direct links), and provide a concrete outreach template for each. For a purely on-site tactic such as internal linking, mark this "N/A — internal" rather than inventing outreach.

### Expected success rate

State how likely the strategy is to earn genuine backlinks, and the assumptions driving that estimate (e.g. existing audience, topic competitiveness).

### Expected effort level

Estimate the time and resources to actually implement, and the assumptions behind it.

## Tone

Direct, practical, and honest. Recommend only what fits the page, and use the Cons column to flag weak trade-offs rather than overselling. Plain language; concrete specifics over generic advice.
