# Backlink Plan — Make Existing Pages Link-Worthy

_Planning document · no HTML/SCSS/JS has been changed yet._

## Context

**The problem.** Backlinks are earned, not promoted: an outside site links to a page only when that page saves their reader a step — confirms a claim, explains a concept better, or aggregates something they'd otherwise reproduce. A prior strategy doc (`assets/markdown/backlink_bait.md`, deleted in commit `bca7337`) laid this out, and its **technical foundation has already been built**:

- Per-page `<title>`, `meta description`, `keywords`, `author`
- Canonical URLs, Open Graph + LinkedIn cards on all 6 pages
- JSON-LD `BreadcrumbList`, `Blog`, and per-`Article` schemas (author/dates) — e.g. `tech_takes.html:47-120`
- `sitemap.xml`, `robots.txt`, `manifest.json`, `llms.txt`, search-engine verification

**The remaining gap is content depth and distribution, not plumbing.** The pages read well but aren't yet structured in the _citable_ formats (scored tables, named frameworks, tiered lists, checklists, coined terms) that bloggers, educators, and community wikis actually link to. This plan restructures the existing page **content** to close that gap, then distributes it.

**Scope:**

- ✅ Make existing pages link-worthy (content-depth restructuring + author bios)
- ✅ Include an off-site outreach playbook (manual steps the site owner executes)
- ❌ No dedicated internal cross-linking pass — and some contextual links already exist (`guides.html:193`, `guides.html:545`), so this isn't a gap.

---

## Conventions every change must follow

- **Accessibility (matches existing pattern):** every new `<table>` gets `<caption class="visually-hidden">…</caption>` and `<th scope="col">` headers — see the established pattern at `tech_resources.html:146-152`. Preserve the file's existing indentation.
- **Styling — avoid SCSS work where possible:** new tables/lists inherit existing styling, so no CSS change is needed for them. _Only_ if a new visual treatment is desired (e.g. colored difficulty badges) edit the relevant `assets/css/*.scss` partial — never the compiled `.css` — and leave the `sass` compile to the site owner (they compile CSS manually).
- **Freshness signals (do this for every page whose body changes):** bump `lastmod` in `sitemap.xml`, update the section's visible "Last Updated" line (pattern: `tech_takes.html:727`), and update `dateModified` in that page's JSON-LD `Article` block (e.g. `tech_takes.html:79-84`). Visible, dated maintenance is itself a link signal for newsletter curators.

---

## Changes by page — ordered by effort-to-impact ratio

### 1. `tech_takes.html` — Product Placement: scoring framework + coined term  _(highest ceiling, low effort)_

The most unique content on the site; no other ML engineer publicly writes about CV-based logo valuation. The section already enumerates the exact factors a model would weigh as `<h4>`s (Size, Orientation, Occlusion, Motion Blur, Digital-vs-Analog, Clutter, Context) at `tech_takes.html:747-786` — they map one-to-one onto table rows.

- **Insert** after the "Context of Placement" paragraph (`tech_takes.html:786`), before `</section>` (`:788`):
  - `<h3>Scoring a Placement: Broadcast Exposure Value (BEV)</h3>` with a one-sentence formal definition of **Broadcast Exposure Value (BEV)** as a composite of the seven factors. (A coined, acronymed term is what later citers link back to as the origin.)
  - A `<table>` — columns **Factor | Direction (raises/lowers value) | Weight (High/Med) | Notes** — one row per existing `<h4>` factor, reusing the prose already written for each.
- **Update** the section "Last Updated" line + the Product-Placement `Article` `dateModified`.

### 2. `guides.html` — Cybersecurity tools: comparison matrix + learning order  _(reformat, directly shareable)_

The flat 22-item `<ul>` at `guides.html:521-543` can't be shared as a "cheat sheet"; a table can (pinned in Discords, embedded in Notion wikis, circulated in r/netsec).

- **Replace** that `<ul>` with a `<table>` — columns **Tool | Subfield | Level | Platform | Cost | Use Case** — reusing the one-line descriptions already present for each tool.
- **Add** `<h3>Recommended Learning Order</h3>` after the table: a short narrative sequence (Wireshark/Nmap → Burp Suite → Metasploit → Ghidra/Hashcat) explaining _why_ that order. This sequencing judgment is what instructors link to as validation.

### 3. `tech_resources.html` — difficulty tiers + "Gaps & Future Additions"  _(makes it awesome-list-submittable)_

Curated reading lists are among the most durably linked content types; the depth (48+ books, 6 domains) is the site's strongest asset.

- **Add a "Level" column** (Beginner / Intermediate / Advanced) to each Books `<table>`: update the header row (pattern `tech_resources.html:148-152`) and every book `<tr>`. _This is the voluminous part — ~48 rows across 6 domain tables._ Start with the cybersecurity table (clear conceptual→applied→low-level progression). Optionally append an inline "Read after: <prereq>" note in the description cell where a clear prerequisite exists.
- **Add** a dated `<h3>Gaps &amp; Future Additions</h3>` block near the page end listing underrepresented topics (e.g. Rust systems programming, cloud security, formal methods) and books under consideration. This signals a _living document_ — sources that link once will re-link on updates.

### 4. `tech_takes.html` — KANs benchmark table  _(empirical grounding, ML ceiling)_

The KANs piece (`KANDiv`, `tech_takes.html:188`) covers the interpretability-vs-speed tradeoff well but has no numbers; opinions backed by a table are far rarer and more citable.

- **Insert** after the "Cons" subsection (after `tech_takes.html:224`+): a `<table>` comparing KAN vs MLP (parameters, training time, accuracy) on a named benchmark, reproduced from Liu et al. 2024 with **explicit attribution** in the caption/footnote, plus a 2-3 sentence interpretation paragraph. (Original numbers on a small Kaggle set are stronger but optional.)

### 5. `tech_takes.html` — Privacy threat models  _(unlocks EFF / privacyguides citations)_

The dual user/server framing in `PrivacyDiv` (`tech_takes.html:617`, with mitigations at `:640` and `:686`) is unusual; threat-model structure is what advocacy orgs cite over generic awareness advice.

- **Insert** a `<h3>Threat Models</h3>` subsection naming 3 scenarios (data-broker aggregation, employer/institutional surveillance, advertising-profile construction) and **map each existing mitigation** already listed in the User/Server subsections to the specific threat it counters.

### 6. `guides.html` — PII handling checklist + regulatory anchors  _(widens linker base to compliance writers)_

The Data-Engineering "Handling User Data Responsibly" list (`guides.html:162-169`) is more thorough than most intros but is embedded prose.

- **Convert** that recommendation `<ul>` into a two-phase **checklist** ("Before ingesting PII" / "Before publishing aggregates") using the existing list items.
- **Append regulatory anchors** parenthetically to each technique (e.g. _k_-anonymity → CCPA §1798.140 / GDPR Art. 5; differential privacy → NIST Privacy Framework / GDPR Art. 25). Checklists are shareable in dbt/Analytics-Engineering Slacks; the legal anchors add compliance-adjacent linkers.

### 7. Author-bio blocks (cross-cutting quick win)

Gives any blogger a clean, quotable attribution and signals practitioner credibility.

- **Add** a 2-3 sentence bio block above the footer/contact section on `tech_takes.html`, `guides.html`, and `tech_resources.html` (insert just before each `<footer id="footer">`, e.g. `tech_takes.html:791`). Reuse the wording already in `llms.txt:7-18` / `index.html` for consistency with the existing `Person` JSON-LD.

### 8. _(Optional, high effort — do last)_ Reading-list rationale paragraphs

- Add a 2-4 sentence "why this book over its alternatives, and who it fits" note to each `tech_resources.html` entry, **cybersecurity section first**. Highest citability lift but the largest writing effort — defer until 1-7 land.

---

## Off-site outreach playbook (manual — site owner executes)

Ordered by readiness; each depends on the matching in-repo change above being live first.

1. **Towards Data Science cross-post** of the Product Placement piece, with the canonical URL set to `colbymainard.github.io` so SEO equity accrues here, not Medium. _(after #1)_ — also pitch SportsPro Media / Front Office Sports.
2. **Show HN + r/MachineLearning** for the KANs analysis, framed as "practitioner benchmark, not hype." _(after #4)_ — also drop a link in the Papers With Code KANs thread.
3. **r/cybersecurity / r/netsec** sharing the tools comparison matrix as a "cheat sheet." _(after #2)_
4. **`awesome-*` GitHub PRs** — `awesome-machine-learning`, `awesome-deep-learning`, `awesome-cybersecurity-books` — adding the polished Technical Resources page. _(after #3, and stronger after #8)_ These repos are referenced by thousands of downstream articles.
5. **EFF / privacyguides.org** resource suggestion for the privacy threat-model piece. _(after #5)_
6. **dbt Slack / Analytics-Engineering Slack / Modern Data Stack LinkedIn** for the PII checklist. _(after #6)_
7. **OWASP community wiki / CISA free-tools catalog** for the cybersecurity guide + tools matrix.

---

## Verification

- **Local render:** serve statically and open each changed page — `npx http-server .` or VS Code Live Server (avoid `python -m http.server`; this project intentionally has no Python). The service worker/manifest only load over http(s), so use a server rather than `file://` for a full check.
- **HTML validity:** run changed files through the W3C validator (or an editor HTML linter) — confirm new tables are well-formed and every one has a `<caption class="visually-hidden">` + `<th scope="col">`.
- **Responsive/visual:** verify new tables stay readable / scroll on a narrow viewport (they inherit existing responsive table CSS — confirm no overflow regressions).
- **Structured data:** if any JSON-LD `Article` block was touched (dates), run the page through Google's Rich Results Test.
- **Accessibility spot-check:** new bio blocks and tables are reachable by keyboard and announced sensibly by a screen reader (consistent with the project's accessibility standards).
- **Freshness:** confirm `sitemap.xml` `lastmod`, each section's "Last Updated" line, and JSON-LD `dateModified` were bumped for every changed page.
- **Outreach:** none of the playbook steps are code; they're tracked/executed by the site owner after the corresponding page change is deployed.
