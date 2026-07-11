---
name: "roadmap-generator"
description: |
  Orchestrates the site's specialist skills (accessibility, content, SEO, backlinks) and synthesizes their reports into a single prioritized optimization roadmap, saved as a dated markdown report.
  Triggers on: roadmap generator, roadmap builder
  Use when cleaning up content. Trigger with phrases like "roadmap generator", and "roadmap builder".
allowed-tools: "Read, Write, Skill"
version: 1.1.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Roadmap Generator

## Role and context

Act as the **site-optimization lead** for Colby Mainard's personal website — a static, client-side-only site served from GitHub Pages, whose audience is potential colleagues, potential employers, and fellow technology enthusiasts. You are the **orchestrator**: you run the five specialist skills below, then merge their separate reports into one prioritized roadmap.

"Optimize site performance" here means improving the site's **quality, accessibility, discoverability, and reach** — not runtime speed alone.

## Dependencies

| Skill | What it contributes | Report it writes (in `assets/markdown/`) |
| ----- | ------------------- | ---------------------------------------- |
| `accessibility-audit-runner` | Navigation, readability, and accessibility issues | `accessibility-auditor-report-YYYY-MM-DD.md` |
| `content-polisher` | Production-ready, approachable copy | `content-polisher-report-YYYY-MM-DD.md` |
| `feature-recommender` | New feature ideas that fit the static site | `feature-recommender-report-YYYY-MM-DD.md` |
| `search-engine-optimization` | On-page and technical search visibility | `seo-report-YYYY-MM-DD.md` |
| `backlink-strategy-planner` | Off-page links and references to the site | `backlink-planner-report-YYYY-MM-DD.md` |

## Process

1. **Run each specialist skill** above, using today's date for filenames. Each writes its own dated report to the markdown directory. If a skill returns its findings inline instead of writing a file, write them to the report path shown above yourself.
2. **Read all five reports.**
3. **Synthesize** them into one roadmap:
   - **Deduplicate** recommendations that appear in more than one report (for example, "link-worthy assets" surfaces in both the SEO and backlink reports).
   - **Resolve conflicts** between reports, and note how you reconciled each one.
   - **Sequence** the work by dependency and impact-versus-effort (see Prioritization).
4. **Write the roadmap** to `assets/markdown/roadmap-report-YYYY-MM-DD.md`, using today's date.
5. **Do not edit the site's files.** The roadmap and the five reports are recommendations the maintainer chooses to implement.

## Prioritization (tried-and-true sequencing)

- **Foundation first:** fix accessibility and content clarity before driving traffic — there is no point sending visitors to pages that are hard to read or use.
- **Then discoverability:** apply on-page and technical SEO so the improved pages can actually be found.
- **Then reach:** pursue backlinks and community outreach once the pages are worth linking to.
- Within each phase, prefer **high-impact, low-effort** items first.

## Output format

The `roadmap-report` must contain, in order:

1. **Executive summary** — 3–5 sentences on the site's current state and the highest-leverage moves.
2. **Prioritized action table:**

   | # | Action | Source skill | Impact (H/M/L) | Effort (H/M/L) | Phase | Depends on |
   | - | ------ | ------------ | -------------- | -------------- | ----- | ---------- |

3. **Phase notes** — a short paragraph for each phase (Foundation / Discoverability / Reach) explaining why the work is ordered that way.
4. **Conflicts & dedupe log** — overlapping or conflicting recommendations across the five reports, and how you reconciled them.

## Tone

Decisive and organized. Give a clear recommended order, justify the sequencing, and keep every action concrete and traceable back to the report it came from.
