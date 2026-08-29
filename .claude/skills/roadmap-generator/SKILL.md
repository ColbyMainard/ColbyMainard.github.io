---
name: "roadmap-generator"
description: |
  Orchestrates the site's specialist skills (accessibility, content, features, SEO, backlinks, web authority) and synthesizes their reports into a single prioritized optimization roadmap, saved as a dated markdown report.
  Triggers on: roadmap generator, roadmap builder
  Use when planning site-wide optimization work or deciding what to improve next. Trigger with phrases like "roadmap generator", and "roadmap builder".
allowed-tools: "Read, Write, Skill"
version: 1.2.0
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
2. **Read all six reports.**
3. **Synthesize** them into one roadmap:
   - **Deduplicate** recommendations that appear in more than one report (for example, "link-worthy assets" surfaces in the SEO, backlink, and web-authority reports). The web-authority report's **Hand-off** field is a map of where its findings deliberately overlap a sibling: when it hands off to `backlink-strategy-planner` or `search-engine-optimization`, merge it into that sibling's action rather than listing both, and credit both skills in the action table's "Source skill" column.
   - **Resolve conflicts** between reports, and note how you reconciled each one.
   - **Sequence** the work by dependency and impact-versus-effort (see Prioritization).
   - **Carry the web-authority report's Open questions forward** into the roadmap's own Open questions section. Those are items that could not be settled without live metrics the skills cannot reach, and they must not be quietly upgraded into confident actions.
4. **Write the roadmap** to `assets/markdown/roadmap-report-YYYY-MM-DD.md`, using today's date.
5. **Do not edit the site's files.** The roadmap and the six reports are recommendations the maintainer chooses to implement.

## Constraints inherited from the specialists

These hold across every skill you orchestrate. Do not let synthesis dissolve them:

- **No invented metrics.** None of the specialists can reach Semrush, Ahrefs, Search Console, or analytics. The roadmap must never state an authority score, backlink count, ranking, or traffic figure as if measured. Where a real number would change the priority, put it in Open questions.
- **`robots.txt`'s blocked training-bot stanza is deliberate policy.** No report may recommend unblocking it, and the roadmap must not surface such a recommendation if one appears.
- **Docs only.** Every report and the roadmap are recommendations; no skill edits site HTML, CSS, JS, or structured data.

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

The `roadmap-report` must contain, in order:

1. **Executive summary** — 3–5 sentences on the site's current state and the highest-leverage moves.
2. **Prioritized action table:**

   | # | Action | Source skill | Impact (H/M/L) | Effort (H/M/L) | Phase | Depends on |
   | - | ------ | ------------ | -------------- | -------------- | ----- | ---------- |

3. **Phase notes** — a short paragraph for each phase (Foundation / Discoverability / Reach) explaining why the work is ordered that way.
4. **Conflicts & dedupe log** — overlapping or conflicting recommendations across the six reports, and how you reconciled them. Record every web-authority hand-off you merged and which sibling action absorbed it.
5. **Open questions** — items no specialist could settle without live metrics, carried forward from the web-authority report and anywhere else one surfaced, with what the maintainer would need to check to close each.

## Tone

Decisive and organized. Give a clear recommended order, justify the sequencing, and keep every action concrete and traceable back to the report it came from.
