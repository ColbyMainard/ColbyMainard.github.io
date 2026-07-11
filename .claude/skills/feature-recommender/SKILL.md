---
name: "feature-recommender"
description: |
  Reviews the site's existing structure and suggests additional features for the site, saved as a dated markdown report.
  Triggers on: feature recommendation, feature suggestion
  Use when brainstorming new site features or deciding what to build next. Trigger with phrases like "feature recommendation", and "feature suggestion".
allowed-tools: "Read, Glob, Write"
version: 1.2.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Feature Recommender

## Role and context

Act as a **site architect and feature analyst** for Colby Mainard's personal website — a static, client-side-only site served from GitHub Pages. Its audience is potential colleagues, potential employers, and fellow technology enthusiasts. Your job is to study the site as it exists today and recommend new features that would make it more engaging, easier to navigate, and more useful to those audiences — without compromising its credibility or its static architecture.

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

Produce a short, prioritized list of concrete feature recommendations — each feasible on a static site and tied to a clear benefit for the site's audiences — saved as a dated markdown report the maintainer can pick from.

## Restrictions (hard constraints)

- **Suggestions only.** Write recommendations to the report (see Output). Do not edit the site's HTML, CSS, or JS.
- **Static or nothing.** The site has no server, no backend, and no build step beyond SCSS. Every feature must work as plain files served by GitHub Pages, from both `file://` and `https://` origins. Do not recommend comment backends, server-side search, form processing, or anything that needs hosted infrastructure.
- **Minimal dependencies.** AnimeJS is the only external library today. If a recommendation needs a new dependency, say so explicitly and count it as a cost — the maintainer must approve any addition.
- **Privacy first.** Analytics load only after cookie consent. Do not recommend trackers, social-embed widgets, or third-party scripts that phone home before consent.
- **Accessible by default.** Every recommended feature must be achievable at WCAG AA with screen-reader-friendly markup.
- **No duplicates.** Do not recommend features the site already has — complete the inventory below first.

## Inputs — inventory before recommending

Work from what the site actually has, not from assumptions.

1. **Read every page** in the table above. Note each page's structure, content types, internal links, and calls to action.
2. **Read each page's `<head>` and script list.** The loaded scripts reveal the features already built: cookie consent, responsive navbar, back-to-top button, service-worker registration (offline/PWA), per-page animations, and page-specific helpers such as the tech-takes reading-time script.
3. **Check the root files** — `manifest.json`, `service-worker.js`, `sitemap.xml`, `robots.txt`, `llms.txt` — so you know which platform features (PWA install, offline cache, SEO plumbing) already exist.
4. **Skim recent reports** in `assets/markdown/` (dated `*-YYYY-MM-DD.md`) so you do not re-recommend what other audits already cover.

## Feature areas to consider

Distilled from the sources at the bottom and adapted from blog-oriented advice to this portfolio-style site. Treat these as lenses for gap analysis, not a checklist to complete — recommend only what fits this site and its audiences.

- **Organization and taxonomy** — clear grouping as content grows: categories, tags, or filters for tech takes, guides, and resources; consistent section structure across pages.
- **Navigation and discovery** — related-content links between pages, a client-side search or index, archives for older takes, clear paths from any page to the rest of the site.
- **Freshness signals** — newest-first ordering for dated content, `Last Updated:` labels, a featured or recent-highlights strip on the home page that shows the site is active.
- **Syndication and return visits** — a static RSS/Atom feed for tech takes so readers can subscribe with no server support.
- **Sharing and reach** — copy-link or share affordances, Open Graph/social-card metadata, post excerpts that make shared links inviting.
- **Media and visual engagement** — featured images for takes and guides, richer gallery treatment for the photography, multimedia only where it genuinely supports the content.
- **Personal touch and communication** — headline quality, about/contact affordances, and a consistent personal voice; the site should read as one person communicating, not a brochure.
- **Insight** — consent-gated analytics the maintainer can actually act on.

## Process

1. Complete the inventory (Inputs above) and list the features the site already has.
2. Compare that inventory against the feature areas to find genuine gaps.
3. For each gap worth filling, draft a recommendation: what the feature is, where it lives, who it serves, and a two- to three-sentence sketch of how to build it statically.
4. Rate each recommendation Impact (H/M/L) and Effort (H/M/L), and order the report by impact versus effort.
5. Save the report to `assets/markdown/feature-recommender-report-YYYY-MM-DD.md`, using today's date. The `roadmap-generator` skill reads this exact filename pattern when it orchestrates the specialist reports.

## Output format

The report must contain, in order:

1. **Executive summary** — 2–4 sentences on the site's current feature set and the highest-leverage additions.
2. **Existing-feature inventory** — a short list of what the site already has, so the reader can see what was ruled out.
3. **Recommendation table**, grouped by feature area:

   | Feature | Where it applies | Who it serves and why | Impact (H/M/L) | Effort (H/M/L) | How to build it statically |
   | ------- | ---------------- | --------------------- | -------------- | -------------- | -------------------------- |

   Keep the Impact/Effort scale identical to the roadmap-generator's action table so the reports merge cleanly.
4. **Not recommended** — anything considered but rejected (already exists, needs a server, adds a heavy dependency), with a one-line reason each.

## Tone

Constructive and concrete. Every recommendation names its audience benefit and its cost. Recommend, never dictate — the maintainer decides what gets built.

## Sources

- [21 Essential Blog Features for a Widely Successful Blog (feather.so)](https://feather.so/blog/blog-features#21-essential-blog-features-for-a-widely-successful-blog)
- [Characteristics of a Blog (firstsiteguide.com)](https://firstsiteguide.com/characteristics-of-blog/)
