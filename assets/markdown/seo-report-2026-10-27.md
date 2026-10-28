# SEO Audit

Last Updated: 2026-10-27

Sibling reports in `assets/markdown/` today: the code review, accessibility, content-polisher, and feature-recommender reports. Items they own are cross-referenced, not repeated. No live metrics (rankings, impressions, search volume) were available, so none are stated. No site file was edited.

## Summary

The technical foundation is in very good shape. Every indexable page has a unique title of 59 to 62 characters, a meta description of 150 to 160 characters, a canonical URL, one `h1`, Open Graph and Twitter cards, and JSON-LD. All 41 JSON-LD blocks parse as valid JSON (checked with Node), and `sitemap.xml` lists exactly the five indexable pages. The main opportunities are internal links between the three content pages, which today connect almost entirely through the nav; question-style subheadings for the guides' informational intent; and aligning the home page's metadata with the current role.

Within each page table, recommendations are ranked highest impact first.

## index.html

Primary intent: name searches ("Colby Mainard") and role searches (machine learning engineer, computer vision, AML).

| Element | Current | Suggested | Impact (H/M/L) | Effort (H/M/L) | Why |
| ------- | ------- | --------- | -------------- | -------------- | --- |
| Internal links | The only links to `guides.html`, `tech_takes.html`, and `tech_resources.html` are in the header nav (one each). The body links to none of them. | Add two links in the body copy. At line 221, link the words "computer vision" to `./assets/html/guides.html#computerVisionGuideDiv`. At line 2367, link "real-world data" to `./assets/html/guides.html#dataEngineeringGuideDiv`. The feature report's "Latest writing" block (recommendation 2) adds the links to the stances. | H | L | The home page is the site's strongest page. Contextual body links pass more relevance than repeated nav links and tell crawlers what each target is about. |
| Meta description and Person `description` | "...specializing in computer vision for sports analytics, cybersecurity, fintech, and medical imaging." The Person node says "...sports analytics, cybersecurity, and medical imaging." | Meta: "Colby Mainard: machine learning engineer building fraud, anomaly, and anti-money-laundering models, with a background in computer vision for sports analytics. M.S. in CS, Texas A&M." (about 160 characters). Bring the Person `description` into line with it. | M | L | The current role (AML and fraud ML at RiskScout) is what an employer searching today is matching on. The snippet leads with past computer-vision work and omits it. |
| Title tag | "Colby Mainard \| Machine Learning & Computer Vision Engineer" (59 characters) | Keep as is, unless the maintainer wants to lead with the current specialty. In that case use "Colby Mainard \| Machine Learning Engineer, Fraud & Vision" (56 characters). | L | L | Already well formed. This is noted only so the title and description stay consistent if the description changes. |
| Structured data | The `Event` for the LLMday talk has `startDate`, location, organizer, and the slides as a `PresentationDigitalDocument`. | Add `"eventStatus": "https://schema.org/EventScheduled"` and `"performer": {"@id": "https://colbymainard.github.io/#person", "@type": "Person", "name": "Colby Mainard"}`, keeping `name` beside the `@id` per the site convention. | L | L | Ties the talk explicitly to Colby's entity. Past events are not eligible for event rich results, so the gain is entity association, not a snippet. |

## assets/html/tech_takes.html

Primary intent: opinion and explainer queries ("are Kolmogorov-Arnold networks better than MLPs", "is vibe coding bad", "how to stay safe with cryptocurrency").

| Element | Current | Suggested | Impact (H/M/L) | Effort (H/M/L) | Why |
| ------- | ------- | --------- | -------------- | -------------- | --- |
| Internal links | No in-body link to `guides.html`. The only link is the nav. | Add contextual links: Vibe Coding → Software Engineering guide (`guides.html#softwareEngineeringGuideDiv`). Post-Internet Privacy → Cybersecurity guide (`#cybersecurityGuideDiv`). AGI → Generative AI guide (`#generativeAIGuideDiv`). Use the guide's topic as the anchor text. | H | L | Stances and guides cover the same topics but are not wired together, so neither page lends topical weight to the other. |
| Headings (snippet targeting) | The `h3`s are short labels, such as "The Monkey's Paw Problem: Hidden Technical Debt". | Where a stance opens with a definition, add a question-form `h3` directly above it and keep the existing one-sentence answer underneath. Examples: "What is vibe coding?" (above line 1016) and "What is a Kolmogorov-Arnold network?" (above line 281). Do not rename the `h2`s, which are mirrored in `feed.xml` and the `Article` JSON-LD. | M | L | Question headings with a direct answer below are the pattern featured snippets and "People Also Ask" extract. |
| Content freshness | Six of eight stances carry a "Last Updated" date of June to August 2026. Crypto, Quantum, AGI, and Privacy all show 2026-06-19. | Re-check these five dated claims against current sources: the AGI arrival estimates (line 568), crypto regulation (line 397), and the three KAN "at the time of writing" statements (lines 314, 337, and 343). For each stance you change, update its `dateModified`, its visible date, and its `feed.xml` entry together. | M | H | Freshness matters for opinion pieces on fast-moving topics. Rated H effort because it is ongoing upkeep. |

## assets/html/guides.html

Primary intent: informational beginner queries ("what is data engineering", "computer vision for beginners").

| Element | Current | Suggested | Impact (H/M/L) | Effort (H/M/L) | Why |
| ------- | ------- | --------- | -------------- | -------------- | --- |
| Headings (snippet targeting) | Each guide opens with an `h2` such as "Data Engineering Guide" followed directly by a definition paragraph (for example line 413, "Data engineering is the discipline of..."). | Add a question-form `h3` before each opening definition: "What is data engineering?", "What is computer vision?", "What is generative AI?", "What is natural language processing?", "What is reinforcement learning?", "What is software engineering?", "What is cybersecurity?". Leave the `h2`s unchanged, since they are mirrored in the `TechArticle` JSON-LD and `feed.xml`. | H | L | The page already has the snippet-shaped answer. A question heading above it is the missing half, and "what is X" is exactly the query a beginner types. |
| Internal links | Links out to `tech_resources.html` 11 times, but to `tech_takes.html` only through the nav. | Link the Software Engineering guide's "Why GenAI Can't Kill Software Engineering" section to the Vibe Coding stance (`tech_takes.html#VibeCodingScourgeDiv`), and the Cybersecurity guide's best practices to the Post-Internet Privacy stance (`#PrivacyDiv`). | M | L | Completes the stance-guide cross-links from the other direction. |
| Structured data | Seven `HowTo` blocks with 25 `HowToStep`s, plus `TechArticle`s. | Keep them. Google retired `HowTo` rich results in 2023, so expect no snippet from them, but they remain valid schema.org and harmless. Do not add more `HowTo` markup in expectation of a rich result. | L | L | Sets expectations so effort is not spent extending markup that no longer earns a SERP feature. |

## assets/html/tech_resources.html

Primary intent: list queries ("best cybersecurity books", "best books to learn machine learning").

| Element | Current | Suggested | Impact (H/M/L) | Effort (H/M/L) | Why |
| ------- | ------- | --------- | -------------- | -------------- | --- |
| Title tag | "Best AI, Cybersecurity & Programming Books \| Colby Mainard" (59 characters) | "Best AI & Cybersecurity Books, Courses & Podcasts \| Colby Mainard" (63 characters) | M | L | The page also lists 5 certifications and 10 podcasts, which the `ItemList` JSON-LD already declares. The title currently promises only books. |
| H1 / keyword alignment | `h1`: "Curated AI, Cybersecurity & Programming Learning Resources" | Keep the `h1`. In the intro at line 264, change "Below is a curated list of AI/ML, cybersecurity, and programming resources I put together" to "Below is a curated list of the best AI/ML, cybersecurity, and programming books, courses, and podcasts I have used". Leave the `<abbr>` elements unchanged. | L | L | Matches the title's head term in the first paragraph without changing the claim. Hand wording to content-polisher. |
| Internal links | Already links to `guides.html` 10 times and `tech_takes.html` 3 times. | No change. This page is the best-wired of the three. | — | — | Recorded so the roadmap does not schedule work here. |

## assets/html/hobbies.html

Primary intent: low commercial value. Supports the author's identity (E-E-A-T) and photography image search.

| Element | Current | Suggested | Impact (H/M/L) | Effort (H/M/L) | Why |
| ------- | ------- | --------- | -------------- | -------------- | --- |
| Structured data | Five `ImageObject`s with `license`, `acquireLicensePage`, and `creditText`. | Add `"copyrightNotice": "© Colby Mainard, licensed under CC BY 4.0"` to each of the five `ImageObject` nodes (lines 91-95). Each one already has a `creator` that carries the `#person` `@id` and `name`, so leave those unchanged. | L | L | Completes the field set Google's licensable-image badge reads. |
| Performance signal | The hero image (2.1 MB) is `loading="lazy"`. | See code-review CR-7: remove `lazy` and add `fetchpriority="high"`. | L | L | A Largest Contentful Paint fix, which is a Core Web Vitals input. Credited to CR-7. |

## assets/html/privacy.html and 404.html

Both are `noindex, follow` and correctly absent from `sitemap.xml`. No changes. The privacy meta description runs 169 characters, but that does not matter for a `noindex` page.

## Site-wide technical checklist

| Item | Status | Action |
| ---- | ------ | ------ |
| Sitemap accuracy | OK | All five indexable pages are listed, and the `noindex` pages are correctly excluded. `<lastmod>` values match each page's newest JSON-LD `dateModified`. Keep moving them with content edits. (Code-review CR-12 notes that AGENTS.md mentions a sitemap header comment that does not exist.) |
| Canonical tags | OK | Present on every indexable page. Internal nav links point at `./index.html` and `../../index.html` rather than `/`. The canonical tag resolves this, so no action is needed. |
| Crawlability (`robots.txt`) | OK | The training-bot block is deliberate and stays. Live-search agents and `*` are allowed, and `/assets/markdown/` is disallowed, which keeps today's reports out of search. |
| `llms.txt` | OK | The summary, key facts, and FAQ are current (Last updated 2026-10-24). Update its date if any recommendation here ships. |
| Structured-data validity | OK | 41 blocks across 7 pages, all valid JSON. Colby's `@id` and `name` pairing is intact. Validate any edits with the Rich Results Test before deploying. |
| Feed | Needs work | The feed title names only stances while carrying guides. See code-review CR-9. |
| Page speed | OK | Self-hosted AnimeJS, deferred scripts, and a service-worker cache. The hobbies LCP image is the one regression (CR-7). |
| Search Console data | Unknown | Whether the guide or stance pages already earn impressions for "what is X" queries would change the priority of the question-heading items. Check Search Console → Performance → Pages for each URL. |
