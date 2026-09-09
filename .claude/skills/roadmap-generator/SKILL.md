---
name: "roadmap-generator"
description: |
  Orchestrates the site's specialist skills (accessibility, content, features, SEO, backlinks, web authority) and synthesizes their reports into a single prioritized optimization roadmap, saved as a dated markdown report.
  Triggers on: roadmap generator, roadmap builder
  Use when planning site-wide optimization work or deciding what to improve next. Trigger with phrases like "roadmap generator", and "roadmap builder".
allowed-tools: "Read, Glob, Write, Skill"
version: 1.3.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Roadmap Generator

## Role and context

Act as the **site-optimization lead** for Colby Mainard's personal website — a static, client-side-only site served from GitHub Pages, whose audience is potential colleagues, potential employers, and fellow technology enthusiasts. You are the **orchestrator**: you run the six specialist skills below, then merge their separate reports into one prioritized roadmap.

"Optimize site performance" here means improving the site's **quality, accessibility, discoverability, and reach** — not runtime speed alone.

## Dependencies

| Skill | What it contributes | Report it writes (in `assets/markdown/`) |
| ----- | ------------------- | ---------------------------------------- |
| `accessibility-audit-runner` | Navigation, readability, and accessibility issues | `accessibility-auditor-report-YYYY-MM-DD.md` |
| `content-polisher` | Production-ready, approachable copy | `content-polisher-report-YYYY-MM-DD.md` |
| `feature-recommender` | New feature ideas that fit the static site | `feature-recommender-report-YYYY-MM-DD.md` |
| `search-engine-optimization` | On-page and technical search visibility | `seo-report-YYYY-MM-DD.md` |
| `backlink-strategy-planner` | Off-page links and references to the site | `backlink-planner-report-YYYY-MM-DD.md` |
| `web-authority-helper` | The authority picture as a whole: linkable assets, topic clusters, internal link equity, off-site mentions, AI retrievability | `web-authority-report-YYYY-MM-DD.md` |

**Run `web-authority-helper` last.** It is the only specialist that reads the other reports already sitting in `assets/markdown/` so it can extend them instead of restating them, and it ends each recommendation with a **Hand-off** field naming the sibling skill that owns the follow-up. Running it after the other five is what makes those hand-offs land on reports that exist.

## Process

1. **Run each specialist skill** above, using today's date for filenames, with `web-authority-helper` last for the reason given above. Each writes its own dated report to the markdown directory. If a skill returns its findings inline instead of writing a file, write them to the report path shown above yourself.
2. **Read all six reports**, and read only the copies dated today. Older dated reports may still sit in `assets/markdown/` from a previous run. Reading a stale one silently mixes yesterday's findings into today's roadmap, and the site may have changed since. Ignore any report whose date is not today, and name it in the Conflicts and dedupe log as skipped.
3. **Handle a missing report.** If a specialist wrote nothing, run it once more. If it still writes nothing, build the roadmap from the reports you have, and say in the executive summary which skill produced no report. Do not guess at what it would have found.
4. **Synthesize** them into one roadmap:
   - **Deduplicate** recommendations that appear in more than one report. For example, "link-worthy assets" surfaces in the SEO, backlink, and web-authority reports. The web-authority report's **Hand-off** field maps where its findings deliberately overlap a sibling. When it hands off to `backlink-strategy-planner` or `search-engine-optimization`, merge it into that sibling's action rather than listing both, and credit both skills in the action table's "Source skill" column.
   - **Resolve conflicts** between reports, and note how you reconciled each one.
   - **Sequence** the work by dependency and impact-versus-effort (see Prioritization).
   - **Carry the web-authority report's Open questions forward** into the roadmap's own Open questions section. Those are items that could not be settled without live metrics the skills cannot reach, and they must not be quietly upgraded into confident actions.
5. **Write the roadmap** to `assets/markdown/roadmap-report-YYYY-MM-DD.md`, using today's date.
6. **Do not edit the site's files.** The roadmap and the six reports are recommendations the maintainer chooses to implement.

## Constraints inherited from the specialists

These hold across every skill you orchestrate. Do not let synthesis dissolve them:

- **No invented metrics.** None of the specialists can reach Semrush, Ahrefs, Search Console, or analytics. The roadmap must never state an authority score, backlink count, ranking, or traffic figure as if measured. Where a real number would change the priority, put it in Open questions.
- **`robots.txt`'s blocked training-bot stanza is deliberate policy.** No report may recommend unblocking it, and the roadmap must not surface such a recommendation if one appears.
- **Docs only.** Every report and the roadmap are recommendations. No skill edits site HTML, CSS, JS, or structured data.
- **`sitemap.xml` omits `privacy.html` and `404.html` on purpose.** Both carry `noindex`, and listing a `noindex` URL in a sitemap produces a Search Console error. If a report recommends adding either one, drop it and note the drop in the dedupe log.

## Prioritization (tried-and-true sequencing)

- **Foundation first:** fix accessibility and content clarity before driving traffic — there is no point sending visitors to pages that are hard to read or use.
- **Then discoverability:** apply on-page and technical SEO so the improved pages can actually be found.
- **Then reach:** pursue backlinks and community outreach once the pages are worth linking to.
- Within each phase, prefer **high-impact, low-effort** items first.

**Web-authority findings split across all three phases** — do not dump them into Reach because the skill sounds off-page. Route each by what it actually changes:

| Web-authority technique | Phase |
| ----------------------- | ----- |
| Linkable assets, topical depth, filling shallow coverage | Foundation |
| Internal link equity, topic-cluster pillar/spoke wiring, AI retrievability and extractability | Discoverability |
| Off-site mentions, correction requests for butchered quotes, outreach opportunities | Reach |

Its **Leverage** field (high/medium/low, stated as impact versus effort) feeds the Impact and Effort columns directly. Internal linking usually lands as high-impact, low-effort and should sort near the top of Discoverability.

## Output format

Open the report with a `# Optimization Roadmap` heading and a `Last Updated: YYYY-MM-DD` line. Then give these sections, in order:

1. **Executive summary** — 3–5 sentences on the site's current state and the highest-leverage moves. Name any specialist that produced no report.
2. **Prioritized action table.** Carry at most twenty-five actions. Where the reports together offer more, keep the highest-leverage ones and record the rest in one line under the dedupe log as deferred. A roadmap nobody finishes sets no priorities at all.

   | # | Action | Source skill | Impact (H/M/L) | Effort (H/M/L) | Phase | Depends on |
   | - | ------ | ------------ | -------------- | -------------- | ----- | ---------- |

   Copy Impact and Effort from the source report rather than re-rating them. Each specialist rates against shared anchors so the letters merge cleanly. Where a report gives leverage instead of two letters, split it into Impact and Effort and say so in the dedupe log.

3. **Phase notes** — a short paragraph for each phase (Foundation / Discoverability / Reach) explaining why the work is ordered that way.
4. **Conflicts and dedupe log** — overlapping or conflicting recommendations across the six reports, and how you reconciled them. Record every web-authority hand-off you merged and which sibling action absorbed it. Record any report skipped for a stale date, any specialist that produced nothing, and any action deferred past the table's limit.
5. **Open questions** — items no specialist could settle without live metrics, carried forward from the web-authority report and anywhere else one surfaced, with what the maintainer would need to check to close each.

## Tone

Decisive and organized. Give a clear recommended order, justify the sequencing, and keep every action concrete and traceable back to the report it came from.
