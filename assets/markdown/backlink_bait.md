# Backlink Strategy for ColbyMainard.github.io

*Last updated: June 2026*

---

## What Earns Backlinks

Backlinks are not a product of promotion — they are a product of utility. An outside source links to a page because that page saves their reader a step: it confirms a claim, explains a concept better than the linker could, or aggregates information the linker would otherwise have to reproduce. This means the question is never "how do I get links?" but always "what would make this content worth citing?"

The site already has three things that most personal portfolio sites lack:

1. **Genuine domain expertise across rare intersections** — sports computer vision, AML fraud detection, medical imaging, and cybersecurity ML in one profile.
2. **Opinionated, grounded takes** — the KANs piece, the AGI critique, and the sports marketing analysis are all substantive rather than summary.
3. **A deep, curated reading list** — 48+ books across 6 technical domains, with per-entry topic coverage.

The gap between the current state and a highly citable site is mostly formatting and depth, not volume. The strategies below focus on changes that convert "interesting to read" into "worth pointing others to."

---

## Priority 1: Technical Resources Page

**Target file:** `tech_resources.html`

**Backlink ceiling: High.** Curated reading lists are among the most durably linked content types on the web. Educators, bootcamp instructors, and career-guide authors link to them as external validation of their own recommendations. A well-organized reading list also compounds over time: once linked by one source, it becomes discoverable by others.

The page currently has 48+ books across six domains (cybersecurity, AI/ML, C/C++, Python, scripting, operating systems) with per-entry topic bullets. That depth is the strongest asset on the site. Three structural changes would significantly increase its citability.

---

### Strategy 1A — Add Difficulty Tiers and Learning Paths

**What to add:** A "Level" column for every book entry using a three-tier system: Beginner, Intermediate, Advanced. Where relevant, add a "Read After" note pointing to a prerequisite book already on the list.

**Why it works:** The current list is unordered, which forces a reader who is new to a domain to do their own sequencing work. A learning path removes that friction. Bootcamp resource aggregators, university course wikis, and subreddit sidebars (r/netsec, r/learnpython, r/MachineLearning) maintain curated link collections specifically organized by difficulty, and they prefer external sources that have already done the sequencing work.

**Example of the format change:**

| Book | Level | Read After | Topics |
|---|---|---|---|
| *C++ Primer* | Beginner | — | Syntax, OOP, STL fundamentals |
| *Effective Modern C++* | Intermediate | C++ Primer | Move semantics, lambdas, smart pointers |
| *Mastering the C++17 STL* | Advanced | Effective Modern C++ | Algorithms, containers, performance internals |

This format is scannable and shareable. A reader can copy a three-row excerpt and link to the source for the full table.

**Where to apply first:** The cybersecurity list (19 books) is the best candidate because it already spans a clear progression from conceptual (cryptography theory, OSINT methodology) to applied (Metasploit, Black Hat Python) to low-level (assembly/binary manipulation in Ludwig's virus book). The sequencing is there — it just needs to be made explicit.

---

### Strategy 1B — Add a Personal Rationale Paragraph Per Entry

**What to add:** Below each book entry (or in a dedicated "Why This Book" column), a 2–4 sentence explanation of what makes this book the right choice over its alternatives and what type of reader it fits.

**Why it works:** The current entries describe what each book *covers* but not *why you'd pick this one over its competitors*. That discrimination is what distinguishes a genuine recommendation list from a scraped bibliography. Cybersecurity career guides on Medium, Substack, TechTarget, and Dark Reading regularly assemble "best books for X" roundups, and they cite personal curation pages that show this kind of judgment — because it saves them from writing the rationale themselves.

**Example entries:**

> **The Ghidra Book** (Eagle & Nance) — The most practical guide to Ghidra available. Unlike generic reverse engineering texts, this one is organized around workflows rather than menus, which means you spend less time navigating the UI and more time understanding disassembly. Best read after you are comfortable with basic assembly; it assumes you know what you are looking at and focuses on how to look efficiently.

> **Open Source Intelligence Techniques** (Bazzell) — The definitive OSINT methodology reference. Each edition is updated to reflect the current state of social media privacy controls and search engine capabilities, which matters enormously in a field that changes monthly. Read this before any of the offensive security books; understanding how information is exposed publicly is foundational to understanding what an attacker would find.

These entries give a blogger a sentence to quote and a reason to attribute it.

---

### Strategy 1C — Add a "Gaps and Future Additions" Section

**What to add:** A short section at the bottom of the page listing topics that are underrepresented in the current list and books under consideration.

**Why it works:** This signals intellectual honesty and positions the list as a living document rather than a one-time artifact. It also creates a natural hook for authors, publishers, and community members to share the page when you add a book they recommended. A list that updates earns repeat links — a source that linked once will link again when they cite the update. Date-stamp the section prominently.

**Example content:**

> **Currently underrepresented:** Rust systems programming, cloud security (AWS/GCP-specific), formal methods in software engineering, probabilistic ML beyond supervised learning.
>
> **Under consideration:** *Programming Rust* (Blandy & Orendorff), *Hacking the Cloud* (ongoing community resource), *The Art of Problem Solving* series for competitive programming foundations.

---

### Strategy 1D — Submit to GitHub `awesome-*` Repositories and Community Wikis

Once the list is polished with tiers and rationales, make targeted submissions to:

- **`awesome-machine-learning`** and **`awesome-deep-learning`** on GitHub — open a PR adding the resources page under an "Additional Reading" or "Curated Lists" section. These repos are heavily trafficked and their contributors are often bloggers.
- **`awesome-cybersecurity-books`** — a dedicated GitHub repo for cybersecurity reading; the list already has the depth to qualify.
- **OWASP's community education wiki** — OWASP accepts external resource submissions for their developer and security practitioner education materials.
- **CISA's "Free Cybersecurity Services and Tools"** page — CISA accepts submissions for their resource catalog; the cybersecurity tools list may qualify.
- **Texas A&M CS alumni networks** — alumni Discord/Slack channels and the university's CS department resource pages are natural audiences.

Each of these submissions is a direct backlink opportunity, and the `awesome-*` repos in particular are referenced by thousands of other articles.

---

## Priority 2: Product Placement in Sports Marketing

**Target file:** `tech_takes.html` (the Product Placement section)

**Backlink ceiling: Highest of any single piece.** This is the most unique content on the site. No other ML engineer is publicly writing about the computer vision mechanics of logo visibility valuation in broadcast sports. It sits at the intersection of three active communities — sports analytics practitioners, computer vision researchers, and advertising technology professionals — none of whom have a good technical reference for this topic.

---

### Strategy 2A — Add a Quantitative Scoring Framework

**What to add:** A conceptual scoring model that maps the factors currently described qualitatively (occlusion, motion blur, frame area, goal proximity) to numerical weights or tiers.

**Why it works:** Concrete numbers make a piece citable even when approximate. A blogger writing about sports marketing technology can say "according to this framework, a logo adjacent to a scoring event scores approximately 2–3× higher than the same logo in a sideline cut" and link to the source. Without the numbers, they have to paraphrase the qualitative logic and have less reason to attribute it.

**Example framework structure:**

| Factor | Weight | Notes |
|---|---|---|
| Frame area coverage (% of screen) | High | Logarithmic relationship — doubling size does not double value |
| Occlusion percentage | High (negative) | >50% occlusion reduces value more than proportionally due to recognition failure |
| Motion blur severity | Medium (negative) | Affects recognition threshold; frame-by-frame analysis needed |
| Temporal proximity to scoring event | High | Viewership spikes ±30 seconds around goals/touchdowns |
| Camera orientation to logo surface | Medium (negative) | >45° rotation degrades recognition confidence substantially |
| Clutter (competing brand density) | Medium (negative) | Each additional nearby brand reduces attention share |

This is a framework that sports analytics professionals, advertising technology writers, and academic researchers studying broadcast metrics can cite and build on.

---

### Strategy 2B — Reference Published Academic Work

**What to add:** Citations to 2–3 published papers on sports broadcast logo detection and valuation.

**Why it works:** Connecting a practitioner analysis to the academic record creates the "practitioner's perspective on the research" framing that ML educators and technology journalists actively seek. It also increases the chance that researchers in this area find the piece when searching related literature, which can lead to academic or industry citations.

Papers in this space include work from CVPR and ECCV workshops on sports video understanding, Nielsen Sports' methodological publications on audience measurement, and computer vision work on instance segmentation in broadcast media. Linking to these — even with a critical note about where the practitioner experience diverges from the academic assumption — puts the piece in a conversation rather than isolation.

---

### Strategy 2C — Coin a Term

**What to add:** Name the scoring methodology with a specific, repeatable term.

**Why it works:** Coined terms in niche fields get adopted and cited. Once a sports analytics blogger uses a term from a source, they almost always link back to that source as the origin. Terms with acronyms travel better.

**Candidate terms:**

- **Broadcast Exposure Value (BEV)** — emphasizes the broadcast context and mirrors "Exposure Value" from advertising
- **Visibility-Weighted Impression Score (VWIS)** — more technical framing, emphasizes the computer vision weighting
- **Logo Visibility Index (LVI)** — simpler, easier to say in speech and podcast

Pick one and define it formally in the piece: "We define the *Broadcast Exposure Value (BEV)* of a logo placement as a composite score integrating frame coverage, occlusion, motion quality, temporal context, and competitive clutter." That sentence, once written, becomes the citation target.

---

### Strategy 2D — Cross-Post to Towards Data Science with Canonical URL

**What to do:** Submit an adapted version of the piece to Towards Data Science (TDS) on Medium. TDS allows the canonical URL to be set to the original site, so all SEO benefit accrues to `ColbyMainard.github.io` rather than Medium.

**Why it works:** TDS has a large established readership of ML practitioners and researchers. A piece published there is indexed heavily by Google, which increases the chance that sports analytics writers and advertising technology journalists discover it when researching the topic. Readers who cite the TDS piece frequently also link back to the source site, especially when the canonical URL is clearly set.

**Target publications beyond TDS:**

- **SportsPro Media** — publishes practitioner thought-leadership on sports technology; accepts editorial submissions
- **Front Office Sports** — covers the business and technology of sports; the product placement angle fits their editorial focus
- **Sports Innovation Lab** — publishes research-adjacent content for sports industry professionals
- **LinkedIn Articles** — the sports analytics community on LinkedIn is substantial; a LinkedIn post linking to the full piece drives both traffic and profile-level citations

---

## Priority 3: Kolmogorov-Arnold Networks Analysis

**Target file:** `tech_takes.html` (the KANs section)

**Backlink ceiling: Medium-High.** KANs are a live topic in the ML community. The original MIT paper (2024) generated significant interest, and the PyKAN library is under active development. The piece already covers the core trade-off — interpretability gains versus slower training and absent GPU optimization — clearly and at the right level for a practitioner audience. The missing element is empirical grounding.

---

### Strategy 3A — Add a Benchmark Comparison Table

**What to add:** A table comparing KANs versus MLPs on at least one reproducible benchmark, with explicit performance numbers.

**Why it works:** Opinions about architectural trade-offs are plentiful in ML discourse. Opinions backed by a concrete table are far rarer and far more citable. A blogger writing "should I use KANs for my use case?" wants a sentence like "on the UCI classification benchmark, KANs required 4× more training time while achieving comparable accuracy on tabular data with a 30% reduction in parameter count" — and they want a source for that sentence.

The easiest path is to reproduce a table from the original Liu et al. paper with your own annotation and commentary, clearly attributing the source data. This is academically appropriate and gives the piece empirical grounding without requiring original experiments. If original experiments are feasible (even a small Kaggle dataset), that is stronger.

**Suggested table format:**

| Benchmark | KAN Parameters | MLP Parameters | KAN Training Time | MLP Training Time | KAN Accuracy | MLP Accuracy |
|---|---|---|---|---|---|---|
| [Dataset] | [N] | [N] | [Xs] | [Xs] | [%] | [%] |

---

### Strategy 3B — Maintain a Visible Changelog

**What to add:** A "Revisions" section at the bottom of the piece listing dated updates.

**Why it works:** ML aggregate newsletters — Import AI (Jack Clark), The Batch (deeplearning.ai), and others — frequently link to practitioner analyses when a topic resurfaces in the news cycle. They prefer to link to content that is visibly maintained, because it signals to their readers that the analysis reflects current understanding rather than a snapshot that may be outdated. A changelog entry like "June 2026: Updated to reflect PyKAN 0.2 GPU support improvements" is exactly the kind of signal these curators look for.

---

### Strategy 3C — Engage the ML Community at Publication and on Updates

**Specific targets:**

- **Papers With Code** — post a link in the KANs paper discussion thread as a "practitioner analysis." Papers With Code has high density of researchers and engineers who write their own blog posts and papers and will cite it if useful.
- **Hacker News Show HN** — "Show HN: A practitioner's analysis of KANs vs. MLPs, including benchmark comparison" fits the Show HN format. A successful HN post drives secondary links from other bloggers who write about the thread.
- **r/MachineLearning** — link posts with substantive accompanying comments are welcomed; frame it as "practitioner experience, not hype."

---

## Priority 4: Cybersecurity Guide

**Target file:** `guides.html` (cybersecurity section)

**Backlink ceiling: Medium.** The guide has two assets that are rare in introductory cybersecurity content: a clear six-subfield taxonomy (network, application, digital forensics, cloud, ethical hacking, GRC) and a tools list of 18+ widely-used utilities. The taxonomy is genuinely useful for career-changers and program designers who need to explain to others what "cybersecurity" encompasses. The tools list is a resource that entry-level learners actively search for.

---

### Strategy 4A — Convert the Tools List to a Comparison Matrix

**What to change:** Replace the flat tools list with a structured table.

**Suggested columns:** Tool name | Primary subfield | Difficulty (Beginner/Intermediate/Advanced) | Platform (Linux/Windows/Cross-platform) | Free/Paid | Primary use case (one sentence)

**Why it works:** This specific format — a multi-column comparison table for security tools — is the "cheat sheet" format that gets shared in Slack workspaces, pinned in Discord servers, bookmarked by instructors, and embedded in Notion team wikis. SANS community resources, CompTIA study group forums, r/cybersecurity, and r/netsec all circulate these. The current flat list cannot be shared in that context; the table can.

**Example rows:**

| Tool | Subfield | Level | Platform | Cost | Use Case |
|---|---|---|---|---|---|
| Wireshark | Network | Beginner | Cross-platform | Free | Packet capture and protocol analysis |
| Nmap | Network | Beginner | Cross-platform | Free | Network discovery and port scanning |
| Metasploit | Ethical Hacking | Intermediate | Linux/Cross | Free (community) | Exploit development and execution framework |
| Ghidra | Digital Forensics | Advanced | Cross-platform | Free (NSA) | Binary reverse engineering and disassembly |
| Burp Suite | Application | Intermediate | Cross-platform | Free/Paid | Web application vulnerability scanning and interception |

---

### Strategy 4B — Add a Recommended Learning Sequence

**What to add:** A short narrative paragraph or numbered list describing in what order a newcomer should approach the tools, and why.

**Why it works:** Most guides list tools without explaining *when* to learn each. The sequencing knowledge — "Wireshark before Metasploit, because you need to understand what normal traffic looks like before you can intelligently read exploit traffic" — is exactly the kind of judgment that a new practitioner cannot derive from the tool list alone. Bootcamp instructors who agree with the sequence will link to it as external validation of their curriculum. Even instructors who partially disagree will link to it as a "compare and contrast" reference.

**Example:**

> **Recommended learning order:** Begin with Wireshark for passive observation and Nmap for active discovery — both require no prior exploitation knowledge and build your mental model of normal and abnormal network behavior. Add Burp Suite once you are comfortable reading HTTP traffic, since web application testing requires understanding the requests you are intercepting. Introduce Metasploit after you have completed at least one CTF using manual techniques; using a framework before understanding what it automates leads to shallow knowledge. Reserve Ghidra, John the Ripper, and Hashcat for when you have a specific goal — binary analysis and password cracking require enough context that learning them abstractly rarely sticks.

---

## Priority 5: Post-Internet Privacy Analysis

**Target file:** `tech_takes.html` (the privacy section)

**Backlink ceiling: Medium.** The dual user/builder framing — covering both what developers should build and what individuals should do — is unusual. Most privacy content is written for one audience or the other. The 87% re-identification statistic is also a strong anchor. The piece is close to being linkable by privacy advocacy organizations; it needs structural tightening.

---

### Strategy 5A — Add Explicit Threat Models

**What to add:** Name and describe 2–3 specific threat scenarios, then map each existing mitigation to the specific threat it addresses.

**Why it works:** Privacy advocacy organizations (EFF, privacyguides.org, the ACLU's digital rights resources) maintain curated reading lists and link to practitioner analyses that use a threat modeling structure — because that structure signals security rigor rather than general awareness advice. A piece that says "use TOR" is generic. A piece that says "against the data broker aggregation threat, TOR is most effective because it prevents IP-based correlation across sessions" is citable.

**Example threat model structure:**

> **Threat Model 1: Data Broker Aggregation**
> A data broker purchases behavioral data from multiple sources (loyalty programs, app telemetry, location services) and assembles a profile that can re-identify you without ever holding your name. Relevant mitigations: avoid persistent logins, use a VPN with a no-log policy, opt out of loyalty programs, decline app tracking permissions at the OS level.
>
> **Threat Model 2: Employer or Institutional Surveillance**
> An employer or institution monitors your device or network traffic. Relevant mitigations: use personal devices for personal activity, use end-to-end encrypted communications (Signal), understand that corporate VPNs route traffic through the employer's network.
>
> **Threat Model 3: Advertising Profile Construction**
> An ad platform builds a behavioral model from browsing history, purchase data, and social graph inference. Relevant mitigations: use a privacy-respecting browser with tracking protection enabled, use uBlock Origin, avoid third-party social login ("Sign in with Google"), regularly clear cookies or use a cookie-partitioning browser.

---

## Priority 6: Data Engineering PII Section

**Target file:** `guides.html` (data engineering section)

**Backlink ceiling: Medium (if extracted and expanded).** The PII section is currently embedded in a broader data engineering guide, which reduces its discoverability. The content itself — hashing, salting, k-anonymity, differential privacy, data minimization — is more thorough than most introductory data engineering content. As a standalone, extractable reference, it has a different audience and higher link potential.

---

### Strategy 6A — Extract as a Standalone PII Handling Checklist

**What to add:** A checklist-formatted companion section (or linked standalone page) titled something like "PII Handling Checklist for Data Engineers."

**Format:**

> **Before ingesting a dataset containing PII:**
> - [ ] Identify all PII fields (name, email, SSN, IP address, device ID, precise location)
> - [ ] Determine which fields are necessary for the analysis; drop the rest (data minimization)
> - [ ] Hash irreversible identifiers using SHA-256 with a salt; store the salt separately
> - [ ] Apply k-anonymity (k ≥ 5 recommended) to quasi-identifier combinations before aggregating
> - [ ] Evaluate whether differential privacy is appropriate for aggregate outputs
>
> **Before sharing or publishing an aggregated dataset:**
> - [ ] Verify k-anonymity holds on the output
> - [ ] Confirm no cell contains fewer than 5 individuals (suppression threshold)
> - [ ] Document retention period and deletion schedule

**Why it works:** Checklists are highly shareable in Slack workspaces and Notion team wikis, which are the primary surfaces where data engineers share resources. The dbt Slack community, the Analytics Engineering Slack, and the Modern Data Stack community on LinkedIn all have active channels where members share exactly this kind of reference. A checklist is also a format that compliance-adjacent tech writers cite because it is easy to quote a few items with a "see full checklist at" link.

---

### Strategy 6B — Map Each Technique to Regulatory Requirements

**What to add:** Parenthetical notes after each technique anchoring it to a specific GDPR article or CCPA provision.

**Example:**

> **k-anonymity** (addresses CCPA Section 1798.140's re-identification prohibition; relevant to GDPR Article 5's data minimization principle)
>
> **Differential privacy** (cited in NIST Privacy Framework as a technical implementation of de-identification; GDPR Article 25 data protection by design)

**Why it works:** Legal-adjacent technology writers — compliance consultants, privacy engineers, data governance practitioners — cite practical technical guides when they map cleanly to regulatory language. This addition expands the potential linker base from "data engineers" to include "compliance professionals explaining technical implementation to legal teams," which is a large audience with a genuine need for citable technical references.

---

## Cross-Cutting Changes That Apply to Every Page

### JSON-LD Article Schema

Add structured data markup to each opinion piece and guide. The minimum viable schema for each article:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article title",
  "author": {
    "@type": "Person",
    "name": "Colby Mainard",
    "url": "https://colbymainard.github.io"
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "about": ["topic1", "topic2"],
  "description": "One sentence summary"
}
```

This markup increases the chance that Google surfaces articles as featured snippets. A featured snippet position is often what triggers a blogger's discovery of content, which then leads to a backlink.

---

### Author Bio Block on Each Guide and Opinion Piece

Add a 2–3 sentence bio at the top or bottom of each substantive page:

> Colby Mainard is a Machine Learning Engineer with experience in sports computer vision, AML fraud detection, and medical imaging. He holds an M.S. in Computer Science from Texas A&M University and an AWS Machine Learning Specialty certification. Views expressed are his own.

This serves two functions: it gives a blogger a clean attribution they can quote, and it signals to readers unfamiliar with the site that the content comes from a practitioner with relevant credentials rather than a generalist summarizer.

---

### Dense Internal Linking

The current pages are largely siloed. Every guide should link to the relevant section of the Technical Resources page ("for book recommendations on this topic, see..."). Every Technical Stances piece should link to the relevant guide ("for a beginner's introduction to this domain, see..."). This serves two goals:

1. It distributes page authority across the site, which improves rankings for individual pages and makes them more discoverable.
2. It signals to search engines that the site is a topical authority on ML, cybersecurity, and data engineering — which improves the ranking of all pages in those domains.

---

## Prioritized Action List

These are ordered by estimated effort-to-backlink-potential ratio, starting with the changes most likely to generate links quickly:

1. **Add difficulty tiers and learning paths to Technical Resources** — structural change, no new writing required, immediately submittable to `awesome-*` repos
2. **Add scoring framework and coin a term in the Product Placement piece** — one table and one defined term, high ceiling
3. **Add comparison matrix to Cybersecurity tools list** — reformatting existing content, directly shareable in security communities
4. **Add personal rationale paragraphs to Technical Resources (cybersecurity section first)** — original writing, highest citability improvement
5. **Add threat models to the Privacy piece** — structural addition, unlocks EFF and privacyguides.org as potential link sources
6. **Add benchmark table to KANs analysis** — requires data work, but highest impact for ML community links
7. **Extract PII checklist from Data Engineering guide** — add regulatory anchors, target compliance-adjacent writers
8. **Add JSON-LD schema to all articles** — technical, no new content, improves discovery across everything
9. **Submit polished Technical Resources to community wikis and `awesome-*` repos** — distribution action, depends on completion of items 1 and 4
10. **Cross-post Product Placement piece to Towards Data Science** — distribution action, depends on completion of item 2
