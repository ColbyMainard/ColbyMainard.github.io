# Backlink Strategy

**Site:** Colby Mainard — Personal Website (`ColbyMainard.github.io`)
**Date:** 2026-06-06
**Goal:** Grow the number and quality of *referring domains* pointing at the site, in order to raise domain authority, search rankings, and qualified referral traffic.
**Scope:** All 6 HTML pages, treated as a content portfolio. This is a strategy/roadmap document — no site code is changed by it.
**Method:** The proven 2025 backlink tactics catalogued by the *backlink-strategy-planner* skill, filtered down to the subset that fits this site's actual content and adapted page-by-page so each recommendation **blends seamlessly with what is already published**.

---

## 1. Overview

Backlinks — links from *other* sites to this one — remain one of the strongest off-page ranking signals. They are earned in two ways: by publishing assets other people *want* to cite, and by proactively putting those assets in front of the right people.

**Where this site stands today.** The technical and on-page foundation is already strong (see §3). What is missing is **off-page authority**: external sites linking in. That is precisely the gap a backlink strategy closes. The site does not need more plumbing; it needs (a) a few genuinely link-worthy "hero" assets, and (b) consistent, honest outreach.

**Governing philosophy.** *Earn, don't manufacture.* Every tactic below either deepens content that already exists or builds a relationship — nothing that violates search-engine guidelines (see §10). Per Backlinko, long, comprehensive content earns **77.2% more backlinks** than short posts, and the site's guides/resources are already long-form — so the fastest path is to make existing strengths *citable* and *discoverable*, not to start from zero.

**Emphasis: a balanced mix.** Rather than betting on one theme, this plan works **four pillars** in parallel (§5): Sports/Computer-Vision, AI/ML, Cybersecurity/Privacy, and a Niche/Community pillar. Each pillar has a distinct audience and a distinct set of places that give links.

---

## 2. How to read this document

- **§3–4** describe what to leverage and what to fix first.
- **§5** defines the four content pillars.
- **§6** is the core: the tactic catalogue, mapped to specific pages, split into **on-site assets** (things to build) and **off-site outreach** (things to do).
- **§7** sequences everything into phases.
- **§8–11** cover where to get links, how to measure, what to avoid, and upkeep.

Priority/effort keys used throughout:

- **Priority:** **P0** (do first / gating) → **P1** (high) → **P2** (medium) → **P3** (opportunistic).
- **Effort:** **S** (hours) · **M** (a day or two) · **L** (a week+ / ongoing).
- **Value:** rough expected backlink payoff — **High / Med / Low**.

---

## 3. Current foundation to leverage

These are already in place and should be treated as launchpads, not redone:

- **Rich structured data** — JSON-LD `Person`, `WebSite`, `ProfilePage` on `index.html`; `Blog` + per-article `Article` schema on `assets/html/tech_takes.html`; `BreadcrumbList` + `ItemList` on guides, resources, and hobbies. This makes pages eligible for rich results and easier for others (and AI assistants) to cite accurately.
- **Canonical URLs + social cards** — every page has a `canonical`, Open Graph, and LinkedIn card tags, so shared links render cleanly (which increases click-through and re-sharing).
- **Crawlability** — `sitemap.xml`, `robots.txt`, `manifest.json`, a service worker, and an `llms.txt` that explicitly welcomes AI-search bots. New assets must be added to `sitemap.xml` and `llms.txt` (see §11).
- **Verified webmaster accounts** — Google (`google-site-verification`) and Bing (`msvalidate.01`) tags are present on `index.html`, so the **Links** reports in both consoles are available for measurement immediately (see §9).
- **Already-comprehensive content to make citable:**
  - `assets/html/guides.html` — 7 starter guides (data engineering, computer vision, generative AI, NLP, reinforcement learning, software engineering, cybersecurity).
  - `assets/html/tech_resources.html` — large curated reading lists (≈30 cybersecurity books, AI/ML, C/C++, Python, scripting, OS) plus podcast lists.
  - `assets/html/tech_takes.html` — 6 long-form opinion articles with publish/modified dates and reading-time widgets.

---

## 4. Link-readiness prerequisites (P0 — do first)

You cannot ask anyone to link to a page that looks unfinished. Two pages have visible gaps that must be closed before they are promoted. Low effort, but **gating**.

| # | Location | Issue | Fix | Effort |
| --- | ---------- | ------- | ----- | -------- |
| P0-1 | `assets/html/tech_takes.html` — Privacy section (`#PrivacyDiv`), "Threat Models" | Literal `[Placeholder — to be written: introduce threat modeling…]` block is published live | Write the threat-modeling intro the placeholder describes | S |
| P0-2 | `assets/html/tech_takes.html` — Privacy section (`#PrivacyDiv`) | Sentence ends mid-thought: "…they weigh national security as more important than" | Complete the sentence | S |
| P0-3 | `assets/html/guides.html` — Cybersecurity guide (`#cybersecurityGuideDiv`) | Truncated sentence: "Many think that cybersecurity is a monolithic topic, but there are many" (no completion before the list) | Complete the sentence (e.g., "…but there are many distinct fields:") | S |

> These are content-completeness fixes, listed here because they directly affect link-worthiness. Implementation is a separate task (this is a strategy document) — but treat them as the first things done once asset-building begins. The Privacy and Cybersecurity pieces are otherwise two of the strongest link magnets on the site, so finishing them unlocks Pillars 3 below.

---

## 5. The four content pillars

| Pillar | Built on | Audience | Why it can attract links |
| -------- | ---------- | ---------- | -------------------------- |
| **A. Sports + Computer Vision** | `tech_takes.html#productPlacementDiv`; MVP work history in `index.html#workHistoryDiv` | Sports-business press, sponsorship-measurement industry, CV practitioners | Genuinely rare first-hand expertise: valuing logo/product placement across NFL/NHL/MLB/NBA/PGA/PFL with CV. Few personal sites speak to this credibly. |
| **B. AI / ML authority** | `guides.html`; `tech_takes.html` (KANs `#KANDiv`, AGI `#AGIDiv`, quantum `#FutureOfQuantumDiv`); projects in `index.html#projectsDiv` | ML practitioners, CS students, educators | Long, plain-spoken explainers + a *verifiable* result (COVID-19 chest-X-ray model: "94% accuracy, top 2 of 20 teams") and "~$1M in cost savings" at MVP. Original research and case studies attract citations. |
| **C. Cybersecurity + Privacy** | `tech_resources.html#cybersecurityResourcesDiv`; `guides.html#cybersecurityGuideDiv`; `tech_takes.html` privacy (`#PrivacyDiv`) + crypto (`#CryptocurrencyDiv`) | Security learners, infosec community, OSINT/privacy circles | The ~30-book curated bookshelf is already a near-complete resource directory; resource pages are classic link magnets. Privacy/crypto opinions add topical depth. |
| **D. Niche / Community** | `hobbies.html` — quantum self-study (`#quantumComputingDiv`), photography (`#photographyDiv`), D&D in Austin (`#dungeonsAndDragonsDiv`), quirky history (`#historyDiv`) | Quantum learners, local Austin/tabletop community, history-curio fans | Smaller but *easy* links: local listings, niche community link lists, and highly shareable "weird history" content that earns social signals and organic mentions. |

---

## 6. Tactic catalogue, mapped to this site

The skill lists ~28 tactics. Below are the ones that fit, grouped into **on-site assets** (publish these) and **off-site outreach** (do these). Tactics from the catalogue that do **not** fit a solo static portfolio (e.g., webinar co-hosting platforms, paid event sponsorships) are intentionally omitted.

### 6A. On-site linkable assets (build into the static site)

> All are static / client-side and consistent with the project's constraints. Interactive widgets are feasible — the repo already ships client-side widgets (`assets/js/clipboard.js`, `assets/js/tech_takes_engagement.js`). These are recommendations; none are built by this document.

| Tactic (from catalogue) | Concrete asset for this site | Pillar | Where it lives / extends | Effort | Value |
| ------------------------- | ------------------------------ | -------- | -------------------------- | -------- | ------- |
| Comprehensive guides | Deepen the 7 guides with diagrams + "further reading"; each already cross-links resources | B (+C) | `guides.html` | M | High |
| Original research / data study | A short data-backed piece on **sponsorship visibility valuation** (how size/orientation/occlusion/motion-blur change a logo's value) — turns the existing qualitative `#productPlacementDiv` into citable findings | A | New section/page extending `tech_takes.html#productPlacementDiv` | L | High |
| Interactive tools / calculators | (1) **Sponsorship-value estimator** (inputs: dwell time, screen share, placement); (2) **"Which CV/ML model should I use?"** decision tool from the guides; (3) **password-entropy / crypto demo** for the security pillar | A/B/C | New small pages using the existing client-side JS pattern | L | High |
| Infographics with shareable data | One visual per pillar (e.g., "anatomy of an on-field logo's value"; "the ML model decision tree"; "personal threat-model cheat sheet") with an embed snippet | A/B/C | Add to the relevant section; host image in `assets/images/` | M | Med |
| Templates / checklists | Downloadable **data-cleaning checklist**, **ML-pipeline checklist**, **personal-OPSEC checklist** — distilled from existing guide bullets | B/C | New `assets/other/` downloads linked from guides | M | High |
| Resource directory | Position the cybersecurity reading list as *the* curated bookshelf — add levels/filters and a stable anchor so others cite it | C | `tech_resources.html#cybersecurityResourcesDiv` | S | High |
| Case studies w/ verifiable results | Write up the **COVID-19 chest-X-ray model** ("94%, top 2 of 20") and the **MVP CV cost-savings (~$1M)** as short case studies | B/A | Extend `index.html#projectsDiv` or a new page | M | Med |
| Free mini-course | Repackage the 7 guides into a **"Start in AI/ML" email or page course** (one lesson per guide) | B | New landing page referencing `guides.html` | M | Med |
| Newsworthy / expert commentary | Keep `tech_takes.html` as a *living blog* — publish a timely take when something breaks in AI/quantum/privacy; timeliness earns press links | B/C | `tech_takes.html` | M (recurring) | Med |

Why these: original research is used by **93% of B2B marketers** to build authority (CMI); **case studies can raise backlinks ~34%** (HubSpot); infographics lift referral traffic; tools and templates are inherently shareable. They also map onto content the site *already* has, so they read as natural extensions rather than bolt-ons.

### 6B. Off-site outreach & relationships (owner actions)

| Tactic | How to apply it here | Pillar | Example targets | Effort | Value |
| -------- | ---------------------- | -------- | ----------------- | -------- | ------- |
| Profile / citation links | Ensure the site is linked from every profile: GitHub (profile README), LinkedIn, dev.to, Bluesky/Mastodon, Stack Overflow, ORCID, Texas A&M alumni listings | all | (see §8) | S | High (quick) |
| Resource-page / awesome-list inclusion | Submit guides, the bookshelf, and tools to curated GitHub "awesome" lists and educators' resource pages | B/C | `awesome-*` repos, course pages | M | High |
| Expert roundups | Contribute quotes to roundups in ML, sports-tech, and security; **57% of SEO experts** rate roundups among the best link tactics (uSERP) | A/B/C | roundup callouts via journalist platforms | M | Med |
| Podcast guesting | Pitch to be a guest — the site already lists shows the owner follows (`tech_resources.html` security/AI podcasts; `hobbies.html` history podcasts); guests routinely get show-notes links | A/B/C/D | shows in §8 | M | High |
| Guest posts / cross-posts | Republish a take on dev.to / Medium / Hashnode with an author-bio link (and `rel=canonical` to the original) | B/C | dev.to, Medium | M | Med |
| Journalist requests (HARO-style) | Answer reporter queries on AI, sports sponsorship, and privacy; landed quotes link back | A/B/C | Featured, Qwoted, Help a B2B Writer | M (recurring) | High |
| Community / forum participation | Genuinely help in topical communities; link only when it answers the question | B/C/D | subreddits, Discords (see §8) | L (ongoing) | Med |
| Social thought leadership | Use LinkedIn (profile already linked site-wide) to post excerpts that drive shares and organic mentions | all | LinkedIn | L (ongoing) | Med |
| Local / niche listings | Get listed by the Austin tabletop community; **Tribe Comics & Games** is already linked from `hobbies.html` — a natural reciprocal/local relationship | D | local sites | S | Low |
| Unlinked-mention reclamation | Find places that name the owner/projects without linking; ask for the link | all | via search alerts | S (recurring) | Med |
| Broken-link building | Find dead links on resource pages in these niches; offer a guide/resource as the replacement | B/C | resource/links pages | M | Med |

---

## 7. Prioritized roadmap

Each phase is independently useful; do them roughly in order.

### Phase 1 — Link-readiness (P0)

Close the three content gaps in §4. Nothing else ships until target pages are complete.

### Phase 2 — Quick wins (P1)

- Add/confirm the site link on every profile in §8 (GitHub, LinkedIn, dev.to, ORCID, A&M alumni…).
- Submit the guides + cybersecurity bookshelf to 5–10 relevant **awesome-lists / resource pages**.
- Set up **journalist-request** accounts and a saved-search alert for unlinked mentions.
- Connect **Google Search Console** + **Bing Webmaster** Links reports (baseline referring domains).

### Phase 3 — Flagship assets (P1–P2), one per pillar

- **A:** sponsorship-valuation data study + estimator tool (extends `#productPlacementDiv`).
- **B:** model-selection decision tool + the two project case studies.
- **C:** finish + reposition the cybersecurity resource hub; publish the completed Privacy piece.
- **D:** one highly shareable "weird history" or quantum-self-study post.
Add one infographic per asset with an embed snippet. Add each new URL to `sitemap.xml` + `llms.txt`.

### Phase 4 — Sustained outreach (P2)

- Pitch 1–2 **podcasts** per pillar; offer the data study to **sports-business** outlets.
- Pursue **guest posts / roundups**; answer journalist queries weekly.
- Participate in 2–3 communities consistently.

### Phase 5 — Ongoing (P3)

- Publish timely `tech_takes` commentary when news breaks.
- Quarterly: reclaim unlinked mentions, refresh top assets, re-pitch.

---

## 8. Target link-source shortlist (white-hat only)

> Pursue links by being *useful* to these venues — never buy or trade for them (§10).

**Universal quick wins (profiles & citations):** GitHub profile README, LinkedIn, dev.to, Hashnode, Bluesky, Mastodon, Stack Overflow, ORCID, about.me/Linktree, Crunchbase, Texas A&M alumni / CS department directories.

**Pillar A — Sports + CV:** sports-business press (Sportico, Front Office Sports, SportsPro, SportBusiness, Hashtag Sports); sponsorship-measurement industry blogs (Nielsen Sports, Relo Metrics, Blinkfire — context/mentions); CV practitioner hubs (Roboflow blog, PyImageSearch, "Awesome Computer Vision" lists, Papers-with-Code-style aggregators); r/computervision.

**Pillar B — AI/ML:** "Awesome Machine Learning / Deep Learning" GitHub lists; KDnuggets; Towards Data Science (Medium); dev.to `#machinelearning`; Hacker News (Show HN for the tools); r/MachineLearning, r/learnmachinelearning; university course "resources" pages (good for the guides).

**Pillar C — Cybersecurity/Privacy:** "Awesome Security / Awesome Pentest / Awesome OSINT" lists; r/netsec, r/cybersecurity, r/OSINT, r/privacy; infosec blogs and newsletters; the security podcasts already listed in `tech_resources.html` (for guesting).

**Pillar D — Niche/Community:** Austin tech/tabletop listings and **Tribe Comics & Games** (local, already linked); r/DnD, EN World, D&D Beyond community; r/QuantumComputing + Qiskit community (quantum self-study path); highly shareable history communities (r/todayilearned, r/HistoryMemes) and the history podcasts listed in `hobbies.html` (for guesting).

---

## 9. Measurement

- **Referring domains over time** — the headline KPI. Track in **Google Search Console → Links** and **Bing Webmaster Tools** (both already verified on `index.html`). Optionally add **Ahrefs Webmaster Tools** (free for a site you own) or Moz/Ubersuggest free tiers for richer data.
- **Links per asset** — which hero asset (§6A) actually earns links; double down on what works.
- **Assisted referral traffic** — sessions arriving from referring domains (GA is already consent-gated on the site).
- **Cadence:** baseline now, then review monthly; compare against the phase you are in.

---

## 10. Guardrails — what to avoid

Backlinks must be earned. The following violate search-engine spam policies and can get the site **penalized** — never do them:

- Buying or selling links; paid links that pass ranking signals without `rel="sponsored"`.
- Private blog networks (PBNs), link farms, or large-scale link exchanges.
- Automated link generation, mass low-quality directory/bookmark spam.
- Comment/forum spam or signature links with optimized anchor text.
- Over-optimized exact-match anchor text — keep anchors natural and varied.

Good hygiene: disclose sponsored relationships; use `rel="nofollow"`/`ugc`/`sponsored` where appropriate; prioritize **a few relevant, authoritative links over many weak ones**.

---

## 11. Maintenance

- Keep the **`Last Updated`** dates on guides/takes current; refreshing a strong asset is a reason to re-pitch it.
- Whenever a new asset ships, **add its URL to `sitemap.xml` and `llms.txt`** and update internal links so authority flows to it.
- Re-run the §9 reports quarterly; reclaim new unlinked mentions; retire tactics that aren't paying off and reinvest the time in the ones that are.
- Re-audit this strategy when the site adds a new pillar/page or the content mix changes significantly.

---

*This document is a strategy/planning deliverable only — no application code, markup, or configuration was modified in producing it. Building the assets in §6A and executing the outreach in §6B are separate, follow-up tasks.*
