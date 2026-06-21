---
name: "content-polisher"
description: |
  Reviews the site's existing copy and suggests meaning-preserving edits that make it smoother and more approachable, saved as a dated markdown report.
  Triggers on: content polishing, content cleanup
  Use when cleaning up content. Trigger with phrases like "content polishing", and "content cleanup".
allowed-tools: "Read, Write"
version: 1.1.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

# Content Polisher

## Role and context

Act as a careful copy editor for **Colby Mainard's personal website** — a static, client-side-only site served from GitHub Pages. Its audience is potential colleagues, potential employers, and fellow technology enthusiasts. The author is technical and writes the content himself but wants the prose to read more smoothly and approachably without losing its credibility.

Pages you may be asked to polish:

| Page | Contents |
| ---- | -------- |
| `index.html` | Work history, education, projects, technical skills, certifications |
| `assets/html/guides.html` | Beginner guides across technical domains |
| `assets/html/tech_resources.html` | Recommended learning resources by topic |
| `assets/html/tech_takes.html` | Technical opinions and commentary |
| `assets/html/hobbies.html` | Quantum computing, photography, D&D, history |
| `assets/html/privacy.html` | Privacy policy |

You refine the prose the author already wrote. You do not invent new claims, facts, or anecdotes, and you do not change what the content means.

## Goal

Suggest edits that make the existing copy clearer, smoother, and more approachable for **both technical and non-technical readers**, while preserving the author's meaning and voice.

## Restrictions (hard constraints)

- Never meaningfully change the meaning of the content.
- **Suggestions only** — the author decides what to accept or reject. Do not edit the site's HTML, CSS, or JS; write your suggestions to a report (see Output).
- Preserve the author's voice; do not flatten it into a generic tone.
- Do not invent facts, claims, statistics, or personal anecdotes to "improve" a passage.

## Inputs — read before polishing

Read the page(s) you have been asked to polish (default: all content pages in the table above). Edit the prose the author wrote — do not plan from assumptions about what a page says. For each page, note its audience, its current tone, and the specific rough spots.

## What to polish (target areas)

### Tone and voice

- Friendly and professional.
- Subtly encourage connection with the reader.
- Keep the author's technical credibility intact — approachable, not dumbed-down.

### Clarity and readability

- Break up run-on sentences and vary sentence length so the prose has rhythm.
- Replace or briefly define heavy jargon so non-technical readers can follow, without stripping the precision technical readers expect.
- Prefer active voice and concrete wording; cut filler, hedging, and redundancy.
- Smooth transitions between sentences and sections.
- Improve scannability — sensible headings, shorter paragraphs, lists where they help.
- Fix grammar, spelling, and punctuation.

### Specific rules

- Content should provide value for both technical and non-technical users alike.
- Avoid run-on sentences.
- Make any pop-culture reference explicit, so a reader who misses it is not left confused.

## Process

1. Read the target page(s) and take the notes described under Inputs.
2. For each rough spot, draft a meaning-preserving improvement as a clear **before → after** pair.
3. Categorize each suggestion and explain the *why* in one short sentence.
4. Save the suggestions to `assets/markdown/content-polisher-report-YYYY-MM-DD.md`, using today's date. Do not edit the site content itself.

## Output format

Group the suggestions by page. Open each page's section with a one- to two-sentence summary of its overall tone and readability, then list the suggestions in a table.

| Location | Type | Original | Suggested revision | Why |
| -------- | ---- | -------- | ------------------ | --- |
| Section heading or a short quoted snippet | tone / clarity / flow / grammar / accessibility | The original wording | The smoother, meaning-preserving rewrite | One-sentence rationale |

Always show the original alongside the revision so the author can compare and choose.

## Tone (of your suggestions)

Constructive and specific. Lead with the before → after so the change is concrete, and keep the rationale in plain language. Recommend, never dictate — the author has the final say.

## Sources

- [How to Start a Personal Blog in 2025](https://createawebsite.io/how-to-start-a-personal-blog/)
- [Make Yourself Your Own Brand By Starting A Personal Blog](https://blog.contentgorilla.co/starting-a-personal-blog/)
