# Backlink Strategy Plan — colbymainard.github.io

*Prepared: 2026-06-08 · Generated with the `backlink-strategy-planner` skill*

## Purpose & How to Use This Document

This is a customized backlink strategy for [colbymainard.github.io](https://colbymainard.github.io). It is tailored to the site's **existing** content (7 technical guides, a 50+ book curated bibliography, 6 long-form opinion essays) and the author's genuine expertise: machine learning, computer vision (sports analytics, medical imaging, facial recognition), cybersecurity, and privacy.

**The problem it solves:** the site's *on-site* SEO is already strong — sitemap, JSON-LD, Open Graph, and a deliberate `robots.txt` that blocks model-training crawlers while **allowing live AI-search assistants** (Claude, ChatGPT, Perplexity). What is missing is *off-site authority*: relevant, trusted sites linking to and citing the content. This plan closes that gap.

**How to use it:**

1. Read the **Link-Quality Bar** — it is the filter every prospect must pass before you spend effort.
2. Work the **7 strategies** in the order the **30/60/90-day roadmap** suggests.
3. Use the **pitch templates** verbatim (lightly personalized) for outreach.
4. Track outcomes with the **Success Metrics** sheet.
5. Pull concrete destinations from the **Named Targets appendix**.

**Scope note:** this document is the *strategy*. Actually building the new assets (tools, research, templates) and sending outreach are downstream execution steps described here but performed separately. This file is an internal planning artifact (the `/assets/markdown/` directory is not rendered to the live site).

---

## The Link-Quality Bar

Borrowed from the planner's six priorities. Before contacting a prospect or building an asset, confirm it can realistically produce a link that scores well on **most** of these. Skip anything that fails *Relevance* or *Trust* outright.

| Priority | Question to ask | Pass / fail signal |
| --- | --- | --- |
| **Relevance** | Is the source page tightly about ML / CV / security / privacy / quantum / history? | Topical match in the page's own H1 and body |
| **Trust** | Real editorial standards, real audience, low spam footprint? | Human-curated, not a link farm or auto-generated directory |
| **Context** | Will the mention explain *what the content is and why it matters*, not just drop a URL? | Surrounding sentence describes the resource |
| **Co-citation proximity** | Does the author appear near recognized names/brands in the space? | Listed alongside known tools, books, or experts |
| **Persistence** | Will the page stay live, get re-crawled, and keep being cited? | Maintained list, archived newsletter, evergreen show notes |
| **Retrievability** | Can AI systems extract the mention? | Body copy, resource lists, transcripts, show notes, newsletter archives — *not* images-only or login-walled |

---

## The AI-Search Angle (why retrievability is weighted heavily here)

Because this site's `robots.txt` **invites** AI-search user agents (Claude-User, ChatGPT-User, Perplexity-User, etc.) while blocking training scrapers, the highest-leverage backlinks are ones that **AI assistants can read and cite in real time**. That reshapes priorities:

- Favor **text-based** mentions: resource lists, podcast **show notes + transcripts**, YouTube **descriptions**, and **newsletter archives** — all of which AI systems index reliably.
- A mention on a page that sits *near* authoritative brands (e.g., listed beside PyTorch, Qiskit, or a well-known book) teaches AI systems to treat the author as a peer (co-citation).
- **Validation loop:** every 4–6 weeks, ask Claude / ChatGPT / Perplexity questions the site should answer ("good starter guide for computer vision data normalization," "is AGI overhyped — engineer perspectives," "responsible cryptocurrency OPSEC") and record whether the site is surfaced or cited. This is the truest measure of success for this site, more so than raw domain count.

---

## Strategy 1 — Resource-Page & "Awesome-List" Placements

*Promote existing content. Anchored to: the guides, the bibliography, and the essays.*

**Pros.** This is the fastest, highest-probability win available. Curated resource lists and "awesome-*" repositories **exist specifically to collect good resources**, so a relevant, well-described submission is welcomed rather than resisted. The site's guides and 50+ book bibliography are exactly the kind of evergreen, non-promotional reference material these lists prize. Links from popular awesome-lists score extremely well on the quality bar: they are topically relevant, human-curated (trust), place the author **beside recognized tools and books** (co-citation), persist for years, and are pure body-text (maximally retrievable by AI). One accepted entry on a high-traffic list can also seed dozens of secondary mentions as that list gets mirrored and quoted.

**Cons.** Many awesome-lists are strict about scope and format — a submission that reads as self-promotion, duplicates an existing entry, or ignores `CONTRIBUTING.md` will be rejected or ignored. Some lists are abandoned (dead PRs sit for months), which fails the *persistence* test. There is also a saturation risk: a generic "personal blog" entry adds little; the entry must point to a **specific, genuinely useful page** (e.g., the cybersecurity guide), not the homepage.

**Internal Code/Content Steps.**

1. Turn each linkable page into a **citable unit**: confirm every guide and essay has a stable in-page anchor (`id`), a one-sentence summary near the top, and a visible `dateModified` (the JSON-LD already carries dates — surface them in the copy too).
2. Add a small, unobtrusive **"Cite or link this"** hint to the guides and essays (suggested anchor text + URL) so anyone who wants to link has zero friction.
3. Build a one-line "pitch description" for each asset (≤ 25 words) you can paste into list submissions, written in the neutral, third-person tone these lists use.
4. Pick the single strongest page per list — usually the **cybersecurity guide**, the **bibliography**, or the **computer-vision guide**.

**External Reach-out Steps.** Submit via PR or issue to the lists in the appendix, matched to topic:

- ML / CV → [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning), [awesome-computer-vision](https://github.com/jbhuang0604/awesome-computer-vision), [awesome-deep-vision](https://github.com/kjw0612/awesome-deep-vision)
- Security → [awesome-security](https://github.com/sbilly/awesome-security), [awesome-infosec](https://github.com/onlurking/awesome-infosec), [awesome-web-security](https://github.com/qazbnm456/awesome-web-security), [paulveillard/cybersecurity](https://github.com/paulveillard/cybersecurity)
- Quantum → [awesome-quantum-computing](https://github.com/desireevl/awesome-quantum-computing), [nathanshammah/awesome-quantum-computing](https://github.com/nathanshammah/awesome-quantum-computing)
- Privacy → the [Privacy Guides](https://www.privacyguides.org/) ecosystem + the awesome-privacy list

Also run **resource/broken-link reclamation**: find university course pages, bootcamp reading lists, and existing "best resources for X" posts; where they link to a dead or weaker resource, email the maintainer offering the relevant guide/bibliography as a fix (see Pitch Template 3). Read each list's `CONTRIBUTING.md` first; follow its section + formatting rules exactly.

**Expected Success Rate.** **High.** These channels are designed to accept good entries; with correct targeting and formatting, a meaningful fraction will land.

**Expected Effort Level.** **Low–Medium.** Mostly research and short, well-formatted submissions; no new content required.

---

## Strategy 2 — Podcast Guest Appearances

*Promote existing expertise + build relationships. Anchored to: security, ML/CV, privacy, quantum, and history — domains where the site already curates podcasts.*

**Pros.** Podcasts are an unusually strong fit here for two reasons. First, the site **already lists and links podcasts** it values (cybersecurity shows on the resources page, history shows on the hobbies page) — that is a warm, credible reason to reach out ("I'm a listener and could contribute on X"). Second, podcast **show notes and transcripts** are among the most AI-retrievable backlink formats that exist, and a guest spot typically yields a dofollow link plus a bio mention beside the host's established brand (co-citation). The author has rare, specific stories to tell — computer vision for sports product-placement valuation, facial-recognition R&D, responsible crypto OPSEC, an engineer's skeptical take on AGI — which differentiate the pitch from generic "AI expert" requests.

**Cons.** This is a slower, lower-yield-per-attempt channel. Flagship shows receive enormous inbound and rarely book early-career engineers, so pitching them mostly wastes effort. Booking-to-publish timelines can stretch weeks or months (hurts short-term metrics). Some shows give only a verbal mention or a nofollow link. And a weak on-air performance can do reputational harm, so prep matters.

**Internal Code/Content Steps.**

1. Create a **one-page guest kit**: 2–3 sentence bio, headshot, 3–4 topic angles, and for each angle the **canonical essay URL** that should appear in show notes (e.g., product-placement angle → the sports-marketing essay; AGI angle → the AGI essay).
2. Prepare a **transcript-friendly resource list** (3–5 links with one-line descriptions) you can hand the producer so the site lands in the notes verbatim.
3. Rehearse each angle to a tight 5-minute version; record a short sample clip if a show requests one.

**External Reach-out Steps.** Pitch in tiers (realistic first):

- **Tier 1 (niche / actively books guests):** Security Happy Hour, Cybercrime Magazine segments, smaller ML/data practitioner shows, and — strongest of all — the **specific cybersecurity podcasts already linked on `tech_resources.html`** and **history podcasts on `hobbies.html`**, since you are a genuine listener.
- **Tier 2 (mid-size):** [Practical AI](https://practicalai.fm/), [TWIML AI](https://twimlai.com/podcast/twimlai/), [Smashing Security](https://www.smashingsecurity.com/), [CyberWire](https://thecyberwire.com/).
- **Tier 3 (aspirational, low odds):** [Latent Space](https://www.latent.space/), [Darknet Diaries](https://darknetdiaries.com/), [Risky Business](https://risky.biz/).

Use Pitch Template 1; lead with the listener connection and the single most distinctive angle. After airing, confirm the link is in the show notes/transcript.

**Expected Success Rate.** **Medium** for Tier 1/2, **Low** for Tier 3. Niche shows that actively seek guests convert far better than flagships.

**Expected Effort Level.** **Medium.** Pitch prep is light, but recording, scheduling, and follow-through add up per booking.

---

## Strategy 3 — Free Interactive Tools / Calculators

*Build new assets (client-side JS only — honors the static-site / no-Python constraints). Anchored to: the privacy essay, the CV guide, and the crypto essay.*

**Pros.** A genuinely useful free tool is the most **naturally** link-attracting asset type: people link to tools without being asked, embed them, and reference them in answers and resource lists. Tools are also **persistent and reusable**, so they accrue links for years. Each candidate below converts existing written expertise into something interactive, deepening the site's topical authority and giving every other strategy (forums, awesome-lists, podcasts) a concrete thing to point at. Because they're client-side, they fit GitHub Pages perfectly with no backend or CORS exposure.

**Cons.** This is the highest up-front build effort in the plan, and a half-baked tool earns nothing. Tools must be obviously correct and bug-free or they damage credibility. There's a discovery problem — a tool with no audience gets no links — so each must ship alongside Strategies 1 and 7 to seed initial visibility. Maintenance is an ongoing cost (a broken tool is worse than none). Avoid scope creep: ship one small, polished tool before starting the next.

**Internal Code/Content Steps.**

1. Build one of these first (highest value, lowest complexity): a **Privacy / OPSEC self-assessment** that scores a user's habits and links each recommendation to the relevant tactic in the privacy essay.
2. Then consider a **CV model-selection helper** (answer a few questions about problem class → recommended approach, sourced from the computer-vision guide) and a **crypto-safety / wallet-choice checklist** (from the crypto essay).
3. Implement as dependency-light **client-side JavaScript** in `/assets/js/` with SCSS in `/assets/css/` (compile via `sass`; the user runs the compile step). AnimeJS is acceptable for polish.
4. Give each tool its **own URL**, a canonical tag, an OG image, and `WebApplication` / `SoftwareApplication` JSON-LD.
5. Add a copy-paste **embed snippet** (iframe or script) so other sites can host it *with attribution back to the canonical URL*.
6. Add each new tool URL to `sitemap.xml`.

**External Reach-out Steps.**

- Submit each tool to the **tools/utilities sections** of the relevant awesome-lists (Strategy 1 appendix).
- Post a **"Show HN"** on [Hacker News](https://news.ycombinator.com/) and share in the relevant communities from Strategy 7 (value-first).
- Suggest the tool to newsletters that feature tools (Strategy 6 targets), and to authors of "best privacy/CV tools" resource posts.

**Expected Success Rate.** **Medium–High** once a tool is discovered — tools are inherently linkable and embeddable.

**Expected Effort Level.** **High.** Real design, build, and test work per tool.

---

## Strategy 4 — Original Research / Data Analysis Piece

*Build a new asset. Anchored to: the KANs essay, the sports product-placement CV niche, or privacy.*

**Pros.** Original data is the most **durable** backlink magnet there is: when you publish numbers nobody else has, others *must* cite you to use them, and those citations keep compounding for years (high persistence + co-citation with researchers). It is also the strongest differentiator — it elevates the site from "good explanations" to "primary source." The candidates play directly to the author's edge: a small **KAN-vs-MLP** benchmark extends an essay the site already ranks for, and a **sports product-placement CV** measurement study draws on genuinely scarce industry knowledge from MVP work.

**Cons.** Highest risk-adjusted effort in the plan. Research is slow to produce and slow to earn links (months, not weeks), so it is a long-term play, not a quick win. Methodology must be defensible — sloppy numbers invite criticism and harm credibility. There is execution risk (a benchmark may produce an uninteresting result), and it competes for the same scarce time as the tools in Strategy 3, so it should be sequenced *after* the quick wins.

**Internal Code/Content Steps.**

1. Pick **one** tightly scoped question (e.g., "On 2–3 small tabular/vision tasks, how do KANs compare to size-matched MLPs on accuracy, interpretability, and training speed?").
2. Run it reproducibly; publish a **methodology section**, a clear **chart + table**, and the **raw dataset/results** as a download.
3. Add a **"How to cite this"** block (plain-text + BibTeX) and `Dataset` / `ScholarlyArticle` JSON-LD; give it a canonical URL and add it to `sitemap.xml`.
4. Cross-link the new piece from the related essay and vice-versa to concentrate topical authority.

**External Reach-out Steps.**

- Announce to the ML newsletters in the appendix ([Import AI](https://jack-clark.net/), [Data Elixir](https://dataelixir.com/)) via Pitch Template 4 — original data is exactly what they curate.
- Share in topical communities (Strategy 7): [Cross Validated](https://stats.stackexchange.com/), the [Hugging Face forum](https://discuss.huggingface.co/), [Hacker News](https://news.ycombinator.com/).
- Offer the dataset to Papers-with-Code-style indexes and add it to the *datasets* section of relevant awesome-lists.

**Expected Success Rate.** **Medium**, but the links it earns are unusually high-quality and long-lived.

**Expected Effort Level.** **High.** Genuine research, writing, and reproducibility work.

---

## Strategy 5 — Downloadable Templates, Frameworks & Infographics

*Build new assets that extend existing guides. Anchored to: the cybersecurity guide, the CV guide, and the data-engineering guide.*

**Pros.** Templates and checklists are **highly shareable** because they save the reader work — people link to and republish "the [X] checklist" as a service to their own audience. They are low-risk to produce (no research uncertainty) and convert content the site already has into standalone, linkable artifacts. Infographics add a second, visual retrieval surface and earn "embed-with-credit" links from bloggers. Each artifact gets its own URL, multiplying the site's linkable surface area without much new writing.

**Cons.** Templates are easier to copy *without* attribution, so some value leaks unless you bake in a footer credit + canonical URL. Infographics are **image-based**, which is the weakest format for AI retrievability — so every infographic must ship with a text equivalent (caption, alt text, and the same data as an HTML table) or it scores poorly on the quality bar. Quality expectations are high; an ugly or inaccurate template reflects badly.

**Internal Code/Content Steps.**

1. Convert the **cybersecurity guide's 11-item best-practices list** into a clean, printable **checklist page** + downloadable file; do the same for a **CV data-normalization checklist** and a **data-engineering PII-handling template**.
2. Build 1–2 **infographics** (privacy threat-model; CV problem-classes) — and *always* pair each with alt text, a caption, and an HTML-table version of the same data.
3. Give each artifact its own URL, OG image, and a footer line: "Source: colbymainard.github.io — link back appreciated."
4. Provide a ready **embed code** (image + credit link) for the infographics; add all new URLs to `sitemap.xml`.

**External Reach-out Steps.**

- Submit checklists/templates to resource lists (Strategy 1).
- Offer infographics to bloggers and newsletters for **embed-with-attribution** (Pitch Template 4).
- Share in relevant communities (Strategy 7) where someone is asking the question the template answers.

**Expected Success Rate.** **Medium–High.** Practical, reusable artifacts attract links steadily.

**Expected Effort Level.** **Medium.** Design + packaging work, but no research risk.

---

## Strategy 6 — Expert-Roundup Contributions & Trend Commentary

*Relationships + lightweight content. Anchored to: all essays; timely topics (KANs, AGI, privacy regulation).*

**Pros.** This converts the author's existing **opinion essays** into outreach currency. Community-run roundups ("we asked N practitioners about X") and link-curating newsletters are actively *looking* for sharp, quotable expert takes — supplying one is low effort and yields a contextual, attributed link beside other named experts (excellent co-citation). Newsletter archives are persistent and highly retrievable. Publishing **timely commentary** when news breaks (a new KAN result, an AGI announcement, a privacy regulation) lets the site ride existing search/AI interest and gives curators a fresh reason to link.

**Cons.** Depends on opportunities existing *now* — roundups appear on others' schedules, so this is opportunistic rather than reliably on-demand. Newsletter features are at the curator's discretion and often nofollow (still valuable for retrievability/referral, but weaker for ranking). Trend commentary has a short shelf life and demands fast turnaround to be relevant. Per the planner's rules, all of this must go **direct to community curators — never routed through journalists/PR**.

**Internal Code/Content Steps.**

1. Maintain a short **"expert positions" file**: a 2–3 sentence quotable take per core topic (KANs, AGI, privacy, crypto safety, CV in sports) with a matching essay URL — so you can respond to roundup calls within minutes.
2. Set a light **commentary cadence**: when a relevant story breaks, publish a short post extending the existing essay (and cross-link it).
3. Keep an attribution line ready: "Colby Mainard, ML engineer — colbymainard.github.io."

**External Reach-out Steps.**

- Watch for and answer community-run roundup calls in ML/security circles; supply the quote **inline** so it's zero-effort to publish (Pitch Template 4).
- Pitch standout essays/commentary to link-curating newsletters: [Import AI](https://jack-clark.net/), [Data Elixir](https://dataelixir.com/), [tl;dr sec](https://tldrsec.com/).
- Engage directly with community curators and bloggers running the roundups — not press contacts.

**Expected Success Rate.** **Medium**, and it builds named-author recognition that compounds.

**Expected Effort Level.** **Low–Medium**, ongoing.

---

## Strategy 7 — Niche Community & Forum Engagement (Non-Social)

*Relationships. Anchored to: all verticals. The connective tissue that gives every other strategy an audience.*

**Pros.** Genuine participation in **communities of interest** builds the reputation that makes all other outreach land — and provides natural, contextual link opportunities when answering a question the site already addresses. These venues (Hacker News, Lobsters, topic Stack Exchanges, the Hugging Face and Privacy Guides forums) are exactly where the author's target readers and the maintainers of awesome-lists/newsletters/podcasts already hang out, so reputation here pays off across the whole plan. Stack Exchange answers in particular are evergreen and highly retrievable.

**Cons.** This is the channel most easily done *wrong*. Drive-by link-dropping is unwelcome and can get the author banned or shadow-flagged; value must come first, links only where genuinely useful. It compounds slowly and requires authentic, sustained presence — it is not a campaign you can batch. Many community links are nofollow (still good for referral + retrievability, weaker for ranking). **Crucially:** these are *communities of interest*, explicitly distinct from the saturated social platforms the planner excludes (Reddit, Facebook, Twitter/X, Instagram), which this plan does **not** use for self-promotion.

**Internal Code/Content Steps.** None beyond keeping the guides, essays, tools, and research ready to reference. The only "internal" work is having genuinely link-worthy pages so that when you do link, it adds value.

**External Reach-out Steps.** Participate authentically, link only where it directly answers the question:

- General technical: [Hacker News](https://news.ycombinator.com/) (incl. "Show HN" for the Strategy 3 tools), [Lobsters](https://lobste.rs/).
- Q&A (evergreen): [Quantum Computing SE](https://quantumcomputing.stackexchange.com/), [Security SE](https://security.stackexchange.com/), [Cross Validated](https://stats.stackexchange.com/).
- Topic forums: [Hugging Face forum](https://discuss.huggingface.co/), [Privacy Guides forum](https://discuss.privacyguides.net/).

Read and follow each venue's self-promotion rules; aim for a high ratio of helpful answers to self-links.

**Expected Success Rate.** **Low–Medium** per link, but it raises the conversion rate of every other strategy.

**Expected Effort Level.** **Medium**, ongoing and must be authentic.

---

## Add-On: Outreach Pitch Templates

Send from the site's advertised channels — email `colby.mainard@proton.me` or [LinkedIn](https://www.linkedin.com/in/colby-mainard/). Personalize the bracketed fields; keep them short.

### Template 1 — Podcast Guest Pitch

> **Subject:** Guest idea for [Show Name]: [computer vision for sports product-placement valuation]
>
> Hi [Host],
>
> I'm a regular listener — [genuine specific reference to an episode]. I'm an ML engineer (M.S., Texas A&M) who's worked on computer vision for professional sports analytics and facial-recognition R&D, and I think one of these angles could resonate with your audience:
>
> - **[Angle 1]** — [one line]. Background: [essay URL]
> - **[Angle 2]** — [one line]. Background: [essay URL]
>
> Happy to send a transcript-friendly resource list for your show notes and work around your schedule. More at colbymainard.github.io.
>
> Thanks,
> Colby Mainard

### Template 2 — Awesome-List / Resource-Page Submission

> **PR title:** Add "[Cybersecurity Starter Guide]" under [Learning › Guides]
>
> **PR body:** Adds a free, no-signup [starter guide to cybersecurity covering best practices, sub-fields, and 20+ standard tools]. Fits the [Guides] section; follows the formatting in CONTRIBUTING.md. Link: [URL]. Not affiliated with any product — it's an educational reference.

### Template 3 — Broken-Link / Resource Suggestion

> **Subject:** Small fix for your [resources] page
>
> Hi [Name],
>
> Thanks for maintaining [page] — I used it recently. Quick heads-up: the link to [dead resource] under [section] looks broken ([URL] → 404). If useful, [this guide/bibliography] covers the same ground and is actively maintained: [URL]. Either way, thought you'd want to know about the dead link.
>
> Best, Colby

### Template 4 — Roundup Contribution / Newsletter Feature

> **Subject:** 2-sentence take on [topic] for [roundup/newsletter]
>
> Hi [Name],
>
> Saw you're collecting takes on [topic] — here's a ready-to-use quote:
>
> *"[The 2–3 sentence quotable take, inline so it's zero effort to publish.]"*
> — Colby Mainard, ML engineer, colbymainard.github.io
>
> Fuller reasoning here if helpful: [essay URL]. Glad to expand on any of it.
>
> Best, Colby

---

## Add-On: Phased 30/60/90-Day Roadmap

| Phase | Focus | Actions |
| --- | --- | --- |
| **0–30 days** — Quick wins | Harvest the easy, high-probability links | Vet targets against the Link-Quality Bar · Strategy 1 placements for the guides + bibliography · run broken-link reclamation · stand up the metrics sheet · draft the podcast guest kit (Strategy 2) · begin authentic presence in 2–3 communities (Strategy 7) |
| **30–60 days** — Build + relationships | Create the first link-magnets and warm up outreach | Ship the **first tool** (privacy/OPSEC self-assessment, Strategy 3) and **one template/infographic** (Strategy 5) · begin Tier-1 podcast pitching (Strategy 2) · supply roundup quotes as they appear (Strategy 6) · keep community engagement steady |
| **60–90 days** — Compounding authority | Land the durable, high-value citations | Publish the **original-research piece** (Strategy 4) · establish a commentary + newsletter cadence (Strategy 6) · pitch a second tool/template · **review metrics** and double down on whatever channel produced the best links |

---

## Add-On: Success Metrics & Tracking

Track in a simple spreadsheet; GA4 is already installed on the site for the traffic metrics.

| Metric | What to record | Cadence |
| --- | --- | --- |
| **Referring domains** | Count of unique linking domains + net new this period | Monthly |
| **Link quality** | Per new link: relevance, domain trust, dofollow/nofollow, surrounding context | As earned |
| **AI-search citations** | Run a fixed set of topic queries in Claude / ChatGPT / Perplexity; record if/where the site is cited | Every 4–6 weeks |
| **Referral traffic** | Sessions from referring domains (GA4) | Monthly |
| **Tool engagement** | Visits + completions for each Strategy 3 tool (GA4 events) | Monthly |
| **Outreach funnel** | Pitches sent → replies → links won, by strategy | Per campaign |

**Leading indicator to watch:** AI-search citations. Given the AI-friendly `robots.txt`, being *quoted by assistants* is the clearest signal the strategy is working, often before traditional ranking moves.

---

## Guardrails

- **Direct to community, never via journalists/PR.** All outreach targets curators, hosts, maintainers, and forum members directly.
- **No self-promotion on saturated social platforms** (Reddit, Facebook, Twitter/X, Instagram). The forums in Strategy 7 are communities of interest engaged value-first — not link-dropping venues.
- **Quality bar before effort.** Pursue authoritative, relevant, unique, natural links; skip low-trust directories and link farms.
- **Be transparent about authorship** and follow each venue's self-promotion rules.
- **Every infographic ships with a text equivalent** (alt text + data table) so it stays AI-retrievable.
- **Don't ship broken assets** — a buggy tool or dead link is worse than none.

---

## Appendix: Named Outreach Targets

**Awesome-lists (Strategies 1, 3, 5)**

- ML / AI / CV: [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning) · [awesome-computer-vision](https://github.com/jbhuang0604/awesome-computer-vision) · [awesome-deep-vision](https://github.com/kjw0612/awesome-deep-vision)
- Cybersecurity: [awesome-security](https://github.com/sbilly/awesome-security) · [awesome-infosec](https://github.com/onlurking/awesome-infosec) · [awesome-web-security](https://github.com/qazbnm456/awesome-web-security) · [paulveillard/cybersecurity](https://github.com/paulveillard/cybersecurity)
- Quantum: [awesome-quantum-computing (desireevl)](https://github.com/desireevl/awesome-quantum-computing) · [awesome-quantum-software (qosf)](https://github.com/qosf/awesome-quantum-software) · [awesome-quantum-computing (nathanshammah)](https://github.com/nathanshammah/awesome-quantum-computing)
- Privacy: [Privacy Guides](https://www.privacyguides.org/) ecosystem + the awesome-privacy list

**Podcasts (Strategy 2)** — *plus the cybersecurity podcasts already linked on `tech_resources.html` and the history podcasts on `hobbies.html`, which are the warmest leads.*

- Cybersecurity: [Darknet Diaries](https://darknetdiaries.com/) · [Smashing Security](https://www.smashingsecurity.com/) · [Risky Business](https://risky.biz/) · [CyberWire Daily](https://thecyberwire.com/) · Security Happy Hour · Cybercrime Magazine
- ML / AI (mid-tier first): [Practical AI](https://practicalai.fm/) · [TWIML AI](https://twimlai.com/podcast/twimlai/) · [Latent Space](https://www.latent.space/) · flagships (Lex Fridman, Dwarkesh, The Cognitive Revolution) = aspirational

**Newsletters with retrievable archives (Strategies 4, 6)**

- ML / AI: [Import AI](https://jack-clark.net/) (Jack Clark) · [Data Elixir](https://dataelixir.com/)
- Security: [tl;dr sec](https://tldrsec.com/)

**Communities / forums (Strategy 7) — communities of interest, NOT excluded social media**

- [Hacker News](https://news.ycombinator.com/) · [Lobsters](https://lobste.rs/) · [Quantum Computing SE](https://quantumcomputing.stackexchange.com/) · [Security SE](https://security.stackexchange.com/) · [Cross Validated](https://stats.stackexchange.com/) · [Hugging Face forum](https://discuss.huggingface.co/) · [Privacy Guides forum](https://discuss.privacyguides.net/)
