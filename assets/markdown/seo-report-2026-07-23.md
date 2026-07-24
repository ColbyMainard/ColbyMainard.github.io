# SEO Audit Report

**Date:** 2026-07-23
**Scope:** `index.html`, `assets/html/{guides,tech_resources,tech_takes,hobbies,privacy}.html`, plus `sitemap.xml`, `robots.txt`, `llms.txt`, `feed.xml`.
**Nature of this document:** recommendations only. No site files were edited, and no existing JSON-LD block was altered.

## Executive summary

The technical SEO foundation here is stronger than most personal sites ever get: canonical URLs on every indexable page, a correct `noindex, follow` on both `privacy.html` and `404.html`, a considered `robots.txt` that separates training scrapers from live-search and AI-assistant crawlers, an `llms.txt` with a genuine FAQ block, an Atom feed, and JSON-LD on every page including seven `HowTo` blocks and six `Article` blocks. The `404.html` head even carries a comment explaining why it deliberately has no canonical. Very little needs fixing at the plumbing level.

The gains available are in three areas, in order of value:

1. **Internal linking is one-directional and thin.** `guides.html` links out to `tech_resources.html` seven times, but `tech_resources.html` links back zero times, `tech_takes.html` contains no internal links at all outside the nav, and `index.html` never links to Guides, Stances, or Resources anywhere in 2,317 lines of body copy. The site's best content is orphaned from its highest-authority page.
2. **The guides answer questions but do not ask them.** Seven `HowTo` blocks are already in place, yet every heading on the page is a noun phrase ("The Importance of Clean Data"). Question-form subheadings with a direct one- or two-sentence answer underneath are what wins People Also Ask and voice results, and this page's whole intent is informational.
3. **No `FAQPage` schema exists anywhere,** despite `llms.txt` already containing five well-written question-and-answer pairs about who the author is and what he specializes in. That content is being served to LLM crawlers and withheld from search engines.

Two pieces of dead weight are also worth clearing: the `linkedin:*` meta tags, which LinkedIn does not read, and the `keywords` meta tag, which no engine has used for ranking in over a decade.

---

## `index.html`

**Primary intent:** branded and role-based. Someone searching "Colby Mainard", or a recruiter searching "machine learning engineer computer vision sports analytics".
**Primary keyword:** `Colby Mainard machine learning engineer`

| Element | Current | Suggested | Why |
| ------- | ------- | --------- | --- |
| Title tag | `Colby Mainard — Machine Learning & Computer Vision Engineer` (59 chars) | Keep as is. | Length is in range, brand leads, and the two strongest role keywords follow. Nothing to gain. |
| Meta description | 161 characters, ending "M.S. in CS, Texas A&M." | `Colby Mainard is a machine learning engineer working in computer vision, fraud detection, and MLOps, with production work across sports analytics, fintech, and medical imaging.` (174, trim to taste) or simply cut the current version to end at "medical imaging." (139) | The current text truncates in most SERPs right around "medical imaging", so the degree credential is being cut off anyway. Ending the sentence earlier makes the snippet read as complete. |
| H1 | `Colby Mainard` | Keep. | Correct for a branded ProfilePage; exactly one `<h1>` on the page. |
| Structured data | `Person`, `WebSite`, `ProfilePage` | Add `dateCreated` and `dateModified` to the `ProfilePage` block. | Google's ProfilePage guidance uses these to judge freshness for person-entity results, and they are currently absent. |
| Structured data | `Person.hasCredential` lists AWS Certified Cloud Practitioner with `"expires": "2026-05"` | Either remove the AWS entry or keep it and confirm the body copy and the schema agree. | The body at line 2245 says "(expired)" while the schema still advertises the credential. As of today the `expires` date is in the past, so the markup contradicts the page. |
| Structured data | No `FAQPage` anywhere on the site | Add a `FAQPage` block to `index.html` built from the five Q&A pairs already written in `llms.txt` lines 25 to 38. | The answers already exist and are already public; this exposes them to rich results at effectively zero content cost. Only mark up questions whose answers also appear in visible page copy, so add a short FAQ section to the page body alongside the schema. |
| Internal links | Zero links to Guides, Technical Stances, or Technical Resources in the body. Only the nav and two outbound links (AutoDrive, Wikipedia). | Add contextual links from the sections that already have a natural hook. From Technical Skills, link "computer vision" to the [computer vision guide](assets/html/guides.html#computerVisionGuideDiv). From the Cybersecurity skill list, link to the [cybersecurity resources](assets/html/tech_resources.html#cybersecurityResourcesDiv). From Projects, link the COVID-19 model entry to the [generative AI guide](assets/html/guides.html#generativeAIGuideDiv). | The home page carries the most external authority on the site and passes none of it inward. Three or four in-context links would materially help the guide and resource pages, which are the ones with real informational search potential. |
| Headings | Section `<h2>` values are bare labels: "Work History", "Education", "Projects" | Keep the labels but consider one descriptive `<h2>` for the intro, for example "Machine Learning Engineer with Five Years in Production Systems". | The current `<h2>Machine Learning Engineer</h2>` under the `<h1>` is a job title, not a heading, and contributes nothing beyond what the title tag already says. |

---

## `assets/html/guides.html`

**Primary intent:** informational, and the highest-potential page on the site for non-branded traffic.
**Primary keyword:** `how to get started with data engineering` (and six sibling variants, one per guide)

| Element | Current | Suggested | Why |
| ------- | ------- | --------- | --- |
| Title tag | `Beginner Tech Guides: Data, AI, ML & Cybersecurity` (49 chars) | `Beginner Guides to Data Engineering, AI, ML & Cybersecurity` (58) | Adds "Data Engineering" as a full term rather than the ambiguous "Data", and uses the remaining character budget. Note the deliberate omission of the brand name here, which is correct: this page competes on topic, not on identity. |
| Meta description | 144 chars, lists all seven topics | `Plain-spoken starter guides to data engineering, computer vision, generative AI, NLP, reinforcement learning, software engineering, and cybersecurity, written by a working ML engineer.` (183, trim the last clause if needed) | The current description reads as a table of contents. Adding who wrote it is the E-E-A-T signal that differentiates this from the thousand other "beginner guide" listicles competing for the same query. |
| H1 | `Beginner Guides to Data, AI, ML & Cybersecurity` | `Beginner Guides to Data Engineering, AI, ML & Cybersecurity` | Match the revised title tag so the two reinforce the same phrase. |
| Headings | All subheadings are noun phrases: "The Importance of Clean Data", "Data Velocity", "Batch vs Real-time", "Why GenAI Can't Kill Software Engineering" | Convert to questions with a direct answer immediately below. "Why does clean data matter?" then a one- to two-sentence answer, then the existing list. "Should you process data in batches or in real time?" "Can generative AI replace software engineers?" | This is the single highest-value change on the site. The page already contains the answers; framing them as questions is what makes them eligible for People Also Ask and voice results. "Why GenAI Can't Kill Software Engineering" is already almost a question and converts trivially. |
| Structured data | Seven `HowTo` blocks, one `ItemList`, one `BreadcrumbList` | Preserve all of it. Once the headings above are converted, add a `FAQPage` block whose questions mirror the new question headings verbatim. | `HowTo` and `FAQPage` serve different result types and can coexist on one page. The question headings make the `FAQPage` markup honest, since every answer will be visible on the page. |
| Structured data | Each `HowTo` has `dateModified` but no `datePublished` | Add `datePublished` to each of the seven blocks. | Without it, engines cannot distinguish a guide written last month and never touched from one maintained continuously since 2025. |
| Internal links | Seven outbound links to `tech_resources.html`, anchored as "my list of AI resources" (used five times) | Vary the anchor text to carry the target's keyword: "AI and machine learning learning resources", "curated cybersecurity reading list", "Python learning resources". | Five identical anchors pointing at one URL waste the signal. Descriptive anchors tell the engine what the destination is about. |
| Internal links | No links to `tech_takes.html` | Link the Generative AI guide to the [AGI stance](assets/html/tech_takes.html#AGIDiv), and the Cybersecurity guide to the [privacy stance](assets/html/tech_takes.html#PrivacyDiv). | Connects the informational tier to the opinion tier, which is currently a link island. |

---

## `assets/html/tech_takes.html`

**Primary intent:** informational and opinion. Best non-branded prospects are "Kolmogorov-Arnold Networks explained" and "will AGI arrive".
**Primary keyword:** `Kolmogorov-Arnold Networks` (page-level), with per-section keywords beneath

| Element | Current | Suggested | Why |
| ------- | ------- | --------- | --- |
| Title tag | `Technical Stances on AI, Quantum & Privacy — Colby Mainard` (58) | Keep as is. | Well-formed and in range. |
| Meta description | 146 chars listing all six topics | Keep, or lead with the strongest term: `Opinions on Kolmogorov-Arnold networks, AGI hype, quantum computing's future, cryptocurrency safety, and online privacy, from a working ML engineer.` | Minor. Front-loading KANs matters because it is the only term on this page with meaningful search volume and low competition. |
| H1 | `Technical Opinions on AI, Quantum Computing & Privacy` | Keep. | Fine, and it deliberately differs from the title tag, which is acceptable. |
| Structured data | One `Blog`, six `Article`, one `BreadcrumbList` | Add `inLanguage: "en"` and a `keywords` array to each of the six `Article` blocks. | `Article` schema supports both; they are cheap and help disambiguate a page hosting six distinct articles at six anchors. |
| Structured data | Each `Article` uses the section anchor as `mainEntityOfPage` and `url` | Keep this. | It is the correct pattern for multiple articles on one URL and is already done properly. |
| Headings | Each take opens with "What are they?" / "What is quantum computing?" / "What is Artificial General Intelligence (AGI)?" | Keep, and extend the pattern. Several later subheadings are not questions: "Pros", "Cons", "The Basics of the Niche", "What to Keep in Mind". Convert to "What are the advantages of KANs?", "What are the drawbacks?", "How is sports product placement valued?" | The page already uses question headings well in its opening sections; it drops the pattern halfway through each take. Making it consistent is a small edit with direct featured-snippet upside. |
| Internal links | Zero internal links in the body. Every link on this page is outbound. | Add a related-reading link at the end of each take. The Quantum take should point at the [quantum computing hobby section](assets/html/hobbies.html#quantumComputingDiv), which already links here in the other direction. The Privacy take should point at the [cybersecurity guide](assets/html/guides.html#cybersecurityGuideDiv). The KAN take should point at the [generative AI guide](assets/html/guides.html#generativeAIGuideDiv). | This page is the site's best content and its biggest link island. It receives one internal link from the entire site (from `hobbies.html`) and emits none. |
| E-E-A-T | The disclaimer at line 210 states the content is human-written and reviewed | Keep it, and consider adding a one-line author byline with the canonical author URL at the top of the page. | The disclaimer is a genuine trust signal and unusual enough to be memorable. A visible byline reinforces the `author` property that already exists in every `Article` block. |

---

## `assets/html/tech_resources.html`

**Primary intent:** commercial-investigation and informational. "best cybersecurity books", "books to learn C++".
**Primary keyword:** `cybersecurity and AI learning resources`

| Element | Current | Suggested | Why |
| ------- | ------- | --------- | --- |
| Title tag | `Curated AI, Cybersecurity & Programming Resources` (48) | `Best Books & Certifications for AI, Cybersecurity, C++ & Python` (62, trim to 60 by dropping "&Python") | "Curated resources" is not what anyone types. "Best books" and "certifications" are the actual query shapes, and both are literally what this page contains. |
| Meta description | 155 chars, ends "recommended from experience" | Keep the ending clause, it is the differentiator. Consider: `Books, certifications, and podcasts for learning cybersecurity, AI/ML, C++, Python, scripting, and operating systems. Every item personally read, owned, or listened to.` (169, trim slightly) | The intro copy at line 121 makes a strong claim ("I purposefully limited the podcasts and book recommendations to content I either listen to, have read, or own"). That claim belongs in the snippet, since it is the E-E-A-T signal separating this from an affiliate listicle. |
| H1 | `Curated AI, Cybersecurity & Programming Learning Resources` | `Best Books, Certifications & Podcasts for AI and Cybersecurity` | Align with the revised title's query shape. |
| Structured data | `ItemList` and `BreadcrumbList` only | Consider adding `Book` entries (as an `ItemList` of `Book` objects with `name` and `author`) for at least the cybersecurity and AI sections. | The page lists dozens of books with named authors in structured table rows. That data is already normalized; marking it up is mostly mechanical and makes the page eligible for richer result treatment. |
| Structured data | No date anywhere in the schema despite a visible "Last Updated: July 20, 2026" | Add `dateModified` to the `ItemList` block. | A recommendation list's value is time-sensitive, and the freshness signal is currently visible to humans but not to crawlers. |
| Headings | Section structure is inconsistent: Cybersecurity, AI, C/C++, and Python have an `<h3>Books</h3>`; Scripting and Operating Systems drop straight from `<h2>` into a table | Add the missing `<h3>Books</h3>` to the Scripting and Operating Systems sections. | Consistent structure helps crawlers segment a very long page, and it also fixes an accessibility inconsistency flagged in the sibling report. |
| Headings | Only three `<h3>` elements on the page carry ids (`cybersecurity-certifications`, `cybersecurity-books`, `ai-books`, `cpp-books`, `python-books`); the two "Podcasts" headings have none | Give every `<h3>` a stable id following the existing pattern. | These are the deep-link targets that other sites and the author's own guides would cite. Half of them are currently unlinkable. |
| Internal links | Zero links to `guides.html` or anywhere else on the site | Add a link from each topic section back to the matching guide. Cybersecurity resources should link to the [cybersecurity guide](assets/html/guides.html#cybersecurityGuideDiv); the AI section to the [computer vision](assets/html/guides.html#computerVisionGuideDiv) and [generative AI](assets/html/guides.html#generativeAIGuideDiv) guides. | `guides.html` sends seven links here and receives nothing back. Making the relationship reciprocal strengthens both pages. |

---

## `assets/html/hobbies.html`

**Primary intent:** branded and personality. Low search volume by nature, and that is fine.
**Primary keyword:** `Colby Mainard hobbies` with a secondary shot at `books to learn quantum computing`

| Element | Current | Suggested | Why |
| ------- | ------- | --------- | --- |
| Title tag | `Hobbies — Photography, Quantum Computing, D&D \| Colby Mainard` (61) | `Hobbies: Photography, Quantum Computing, D&D — Colby Mainard` (59) | Currently the only title on the site using two different separators in one string. Pick one and get under 60 at the same time. |
| Meta description | 136 chars | Keep. | In range and accurate. |
| H1 | `Hobbies: Photography, Quantum Computing, D&D & History` | Keep. | Matches the title's intent and covers the fourth topic the title had no room for. |
| Structured data | `ItemList`, `BreadcrumbList` | Consider `ImageObject` entries for the five photographs, with the existing alt text as `description`. | The alt text on these images is unusually good and detailed. Surfacing it as structured data is the cheapest available path to image-search visibility. |
| Image filenames | `DSC_0004.JPG` through `DSC_0396.JPG` | Rename to descriptive slugs, for example `sunset-through-cedar-branches.jpg`. | Filenames are a genuine image-search ranking signal, and camera defaults carry none. This requires updating `hobbies.html`, `service-worker.js` `PRECACHE_URLS`, and a `CACHE_VERSION` bump, so batch it with other image work. |
| Internal links | One link to `tech_takes.html#FutureOfQuantumDiv` | Good. Add a second from the quantum section to the [generative AI guide](assets/html/guides.html#generativeAIGuideDiv) if a natural hook exists, but do not force it. | The existing link is well-placed and well-anchored. This page does not need more. |
| E-E-A-T | Two named books with links, a named local game shop, five named podcasts with links | Keep all of it. | This page is doing real E-E-A-T work: specific, verifiable, personally sourced recommendations. It is the strongest evidence on the site that a real person maintains it. |

---

## `assets/html/privacy.html`

**Primary intent:** none. Correctly excluded from search.

| Element | Current | Suggested | Why |
| ------- | ------- | --------- | --- |
| Robots | `noindex, follow` | Keep. | Correct. The `follow` preserves link equity flow through the page. |
| Canonical | Self-referencing canonical present alongside `noindex` | Keep. | This is the correct pairing and the `404.html` head comment already documents why. |
| Everything else | Full OG/Twitter card set, `BreadcrumbList` schema | No action. | Harmless, and useful if the policy is ever shared directly. |

---

## Site-wide technical checklist

| Item | Status | Action |
| ---- | ------ | ------ |
| Canonical tags | OK | Present on all five indexable pages plus `privacy.html`. Deliberately absent on `404.html` with the reasoning documented in the head. No change. |
| `robots.txt` | OK | Genuinely well-considered: blocks training scrapers, allows live-search and AI-assistant crawlers, and explains the split in a header comment. No change. |
| `llms.txt` | OK | Accurate as of 2026-07-22, with Key Facts, FAQ, page inventory, and a citation policy. Update the `Last updated` line whenever page content changes. |
| `sitemap.xml` | Needs work | Lists all five indexable pages, correctly omits `privacy.html` and `404.html`. But `<lastmod>` for `guides.html` reads 2026-06-17 while six of the seven `HowTo` blocks carry `dateModified: 2026-05-25` and only Generative AI says 2026-06-17. Confirm which is right and align the two. |
| `sitemap.xml` `<changefreq>` | Minor | `hobbies.html` is set to `yearly` but its `<lastmod>` is 2026-07-21, two days ago. The two contradict each other. Set it to `monthly` to match the other pages or leave `changefreq` off entirely, since Google ignores it. |
| Structured data validity | OK | Every block parsed cleanly. Preserve all existing blocks; every recommendation above is additive. |
| `FAQPage` schema | Needs work | Absent site-wide despite `llms.txt` already containing five Q&A pairs. Highest-value schema addition available. See the `index.html` table. |
| `WebSite` `SearchAction` | Deliberately absent | The `index.html` comment at line 106 correctly states no `SearchAction` is declared until real search ships. If the search feature from the feature-recommender report is built, add it then and not before. |
| `meta name="keywords"` | Needs work | Present on all six content pages. No engine has used it for ranking in over a decade; it is pure maintenance surface that must be kept in sync for zero benefit. Remove opportunistically when each page is next touched. |
| `linkedin:*` meta tags | Needs work | `linkedin:card`, `linkedin:title`, `linkedin:description`, and `linkedin:image` appear on all seven pages. LinkedIn reads Open Graph, not these; they are not a recognized namespace and are silently ignored. Roughly 28 lines of dead markup site-wide. Remove; the `og:*` tags already present do the job. |
| `og:locale` | Minor | Absent on all pages. Add `<meta property="og:locale" content="en_US">` for completeness. Low value, trivial cost. |
| Atom feed | OK | `feed.xml` is well-formed, entries are newest-first, `<id>` values are permanent tag URIs, and the feed-level `<updated>` matches the newest entry. Linked from `tech_takes.html` in both the head and the body. |
| Feed discoverability | Minor | The feed is only discoverable from `tech_takes.html`. Consider adding the `<link rel="alternate" type="application/atom+xml">` to `index.html` as well, so feed readers find it from the site root. |
| Page speed | OK, with one exception | Low external dependency count (AnimeJS from a CDN, nothing else), deferred scripts, a single stylesheet, and a service worker. The exception is `hobbies.html`, which serves five images at 3000x2000 and one at 2100x2800. Export width-capped derivatives. |
| Mobile responsiveness | OK | Viewport meta on every page, `.tableScroll` wrappers keep wide tables from breaking layout. |
| Image alt text | OK | Every image has specific, descriptive alt text. Detailed review belongs to the accessibility report. |
| HTTPS and hosting | OK | GitHub Pages serves HTTPS. Nothing to change. |
| Internal link graph | Needs work | The dominant finding of this audit. `index.html` emits zero internal body links; `tech_takes.html` emits zero and receives one; `tech_resources.html` receives seven and emits zero. Fixing this is the highest-impact non-content SEO work available and costs nothing but markup. |
